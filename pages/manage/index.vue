<script setup lang="ts">
import { boolean } from 'zod'
import { useWechatForm } from '~/compasbles/useWechatForm'
import { ScrollArea } from '~/components/ui/scroll-area'
import { useToast } from '~/components/ui/toast'
import { columns } from '~/components/wechat/Tables/columns'
import { useWechatStore } from '~/store/group'
import type { WechatGroup } from '~/types/wechat-group.type'

definePageMeta({
  title: '后台',
  middleware: 'auth',
})

useHead({
  title: '后台',
  meta: [
    {
      name: 'description',
      content: '后台管理',
    },
  ],
})
const { toast } = useToast()

const { createGroup, fetchGroups, deleteGroup, updateGroup } = useWechatStore()
const store = useWechatStore()
const res = await fetchGroups()
if (!res) {
  toast({
    title: '获取数据失败',
    description: '请刷新页面',
    variant: 'destructive',
  })
}
const { create, edit, model } = useWechatForm()

const groups = computed(() => store.groups)
</script>
<template>
  <div class="flex gap-6 max-w-[90dvw]">
    <WechatDialogForm v-model="model" />
    <ScrollArea>
      <WechatTablesDataTable :columns="columns" :data="groups"
    /></ScrollArea>
  </div>
</template>
