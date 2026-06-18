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
        chapters: [],
      },
    ],
  },
]