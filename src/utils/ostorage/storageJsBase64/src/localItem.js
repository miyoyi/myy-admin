import Storage from './cls/storage'

export default class LocalItem extends Storage {
  constructor ({
    name,
    encrypt = true,
    namespace
  }) {
    super({
      name,
      encrypt,
      storage: localStorage,
      namespace
    })
  }
}
