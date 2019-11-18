import axios from 'axios'

export const createOrder = money =>
  axios.post('/appapi.php?c=Merchantapp&a=money_add', {
    ticket: localStorage.getItem('ticket'),
    money,
  })

export const checkOrder = (id, type, code) =>
  axios.post(
    `/appapi.php?c=MerchantPay&a=check&order_id=${id}&type=${type}&code=${code}`,
    {
      ticket: localStorage.getItem('ticket'),
    },
  )

export const goPay = (id, type, paytype, openid) =>
  axios.post('/appapi.php?c=MerchantPay&a=go_pay', {
    order_id: id,
    order_type: type,
    pay_type: paytype,
    openId: openid,
    ticket: localStorage.getItem('ticket'),
  })

export const getWxConfig = () =>
  axios.post('/appapi.php?c=Config&a=wx_config', {
    ticket: localStorage.getItem('ticket'),
  })

export const fetchWithdrawRecord = (page, size, type) =>
  axios.get('/appapi.php?c=Merchantapp&a=money_withdraw_records', {
    params: {
      page,
      size,
      type,
      ticket: localStorage.getItem('ticket'),
    },
  })
export const fetchAddCreditRecord = (page, size) =>
  axios.get('/appapi.php?c=Merchantapp&a=money_merrecharge_list', {
    params: {
      page,
      size,
      ticket: localStorage.getItem('ticket'),
    },
  })

export const fetchIncomeRecord = (
  page,
  size,
  type,
  storeId,
  beginTime,
  endTime,
) =>
  axios.get('/appapi.php?c=Merchantapp&a=money_income_list', {
    params: {
      page,
      size,
      type,
      store_id: storeId,
      begin_time: beginTime,
      end_time: endTime,
      ticket: localStorage.getItem('ticket'),
    },
  })

export const fetchIncomeCategoryList = () =>
  axios.get('/appapi.php?c=Merchantapp&a=get_alias_c_name3', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

export const fetchIncomeStoreList = () =>
  axios.get('/appapi.php?c=Merchantapp&a=get_store', {
    params: {
      show_all: 1,
      ticket: localStorage.getItem('ticket'),
    },
  })

export const fetchWithDrawInfo = () =>
  axios.get('/appapi.php?c=Merchantapp&a=money_withdraw_info', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

export const withDraw = payload =>
  axios.post('/appapi.php?c=Merchantapp&a=money_withdraw', {
    withdraw_type: payload.receiptValue,
    name: payload.name,
    money: payload.amount,
    weixin_account: payload.accountValue,
    info: payload.remark,
    card_username: payload.cardUserName,
    card_number: payload.cardNumber,
    bank: payload.bank,
    invoice: payload.invoice,
    ticket: localStorage.getItem('ticket'),
  })

export const fetchMinPrice = () =>
  axios.get('/appapi.php?c=Merchantapp&a=get_config', {
    params: {
      ticket: localStorage.getItem('ticket'),
    },
  })

export const fetchBankAps = (page, bank, province, city, key) =>
  axios.post('/appapi.php?c=BankAccount&a=querybankaps', {
    page,
    bank,
    province,
    city,
    key,
    ticket: localStorage.getItem('ticket'),
  })

// 绑定银行卡获取手机验证码
export const bindBankCard = payload =>
  axios.post('/appapi.php?c=BankAccount&a=BindRelateAcctUnionPay', {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  })

export const verCode = payload =>
  axios.post('/appapi.php?c=BankAccount&a=BindRelateAccReUnionPay', {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  })

export const unBindBank = () =>
  axios.post('/appapi.php?c=BankAccount&a=UnbindRelateAcct', {
    ticket: localStorage.getItem('ticket'),
  })

export const createAccount = () =>
  axios.post('/appapi.php?c=BankAccount&a=OpenCustAcctId', {
    ticket: localStorage.getItem('ticket'),
  })

// 查询银行卡余额
export const fetchBankBalance = () =>
  axios.post('/appapi.php?c=BankAccount&a=CustAcctIdBalanceQuery', {
    ticket: localStorage.getItem('ticket'),
  })

// 获取
export const getBankWithDrawCode = real =>
  axios.post('/appapi.php?c=BankAccount&a=ApplicationTextMsgDynamicCode', {
    tranamt: real,
    ticket: localStorage.getItem('ticket'),
  })

// 银行卡提现
export const bankWithDraw = payload =>
  axios.post('/appapi.php?c=BankAccount&a=MemberWithdrawCash', {
    ...payload,
    ticket: localStorage.getItem('ticket'),
  })

// 银行卡提现记录
export const fetchWithDrawRecord = page =>
  axios.post('/appapi.php?c=BankAccount&a=withdraw_lists', {
    page,
    size: 10,
    ticket: localStorage.getItem('ticket'),
  })

// 获取平安权限
export const getUserConfig = () =>
  axios.post('/appapi.php?c=Merchantapp&a=get_config', {
    ticket: localStorage.getItem('ticket'),
  })

// 获取UID
export const getUID = id =>
  axios.post('/appapi.php?c=Merchant&a=getMerchantDetail', {
    mer_id: id,
    ticket: localStorage.getItem('ticket'),
  })
