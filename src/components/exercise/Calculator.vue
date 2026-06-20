<template>
    <Teleport to="body">
        <div class="calc-overlay" :class="{ 'calc-overlay--open': isOpen }">

            <div class="calc-header">
                <button class="calc-header__close" @click="close">✕</button>
                <div class="calc-header__mode">
                    <button class="calc-header__mode-btn" :class="{ 'calc-header__mode-btn--active': !isScientific }"
                        @click="isScientific = false">
                        Simple
                    </button>
                    <button class="calc-header__mode-btn" :class="{ 'calc-header__mode-btn--active': isScientific }"
                        @click="isScientific = true">
                        Scientifique
                    </button>
                </div>
            </div>

            <div class="calc-display">
                <div class="calc-display__expr">{{ expression || '\u00A0' }}</div>
                <div class="calc-display__result">{{ displayResult }}</div>
            </div>

            <button class="calc-insert" :disabled="!hasResult" @click="handleInsert">
                ↓ Insérer dans le brouillon
            </button>

            <div class="calc-sci-row" :class="{ 'calc-sci-row--visible': isScientific }">
                <button class="calc-key calc-key--func" @click="appendFunc('sin(')">sin</button>
                <button class="calc-key calc-key--func" @click="appendFunc('cos(')">cos</button>
                <button class="calc-key calc-key--func" @click="appendFunc('tan(')">tan</button>
                <button class="calc-key calc-key--func" @click="appendFunc('ln(')">ln</button>
                <button class="calc-key calc-key--func" @click="appendFunc('log(')">log</button>
                <button class="calc-key calc-key--func" @click="appendFunc('exp(')">eˣ</button>
                <button class="calc-key calc-key--func" @click="appendOperator('^')">xʸ</button>
                <button class="calc-key calc-key--func" @click="appendFunc('!')">!</button>
            </div>

            <div class="calc-keys">
                <button class="calc-key calc-key--op" @click="appendFunc('sqrt(')">√</button>
                <button class="calc-key calc-key--op" @click="appendOperator('^2')">x²</button>
                <button class="calc-key calc-key--op" @click="appendChar('(')">(</button>
                <button class="calc-key calc-key--op" @click="appendChar(')')">)</button>

                <button class="calc-key" @click="appendChar('7')">7</button>
                <button class="calc-key" @click="appendChar('8')">8</button>
                <button class="calc-key" @click="appendChar('9')">9</button>
                <button class="calc-key calc-key--op" @click="appendOperator('÷')">÷</button>

                <button class="calc-key" @click="appendChar('4')">4</button>
                <button class="calc-key" @click="appendChar('5')">5</button>
                <button class="calc-key" @click="appendChar('6')">6</button>
                <button class="calc-key calc-key--op" @click="appendOperator('×')">×</button>

                <button class="calc-key" @click="appendChar('1')">1</button>
                <button class="calc-key" @click="appendChar('2')">2</button>
                <button class="calc-key" @click="appendChar('3')">3</button>
                <button class="calc-key calc-key--op" @click="appendOperator('−')">−</button>

                <button class="calc-key calc-key--zero" @click="appendChar('0')">0</button>
                <button class="calc-key" @click="appendChar(',')">,</button>
                <button class="calc-key calc-key--op" @click="appendOperator('+')">+</button>

                <button class="calc-key calc-key--clear" @click="clearAll">⌫ effacer</button>
            </div>

        </div>
    </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
})

const emit = defineEmits(['update:modelValue', 'insert'])

const isOpen = ref(true)
const isScientific = ref(false)
const expression = ref('')
const result = ref(null)
const error = ref(false)

const hasResult = computed(() => result.value !== null && !error.value)

const displayResult = computed(() => {
    if (error.value) return 'Erreur'
    if (result.value === null) return '0'
    return result.value
})

function close() {
    isOpen.value = false
    setTimeout(() => emit('update:modelValue', false), 200)
}

function appendChar(char) {
    expression.value += char
    evaluate()
}

function appendOperator(op) {
    if (expression.value === '' && op !== '−') return
    expression.value += op
    evaluate()
}

function appendFunc(func) {
    expression.value += func
    evaluate()
}

