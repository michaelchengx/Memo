<script setup>
import { nextTick, ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

import { useUiStore } from '../stores/uiStore'

const props = defineProps(['todo'])
const store = useTodoStore()
const uiStore = useUiStore()
const inputTitle = ref(null)

// Handle check
const handleCheck = (id) => {
  store.checkTodo(id)
}

// Handle delete
const handleDelete = (id) => {
  uiStore.showConfirm({
    title: '删除任务',
    message: '确定要删除这个任务吗？此操作无法撤销。',
    onConfirm: () => store.deleteTodo(id)
  })
}

// Handle edit mode
const handleEdit = (todo) => {
  store.toggleEdit(todo.id, true)
  nextTick(() => {
    inputTitle.value.focus()
  })
}

// Handle blur/save
const handleBlur = (todo, e) => {
  store.toggleEdit(todo.id, false)
  if (!e.target.value.trim()) {
    alert("输入不能为空！")
    return
  }
  store.updateTodo(todo.id, e.target.value)
}
</script>

<template>
  <li
    class="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-150 group">
    <label class="flex items-center flex-1 cursor-pointer">
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"
        class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 transition duration-150 ease-in-out cursor-pointer" />

      <!-- View Mode -->
      <span v-show="!todo.isEdit" class="ml-3 text-gray-700 text-lg transition-all duration-150"
        :class="{ 'line-through text-gray-400': todo.done }">
        {{ todo.title }}
      </span>

      <!-- Edit Mode -->
      <input type="text" v-show="todo.isEdit" :value="todo.title" @blur="handleBlur(todo, $event)"
        @keyup.enter="$event.target.blur()" ref="inputTitle"
        class="ml-3 flex-1 px-2 py-1 border border-indigo-300 rounded focus:outline-none focus:border-indigo-500 text-lg text-gray-700" />
    </label>

    <div class="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 space-x-2 ml-4">
      <button v-show="!todo.isEdit"
        class="text-sky-500 hover:text-sky-700 p-2 rounded-full hover:bg-sky-50 transition-colors"
        @click="handleEdit(todo)" title="Edit">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>

      <button class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
        @click="handleDelete(todo.id)" title="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </li>
</template>
