import { setValue } from '~/server/model/blob'
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
  const formData = await readFormData(event)
  const name = event.context.params ? event.context.params.name : null
  if (name === null) {
    setResponseStatus(event, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: 'Invalid Name',
    }
  }

  const file = formData.get('file')
  if (!formData || !file) {
    setResponseStatus(event, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: 'Invalid Form Data',
    }
  }
  const blob = new Blob([file])

  blob.arrayBuffer().then(async (arrayBuffer) => {
    const buffer = Buffer.from(arrayBuffer)
    await setValue(name, buffer)
  })
  return {
    message: 'Success',
    data: {
      name,
      // url have domain
      url: `https://${useRuntimeConfig().domain}/api/file/${name}`,
    },
  }
})
