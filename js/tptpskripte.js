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
    filterDugmad.forEach(btn => btn.classList.remove("aktivan-filter"));
    this.classList.add("aktivan-filter");
  });
});

// Postavi početni broj pri učitavanju
window.addEventListener("DOMContentLoaded", () => {
  const brojac = document.getElementById("brojac");
  if(brojac) brojac.textContent = document.querySelectorAll(".kartica").length;
});

// --- DIO ZA FILTRIRANJE  ---

// --- KONTAKT FORMA VALIDACIJA ) ---

const kontaktForma = document.getElementById('kontakt-forma');

if (kontaktForma) {
    kontaktForma.addEventListener('submit', function(e) {
        // 1. Spriječi automatsko slanje forme
        e.preventDefault();

        // 2. Dohvati elemente
        const ime = document.getElementById('ime');
        const prezime = document.getElementById('prezime');
        const email = document.getElementById('email');
        const poruka = document.getElementById('poruka');
        const uspjehPoruka = document.getElementById('uspjeh-poruka');

        let greske = 0;

        // Resetuj prethodne stilove i poruke
        resetujGreske();

        // 3. Validacija IMENA 
        if (ime.value.trim().length < 2) {
            prikaziGresku('ime', 'Ime je prekratko.');
            greske++;
        }

        // 4. Validacija PREZIMENA
        if (prezime.value.trim().length < 2) {
            prikaziGresku('prezime', 'Prezime je prekratko.');
            greske++;
        }

        // 5. REGEX Validacija EMAILA 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            prikaziGresku('email', 'Unesite ispravnu email adresu.');
            greske++;
        }

        // 6. Validacija PORUKE 
        if (poruka.value.trim().length < 10) {
            prikaziGresku('poruka', 'Poruka mora imati barem 10 znakova.');
            greske++;
        }

        // 7. Ako nema grešaka, prikaži personalizovanu poruku
        if (greske === 0) {
            uspjehPoruka.classList.add('vidljivo');
            uspjehPoruka.innerHTML = `Hvala Vam, <strong>${ime.value}</strong>! Vaš upit je uspješno poslan. Odgovorićemo Vam na <strong>${email.value}</strong> ubrzo.`;
            kontaktForma.reset(); // Isprazni formu
        }
    });
}

// Pomoćna funkcija za prikazivanje crvenog bordera i teksta greške
function prikaziGresku(id, tekst) {
    const el = document.getElementById(id);
    el.classList.add('input-greska'); // Dodaje crveni border iz CSS-a
    const greskaSpan = document.getElementById(`greska-${id}`);
    if (greskaSpan) {
        greskaSpan.textContent = tekst;
    }
}

// Funkcija za čišćenje grešaka pri ponovnom kliku
function resetujGreske() {
    document.querySelectorAll('.input-greska').forEach(el => el.classList.remove('input-greska'));
    document.querySelectorAll('.greska').forEach(el => el.textContent = '');
    const uspjeh = document.getElementById('uspjeh-poruka');
    if(uspjeh) uspjeh.style.display = 'none';
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