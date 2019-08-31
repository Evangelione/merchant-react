import axios from 'axios'

// 团购列表
export const fetchGroupList = (page, size, keyword) => axios.get('/appapi.php?c=Merchantapp&a=gpro', {
  params: {
    page,
    size,
    keyword,
    ticket: localStorage.getItem('ticket'),
  },
})

// 添加团购套餐
export const fetchGroupMealAdd = (title, description) => axios.post('/appapi.php?c=Merchantapp&a=mpackageadd', {
  title,
  description,
  ticket: localStorage.getItem('ticket'),
})

// 团购详情
export const fetchGroupDetail = goodid => axios.get('/appapi.php?c=Merchantapp&a=get_group_detail', {
  params: {
    group_id: goodid,
    ticket: localStorage.getItem('ticket'),
  },
})

// 团购分类
export const fetchGroupCat = catfid => axios.get('/appapi.php?c=Merchantapp&a=group_category', {
  params: {
    cat_fid: catfid,
    ticket: localStorage.getItem('ticket'),
  },
})

// 预定列表
export const fetchReserveList = (page, size) => axios.get('/appapi.php?c=Merchantapp&a=apro', {
  params: {
    page,
    size,
    ticket: localStorage.getItem('ticket'),
  },
})

// 获取分类picker的option
export const fetchReserveCategoryOption = () => axios.get('/appapi.php?c=Merchantapp&a=get_all_appoint_category', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 新增预定商品
export const insertReserve = payload => axios.post('/appapi.php?c=Merchantapp&a=add_appoint', {
  ...payload,
  ticket: localStorage.getItem('ticket'),
})

// 编辑预定商品
export const modifyReserve = payload => axios.post('/appapi.php?c=Merchantapp&a=edit_appoint', {
  ...payload,
  ticket: localStorage.getItem('ticket'),
})

// 获取预定商品详情
export const fetchReserveDetail = id => axios.get('/appapi.php?c=Merchantapp&a=get_appoint', {
  params: {
    appoint_id: id,
    ticket: localStorage.getItem('ticket'),
  },
})

// 餐饮列表
export const fetchCateringList = (page, size, storeId) => axios.get('/appapi.php?c=Merchantapp&a=mpro', {
  params: {
    page,
    size,
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 电商列表
export const fetchECommerceList = (page, size, storeId) => axios.get('/appapi.php?c=Merchantapp&a=spro', {
  params: {
    page,
    size,
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

export const fetchECommerceLists = (page, size, name) => axios.get('/appapi.php?c=Merchantapp&a=spro', {
  params: {
    page,
    size,
    name,
    ticket: localStorage.getItem('ticket'),
  },
})

// 餐饮商店
export const fetchCateringValues = () => axios.get('/appapi.php?c=Merchantapp&a=select_meal_store', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 餐饮商店分类
export const fetchCateringMeal = storeId => axios.get('/appapi.php?c=Merchantapp&a=select_meal_sort', {
  params: {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 餐饮商品详情
export const fetchCateringDetail = (id, goodid) => axios.get('/appapi.php?c=Merchantapp&a=get_meal_detail', {
  params: {
    store_id: id,
    goods_id: goodid,
    ticket: localStorage.getItem('ticket'),
  },
})

export const addCategory = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=add_meal', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const modifyCategory = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=edit_meal', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

// 电商商品详情
export const fetchECommerceDetail = (id, goodid) => axios.get('/appapi.php?c=Merchantapp&a=goods_detail', {
  params: {
    store_id: id,
    goods_id: goodid,
    ticket: localStorage.getItem('ticket'),
  },
})

export const addECommerce = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=goods_add', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const modifyECommerce = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=goods_edit', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const goodsSpread = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=goods_spread', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const goodsDiscounts = payload => {
  const body = {}
  Object.keys(payload).forEach(item => {
    body[item] = payload[item]
  })
  return axios.post('/appapi.php?c=Merchantapp&a=goods_discount', {
    ...body,
    ticket: localStorage.getItem('ticket'),
  })
}

export const fetchUserLevel = (storeId, goodid) => axios.post('/appapi.php?c=Merchantapp&a=user_level', {
  store_id: storeId,
  goods_id: goodid,
  ticket: localStorage.getItem('ticket'),
})

// 餐饮删除
export const fetchCateringDelete = (storeId, mealId) => axios.post('/appapi.php?c=Merchantapp&a=mdel', {
  store_id: storeId,
  meal_id: mealId,
  ticket: localStorage.getItem('ticket'),
})

// 电商商店
export const fetchECommerceValues = () => axios.get('/appapi.php?c=Merchantapp&a=select_shop_store', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 餐饮商品上、下架
export const fetchCateringStand = (storeId, mealId, status) => axios.post('/appapi.php?c=Merchantapp&a=mstatusopt', {
  store_id: storeId,
  meal_id: mealId,
  status,
  ticket: localStorage.getItem('ticket'),
})

// 电商商品上、下架
export const changeECommerceStand = (storeId, goodsId, status) => axios.post('/appapi.php?c=Merchantapp&a=goods_status', {
  store_id: storeId,
  goods_id: goodsId,
  status,
  ticket: localStorage.getItem('ticket'),
})

// 电商商店分类
export const fetchECommerceMeal = storeId => axios.get('/appapi.php?c=Merchantapp&a=select_shop_sort', {
  params: {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 电商商品分类
// export const fetchGoodsSort = storeId => axios.get('/appapi.php?c=Merchantapp&a=select_goods_sort', {
//   params: {
//     store_id: storeId,
//     ticket: localStorage.getItem('ticket'),
//   },
// })

// 商城商品分类
export const fetchGoodsCategory = storeId => axios.get('/appapi.php?c=Merchantapp&a=goods_category', {
  params: {
    store_id: storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 电商会员分组
export const fetchCardGroupAll = () => axios.get('/appapi.php?c=Merchantapp&a=card_group_all', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 电商删除
export const fetchECommerceDelete = (storeId, goodsId) => axios.post('/appapi.php?c=Merchantapp&a=goods_del', {
  store_id: storeId,
  goods_id: goodsId,
  ticket: localStorage.getItem('ticket'),
})

// 店铺列表
export const fetchShopList = appointType => axios.get('/appapi.php?c=Merchantapp&a=get_store', {
  params: {
    appoint_type: appointType,
    ticket: localStorage.getItem('ticket'),
  },
})

// 优惠券
export const fetchGiftVoucher = () => axios.get('/appapi.php?c=Merchantapp&a=select_card_coupon', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 运费模板列表
export const fetchExpressLists = () => axios.get('/appapi.php?c=Merchantapp&a=select_express_lists', {
  params: {
    ticket: localStorage.getItem('ticket'),
  },
})

// 模板名称
export const fetchExpressDetail = tid => axios.get('/appapi.php?c=Merchantapp&a=express_detail', {
  params: {
    tid,
    ticket: localStorage.getItem('ticket'),
  },
})


// 新增团购产品
export const fetchAddGroup = groupAddDetail => axios.post('/appapi.php?c=Merchantapp&a=add_group', {
  ...groupAddDetail,
  ticket: localStorage.getItem('ticket'),
})

// 获取服务者
export const fetchGetWorker = storeId => axios.get('/appapi.php?c=Merchantapp&a=add_group', {
  params: {
    storeId,
    ticket: localStorage.getItem('ticket'),
  },
})

// 修改团购产品
export const fetchEditGroup = (groupEditDetail, groupId) => axios.post('/appapi.php?c=Merchantapp&a=edit_group', {
  ...groupEditDetail,
  group_id: groupId,
  ticket: localStorage.getItem('ticket'),
})

// 新增模版
export const addExpress = payload => axios.post('/appapi.php?c=Merchantapp&a=add_express', {
  ...payload,
  ticket: localStorage.getItem('ticket'),
})

// 编辑模版
export const editExpress = payload => axios.post('/appapi.php?c=Merchantapp&a=edit_express', {
  ...payload,
  ticket: localStorage.getItem('ticket'),
})
