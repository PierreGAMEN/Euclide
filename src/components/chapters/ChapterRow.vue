<template>
    <div class="chapter-row" :class="`chapter-row--${status}`">

        <RouterLink :to="{ name: 'chapter', params: { levelId, chapterId: chapter.id } }" class="chapter-row__content">
            <span class="chapter-row__title">{{ chapter.title }}</span>
            <span class="chapter-row__arrow">→</span>
        </RouterLink>

        <div class="chapter-row__actions">

            <a v-for="(url, index) in chapter.urls" :key="url" :href="url" target="_blank" rel="noopener noreferrer"
                class="chapter-row__link">
                📄 {{ chapter.urls.length > 1 ? `Cours ${index + 1}` : 'Cours' }}
            </a>

            <button class="chapter-row__status" :class="`chapter-row__status--${status}`" @click.prevent="cycleStatus">
                {{ STATUS_CONFIG[status].label }}
            </button>
        </div>

    </div>
</template>

<script setup>
import { useProgress, STATUS_CONFIG } from '@/composables/useProgress'

const props = defineProps({
    chapter: { type: Object, required: true },
    levelId: { type: String, required: true },
    status: { type: String, default: 'todo' },
})

const emit = defineEmits(['update-status'])

const { } = useProgress()

function cycleStatus() {
    const order = ['todo', 'inprogress', 'mastered']
    const next = order[(order.indexOf(props.status) + 1) % order.length]
    emit('update-status', next)
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.chapter-row {
    @include card;
    padding: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    border-left: 3px solid $color-border;
    transition: border-color 0.2s ease;

    &--inprogress {
        border-left-color: $color-warning;
    }

    &--mastered {
        border-left-color: $color-success;
    }

    &__content {
        @include flex(row, center, space-between);
        text-decoration: none;
        flex: 1;

        &:active {
            opacity: 0.7;
        }
    }

    &__title {
        font-size: $text-sm;
        font-weight: $font-semibold;
        color: $color-text-primary;
        line-height: 1.4;
        flex: 1;
    }

    &__arrow {
        font-size: $text-sm;
        color: $color-text-muted;
        flex-shrink: 0;
    }

    &__actions {
        @include flex(row, center, flex-start);
        flex-wrap: wrap;
        gap: $spacing-sm;
    }

    &__link {
        @include flex(row, center, center);
        height: 32px;
        padding: 0 $spacing-md;
        border-radius: $radius-sm;
        border: $border-base;
        background: $color-bg;
        color: $color-text-secondary;
        font-size: $text-xs;
        font-weight: $font-semibold;
        text-decoration: none;
        white-space: nowrap;
        transition: background 0.15s ease;

        &:active {
            background: $color-border;
        }
    }

    &__status {
        @include flex(row, center, center);
        height: 32px;
        padding: 0 $spacing-md;
        border-radius: $radius-sm;
        font-size: $text-xs;
        font-weight: $font-bold;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s ease;
        border: 2px solid;

        &--todo {
            border-color: $color-border;
            color: $color-text-muted;
            background: $color-bg;
        }

        &--inprogress {
            border-color: $color-warning;
            color: $color-warning;
            background: $color-warning-light;
        }

        &--mastered {
            border-color: $color-success;
            color: $color-success;
            background: $color-success-light;
        }
    }
}
</style>