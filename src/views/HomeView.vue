<template>
    <div class="home">

        <!-- Header -->
        <header class="home__header">
            <div class="home__header-top">
                <div>
                    <p class="home__eyebrow">Prépa CAPES</p>
                    <h1 class="home__title">Euclide <span>∑</span></h1>
                </div>
                <div class="home__global-stats">
                    <span class="home__stat">
                        <strong>{{ masteredCount }}</strong> / {{ totalCount }}
                    </span>
                    <BaseTag variant="success" :dot="true">Maîtrisés</BaseTag>
                </div>
            </div>
            <BaseProgressBar :value="masteredCount" :total="totalCount" color="#a5b4fc" size="md" :show-label="true" />
            <div class="home__sub-stats">
                <span class="home__sub-stat home__sub-stat--warning">
                    {{ inProgressCount }} en cours
                </span>
                <span class="home__sub-stat home__sub-stat--muted">
                    {{ totalCount - masteredCount - inProgressCount }} à faire
                </span>
            </div>
        </header>

        <!-- Blocs -->
        <main class="home__main">
            <section v-for="block in CURRICULUM" :key="block.id" class="home__block">
                <h2 class="home__block-title">
                    <BaseTag :variant="block.id">{{ block.label }}</BaseTag>
                </h2>

                <div class="home__levels">
                    <RouterLink v-for="level in block.levels" :key="level.id"
                        :to="{ name: 'level', params: { levelId: level.id } }" class="level-card"
                        :class="`level-card--${block.id}`">
                        <div class="level-card__top">
                            <span class="level-card__label">{{ level.label }}</span>
                            <span class="level-card__count">
                                {{ levelStats(level.id).mastered }} / {{ levelStats(level.id).total }}
                            </span>
                        </div>
                        <BaseProgressBar :value="levelStats(level.id).mastered" :total="levelStats(level.id).total"
                            :color="block.id === 'college' ? '#2563eb' : '#7c3aed'" size="sm" :show-label="false" />
                        <div class="level-card__bottom">
                            <BaseTag
                                v-if="levelStats(level.id).mastered === levelStats(level.id).total && levelStats(level.id).total > 0"
                                variant="success" size="sm">
                                ✓ Complet
                            </BaseTag>
                            <span v-else class="level-card__inprogress">
                                {{ levelStats(level.id).inprogress }} en cours
                            </span>
                        </div>
                    </RouterLink>
                </div>
            </section>
        </main>

    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { CURRICULUM } from '@/data/curriculum'
import { useProgressStore } from '@/stores/progress.store'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'
import BaseTag from '@/components/ui/BaseTag.vue'

const store = useProgressStore()
const { masteredCount, inProgressCount, totalCount } = storeToRefs(store)
const { levelStats } = store
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.home {
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
        @include flex(row, flex-start, space-between);
        gap: $spacing-md;
    }

    &__eyebrow {
        font-size: $text-xs;
        font-weight: $font-bold;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #a5b4fc;
        margin-bottom: $spacing-xs;
    }

    &__title {
        font-size: $text-2xl;
        font-weight: $font-extrabold;
        color: #fff;

        span {
            color: #a5b4fc;
        }
    }

    &__global-stats {
        @include flex(column, flex-end, flex-start);
        gap: $spacing-xs;
        flex-shrink: 0;
    }

    &__stat {
        font-size: $text-lg;
        color: #fff;

        strong {
            font-size: $text-2xl;
            font-weight: $font-extrabold;
        }
    }

    &__sub-stats {
        @include flex(row, center, flex-start);
        gap: $spacing-lg;
    }

    &__sub-stat {
        font-size: $text-xs;
        font-weight: $font-semibold;

        &--warning {
            color: #fbbf24;
        }

        &--muted {
            color: #94a3b8;
        }
    }

    // ── Main ──
    &__main {
        flex: 1;
        padding: $spacing-lg;
        display: flex;
        flex-direction: column;
        gap: $spacing-2xl;
    }

    &__block-title {
        margin-bottom: $spacing-md;
    }

    &__levels {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: $spacing-md;

        @include md {
            grid-template-columns: repeat(4, 1fr);
        }
    }
}

// ── Level card ──
.level-card {
    @include card;
    padding: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    text-decoration: none;
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:active {
        transform: scale(0.97);
    }

    &__top {
        @include flex(row, center, space-between);
    }

    &__label {
        font-size: $text-sm;
        font-weight: $font-bold;
        color: $color-text-primary;
    }

    &__count {
        font-size: $text-xs;
        color: $color-text-muted;
        font-weight: $font-semibold;
    }

    &__bottom {
        min-height: 20px;
    }

    &__inprogress {
        font-size: $text-xs;
        color: $color-warning;
        font-weight: $font-medium;
    }

    // Accent couleur selon le bloc
    &--college {
        border-left: 3px solid $color-college;
    }

    &--lycee {
        border-left: 3px solid $color-lycee;
    }
}
</style>