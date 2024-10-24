<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'
import { useToast } from '~/components/ui/toast'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'

const { authenticateUser } = useAuthStore()

const { authenticated } = storeToRefs(useAuthStore())

const router = useRouter()

const { toast } = useToast()
definePageMeta({
  layout: 'auth',
  auth: {},
})

useHead({
  title: '喵喵喵上岸了',
  meta: [
    {
      name: 'description',
      content: '登录',
    },
  ],
})

const pending = ref(false)
const schema = z.object({
  password: z
    .string({
      required_error: '必须填写密码',
    })
    .min(6, {
      message: '密码至少6个字符',
    }),
})

async function onSubmit(values: Record<string, any>) {
  pending.value = true
  const { password } = schema.parse(values)
  await authenticateUser({ password })
  if (authenticated.value) {
    toast({
      title: '好耶',
      description: '登录成功',
    })
    router.push('/')
  } else {
    toast({
      title: '哎呀',
      description: '登录失败',
    })
  }
  pending.value = false
}
</script>
<template>
  <div class="my-auto min-w-[340px] space-y-6" :class="pending ? 'blur' : ''">
    <Card>
      <CardHeader>
        <CardTitle>登录到 <code>海猫岛</code> </CardTitle>
      </CardHeader>
      <CardContent>
        <AutoForm
          :schema="schema"
          :field-config="{
            password: {
              label: '密码',
              inputProps: {
                type: 'password',
                placeholder: '密码',
              },
            },
          }"
          @submit="onSubmit"
        >
          <Button class="mt-6" type="submit" :disabled="pending">登录</Button>
        </AutoForm>
      </CardContent>
    </Card>
  </div>
  <LoadingCycle v-if="pending" sizeClass="w-6 h-6" layoutClass="fixed" />
</template>
<style scoped>
.text-gradient {
  position: relative;
}

.text-gradient[data-text]::after {
  content: attr(data-text);
  color: cyan;
  position: absolute;
  top: 0;
  left: 0;
  mask-image: linear-gradient(to left, red, rgba(0, 0, 0, 0.5));
  -webkit-mask-image: linear-gradient(to left, red, rgba(0, 0, 0, 0.5));
}
</style>
