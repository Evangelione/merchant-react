import { observable, action, runInAction } from 'mobx'
import * as services from './services'
import ErrorCode from '@/config/ErrorCode'

class MastSotre {
  @observable groupList = []

  @observable groupListPage = 1

  @observable groupListSize = 10

  @observable groupListTotal = null

  @observable groupDetail = []

  @observable shopList = []

  @observable groupCatFir = []

  @observable groupCatSec = []

  @observable reserveList = []

  @observable reserveListPage = 1

  @observable reserveListSize = 10

  @observable reserveListTotal = null

  @observable reserveCategoryOption = []

  @observable cateringDetail = {}

  @observable cateringList = []

  @observable cateringListPage = 1

  @observable cateringListSize = 10

  @observable cateringListTotal = null

  @observable eCommerceDetail = {}

  @observable eCommerceMeal = []

  @observable eCommerceValues = []

  @observable cardGroupAll = []

  @observable eCommerceList = []

  @observable eCommerceListPage = 1

  @observable eCommerceListSize = 10

  @observable eCommerceListTotal = null

  @observable cateringValues = []

  @observable cateringMeal = []

  @observable cateringDelete = {}

  @observable cateringStand = {}

  @observable eCommerceDelete = {}

  @observable cacheStore = {}

  @observable userLevels = []

  @observable giftVoucher = []

  @observable goodsCategory = []

  @observable expressLists = []

  @observable expressDetail = {}

  @observable retailDelete = []

  @observable appointDetail = []

  @observable workerList = []

  @observable levelList = []

  @observable groupPackage = []

