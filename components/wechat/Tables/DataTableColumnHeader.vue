<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'

import { type WechatGroup } from '~/types/wechat-group.type'

import { cn } from '@/utils/shadcn'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps {
  column: Column<WechatGroup, any>
  title: string
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    v-if="column.getCanSort()"
    :class="cn('flex items-center space-x-2', $attrs.class ?? '')"
  >
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{{ title }}</span>
          <Icon
            name="mdi:arrow-down"
            v-if="column.getIsSorted() === 'desc'"
            class="w-4 h-4 ml-2"
          />
          <Icon
            name="mdi:arrow-up"
            v-else-if="column.getIsSorted() === 'asc'"
            class="w-4 h-4 ml-2"
          />
          <Icon name="mdi:chevron-down" v-else class="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <Icon
            name="mdi:arrow-up"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          升序
        </DropdownMenuItem>
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <Icon
            name="mdi:arrow-down"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          降序
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <Icon
            name="mdi:eye-off-outline"
            class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
          />
          隐藏
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>
