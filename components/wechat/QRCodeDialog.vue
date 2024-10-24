<script setup lang="ts">
import qrcode from 'tc-qrcode'
import { useWechatQRCodeDialog } from '~/compasbles/useWechatForm'
import Button from '../ui/button/Button.vue'
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../ui/dialog/'

const model = defineModel<{
  id: string
  open: boolean
}>({ required: true })
</script>
<template>
  <Dialog v-model="model.open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>微信二维码</DialogTitle>
        <DialogDescription>编辑ID: {{ model.id }}</DialogDescription>
      </DialogHeader>
      <ScrollArea>
        <div class="flex flex-col justify-between">
          <div class="flex justify-center">
            <!-- <node /> -->
          </div>
        </div>
      </ScrollArea>
      <DialogFooter>
        <!-- <Button @click="downloadImage">下载图片</Button>
        <Button @click="copyBase64toClipboard">复制 Base 64</Button> -->
        <DialogClose as-child>
          <Button>关闭</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
