import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import TablesDropDown from './DataTableDropDown.vue'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
import { Checkbox } from '@/components/ui/checkbox'
import type { WechatGroup } from '~/types/wechat-group.type'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import Check from '~/components/icon/Check.vue'
import Minus from '~/components/icon/Minus.vue'

export const columns: ColumnDef<WechatGroup>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: '群名称',
      }),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('name'))
    },
  },
  {
    accessorKey: 'enable',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: '状态',
      }),
    cell: ({ row }) => {
      const enable = row.getValue('enable')
      if (enable) {
        return h(Check)
      } else {
        return h(Minus)
      }
    },
  },
  {
    accessorKey: 'accessNumber',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: '访问人数',
      }),
    cell: ({ row }) =>
      h('div', { class: 'lowercase' }, row.getValue('accessNumber')),
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: '二维码到期时间',
      }),
    cell: ({ row }) => {
      const date = new Date(row.getValue('dueDate'))
      const formatter = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date)

      return h('div', { class: 'lowercase' }, formatter)
    },
  },
  {
    accessorKey: 'updateAt',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: '上次更新时间',
      }),
    cell: ({ row }) => {
      const date = new Date(row.getValue('updateAt'))
      const formatter = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)

      return h('div', { class: 'lowercase' }, formatter)
    },
  },
  {
    accessorKey: 'direct',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: '无感',
      }),
    cell: ({ row }) => {
      const direct: boolean = row.getValue('direct')
      if (direct) {
        return h(Check)
      } else {
        return h(Minus)
      }
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const group = row.original

      return h(
        'div',
        { class: 'relative' },
        h(TablesDropDown, {
          group,
          onExpand: row.toggleExpanded,
        })
      )
    },
  },
]
