import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', {
  state: () => ({
    files: [] as string[],
  }),
  actions: {
    async fetchFiles() {
      // useFetch from nuxt 3
      const { files } = await $fetch<{
        files: string[]
      }>('/api/file/', {
        method: 'get',
      })
      this.files = files || []
    },
    async deleteFile(name: string) {
      // useFetch from nuxt 3
      const { message } = await $fetch<{
        message: string
      }>(`/api/file/${name}`, {
        method: 'delete',
      })
      if (message) {
        this.files = this.files.filter((file) => file !== name)
      }
    },
    async createFile(name: string, file: File) {
      // useFetch from nuxt 3
      const { message } = await $fetch<{
        message: string
      }>(`/api/file/${name}`, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: file,
      })
      if (message) {
        this.files.push(name)
      }
    },
    async updateFile(name: string, file: File): Promise<void> {
      // useFetch from nuxt 3
      const { message } = await $fetch<{
        message: string
      }>(`/api/file/${name}`, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: file,
      })
      if (message) {
        this.files = this.files.map((f) => (f === name ? name : f))
      }
    },
  },
})
