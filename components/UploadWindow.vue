<template>
  <div
    class="border relative border-dashed border-foreground transition-all duration-300 rounded-md p-4 text-center cursor-pointer py-8 hover:bg-shadow"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
    @click="triggerFileInput"
  >
    <input
      type="file"
      ref="fileInput"
      @change="onFileChange"
      style="display: none"
      multiple
    />
    <div class="text-sm flex flex-col items-center gap-1 relative">
      <div
        class="flex w-10 h-10 items-center justify-center rounded-full transition duration-300 cursor-pointer hover:bg-slate-400 dark:hover:bg-gray-400 fill-gray-900 dark:fill-slate-100 ease-in-out"
      >
        <Transition name="slide">
          <Icon
            v-if="!isUploading"
            name="mdi:cloud-upload-outline"
            class="size-8 absolute"
          />
          <Icon v-else name="mdi:progress-upload" class="size-8 absolute" />
        </Transition>
      </div>
      <div>
        <span v-if="!isUploading">{{ message }}</span>
        <div v-else class="flex flex-row gap-1">
          <span>上传中... {{ progress }}%</span>
        </div>
        <Progress v-if="isUploading" v-model="progress"></Progress>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type VNodeRef } from 'vue'
import type { UploadWindowType } from './wechat/GroupForm.vue'
import { useToast } from './ui/toast'
import qrcode from 'tc-qrcode'

const { toast } = useToast()

const message = ref('点击或拖拽文件上传')
const isUploading = ref(false)
const fileInput = ref<VNodeRef | null>(null)
const progress = ref(0)

const emit = defineEmits<{
  decoded: [value: string]
  uploaded: [value: string]
}>()
const { id } = defineProps<{
  id: string | undefined
}>()

const onDragOver = () => {
  message.value = '释放以上传文件'
}

const onDragLeave = () => {
  message.value = '点击或拖拽文件上传'
}

const onDrop = (event: any) => {
  const files = event.dataTransfer.files
  if (files.length) {
    uploadFiles(files)
  }
}

const triggerFileInput = () => {
  if (!fileInput.value || !fileInput.value) return
  fileInput.value.click()
}

const onFileChange = (event: any) => {
  const files = event.target.files
  if (files.length) {
    uploadFiles(files)
  }
}

const uploadFiles = (files: any) => {
  isUploading.value = true
  const totalFiles = files.length
  let uploadedFiles = 0
  qrcode.decodeFromFile(files[0]).then((result) => {
    if (result) {
      emit('decoded', result)
    }
  })

  const uploadFile = (file: any) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `/api/file/${id}`, true)

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        progress.value = Math.round((event.loaded / event.total) * 100)
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        uploadedFiles++
        if (uploadedFiles === totalFiles) {
          isUploading.value = false
          message.value = '上传完成'
        }
        const response = JSON.parse(xhr.response)
        emit('uploaded', response.data.url)
      } else {
        isUploading.value = false
        toast({
          title: '上传失败',
          description: `${xhr.status} - ${xhr.statusText}`,
          variant: 'destructive',
        })
      }
    }
    xhr.onerror = (e) => {
      isUploading.value = false
      toast({
        title: '上传失败',
        description: 'xhr.onerror',
        variant: 'destructive',
      })
    }

    const formData = new FormData()
    formData.append('file', file)
    xhr.send(formData)
  }

  for (const file of files) {
    uploadFile(file)
  }
}
</script>

<style scoped>
.slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(+20px);
}

.slide-leave-from,
.slide-enter-to {
  opacity: 1;
  transform: translateX(0px);
}
</style>
