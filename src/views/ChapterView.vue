<template>
    <div class="chapter">

        <!-- Header -->
        <header class="chapter__header">
            <div class="chapter__header-top">
                <RouterLink :to="{ name: 'level', params: { levelId } }" class="chapter__back">
                    ← {{ currentLevel?.label }}
                </RouterLink>
                <BaseTag :variant="currentBlock?.id">{{ currentBlock?.label }}</BaseTag>
            </div>
            <h1 class="chapter__title">{{ chapter?.title }}</h1>

            <!-- Statut -->
            <div class="chapter__status-row">
                <button v-for="s in STATUS_LIST" :key="s.id" class="chapter__status-btn"
                    :class="{ 'chapter__status-btn--active': currentStatus === s.id }"
                    :style="currentStatus === s.id ? { borderColor: s.color, color: s.color, background: s.bg } : {}"
                    @click="setStatus(chapterId, s.id)">
                    {{ s.label }}
                </button>
            </div>

            <!-- Liens cours -->
            <div class="chapter__links">

                <a v-for="(url, index) in chapter?.urls" :key="url" :href="url" target="_blank"
                    rel="noopener noreferrer" class="chapter__link">
                    📄 {{ chapter.urls.length > 1 ? `Cours ${index + 1}` : 'Cours' }}
                </a>
            </div>
        </header>

        <!-- Générateur -->
        <section class="chapter__section">
            <h2 class="chapter__section-title">Générer un exercice</h2>

            <!-- Difficulté -->
            <div class="chapter__difficulty">
                <button v-for="d in DIFFICULTY_LIST" :key="d.id" class="difficulty-btn"
                    :class="{ 'difficulty-btn--active': difficulty === d.id }" @click="difficulty = d.id">
                    <span class="difficulty-btn__emoji">{{ d.emoji }}</span>
                    <span class="difficulty-btn__label">{{ d.label }}</span>
                </button>
            </div>

            <BaseButton variant="primary" size="lg" :block="true" :loading="loading" @click="handleGenerate">
                ✦ Générer un exercice
            </BaseButton>

            <p v-if="error" class="chapter__error">{{ error }}</p>

            <!-- Exercice généré -->
            <div v-if="exercise" class="chapter__exercise">
                <div class="chapter__exercise-enonce">
                    <p class="chapter__exercise-label">Énoncé</p>
                    <BaseMath :text="exercise.enonce" />
                </div>

                <div v-if="exercise.correction">
                    <BaseButton :variant="showCorrection ? 'secondary' : 'ghost'" :block="true"
                        @click="showCorrection = !showCorrection">
                        {{ showCorrection ? '▲ Masquer la correction' : '▼ Afficher la correction' }}
                    </BaseButton>

                    <div v-if="showCorrection" class="chapter__exercise-correction">
                        <p class="chapter__exercise-label chapter__exercise-label--correction">Correction</p>
                        <BaseMath :text="exercise.correction" />
                    </div>
                </div>
                <!-- Brouillon -->
                <DraftEditor v-if="currentExerciseId" :model-value="getCurrentDraft()"
                    @update:model-value="handleDraftUpdate" />
            </div>
        </section>

        <!-- Historique -->
        <section class="chapter__section" v-if="chapterHistory.length">
            <div class="chapter__section-header">
                <h2 class="chapter__section-title">Exercices précédents</h2>
                <button class="chapter__clear" @click="clearChapterHistory(chapterId)">
                    Tout effacer
                </button>
            </div>

            <div class="chapter__history">
                <div v-for="entry in chapterHistory" :key="entry.id" class="history-card"
                    @click="openHistoryEntry(entry)">
                    <div class="history-card__top">
                        <span class="history-card__difficulty">
                            {{ DIFFICULTY_CONFIG[entry.difficulty]?.emoji }}
                            {{ DIFFICULTY_CONFIG[entry.difficulty]?.label }}
                        </span>
                        <span class="history-card__date">{{ formatDate(entry.generatedAt) }}</span>
                    </div>
                    <p class="history-card__preview">
                        {{ entry.enonce.slice(0, 80).replace(/\$[^$]*\$/g, '…').trim() }}…
                    </p>
                </div>
            </div>

            <!-- Entrée historique sélectionnée -->
            <div v-if="selectedEntry" class="chapter__exercise">
                <div class="chapter__exercise-enonce">
                    <p class="chapter__exercise-label">Énoncé</p>
                    <BaseMath :text="selectedEntry.enonce" />
                </div>
                <div v-if="selectedEntry.correction">
                    <BaseButton :variant="showHistoryCorrection ? 'secondary' : 'ghost'" :block="true"
                        @click="showHistoryCorrection = !showHistoryCorrection">
                        {{ showHistoryCorrection ? '▲ Masquer la correction' : '▼ Afficher la correction' }}
                    </BaseButton>
                    <div v-if="showHistoryCorrection" class="chapter__exercise-correction">
                        <p class="chapter__exercise-label chapter__exercise-label--correction">Correction</p>
                        <BaseMath :text="selectedEntry.correction" />
                    </div>
                </div>
                <!--brouillon -->
                <DraftEditor :model-value="selectedEntry.draft || ''" @update:model-value="handleDraftUpdate" />
                <BaseButton variant="ghost" size="sm" @click="selectedEntry = null">
                    Fermer
                </BaseButton>
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CURRICULUM } from '@/data/curriculum'
import { useProgress, STATUS_LIST } from '@/composables/useProgress'
import { useExerciseGenerator, DIFFICULTY_LIST, DIFFICULTY_CONFIG } from '@/composables/useExerciseGenerator'
import { useExerciseHistory } from '@/composables/useExerciseHistory'
import BaseTag from '@/components/ui/BaseTag.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseMath from '@/components/ui/BaseMath.vue'
import DraftEditor from '@/components/exercise/DraftEditor.vue'

