<script setup lang="ts">
import { boolean } from 'zod'
import { useWechatForm } from '~/compasbles/useWechatForm'
import { ScrollArea } from '~/components/ui/scroll-area'
import { columns } from '~/components/wechat/Tables/columns'
import { payments } from '~/components/wechat/Tables/exmaple'
import { useWechatStore } from '~/store/group'
import type { WechatGroup } from '~/types/wechat-group.type'

definePageMeta({
  title: '后台',
  middleware: 'auth',
})

const { createGroup, fetchGroups, groups, deleteGroup, updateGroup } =
  useWechatStore()

const { create, edit, model } = useWechatForm()
</script>
<template>
  <div class="flex gap-6">
    <WechatDialogForm v-model="model" />
    <Button @click="create(createGroup)">Create</Button>
    <WechatTables :columns="columns" :data="payments" />
  </div>
</template>
