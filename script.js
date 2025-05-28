const prizes = [
  "BATATA CLINKLE P",
  "COCA 200 ML",
  "CHEDDAR EXTRA",
  "+ 1 SMASH",
  "10% OFF",
  "CUPOM R$5,00 NO PRÓX. PEDIDO",
  "ENTREGA 5,99",
  "NÃO FOI DESSA VEZ"
];

const colors = ["#f1c40f", "#e67e22", "#1abc9c", "#9b59b6", "#e74c3c", "#3498db", "#2ecc71", "#34495e"];
const wheel = document.getElementById("wheel");

// Gerar segmentos da roleta
for (let i = 0; i < prizes.length; i++) {
  const segment = document.createElement("div");
  segment.className = "segment";
  segment.style.transform = `rotate(${(360 / prizes.length) * i}deg)`;
  segment.style.background = colors[i];
  segment.innerText = prizes[i];
  wheel.appendChild(segment);
}

let spinning = false;
let hasSpun = false;

document.getElementById("spin").addEventListener("click", () => {
  if (spinning || hasSpun) return;
  spinning = true;
  hasSpun = true;

  const rotation = 360 * 5 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const finalRotation = rotation % 360;
    const index = Math.floor(prizes.length - (finalRotation / 360) * prizes.length) % prizes.length;
    document.getElementById("result").innerText = `🎉 ${prizes[index]}!`;
    spinning = false;
  }, 5200);
});

// Formulário e envio para Google Forms
const form = document.getElementById("nameForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("clientName").value;

  // Substitua isso com o campo de entrada certo do seu Forms
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdRuYKrAOUmN7zphgL0MsE2dtAxCUQwWVVUFdTKuFEMSp5jog/formResponse";
  const formData = new FormData();
  formData.append("entry.439319026", name); // ID do campo de nome no Forms

  fetch(formUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  document.getElementById("form-container").style.display = "none";
  document.getElementById("wheel-container").style.display = "block";
});
