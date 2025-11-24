window.onload = () => {
  primeniTemu();
  ucitajPodatke();
  prikaziPodatke();
};

//let dodatniCasovi = JSON.parse(localStorage.getItem("dodatniCasovi")) || [];
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
  biologija: "gray",
  fizika: "lightgreen",
  cos: "green",
  gradjansko: "purple",
  diskretnamatematika: "darkblue",
  ostalo: "magenta",
};
const vremena = {
  1: {
    1: "7:15-8:00",
    2: "8:05-8:50",
    3: "8:55-9:40",
    4: "10:00-10:45",
    5: "10:50-11:35",
    6: "11:40-12:25",
    7: "12:30-13:15",
  },
  2: {
    1: "14:00-14:45",
    2: "14:50-15:35",
    3: "15:55-16:40",
    4: "16:45-17:30",
    5: "17:35-18:20",
    6: "18:25-19:10",
    7: "19:15-20:00",
  },
};
let podaci = null;

function ucitajPodatke() {
  podaci = JSON.parse(localStorage.getItem("podaci")) || {
    smene: [
      {
        id: 1,
        naziv: "1. smena",
        raspored: {
          ponedeljak: [
            { cas: 1, predmet: "matematika" },
            { cas: 2, predmet: "engleski jezik" },
            { cas: 3, predmet: "primena racunara" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "" },
          ],
          utorak: [
            { cas: 1, predmet: "srpski jezik" },
            { cas: 2, predmet: "programiranje" },
            { cas: 3, predmet: "" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "" },
          ],
          sreda: [
            { cas: 1, predmet: "cos" },
            { cas: 2, predmet: "biologija" },
            { cas: 3, predmet: "" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "" },
          ],
          cetvrtak: [
            { cas: 1, predmet: "" },
            { cas: 2, predmet: "" },
            { cas: 3, predmet: "diskretna matematika" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "gradjansko" },
          ],
          petak: [
            { cas: 1, predmet: "" },
            { cas: 2, predmet: "fizika" },
            { cas: 3, predmet: "" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "" },
          ],
        },
      },
      {
        id: 2,
        naziv: "2. smena",
        raspored: {
          ponedeljak: [
            { cas: 1, predmet: "likovno" },
            { cas: 2, predmet: "oop" },
            { cas: 3, predmet: "" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "" },
          ],
          utorak: [
            { cas: 1, predmet: "fizicko" },
            { cas: 2, predmet: "geografija" },
            { cas: 3, predmet: "" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "" },
          ],
          sreda: [
            { cas: 1, predmet: "" },
            { cas: 2, predmet: "" },
            { cas: 3, predmet: "" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "" },
          ],
          cetvrtak: [
            { cas: 1, predmet: "" },
            { cas: 2, predmet: "" },
            { cas: 3, predmet: "" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "" },
          ],
          petak: [
            { cas: 1, predmet: "" },
            { cas: 2, predmet: "" },
            { cas: 3, predmet: "" },
            { cas: 4, predmet: "" },
            { cas: 5, predmet: "" },
            { cas: 6, predmet: "" },
            { cas: 7, predmet: "" },
          ],
        },
      },
    ],
  };
  localStorage.setItem("podaci", JSON.stringify(podaci));
}

function resetujPodatke() {
  localStorage.clear();
  ucitajPodatke();
  prikaziPodatke();
}

function prikaziPodatke() {
  const raspored = document.getElementById("raspored");
  raspored.innerHTML = `
        <label>izaberite smenu:</label>
        <select id="smenaSelect"></select>
        <div id="tabela"></div>
    `;
  popunismene();

  const smenaSelect = document.getElementById("smenaSelect");
  const smenaID = smenaSelect.value;
  localStorage.setItem("smenaID", smenaID);
  const smena = podaci.smene.find((od) => od.id == smenaID);
  prikaziTabelu(smena);
  dodajPromenljivost();

  smenaSelect.onchange = () => {
    const smenaID = smenaSelect.value;
    localStorage.setItem("smenaID", smenaID);
    const smena = podaci.smene.find((od) => od.id == smenaID);
    prikaziTabelu(smena);
    dodajPromenljivost();
  };
}

