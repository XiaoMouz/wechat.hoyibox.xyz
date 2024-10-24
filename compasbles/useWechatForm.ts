import { useWechatStore } from '~/store/group'
import type { WechatGroup } from '~/types/wechat-group.type'

export const useWechatForm = () => {
  const state = useState('wechat', () => {
    const dialogInfo: {
      id: string | undefined
      title: string
      groups?: WechatGroup
      open: boolean
      submitFunction: undefined | ((value: WechatGroup) => Promise<boolean>)
    } = {
      id: getUUID(),
      title: '新增',
      open: false,
      submitFunction: undefined,
    }
    return dialogInfo
  })
  const edit = (
    group: WechatGroup,
    submitFunction: (value: WechatGroup) => Promise<boolean>
  ) => {
    state.value = {
      id: group.id,
      title: '编辑',
      open: true,
      groups: group,
      submitFunction: submitFunction,
    }
  }
  const create = (submitFunction: (value: WechatGroup) => Promise<boolean>) => {
    state.value = {
      id: getUUID(),
      title: '新增',
      open: true,
      submitFunction: submitFunction,
    }
  }
  const model = state
  return { edit, create, model }
}