  @action
  fetchGroupList = async keyword => {
    let hasMore = true
    if (this.groupListTotal !== null) {
      hasMore = this.groupListPage * this.groupListSize < this.groupListTotal
      if (hasMore) {
        this.groupListPage += 1
      }
    }
    const response = await services.fetchGroupList(this.groupListPage, this.groupListSize, keyword)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.groupList
          arr.push(...response.data.result.lists)
          this.groupList = arr
          this.groupListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.groupListTotal % this.groupListSize
        if (remainder) {
          runInAction(() => {
            this.groupList.splice(this.groupListTotal - remainder, remainder)
            const arr = this.groupList
            arr.push(...response.data.result.lists)
            this.groupList = arr
            this.groupListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  resetAndFetchGroupList = keyword => {
    runInAction(() => {
      this.groupList = []
      this.groupListPage = 1
      this.groupListTotal = null
      this.fetchGroupList(keyword)
    })
  }

  @action
  fetchGroupMealAdd = async (title, description) => {
    await services.fetchGroupMealAdd(title, description)
  }

  @action
  fetchReserveList = async () => {
    let hasMore = true
    if (this.reserveListTotal !== null) {
      hasMore = this.reserveListPage * this.reserveListSize < this.reserveListTotal
      if (hasMore) {
        this.reserveListPage += 1
      }
    }
    const response = await services.fetchReserveList(this.reserveListPage, this.reserveListSize)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.reserveList
          arr.push(...response.data.result.lists)
          this.reserveList = arr
          this.reserveListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.reserveListTotal % this.reserveListSize
        if (remainder) {
          runInAction(() => {
            this.reserveList.splice(this.reserveListTotal - remainder, remainder)
            const arr = this.reserveList
            arr.push(...response.data.result.lists)
            this.reserveList = arr
            this.reserveListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchReserveCategoryOption = async () => {
    const response = await services.fetchReserveCategoryOption()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.reserveCategoryOption = response.data.result
      })
    }
  }

  @action
  insertReserve = async payload => {
    const response = await services.insertReserve(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyReserve = async payload => {
    const response = await services.modifyReserve(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchReserveDetail = async id => {
    const response = await services.fetchReserveDetail(id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.appointDetail = response.data.result
      })
    }
  }

  @action
  fetchCateringList = async storeId => {
    let hasMore = true
    if (this.cateringListTotal !== null) {
      hasMore = this.cateringListPage * this.cateringListSize < this.cateringListTotal
      if (hasMore) {
        this.cateringListPage += 1
      }
    }
    const response = await services.fetchCateringList(
      this.cateringListPage,
      this.cateringListSize,
      storeId,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.cateringList
          arr.push(...response.data.result.lists)
          this.cateringList = arr
          this.cateringListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.cateringListTotal % this.cateringListSize
        if (remainder) {
          runInAction(() => {
            this.cateringList.splice(this.cateringListTotal - remainder, remainder)
            const arr = this.cateringList
            arr.push(...response.data.result.lists)
            this.cateringList = arr
            this.cateringListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchCateringDetail = async goodid => {
    const response = await services.fetchCateringDetail(goodid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cateringDetail = response.data.result
      })
    }
  }


   @action
   fetchGroupDetail = async goodid => {
     const response = await services.fetchGroupDetail(goodid)
     if (response.data.errorCode === ErrorCode.SUCCESS) {
       runInAction(() => {
         this.groupDetail = response.data.result
       })
     }
   }

   @action
   fetchShopList = async appointType => {
     const response = await services.fetchShopList(appointType)
     if (response.data.errorCode === ErrorCode.SUCCESS) {
       runInAction(() => {
         const shopList = response.data.result.store_list
         shopList.shift(0)
         shopList.forEach(item => {
           if (item.worker_list) {
             item.worker_list.forEach(i => {
               i.value = i.merchant_worker_id
               i.label = i.name
             })
           }
         })
         this.shopList = shopList
       })
     }
   }


  @action
  fetchGroupCat = async catfid => {
    const response = await services.fetchGroupCat(catfid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        if (!catfid) {
          this.groupCatFir = response.data.result
        } else {
          this.groupCatSec = response.data.result
        }
      })
    }
  }

  @action
  addCategory = async payload => {
    const response = await services.addCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyCategory = async payload => {
    const response = await services.modifyCategory(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  // @action
  // fetchECommerceLists = async name => {
  //   const response = await services.fetchECommerceLists(name)
  //   if (response.data.errorCode === ErrorCode.SUCCESS) {
  //     runInAction(() => {
  //       this.eCommerceLists = response.data.result
  //     })
  //   }
  // }

  @action
  fetchECommerceList = async storeId => {
    let hasMore = true
    if (this.eCommerceListTotal !== null) {
      hasMore = this.eCommerceListPage * this.eCommerceListSize < this.eCommerceListTotal
      if (hasMore) {
        this.eCommerceListPage += 1
      }
    }
    const response = await services.fetchECommerceList(
      this.eCommerceListPage,
      this.eCommerceListSize,
      storeId,
    )
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      if (hasMore) {
        runInAction(() => {
          const arr = this.eCommerceList
          arr.push(...response.data.result.lists)
          this.eCommerceList = arr
          this.eCommerceListTotal = response.data.result.total - 0
        })
      } else {
        const remainder = this.eCommerceListTotal % this.eCommerceListSize
        if (remainder) {
          runInAction(() => {
            this.eCommerceList.splice(this.eCommerceListTotal - remainder, remainder)
            const arr = this.eCommerceList
            arr.push(...response.data.result.lists)
            this.eCommerceList = arr
            this.eCommerceListTotal = response.data.result.total - 0
          })
        }
      }
    }
  }

  @action
  fetchECommerceDetail = async (id, goodid) => {
    const response = await services.fetchECommerceDetail(id, goodid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.eCommerceDetail = response.data.result
      })
    }
  }

  @action
  addECommerce = async payload => {
    const response = await services.addECommerce(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  modifyECommerce = async payload => {
    const response = await services.modifyECommerce(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  goodsSpread = async payload => {
    const response = await services.goodsSpread(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  goodsDiscounts = async payload => {
    const response = await services.goodsDiscounts(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchCateringMeal = async storeId => {
    const response = await services.fetchCateringMeal(storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cateringMeal = response.data.result
      })
    }
  }

  @action
  fetchCateringValues = async () => {
    const response = await services.fetchCateringValues()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cateringValues = response.data.result
      })
    }
  }

  @action
  fetchCateringDelete = async (storeId, mealId) => {
    await services.fetchCateringDelete(storeId, mealId)
  }

  @action
  fetchCateringStand = async (storeId, mealId, status) => {
    await services.fetchCateringStand(storeId, mealId, status)
  }

  @action
  fetchECommerceDelete = async (storeId, goodsId) => {
    await services.fetchECommerceDelete(storeId, goodsId)
  }

  @action
  changeECommerceStand = async (storeId, goodsId, status) => {
    const response = await services.changeECommerceStand(storeId, goodsId, status)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      this.eCommerceList.forEach((item, index) => {
        if (item.goods_id === goodsId) {
          runInAction(() => {
            const now = `${status}` !== '1' ? '0' : '1'
            this.eCommerceList[index].status = now
          })
        }
      })
      return Promise.resolve(true)
    }
  }

  @action
  fetchUserLevel = async (storeId, goodid) => {
    const response = await services.fetchUserLevel(storeId, goodid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.userLevels = response.data.result
      })
    }
  }

  @action
  fetchECommerceMeal = async storeId => {
    const response = await services.fetchECommerceMeal(storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.eCommerceMeal = response.data.result
      })
    }
  }

  @action
  fetchECommerceValues = async () => {
    const response = await services.fetchECommerceValues()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.eCommerceValues = response.data.result
      })
    }
  }

  @action
  fetchCardGroupAll = async () => {
    const response = await services.fetchCardGroupAll()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.cardGroupAll = response.data.result
      })
    }
  }

