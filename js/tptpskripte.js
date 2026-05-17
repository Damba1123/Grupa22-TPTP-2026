// DIO ZA POPUP PRITISKOM NA KARTICU RACUNARA

const kartice = document.querySelectorAll(".kartica");
const zatvori = document.querySelectorAll(".popup-zatvori");
const popup = document.querySelector(".popup");
const popupnaslov = document.getElementById("popup-naslov");
const popupopis = document.getElementById("popup-opis");

kartice.forEach(function (kartica) {
  kartica.addEventListener("click", function () {
    popup.classList.add("aktivan");
    popupopis.textContent = kartica.dataset.opis;
    popupnaslov.textContent = kartica.dataset.naslov;
  });
});

zatvori.forEach(function (dugme) {
  dugme.addEventListener("click", function (event) {
    popup.classList.remove("aktivan");
    event.stopPropagation();
  });
});
// DIO ZA KORPU
const kupidugme = document.querySelectorAll(".kupi");
const popupkupi = document.querySelector(".popup-kupi");
const zatvorikupi = document.querySelectorAll(".popup-kupi-zatvori");

const popupkupinaslov = document.getElementById("popup-kupi-naslov");
const popupkupicijena = document.getElementById("popup-kupi-cijena");
const popupkupislika = document.getElementById("popup-kupi-slika");

const korpaLista = document.getElementById("korpa-lista");

kupidugme.forEach(function (dugme) {
  dugme.addEventListener("click", function (event) {
    event.stopPropagation();

    const kartica = dugme.closest(".kartica");

    const artikalKorpe = document.createElement("div");
    artikalKorpe.classList.add("korpa-artikal");

    artikalKorpe.innerHTML = `
      <img src="${kartica.dataset.slika}" alt="${kartica.dataset.naslov}">
      <div class="korpa-info">
      <p>${kartica.dataset.naslov}</p>
      <button class="dugme-ukloni">Ukloni</button>
      </div>
      <p>${kartica.dataset.cijena} KM</p>
    `;
    // DIO KORPE VEZAN ZA DUGME UKLONI
    const dugmeukloni = artikalKorpe.querySelector(".dugme-ukloni");
    dugmeukloni.addEventListener("click", function () {
      artikalKorpe.remove();
    });
    korpaLista.appendChild(artikalKorpe);
    popupkupi.classList.add("aktivan");
  });
});
zatvorikupi.forEach(function (dugme) {
  dugme.addEventListener("click", function (event) {
    event.stopPropagation();
    popupkupi.classList.remove("aktivan");
  });
});

// --- DIO ZA FILTRIRANJE  ---

const filterDugmad = document.querySelectorAll(".filter-btn");

filterDugmad.forEach((dugme) => {
  dugme.addEventListener("click", function () {
    const filterVrijednost = this.getAttribute("data-filter");
    const tipFiltera = this.getAttribute("data-tip"); // npr. cpu, gpu, ram

    let pronadjeno = 0;
    const sveKartice = document.querySelectorAll(".kartica");

    sveKartice.forEach((kartica) => {
      // Slučaj 1: Prikaži sve
      if (filterVrijednost === "Sve") {
        kartica.style.display = "block";
        pronadjeno++;
      }
      // Slučaj 2: Filtriranje po tipu
      else {
        if (kartica.dataset[tipFiltera] === filterVrijednost) {
          kartica.style.display = "block";
          pronadjeno++;
        } else {
          kartica.style.display = "none";
        }
      }
    });

    // Ažuriranje statistike
    const brojacPolje = document.getElementById("brojac");
    if (brojacPolje) brojacPolje.textContent = pronadjeno;

    // Vizuelna povratna informacija (aktivno dugme)
    filterDugmad.forEach((btn) => btn.classList.remove("aktivan-filter"));
    this.classList.add("aktivan-filter");
  });
});

// Postavi početni broj pri učitavanju
window.addEventListener("DOMContentLoaded", () => {
  const brojac = document.getElementById("brojac");
  if (brojac) brojac.textContent = document.querySelectorAll(".kartica").length;
});

// --- DIO ZA FILTRIRANJE  ---
//  KONTAKT FORMA VALIDACIJA (Samo za kontakt.html)
const kontaktForma = document.getElementById("kontakt-forma");

