import { getValue, setValue } from '~/server/model/kv'
import { WechatGroup } from '~/types/wechat-group.type'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    setResponseStatus(event, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: 'No data available - empty result',
    }
  }
  const data = await getValue<WechatGroup>(id)
  if (!data) {
    setResponseStatus(event, 404, 'Not Found')
    return {
      message: 'Failed',
      error: 'No data available - empty result',
    }
  }

  // if header have 'X-Visit' then data.accessNumber++ and setValue
  const visit = getHeader(event, 'X-Visit')
  if (visit) {
    data.accessNumber++
    await setValue(id, data)
  }
  return {
    message: 'OK',
    data: data,
  }
})
