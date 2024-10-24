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
import { useWechatForm } from '~/compasbles/useWechatForm'
import { useToast } from '~/components/ui/toast'
import { useWechatStore } from '~/store/group'
import type { WechatGroup } from '~/types/wechat-group.type'
import qrcode from 'tc-qrcode'

const { toast } = useToast()

const { group } = defineProps<{
  group: WechatGroup
}>()

defineEmits<{
  (e: 'expand'): void
}>()

const { edit } = useWechatForm()

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
const qrcodeDialogStatu = ref(false)

const copyURL = () => {
  navigator.clipboard.writeText(`https://${location.host}/wechat/${group.id}`)
  toast({
    title: '已复制',
    description: '链接已经复制到剪贴板',
  })
}

const copyBase64 = () => {
  const bnase64 = qrcode.encodeAsBase64(
    `https://${location.host}/wechat/${group.id}`
  )
  navigator.clipboard.writeText(bnase64)
  toast({
    title: '已复制',
    description: 'Base64 已经复制到剪贴板',
  })
}

const downloadImage = () => {
  const bnase64 = qrcode.encodeAsBase64(
    `https://${location.host}/wechat/${group.id}`
  )
  const a = document.createElement('a')
  a.href = bnase64
  a.download = 'qrcode.png'
  a.click()
}

onMounted(() => {})
</script>

<template>
  <Dialog v-model:open="dialogStatus">
    <Dialog v-model:open="qrcodeDialogStatu">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="w-8 h-8 p-0">
            <span class="sr-only">打！开！菜！单！</span>
            <MoreHorizontal class="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>操作</DropdownMenuLabel>
          <DropdownMenuItem @click="qrcodeDialogStatu = true">
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
          <DialogTitle>共享二维码</DialogTitle>
          <DialogDescription class="flex flex-col gap-3">
            <div class="flex flex-row items-center">
              <span class="text-yellow-300">></span><span>&nbsp;ID:&nbsp;</span>
              <code
                @click="copyURL"
                class="cursor-pointer border-2 px-1 rounded-lg shadow-lg flex flex-row items-center gap-1"
              >
                <Icon name="mdi:link-variant" /> {{ group.id }}</code
              >
            </div>
            <div class="flex justify-center">
              <WechatQRCode
                class="p-2 border-2 rounded-3xl shadow-md"
                :id="group.id"
              />
            </div>
            <div class="flex gap-4">
              <Button
                variant="link"
                class="flex flex-row gap-2 items-center"
                @click="copyBase64"
                ><Icon name="mdi:code-json" class="size-4" />复制Base64</Button
              >
              <Button
                variant="link"
                class="flex flex-row gap-2 items-center"
                @click="downloadImage"
                ><Icon
                  name="mdi:image-sync-outline"
                  class="size-4"
                />下载图片</Button
              >
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">好了</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
