
// import md5 from 'md5'
import md5 from 'js-md5'
import * as auth from '@/utils/auth'
const CryptoJS = require('crypto-js')

// 加密
export function Encrypt (text, token) {
  // 后台
  const { key, iv } = getKeyAndIv(token)
  return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
}

function getKeyAndIv (token) {
  console.log(token, 'tokentokentoken')
  token = token || auth.getToken()
  const md5Token = md5(token).toLowerCase()
  const key = md5Token.slice(0, 16)
  const iv = md5Token.slice(-16)
  return { key, iv }
}

// 解密
export function Decrypt (text, token) {
  const { key, iv } = getKeyAndIv(token)
  const decrypted = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
