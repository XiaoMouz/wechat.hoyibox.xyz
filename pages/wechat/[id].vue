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

if (data && data?.direct && data?.link) {
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
</script>

<template>
  <ClientOnly>
    <div
      v-if="!data?.direct"
      class="flex flex-col items-center justify-center gap-6"
    >
      <div class="flex flex-col gap-6">
        <Card
          ><CardHeader class="text-2xl font-bold">
            <CardTitle class="flex items-center gap-2"
              ><Icon name="mdi:navigation-variant-outline" class="size-8"></Icon
              >邀请</CardTitle
            >
            <CardDescription
              >邀请您加入
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
                </HoverCardContent> </HoverCard
              >微信群聊
            </CardDescription></CardHeader
          >
          <CardContent
            class="flex flex-row flex-auto w-full gap-4 items-center"
          >
            <Button :disabled="loading" @click="jumpToWechat"
              ><div v-if="!loading" class="flex gap-1 items-center">
                <Icon name="mdi:exit-run" class="size-4" />火速入场
              </div>
              <div v-else class="flex gap-1 items-center">
                <LoadingCycle /> 正在跳转
              </div>
            </Button>
            <span>或者</span
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
          </CardContent>
          <CardFooter>
            <code class="text-sm">Tracker ID: {{ data?.id }}</code>
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
