<script setup>
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import { useTodoStore } from './stores/todoStore'

// State is managed in the store, but we might want to initialize or just show the structure
const store = useTodoStore()
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-10 px-4">
    <div
      class="w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 hover:shadow-indigo-500/50">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center tracking-wide">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            Memo Task Manager
          </span>
        </h1>

        <TodoInput />

        <div class="mt-6">
          <TodoList />
        </div>

        <div class="mt-6 border-t border-gray-200 pt-4">
          <TodoFooter />
        </div>
      </div>
    </div>

    <ConfirmModal />
  </div>
</template>

<style scoped>
/* Scoped styles if necessary, but mostly using Tailwind */
</style>
