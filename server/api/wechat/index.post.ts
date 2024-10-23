import { z } from 'zod'
import { getValue, haveValue, setValue } from '~/server/model/kv'
import { ensureAuth } from '~/server/utils/sercret'
import { getUUID } from '~/server/utils/tools'
import { WechatGroup } from '~/types/wechat-group.type'

export const schema = z.object({
  id: z.string().default(getUUID()),
  name: z.string(),
  description: z.string().optional(),
  enable: z.boolean().default(true),
  dueDate: z
    .number()
    .default(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime()),
  updateAt: z.number().default(new Date().getTime()),
  qrcode: z.string().optional(),
  link: z.string().optional(),
  direct: z.boolean().default(false),
  accessNumber: z.number().default(0),
})

export default eventHandler(async (event) => {
  const auth = await ensureAuth(event)
  if (!auth) {
    setResponseStatus(event, 401, 'Unauthorized')
    return {
      message: 'Failed',
      error: 'Unauthorized',
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

  if (!(await haveValue(body.data.id))) {
    await setValue(body.data.id, body.data)

    return {
      message: 'OK',
      data: body.data,
    }
  }
  return {
    message: 'Failed',
    error: 'ID already exists, use update please',
  }
})
