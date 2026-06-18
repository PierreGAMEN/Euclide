import { ref } from 'vue'

const STORAGE_KEY = 'euclide_exercise_history_v1'

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveHistory(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    console.warn('Euclide : impossible de sauvegarder l\'historique.')
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function useExerciseHistory() {
  const history = ref(loadHistory())

  function getChapterHistory(chapterId) {
    return history.value[chapterId] || []
  }

  function saveExercise(chapterId, { difficulty, enonce, correction }) {
    const entry = {
      id: generateId(),
      difficulty,
      enonce,
      correction,
      generatedAt: new Date().toISOString(),
    }

    if (!history.value[chapterId]) {
      history.value[chapterId] = []
    }

    // On garde les 10 derniers exercices par chapitre max
    history.value[chapterId] = [entry, ...history.value[chapterId]].slice(0, 10)

    saveHistory(history.value)
    return entry
  }

  function deleteExercise(chapterId, exerciseId) {
    if (!history.value[chapterId]) return
    history.value[chapterId] = history.value[chapterId].filter(e => e.id !== exerciseId)
    saveHistory(history.value)
  }

  function clearChapterHistory(chapterId) {
    delete history.value[chapterId]
    saveHistory(history.value)
  }

  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return {
    getChapterHistory,
    saveExercise,
    deleteExercise,
    clearChapterHistory,
    formatDate,
  }
}