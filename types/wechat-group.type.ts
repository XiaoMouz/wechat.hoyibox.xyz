export interface WechatGroup {
  id: string
  name: string
  description: string
  enable: boolean
  dueDate: number
  updateAt: number
  link?: string
  qrcode?: string
}
