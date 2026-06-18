export const CURRICULUM = [
  {
    id: 'college',
    label: 'Collège',
    levels: [
      {
        id: '6e',
        label: 'Sixième',
        chapters: [
          {
            id: '6-1',
            title: 'Nombres entiers et décimaux',
            urls: [
              'https://www.maths-et-tiques.fr/telech/25Nombres1.pdf',
              'https://www.maths-et-tiques.fr/telech/25Nombres2.pdf',
            ],
            summary: `Numération de position : la valeur d'un chiffre dépend de son rang (unités, dizaines, centaines, mille, millions…). Nombre décimal = partie entière + partie décimale (ex : 52,493 = 52 + 0,493). Rangs décimaux : dixièmes, centièmes, millièmes, dix-millièmes (la virgule repère le rang des unités). Fraction décimale : fraction de dénominateur 10, 100, 1000… ; 2,3 = 23/10 ; 45,67 = 4567/100. Décomposition selon les rangs : 453,51 = (4×100)+(5×10)+(3×1)+(5×1/10)+(1×1/100). Demi-droite graduée : abscisse d'un point, notation A(3) ; placer un point à partir de son abscisse. Comparer : aligner la virgule, ajouter des zéros inutiles si nécessaire, comparer chiffre par chiffre (8,32 < 8,40). Encadrer : trouver deux valeurs consécutives (à l'unité, au dixième…) encadrant le nombre ; arrondir = choisir la plus proche. Intercaler : ajouter des zéros pour disposer de graduations intermédiaires. Vigilance : ne pas supprimer les zéros utiles (5,08 ≠ 5,8) ; ne pas confondre rang du chiffre et valeur ; 52,493 contient 524 dixièmes (pas seulement 4).`,
          },
          {
            id: '6-2',
            title: 'Addition, soustraction, multiplication',
            urls: ['https://www.maths-et-tiques.fr/telech/25Operations.pdf'
            ],
            summary: `- Vocabulaire : addition (termes → somme), soustraction (termes → différence), multiplication (facteurs → produit)
- Règle 1 : additions et soustractions uniquement → calcul de gauche à droite
- Règle 2 : parenthèses → on calcule en premier ce qui est entre parenthèses
- Règle 3 : parenthèses doubles → on commence par les parenthèses les plus intérieures
- Priorité globale : parenthèses > multiplication > addition/soustraction (gauche à droite)
- Addition/soustraction posée : aligner les virgules, compléter avec des zéros si nécessaire
- Multiplication posée : ignorer la virgule, effectuer la multiplication en nombres entiers, puis placer la virgule dans le résultat en comptant le total de chiffres après la virgule dans les deux facteurs
- Types de problèmes : calcul d'expressions avec plusieurs opérations, pose et calcul d'opérations sur décimaux, identification du vocabulaire
- Vigilance : ne pas effectuer gauche-droite quand il y a des parenthèses ou une multiplication ; mal placer la virgule dans le produit (oublier de sommer les chiffres après virgule des deux facteurs) ; oublier d'aligner les virgules à l'addition/soustraction`,
          },
          // { id: '6-2', title: '...', urls: [], summary: '' },
        ],
      },
      {
        id: '5e',
        label: 'Cinquième',
        chapters: [
          // { id: '5-1', title: '...', urls: [], summary: '' },
        ],
      },
      {
        id: '4e',
        label: 'Quatrième',
        chapters: [],
      },
      {
        id: '3e',
        label: 'Troisième',
        chapters: [],
      },
    ],
  },
  {
    id: 'lycee',
    label: 'Lycée',
    levels: [
      {
        id: '2nde',
        label: 'Seconde',
        chapters: [],
      },
      {
        id: '1ere',
        label: 'Première',
        chapters: [],
      },
      {
        id: 'tale',
        label: 'Terminale',
        chapters: [
            { id: 'T-1', 
                title: 'Second degré', 
                urls: ['https://www.maths-et-tiques.fr/telech/19SecdegP1M.pdf', 'https://www.maths-et-tiques.fr/telech/19SecdegP2M.pdf' ], 
                summary: `
- Définition : f(x) = ax² + bx + c avec a ≠ 0 (aussi appelé trinôme) ; domaine ℝ
- Forme canonique : f(x) = a(x − α)² + β avec α = −b/(2a) et β = f(−b/(2a)) = −(b²−4ac)/(4a) ; obtenue par complétion du carré
- Parabole : a > 0 → branches vers le haut (minimum en α) ; a < 0 → branches vers le bas (maximum en α) ; axe de symétrie x = α ; sommet (α ; β)
- Discriminant : Δ = b² − 4ac ; si Δ < 0 : pas de racine réelle ; si Δ = 0 : racine double x₀ = −b/(2a) ; si Δ > 0 : deux racines x₁ = (−b−√Δ)/(2a) et x₂ = (−b+√Δ)/(2a)
- Factorisation : Δ < 0 → impossible sur ℝ ; Δ = 0 → a(x−x₀)² ; Δ > 0 → a(x−x₁)(x−x₂)
- Somme et produit des racines : S = −b/a et P = c/a
- Signe du trinôme : si Δ < 0, signe constant égal au signe de a ; si Δ ≥ 0, le trinôme est du signe de a à l'extérieur des racines et de signe opposé entre les racines
- Types de problèmes : mise en forme canonique, résolution d'équation/inéquation du second degré, étude de signe, position relative de deux courbes (étude du signe de f−g), déterminer un trinôme connaissant ses racines et un point
- Vigilance : ne pas confondre α (abscisse du sommet) et β (valeur de l'extremum) ; bien ramener une inéquation à la forme trinôme ≤/≥ 0 avant d'appliquer le tableau de signes ; le signe de a détermine le sens des inégalités dans le tableau ; démonstration de la formule des racines par la forme canonique est au programme` },
        ],
      },
    ],
  },
]