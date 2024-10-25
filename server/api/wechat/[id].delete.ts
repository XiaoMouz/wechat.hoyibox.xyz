import { removeItem } from '~/server/model/blob'
import { haveValue, removeValue } from '~/server/model/kv'
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

  const id = event.context.params ? event.context.params.id : null
  if (id === null) {
    setResponseStatus(event, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: 'Invalid ID',
    }
  }
  const exists = await haveValue(id)
  if (!exists) {
    setResponseStatus(event, 404, 'Not Found')
    return {
      message: 'Failed',
      error: 'Not Found',
    }
  }
  await removeValue(id)

  await removeItem(id)
  return {
    message: 'Success',
  }
})
