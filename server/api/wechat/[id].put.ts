import { ensureAuth } from '~/server/utils/sercret'
import { schema } from './index.post'

import { setValue, haveValue } from '~/server/model/kv'

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

  const body = await readValidatedBody(event, schema.safeParse)

  if (body.error || !body.data) {
    setResponseStatus(event, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: body.error.message,
    }
  }

  if (body.data.id !== id) {
    setResponseStatus(event, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: 'ID not match',
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
  await setValue(id, body.data)
  return {
    message: 'Success',
    data: body.data,
  }
})
