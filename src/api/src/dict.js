import axios from '@/utils/fetch'

// 获取字典 (1.4 存本地)
export function getDictList (params) {
  return axios({
    url: `/public/getDictList`,
    params
  })
}