if (kontaktForma) {
  // Kada se klikne na dugme za resetovanje, brisu se sve greske i poruka uspjeha
  kontaktForma.addEventListener("reset", function () {
    document.querySelectorAll(".input-greska").forEach((el) => el.classList.remove("input-greska"));
    document.querySelectorAll(".greska").forEach((el) => (el.textContent = ""));
    
    const uspjehPoruka = document.getElementById("uspjeh-poruka");
    if (uspjehPoruka) {
      uspjehPoruka.classList.remove("vidljivo");
      uspjehPoruka.innerHTML = "";
    }
  });

  // Kada korisnik pokusa poslati formu
  kontaktForma.addEventListener("submit", function (e) {
    // Sprijeci automatsko osvezavanje stranice
    e.preventDefault();

    // Hvatanje svih elemenata iz HTML-a
    const ime = document.getElementById("ime");
    const prezime = document.getElementById("prezime");
    const email = document.getElementById("email");
    const telefon = document.getElementById("telefon");
    const razlog = document.getElementById("razlog");
    const poruka = document.getElementById("poruka");
    const uspjehPoruka = document.getElementById("uspjeh-poruka");

    // Brojac gresaka (na pocetku je nula)
    let greske = 0;

    // Ocisti sve prethodne crvene greske prije nove provjere
    document.querySelectorAll(".input-greska").forEach((el) => el.classList.remove("input-greska"));
    document.querySelectorAll(".greska").forEach((el) => (el.textContent = ""));
    if (uspjehPoruka) {
      uspjehPoruka.classList.remove("vidljivo");
    }

    // 1. Validacija imena (mora imati bar 2 znaka)
    if (ime && ime.value.trim().length < 2) {
      ime.classList.add("input-greska");
      const greskaSpan = document.getElementById("greska-ime");
      if (greskaSpan) greskaSpan.textContent = "Ime je prekratko.";
      greske++;
    }

    // 2. Validacija prezimena (mora imati bar 2 znaka)
    if (prezime && prezime.value.trim().length < 2) {
      prezime.classList.add("input-greska");
      const greskaSpan = document.getElementById("greska-prezime");
      if (greskaSpan) greskaSpan.textContent = "Prezime je prekratko.";
      greske++;
    }

    // 3. Validacija email adrese pomocu Regex-a
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email.value.trim())) {
      email.classList.add("input-greska");
      const greskaSpan = document.getElementById("greska-email");
      if (greskaSpan) greskaSpan.textContent = "Unesite ispravnu email adresu.";
      greske++;
    }

    // 4. Validacija telefona pomocu Regex-a (dozvoljava samo brojeve i crtice, od 6 do 15 znakova)
    const telefonPattern = /^[0-9\-]{6,15}$/;
    if (telefon && !telefonPattern.test(telefon.value.trim())) {
      telefon.classList.add("input-greska");
      const greskaSpan = document.getElementById("greska-telefon");
      if (greskaSpan) greskaSpan.textContent = "Unesite ispravan broj telefona.";
      greske++;
    }

    // 5. Validacija dropdown menija (da li je izabran razlog upita)
    if (razlog && razlog.value === "") {
      razlog.classList.add("input-greska");
      const greskaSpan = document.getElementById("greska-razlog");
      if (greskaSpan) greskaSpan.textContent = "Morate odabrati razlog upita.";
      greske++;
    }

    // 6. Validacija poruke (mora imati bar 10 znakova)
    if (poruka && poruka.value.trim().length < 10) {
      poruka.classList.add("input-greska");
      const greskaSpan = document.getElementById("greska-poruka");
      if (greskaSpan) greskaSpan.textContent = "Poruka mora imati barem 10 znakova.";
      greske++;
    }

    // Ako nema nijedne greske, ispisi zelenu poruku uspjeha i rucno isprazni polja
    if (greske === 0 && uspjehPoruka) {
      // Upisivanje teksta poruke
      uspjehPoruka.innerHTML = `Hvala Vam, <strong>${ime.value}</strong>! Vaš upit vezan za <strong>${razlog.options[razlog.selectedIndex].text}</strong> je uspješno poslan. Odgovorićemo Vam na <strong>${email.value}</strong> ubrzo.`;
      
      // Dodavanje klase .vidljivo (prikazivanje zelenog prozora preko CSS-a)
      uspjehPoruka.classList.add("vidljivo");
      
      // Rucno praznjenje unosa kako bi zelena poruka ostala vidljiva na ekranu
      ime.value = "";
      prezime.value = "";
      email.value = "";
      telefon.value = "";
      razlog.value = "";
      poruka.value = "";
    }
  });
}

// --- KONTAKT FORMA VALIDACIJA ) ---

// --- DIO ZA PROMJENU TEME (DARK/LIGHT MOD) ---

const dugmeTema = document.getElementById("dark-tema");

if (dugmeTema) {
  // 1. Provjeri da li je korisnik već ranije izabrao svijetlu temu
  if (localStorage.getItem("tema") === "light") {
    document.body.classList.add("light-theme");
  }

  // 2. Slušaj klik na dugme Mod
  dugmeTema.addEventListener("click", () => {
    // Toggle (ako ima klase skini je, ako nema dodaj je)
    document.body.classList.toggle("light-theme");

    // 3. Spasi trenutno stanje u memoriju browsera da se ne poništi pri osvježavanju
    if (document.body.classList.contains("light-theme")) {
      localStorage.setItem("tema", "light");
    } else {
      localStorage.setItem("tema", "dark");
    }
  });
}
// --- DIO ZA PROMJENU TEME (DARK/LIGHT MOD) ---
