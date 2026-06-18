import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CURRICULUM } from '@/data/curriculum'

const STORAGE_KEY = 'euclide_progress_v1'

export const useProgressStore = defineStore('progress', () => {

  // ─── STATE ───────────────────────────────────────────────────────────────

  const progress = ref(loadFromStorage())

  // ─── GETTERS ─────────────────────────────────────────────────────────────

  const allChapters = computed(() =>
    CURRICULUM.flatMap(block =>
      block.levels.flatMap(level =>
        level.chapters.map(chapter => ({
          ...chapter,
          blockId: block.id,
          levelId: level.id,
          levelLabel: level.label,
        }))
      )
    )
  )

  const totalCount = computed(() => allChapters.value.length)

  const masteredCount = computed(() =>
    allChapters.value.filter(c => progress.value[c.id] === 'mastered').length
  )

  const inProgressCount = computed(() =>
    allChapters.value.filter(c => progress.value[c.id] === 'inprogress').length
  )

  const globalPercentage = computed(() =>
    totalCount.value === 0 ? 0 : Math.round((masteredCount.value / totalCount.value) * 100)
  )

  function chapterStatus(chapterId) {
    return progress.value[chapterId] || 'todo'
  }

  function levelStats(levelId) {
    const chapters = allChapters.value.filter(c => c.levelId === levelId)
    const mastered = chapters.filter(c => progress.value[c.id] === 'mastered').length
    return {
      total: chapters.length,
      mastered,
      inprogress: chapters.filter(c => progress.value[c.id] === 'inprogress').length,
      percentage: chapters.length === 0 ? 0 : Math.round((mastered / chapters.length) * 100),
    }
  }

  // ─── ACTIONS ─────────────────────────────────────────────────────────────

  function setStatus(chapterId, status) {
    progress.value[chapterId] = status
    saveToStorage(progress.value)
  }

  function resetChapter(chapterId) {
    delete progress.value[chapterId]
    saveToStorage(progress.value)
  }

  function resetAll() {
    progress.value = {}
    saveToStorage(progress.value)
  }

  // ─── STORAGE ─────────────────────────────────────────────────────────────

  function loadFromStorage() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    } catch {
      return {}
    }
  }

  function saveToStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      console.warn('Euclide : impossible de sauvegarder la progression.')
    }
  }

  return {
    progress,
    allChapters,
    totalCount,
    masteredCount,
    inProgressCount,
    globalPercentage,
    chapterStatus,
    levelStats,
    setStatus,
    resetChapter,
    resetAll,
  }
})