// Variables globales
let currentSlideIndex = 0;
let currentLanguage = localStorage.getItem('language') || 'fr';
let userData = {
    age: null,
    gender: null,
    height: null,
    weight: null,
    activity: null
};

// Système d'internationalisation
const translations = {
    fr: {
        // Titre et navigation
        title: "Calculateur Santé - Calories & Pas",
        headerTitle: "Calculateur Santé",
        headerSubtitle: "Découvrez vos besoins caloriques et vos objectifs de pas quotidiens",

        // Questions
        question1: "Quel est votre âge ?",
        question2: "Quel est votre sexe ?",
        question3: "Quelle est votre taille ? (en cm)",
        question4: "Quel est votre poids ? (en kg)",
        question5: "Quel est votre niveau d'activité physique ?",

        // Options
        agePlaceholder: "Choisissez votre âge",
        heightPlaceholder: "Choisissez votre taille",
        weightPlaceholder: "Choisissez votre poids",
        male: "Homme",
        female: "Femme",

        // Niveaux d'activité
        sedentary: "Sédentaire",
        sedentaryDesc: "Peu ou pas d'exercice",
        light: "Léger",
        lightDesc: "Exercice 1-3 jours/semaine",
        moderate: "Modéré",
        moderateDesc: "Exercice 3-5 jours/semaine",
        active: "Actif",
        activeDesc: "Exercice 6-7 jours/semaine",
        veryActive: "Très actif",
        veryActiveDesc: "Exercice intense quotidien",

        // Boutons
        next: "Suivant",
        previous: "Précédent",
        calculate: "Calculer mes besoins",
        restart: "Refaire le questionnaire",

        // Résultats
        resultsTitle: "Vos résultats personnalisés",
        caloriesTitle: "Besoins caloriques quotidiens",
        stepsTitle: "Objectif de pas quotidiens",
        recommendationsTitle: "Recommandations",
        caloriesUnit: "kcal/jour",
        stepsUnit: "pas/jour",

        // Descriptions d'activité
        activitySedentary: "sédentaire",
        activityLight: "légèrement actif",
        activityModerate: "modérément actif",
        activityActive: "actif",
        activityVeryActive: "très actif",

        // Recommandations
        recSedentary1: "Commencez par marcher 30 minutes par jour pour améliorer votre santé cardiovasculaire",
        recSedentary2: "Essayez d'atteindre 7 000-8 000 pas par jour comme objectif réaliste",
        recLight1: "Continuez vos activités physiques régulières, c'est excellent !",
        recLight2: "Augmentez progressivement votre nombre de pas quotidiens",
        recActive1: "Votre niveau d'activité est excellent, continuez ainsi !",
        recActive2: "Vous pourriez envisager des activités plus intenses pour optimiser vos performances",
        recYoung: "À votre âge, privilégiez les protéines et les légumes pour maintenir votre masse musculaire",
        recMiddle: "Surveillez votre apport en calcium et vitamine D pour vos os",
        recSenior: "Pensez aux aliments riches en fibres et antioxydants pour votre santé globale",
        recSenior2: "Pour les seniors, l'hydratation et les protéines sont particulièrement importantes",

        // Messages d'erreur
        errorAge: "Veuillez entrer un âge valide (10-99 ans)",
        errorGender: "Veuillez sélectionner votre sexe",
        errorHeight: "Veuillez entrer une taille valide (100-200 cm)",
        errorWeight: "Veuillez entrer un poids valide (30-120 kg)",
        errorActivity: "Veuillez sélectionner votre niveau d'activité"
    },
    en: {
        // Title and navigation
        title: "Health Calculator - Calories & Steps",
        headerTitle: "Health Calculator",
        headerSubtitle: "Discover your daily calorie needs and step goals",

        // Questions
        question1: "What is your age?",
        question2: "What is your gender?",
        question3: "What is your height? (in cm)",
        question4: "What is your weight? (in kg)",
        question5: "What is your physical activity level?",

        // Options
        agePlaceholder: "Choose your age",
        heightPlaceholder: "Choose your height",
        weightPlaceholder: "Choose your weight",
        male: "Male",
        female: "Female",

        // Activity levels
        sedentary: "Sedentary",
        sedentaryDesc: "Little or no exercise",
        light: "Light",
        lightDesc: "Exercise 1-3 days/week",
        moderate: "Moderate",
        moderateDesc: "Exercise 3-5 days/week",
        active: "Active",
        activeDesc: "Exercise 6-7 days/week",
        veryActive: "Very active",
        veryActiveDesc: "Intense daily exercise",

        // Buttons
        next: "Next",
        previous: "Previous",
        calculate: "Calculate my needs",
        restart: "Retake questionnaire",

        // Results
        resultsTitle: "Your personalized results",
        caloriesTitle: "Daily calorie needs",
        stepsTitle: "Daily step goal",
        recommendationsTitle: "Recommendations",
        caloriesUnit: "kcal/day",
        stepsUnit: "steps/day",

        // Activity descriptions
        activitySedentary: "sedentary",
        activityLight: "lightly active",
        activityModerate: "moderately active",
        activityActive: "active",
        activityVeryActive: "very active",

        // Recommendations
        recSedentary1: "Start by walking 30 minutes a day to improve your cardiovascular health",
        recSedentary2: "Try to reach 7,000-8,000 steps per day as a realistic goal",
        recLight1: "Continue your regular physical activities, it's excellent!",
        recLight2: "Gradually increase your daily step count",
        recActive1: "Your activity level is excellent, keep it up!",
        recActive2: "You could consider more intense activities to optimize your performance",
        recYoung: "At your age, prioritize proteins and vegetables to maintain muscle mass",
        recMiddle: "Monitor your calcium and vitamin D intake for your bones",
        recSenior: "Think about foods rich in fiber and antioxidants for your overall health",
        recSenior2: "For seniors, hydration and proteins are particularly important",

        // Error messages
        errorAge: "Please enter a valid age (10-99 years)",
        errorGender: "Please select your gender",
        errorHeight: "Please enter a valid height (100-200 cm)",
        errorWeight: "Please enter a valid weight (30-120 kg)",
        errorActivity: "Please select your activity level"
    }
};