  // 优惠券
  @action
  fetchGiftVoucher = async () => {
    const response = await services.fetchGiftVoucher()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.giftVoucher = response.data.result
      })
    }
  }

  // // 商城商品分类
  // @action
  // fetchGoodsSort = async storeId => {
  //   const response = await services.fetchGoodsSort(storeId)
  //   if (response.data.errorCode === ErrorCode.SUCCESS) {
  //     runInAction(() => {
  //       this.goodsSort = response.data.result
  //     })
  //   }
  // }

  // 商城商品分类
  @action
  fetchGoodsCategory = async () => {
    const response = await services.fetchGoodsCategory()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.goodsCategory = response.data.result
      })
    }
  }

  // 运费模板列表
  @action
  fetchExpressLists = async () => {
    const response = await services.fetchExpressLists()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.expressLists = response.data.result
      })
    }
  }

  @action
  fetchExpressDetail = async tid => {
    const response = await services.fetchExpressDetail(tid)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.expressDetail = response.data.result
      })
    }
  }

  @action
  fetchAddGroup = async groupAddDetail => {
    const response = await services.fetchAddGroup(groupAddDetail)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  addExpress = async payload => {
    const response = await services.addExpress(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchEditGroup = async (groupEditDetail, id) => {
    const response = await services.fetchEditGroup(groupEditDetail, id)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  editExpress = async payload => {
    const response = await services.editExpress(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }


  @action
  fetchGetWorker = async storeId => {
    const response = await services.fetchGetWorker(storeId)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      console.log(response.data)
    }
  }

  @action
  getLevelList = async () => {
    const response = await services.getLevelList()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.levelList = response.data.result
      })
    }
  }

  @action
  groupSpreadEdit = async payload => {
    const response = await services.groupSpreadEdit(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  appointSpreadEdit = async payload => {
    const response = await services.appointSpreadEdit(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  fetchGroupPackege = async () => {
    const response = await services.fetchGroupPackege()
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      runInAction(() => {
        this.groupPackage = response.data.result
      })
    }
  }

  @action
  addGroupPackage = async payload => {
    const response = await services.addGroupPackage(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  editAppointDis = async payload => {
    const response = await services.editAppointDis(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }

  @action
  editGroupDis = async payload => {
    const response = await services.editGroupDis(payload)
    if (response.data.errorCode === ErrorCode.SUCCESS) {
      return Promise.resolve(true)
    }
  }
}

export default new MastSotre()
