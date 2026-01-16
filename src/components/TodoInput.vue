<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { useUiStore } from '../stores/uiStore'

const store = useTodoStore()
const uiStore = useUiStore()
const title = ref('')

const add = () => {
  if (!title.value.trim()) {
    uiStore.showAlert({
      title: 'Empty Input',
      message: '请输入待办事项！'
    })
    return
  }
  store.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <div class="relative group">
    <div
      class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
    </div>
    <div class="relative flex items-center bg-white rounded-lg p-1">
      <input type="text" placeholder="What needs to be done?" v-model="title" @keyup.enter="add"
        class="w-full px-4 py-3 text-gray-700 bg-transparent rounded-lg focus:outline-none text-lg placeholder-gray-400" />
      <button @click="add"
        class="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200 mr-1">
        Add
      </button>
    </div>
  </div>
</template>