// Fonctions d'internationalisation
function getText(key) {
    return translations[currentLanguage][key] || key;
}

function updateLanguage() {
    // Mettre à jour le titre de la page
    document.title = getText('title');

    // Mettre à jour l'attribut lang de la page
    document.documentElement.lang = currentLanguage;

    // Mettre à jour le header
    document.querySelector('h1').textContent = getText('headerTitle');
    document.querySelector('p').textContent = getText('headerSubtitle');

    // Mettre à jour le bouton de langue avec la langue actuelle
    const currentLangSpan = document.getElementById('current-lang');
    if (currentLangSpan) {
        currentLangSpan.textContent = currentLanguage.toUpperCase();
    }

    // Mettre à jour la sélection dans la liste déroulante
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.lang === currentLanguage) {
            option.classList.add('selected');
        }
    });

    // Mettre à jour les questions
    document.querySelector('#question-1 h2').textContent = getText('question1');
    document.querySelector('#question-2 h2').textContent = getText('question2');
    document.querySelector('#question-3 h2').textContent = getText('question3');
    document.querySelector('#question-4 h2').textContent = getText('question4');
    document.querySelector('#question-5 h2').textContent = getText('question5');

    // Mettre à jour les placeholders des selects
    document.querySelector('#age option:first-child').textContent = getText('agePlaceholder');
    document.querySelector('#taille option:first-child').textContent = getText('heightPlaceholder');
    document.querySelector('#poids option:first-child').textContent = getText('weightPlaceholder');

    // Mettre à jour les options de genre
    const genderButtons = document.querySelectorAll('#question-2 .option-btn');
    genderButtons[0].textContent = getText('male');
    genderButtons[1].textContent = getText('female');

    // Mettre à jour les niveaux d'activité
    const activityButtons = document.querySelectorAll('#question-5 .option-btn');
    activityButtons[0].innerHTML = `${getText('sedentary')}<br><small>${getText('sedentaryDesc')}</small>`;
    activityButtons[1].innerHTML = `${getText('light')}<br><small>${getText('lightDesc')}</small>`;
    activityButtons[2].innerHTML = `${getText('moderate')}<br><small>${getText('moderateDesc')}</small>`;
    activityButtons[3].innerHTML = `${getText('active')}<br><small>${getText('activeDesc')}</small>`;
    activityButtons[4].innerHTML = `${getText('veryActive')}<br><small>${getText('veryActiveDesc')}</small>`;

    // Mettre à jour les boutons
    document.querySelectorAll('.btn-next').forEach(btn => {
        if (btn.textContent !== getText('next')) {
            btn.textContent = getText('next');
        }
    });
    document.querySelectorAll('.btn-prev').forEach(btn => btn.textContent = getText('previous'));
    document.querySelector('.btn-calculate').textContent = getText('calculate');
    const restartBtn = document.querySelector('.btn-restart');
    if (restartBtn) {
        restartBtn.textContent = getText('restart');
    }

    // Mettre à jour les résultats (si affichés)
    const resultsTitle = document.querySelector('#results h2');
    if (resultsTitle) {
        resultsTitle.textContent = getText('resultsTitle');
    }

    const caloriesTitle = document.querySelector('.result-card h3:first-child');
    if (caloriesTitle) {
        caloriesTitle.textContent = getText('caloriesTitle');
    }

    const stepsTitle = document.querySelector('.result-card h3:last-child');
    if (stepsTitle) {
        stepsTitle.textContent = getText('stepsTitle');
    }

    const recommendationsTitle = document.querySelector('.recommendations h3');
    if (recommendationsTitle) {
        recommendationsTitle.textContent = getText('recommendationsTitle');
    }

    // Mettre à jour les unités
    const caloriesUnit = document.querySelector('.calorie-unit');
    if (caloriesUnit) {
        caloriesUnit.textContent = getText('caloriesUnit');
    }

    const stepsUnit = document.querySelector('.steps-unit');
    if (stepsUnit) {
        stepsUnit.textContent = getText('stepsUnit');
    }
}

