import { createRouter, createWebHistory } from 'vue-router'
import { CURRICULUM } from '@/data/curriculum'

const validLevelIds = CURRICULUM.flatMap(b => b.levels.map(l => l.id))
const validChapterIds = CURRICULUM.flatMap(b => b.levels.flatMap(l => l.chapters.map(c => c.id)))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/niveau/:levelId',
      name: 'level',
      component: () => import('@/views/LevelView.vue'),
      props: true,
      beforeEnter: (to) => {
        if (!validLevelIds.includes(to.params.levelId)) {
          return { name: 'home' }
        }
      },
    },
    {
      path: '/niveau/:levelId/chapitre/:chapterId',
      name: 'chapter',
      component: () => import('@/views/ChapterView.vue'),
      props: true,
      beforeEnter: (to) => {
        if (!validLevelIds.includes(to.params.levelId) ||
            !validChapterIds.includes(to.params.chapterId)) {
          return { name: 'home' }
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' },
    },
  ],
})

export default router