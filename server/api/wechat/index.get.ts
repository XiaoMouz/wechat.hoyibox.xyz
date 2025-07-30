import { z } from 'zod'
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
  const list:string[] = await storage.getKeys()
  const schema = z.object({
    offset: z.number().optional(),
  })
  const { data, error } = await getValidatedQuery(event, schema.safeParse)
  if (error) {
    setResponseStatus(event, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: 'Invalid query',
    }
  }
  const offset = data?.offset || 0

  const groups = await Promise.all(
    list.map(async (key) => {
      const data = await getValue<WechatGroup>(key)
      return data
    })
  )

  return {
    message: 'OK',
    count: list.length,
    groups,
  }
})