// Gestion du dropdown de langue
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-list');
    const button = document.getElementById('language-btn');

    if (dropdown.classList.contains('show')) {
        closeLanguageDropdown();
    } else {
        openLanguageDropdown();
    }
}

function openLanguageDropdown() {
    const dropdown = document.getElementById('language-list');
    const button = document.getElementById('language-btn');

    dropdown.classList.add('show');
    button.classList.add('active');
}

function closeLanguageDropdown() {
    const dropdown = document.getElementById('language-list');
    const button = document.getElementById('language-btn');

    dropdown.classList.remove('show');
    button.classList.remove('active');
}

function selectLanguage(lang) {
    if (lang === currentLanguage) {
        closeLanguageDropdown();
        return;
    }

    currentLanguage = lang;
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
    closeLanguageDropdown();
}

// Carrousel d'arrière-plan
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
    currentSlideIndex = index;
}

function nextSlide() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * slides.length);
    } while (newIndex === currentSlideIndex && slides.length > 1);

    showSlide(newIndex);
}

// Démarrage automatique du carrousel
setInterval(nextSlide, 6000);
showSlide(0);

// Questionnaire
function nextQuestion(currentQuestion) {
    const questions = document.querySelectorAll('.question');
    const currentQ = document.getElementById(`question-${currentQuestion}`);
    const nextQ = document.getElementById(`question-${currentQuestion + 1}`);

    // Validation de la question actuelle
    if (!validateQuestion(currentQuestion)) {
        return;
    }

    // Transition
    currentQ.classList.remove('active');
    nextQ.classList.add('active');
}

