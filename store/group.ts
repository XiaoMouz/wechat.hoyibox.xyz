import { defineStore } from 'pinia'
import { type WechatGroup } from '~/types/wechat-group.type'

export const useWechatStore = defineStore('wechat', {
  state: () => ({
    groups: [] as WechatGroup[],
  }),
  actions: {
    async fetchGroups() {
      // useFetch from nuxt 3
      const { data, status } = await useFetch<{
        groups: WechatGroup[]
      }>('/api/wechat/', {
        method: 'get',
      })
      this.groups = data.value?.groups || []
    },
    async deleteGroup(id: string) {
      // useFetch from nuxt 3
      const { data, status } = await useFetch<{
        message: string
      }>(`/api/wechat/${id}`, {
        method: 'delete',
      })
      if (status.value === 'success') {
        this.groups = this.groups.filter((group) => group.id !== id)
      }
    },
    async createGroup(group: WechatGroup) {
      // useFetch from nuxt 3
      const { data, status } = await useFetch<{
        message: string
      }>(`/api/wechat/${group.id}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: group,
      })
      if (status.value === 'success') {
        this.groups.push(group)
      }
    },
    async updateGroup(group: WechatGroup) {
      // useFetch from nuxt 3
      const { data, status } = await useFetch<{
        message: string
      }>(`/api/wechat/${group.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: group,
      })
      if (status.value === 'success') {
        this.groups = this.groups.map((g) => (g.id === group.id ? group : g))
      }
    },
  },
})
