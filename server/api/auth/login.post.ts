import z from 'zod'
import jwt from 'jsonwebtoken'

//export const refreshTokens: Record<number, Record<string, any>> = {};
export const SECRET = useRuntimeConfig().authSecret

export default defineEventHandler(async (event) => {
  const body = z
    .object({
      password: z.string(),
    })
    .safeParse(await readBody(event))

  if (!body.success) {
    console.log(body.error)
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }
  const { password } = body.data

  if (password != useRuntimeConfig().rimoPasskey) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Password incorrect',
    })
  }
  const expiresIn = '7d'
  //const refreshToken =
  //  Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
  const user = {
    username: 'RimoOvO',
    picture: '/rimo.jpg',
  }

  const accessToken = jwt.sign({ ...user }, SECRET, {
    expiresIn,
  })
  //set username to cookie
  setCookie(event, 'username', 'RimoOvO', {
    maxAge: 60 * 60 * 24 * 7,
  })
  setCookie(event, 'auth.token', accessToken, { maxAge: 60 * 60 * 24 * 7 })
  // refreshTokens[refreshToken] = {
  //   accessToken,
  //   user,
  // };
  return {
    token: accessToken,
    expiresIn,
    user,
  }
})
