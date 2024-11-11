// Selektovanje elemenata
let formaZaNamirnice = document.getElementById('formaZaNamirnice');
let kolicinaNamirnica = document.getElementById('kolicinaNamirnica');

// Učitavanje liste namirnica iz Local Storage
let namirnice = JSON.parse(localStorage.getItem('namirnice')) || [];


// Lista dostupnih namirnica
let dostupneNamirnice = [
    "Hleb (bela vekna)",
    "Hleb (integralni)",
    "Piletina",
    "Šunka",
    "Slanina",
    "Sir (trapist)",
    "Paradajz",
    "Krastavac",
    "Majonez",
    "Kečap",
    "Senf",
    "Salata",
    "Luk",
    "Paprika",
    "Jaja"
];
// Popunjavanje select opcija
const nazivNamirniceSelect = document.getElementById('nazivNamirnice');
dostupneNamirnice.forEach(namirnica => {
    const opcija = document.createElement('option');
    opcija.value = namirnica;
    opcija.textContent = namirnica;
    nazivNamirniceSelect.appendChild(opcija);
});

function prikaziNamirnice() {
    const kontejner = document.querySelector('.container');

    // Brišemo stari prikaz, ako postoji
    const staraTabela = document.querySelector('table');
    if (staraTabela) staraTabela.remove();

    // Pravimo novu tabelu
    const tabela = document.createElement('table');
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Naziv</th>
                <th>Količina</th>
                <th>Akcije</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    namirnice.forEach((stavka, index) => {
        const red = document.createElement('tr');
        red.innerHTML = `
            <td id="tekstNamirnice-${index}">${stavka.naziv}</td>
            <td>${stavka.kolicina}</td>
            <td>
                <button onclick="prikaziFormuZaIzmenu(${index})">✏️ Uredi</button>
                <button onclick="izbrisiNamirnicu(${index})">🗑️ Izbriši</button>
            </td>
        `;
        tabela.querySelector('tbody').appendChild(red);
    });
    kontejner.appendChild(tabela);
}

// Dodavanje namirnice
function dodajNamirnicu(e) {
    e.preventDefault();

    const naziv = nazivNamirnice.value.trim().toLowerCase(); // Pretvaramo u mala slova radi lakšeg poređenja
    const kolicina = kolicinaNamirnica.value.trim();

    // Proveravamo da li već postoji namirnica sa istim nazivom
    const postojiNamirnica = namirnice.some(stavka => stavka.naziv.toLowerCase() === naziv);

    if (naziv && kolicina > 0) {
        if (postojiNamirnica) {
            alert("Namirnica sa ovim nazivom već postoji! Molimo dodajte novu ili izmenite postojeću.");
        } else {
            namirnice.push({ naziv, kolicina });
            azurirajLocalStorage();
            prikaziNamirnice();

            // Resetujemo vrednosti input polja
            nazivNamirnice.value = '';
            kolicinaNamirnica.value = '';
        }
    } else {
        alert("Molimo unesite validan naziv i količinu (veću od 0).");
    }
}

function izbrisiNamirnicu(index){
    namirnice.splice(index,1); // uklanjam elemente počevši od indeksa index i uklanja se 1 element počevši odatle
    azurirajLocalStorage();
    prikaziNamirnice();
}

function prikaziFormuZaIzmenu(index) {
    const stavka = namirnice[index];
    const red = document.querySelector(`#tekstNamirnice-${index}`).parentElement.parentElement;

    red.innerHTML = `
        <td><input type="text" id="noviNaziv-${index}" value="${stavka.naziv}"></td>
        <td><input type="number" id="novaKolicina-${index}" value="${stavka.kolicina}" min="1"></td>
        <td>
            <button onclick="sacuvajIzmene(${index})">💾 Sačuvaj</button>
            <button onclick="otkaziIzmene(${index})">❌ Otkaži</button>
        </td>
    `;
}

function sacuvajIzmene(index) {
    const noviNaziv = document.getElementById(`noviNaziv-${index}`).value.trim();
    const novaKolicina = parseInt(document.getElementById(`novaKolicina-${index}`).value.trim());

    if (noviNaziv && novaKolicina > 0) {
        namirnice[index] = { naziv: noviNaziv, kolicina: novaKolicina };
        azurirajLocalStorage();
        prikaziNamirnice();
    } else {
        alert("Molimo unesite validne vrednosti!");
    }
}

function otkaziIzmene(index) {
    prikaziNamirnice(); // Vraća originalni prikaz liste
}

function azurirajLocalStorage(){
    localStorage.setItem('namirnice', JSON.stringify(namirnice))
}

// Event listener za dodavanje namirnica
formaZaNamirnice.addEventListener('submit', dodajNamirnicu);

// Prikazivanje namirnica na stranici prilikom učitavanja
prikaziNamirnice();