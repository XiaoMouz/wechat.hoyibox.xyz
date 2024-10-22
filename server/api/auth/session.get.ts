import { ensureAuth } from '~/server/utils/sercret'

export default eventHandler(async (event) => {
  const user = await ensureAuth(event)
  return user
})
