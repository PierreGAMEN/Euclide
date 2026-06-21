<template>
    <div class="symbol-toolbar">
        <div class="symbol-toolbar__row">
            <button class="symbol-toolbar__btn symbol-toolbar__btn--calc" @click="$emit('open-calculator')">
                🧮
            </button>
            <div class="symbol-toolbar__divider" />
            <button v-for="symbol in SYMBOLS_ROW1" :key="symbol.label" class="symbol-toolbar__btn"
                @click="$emit('insert', symbol)">
                {{ symbol.label }}
            </button>
        </div>

        <div class="symbol-toolbar__row">
            <button v-for="symbol in SYMBOLS_ROW2" :key="symbol.label"
                class="symbol-toolbar__btn symbol-toolbar__btn--row2" @click="$emit('insert', symbol)">
                {{ symbol.label }}
            </button>
        </div>
    </div>
</template>

<script setup>
defineEmits(['insert', 'open-calculator'])

const SYMBOLS_ROW1 = [
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

const SYMBOLS_ROW2 = [
    { label: 'x', insertText: 'x', cursorOffset: 0 },
    { label: 'y', insertText: 'y', cursorOffset: 0 },
    { label: 'a', insertText: 'a', cursorOffset: 0 },
    { label: 'b', insertText: 'b', cursorOffset: 0 },
    { label: 'n', insertText: 'n', cursorOffset: 0 },
    { label: '×', insertText: '×', cursorOffset: 0 },
    { label: '÷', insertText: '÷', cursorOffset: 0 },
    { label: '+', insertText: '+', cursorOffset: 0 },
    { label: '−', insertText: '−', cursorOffset: 0 },
    { label: '=', insertText: '=', cursorOffset: 0 },
]

defineExpose({ SYMBOLS_ROW1, SYMBOLS_ROW2 })
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.symbol-toolbar {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    background: #1e293b;
    padding: $spacing-sm $spacing-md;

    &__row {
        @include flex(row, center, flex-start);
        gap: $spacing-sm;
        overflow-x: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__btn {
        flex-shrink: 0;
        min-width: 40px;
        height: 36px;
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

    &__btn--row2 {
        font-style: italic;
        font-family: 'Georgia', serif;
    }

    &__divider {
        width: 1px;
        height: 24px;
        background: rgba(255, 255, 255, 0.15);
        flex-shrink: 0;
    }
}
</style>