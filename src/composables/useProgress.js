import { useProgressStore } from '@/stores/progress.store'

export const STATUS_CONFIG = {
todo: {
id: 'todo',
label: 'À faire',
color: '#94a3b8',
bg: '#f1f5f9',
},
inprogress: {
id: 'inprogress',
label: 'En cours',
color: '#f59e0b',
bg: '#fffbeb',
},
mastered: {
id: 'mastered',
label: 'Maîtrisé',
color: '#10b981',
bg: '#ecfdf5',
},
}

export const STATUS_LIST = Object.values(STATUS_CONFIG)

export function useProgress() {
const store = useProgressStore()

function nextStatus(chapterId) {
const current = store.chapterStatus(chapterId)
const order = ['todo', 'inprogress', 'mastered']
const next = order[(order.indexOf(current) + 1) % order.length]
store.setStatus(chapterId, next)
}

function statusConfig(chapterId) {
return STATUS_CONFIG[store.chapterStatus(chapterId)]
}

return {
chapterStatus: store.chapterStatus,
statusConfig,
setStatus: store.setStatus,
nextStatus,
resetChapter: store.resetChapter,
resetAll: store.resetAll,
STATUS_CONFIG,
STATUS_LIST,
}
}