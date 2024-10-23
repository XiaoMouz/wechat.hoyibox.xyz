import { ensureAuth } from '~/server/utils/sercret'
export default eventHandler(async (event) => {
  const auth = await ensureAuth(event)
  if (!auth) {
    setResponseStatus(event, 401, 'Unauthorized')
    return {
      message: 'Failed',
      error: 'Unauthorized',
    }
  }
  const storage = useStorage('blob')
  // clean blob prefix
  const result = await storage.keys('blob').then((keys) => {
    return keys.map((key) => key.replace('blob:', ''))
  })
  return {
    message: 'OK',
    data: result,
  }
})
