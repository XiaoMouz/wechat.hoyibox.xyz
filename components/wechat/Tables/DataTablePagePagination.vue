<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'

import { type WechatGroup } from '~/types/wechat-group.type'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps {
  table: Table<WechatGroup>
}
defineProps<DataTablePaginationProps>()
</script>

<template>
  <div
    class="flex flex-col gap-2 md:flex-row items-center justify-between px-2"
  >
    <div class="flex-1 text-sm text-muted-foreground">
      已选中
      {{ table.getFilteredSelectedRowModel().rows.length }} 行，共
      {{ table.getFilteredRowModel().rows.length }} 行
    </div>
    <div class="flex items-center gap-2 md:gap-6 lg:gap-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">每页</p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize.toString()"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue
              :placeholder="`${table.getState().pagination.pageSize}`"
            />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
        <p class="text-sm font-medium">行</p>
      </div>
      <div
        class="flex w-[100px] items-center justify-center text-sm font-medium"
      >
        第 {{ table.getState().pagination.pageIndex + 1 }} 页 共{{
          table.getPageCount()
        }}
        页
      </div>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 md:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">首页</span>
          <Icon name="mdi:chevron-double-left" class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">上一页</span>
          <Icon name="mdi:chevron-left" class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">下一页</span>
          <Icon name="mdi:chevron-right" class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 md:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">尾页</span>
          <Icon name="mdi:chevron-double-right" class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
