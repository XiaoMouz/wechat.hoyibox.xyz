<template>
  <header
    class="w-full flex flex-nowrap justify-between items-center pt-5 pl-10 pr-20"
  >
    <div>
      <nuxt-link to="/">
        <Icon name="assets:cat" size="32" mode="svg" />
      </nuxt-link>
    </div>
    <div class="flex flex-row gap-6">
      <div
        class="flex w-10 h-10 items-center justify-center rounded-full transition duration-300 cursor-pointer hover:bg-slate-400 dark:hover:bg-gray-400 fill-gray-900 dark:fill-slate-100 ease-in-out"
        @click="isDark ? (isDark = false) : (isDark = true)"
      >
        <ClientOnly>
          <Transition name="fade">
            <Icon
              name="mdi:weather-night"
              class="absolute w-5 h-5"
              v-if="isDark"
            />
            <Icon name="mdi:weather-sunny" class="absolute w-5 h-5" v-else />
          </Transition>
        </ClientOnly>
      </div>

      <DropdownMenu v-if="authenticated">
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="relative h-8 w-8 rounded-full">
            <Avatar class="h-10 w-10">
              <AvatarImage src="/rimo.jpg" alt="RimoOvO" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
          <DropdownMenuLabel class="font-normal flex">
            <div class="flex flex-col gap-3">
              <div class="flex flex-row items-center gap-2">
                <p class="text-sm font-medium leading-none">RimoOvO</p>
              </div>
              <p class="text-xs leading-none text-muted-foreground">mua~</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <nuxt-link to="/manage">
              <DropdownMenuItem>
                管理
                <DropdownMenuShortcut>M</DropdownMenuShortcut>
              </DropdownMenuItem>
            </nuxt-link>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <nuxt-link to="/settings">
              <DropdownMenuItem>
                设置
                <DropdownMenuShortcut>S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </nuxt-link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <nuxt-link to="/auth/logout">
            <DropdownMenuItem>
              登出
              <DropdownMenuShortcut>Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </nuxt-link>
        </DropdownMenuContent>
      </DropdownMenu>
      <nuxt-link v-else to="/auth/login">
        <div
          class="flex w-10 h-10 items-center justify-center rounded-full transition duration-300 cursor-pointer hover:bg-slate-400 dark:hover:bg-gray-400 fill-gray-900 dark:fill-slate-100 ease-in-out"
        >
          <Icon class="w-5 h-5" mode="svg" name="mdi:bike-fast" />
        </div>
      </nuxt-link>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
const { authenticated } = storeToRefs(useAuthStore())

const isDark = useDark()
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
