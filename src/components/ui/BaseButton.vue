<template>
    <button :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--loading': loading, 'btn--block': block }]"
        :disabled="disabled || loading" v-bind="$attrs">
        <span v-if="loading" class="btn__spinner" aria-hidden="true" />
        <span v-if="icon && iconPosition === 'left'" class="btn__icon">{{ icon }}</span>
        <span class="btn__label">
            <slot />
        </span>
        <span v-if="icon && iconPosition === 'right'" class="btn__icon">{{ icon }}</span>
    </button>
</template>

<script setup>
defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: v => ['primary', 'secondary', 'ghost', 'danger'].includes(v),
    },
    size: {
        type: String,
        default: 'md',
        validator: v => ['sm', 'md', 'lg'].includes(v),
    },
    loading: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    block: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: null,
    },
    iconPosition: {
        type: String,
        default: 'left',
        validator: v => ['left', 'right'].includes(v),
    },
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.btn {
    @include flex(row, center, center);
    @include touch-target;
    gap: $spacing-sm;
    border-radius: $radius-md;
    font-weight: $font-semibold;
    font-size: $text-sm;
    transition: background 0.15s ease, opacity 0.15s ease, transform 0.1s ease;
    white-space: nowrap;
    position: relative;

    &:active:not(:disabled) {
        transform: scale(0.97);
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    // Variantes
    &--primary {
        background: $color-primary;
        color: #fff;

        &:hover:not(:disabled) {
            background: $color-primary-light;
        }
    }

    &--secondary {
        background: $color-primary-xlight;
        color: $color-primary;

        &:hover:not(:disabled) {
            background: darken($color-primary-xlight, 4%);
        }
    }

    &--ghost {
        background: transparent;
        color: $color-text-secondary;
        border: $border-base;

        &:hover:not(:disabled) {
            background: $color-bg;
            color: $color-text-primary;
        }
    }

    &--danger {
        background: $color-danger;
        color: #fff;

        &:hover:not(:disabled) {
            background: darken($color-danger, 8%);
        }
    }

    // Tailles
    &--sm {
        height: 32px;
        min-height: 32px;
        padding: 0 $spacing-md;
        font-size: $text-xs;
        border-radius: $radius-sm;
    }

    &--md {
        height: $touch-target;
        padding: 0 $spacing-lg;
    }

    &--lg {
        height: 52px;
        min-height: 52px;
        padding: 0 $spacing-2xl;
        font-size: $text-md;
        border-radius: $radius-lg;
    }

    // Pleine largeur
    &--block {
        width: 100%;
    }

    // Spinner
    &__spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.35);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        flex-shrink: 0;
    }

    &__icon {
        font-size: 1em;
        line-height: 1;
        flex-shrink: 0;
    }

    &__label {
        line-height: 1;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>