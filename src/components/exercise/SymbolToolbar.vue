<template>
    <div class="symbol-toolbar">
        <button class="symbol-toolbar__btn symbol-toolbar__btn--calc" @click="$emit('open-calculator')">
            🧮
        </button>
        <div class="symbol-toolbar__divider" />
        <button v-for="symbol in SYMBOLS" :key="symbol.label" class="symbol-toolbar__btn"
            @click="$emit('insert', symbol)">
            {{ symbol.label }}
        </button>
    </div>
</template>

<script setup>
defineEmits(['insert', 'open-calculator'])

// insertText : ce qui est inséré au curseur
// cursorOffset : décalage du curseur après insertion (pour se placer entre les accolades par ex.)
const SYMBOLS = [
    { label: '√', insertText: '√()', cursorOffset: -1 },
    { label: 'x²', insertText: '²', cursorOffset: 0 },
    { label: 'xⁿ', insertText: '^()', cursorOffset: -1 },
    { label: '⁄', insertText: '/', cursorOffset: 0 },
    { label: 'π', insertText: 'π', cursorOffset: 0 },
    { label: '≤', insertText: '≤', cursorOffset: 0 },
    { label: '≥', insertText: '≥', cursorOffset: 0 },
    { label: '≠', insertText: '≠', cursorOffset: 0 },
    { label: '∈', insertText: '∈', cursorOffset: 0 },
    { label: '→', insertText: '→', cursorOffset: 0 },
    { label: '∑', insertText: '∑()', cursorOffset: -1 },
]

defineExpose({ SYMBOLS })
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.symbol-toolbar {
    @include flex(row, center, flex-start);
    gap: $spacing-sm;
    background: #1e293b;
    padding: $spacing-sm $spacing-md;
    overflow-x: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    &__btn {
        flex-shrink: 0;
        min-width: 40px;
        height: 40px;
        border-radius: $radius-md;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        border: none;
        font-size: $text-md;
        font-weight: $font-semibold;
        @include flex(row, center, center);
        cursor: pointer;
        transition: background 0.15s ease;

        &:active {
            background: rgba(255, 255, 255, 0.25);
        }
    }

    &__btn--calc {
        background: $color-primary-light;
        font-size: $text-lg;
    }

    &__divider {
        width: 1px;
        height: 24px;
        background: rgba(255, 255, 255, 0.15);
        flex-shrink: 0;
    }
}
</style>