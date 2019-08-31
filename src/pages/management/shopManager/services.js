import axios from 'axios'

// 店员列表
export const fetchStaffList = storeId => axios.get('/appapi.php?c=Merchantapp&a=staff', {
  params: {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 店员删除
export const fetchStaffDelete = staffId => axios.post('/appapi.php?c=Merchantapp&a=staff_dell', {
  staff_id: staffId,
  ticket: localStorage.getItem('ticket'),
})

// 店员详情
export const fetchStaffDetail = (storeId, staffId) => axios.get('/appapi.php?c=Merchantapp&a=staff_detail', {
  params: {
    store_id: storeId,
    staff_id: staffId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 店员添加、编辑
export const addECommerce = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=staff_edit', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const modifyECommerce = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=staff_add', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

// 店员类型
export const fetchStaffType = storeId => axios.get('/appapi.php?c=Merchantapp&a=staff_type', {
  params: {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 所属连锁机构
export const fetchBusinessList = storeId => axios.get('/appapi.php?c=Merchantapp&a=business_list', {
  params: {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 商品店铺
export const fetchECommerceValues = () => axios.get('/appapi.php?c=Merchantapp&a=select_shop_store', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 管理分类列表
export const fetchClassify = storeId => axios.get('/appapi.php?c=Merchantapp&a=staff_category_lists', {
  params: {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 管理分类添加、编辑
export const addClassify = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=staff_category_edit', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const modifyClassify = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=staff_category_add', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const fetchClassifyDetail = id => axios.get('/appapi.php?c=Merchantapp&a=staff_category_detail', {
  params: {
    id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 分类删除
export const fetchClassifyDelete = id => axios.post('/appapi.php?c=Merchantapp&a=staff_category_del', {
  id,
  ticket: localStorage.getItem('ticket'),
})