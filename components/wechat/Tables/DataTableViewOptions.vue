<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { WechatGroup } from '~/types/wechat-group.type'

interface DataTableViewOptionsProps {
  table: Table<WechatGroup>
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() =>
  props.table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== 'undefined' && column.getCanHide()
    )
)

function toChinese(column: string) {
  switch (column) {
    case 'id':
      return 'ID'
    case 'name':
      return '群名称'
    case 'description':
      return '描述'
    case 'dueDate':
      return '到期时间'
    case 'updateAt':
      return '更新时间'
    case 'enable':
      return '状态'
    case 'accessNumber':
      return '访问人数'
    case 'direct':
      return '无感访问'
    default:
      return column
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto items-center md:flex md:justify-center md:gap-1"
      >
        <Icon name="mdi:tune-variant" class="size-4" />
        <span class="hidden md:flex">列筛选</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[150px]">
      <DropdownMenuLabel>切换显示列</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :checked="column.getIsVisible()"
        @update:checked="(value) => column.toggleVisibility(!!value)"
      >
        {{ toChinese(column.id) }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
