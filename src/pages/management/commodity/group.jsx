import React from 'react'
import NavBar from '@/common/NavBar'
import { SearchBar, List } from 'antd-mobile'
import CardList from './components/Group'
import { Group } from '@/config/list'

const { Item } = List
export default () => {
  return (
    <React.Fragment>
      <NavBar
        title="团购商品管理"
        goBack
      />
      <SearchBar placeholder="商品名称" maxLength={8} />
      <CardList list={Group} />
      <List>
        <div style={{ fontWeight: 'bold', width: '100%', display: 'flex', justifyContent: 'space-around', position: 'fixed', bottom: '0', background: '#ffb000' }}>
          <Item style={{ paddingLeft: '0', background: '#ffb000' }}>
            <i className="iconfont" style={{ marginRight: '6px' }}>&#xe61e;</i>
            添加套餐
          </Item>
          <Item style={{ paddingLeft: '0', background: '#ffb000' }}>
            <i className="iconfont" style={{ marginRight: '6px' }}>&#xe61e;</i>
            添加商品
          </Item>
        </div>
      </List>
    </React.Fragment>
  )
}
