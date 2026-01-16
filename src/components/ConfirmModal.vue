<script setup>
import { useUiStore } from '../stores/uiStore'

const uiStore = useUiStore()
</script>

<template>
    <Transition name="modal">
        <div v-if="uiStore.modalState.visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="uiStore.cancel"></div>

            <!-- Modal Content -->
            <div
                class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all scale-100 opacity-100">
                <div class="p-6 text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4"
                        :class="uiStore.modalState.type === 'alert' ? 'bg-indigo-100' : 'bg-red-100'">
                        <svg v-if="uiStore.modalState.type !== 'alert'" class="h-6 w-6 text-red-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <svg v-else class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ uiStore.modalState.title }}</h3>
                    <p class="text-sm text-gray-500 mb-6">{{ uiStore.modalState.message }}</p>

                    <div class="flex gap-3 justify-center">
                        <button v-if="uiStore.modalState.type !== 'alert'" @click="uiStore.cancel"
                            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors">
                            Cancel
                        </button>
                        <button @click="uiStore.confirm"
                            :class="uiStore.modalState.type === 'alert' ? 'bg-indigo-600 hover:bg-indigo-700 w-full' : 'bg-red-600 hover:bg-red-700'"
                            class="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                            {{ uiStore.modalState.type === 'alert' ? 'OK' : 'Confirm' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.1s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
    transition: all 0.1s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.95);
    opacity: 0;
}
</style>
