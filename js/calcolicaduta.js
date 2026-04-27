function verifica_input() {

    const campi = ["tensione", "potenza", "sezione", "lunghezza"];
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
        parseFloat(valori.sezione),
        parseFloat(valori.lunghezza),
        tipo
    );
}


function calcola_dati(tensione, potenza, sezione, lunghezza, tipologia_corrente) {
    const correnteEl = document.getElementById("corrente");

    //   Validazione tipologia
    if (tipologia_corrente === "0") {
        correnteEl.className = "errato";
        correnteEl.classList.add("form-select"); 
        messaggioerrore("Tipologia_corrente");
        return;
    }

    correnteEl.className = "corretto";
    correnteEl.classList.add("form-select"); 
    //   Costanti
    const RAME = 0.0178;
    const FATTORE_POTENZA = 0.9;
    const RADICE3 = Math.sqrt(3);

    //   Calcolo resistenza
    const resistenza = RAME * (lunghezza / sezione);

    let corrente;
    let caduta_tensione;

    //   Calcolo corrente + caduta
    switch (tipologia_corrente) {
        case "1": // base
            corrente = potenza / tensione;
            caduta_tensione = 2 * resistenza * corrente;
            break;

        case "2": // monofase con cosφ
            corrente = potenza / (tensione * FATTORE_POTENZA);
            caduta_tensione = 2 * resistenza * corrente * FATTORE_POTENZA;
            break;

        case "3": // trifase
            corrente = potenza / (tensione * FATTORE_POTENZA * RADICE3);
            caduta_tensione = RADICE3 * corrente * FATTORE_POTENZA * resistenza;
            break;
    }

    //   Calcolo percentuale
    const caduta_tensione_perc = (caduta_tensione / tensione) * 100;

    //   Output
    document.getElementById("risultato_cad_tensione").value = arrotonda(caduta_tensione, 2);
    document.getElementById("risultato_cad_tensione_perc").value = arrotonda(caduta_tensione_perc, 2);
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

function copiaTesto(testo) {
  var input = document.getElementById(testo);
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