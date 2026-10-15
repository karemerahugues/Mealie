  const form = document.getElementById('f');
const err = document.getElementById('err');
const result = document.getElementById('result');

const PLANS = {
  build: {
    label: "Building up and improve your diet",
    note: "The focus is steady, calorie-dense nutrition without relying on empty sugar or fried food.",
    meals: {
      breakfast: ["Whole grain toast or oats", "Eggs, yogurt, or a protein of choice", "Nut butter, avocado, or a handful of nuts", "Fruit or a smoothie"],
      lunch: ["A starchy base — rice, potatoes, or whole grain bread", "A generous protein portion (fish, meat, legumes, tofu)", "Cooked vegetables with olive oil", "A source of healthy fat"],
      dinner: ["Protein-rich main course", "Complex carbohydrates (quinoa, sweet potato, pasta)", "Vegetables, and a small side of cheese or nuts if wanted"]
    }
  },
  maintain: {
    label: "Steady and balanced, try staying in that form.",
    note: "The goal is variety and consistency rather than restriction — roughly a third protein, a third vegetables, a third whole grains on each plate.",
    meals: {
      breakfast: ["Whole grains or Bread", "A protein source (eggs, yogurt,milk or beans)", "A piece of fruit like orange or aple"],
      lunch: ["Lean protein (chicken, fish, legumes, or tofu)", "A large portion of vegetables or salad", "A modest serving of whole grains"],
      dinner: ["Lighter protein portion", "Plenty of vegetables", "A small serving of whole grains or legumes"]
    }
  },
  trim: {
    label: "Do some sports and try eating lightly, you are overweight",
    note: "The focus is on volume from vegetables and lean protein, with refined carbs and fried foods kept occasional rather than daily.",
    meals: {
      breakfast: ["High-protein option — eggs, Greek yogurt, or cottage cheese", "A small portion of whole grains", "Fresh fruit over juice"],
      lunch: ["Lean protein (grilled fish, chicken breast, legumes)", "A large salad or non-starchy vegetables", "A light whole-grain side, if any"],
      dinner: ["Vegetable-forward main with lean protein", "Minimal refined carbs", "Herbal tea or water instead of sugary drinks"]
    }
  }
  
};

function bmiCategory(bmi){
  if (bmi < 18.5) return 'build';
  if (bmi < 25) return 'maintain';
  return 'trim';
}

function ageNote(age){
  if (age < 13) return "For a child this age, portions should be smaller and guided by an appetite and a pediatrician rather than adult targets.";
  if (age < 19) return "Teenage years call for extra calcium and protein to support growth — dairy, legumes, and lean meat are worth prioritizing.";
  if (age >= 60) return "At this age, protein and calcium matter more per bite — favor nutrient-dense foods over large volumes.";
  return "";
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  err.textContent = '';

  const name = document.getElementById('name').value.trim();
  const age = parseFloat(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const heightCm = parseFloat(document.getElementById('height').value);
   

  if (!name || !age || !weight || !heightCm || age <= 0 || weight <= 0 || heightCm <= 0){
    err.textContent = 'Please fill in every field with a positive value.';
    return;
  }
  if (age > 120 || weight > 400 || heightCm > 260 || heightCm < 30){
    err.textContent = 'That value looks out of range — please check it.';
    return;
      }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const cat = bmiCategory(bmi);
  const plan = PLANS[cat];
  const extraNote = ageNote(age);

  let html = `
    <p class="greet">For ${escapeHtml(name)}</p>
    <p class="stat-line">BMI ${bmi.toFixed(1)} · goal: ${plan.label}</p>
  `;

  for (const [mealName, items] of Object.entries(plan.meals)){
    const title = mealName.charAt(0).toUpperCase() + mealName.slice(1);
    html += `
      <div class="meal">
        <h2>${title}</h2>
        <ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
      </div>
    `;
  }

  html += `<p class="note">${plan.note}${extraNote ? ' ' + extraNote : ''} This is general guidance, not medical advice — check with a doctor or dietitian for anything specific to a health condition.</p>`;

  result.innerHTML = html;
  result.classList.add('show');
  result.scrollIntoView({behavior:'smooth', block:'start'});
});

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}