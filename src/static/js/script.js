window.onload = () => {
  primeniTemu();
  prikaziPodatke();
};

function prikaziPodatke() {}

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

const podaci = {
  odeljenja: [
    {
      id: 1,
      naziv: "III-3",
      raspored: {
        ponedeljak: [
          { cas: 1, predmet: "matematika" },
          { cas: 2, predmet: "engleski" },
        ],
      },
    },
  ],
};
