import { defineStore } from 'pinia'
import { type WechatGroup } from '~/types/wechat-group.type'

export const useWechatStore = defineStore('wechat', {
  state: () => ({
    groups: ref<WechatGroup[]>([]),
  }),
  actions: {
    async fetchGroups(): Promise<boolean> {
      // useFetch from nuxt 3
      const { groups, message } = await $fetch<{
        groups: WechatGroup[]
        message?: string
      }>('/api/wechat/', {
        method: 'get',
      }).catch((e) => {
        console.error(e)
        return { groups: [], message: 'error' }
      })
      if (message) {
        return false
      }
      this.groups = groups || []
      return true
    },
    async deleteGroup(id: string): Promise<boolean> {
      // useFetch from nuxt 3
      const { message } = await $fetch<{
        message: string
      }>(`/api/wechat/${id}`, {
        method: 'delete',
      }).catch((e) => {
        console.error(e)
        return { message: 'error' }
      })
      if (message && message !== 'error') {
        this.groups = this.groups.filter((group) => group.id !== id)
        return true
      }
      return false
    },
    async createGroup(group: WechatGroup): Promise<boolean> {
      const { message } = await $fetch<{
        message: string
      }>(`/api/wechat/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: group,
      }).catch((e) => {
        console.error(e)
        return { message: 'error' }
      })
      if (message && message !== 'error') {
        this.groups = [...this.groups, group]
        return true
      }
      return false
    },
    async updateGroup(group: WechatGroup): Promise<boolean> {
      group.updateAt = new Date().getTime()
      const { message } = await $fetch<{
        message: string
      }>(`/api/wechat/${group.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: group,
      }).catch((e) => {
        console.error(e)
        return { message: 'error' }
      })
      if (message && message !== 'error') {
        this.groups = this.groups.map((g) => (g.id === group.id ? group : g))
        return true
      }
      return false
    },
  },
})
