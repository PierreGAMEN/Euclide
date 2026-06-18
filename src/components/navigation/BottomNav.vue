<template>
    <nav class="bottom-nav">
        <RouterLink v-for="item in navItems" :key="item.name" :to="item.to" class="bottom-nav__item"
            :class="{ 'bottom-nav__item--active': isActive(item) }">
            <span class="bottom-nav__icon">{{ item.icon }}</span>
            <span class="bottom-nav__label">{{ item.label }}</span>
        </RouterLink>
    </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { CURRICULUM } from '@/data/curriculum'

const route = useRoute()

const collegeLevels = CURRICULUM.find(b => b.id === 'college').levels
const lyceeLevels = CURRICULUM.find(b => b.id === 'lycee').levels

const navItems = [
    {
        name: 'home',
        label: 'Accueil',
        icon: '⌂',
        to: { name: 'home' },
    },
    {
        name: 'college',
        label: 'Collège',
        icon: '◆',
        to: { name: 'level', params: { levelId: collegeLevels[0].id } },
        matchLevelIds: collegeLevels.map(l => l.id),
    },
    {
        name: 'lycee',
        label: 'Lycée',
        icon: '◇',
        to: { name: 'level', params: { levelId: lyceeLevels[0].id } },
        matchLevelIds: lyceeLevels.map(l => l.id),
    },
]

function isActive(item) {
    if (item.name === 'home') return route.name === 'home'
    return item.matchLevelIds?.includes(route.params.levelId)
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: $bottom-nav-height;
    background: $color-bg-card;
    border-top: $border-base;
    @include flex(row, center, space-around);
    z-index: 50;
    padding-bottom: env(safe-area-inset-bottom); // encoche iPhone

    &__item {
        @include flex(column, center, center);
        @include touch-target;
        flex: 1;
        gap: 2px;
        color: $color-text-muted;
        transition: color 0.15s ease;
        text-decoration: none;

        &--active {
            color: $color-primary;
        }
    }

    &__icon {
        font-size: $text-xl;
        line-height: 1;
    }

    &__label {
        font-size: $text-xs;
        font-weight: $font-semibold;
    }
}
</style>