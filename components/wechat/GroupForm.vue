<script setup lang="ts">
import type { WechatGroup } from '~/types/wechat-group.type'
import { toTypedSchema } from '@vee-validate/zod'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
  type DateValue,
} from '@internationalized/date'

import { toDate } from 'radix-vue/date'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { useToast } from '../ui/toast'
import { useFileStore } from '~/store/file'
import { useWechatStore } from '~/store/group'

const { group, submitFunction } = defineProps<{
  group?: WechatGroup
  submitFunction: undefined | ((values: WechatGroup) => Promise<boolean>)
}>()

const emit = defineEmits<{
  submit: [values: () => void]
  close: [values: WechatGroup]
}>()

const { toast } = useToast()

export interface UploadWindowType {
  decodeURL: string
  qrcodeURL: string
}

const model = defineModel()

const wechatGroupSchema = toTypedSchema(
  z.object({
    id: z
      .string()
      .default(group ? (group.id ? group.id : getUUID()) : getUUID()),
    name: z.string(),
    description: z
      .string()
      .optional()
      .default(group?.description || ''),
    enable: z.boolean().default(group?.enable || true),
    dueDate: z
      .number()
      .default(
        group?.dueDate ||
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime()
      ),
    updateAt: z.number().default(group?.updateAt || new Date().getTime()),
    qrcode: z
      .string()
      .optional()
      .default(group?.qrcode || ''),
    link: z
      .string()
      .optional()
      .default(group?.link || ''),
    direct: z.boolean().default(group?.direct || false),
    accessNumber: z.number().default(group?.accessNumber || 0),
  })
)

const form = useForm({
  validationSchema: wechatGroupSchema,
})

const { handleSubmit, setFieldValue, values } = form

const { files, fetchFiles } = useFileStore()

const value = computed({
  get: () =>
    values.dueDate
      ? parseDate(new Date(values.dueDate).toISOString().split('T')[0])
      : undefined,
  set: (val) => val,
})

const placeholder = ref()

const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})

const uploading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  if (!submitFunction || submitFunction.name === 'undefined') {
    toast({
      title: '提交失败',
      description: '没有提交函数,刷新页面重试',
      variant: 'destructive',
    })
    return
  }
  uploading.value = true
  const res = await submitFunction(values)
  if (res) {
    toast({
      title: '提交成功',
    })
    emit('close', values)
  } else {
    toast({
      title: '提交失败',
      variant: 'destructive',
    })
  }
})

if (group) {
  setFieldValue('name', group.name)
}
model.value = values.id

