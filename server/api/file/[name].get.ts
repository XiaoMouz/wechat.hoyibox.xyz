import { getItem } from '~/server/model/blob'

export default eventHandler(async (event) => {
  const name = event.context.params ? event.context.params.name : null
  if (name === null) {
    setResponseStatus(event, 400, 'Bad Request')
    return {
      message: 'Failed',
      error: 'Invalid Name',
    }
  }

  // set header
  const file = await getItem(name)
  if (!file) {
    setResponseStatus(event, 404, 'Not Found')
    return {
      message: 'Failed',
      error: 'File Not Found',
    }
  }
  setResponseHeader(event, 'Content-Type', 'image/jpeg')
  // get file from storage
  return file
})
