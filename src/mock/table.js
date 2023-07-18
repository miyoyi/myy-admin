// import Mock from 'mockjs'
const Mock = require('mockjs')
const statusName = ['已上架', '已下架']
const data = Mock.mock({
  'items|30': [
    {
      id: '@increment',
      name: '@sentence(10, 20)',
      classification: '@integer(1, 5000)',
      stock: '@integer(300, 5000)',
      'type|1': ['1', '2'],
      typeName: function () {
        return ['电子商品', '实体商品'][this.type - 1]
      },
      surplus: '@integer(1, 300)',
      sold: '@integer(300,2000)',
      'sellPrice|1-100.2': 1,
      'shelf|1': ['1', '2'],
      shelfName: function () {
        return statusName[this.shelf - 1]
      },
      startTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
      endTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
      classificationName: '@sentence(10, 20)',
      time: '@datetime("yyyy-MM-dd A HH:mm:ss")',
      'standards|1-3': [
        {
          id: '@increment',
          'name|+1': ['月卡', '年卡'],
          stock: '@integer(300, 5000)',
          surplus: '@integer(1, 300)',
          sold: function () {
            // console.log(this)
            return this.stock - this.surplus
          }
        }
      ]
    }
  ]
})
export default [
  {
    url: '/commodity/getPageList',
    type: 'get',
    response: config => {
      const { title, page = 1, pageSize = 10, shelf } = config.query
      let mockList = data.items.filter(item => {
        if (shelf && item.shelf !== shelf) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const items = mockList.filter(
        (item, index) =>
          index < pageSize * page && index >= pageSize * (page - 1)
      )
      return {
        code: 20000,
        data: {
          count: mockList.length,
          list: items
        }
      }
    }
  }
]