const props = defineProps({
    levelId: { type: String, required: true },
    chapterId: { type: String, required: true },
})

const { chapterStatus, setStatus } = useProgress()
const { exercise, loading, error, generate, reset } = useExerciseGenerator()
const { getChapterHistory, saveExercise, clearChapterHistory, updateDraft, formatDate } = useExerciseHistory()

const difficulty = ref('application')
const showCorrection = ref(false)
const showHistoryCorrection = ref(false)
const selectedEntry = ref(null)
const currentExerciseId = ref(null)

const currentBlock = computed(() =>
    CURRICULUM.find(b => b.levels.some(l => l.id === props.levelId))
)

const currentLevel = computed(() =>
    currentBlock.value?.levels.find(l => l.id === props.levelId)
)

const chapter = computed(() =>
    currentLevel.value?.chapters.find(c => c.id === props.chapterId)
)

const currentStatus = computed(() => chapterStatus(props.chapterId))

const chapterHistory = computed(() => getChapterHistory(props.chapterId))

async function handleGenerate() {
    showCorrection.value = false
    selectedEntry.value = null
    await generate(chapter.value, currentLevel.value?.label, difficulty.value)

    if (exercise.value) {
        const entry = saveExercise(props.chapterId, {
            difficulty: difficulty.value,
            enonce: exercise.value.enonce,
            correction: exercise.value.correction,
        })
        currentExerciseId.value = entry.id
    }
}

function openHistoryEntry(entry) {
    selectedEntry.value = entry
    currentExerciseId.value = entry.id
    showHistoryCorrection.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleDraftUpdate(content) {
    if (currentExerciseId.value) {
        updateDraft(props.chapterId, currentExerciseId.value, content)
    }
}

function getCurrentDraft() {
    if (!currentExerciseId.value) return ''
    const entries = getChapterHistory(props.chapterId)
    const entry = entries.find(e => e.id === currentExerciseId.value)
    return entry?.draft || ''
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.chapter {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding-bottom: calc(#{$bottom-nav-height} + #{$spacing-xl});

    // ── Header ──
    &__header {
        background: linear-gradient(135deg, #1e293b 0%, #312e81 100%);
        padding: $spacing-xl $spacing-lg $spacing-lg;
        display: flex;
        flex-direction: column;
        gap: $spacing-md;
    }

    &__header-top {
        @include flex(row, center, space-between);
    }

    &__back {
        font-size: $text-sm;
        color: #a5b4fc;
        font-weight: $font-semibold;
        text-decoration: none;

        &:active {
            opacity: 0.7;
        }
    }

    &__title {
        font-size: $text-xl;
        font-weight: $font-extrabold;
        color: #fff;
        line-height: 1.3;
    }

    &__status-row {
        @include flex(row, center, flex-start);
        gap: $spacing-sm;
        flex-wrap: wrap;
    }

    &__status-btn {
        padding: $spacing-xs $spacing-md;
        border-radius: $radius-full;
        border: 2px solid rgba(255, 255, 255, 0.2);
        background: transparent;
        color: rgba(255, 255, 255, 0.6);
        font-size: $text-xs;
        font-weight: $font-bold;
        cursor: pointer;
        transition: all 0.15s ease;
        min-height: 32px;

        &--active {
            border-color: currentColor;
        }
    }

    &__links {
        @include flex(row, center, flex-start);
        gap: $spacing-sm;
        flex-wrap: wrap;
    }

    &__link {
        @include flex(row, center, center);
        height: 32px;
        padding: 0 $spacing-md;
        border-radius: $radius-sm;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.8);
        font-size: $text-xs;
        font-weight: $font-semibold;
        text-decoration: none;
        transition: background 0.15s ease;

        &:active {
            background: rgba(255, 255, 255, 0.15);
        }
    }

    // ── Sections ──
    &__section {
        padding: $spacing-lg;
        display: flex;
        flex-direction: column;
        gap: $spacing-md;

        &+& {
            border-top: $border-base;
        }
    }

    &__section-header {
        @include flex(row, center, space-between);
    }

    &__section-title {
        font-size: $text-md;
        font-weight: $font-bold;
        color: $color-text-primary;
    }

    &__clear {
        font-size: $text-xs;
        color: $color-danger;
        font-weight: $font-semibold;
        background: none;
        border: none;
        cursor: pointer;
    }

    // ── Difficulty ──
    &__difficulty {
        @include flex(row, stretch, flex-start);
        gap: $spacing-sm;
    }

    &__error {
        font-size: $text-sm;
        color: $color-danger;
        font-weight: $font-medium;
    }

    // ── Exercise ──
    &__exercise {
        display: flex;
        flex-direction: column;
        gap: $spacing-md;
    }

    &__exercise-enonce {
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

    &__exercise-correction {
        background: $color-success-light;
        border-radius: $radius-md;
        padding: $spacing-md;
        border: 1px solid $color-success;
    }

    // ── History ──
    &__history {
        display: flex;
        flex-direction: column;
        gap: $spacing-sm;
    }
}

// ── Difficulty button ──
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

// ── History card ──
.history-card {
    @include card;
    padding: $spacing-md;
    cursor: pointer;
    transition: transform 0.15s ease;
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;

    &:active {
        transform: scale(0.98);
    }

    &__top {
        @include flex(row, center, space-between);
    }

    &__difficulty {
        font-size: $text-xs;
        font-weight: $font-bold;
        color: $color-text-secondary;
    }

    &__date {
        font-size: $text-xs;
        color: $color-text-muted;
    }

    &__preview {
        font-size: $text-sm;
        color: $color-text-secondary;
        line-height: 1.4;
        @include truncate;
    }
}
</style>