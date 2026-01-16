<script setup>
import { useTodoStore } from '../stores/todoStore'
import TodoItem from './TodoItem.vue'
import { storeToRefs } from 'pinia'

const store = useTodoStore()
const { todos } = storeToRefs(store)
</script>

<template>
  <ul class="space-y-3">
    <TransitionGroup name="list">
      <TodoItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" />
    </TransitionGroup>
  </ul>
</template>

<style scoped>
.list-move,
/* 1. Apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}

/* 2. Ensure removing items are taken out of flow so valid items can move smoothly */
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
