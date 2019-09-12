import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import NavBar from '@/common/NavBar'
import { WhiteSpace, List, Toast } from 'antd-mobile'

@withRouter
@inject('order')
@observer
class Order extends React.Component {
  componentDidMount() {
    const { order } = this.props
    order.fetchOrderList()
    order.fetchReservationOrderListCount()
  }

  mapList = () => {
    const { order } = this.props
    const { orderList, reservationCount } = order
    return orderList.map(item => (
      <React.Fragment key={item.name}>
        <List>
          <List.Item
            arrow="horizontal"
            extra={item.name === '预定订单' ? reservationCount : item.count}
            onClick={() => {
              const { history } = this.props
              if (item.name === '零售订单') {
                history.push('/order/retail')
                return false
              }
              if (item.name === '团购订单') {
                history.push('/order/groupList/0')
                return false
              }
              if (item.name === '预定订单') {
                history.push('/order/reservation')
                return false
              }
              Toast.info('暂无权限，请联系管理员')
            }}
          >
            {item.name}
          </List.Item>
        </List>
        <WhiteSpace />
      </React.Fragment>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="订单列表" />
        <WhiteSpace />
        {this.mapList()}
      </React.Fragment>
    )
  }
}

export default Order
