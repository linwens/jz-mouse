const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  cacheMouseInfo: state => state.app.cacheMouseInfo,
  addingMouses: state => state.app.addingMouses,
  token: state => state.user.token,
  info: state => state.user.info,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
