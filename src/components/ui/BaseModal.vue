<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="modal-overlay" @click.self="handleClose">
                <div class="modal-sheet" :style="{ maxHeight: maxHeight }">
                    <div class="modal-sheet__handle" />
                    <div class="modal-sheet__content">
                        <slot />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
defineProps({
    modelValue: { type: Boolean, required: true },
    maxHeight: { type: String, default: '90vh' },
    closeOnOverlay: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue'])

function handleClose() {
    emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    z-index: 100;
    @include flex(column, flex-end, center);
    backdrop-filter: blur(2px);
}

.modal-sheet {
    background: $color-bg-card;
    border-radius: $radius-xl $radius-xl 0 0;
    width: 100%;
    max-width: 640px;
    overflow-y: auto;
    padding: $spacing-md $spacing-lg $spacing-3xl;

    &__handle {
        width: 36px;
        height: 4px;
        background: $color-border;
        border-radius: $radius-full;
        margin: 0 auto $spacing-lg;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: $spacing-lg;
    }
}

// Transitions
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease;

    .modal-sheet {
        transition: transform 0.25s ease;
    }
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;

    .modal-sheet {
        transform: translateY(100%);
    }
}
</style>