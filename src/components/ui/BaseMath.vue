<template>
    <div class="math-content" v-html="rendered" />
</template>

<script setup>
import { computed } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const props = defineProps({
    text: { type: String, required: true },
})

const rendered = computed(() => {
    if (!props.text) return ''

    return props.text
        .replace(/\$\$([^$]+)\$\$/g, (_, expr) => {
            try {
                return katex.renderToString(expr.trim(), { displayMode: true, throwOnError: false })
            } catch {
                return `<span class="math-error">${expr}</span>`
            }
        })
        .replace(/\$([^$\n]+)\$/g, (_, expr) => {
            try {
                return katex.renderToString(expr.trim(), { displayMode: false, throwOnError: false })
            } catch {
                return `<span class="math-error">${expr}</span>`
            }
        })
        .replace(/\n/g, '<br>')
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.math-content {
    line-height: 1.8;
    font-size: $text-sm;
    color: $color-text-primary;

    :deep(.katex-display) {
        margin: $spacing-md 0;
        overflow-x: auto;
    }

    :deep(.math-error) {
        color: $color-danger;
        font-family: $font-mono;
        font-size: $text-xs;
    }
}
</style>