<template>
    <div class="level">

        <!-- Header -->
        <header class="level__header">
            <div class="level__header-top">
                <RouterLink :to="{ name: 'home' }" class="level__back">
                    ← Accueil
                </RouterLink>
                <BaseTag :variant="currentBlock?.id">{{ currentBlock?.label }}</BaseTag>
            </div>

            <div class="level__nav">
                <button v-for="level in currentBlock?.levels" :key="level.id" class="level__tab"
                    :class="{ 'level__tab--active': level.id === levelId }" @click="goToLevel(level.id)">
                    {{ level.label }}
                    <span v-if="levelStats(level.id).mastered > 0" class="level__tab-count">
                        {{ levelStats(level.id).mastered }}
                    </span>
                </button>
            </div>

            <div class="level__progress">
                <span class="level__progress-label">
                    {{ stats.mastered }} / {{ stats.total }} chapitres maîtrisés
                </span>
                <BaseProgressBar :value="stats.mastered" :total="stats.total"
                    :color="currentBlock?.id === 'college' ? '#2563eb' : '#7c3aed'" size="md" :show-label="false" />
            </div>
        </header>

        <!-- Chapitres -->
        <main class="level__main">
            <template v-if="currentLevel?.chapters.length">
                <ChapterRow v-for="chapter in currentLevel.chapters" :key="chapter.id" :chapter="chapter"
                    :level-id="levelId" :status="chapterStatus(chapter.id)"
                    @update-status="setStatus(chapter.id, $event)" />
            </template>
            <div v-else class="level__empty">
                Aucun chapitre disponible pour ce niveau.
            </div>
        </main>

        <!-- Exercise panel -->
        <ExercisePanel v-if="selectedChapter" v-model="showPanel" :chapter="selectedChapter"
            :level-label="currentLevel?.label" @closed="selectedChapter = null" />

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CURRICULUM } from '@/data/curriculum'
import { useProgressStore } from '@/stores/progress.store'
import { useProgress } from '@/composables/useProgress'
import BaseTag from '@/components/ui/BaseTag.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import ChapterRow from '@/components/chapters/ChapterRow.vue'
import ExercisePanel from '@/components/exercise/ExercisePanel.vue'

const props = defineProps({
    levelId: { type: String, required: true },
})

const router = useRouter()
const store = useProgressStore()
const { chapterStatus, setStatus } = useProgress()

const showPanel = ref(false)
const selectedChapter = ref(null)

const currentBlock = computed(() =>
    CURRICULUM.find(b => b.levels.some(l => l.id === props.levelId))
)

const currentLevel = computed(() =>
    currentBlock.value?.levels.find(l => l.id === props.levelId)
)

const stats = computed(() => store.levelStats(props.levelId))
const { levelStats } = store

function goToLevel(levelId) {
    router.push({ name: 'level', params: { levelId } })
}

function openExercise(chapter) {
    selectedChapter.value = chapter
    showPanel.value = true
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.level {
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

    // ── Tabs niveaux ──
    &__nav {
        @include flex(row, center, flex-start);
        gap: $spacing-sm;
        overflow-x: auto;
        padding-bottom: $spacing-xs;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__tab {
        @include flex(row, center, center);
        gap: $spacing-xs;
        padding: $spacing-xs $spacing-md;
        border-radius: $radius-full;
        border: 2px solid rgba(255, 255, 255, 0.2);
        background: transparent;
        color: rgba(255, 255, 255, 0.6);
        font-size: $text-xs;
        font-weight: $font-bold;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.15s ease;
        min-height: 32px;

        &--active {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.6);
            color: #fff;
        }
    }

    &__tab-count {
        background: rgba(255, 255, 255, 0.2);
        border-radius: $radius-full;
        padding: 1px 6px;
        font-size: 10px;
    }

    // ── Progress ──
    &__progress {
        display: flex;
        flex-direction: column;
        gap: $spacing-xs;
    }

    &__progress-label {
        font-size: $text-xs;
        color: rgba(255, 255, 255, 0.6);
        font-weight: $font-medium;
    }

    // ── Main ──
    &__main {
        flex: 1;
        padding: $spacing-lg;
        display: flex;
        flex-direction: column;
        gap: $spacing-sm;
    }

    &__empty {
        text-align: center;
        color: $color-text-muted;
        font-size: $text-sm;
        padding: $spacing-3xl 0;
    }
}
</style>