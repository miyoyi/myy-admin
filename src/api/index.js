// api 文件以统一格式 export function xxx 输出
import { requireFolderObj } from '@/utils'
const api = requireFolderObj(require.context('./src', true, /^\.\/[\s\S]+\/*\.js$/), ['./index.js'])
export default api
// export const api
