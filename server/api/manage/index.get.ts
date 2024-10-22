import { getValue } from '~/server/model/kv'
import { ensureAuth } from '~/server/utils/sercret'
import { WechatGroup } from '~/types/wechat-group.type'

export default eventHandler(async (event) => {
  const auth = await ensureAuth(event)
  if (!auth) {
    setResponseStatus(event, 401, 'Unauthorized')
    return {
      message: 'Failed',
      error: 'Unauthorized',
    }
  }
  const data = await getValue<WechatGroup>('groups')
  return {
    message: 'OK',
    data,
  }
})
