// Sample alternate-market suggestions by HS code
const sampleAlternates = {
  "6109": [
    { country: "Vietnam", demand: "High", risk: "Open", status: "ok" },
    { country: "Mexico", demand: "High", risk: "Open", status: "ok" },
    { country: "UAE", demand: "Medium", risk: "Open", status: "ok" }
  ],
  "3004": [
    { country: "EU", demand: "High", risk: "Open", status: "ok" },
    { country: "Brazil", demand: "Medium", risk: "At-Risk", status: "warn" },
    { country: "South Africa", demand: "Medium", risk: "Open", status: "ok" }
  ],
  "8708": [
    { country: "Turkey", demand: "High", risk: "At-Risk", status: "warn" },
    { country: "Thailand", demand: "High", risk: "Open", status: "ok" },
    { country: "Poland", demand: "Medium", risk: "Open", status: "ok" }
  ],
  "default": [
    { country: "UAE", demand: "Medium", risk: "Open", status: "ok" },
    { country: "Vietnam", demand: "Medium", risk: "Open", status: "ok" },
    { country: "Mexico", demand: "Medium", risk: "Open", status: "ok" }
  ]
};

// Sample marketplace listings for the table
const listings = [
  { company: "Raj Apparel Pvt Ltd", product: "Cotton T-Shirts (HS 6109)", origin: "India", markets: "Vietnam, Mexico, UAE", lead: "18–25 days" },
  { company: "Sunrise Pharma Exports", product: "Generic Tablets (HS 3004)", origin: "India", markets: "EU, South Africa, Brazil", lead: "10–14 days" },
  { company: "ForgeTech Components", product: "Auto Parts (HS 8708)", origin: "India", markets: "Thailand, Turkey, Poland", lead: "20–30 days" }
];

function badge(status) {
  const map = { ok: "status ok", warn: "status warn", bad: "status bad" };
  return map[status] || "status";
}

function suggestAlternates() {
  const hs = (document.getElementById("hs").value || "").trim();
  const from = (document.getElementById("fromCountry").value || "").trim();
  const key = sampleAlternates[hs] ? hs : "default";
  const results = document.getElementById("altResults");
  results.innerHTML = "";

  sampleAlternates[key].forEach(a => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="small">From: ${from || "—"}</div>
      <h3 style="margin:6px 0 4px">${a.country}</h3>
      <div class="${badge(a.status)}">${a.risk}</div>
      <div class="small" style="margin-top:8px">Demand: ${a.demand}</div>
      <div style="height:8px"></div>
      <button class="btn secondary" onclick="alert('Buyer list coming next release')">See Buyers</button>
    `;
    results.appendChild(card);
  });
}

function populateMarket() {
  const tbody = document.getElementById("marketRows");
  if (!tbody) return;
  listings.forEach(x => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${x.company}</td>
      <td>${x.product}</td>
      <td>${x.origin}</td>
      <td>${x.markets}</td>
      <td>${x.lead}</td>
      <td><button class="btn secondary" onclick="alert('Contact flow in next release')">Contact</button></td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", populateMarket);
