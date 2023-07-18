import {
  Base64
} from 'js-base64'

export const Encrypt = {
  encode (data, encrypt = true) {
    return encrypt ? Base64.encode(data) : data
  },
  decode (data, encrypt = true) {
    return encrypt ? Base64.decode(data) : data
  }
}

export default class Storage {
  constructor ({
    name,
    encrypt = true,
    storage = null,
    namespace = ''
  }) {
    this.name = name
    this.encrypt = encrypt

    if (storage == null) {
      throw new Error('storage must not be null')
    }
    this.storage = storage
    this.namespace = namespace
  }
  set (data) {
    this.storage.setItem(this.name, Encrypt.encode(data, this.encrypt))
  }
  get () {
    const value = this.storage.getItem(this.name)
    return value ? Encrypt.decode(value, this.encrypt) : value
  }
  setJSON (data) {
    this.set(JSON.stringify(data))
  }
  getJSON () {
    let data
    try {
      data = JSON.parse(this.get() || '{}')
    } catch (error) {
      data = {}
    }
    return data
  }
  getNamespace () {
    if (!this.namespace) {
      throw new Error('namespace must not be empty.')
    }
    return typeof this.namespace === 'function' ? this.namespace() : this.namespace
  }
  setByNamespace (data) {
    const namespace = this.getNamespace()
    const json = {
      [namespace]: data
    }
    this.storage.setItem(this.name, Encrypt.encode(JSON.stringify(json), this.encrypt))
  }
  getByNamespace () {
    const namespace = this.getNamespace()
    try {
      const json = JSON.parse(Encrypt.decode(this.storage.getItem(this.name)), this.encrypt)
      return json[namespace]
    // eslint-disable-next-line no-empty
    } catch (e) { }
    return null
  }
  remove () {
    this.storage.removeItem(this.name)
  }
}
