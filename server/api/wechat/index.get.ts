import { getValue } from '~/server/model/kv'
import { WechatGroup } from '~/types/wechat-group.type'

export default defineEventHandler(async (event) => {
  const auth = await ensureAuth(event)
  if (!auth) {
    setResponseStatus(event, 401, 'Unauthorized')
    return {
      message: 'Failed',
      error: 'Unauthorized',
    }
  }
  const storage = useStorage('kv')
  const list = await storage.getKeys()

  // get top 10 keys value
  const groups = await Promise.all(
    list.slice(0, 10).map(async (key) => {
      return {
        key,
        value: await storage.getItem<WechatGroup>(key),
      }
    })
  )

  return {
    message: 'OK',
    count: list.length,
    groups,
  }
})
