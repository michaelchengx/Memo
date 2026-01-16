import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
    const modalState = ref({
        visible: false,
        title: 'Confirm',
        message: 'Are you sure?',
        type: 'confirm', // 'confirm' | 'alert'
        onConfirm: null,
        onCancel: null
    })

    function showConfirm({ title, message, onConfirm, onCancel }) {
        modalState.value = {
            visible: true,
            title: title || 'Confirm',
            message: message || 'Are you sure?',
            type: 'confirm',
            onConfirm,
            onCancel
        }
    }

    function showAlert({ title, message, onConfirm }) {
        console.log('Showing alert:', message)
        modalState.value = {
            visible: true,
            title: title || 'Alert',
            message: message || 'Alert',
            type: 'alert',
            onConfirm,
            onCancel: null
        }
    }

    function closeConfirm() {
        modalState.value.visible = false
        modalState.value.onConfirm = null
        modalState.value.onCancel = null
    }

    function confirm() {
        if (modalState.value.onConfirm) modalState.value.onConfirm()
        closeConfirm()
    }

    function cancel() {
        if (modalState.value.onCancel) modalState.value.onCancel()
        closeConfirm()
    }

    return {
        modalState,
        showConfirm,
        showAlert,
        closeConfirm,
        confirm,
        cancel
    }
})
