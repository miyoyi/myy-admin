const NAME = 'name'
const VALUE = 'value'

export const GOODS_STATUS = [
  { [NAME]: '上架', [VALUE]: '1', zmClass: 'red' },
  { [NAME]: '未上架', [VALUE]: '2', zmClass: 'green' }
]
export const APPROVAL_STATUS = [
  { [NAME]: '待我审批', [VALUE]: '1' },
  { [NAME]: '我已审批', [VALUE]: '2' },
  { [NAME]: '我发起的', [VALUE]: '3' },
  { [NAME]: '我收到的', [VALUE]: '4' }
]
export const TEXT_CLASS = [
  { [NAME]: '已支付', [VALUE]: '1', zmClass: 'green' },
  { [NAME]: '未支付', [VALUE]: '2', zmClass: 'red' }
]

export const SEND_TYPE = [
  { [NAME]: '同城配送/自提', [VALUE]: '1' },
  { [NAME]: '商品电子码', [VALUE]: '2' },
  { [NAME]: '快递物流', [VALUE]: '3' }
]

export const STOCK_TYPE = [
  { [NAME]: '自有库存', [VALUE]: '1' },
  { [NAME]: '第三方库存', [VALUE]: '2' }
]

export const STOCK_STATUS = [
  { [NAME]: '已出售', [VALUE]: '1' },
  { [NAME]: '在库', [VALUE]: '2' },
  { [NAME]: '已过期', [VALUE]: '3' },
  { [NAME]: '已出库', [VALUE]: '4' }
]

export const LOCATION_TYPE = [
  { [NAME]: '已定位', [VALUE]: '1', zmClass: 'green' },
  { [NAME]: '未定位', [VALUE]: '0' }
]

export const GOOD_STATUS_STOCK = [
  {
    [NAME]: '上架',
    [VALUE]: '1'
  },
  {
    [NAME]: '下架',
    [VALUE]: '2'
  },
  {
    [NAME]: '库存不足',
    [VALUE]: '3'
  }
]

export const IS_TYPE = [
  {
    [NAME]: '否',
    [VALUE]: '0'
  },
  {
    [NAME]: '是',
    [VALUE]: '1'
  }
]

export const TIME_TYPE = [
  {
    [NAME]: '每天',
    [VALUE]: '1'
  },
  {
    [NAME]: '每周',
    [VALUE]: '2'
  },
  {
    [NAME]: '每月',
    [VALUE]: '3'
  }
]
export const WEEK_LIST = [
  {
    [NAME]: '周一',
    [VALUE]: '1'
  },
  {
    [NAME]: '周二',
    [VALUE]: '2'
  },
  {
    [NAME]: '周三',
    [VALUE]: '3'
  },
  {
    [NAME]: '周四',
    [VALUE]: '4'
  },
  {
    [NAME]: '周五',
    [VALUE]: '5'
  },
  {
    [NAME]: '周六',
    [VALUE]: '6'
  },
  {
    [NAME]: '周日',
    [VALUE]: '0'
  }
]

// 审批状态
export const CHECK_TYPE = [
  {
    [NAME]: '已通过',
    [VALUE]: '3'
  },
  {
    [NAME]: '被驳回',
    [VALUE]: '2'
  },
  {
    [NAME]: '审批中',
    [VALUE]: '1'
  },
  {
    [NAME]: '已撤销',
    [VALUE]: '4'
  },
  {
    [NAME]: '未提交',
    [VALUE]: '0'
  }
]

// 业务类型
export const BUSINESS_TYPE = [
  {
    [NAME]: '影票团体',
    [VALUE]: '1'
  },
  {
    [NAME]: '影票营销',
    [VALUE]: '2'
  },
  {
    [NAME]: '中瑞心选',
    [VALUE]: '3'
  }
]

// 兑换范围
export const PRODUCT_EXCHANGE = [
  {
    [NAME]: '线上',
    [VALUE]: '1'
  },
  {
    [NAME]: '线下',
    [VALUE]: '2'
  }
]
// 审批类型
export const PROCESS_TYPE = {
  product: '1', // 产品上架
  specPrice: '2', // 特殊价格配置
  normalSaleOrder: '3', // 日常销售单
  specSaleOrder: '4', // 特殊销售单
  customeSaleOrder: '5', // 客情销售单
  saleOrderRefund: '6', // 销售单退款
  backInputApprove: '7', // 回款录入审批
  saleOrderSpecialConfig: '8'// 销售单特殊价格配置
}

// 业绩单核算状态
export const ACCOUNTING_STATUS = [
  {
    [NAME]: '已确认',
    [VALUE]: '2'
  },
  {
    [NAME]: '待核算',
    [VALUE]: '0'
  },
  {
    [NAME]: '待确认',
    [VALUE]: '1'
  },
  {
    [NAME]: '申诉中',
    [VALUE]: '3'
  }
  // {
  //   [NAME]: '撤销申诉',
  //   [VALUE]: '4'
  // }
]
export const GIVE_STATUS = [
  {
    [NAME]: '不可转赠',
    [VALUE]: '0'
  },
  {
    [NAME]: '可转赠',
    [VALUE]: '1'
  }
]
export const UNBIND_STATUS = [
  {
    [NAME]: '不可解绑',
    [VALUE]: '0'
  }
  // {
  //   [NAME]: '可解绑',
  //   [VALUE]: '1'
  // }
]