function prevQuestion(currentQuestion) {
    const questions = document.querySelectorAll('.question');
    const currentQ = document.getElementById(`question-${currentQuestion}`);
    const prevQ = document.getElementById(`question-${currentQuestion - 1}`);

    currentQ.classList.remove('active');
    prevQ.classList.add('active');
}

function validateQuestion(questionNumber) {
    switch(questionNumber) {
        case 1:
            const age = document.getElementById('age').value;
            if (!age || age < 10 || age > 99) {
                alert(getText('errorAge'));
                return false;
            }
            userData.age = parseInt(age);
            break;
        case 2:
            if (!userData.gender) {
                alert(getText('errorGender'));
                return false;
            }
            break;
        case 3:
            const height = document.getElementById('taille').value;
            if (!height || height < 100 || height > 200) {
                alert(getText('errorHeight'));
                return false;
            }
            userData.height = parseInt(height);
            break;
        case 4:
            const weight = document.getElementById('poids').value;
            if (!weight || weight < 30 || weight > 120) {
                alert(getText('errorWeight'));
                return false;
            }
            userData.weight = parseFloat(weight);
            break;
        case 5:
            if (!userData.activity) {
                alert(getText('errorActivity'));
                return false;
            }
            break;
    }
    return true;
}

function selectGender(gender) {
    userData.gender = gender;

    // Mettre à jour l'apparence des boutons
    const buttons = document.querySelectorAll('#question-2 .option-btn');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });

    // Marquer le bouton correspondant comme sélectionné
    if (gender === 'homme') {
        document.querySelector('#question-2 .option-btn:first-child').classList.add('selected');
    } else if (gender === 'femme') {
        document.querySelector('#question-2 .option-btn:last-child').classList.add('selected');
    }

    // Activer le bouton "Suivant" si un sexe est sélectionné
    const nextBtn = document.querySelector('#question-2 .btn-next');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('disabled');
    }
}

function selectActivity(activity) {
    userData.activity = activity;

    // Mettre à jour l'apparence des boutons
    const buttons = document.querySelectorAll('#question-5 .option-btn');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });

    // Utiliser event.target si disponible, sinon trouver par activité
    if (event && event.target && event.target.classList.contains('option-btn')) {
        event.target.classList.add('selected');
    } else {
        // Fallback : trouver le bouton par son activité
        const activityMapping = {
            'sedentaire': 0,
            'leger': 1,
            'modere': 2,
            'actif': 3,
            'tres-actif': 4
        };

        const buttonIndex = activityMapping[activity];
        if (buttonIndex !== undefined && buttons[buttonIndex]) {
            buttons[buttonIndex].classList.add('selected');
        }
    }
}

// Calculs
function calculateBMR(age, gender, height, weight) {
    // Formule de Mifflin-St Jeor
    let bmr;
    if (gender === 'homme') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return Math.round(bmr);
}

function calculateTDEE(bmr, activity) {
    const activityMultipliers = {
        'sedentaire': 1.2,
        'leger': 1.375,
        'modere': 1.55,
        'actif': 1.725,
        'tres-actif': 1.9
    };

    return Math.round(bmr * activityMultipliers[activity]);
}

function calculateSteps(activity, age) {
    // Recommandations basées sur l'âge et l'activité
    let baseSteps = 8000; // Minimum recommandé

    if (activity === 'sedentaire') {
        baseSteps = age < 65 ? 6000 : 4000;
    } else if (activity === 'leger') {
        baseSteps = age < 65 ? 8000 : 6000;
    } else if (activity === 'modere') {
        baseSteps = age < 65 ? 10000 : 8000;
    } else if (activity === 'actif') {
        baseSteps = age < 65 ? 12000 : 10000;
    } else if (activity === 'tres-actif') {
        baseSteps = age < 65 ? 15000 : 12000;
    }

    return baseSteps;
}

