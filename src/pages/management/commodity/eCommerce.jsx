import React from 'react'
import NavBar from '@/common/NavBar'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import { createForm } from 'rc-form'
import {
  SearchBar,
  Picker,
  WhiteSpace,
  PullToRefresh,
  WingBlank,
  Button,
  Switch,
  Card,
  Flex,
} from 'antd-mobile'
import { FilterBox } from '@/styled'

@createForm()
@inject('commodity')
@observer
class ECommerce extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: '全部店铺',
      storeValue: '',
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.refresh = React.createRef()
  }

  componentDidMount() {
    const { commodity } = this.props
    const { eCommerceList } = commodity
    const { height } = this.state
    commodity.fetchECommerceValues()
    if (this.refresh.current) {
      /* eslint react/no-find-dom-node: 0 */
      const hei = height - ReactDOM.findDOMNode(this.refresh.current).offsetTop
      console.log(hei)
      this.setState({
        height: hei,
      })
    }
    if (!eCommerceList.length) commodity.fetchECommerceList()
  }

  detele = (id, storeId) => {
    const { commodity } = this.props
    commodity.fetchECommerceDelete(storeId, id).then(() => {
      commodity.fetchECommerceList()
    })
  }

  stand = (id, status, storeId) => {
    const { commodity } = this.props
    commodity.changeECommerceStand(storeId, id, status === '0' ? 1 : 0)
  }

  mapList = () => {
    const { commodity, history } = this.props
    const { eCommerceList } = commodity
    return eCommerceList.map(item => (
      <React.Fragment key={item.goods_id}>
        <Card>
          <Card.Header title={item.s_name} thumb={item.list_pic} />
          <Card.Body>
            <Flex style={{ color: '#666' }}>
              <Flex.Item>售价: {item.price} 元</Flex.Item>
              <Flex.Item> 库存: {item.stock_num}</Flex.Item>
              <Flex.Item>已售出: {item.sell_count}</Flex.Item>
            </Flex>
            <WhiteSpace />
            <Flex>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => this.detele(item.goods_id, item.store_id)}
                >
                  删除
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(
                    `/management/commodity/eCommercePanel/编辑/${item.store_id}/${item.goods_id}/`,
                  )
                  }
                >
                  编辑
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(
                    `/management/commodity/eCommerceDiscounts/编辑/${item.store_id}/${
                      item.goods_id
                    }/`,
                  )
                  }
                >
                  优惠
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(
                    `/management/commodity/eCommerceSpread/编辑/${item.store_id}/${
                      item.goods_id
                    }/`,
                  )
                  }
                >
                  佣金
                </Button>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <WhiteSpace />
          <Card.Footer
            extra={
              <React.Fragment>
                状态：
                <Switch
                  checked={item.status === '1'}
                  onClick={() => this.stand(item.goods_id, item.status, item.store_id)}
                />
              </React.Fragment>
            }
          />
          <WhiteSpace />
        </Card>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  loadMore = async () => {
    const { commodity } = this.props
    this.setState({ refreshing: true })
    await commodity.fetchECommerceList()
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 100)
  }

  findStoreLabelAndFetch = value => {
    const { commodity } = this.props
    const { eCommerceValues } = commodity
    const result = eCommerceValues.find(item => item.value === value[0])
    this.setState({
      store: result.label,
      storeValue: result.value,
    })
    commodity.fetchECommerceList(result.value)
  }

  render() {
    const {
      storeValue, store, refreshing, height,
    } = this.state
    const { commodity } = this.props
    const { eCommerceValues } = commodity
    return (
      <React.Fragment>
        <NavBar
          title="电商商品管理"
          goBack
          right={
            <Link style={{ color: '#fff' }} to="/management/commodity/eCommercePanel/添加">
              添加
            </Link>
          }
        />
        <SearchBar placeholder="商品名称" onChange={name => commodity.fetchECommerceLists(name)} />
        <WhiteSpace />
        <WingBlank size="sm">
          <FilterBox style={{ marginRight: 5 }}>
            <Picker
              data={eCommerceValues}
              cols={1}
              value={[storeValue]}
              onChange={val => this.findStoreLabelAndFetch(val)}
            >
              <div>
                <span>{store}</span>
                <i className="iconfont" style={{ fontSize: 10, marginLeft: 5, color: '#999' }}>
                  &#xe6f0;
                </i>
              </div>
            </Picker>
          </FilterBox>
        </WingBlank>
        <WhiteSpace />
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
          <WingBlank size="sm">{this.mapList()}</WingBlank>
        </PullToRefresh>
      </React.Fragment>
    )
  }
}
export default ECommerce