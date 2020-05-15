// Sjekker all input for feil og skriver ut feilmeldinger
function kjøpBillett() {

    // sjekker eposten for feil
    let tekstEpost;
    let epost = document.getElementById("epost").value;
    if (epost === "" || epost === null) {
        tekstEpost = "Må skrive noe inn i epost";
    }
    if (epost.length < 5) {       //en epost må inneholde minst 5 tegn
        tekstEpost = "Må skrive noe inn i epost";
    } else {
        tekstEpost = "";
    }
    document.getElementById("feilEpost").innerHTML = tekstEpost;

    // sjekker telefonnr for feil
    let tekstTelefonnr;
    let telefonnr = document.getElementById("telefonnr").value;
    if (telefonnr === "" || telefonnr === null) {
        tekstTelefonnr = "Må skrive noe inn i telefonnr";
    }
    if (isNaN(telefonnr) || telefonnr.length < 8) {     //et norsk nr er på 8 tall
        tekstTelefonnr = "Må skrive inn et gyldig telefonnr";
    } else {
        tekstTelefonnr = "";
    }
    document.getElementById("feilTelefonnr").innerHTML = tekstTelefonnr;

    // sjekker etternavnet for feil
    let tekstEtternavn;
    let etternavn = document.getElementById("etternavn").value;
    if (etternavn === "" || etternavn === null) {
        tekstEtternavn = "Må skrive noe inn i etternavn";
    } else if (etternavn.length < 1) {
        tekstEtternavn = "Må skrive inn et gyldig etternavn";
    } else {
        tekstEtternavn = "";
    }
    document.getElementById("feilEtternavn").innerHTML = tekstEtternavn;

    // sjekker fornavnet for feil
    var tekstFornavn;
    let fornavn = document.getElementById("fornavn").value;
    if (fornavn === "") {
        tekstFornavn = "Må skrive noe inn i fornavn";
    } else if (fornavn.length < 1) {
        tekstFornavn = "Må skrive noe inn i fornavn";
    } else {
        tekstFornavn = "";
    }
    document.getElementById("feilFornavn").innerHTML = tekstFornavn;

    // sjekker antallet for feil
    var tekstAntall;
    let antall = document.getElementById("antall").value;
    if (isNaN(antall) || antall === "") {
        tekstAntall = "Må skrive noe inn i antall";
    } else if (antall < 1) {
        tekstAntall = "Antallet må være større enn 0";
    } else if (antall > 10) {
        tekstAntall = "Du kan ikke kjøpe fler enn 10 billetter om gangen";
    } else {
        tekstAntall = "";
    }
    document.getElementById("feilAntall").innerHTML = tekstAntall;

    // sjekker filmvalget for feil
    let tekstFilm;
    let film = document.getElementById("film").value;
    if (film === "Velg film her" ||film==="") {
        tekstFilm = "Velg en film";
    } else {
        tekstFilm = "";
    }
    document.getElementById("ingenFilm").innerHTML = tekstFilm;


    // hvis det ikke er noen feilmeldinger lagres verdiene i arrayet
    if (tekstFilm === "" && tekstAntall === "" && tekstEpost === "" &&
        tekstEtternavn === "" && tekstFornavn === "" && tekstTelefonnr === "") {

        // oppretter en kunde og henter ut alle attributter
        const kunde = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefonnr: telefonnr,
            epost: epost,
        };

        // skriver ut alle attributtene og formaterer de inn i en tabell
        $.post("/lagreKunde", kunde, function() {
            skrivUtAlt();
        });

        // nullstiller tekstfeltene så nestemann kan registrere seg
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
}

// funksjon for å slette tabellen
function slettAlt() {
    $.get("/slettTabell", function(){
        skrivUtAlt();
    });
}

function skrivUtAlt() {
    $.get("/skrivUtAlt", function(billettene) {
        formaterTabell(billettene);
    });
}

function formaterTabell(alleKunder) {
    let utskrift = "<table class='table table-striped table-bordered'>" + "<tr>" +
        "<th>Film</th> <th>Antall</th> <th>Fornavn</th> <th>Etternavn</th>" +
        "<th>Telefonnr</th> <th>Epost</th>" +
        "</tr>";
    for (const kunde of alleKunder) {
        utskrift += "<tr><td>" + kunde.film + "</td><td>" +
            kunde.antall + "</td><td>" + kunde.fornavn +
            "</td><td>" + kunde.etternavn + "</td><td>" +
            kunde.telefonnr + "</td><td>" + kunde.epost + "</td></tr>";
    }
    $("#alleKunder").html(utskrift);
}
