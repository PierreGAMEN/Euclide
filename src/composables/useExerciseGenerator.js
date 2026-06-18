import { ref } from 'vue'

export const DIFFICULTY_CONFIG = {
  application: {
    id: 'application',
    label: 'Application directe',
    emoji: '🟢',
    promptHint: `Génère un exercice d'application directe, court et ciblé sur une seule notion du chapitre. 
L'élève doit pouvoir le résoudre en quelques lignes de calcul.`,
  },
  intermediate: {
    id: 'intermediate',
    label: 'Intermédiaire',
    emoji: '🟡',
    promptHint: `Génère un exercice intermédiaire combinant plusieurs notions du chapitre. 
L'élève doit structurer son raisonnement en plusieurs étapes.`,
  },
  jury: {
    id: 'jury',
    label: 'Niveau jury CAPES',
    emoji: '🔴',
    promptHint: `Génère un problème de type épreuve CAPES avec plusieurs parties progressives. 
Inclus des questions de démonstration et une partie "Point pédagogique" : 
comment introduire cette notion en classe, quelles sont les difficultés des élèves, 
quelles activités proposer.`,
  },
}

export const DIFFICULTY_LIST = Object.values(DIFFICULTY_CONFIG)

function buildPrompt(chapter, levelLabel, difficulty) {
  const config = DIFFICULTY_CONFIG[difficulty]

  return `Tu es un expert en préparation au CAPES de mathématiques.

Niveau : ${levelLabel}
Chapitre : ${chapter.title}
${chapter.summary ? `Contenu abordé dans ce chapitre :\n${chapter.summary}` : ''}

${config.promptHint}

CONSIGNES STRICTES :
- Utilise $...$ pour les formules inline et $$...$$ pour les formules en display
- Structure ta réponse en deux blocs séparés par exactement cette ligne : ## Correction
- Le bloc énoncé vient en premier, la correction ensuite
- La correction doit être complète, rigoureuse, avec toutes les justifications
- Reste fidèle aux notions listées dans le contenu du chapitre, n'introduis rien hors programme
- Pour le niveau jury CAPES, le point pédagogique est obligatoire

Génère uniquement l'exercice et sa correction, sans introduction ni commentaire.`
}

export function useExerciseGenerator() {
  const exercise = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function generate(chapter, levelLabel, difficulty) {
    loading.value = true
    error.value = null
    exercise.value = null

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
      if (!apiKey) throw new Error('Clé API OpenRouter manquante dans .env')

      const prompt = buildPrompt(chapter, levelLabel, difficulty)

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-lite',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error?.message || `Erreur OpenRouter : ${response.status}`)
      }

      const data = await response.json()
      const text = data.choices?.[0]?.message?.content

      if (!text) throw new Error('Réponse vide.')

      exercise.value = parseExercise(text)

    } catch (e) {
      error.value = e.message || 'Erreur lors de la génération.'
    } finally {
      loading.value = false
    }
  }

  function parseExercise(text) {
    const marker = '## Correction'
    const idx = text.indexOf(marker)

    if (idx === -1) {
      return { enonce: text.trim(), correction: null }
    }

    return {
      enonce: text.slice(0, idx).trim(),
      correction: text.slice(idx + marker.length).trim(),
    }
  }

  function reset() {
    exercise.value = null
    error.value = null
    loading.value = false
  }

  return {
    exercise,
    loading,
    error,
    generate,
    reset,
    DIFFICULTY_LIST,
    DIFFICULTY_CONFIG,
  }
}