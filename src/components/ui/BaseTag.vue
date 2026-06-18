<template>
    <span class="tag" :class="`tag--${variant}`" :style="customStyle">
        <span v-if="dot" class="tag__dot" />
        <slot />
    </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    variant: {
        type: String,
        default: 'default',
        validator: v => ['default', 'college', 'lycee', 'success', 'warning', 'danger', 'custom'].includes(v),
    },
    dot: { type: Boolean, default: false },
    color: { type: String, default: null },    // pour variant custom
    bg: { type: String, default: null },
})

const customStyle = computed(() => {
    if (props.variant !== 'custom') return {}
    return { color: props.color, background: props.bg }
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;
.tag {
    @include flex(row, center, center);
    display: inline-flex;
    gap: $spacing-xs;
    padding: 3px $spacing-sm;
    border-radius: $radius-full;
    font-size: $text-xs;
    font-weight: $font-bold;
    white-space: nowrap;
    letter-spacing: 0.04em;
    text-transform: uppercase;

    &__dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
        flex-shrink: 0;
    }

    &--default {
        color: $color-text-secondary;
        background: $color-border;
    }

    &--college {
        color: $color-college;
        background: $color-college-light;
    }

    &--lycee {
        color: $color-lycee;
        background: $color-lycee-light;
    }

    &--success {
        color: $color-success;
        background: $color-success-light;
    }

    &--warning {
        color: $color-warning;
        background: $color-warning-light;
    }

    &--danger {
        color: $color-danger;
        background: $color-danger-light;
    }
}
</style>