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

kupidugme.forEach(function (dugme) {
  dugme.addEventListener("click", function (event) {
    event.stopPropagation(); // Zaustavlja širenje događaja na roditeljske elemente
    popupkupi.classList.add("aktivan");
    const kartica = dugme.closest(".kartica");
    popupkupislika.src = kartica.dataset.slika;
    popupkupislika.alt = kartica.dataset.naslov;
    popupkupicijena.textContent = kartica.dataset.cijena + " KM";
  });
});

zatvorikupi.forEach(function (dugme) {
  dugme.addEventListener("click", function (event) {
    event.stopPropagation();
    popupkupi.classList.remove("aktivan");
  });
});
