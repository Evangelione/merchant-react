import React from 'react'
import { Route } from 'react-router-dom'
import Retail from './retail'
import GroupList from './groupList'
import GroupOrderDetail from './groupOrderDeteail'
import RetailDetail from './retailDetail'
import Reservation from './reservation'
import ReservationDetail from './reservationDetail'
import Arrival from './arrival'
import ArrivalDetail from './arrivalDetail'

export default () => (
  <React.Fragment>
    <Route path="/order/groupList/:groupId" component={GroupList} />
    <Route
      path="/order/groupOrderDetail/:orderId"
      component={GroupOrderDetail}
    />
    <Route path="/order/retail" exact component={Retail} />
    <Route path="/order/retail/detail/:id" component={RetailDetail} />
    <Route path="/order/reservation" exact component={Reservation} />
    <Route path="/order/reservation/detail/:id" component={ReservationDetail} />
    <Route path="/order/arrival" exact component={Arrival} />
    <Route path="/order/arrival/detail/:id" component={ArrivalDetail} />
  </React.Fragment>
)
