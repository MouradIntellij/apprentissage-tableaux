import React, { useState } from 'react';
import { Code, BookOpen, Play } from 'lucide-react';

const ArrayLearningPlatform = () => {
  const [selectedOperation, setSelectedOperation] = useState('display');
  const [showCode, setShowCode] = useState(true);
  const [showPseudo, setShowPseudo] = useState(true);
  const [activeTab, setActiveTab] = useState('theory');
  const [visualArray] = useState([5, 3, 8, 1, 9]);
  const [highlightIndex, setHighlightIndex] = useState(null);

  const operations = {
    display: {
      title: "Afficher un tableau",
      description: "Parcourir et afficher tous les éléments d'un tableau",
      csharp: `public static void AfficherArray(int[] tableau)
{
Console.Write("Tableau : ");
if (tableau.Length == 0)
{
Console.WriteLine("(vide)");
return;
}
for (int i = 0; i < tableau.Length; i++)
{
Console.Write(tableau[i]);
if (i < tableau.Length - 1)
{
Console.Write(", ");
}
}
Console.WriteLine();
}`,
      pseudo: `PROCÉDURE AfficherArray(tableau: tableau d'entiers)
ÉCRIRE "Tableau : "
SI la taille du tableau = 0 ALORS
ÉCRIRE "(vide)"
RETOURNER
FIN SI
POUR i allant de 0 à taille(tableau) - 1 FAIRE
ÉCRIRE tableau[i]
SI i < taille(tableau) - 1 ALORS
ÉCRIRE ", "
FIN SI
FIN POUR
PASSER À LA LIGNE
FIN PROCÉDURE`,
      steps: [
        "Vérifier si le tableau est vide",
        "Parcourir chaque élément avec une boucle",
        "Afficher l'élément courant",
        "Ajouter une virgule entre les éléments (sauf le dernier)"
      ]
    },
    insert: {
      title: "Insérer un élément",
      description: "Ajouter un élément à une position donnée dans le tableau",
      csharp: `public static int[] InsererArray(int[] tableau, int valeur, int index)
{
if (index < 0 || index > tableau.Length)
{
throw new ArgumentOutOfRangeException(nameof(index));
}

int[] nouveauTableau = new int[tableau.Length + 1];

// Copier avant l'index
for (int i = 0; i < index; i++)
{
nouveauTableau[i] = tableau[i];
}

// Insérer la valeur
nouveauTableau[index] = valeur;

// Copier après l'index (décalage)
for (int i = index; i < tableau.Length; i++)
{
nouveauTableau[i + 1] = tableau[i];
}

return nouveauTableau;
}`,
      pseudo: `FONCTION InsererArray(tableau: tableau d'entiers, valeur: entier, index: entier)
RETOURNE tableau d'entiers
SI index < 0 OU index > taille(tableau) ALORS
ERREUR "Index hors limites"
FIN SI

nouveauTableau ← nouveau tableau de taille taille(tableau) + 1

POUR i allant de 0 à index - 1 FAIRE
nouveauTableau[i] ← tableau[i]
FIN POUR

nouveauTableau[index] ← valeur

POUR i allant de index à taille(tableau) - 1 FAIRE
nouveauTableau[i + 1] ← tableau[i]
FIN POUR

RETOURNER nouveauTableau
FIN FONCTION`,
      steps: [
        "Valider que l'index est dans les limites",
        "Créer un nouveau tableau de taille +1",
        "Copier les éléments avant l'index d'insertion",
        "Insérer la nouvelle valeur à l'index",
        "Copier les éléments restants (décalés de 1)"
      ]
    },
    delete: {
      title: "Supprimer par index",
      description: "Retirer un élément à une position donnée",
      csharp: `public static int[] SupprimerParIndex(int[] tableau, int index)
{
if (tableau.Length == 0)
{
throw new InvalidOperationException("Tableau vide");
}
if (index < 0 || index >= tableau.Length)
{
throw new ArgumentOutOfRangeException(nameof(index));
}

int[] nouveauTableau = new int[tableau.Length - 1];

// Copier avant l'index
for (int i = 0; i < index; i++)
{
nouveauTableau[i] = tableau[i];
}

// Copier après l'index (décalage)
for (int i = index + 1; i < tableau.Length; i++)
{
nouveauTableau[i - 1] = tableau[i];
}

return nouveauTableau;
}`,
      pseudo: `FONCTION SupprimerParIndex(tableau: tableau d'entiers, index: entier)
RETOURNE tableau d'entiers
SI taille(tableau) = 0 ALORS
ERREUR "Impossible de supprimer dans un tableau vide"
FIN SI
SI index < 0 OU index ≥ taille(tableau) ALORS
ERREUR "Index hors limites"
FIN SI

nouveauTableau ← nouveau tableau de taille taille(tableau) - 1

POUR i allant de 0 à index - 1 FAIRE
nouveauTableau[i] ← tableau[i]
FIN POUR

POUR i allant de index + 1 à taille(tableau) - 1 FAIRE
nouveauTableau[i - 1] ← tableau[i]
FIN POUR

RETOURNER nouveauTableau
FIN FONCTION`,
      steps: [
        "Vérifier que le tableau n'est pas vide",
        "Valider l'index",
        "Créer un nouveau tableau de taille -1",
        "Copier les éléments avant l'index à supprimer",
        "Copier les éléments après l'index (décalés de -1)"
      ]
    },
    min: {
      title: "Trouver le minimum",
      description: "Rechercher la plus petite valeur dans le tableau",
      csharp: `public static int MinArray(int[] tableau)
{
if (tableau.Length == 0)
throw new InvalidOperationException("Tableau vide");

int min = tableau[0];
for (int i = 1; i < tableau.Length; i++)
{
if (tableau[i] < min)
min = tableau[i];
}
return min;
}`,
      pseudo: `FONCTION MinArray(tableau: tableau d'entiers)
RETOURNE entier
SI longueur(tableau) = 0 ALORS
ERREUR "Tableau vide"
FIN SI

min ← tableau[0]

POUR i allant de 1 à longueur(tableau) - 1 FAIRE
SI tableau[i] < min ALORS
min ← tableau[i]
FIN SI
FIN POUR

RETOURNER min
FIN FONCTION`,
      steps: [
        "Vérifier que le tableau n'est pas vide",
        "Initialiser min avec le premier élément",
        "Parcourir le reste du tableau",
        "Comparer chaque élément avec min",
        "Mettre à jour min si on trouve plus petit"
      ]
    },
    filter: {
      title: "Filtrer les nombres pairs",
      description: "Garder uniquement les nombres pairs du tableau",
      csharp: `public static int[] FiltrerPairs(int[] tableau)
{
// Compter les pairs
int compteur = 0;
for (int i = 0; i < tableau.Length; i++)
{
if (tableau[i] % 2 == 0)
compteur++;
}

// Créer tableau résultat
int[] resultat = new int[compteur];
int position = 0;

// Remplir avec les pairs
for (int i = 0; i < tableau.Length; i++)
{
if (tableau[i] % 2 == 0)
{
resultat[position] = tableau[i];
position++;
}
}
return resultat;
}`,
      pseudo: `FONCTION FiltrerPairs(tableau: tableau d'entiers)
RETOURNE tableau d'entiers
compteur ← 0
POUR i allant de 0 à longueur(tableau) - 1 FAIRE
SI tableau[i] MOD 2 = 0 ALORS
compteur ← compteur + 1
FIN SI
FIN POUR

resultat ← nouveau tableau de taille compteur
position ← 0

POUR i allant de 0 à longueur(tableau) - 1 FAIRE
SI tableau[i] MOD 2 = 0 ALORS
resultat[position] ← tableau[i]
position ← position + 1
FIN SI
FIN POUR

RETOURNER resultat
FIN FONCTION`,
      steps: [
        "Premier parcours: compter les nombres pairs",
        "Créer un tableau de la bonne taille",
        "Deuxième parcours: copier uniquement les pairs",
        "Retourner le tableau filtré"
      ]
    }
  };

  const currentOp = operations[selectedOperation];

  const simulateOperation = () => {
    if (selectedOperation === 'display') {
      visualArray.forEach((_, index) => {
        setTimeout(() => setHighlightIndex(index), index * 500);
      });
      setTimeout(() => setHighlightIndex(null), visualArray.length * 500);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🎓 Apprendre les Tableaux
            </h1>
            <p className="text-gray-600 text-lg">
              Comprendre le pseudocode et le C# de manière interactive
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Menu des opérations */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Opérations
                </h2>
                <div className="space-y-2">
                  {Object.entries(operations).map(([key, op]) => (
                      <button
                          key={key}
                          onClick={() => setSelectedOperation(key)}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                              selectedOperation === key
                                  ? 'bg-indigo-600 text-white shadow-md'
                                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        <div className="font-semibold text-sm">{op.title}</div>
                      </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="lg:col-span-3 space-y-6">
              {/* En-tête de l'opération */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentOp.title}
                </h2>
                <p className="text-gray-600">{currentOp.description}</p>
              </div>

              {/* Onglets */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                  <button
                      onClick={() => setActiveTab('theory')}
                      className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                          activeTab === 'theory'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    📚 Théorie
                  </button>
                  <button
                      onClick={() => setActiveTab('code')}
                      className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                          activeTab === 'code'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    💻 Code
                  </button>
                  <button
                      onClick={() => setActiveTab('visual')}
                      className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                          activeTab === 'visual'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    🎬 Visualisation
                  </button>
                </div>

                <div className="p-6">
                  {/* Onglet Théorie */}
                  {activeTab === 'theory' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          Étapes de l'algorithme
                        </h3>
                        <div className="space-y-3">
                          {currentOp.steps.map((step, index) => (
                              <div
                                  key={index}
                                  className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg"
                              >
                                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                                  {index + 1}
                                </div>
                                <p className="text-gray-700 pt-1">{step}</p>
                              </div>
                          ))}
                        </div>
                      </div>
                  )}

                  {/* Onglet Code */}
                  {activeTab === 'code' && (
                      <div className="space-y-4">
                        {/* Toggles */}
                        <div className="flex gap-4 mb-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showPseudo}
                                onChange={(e) => setShowPseudo(e.target.checked)}
                                className="w-5 h-5 text-indigo-600"
                            />
                            <span className="font-semibold text-gray-700">Pseudocode</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showCode}
                                onChange={(e) => setShowCode(e.target.checked)}
                                className="w-5 h-5 text-indigo-600"
                            />
                            <span className="font-semibold text-gray-700">C#</span>
                          </label>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {/* Pseudocode */}
                          {showPseudo && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <BookOpen className="w-5 h-5 text-green-600" />
                                  <h4 className="font-bold text-gray-800">Pseudocode</h4>
                                </div>
                                <pre className="bg-green-50 border-2 border-green-200 rounded-lg p-4 overflow-x-auto text-sm">
                            <code className="text-green-900">{currentOp.pseudo}</code>
                          </pre>
                              </div>
                          )}

                          {/* C# Code */}
                          {showCode && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <Code className="w-5 h-5 text-blue-600" />
                                  <h4 className="font-bold text-gray-800">Code C#</h4>
                                </div>
                                <pre className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 overflow-x-auto text-sm">
                            <code className="text-blue-900">{currentOp.csharp}</code>
                          </pre>
                              </div>
                          )}
                        </div>
                      </div>
                  )}

                  {/* Onglet Visualisation */}
                  {activeTab === 'visual' && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Tableau actuel
                          </h3>
                          <div className="flex justify-center gap-2 mb-6">
                            {visualArray.map((value, index) => (
                                <div
                                    key={index}
                                    className={`w-16 h-16 flex items-center justify-center text-xl font-bold rounded-lg transition-all ${
                                        highlightIndex === index
                                            ? 'bg-yellow-400 text-gray-900 scale-110 shadow-lg'
                                            : 'bg-indigo-100 text-indigo-900'
                                    }`}
                                >
                                  {value}
                                </div>
                            ))}
                          </div>
                          <button
                              onClick={simulateOperation}
                              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
                          >
                            <Play className="w-5 h-5" />
                            Simuler l'opération
                          </button>
                        </div>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ArrayLearningPlatform;