function clearAll() {
    expression.value = ''
    result.value = null
    error.value = false
}

function evaluate() {
    if (!expression.value.trim()) {
        result.value = null
        error.value = false
        return
    }

    try {
        // Normalisation : notation FR -> JS
        let jsExpr = expression.value
            .replace(/,/g, '.')
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-')
            .replace(/π/g, 'Math.PI')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/exp\(/g, 'Math.exp(')
            .replace(/\^/g, '**')

        // eslint-disable-next-line no-new-func
        const value = Function(`"use strict"; return (${jsExpr})`)()

        if (typeof value !== 'number' || !isFinite(value)) {
            error.value = true
            result.value = null
        } else {
            error.value = false
            result.value = Math.round(value * 1e8) / 1e8 // évite les artefacts flottants
        }
    } catch {
        // Expression incomplète (ex: parenthèse non fermée) → pas d'erreur affichée tant qu'on tape
        error.value = false
        result.value = result.value // garde le dernier résultat valide
    }
}

function handleInsert() {
    if (!hasResult.value) return
    const text = String(result.value).replace('.', ',')
    emit('insert', text)
    close()
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.calc-overlay {
    position: fixed;
    inset: 0;
    background: #0f172a;
    z-index: 200;
    display: flex;
    flex-direction: column;
    transform: translateY(100%);
    transition: transform 0.25s ease;

    &--open {
        transform: translateY(0);
    }
}

.calc-header {
    @include flex(row, center, space-between);
    padding: $spacing-lg $spacing-lg $spacing-md;
    flex-shrink: 0;

    &__close {
        color: rgba(255, 255, 255, 0.6);
        font-size: $text-xl;
        background: none;
        border: none;
        cursor: pointer;
        width: 32px;
        height: 32px;
    }

    &__mode {
        @include flex(row, center, center);
        background: rgba(255, 255, 255, 0.08);
        border-radius: $radius-md;
        padding: 3px;
    }

    &__mode-btn {
        padding: 5px $spacing-md;
        font-size: $text-xs;
        font-weight: $font-bold;
        color: rgba(255, 255, 255, 0.5);
        background: none;
        border: none;
        border-radius: $radius-sm;
        cursor: pointer;
        transition: all 0.15s ease;

        &--active {
            background: $color-primary-light;
            color: #fff;
        }
    }
}

.calc-display {
    padding: $spacing-md $spacing-2xl $spacing-lg;
    text-align: right;
    flex-shrink: 0;

    &__expr {
        font-size: $text-sm;
        color: rgba(255, 255, 255, 0.45);
        min-height: 18px;
        font-family: $font-mono;
        word-break: break-all;
    }

    &__result {
        font-size: 2.5rem;
        color: #fff;
        font-weight: $font-bold;
        font-family: $font-mono;
        margin-top: $spacing-xs;
    }
}

.calc-insert {
    margin: 0 $spacing-lg $spacing-md;
    background: $color-success;
    color: #fff;
    border: none;
    border-radius: $radius-lg;
    padding: $spacing-md;
    font-size: $text-sm;
    font-weight: $font-bold;
    cursor: pointer;
    flex-shrink: 0;

    &:disabled {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.3);
        cursor: not-allowed;
    }
}

.calc-keys {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(255, 255, 255, 0.06);
}

.calc-sci-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(255, 255, 255, 0.06);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
    flex-shrink: 0;

    &--visible {
        max-height: 300px;
    }
}

.calc-key {
    background: #1e293b;
    border: none;
    color: #fff;
    font-size: $text-lg;
    font-weight: $font-medium;
    padding: $spacing-lg 0;
    cursor: pointer;
    transition: background 0.1s ease;

    &:active {
        background: #334155;
    }

    &--op {
        background: #2d2a5c;
        color: #c7d2fe;

        &:active {
            background: #3b3777;
        }
    }

    &--func {
        font-size: $text-sm;
        color: #a5b4fc;
    }

    &--zero {
        grid-column: span 2;
    }

    &--clear {
        grid-column: span 4;
        background: #2d2a5c;
        color: #c7d2fe;
    }
}
</style>