function popunismene() {
  const smenaSelect = document.getElementById("smenaSelect");
  smenaSelect.innerHTML = podaci.smene
    .map((smena) => `<option value="${smena.id}">${smena.naziv}</option>`)
    .join("");
  if (localStorage.getItem("smenaID")) {
    smenaSelect.value = localStorage.getItem("smenaID");
  }
}

function prikaziTabelu(smena) {
  const tabela = document.getElementById("tabela");
  const dani = Object.keys(smena.raspored);

  // pronaci maksimalan broj casova
  let maxCasova = 0;
  dani.forEach((dan) => {
    /*
    const regularni = smena.raspored[dan].length;
    const dodatni = dodatniCasovi.filter(
      (cas) => cas.smena === smena.id && cas.dan === dan
    ).length;
    const ukupno = regularni + dodatni;
    */
    const ukupno = smena.raspored[dan].length;
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
    const vreme = vremena[smena.id][casBroj];
    html += `<tr><td>${casBroj}. (${vreme})</td>`;

    dani.forEach((dan) => {
      const sviCasovi = smena.raspored[dan];
      /*const sviCasovi = [
        ...smena.raspored[dan],
        ...dodatniCasovi.filter(
          (cas) => cas.smena === smena.id && cas.dan === dan
        ),
      ];
      */

      const cas = sviCasovi.find((c) => c.cas === casBroj);
      const id = `${dan}-${casBroj}`;
      let tema = localStorage.getItem("tema") === "dark" ? "#444" : "#f0f0f0";
      const cistNaziv = cas.predmet.toLowerCase().trim().replaceAll(" ", "");
      tema = cistNaziv == "" ? tema : boje["ostalo"];
      const backgroundColor =
        cas != null && cistNaziv in boje ? boje[cistNaziv] : tema;
      const predmet = cas != null ? cas.predmet : "";
      html += `<td class="promenljivo" id=${id} style='background-color:${backgroundColor}'>${predmet}</td>`;
      /*
      if (cas) {
        html += `<td class="promenljivo" id=${id} style='background-color:${backgroundColor}'>${cas.predmet}</td>`;
      } else {
        html += `<td class="nista promenljivo" id=${id}></td>`;
      }*/
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
        const newValue = input.value;
        this.textContent = newValue.toLowerCase().trim(); //|| oldValue;
        let tema = localStorage.getItem("tema") === "dark" ? "#444" : "#f0f0f0";
        const cistNaziv = this.textContent.replaceAll(" ", "");
        tema = cistNaziv == "" ? tema : boje["ostalo"];
        this.style.backgroundColor =
          boje[newValue.toLowerCase().trim().replaceAll(" ", "")] || tema;
        const smenaID = localStorage.getItem("smenaID");
        const smenaIndex = podaci.smene.indexOf(
          podaci.smene.find((od) => od.id == smenaID)
        );
        const splt = this.id.split("-");
        const dan = splt[0];
        const casBroj = Number(splt[1]);

        ukupniBrojCasova = podaci.smene[smenaIndex].raspored[dan].length;

        if (casBroj > ukupniBrojCasova) {
          for (let i = 0; i < casBroj - ukupniBrojCasova; i++) {
            podaci.smene[smenaIndex].raspored[dan][casBroj - 1] = {
              cas: casBroj,
              predmet: "",
            };
          }
        }
        podaci.smene[smenaIndex].raspored[dan][casBroj - 1].predmet = newValue
          .toLowerCase()
          .trim();
        localStorage.setItem("podaci", JSON.stringify(podaci));
        /*if (
          "predmet" in podaci.smene[smenaIndex].raspored[dan][casBroj]
        ) {
          podaci.smene[smenaIndex].raspored[dan][casBroj].predmet =
            newValue;
        } else {
          podaci.smene[smenaIndex].raspored[dan][casBroj] = {
            predmet: newValue,
            cas: casBroj,
          };
        }*/
      };

      input.addEventListener("blur", finish);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") finish();
      });
    });
  });
}

/*
function dodajCas() {}

function pretraga() {}
*/

function promeniTemu() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "tema",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
  prikaziPodatke();
}

function primeniTemu() {
  if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark");
  }
}