function generateRecommendations(calories, steps, activity, age) {
    const recommendations = [];

    if (activity === 'sedentaire') {
        recommendations.push(getText('recSedentary1'));
        recommendations.push(getText('recSedentary2'));
    } else if (activity === 'leger') {
        recommendations.push(getText('recLight1'));
        recommendations.push(getText('recLight2'));
    } else {
        recommendations.push(getText('recActive1'));
        recommendations.push(getText('recActive2'));
    }

    if (age < 30) {
        recommendations.push(getText('recYoung'));
    } else if (age < 50) {
        recommendations.push(getText('recMiddle'));
    } else {
        recommendations.push(getText('recSenior'));

        if (age > 65) {
            recommendations.push(getText('recSenior2'));
        }
    }

    recommendations.push(currentLanguage === 'fr'
        ? `Votre objectif calorique quotidien est de ${calories} kcal pour maintenir votre poids`
        : `Your daily calorie goal is ${calories} kcal to maintain your weight`);
    recommendations.push(currentLanguage === 'fr'
        ? `Essayez d'atteindre ${steps} pas par jour pour rester en forme`
        : `Try to reach ${steps} steps per day to stay fit`);

    return recommendations;
}

function calculateResults() {
    // Validation finale
    if (!validateQuestion(5)) {
        return;
    }

    // Calculs
    const bmr = calculateBMR(userData.age, userData.gender, userData.height, userData.weight);
    const tdee = calculateTDEE(bmr, userData.activity);
    const steps = calculateSteps(userData.activity, userData.age);

    // Affichage des résultats
    document.getElementById('bmr-result').textContent = tdee;
    document.getElementById('steps-result').textContent = steps.toLocaleString();

    // Descriptions
    const activityLabels = {
        'sedentaire': getText('activitySedentary'),
        'leger': getText('activityLight'),
        'modere': getText('activityModerate'),
        'actif': getText('activityActive'),
        'tres-actif': getText('activityVeryActive')
    };

    document.getElementById('bmr-description').textContent =
        currentLanguage === 'fr'
            ? `Vos besoins caloriques quotidiens pour maintenir votre poids avec un niveau d'activité ${activityLabels[userData.activity]}.`
            : `Your daily calorie needs to maintain your weight with a ${activityLabels[userData.activity]} activity level.`;

    document.getElementById('steps-description').textContent =
        currentLanguage === 'fr'
            ? `Objectif de pas quotidien recommandé pour votre âge (${userData.age} ans) et votre niveau d'activité.`
            : `Recommended daily step goal for your age (${userData.age} years) and activity level.`;

    // Recommandations
    const recommendations = generateRecommendations(tdee, steps, userData.activity, userData.age);
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = '';

    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });

    // Afficher les résultats
    document.getElementById('questionnaire').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}

function restartCalculator() {
    // Reset des données
    userData = {
        age: null,
        gender: null,
        height: null,
        weight: null,
        activity: null
    };

    // Reset du questionnaire
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById('question-1').classList.add('active');

    // Reset des inputs
    document.getElementById('age').value = '';
    document.getElementById('taille').value = '';
    document.getElementById('poids').value = '';

    // Reset des boutons sélectionnés
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Afficher le questionnaire
    document.getElementById('results').style.display = 'none';
    document.getElementById('questionnaire').style.display = 'block';
}

