
const getters = {
  sidebar: state => state.app.sidebar,
  loading: state => state.app.loading,
  device: state => state.app.device,
  token: state => state.user.token,
  menus: state => state.user.menus,
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userInfo.id,
  headImg: state => state.user.userInfo.headImg,
  name: state => state.user.userInfo.realName,
  userName: state => state.user.userInfo.userName,
  email: state => state.user.userInfo.email,
  message: state => state.socket.message,
  messageCount: state => state.socket.messageCount
}
export default getters
