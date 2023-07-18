import Storage from './cls/storage'

export default class SessionItem extends Storage {
  constructor ({ name, encrypt = true, namespace }) {
    super({
      name,
      encrypt,
      storage: sessionStorage,
      namespace
    })
  }
}
