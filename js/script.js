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

document.getElementById('submitBtn').addEventListener('click', calculateResult);

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


// Pour faire tourner les prix star

const starLeft  = document.getElementById('star-left');
const starRight = document.getElementById('star-right');

// fonction générique pour démarrer/arrêter la rotation
function attachRotation(starr) {
  starr.addEventListener('mouseenter', () => {
    starr.classList.add('rotating');
  });
  starr.addEventListener('mouseleave', () => {
    // on retire la classe pour pouvoir relancer l'animation au prochain survol
    starr.classList.remove('rotating');
  });
}

// on applique aux deux étoiles
attachRotation(starLeft);
attachRotation(starRight);
