<template>
    <div class="draft-editor">

        <div class="draft-editor__header">
            <div class="draft-editor__title">✎ Mon brouillon</div>
            <div class="draft-editor__right">
                <span class="draft-editor__status" :class="{ 'draft-editor__status--saving': isSaving }">
                    <span class="draft-editor__dot" />
                    {{ isSaving ? 'Sauvegarde…' : 'Sauvegardé' }}
                </span>
                <button v-if="content.length > 0" class="draft-editor__clear" @click="handleClear">
                    🗑 Effacer
                </button>
            </div>
        </div>

        <textarea ref="textareaRef" v-model="content" class="draft-editor__textarea" placeholder="Pose tes calculs ici…"
            @input="handleInput" />

        <SymbolToolbar @insert="handleInsertSymbol" @open-calculator="showCalculator = true" />

        <Calculator v-if="showCalculator" v-model="showCalculator" @insert="handleInsertFromCalculator" />

    </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import SymbolToolbar from './SymbolToolbar.vue'
import Calculator from './Calculator.vue'

const props = defineProps({
    modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue)
const textareaRef = ref(null)
const showCalculator = ref(false)
const isSaving = ref(false)

let saveTimeout = null
let savingIndicatorTimeout = null

// ─── Auto-grow ─────────────────────────────────────────────────────────────

const MIN_HEIGHT = 280

function autoGrow() {
    const el = textareaRef.value
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(MIN_HEIGHT, el.scrollHeight)}px`
}

onMounted(() => {
    nextTick(autoGrow)
})

// ─── Sync avec le parent (debounced save) ─────────────────────────────────

watch(() => props.modelValue, (val) => {
    if (val !== content.value) {
        content.value = val
        nextTick(autoGrow)
    }
})

function handleInput() {
    autoGrow()

    isSaving.value = true
    clearTimeout(saveTimeout)
    clearTimeout(savingIndicatorTimeout)

    saveTimeout = setTimeout(() => {
        emit('update:modelValue', content.value)
        savingIndicatorTimeout = setTimeout(() => {
            isSaving.value = false
        }, 250)
    }, 400)
}

// ─── Insertion au curseur ──────────────────────────────────────────────────

function insertAtCursor(text, cursorOffset = 0) {
    const el = textareaRef.value
    if (!el) return

    const start = el.selectionStart
    const end = el.selectionEnd

    content.value = content.value.slice(0, start) + text + content.value.slice(end)

    nextTick(() => {
        const newPos = start + text.length + cursorOffset
        el.focus()
        el.setSelectionRange(newPos, newPos)
        autoGrow()
        handleInput()
    })
}

function handleInsertSymbol(symbol) {
    insertAtCursor(symbol.insertText, symbol.cursorOffset)
}

function handleInsertFromCalculator(resultText) {
    insertAtCursor(resultText, 0)
}

// ─── Effacer ────────────────────────────────────────────────────────────────

function handleClear() {
    content.value = ''
    emit('update:modelValue', '')
    nextTick(autoGrow)
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.draft-editor {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;

    &__header {
        @include flex(row, center, space-between);
        flex-wrap: wrap;
        gap: $spacing-sm;
    }

    &__title {
        font-size: $text-sm;
        font-weight: $font-bold;
        color: $color-text-primary;
    }

    &__right {
        @include flex(row, center, flex-end);
        gap: $spacing-md;
    }

    &__status {
        @include flex(row, center, center);
        gap: $spacing-xs;
        font-size: $text-xs;
        color: $color-text-muted;
        font-weight: $font-medium;

        &--saving {
            color: $color-warning;
        }
    }

    &__dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: $color-success;

        .draft-editor__status--saving & {
            background: $color-warning;
        }
    }

    &__clear {
        font-size: $text-xs;
        color: $color-danger;
        font-weight: $font-semibold;
        background: none;
        border: none;
        cursor: pointer;
        padding: 2px 0;
    }

    &__textarea {
        width: 100%;
        min-height: 280px;
        border: 1px solid $color-border;
        border-radius: $radius-md;
        padding: $spacing-md;
        font-family: $font-mono;
        font-size: 16px; 
        line-height: 1.6;
        color: $color-text-primary;
        background: $color-bg-card;
        resize: vertical;

        @include sm {
            font-size: $text-sm;
        }

        &:focus {
            outline: none;
            border-color: $color-primary-light;
        }

        &::placeholder {
            color: $color-text-muted;
        }
    }
}
</style>