<script setup lang="ts">
import type { WechatGroup } from '~/types/wechat-group.type'

const dialogInfo = defineModel<{
  id: string | undefined
  title: string
  groups?: WechatGroup
  open: boolean
  submitFunction: undefined | ((value: WechatGroup) => Promise<boolean>)
}>({ required: true })
</script>

<template>
  <Dialog v-model:open="dialogInfo.open">
    <DialogContent
      class="sm:max-w-[425px] md:max-w-[695px] xl:max-w-[60dvw] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ dialogInfo.title }}</DialogTitle>
        <DialogDescription>编辑ID: {{ dialogInfo.id }}</DialogDescription>
      </DialogHeader>
      <ScrollArea class="overflow-y-auto">
        <div class="flex flex-col justify-between">
          <WechatGroupForm
            :group="dialogInfo.groups"
            v-model="dialogInfo.id"
            @close="dialogInfo.open = false"
            :submitFunction="dialogInfo.submitFunction"
          />
        </div>
      </ScrollArea>
    </DialogContent>
  </Dialog>
</template>
