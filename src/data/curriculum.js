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
        chapters: [
          { id: '1-1', 
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
{
  id: '1-2',
  title: 'Généralités sur les suites',
  urls : ['https://www.maths-et-tiques.fr/telech/19SuitesP1M.pdf'],
  summary : `- Suite (uₙ) : liste ordonnée de nombres, à chaque entier n on associe un réel uₙ ; uₙ = terme, n = rang
- Forme explicite : uₙ donné en fonction de n directement (ex : uₙ = 2n)
- Forme par récurrence : u₀ donné, uₙ₊₁ exprimé en fonction de uₙ ; impossible de calculer un terme sans connaître le précédent (sauf algorithme Python avec boucle for/while)
- Représentation graphique : nuage de points de coordonnées (n ; uₙ)
- Sens de variation : (uₙ) croissante si uₙ₊₁ ≥ uₙ (à partir d'un certain rang) ; décroissante si uₙ₊₁ ≤ uₙ ; méthode 1 = étudier le signe de uₙ₊₁ − uₙ ; méthode 2 = étudier le rapport uₙ₊₁/uₙ par rapport à 1 (si uₙ > 0) ; méthode 3 = étudier les variations de la fonction associée f puis transposer à la suite
- Limite : lim(n→+∞) uₙ = L si les termes se rapprochent de L (suite convergente) ; sinon suite divergente (y compris vers +∞/−∞ ou sans tendance)
- Notation : (uₙ), u₀/u₁ premier terme selon l'énoncé, ℕ et ℕ*
- Types de problèmes : calcul de termes (forme explicite ou récurrence), étude du sens de variation, conjecture de limite à partir d'un tableau de valeurs, algorithme Python (calcul de terme, recherche de seuil)
- Vigilance : une suite décroissante n'implique pas que la fonction associée soit décroissante (et réciproquement, attention au sens) ; pour le rapport uₙ₊₁/uₙ il faut vérifier le signe de uₙ avant de conclure ; bien repérer le premier indice de définition de la suite (u₀ ou u₁) avant de calculer les termes suivants`
},
{
  id: '1-3',
  title: 'Suites arithmétiques et suites géométrique',
  urls : ['https://www.maths-et-tiques.fr/telech/19SuitesP2M.pdf'],
  summary : `- Arithmétique : (uₙ) telle que uₙ₊₁ = uₙ + r (raison r) ; formule explicite uₙ = u₀ + nr (ou u₁ + (n−1)r)
- Géométrique : (uₙ) telle que uₙ₊₁ = q × uₙ (raison q non nulle) ; formule explicite uₙ = u₀ × qⁿ (ou u₁ × qⁿ⁻¹)
- Démontrer la nature : arithmétique → calculer uₙ₊₁ − uₙ et vérifier que c'est constant ; géométrique → calculer uₙ₊₁/uₙ et vérifier que c'est constant
- Variations arithmétique : r > 0 croissante, r < 0 décroissante (via signe de uₙ₊₁−uₙ = r)
- Variations géométrique : dépend du signe de u₀ ET de la position de q par rapport à 1 (4 cas) ; si q ≤ 0 la suite n'est pas monotone ; si q = 1 suite constante
- Somme arithmétique : 1+2+...+n = n(n+1)/2 ; pour une somme partielle, soustraire deux sommes de 1 à n
- Somme géométrique : 1+q+q²+...+qⁿ = (1−qⁿ⁺¹)/(1−q) pour q ≠ 1 ; pour une somme ne commençant pas à 1, factoriser par le premier terme
- Types de problèmes : déterminer si une suite est arithmétique/géométrique, exprimer uₙ en fonction de n, trouver raison et premier terme à partir de deux termes donnés (système), calculer des sommes de termes consécutifs, problèmes concrets (intérêts composés, investissements), algorithme Python de somme pour suites ni arithmétiques ni géométriques
- Vigilance : bien identifier l'indice de départ (u₀ ou u₁) avant d'appliquer les formules ; pour une somme du type a+...+b ne commençant pas à 1, ne pas oublier de soustraire la partie manquante ; pour une suite géométrique, vérifier le signe de u₀ avant de conclure sur le sens de variation ; ne pas confondre raison arithmétique (addition) et raison géométrique (multiplication)`
},
{
  id: '1-5.1',
  title: 'Nombre dérivé et tangente',
  urls : ['https://www.maths-et-tiques.fr/telech/19DeriP1M.pdf'],
  summary: `Chapitre : Dérivation 1/3 — Nombre dérivé et tangente (Première)
- Limite en 0 : lim(x→0) f(x) = L si f(x) se rapproche de L quand x se rapproche de 0
- Taux d'accroissement : pente de la sécante (AM) = [f(a+h)−f(a)]/h
- Nombre dérivé f'(a) = lim(h→0) [f(a+h)−f(a)]/h, s'il existe (sinon f non dérivable en a)
- Tangente en a : droite passant par A(a ; f(a)) de pente f'(a) ; équation : y = f'(a)(x−a) + f(a)
- Fonction valeur absolue : f(x) = |x|, décroissante sur ]−∞;0], croissante sur [0;+∞[, non dérivable en 0 (limites à gauche/droite différentes : −1 et 1)
- Fonction racine carrée : non dérivable en 0 (tangente verticale), dérivable sur ]0;+∞[
- Types de problèmes : démontrer la dérivabilité en un point via le calcul du taux d'accroissement, lecture graphique du nombre dérivé (pente de tangente donnée), déterminer une équation de tangente
- Vigilance : bien factoriser h au numérateur avant de passer à la limite ; ne pas confondre limite n'existant pas (ex : 1/h) et limite infinie ; pour la valeur absolue, distinguer les cas h>0 et h<0`
},
{
  id: '1-5.2',
  title: 'Calcul de dérivées',
  urls : ['https://www.maths-et-tiques.fr/telech/19DeriP2M.pdf'],
  summary: `- Fonction dérivable sur I : dérivable en tout point de I, fonction dérivée notée f'
- Dérivées usuelles : (a)'=0 ; (ax)'=a ; (x²)'=2x ; (xⁿ)'=nxⁿ⁻¹ ; (1/x)'=−1/x² ; (1/xⁿ)'=−n/xⁿ⁺¹ ; (√x)'=1/(2√x)
- Racine carrée définie sur [0;+∞[ mais dérivable seulement sur ]0;+∞[ (tangente verticale en 0)
- Opérations : (u+v)'=u'+v' ; (ku)'=ku' ; (uv)'=u'v+uv' ; (1/u)'=−u'/u² ; (u/v)'=(u'v−uv')/v²
- Approximation linéaire : pour h petit, f(a+h) ≈ f(a) + f'(a)×h
- Types de problèmes : calculer la dérivée d'une somme/produit/quotient, démonstrations au programme (dérivée de x², de 1/x, de uv), calcul de valeur approchée par approximation linéaire
- Vigilance : bien identifier u et v avant d'appliquer la formule du produit ou du quotient ; ne pas oublier le carré au dénominateur dans la dérivée du quotient ; ne pas confondre dérivée de 1/u(x) et dérivée de u(x)/v(x)`
},
{
  id: '1-5.3',
  title: 'Variations, extremums, applications',
  urls : ['https://www.maths-et-tiques.fr/telech/19DeriP3M.pdf'],
  summary: `- Théorème : f'(x) ≤ 0 sur I → f décroissante ; f'(x) ≥ 0 sur I → f croissante ; f'(x) = 0 → f constante ; f'(x) > 0 → f strictement croissante
- Méthode générale : résoudre f'(x) = 0, étudier le signe de f' (souvent via signe d'une fonction affine ou d'un trinôme), en déduire le tableau de variations, calculer les valeurs aux points clés
- Extremum : si f' s'annule et change de signe en c, alors f admet un extremum en x = c (tangente horizontale, pente nulle)
- Fonction paire : f(−x) = f(x), courbe symétrique par rapport à l'axe des ordonnées
- Fonction impaire : f(−x) = −f(x), courbe symétrique par rapport à l'origine
- Étude de signe d'une fonction : utiliser le tableau de variations + une racine connue (f(x₀)=0) pour conclure sur le signe avant/après
- Position relative de deux courbes : étudier le signe de la différence h(x) = f(x) − g(x)
- Problème d'optimisation : exprimer la fonction à optimiser (ex : bénéfice = recette − coût), dériver, étudier le signe, lire l'extremum dans le tableau de variations
- Vigilance : bien vérifier que le carré (x+1)² ou similaire est toujours positif pour conclure sur le signe de f' sans calcul supplémentaire ; ne pas oublier de calculer f(c) pour donner la valeur de l'extremum, pas seulement sa position`
}
        ],
      },
      {
        id: 'tale',
        label: 'Terminale',
        chapters: [
            
        ],
      },
    ],
  },
]