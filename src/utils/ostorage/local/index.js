import {
  LocalItem
} from '@/utils/ostorage/storageJsBase64'
import * as names from './names'
import namespace from '../namespace'

export const loginTypeLocal = new LocalItem({
  name: names.LOGIN_TYPE,
  encrypt: false
})
export const realRouteLocal = new LocalItem({
  name: names.REAL_ROUTE,
  encrypt: false,
  namespace
})
loginTypeLocal.getOrDefault = namespace
