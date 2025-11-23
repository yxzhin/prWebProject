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
  dodajPromenljivost();

  document.getElementById("odeljenjeSelect").onchange = () => {
    const odeljenjeID = document.getElementById("odeljenjeSelect").value;
    const odeljenje = podaci.odeljenja.find((od) => od.id == odeljenjeID);
    prikaziTabelu(odeljenje);
    dodajPromenljivost();
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
        html += `<td class="promenljivo" style='background-color:${
          boje[cas.predmet.toLowerCase().replace(" ", "")]
        }'>${cas.predmet}</td>`;
      } else {
        html += `<td class="nista promenljivo"></td>`;
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

function dodajPromenljivost() {
  document.querySelectorAll(".promenljivo").forEach((cell) => {
    cell.addEventListener("click", function () {
      const oldValue = this.textContent.trim();

      const input = document.createElement("input");
      input.type = "text";
      input.value = oldValue;
      input.className = "inline-editor";

      this.textContent = "";
      this.appendChild(input);
      input.focus();

      const finish = () => {
        const newValue = input.value.trim();
        this.textContent = newValue; //|| oldValue;
        this.style.backgroundColor =
          boje[newValue.toLowerCase().replace(" ", "")] || "#fafafa";
      };

      input.addEventListener("blur", finish);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") finish();
      });
    });
  });
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
const boje = {
  matematika: "pink",
  srpskijezik: "lime",
  engleskijezik: "brown",
  primenaracunara: "orange",
  bazepodataka: "red",
  oop: "lightblue",
  programiranje: "blue",
  fizicko: "yellow",
  geografija: "rosybrown",
  likovno: "cyan",
};
const podaci = {
  odeljenja: [
    {
      id: 1,
      naziv: "III-3",
      raspored: {
        ponedeljak: [
          { cas: 1, predmet: "matematika" },
          { cas: 2, predmet: "engleski jezik" },
          { cas: 3, predmet: "primena racunara" },
        ],
        utorak: [
          { cas: 1, predmet: "srpski jezik" },
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
