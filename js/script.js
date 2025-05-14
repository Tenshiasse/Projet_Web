console.log("Je suis la console !");
function quizAlert() {
    alert("Vous êtes sur le point de commencer le quiz !");
    quizConfirm();
  }
  
  function quizConfirm() {
    const infos = document.querySelectorAll('#informations input, #informations select, #informations textarea');
    const allFilled = Array.from(infos).every(el => el.value.trim() !== '');
    if (!allFilled) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
  
    const res = confirm("Êtes-vous sûr de vouloir continuer ?");
    if (!res) {
      alert("Vous allez être redirigé vers la page d'accueil !");
      window.location.href = "accueil.html";
      return;
    }
  
    alert("Le quiz va commencer dans 5 secondes !");
  
    infos.forEach(el => el.disabled = true);
    document.querySelector('.quiz-start').style.display = 'none';
  
    let timer = 5;
    const confirmation = document.createElement("p");
    confirmation.textContent = `${timer} secondes`;
    confirmation.style.cssText = `
      color: red; font-size: 1.5em; font-weight: bold;
      text-align: center; margin-top: 1em;
    `;
    document.getElementById("informations").appendChild(confirmation);
  
    const interval = setInterval(() => {
      timer--;
      confirmation.textContent = `${timer} secondes`;
      console.log(timer);
  
      if (timer === 0) {
        clearInterval(interval);
        confirmation.textContent = "C'est parti ! Bonne chance !";
        document.querySelectorAll(".quiz").forEach(el => el.style.display = "block");
      }
    }, 1000);
  }
  
console.log("Script quiz chargé avec succès !");

let essais = 0; 

function submitQuiz() {
  let score = 0;
  essais++;

  // Q1 
  const q1 = document.querySelector('input[name="q1"]:checked');
  if (q1 && q1.value === "Une pratique visant à réduire l'impact environnemental des technologies de l'information.") {
    score += 4;
  }

  // Q2 
  const q2checked = Array.from(document.querySelectorAll('input[name="q2"]:checked'));
  q2checked.forEach(cb => {
    if (cb.value === "Réduire la consommation d'énergie" ||
        cb.value === "Minimiser les déchets électroniques") {
      score += 3;
    } else {
      score -= 3;
    }
  });

  // Q3 
  const re = /\b(réduire|alléger|faciliter|optimiser|exploiter)\b/i;
  const q3text = document.querySelector('textarea[name="q3"]').value;
  if (re.test(q3text)) {
    score += 10;
  }

  // === début de la partie corrigée d’insertion ===
    // Récupère le tableau et son <tbody>, ou le crée s’il n’existe pas
    const table = document.getElementById('result');
    let tbody = table.querySelector('tbody');
    if (!tbody) {
      tbody = document.createElement('tbody');
      table.appendChild(tbody);
    }
  
    // Crée une nouvelle ligne et deux cellules
    const row = tbody.insertRow();
    const cellEssai = row.insertCell(0);
    const cellScore = row.insertCell(1);
  
    // Remplit les cellules
    cellEssai.textContent = essais;
    cellScore.textContent = score;
    // === fin de la partie corrigée d’insertion ===
  
    
    submitQuiz();
}

function resetQuiz() {
    document.getElementById('QuizId').reset(); 
  }
function submitQuiz() {
  
    resetQuiz();
  
    if (essais >= 3) {
      const btn = document.querySelector('button[onclick="submitQuiz()"]');
      btn.disabled = true;
      btn.textContent = "Limite atteinte";
    }
  }