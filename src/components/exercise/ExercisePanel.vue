<template>
    <BaseModal v-model="model" max-height="92vh">

        <!-- Header -->
        <div class="panel__header">
            <div>
                <p class="panel__level">{{ levelLabel }}</p>
                <h2 class="panel__title">{{ chapter.title }}</h2>
            </div>
        </div>

        <!-- Difficulté -->
        <div class="panel__section">
            <p class="panel__section-label">Niveau de difficulté</p>
            <div class="panel__difficulty">
                <button v-for="d in DIFFICULTY_LIST" :key="d.id" class="difficulty-btn"
                    :class="{ 'difficulty-btn--active': difficulty === d.id }" @click="difficulty = d.id">
                    <span class="difficulty-btn__emoji">{{ d.emoji }}</span>
                    <span class="difficulty-btn__label">{{ d.label }}</span>
                </button>
            </div>
        </div>

        <!-- Générer -->
        <BaseButton variant="primary" size="lg" :block="true" :loading="loading" @click="handleGenerate">
            ✦ Générer un exercice
        </BaseButton>

        <!-- Erreur -->
        <p v-if="error" class="panel__error">{{ error }}</p>

        <!-- Exercice -->
        <template v-if="exercise">
            <div class="panel__exercise">
                <p class="panel__exercise-label">Énoncé</p>
                <BaseMath :text="exercise.enonce" />
            </div>

            <div v-if="exercise.correction">
                <BaseButton :variant="showCorrection ? 'secondary' : 'ghost'" :block="true"
                    @click="showCorrection = !showCorrection">
                    {{ showCorrection ? '▲ Masquer la correction' : '▼ Afficher la correction' }}
                </BaseButton>

                <div v-if="showCorrection" class="panel__correction">
                    <p class="panel__exercise-label panel__exercise-label--correction">Correction</p>
                    <BaseMath :text="exercise.correction" />
                </div>
            </div>
        </template>

    </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useExerciseGenerator, DIFFICULTY_LIST } from '@/composables/useExerciseGenerator'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseMath from '@/components/ui/BaseMath.vue'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    chapter: { type: Object, required: true },
    levelLabel: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'closed'])

const model = ref(props.modelValue)
const difficulty = ref('application')
const showCorrection = ref(false)

const { exercise, loading, error, generate, reset } = useExerciseGenerator()

watch(() => props.modelValue, val => { model.value = val })
watch(model, val => {
    emit('update:modelValue', val)
    if (!val) {
        reset()
        showCorrection.value = false
        emit('closed')
    }
})

async function handleGenerate() {
    showCorrection.value = false
    await generate(props.chapter, props.levelLabel, difficulty.value)
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.panel {
    &__header {
        display: flex;
        flex-direction: column;
        gap: $spacing-xs;
    }

    &__level {
        font-size: $text-xs;
        font-weight: $font-bold;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: $color-primary-light;
    }

    &__title {
        font-size: $text-lg;
        font-weight: $font-bold;
        color: $color-text-primary;
    }

    &__section-label {
        font-size: $text-xs;
        font-weight: $font-bold;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: $color-text-muted;
        margin-bottom: $spacing-sm;
    }

    &__difficulty {
        @include flex(row, stretch, flex-start);
        gap: $spacing-sm;
    }

    &__error {
        font-size: $text-sm;
        color: $color-danger;
        font-weight: $font-medium;
    }

    &__exercise {
        background: $color-bg;
        border-radius: $radius-md;
        padding: $spacing-md;
        border: $border-base;
    }

    &__exercise-label {
        font-size: $text-xs;
        font-weight: $font-bold;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: $color-text-muted;
        margin-bottom: $spacing-sm;

        &--correction {
            color: $color-success;
        }
    }

    &__correction {
        background: $color-success-light;
        border-radius: $radius-md;
        padding: $spacing-md;
        margin-top: $spacing-sm;
        border: 1px solid $color-success;
    }
}

.difficulty-btn {
    @include flex(column, center, center);
    flex: 1;
    gap: $spacing-xs;
    padding: $spacing-sm;
    border-radius: $radius-md;
    border: 2px solid $color-border;
    background: $color-bg-card;
    cursor: pointer;
    transition: all 0.15s ease;

    &--active {
        border-color: $color-primary;
        background: $color-primary-xlight;
    }

    &__emoji {
        font-size: $text-xl;
    }

    &__label {
        font-size: 10px;
        font-weight: $font-bold;
        color: $color-text-secondary;
        text-align: center;
        line-height: 1.2;

        .difficulty-btn--active & {
            color: $color-primary;
        }
    }
}
</style>