function procentualnaVrednost (){
    const procenat = parseFloat(document.getElementById('procenat').value);
    const broj = parseFloat(document.getElementById('broj').value);
    const rezultat = document.getElementById('rezultat1');

    let konacno = (procenat/broj)*100;

    if (isNaN(konacno)){
        rezultat.innerText = `Nije moguće izračunati traženi procenat! Molim Vas da proverite unos.`;
    } else {
        rezultat.innerText = `${procenat}% od broja ${broj} je ${konacno.toFixed(2)}`;
    }
}

function izracunajProcenat (){
    const broj1 = parseFloat(document.getElementById('broj1').value);
    const broj2 = parseFloat(document.getElementById('broj2').value);
    const rezultat = document.getElementById('rezultat2');

    let konacno = (broj1/broj2)*100;

    if (isNaN(konacno)){
        rezultat.innerText = `Nije moguće izračunati traženi procenat! Molim Vas da proverite unos.`;
    } else {
        rezultat.innerText = `${broj1} je ${konacno.toFixed(2)}% od broja ${broj2}`;
    }
}

function smanjenjePovecanje (){
    const brojx = parseFloat(document.getElementById('brojx').value);
    const brojy = parseFloat(document.getElementById('brojy').value);
    const rezultat = document.getElementById('rezultat3');

    let konacno = ((brojy-brojx)/brojx)*100;

    if (isNaN(konacno)){
        rezultat.innerText = `Nije moguće izračunati traženi procenat! Molim Vas da proverite unos.`;
    } else {
        rezultat.innerText = `Od broja ${brojx} do broja ${brojy} ima ${konacno.toFixed(2)}%`;
    }
}