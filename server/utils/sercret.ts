import bcrypt from 'bcryptjs'
import * as jwt from 'jose'
import { H3Event } from 'h3'

const SECRET_STRING = useRuntimeConfig().authSecret

export const hash = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export const compare = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash)
}

export const ensureAuth = async (event: H3Event) => {
  const authCookieValue = await getCookie(event, 'auth.token')

  if (typeof authCookieValue === 'undefined') {
    return false
  }
  const extractedToken = authCookieValue

  try {
    const SECRET = new TextEncoder().encode(SECRET_STRING)
    const decoded = await (await jwt.jwtVerify(extractedToken, SECRET)).payload
    if (typeof decoded !== 'object') {
      return false
    }
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}
