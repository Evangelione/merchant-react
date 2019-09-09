import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '@/common/NavBar'
import {
  SearchBar, Picker, WingBlank, WhiteSpace, Card, Flex, PullToRefresh,
} from 'antd-mobile'
import { observer, inject } from 'mobx-react'
import { FilterBox } from '@/styled'
import moment from 'moment'
import { DeliverType } from '@/config/constant'

const SearchType = [
  {
    label: '订单号',
    value: 'oid',
  },
  {
    label: '用户电话',
    value: 'dh',
  },
  {
    label: '用户姓名',
    value: 'xm',
  },
]

const PayType = [
  {
    label: '全部方式',
    value: '',
  },
  {
    label: '微信支付',
    value: 'weixin',
  },
  {
    label: '余额支付',
    value: 'balance',
  },
]

@inject('order')
@observer
class Retail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderStatus: '全部',
      orderStatusValue: '-1',
      payType: '全部方式',
      payTypeValue: '',
      refreshing: false,
      searchtypeLabel: '订单号',
      searchtype: 'oid',
      keyword: '',
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { order } = this.props
    const { shopOrderList } = order
    const {
      height, orderStatusValue, payTypeValue, searchtype, keyword,
    } = this.state

    order.fetchShopOrderStatus()
    if (!shopOrderList.length) order.fetchShopOrderList(orderStatusValue, payTypeValue, searchtype, keyword)
    /* eslint react/no-find-dom-node: 0 */
    const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
    this.setState({
      height: hei,
    })
  }

  mapList = () => {
    const { order, history } = this.props
    return order.shopOrderList.map(item => (
      <React.Fragment key={item.order_id}>
        <Card onClick={() => history.push(`/order/retail/detail/${item.order_id}`)}>
          <Card.Header
            style={{ fontSize: 13, color: '#999' }}
            title={`下单时间：${moment(item.create_time * 1000).format('YYYY-MM-DD HH:mm')}`}
            extra={<div dangerouslySetInnerHTML={{ __html: item.pay_status }} />}
          />
          <Card.Body style={{ color: '#666', fontSize: 12 }}>
            <Flex>
              <div style={{ minWidth: 75 }}>订单编号:</div>
              <div>{item.order_id}</div>
            </Flex>
            <WhiteSpace />
            {item.fetch_number === '0' ? null : (
              <React.Fragment>
                <Flex>
                  <div style={{ minWidth: 75 }}>取单编号:</div>
                  <div>{item.fetch_number}</div>
                </Flex>
                <WhiteSpace />
              </React.Fragment>
            )}
            <Flex>
              <div style={{ minWidth: 75 }}>下单人:</div>
              <div>{item.username}</div>
            </Flex>
            <WhiteSpace />
            <Flex>
              <div style={{ minWidth: 75 }}>配送方式:</div>
              <div>{DeliverType[item.is_pick_in_store]}</div>
            </Flex>
            <WhiteSpace />
            <Flex align="start">
              <div style={{ minWidth: 75 }}>配送地址:</div>
              <div>{item.address}</div>
            </Flex>
            <WhiteSpace />
            <Flex>
              <div style={{ minWidth: 75 }}>订单总价:</div>
              <div>{item.total_price}</div>
            </Flex>
            <WhiteSpace />
            <Flex>
              <div style={{ minWidth: 75 }}>应收总额:</div>
              <div>{item.price}</div>
            </Flex>
          </Card.Body>
          <WhiteSpace />
          <Card.Footer
            content={`订单来源：${item.order_from_name}`}
            extra={this.curStatus(item)}
          >
          </Card.Footer>
          <WhiteSpace />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  curStatus = item => {
    if (item.status === '0') {
      return '可接单'
    }
    if (item.status === '1') {
      return ''
    }
    if (item.is_pick_in_store === '3' && item.status === '2' && item.user_confirm === '0') {
      return '已发货'
    }
    if (item.is_pick_in_store === '3' && item.status === '2' && item.user_confirm > '0') {
      return '已确认收货'
    }
    if (item.status === '2') {
      return '已消费'
    }
    if (item.status === '3') {
      return '已评价'
    }
    if (item.status === '4') {
      if (item.cancel_type === '7') {
        return '超时退款'
      }
      return '已退款'
    }
    if (item.status === '5') {
      if (item.cancel_type === '7') {
        return '超时取消'
      }
      return '已取消'
    }
    if (item.status === '7' && item.paid === '1') {
      return '发货到自提'
    }
    if (item.status === '8') {
      return '已发货到自提'
    }
    if (item.status === '9') {
      return '自提点接货'
    }
    if (item.status === '10') {
      return '配送中'
    }
    if (item.order_from === '6') {
      return '已取消'
    }
    return '未支付'
  }

  findSearchTypeLabelAndFetch = value => {
    const { order } = this.props
    const { orderStatusValue, payTypeValue, keyword } = this.state
    const result = SearchType.find(item => item.value === value[0])
    this.setState({
      searchtypeLabel: result.label,
      searchtype: result.value,
    })
    order.resetAndFetchShopOrderList(orderStatusValue, payTypeValue, result.value, keyword)
  }

  findStatusLabelAndFetch = value => {
    const { order } = this.props
    const { payTypeValue, searchtype, keyword } = this.state
    const { shopOrderStatus } = order
    const result = shopOrderStatus.find(item => item.value === value[0])
    this.setState({
      orderStatus: result.label,
      orderStatusValue: result.value,
    })
    order.resetAndFetchShopOrderList(result.value, payTypeValue, searchtype, keyword)
  }

  findPayLabelAndFetch = value => {
    const { order } = this.props
    const { orderStatusValue, searchtype, keyword } = this.state
    const result = PayType.find(item => item.value === value[0])
    this.setState({
      payType: result.label,
      payTypeValue: result.value,
    })
    order.resetAndFetchShopOrderList(orderStatusValue, result.value, searchtype, keyword)
  }

  loadMore = async () => {
    const { order } = this.props
    const {
      orderStatusValue, payTypeValue, searchtype, keyword,
    } = this.state
    this.setState({ refreshing: true })
    await order.fetchShopOrderList(orderStatusValue, payTypeValue, searchtype, keyword)
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  render() {
    const { order } = this.props
    const {
      orderStatus,
      payType,
      refreshing,
      height,
      orderStatusValue,
      payTypeValue,
      searchtype,
      searchtypeLabel,
      keyword,
    } = this.state
    return (
      <React.Fragment>
        <NavBar title="零售订单" goBack />
        <SearchBar
          placeholder={searchtypeLabel}
          value={keyword}
          onChange={val => this.setState({ keyword: val })}
          onSubmit={val => order.resetAndFetchShopOrderList(orderStatusValue, payTypeValue, searchtype, val)
          }
        />
        <WhiteSpace />
        <WingBlank size="sm">
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={SearchType}
              cols={1}
              value={[searchtype]}
              onChange={val => this.findSearchTypeLabelAndFetch(val)}
            >
              <div>
                <span>搜索条件：{searchtypeLabel}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={order.shopOrderStatus}
              cols={1}
              value={[orderStatusValue]}
              onChange={val => this.findStatusLabelAndFetch(val)}
            >
              <div>
                <span>{orderStatus}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={PayType}
              cols={1}
              value={[payTypeValue]}
              onChange={val => this.findPayLabelAndFetch(val)}
            >
              <div>
                <span>{payType}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
        </WingBlank>
        <WhiteSpace />
        <WingBlank size="sm">
          <PullToRefresh
            ref={this.refresh}
            refreshing={refreshing}
            style={{
              height,
              overflow: 'auto',
            }}
            indicator={{ deactivate: '上拉可以刷新' }}
            direction="up"
            onRefresh={this.loadMore}
          >
            {this.mapList()}
          </PullToRefresh>
        </WingBlank>
      </React.Fragment>
    )
  }
}

export default Retail
