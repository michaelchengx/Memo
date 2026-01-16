<script setup>
import { useTodoStore } from '../stores/todoStore'
import { storeToRefs } from 'pinia'

import { useUiStore } from '../stores/uiStore'

const store = useTodoStore()
const uiStore = useUiStore()
const { total, doneTotal, isAll } = storeToRefs(store)

const clearAll = () => {
  if (doneTotal.value === 0) return

  uiStore.showConfirm({
    title: '清除已完成',
    message: '确定要删除所有已完成的任务吗？',
    onConfirm: () => store.clearAllTodo()
  })
}
</script>

<template>
  <div class="flex items-center justify-between text-sm text-gray-500" v-show="total">
    <div class="flex items-center gap-2">
      <label class="flex items-center cursor-pointer hover:text-indigo-600 transition-colors">
        <input type="checkbox" v-model="isAll"
          class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mr-2" />
        Select All
      </label>
    </div>

    <div class="font-medium">
      <span class="text-indigo-600">{{ doneTotal }}</span> done / {{ total }} total
    </div>

    <button
      class="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 px-3 py-1 rounded-md transition-all duration-200 text-xs uppercase tracking-wider font-semibold"
      @click="clearAll">
      Clear Finished
    </button>
  </div>
</template>
