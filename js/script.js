document.addEventListener('DOMContentLoaded', () => {
  console.log("Je suis la console !");
  
  function quizAlert() {
    alert("Vous êtes sur le point de commencer le quiz !");
    quizConfirm();
  }

  const scores = { Shelly: 0, Colt: 0, Nita: 0, Dynamike: 0, Bull: 0, Brock: 0, Bo: 0, Jessie: 0 };

  const mapping = {
    q1: { midrange: ['Shelly','Colt','Brock'], long: ['Colt','Brock','Bo'], close: ['Bull','Nita'], explosion: ['Dynamike'] },
    q2: { direct: ['Shelly','Colt','Bull'], zone: ['Dynamike','Nita','Bo','Brock'] },
    q3: { team: ['Nita','Bo'], solo: ['Colt','Bull','Brock'] },
    q4: { high: ['Bull','Colt'], low: ['Shelly','Nita','Dynamike','Brock','Bo'] },
    q5: { burst: ['Shelly','Bull'], contrôle: ['Dynamike','Nita','Bo'], projectiles: ['Colt','Brock'] },
    q6: { '16': ['Shelly','Colt'], '15': ['Nita','Bo'], '3': ['Bull'], '9': ['Jessie'], '11': ['Dynamike'], '7': ['Brock'] }
  };

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', calculateResult);
  }

  function calculateResult() {
    Object.keys(scores).forEach(b => scores[b] = 0);
    const form = document.getElementById('quizForm');

    for (let q of Object.keys(mapping)) {
      const choice = form.elements[q]?.value;
      if (!choice) {
        alert("Merci de répondre à toutes les questions !");
        return;
      }
      mapping[q][choice].forEach(b => scores[b]++);
    }

    const best = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    document.getElementById('result').innerHTML =
      `<p>Votre brawler idéal est <strong>${best}</strong> !</p>`;
  }

  function displayResult(brawler) {
  const link = `./${brawler.toLowerCase()}.html`;
  const img = `../img/${brawler.toLowerCase()}.jpg`;

  document.getElementById('result').innerHTML = `
    <p>Votre brawler idéal est <strong>${brawler}</strong> !</p>
    <a href="${link}">
      <img src="${img}" alt="${brawler}" width="100" height="100">
    </a>
  `;
}

// === Modifier calculateResult pour utiliser displayResult ===
function calculateResult() {
  Object.keys(scores).forEach(b => scores[b] = 0);
  const form = document.getElementById('quizForm');

  for (let q of Object.keys(mapping)) {
    const choice = form.elements[q]?.value;
    if (!choice) {
      alert("Merci de répondre à toutes les questions !");
      return;
    }
    mapping[q][choice].forEach(b => scores[b]++);
  }

  const best = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  displayResult(best);
}

// === Ajouter comportement pour le bouton reset ===
const resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    const form = document.getElementById('quizForm');
    form.reset(); // réinitialise toutes les cases
    document.getElementById('result').innerHTML = ''; // vide le résultat

    // scroll en haut du quiz
    form.scrollIntoView({ behavior: 'smooth' });
  });
}


  // Pour faire tourner les prix star
  const starLeft  = document.getElementById('star-left');
  const starRight = document.getElementById('star-right');

  function attachRotation(starr) {
    if (!starr) return;
    starr.addEventListener('mouseenter', () => {
      starr.classList.add('rotating');
    });
    starr.addEventListener('mouseleave', () => {
      starr.classList.remove('rotating');
    });
  }

  attachRotation(starLeft);
  attachRotation(starRight);
});

// Flèche "Retour en haut"
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Affiche ou cache la flèche selon le scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Quand on clique sur la flèche
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});