import {
  SessionItem
} from '@/utils/ostorage/storageJsBase64'
import * as names from './names'
import namespace from '../namespace'

export const navServiceSession = new SessionItem({
  name: names.NAV_SERVICE,
  namespace
})

export const navMenuSession = new SessionItem({
  name: names.NAV_MENU,
  namespace
})

export const navEnterpriseSession = new SessionItem({
  name: names.NAV_ENTERPRISE,
  namespace
})

export const historySession = new SessionItem({
  name: names.HISTORY,
  namespace
})
