<script setup lang="ts">
import { boolean } from 'zod'
import {
  useWechatForm,
  useWechatQRCodeDialog,
} from '~/compasbles/useWechatForm'
import { ScrollArea } from '~/components/ui/scroll-area'
import { columns } from '~/components/wechat/Tables/columns'
import { useWechatStore } from '~/store/group'
import type { WechatGroup } from '~/types/wechat-group.type'

definePageMeta({
  title: '后台',
  middleware: 'auth',
})

const { createGroup, fetchGroups, deleteGroup, updateGroup } = useWechatStore()
const store = useWechatStore()
fetchGroups()
const { create, edit, model } = useWechatForm()

const { model: qr } = useWechatQRCodeDialog()

const groups = computed(() => store.groups)
</script>
<template>
  <div class="flex gap-6 max-w-[90dvw]">
    <WechatDialogForm v-model="model" />
    <WechatQRCodeDialog v-model="qr" />
    <ScrollArea>
      <WechatTablesDataTable :columns="columns" :data="groups" />
    </ScrollArea>
  </div>
</template>
