<script setup lang="ts">
import { useToast } from '~/components/ui/toast'
import type { WechatGroup } from '~/types/wechat-group.type'

useHead({
  title: '邀请加入',
  meta: [
    {
      name: 'description',
      content: '你好呀',
    },
  ],
})

preloadComponents('LoadingCycle')
preloadComponents('Icon')

const route = useRoute()
const id = route.params.id
const router = useRouter()
// get data from /api/wechat/:id,set header 'X-Visit' to true
const { data: body, error } = useFetch<{
  message: string
  data: WechatGroup
}>(`/api/wechat/${id}`, {
  headers: {
    'X-Visit': 'true',
  },
})

const data = body.value?.data

const { toast } = useToast()

if (!data) {
  toast({
    title: '未找到',
    description: '这个群可能已经被删除了',
    variant: 'destructive',
  })
  router.push('/')
}

const isWechat = computed(() => {
  return data?.link?.includes('https://weixin.qq.com/g/')
})

const jumping = computed(() => {
  return data?.direct && data?.link && !isWechat.value
})

if (data && data?.direct && data?.link && !isWechat.value) {
  jumpToWechat()
}

const loading = ref(false)

function jumpToWechat() {
  toast({
    title: '正在跳转至链接',
    description: '速度取决于您与远端的网络环境，坐和放宽~',
  })
  if (data?.link) {
    window.location.replace(data.link)
  }
}

function copyURL() {
  navigator.clipboard.writeText(`https://${location.host}/link/${id}`)
  toast({
    title: '已复制',
    description: '链接已经复制到剪贴板',
  })
}
</script>

<template>
  <ClientOnly>
    <div
      v-if="!jumping"
      class="flex flex-col items-center justify-center gap-6"
    >
      <div class="flex flex-col gap-6">
        <Card
          ><CardHeader class="text-2xl font-bold">
            <CardTitle class="flex items-center gap-2"
              ><Icon name="mdi:navigation-variant-outline" class="size-8"></Icon
              >你好呀</CardTitle
            >
            <CardDescription
              >邀请你进入
              <HoverCard>
                <HoverCardTrigger as-child>
                  <Button variant="link">{{ data?.name }} </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80">
                  <div class="flex justify-between space-x-4">
                    <div class="space-y-1">
                      <h4 class="text-sm font-semibold">一点详细信息</h4>
                      <p class="text-sm">
                        {{ data?.description || '暂无描述' }}
                      </p>
                      <div class="flex items-center pt-2">
                        <span
                          v-if="data?.updateAt"
                          class="text-xs text-muted-foreground"
                        >
                          邀请链接上次更新于
                          {{ new Date(data.updateAt).toLocaleString() }}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardDescription></CardHeader
          >
          <CardContent class="flex flex-col flex-auto w-full gap-8">
            <div
              v-if="isWechat"
              class="flex flex-col items-center gap-4 justify-center"
            >
              <span class="text-sm">微信需要扫码加入，请长按二维码扫码</span>
              <AppQRCode
                v-if="data?.link"
                class="p-2 border-2 rounded-3xl shadow-md"
                :data="data?.link"
              />
            </div>
            <div class="flex flex-row flex-auto w-full gap-2">
              <Button
                :disabled="loading"
                variant="default"
                @click="jumpToWechat"
                ><div v-if="!loading" class="flex gap-1 items-center">
                  <Icon name="mdi:exit-run" class="size-4" />火速入场
                </div>
                <div v-else class="flex gap-1 items-center">
                  <LoadingCycle /> 正在跳转
                </div>
              </Button>
              <span class="text-2xl cursor-default select-none"
                >&nbsp;&nbsp;&nbsp;/</span
              ><Dialog>
                <DialogTrigger as-child>
                  <Button
                    :disabled="loading"
                    class="flex gap-1 items-center"
                    variant="link"
                  >
                    <Icon
                      name="mdi:cellphone-screenshot"
                      class="size-4"
                    />截图扫码加入</Button
                  >
                </DialogTrigger>
                <DialogContent
                  class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
                >
                  <DialogHeader class="p-6 pb-0">
                    <DialogTitle>原图</DialogTitle>
                    <DialogDescription>
                      本图可以将其保存到手机相册，然后使用微信扫一扫功能加入，PC直接拿手机扫码也可以
                    </DialogDescription>
                  </DialogHeader>
                  <div class="grid gap-4 py-4 overflow-y-auto px-6">
                    <img :src="data?.qrcode" alt="QR Code" class="w-full" />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
          <CardFooter>
            <span class="text-sm flex flex-row"
              >Tracker ID:&nbsp;
              <code
                @click="copyURL"
                class="cursor-pointer border-2 px-1 rounded-lg shadow-lg flex flex-row items-center gap-1"
              >
                <Icon name="mdi:link-variant" /> {{ id }}</code
              >
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-6">
      <LoadingCycle />
      跃迁中...
    </div>
  </ClientOnly>
</template>
