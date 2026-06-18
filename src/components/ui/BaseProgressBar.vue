<template>
    <div class="progress" :class="`progress--${size}`" role="progressbar" :aria-valuenow="value" :aria-valuemin="0"
        :aria-valuemax="total">
        <div class="progress__track">
            <div class="progress__fill" :style="{ width: `${percentage}%`, background: color }" />
        </div>
        <span v-if="showLabel" class="progress__label">{{ percentage }}%</span>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    value: { type: Number, required: true },
    total: { type: Number, required: true },
    color: { type: String, default: '$color-primary' },
    size: {
        type: String,
        default: 'md',
        validator: v => ['sm', 'md', 'lg'].includes(v),
    },
    showLabel: { type: Boolean, default: true },
})

const percentage = computed(() =>
    props.total === 0 ? 0 : Math.round((props.value / props.total) * 100)
)
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.progress {
    @include flex(row, center, flex-start);
    gap: $spacing-sm;

    &__track {
        flex: 1;
        background: $color-border;
        border-radius: $radius-full;
        overflow: hidden;
    }

    &__fill {
        height: 100%;
        border-radius: $radius-full;
        background: $color-primary;
        transition: width 0.4s ease;
    }

    &__label {
        font-size: $text-xs;
        font-weight: $font-semibold;
        color: $color-text-muted;
        min-width: 32px;
        text-align: right;
    }

    // Tailles
    &--sm .progress__track {
        height: 4px;
    }

    &--md .progress__track {
        height: 6px;
    }

    &--lg .progress__track {
        height: 10px;
    }
}
</style>