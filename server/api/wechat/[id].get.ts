import { getValue } from '~/server/model/kv'
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
  return {
    message: 'OK',
    data: data,
  }
})
