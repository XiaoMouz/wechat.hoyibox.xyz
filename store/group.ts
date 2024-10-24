import { defineStore } from 'pinia'
import { type WechatGroup } from '~/types/wechat-group.type'

export const useWechatStore = defineStore('wechat', {
  state: () => ({
    groups: [] as WechatGroup[],
  }),
  actions: {
    async fetchGroups() {
      // useFetch from nuxt 3
      const { groups } = await $fetch<{
        groups: WechatGroup[]
      }>('/api/wechat/', {
        method: 'get',
      })
      this.groups = groups || []
    },
    async deleteGroup(id: string): Promise<boolean> {
      // useFetch from nuxt 3
      const { message } = await $fetch<{
        message: string
      }>(`/api/wechat/${id}`, {
        method: 'delete',
      })
      if (message) {
        this.groups = this.groups.filter((group) => group.id !== id)
        return true
      }
      return false
    },
    async createGroup(group: WechatGroup): Promise<boolean> {
      // useFetch from nuxt 3
      const { message } = await $fetch<{
        message: string
      }>(`/api/wechat/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: group,
      })
      if (message) {
        this.groups.push(group)
        return true
      }
      return false
    },
    async updateGroup(group: WechatGroup): Promise<boolean> {
      // useFetch from nuxt 3
      const { message } = await $fetch<{
        message: string
      }>(`/api/wechat/${group.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: group,
      })
      if (message) {
        this.groups = this.groups.map((g) => (g.id === group.id ? group : g))
        return true
      }
      return false
    },
  },
})
