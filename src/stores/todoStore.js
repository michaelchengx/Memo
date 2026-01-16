import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { ref, computed, watch } from 'vue'

export const useTodoStore = defineStore('todo', () => {
    // State
    const todos = ref(JSON.parse(localStorage.getItem('todos')) || [])

    // Getters
    const total = computed(() => todos.value.length)
    const doneTotal = computed(() => todos.value.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0))
    const isAll = computed({
        get() {
            return doneTotal.value === total.value && total.value > 0
        },
        set(value) {
            checkAllTodo(value)
        }
    })

    // Actions
    function addTodo(title) {
        if (!title.trim()) return alert("待办事项不可为空！")
        const todoObj = { id: nanoid(), title: title, done: false, isEdit: false }
        todos.value.unshift(todoObj)
    }

    function checkTodo(id) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) todo.done = !todo.done
    }

    function updateTodo(id, title) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) todo.title = title
    }

    function deleteTodo(id) {
        todos.value = todos.value.filter(t => t.id !== id)
    }

    function checkAllTodo(done) {
        todos.value.forEach(t => t.done = done)
    }

    function clearAllTodo() {
        todos.value = todos.value.filter(t => !t.done)
    }

    function toggleEdit(id, isEdit) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) todo.isEdit = isEdit
    }

    // Watch & Persist
    watch(todos, (newVal) => {
        localStorage.setItem('todos', JSON.stringify(newVal))
    }, { deep: true })

    return {
        todos,
        total,
        doneTotal,
        isAll,
        addTodo,
        checkTodo,
        updateTodo,
        deleteTodo,
        checkAllTodo,
        clearAllTodo,
        toggleEdit
    }
})
