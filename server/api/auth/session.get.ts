import { ensureAuth } from '~/server/utils/sercret'

export default eventHandler(async (event) => {
  const user = await ensureAuth(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
  setResponseStatus(event, 200)
  return {
    status: 'ok',
  }
})
