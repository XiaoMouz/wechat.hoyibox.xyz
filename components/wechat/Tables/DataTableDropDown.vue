<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'
import {
  useWechatForm,
  useWechatQRCodeDialog,
} from '~/compasbles/useWechatForm'
import { useToast } from '~/components/ui/toast'
import { useWechatStore } from '~/store/group'
import type { WechatGroup } from '~/types/wechat-group.type'

const { toast } = useToast()

const { group } = defineProps<{
  group: WechatGroup
}>()

defineEmits<{
  (e: 'expand'): void
}>()

const { edit } = useWechatForm()

const { open } = useWechatQRCodeDialog()

const { updateGroup, deleteGroup } = useWechatStore()

const deleting = ref(false)

const dialogStatus = ref(false)

const deleteItem = async () => {
  deleting.value = true
  const res = await deleteGroup(group.id)
  if (res) {
    toast({
      title: '删除成功',
    })
    deleting.value = false
    dialogStatus.value = false
    return
  }

  toast({
    title: '删除失败',
    description: '我们也不知道发生了什么，你可以刷新一下看看它还在不在',
    variant: 'destructive',
  })
  deleting.value = false
}
</script>

<template>
  <Dialog v-model:open="dialogStatus">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="w-8 h-8 p-0">
          <span class="sr-only">打！开！菜！单！</span>
          <MoreHorizontal class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>操作</DropdownMenuLabel>
        <DropdownMenuItem
          @click="
            () => {
              open(group.id)
              console.log(group.id)
            }
          "
        >
          查看二维码
        </DropdownMenuItem>
        <DropdownMenuItem @click="edit(group, updateGroup)">
          编辑
        </DropdownMenuItem>
        <DropdownMenuItem @click="$emit('expand')">
          查看原始数据
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DialogTrigger asChild>
          <DropdownMenuItem
            ><span class="text-red-500">删除</span></DropdownMenuItem
          >
        </DialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>确认删除</DialogTitle>
        <DialogDescription>
          你即将删除 "<code
            ><strong>{{ group.name }}</strong></code
          >" 这个记录，这个操作无法撤销。
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          :disabled="deleting"
          variant="destructive"
          @click="deleteItem"
          type="submit"
        >
          <span v-if="!deleting"> 我就要删！</span>
          <LoadingCycle v-else />
        </Button>
        <DialogClose as-child>
          <Button :disabled="deleting" variant="outline">算了</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