onMounted(() => {
  fetchFiles()
})
</script>
<template>
  <div>
    <div v-if="true" class="p-4">
      <form @submit="onSubmit" class="flex flex-col gap-8">
        <div class="flex flex-col gap-4 md:gap-6">
          <div class="flex flex-col md:flex-row gap-4 md:gap-6">
            <fieldset class="grid w-full gap-6 rounded-lg border p-4">
              <legend class="-ml-1 px-1 text-sm font-medium">信息</legend>
              <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField v-slot="{ value, handleChange }" name="enable">
                <FormItem
                  class="flex flex-row items-center gap-2 justify-between rounded-lg border p-4"
                >
                  <div class="space-y-0.5">
                    <FormLabel class="text-base">启用</FormLabel>
                    <FormDescription>
                      启用后，用户可以访问该群
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch :checked="value" @update:checked="handleChange" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField v-slot="{ value, handleChange }" name="direct">
                <FormItem
                  class="flex flex-row items-center gap-2 justify-between rounded-lg border p-4"
                >
                  <div class="space-y-0.5">
                    <FormLabel class="text-base">直接跳转</FormLabel>
                    <FormDescription>
                      启用后，链接将会直接跳转到群链接
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch :checked="value" @update:checked="handleChange" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="dueDate">
                <FormItem class="flex flex-col">
                  <FormLabel>到期日</FormLabel>
                  <Popover>
                    <PopoverTrigger as-child>
                      <FormControl>
                        <Button
                          variant="outline"
                          :class="
                            cn(
                              'w-[240px] ps-3 text-start font-normal',
                              !value && 'text-muted-foreground'
                            )
                          "
                        >
                          <span>{{
                            value ? df.format(toDate(value)) : '选择一个日期'
                          }}</span>
                          <Icon
                            name="mdi:calendar-month"
                            class="ms-auto h-4 w-4 opacity-50"
                          />
                        </Button>
                        <input hidden />
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0">
                      <Calendar
                        v-model:placeholder="placeholder"
                        v-model="value"
                        calendar-label="到期日"
                        initial-focus
                        :min-value="today(getLocalTimeZone())"
                        @update:model-value="
                      (v:any) => {
                        if (v) {
                          setFieldValue(
                            'dueDate',
                            v.toDate('Asia/ShangHai').getTime()
                          )
                        } else {
                          setFieldValue('dueDate', undefined)
                        }
                      }
                    "
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </FormField>
              <ClientOnly>
                <FormField v-slot="{ componentField }" name="updateAt">
                  <FormItem>
                    <FormLabel>上次更新:</FormLabel>
                    <FormControl>
                      <Label type="text" v-bind="componentField">
                        {{ new Date(componentField.modelValue).toISOString() }}
                      </Label>
                    </FormControl>
                  </FormItem>
                </FormField>
              </ClientOnly>
            </fieldset>
            <fieldset class="grid w-full gap-6 rounded-lg border p-4">
              <legend
                class="-ml-1 px-1 text-sm font-medium flex flex-row items-center gap-1"
              >
                二维码<HoverCard>
                  <HoverCardTrigger as-child>
                    <Button class="p-0" variant="link"
                      ><Icon name="mdi:information"
                    /></Button>
                  </HoverCardTrigger>
                  <HoverCardContent class="w-80">
                    <div class="flex justify-between space-x-4">
                      <p class="text-sm">
                        二维码不手动设置，上传带二维码的图片即可，务必要是微信邀请群的二维码，再不济也要上传个内容是链接的二维码
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </legend>
              <FormField v-slot="{ componentField }" name="link">
                <FormItem>
                  <FormLabel>跳转链接</FormLabel>
                  <FormControl>
                    <Input disabled type="text" v-bind="componentField" />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="qrcode">
                <FormItem>
                  <FormLabel>二维码链接</FormLabel>
                  <FormControl>
                    <Input disabled type="text" v-bind="componentField" />
                  </FormControl>
                </FormItem>
              </FormField>
              <div>
                <UploadWindow
                  @decoded="
                    (v) => {
                      setFieldValue('link', v)
                      if (v !== values.link) {
                        setFieldValue('accessNumber', 0)
                      }
                    }
                  "
                  @uploaded="(v) => setFieldValue('qrcode', v)"
                  :id="values.id"
                />
              </div>
              <FormField v-slot="{ componentField }" name="accessNumber">
                <FormItem>
                  <FormLabel>本二维码访问人数:</FormLabel>
                  <FormControl>
                    <Label type="text" v-bind="componentField">
                      {{ componentField.modelValue }}
                    </Label>
                  </FormControl>
                </FormItem>
              </FormField>
            </fieldset>
          </div>
          <fieldset class="grid gap-6 rounded-lg border p-4">
            <legend class="-ml-1 px-1 text-sm font-medium">附加信息</legend>
            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>描述</FormLabel>
                <FormControl>
                  <Textarea type="text" v-bind="componentField">
                    {{ componentField.modelValue }}
                  </Textarea>
                </FormControl>
              </FormItem>
            </FormField>
          </fieldset>
        </div>

        <div>
          <Button :disabled="uploading" type="submit">
            <span v-if="!uploading">提交</span>
            <LoadingCycle v-else />
          </Button>
        </div>
      </form>
    </div>
    <div class="w-full h-full flex items-center justify-center" v-else>
      <div class="flex flex-col items-center gap-2">
        <Icon class="size-8" name="mdi:selection-off" />
        <span>无数据</span>
      </div>
    </div>
  </div>
</template>
