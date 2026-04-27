function verifica_input() {
    const campi = ["tensione", "potenza", "caduta_di_tensione", "lunghezza"];
    let valori = {};
    let validi = true;

    //   (vuoti + numerici)
    campi.forEach(id => {
        const el = document.getElementById(id);
        const valore = el.value.trim();

        valori[id] = valore;

        if (valore === "" || isNaN(valore)) {
            el.className = "errato";
            validi = false;
        } else {
            el.className = "corretto";
        }
    });

    if (!validi) {
        messaggioerrore("Campi_incompleti");
        return;
    }

    //  Tipologia corrente
    const corrente = document.getElementById("corrente");
    const tipo = corrente.value;

    if (tipo === "0") {
        corrente.className = "errato";
        corrente.classList.add("form-select");
        messaggioerrore("Tipologia_corrente");
        return;
    } else {
         
        corrente.className = "corretto";
            corrente.classList.add("form-select");     
    }

    // Calcolo
    calcola_dati(
        parseFloat(valori.tensione),
        parseFloat(valori.potenza),
        parseFloat(valori.caduta_di_tensione),
        parseFloat(valori.lunghezza),
        tipo
    );
}


function calcola_dati(tensione, potenza, caduta, lunghezza, tipo) {
    let resistenza;
    let risultato;

    if (tipo === "1" || tipo === "2") {
        resistenza = (caduta / (2 * potenza)) * tensione;
    } else if (tipo === "3") {
        resistenza = (caduta * tensione) / potenza;
    }

    risultato = 0.0178 * (lunghezza / resistenza);

    document.getElementById("risultato").value = arrotonda(risultato, 2);
}


function messaggioerrore(type) {
    const messaggi = {
        
        Campi_incompleti: "Per poter effettuare il calcolo è necessario compilare correttamente tutti i campi",
        Tipologia_corrente: "Attenzione: è necessario scegliere una tipologia di corrente"
    };

    alert(messaggi[type] || "Errore");
}


function arrotonda(numero, decimali) {
    return Number(numero.toFixed(decimali));
}

function copiaTesto() {
  var input = document.getElementById("risultato");
  input.select();
  input.setSelectionRange(0, 999999); // 

  navigator.clipboard.writeText(input.value)
 
}

function validaNumero(input) {
    // sostituisce tutte le virgole con punti
     let valore = input.value.replace(/,/g, ".");

    // tiene solo numeri e punto
    valore = valore.replace(/[^0-9.]/g, "");

    // evita più punti
    valore = valore.replace(/(\..*)\./g, '$1');

    input.value = valore;
}