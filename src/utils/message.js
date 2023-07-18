
import { Message, MessageBox } from 'element-ui'
import PopupManager from 'element-ui/src/utils/popup/popup-manager'

function Msg () {}

const types = ['success', 'warning', 'error', 'info']

for (let i = types.length; i--;) {
  const type = types[i]
  Msg.prototype[type] = (msg = '操作成功') => {
    if (typeof msg === 'string') {
      Message({ showClose: true, type, message: msg })
    } else {
      Message(msg)
    }
  }
}

Msg.prototype.confirm = (str, title = '提示', obj = {}) => {
  setTimeout(() => {
    setClass()
  }, 200)

  const initObj = {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    customClass: 'myConfirm'
  }
  return MessageBox.confirm(str, title, { ...initObj, ...obj })
}
Msg.prototype.confirmDelete = ({str = '此操作将永久删除该文件, 是否继续?', title = '友情提示'} = {}) => {
  console.log(this)
  return Msg.prototype.confirm(str, title)
}
function setClass () {
  const myConfirm = document.getElementsByClassName('myConfirm')[0]
  if (!myConfirm) {
    return
  }
  myConfirm.style.zIndex = PopupManager.nextZIndex()
}

export default new Msg()