// Configuration initiale des boutons
document.addEventListener('DOMContentLoaded', function() {
    // Appliquer la langue au chargement
    updateLanguage();

    // Fermer le dropdown de langue quand on clique à l'extérieur
    document.addEventListener('click', function(event) {
        const dropdown = document.querySelector('.language-dropdown');
        const languageList = document.getElementById('language-list');

        if (!dropdown.contains(event.target)) {
            closeLanguageDropdown();
        }
    });
    // Désactiver le bouton "Suivant" de la première question au départ
    const firstNextBtn = document.querySelector('#question-1 .btn-next');
    if (firstNextBtn) {
        firstNextBtn.disabled = true;
        firstNextBtn.classList.add('disabled');
    }

    // Désactiver le bouton "Suivant" de la question sexe au départ
    const genderNextBtn = document.querySelector('#question-2 .btn-next');
    if (genderNextBtn) {
        genderNextBtn.disabled = true;
        genderNextBtn.classList.add('disabled');
    }

    // Configuration pour l'âge (select)
    const ageSelect = document.getElementById('age');
    if (ageSelect) {
        // Faire défiler automatiquement vers le milieu de la liste
        ageSelect.addEventListener('focus', function() {
            setTimeout(() => {
                const middleIndex = Math.floor((this.options.length - 1) / 2) + 1; // +1 pour éviter l'option disabled
                this.selectedIndex = middleIndex;
                // Activer automatiquement le bouton après sélection
                const nextBtn = document.querySelector('#question-1 .btn-next');
                if (nextBtn) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('disabled');
                }
            }, 100);
        });

        // Activer/désactiver le bouton selon la sélection
        ageSelect.addEventListener('change', function() {
            const nextBtn = document.querySelector('#question-1 .btn-next');
            if (nextBtn) {
                if (this.value) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('disabled');
                } else {
                    nextBtn.disabled = true;
                    nextBtn.classList.add('disabled');
                }
            }
        });
    }

    // Configuration pour la taille (select)
    const heightSelect = document.getElementById('taille');
    if (heightSelect) {
        // Faire défiler automatiquement vers le milieu de la liste
        heightSelect.addEventListener('focus', function() {
            setTimeout(() => {
                const middleIndex = Math.floor((this.options.length - 1) / 2) + 1;
                this.selectedIndex = middleIndex;
                // Activer automatiquement le bouton après sélection
                const nextBtn = document.querySelector('#question-3 .btn-next');
                if (nextBtn) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('disabled');
                }
            }, 100);
        });

        // Activer/désactiver le bouton selon la sélection
        heightSelect.addEventListener('change', function() {
            const nextBtn = document.querySelector('#question-3 .btn-next');
            if (nextBtn) {
                if (this.value) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('disabled');
                } else {
                    nextBtn.disabled = true;
                    nextBtn.classList.add('disabled');
                }
            }
        });
    }

    // Configuration pour le poids (select)
    const weightSelect = document.getElementById('poids');
    if (weightSelect) {
        // Faire défiler automatiquement vers le milieu de la liste
        weightSelect.addEventListener('focus', function() {
            setTimeout(() => {
                const middleIndex = Math.floor((this.options.length - 1) / 2) + 1;
                this.selectedIndex = middleIndex;
                // Activer automatiquement le bouton après sélection
                const nextBtn = document.querySelector('#question-4 .btn-next');
                if (nextBtn) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('disabled');
                }
            }, 100);
        });

        // Activer/désactiver le bouton selon la sélection
        weightSelect.addEventListener('change', function() {
            const nextBtn = document.querySelector('#question-4 .btn-next');
            if (nextBtn) {
                if (this.value) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('disabled');
                } else {
                    nextBtn.disabled = true;
                    nextBtn.classList.add('disabled');
                }
            }
        });
    }

    // Ajouter la touche Entrée pour les panneaux de sélection (sexe et activité)
    const question2 = document.getElementById('question-2');
    if (question2) {
        question2.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && userData.gender) {
                e.preventDefault();
                nextQuestion(2);
            }
        });
    }

    const question5 = document.getElementById('question-5');
    if (question5) {
        question5.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && userData.activity) {
                e.preventDefault();
                calculateResults();
            }
        });
    }
});
