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
