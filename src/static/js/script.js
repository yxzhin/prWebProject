window.onload = () => {
  primeniTemu();
  prikaziPodatke();
};

function prikaziPodatke() {
  const raspored = document.getElementById("raspored");
  raspored.innerHTML = `
        <label>izaberite odeljenje:</label>
        <select id="odeljenjeSelect"></select>
        <div id="tabela"></div>
    `;
  popuniOdeljenja();

  const odeljenjeID = document.getElementById("odeljenjeSelect").value;
  const odeljenje = podaci.odeljenja.find((od) => od.id == odeljenjeID);
  prikaziTabelu(odeljenje);

  document.getElementById("odeljenjeSelect").onchange = () => {
    const odeljenjeID = document.getElementById("odeljenjeSelect").value;
    const odeljenje = podaci.odeljenja.find((od) => od.id == odeljenjeID);
    prikaziTabelu(odeljenje);
  };
}

function popuniOdeljenja() {
  const odeljenjeSelect = document.getElementById("odeljenjeSelect");
  odeljenjeSelect.innerHTML = podaci.odeljenja
    .map(
      (odeljenje) =>
        `<option value="${odeljenje.id}">${odeljenje.naziv}</option>`
    )
    .join("");
}

function prikaziTabelu(odeljenje) {
  const tabela = document.getElementById("tabela");
  const dani = Object.keys(odeljenje.raspored);

  // pronaci maksimalan broj casova
  let maxCasova = 0;
  dani.forEach((dan) => {
    const regularni = odeljenje.raspored[dan].length;
    const dodatni = dodatniCasovi.filter(
      (cas) => cas.odeljenje === odeljenje.id && cas.dan === dan
    ).length;
    const ukupno = regularni + dodatni;

    if (ukupno > maxCasova) maxCasova = ukupno;
  });

  // kreiranje html koda tabele
  let html = `
        <table class="raspored-tabela">
            <thead>
                <tr>
                    <th>cas</th>
                    ${dani.map((dan) => `<th>${dan}</th>`).join("")}
                </tr>
            </thead>
            <tbody>
    `;

  // popunjavanje redova
  for (let casBroj = 1; casBroj <= maxCasova; casBroj++) {
    html += `<tr><td>${casBroj}</td>`;

    dani.forEach((dan) => {
      const sviCasovi = [
        ...odeljenje.raspored[dan],
        ...dodatniCasovi.filter(
          (cas) => cas.odeljenje === odeljenje.id && cas.dan === dan
        ),
      ];

      const cas = sviCasovi.find((c) => c.cas === casBroj);

      if (cas) {
        html += `<td><b>${cas.predmet}</b></td>`;
      } else {
        html += `<td class="nista"></td>`;
      }
    });

    html += `</tr>`;
  }

  html += `
            </tbody>
        </table>
    `;

  tabela.innerHTML = html;
}

function dodajCas() {}

function pretraga() {}

function promeniTemu() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "tema",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

function primeniTemu() {
  if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark");
  }
}

let dodatniCasovi = JSON.parse(localStorage.getItem("dodatniCasovi")) || [];
const podaci = {
  odeljenja: [
    {
      id: 1,
      naziv: "III-3",
      raspored: {
        ponedeljak: [
          { cas: 1, predmet: "matematika" },
          { cas: 2, predmet: "engleski" },
          { cas: 3, predmet: "primena racunara" },
        ],
        utorak: [
          { cas: 1, predmet: "srpski" },
          { cas: 2, predmet: "programiranje" },
        ],
      },
    },
    {
      id: 2,
      naziv: "II-2",
      raspored: {
        ponedeljak: [
          { cas: 1, predmet: "likovno" },
          { cas: 2, predmet: "oop" },
        ],
        utorak: [
          { cas: 1, predmet: "fizicko" },
          { cas: 2, predmet: "geografija" },
        ],
      },
    },
  ],
};
