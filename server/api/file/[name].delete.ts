import { removeItem } from '~/server/model/blob'
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
  const name = event.context.params ? event.context.params.name : null
  if (!name) {
    setResponseStatus(event, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: 'Invalid ID',
    }
  }
  await removeItem(name).then(() => {
    console.log('remove', name)
  })
  return {
    message: 'Done',
  }
})
