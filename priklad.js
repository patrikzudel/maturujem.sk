// Inicializacia

var priklad;
var i = 0;
var pocetPrikladov = 300;
var spravnaOdpoved;
var xmlDoc;
var divClone0 = $(".odpovede0").clone();
var divClone1 = $(".odpovede1").clone();

novyPriklad();

// Generovanie prikladu

function customPriklad() {
    //Reset the buttons
    var prikladBackup = priklad;
    priklad = document.getElementById("custPriklad").value;
    if (priklad == "") {
        document.getElementById("PrikladID").innerHTML = "Zadajte číslo príkladu";
        priklad = prikladBackup;
        return;
    } else {
        if (priklad <= pocetPrikladov && priklad > 0) {
            $(".odpovede0").replaceWith(divClone0.clone());
            $(".odpovede1").replaceWith(divClone1.clone());
            napisPriklad();
            loadAnswer();
        } else {
            document.getElementById("PrikladID").innerHTML = "Príklad s týmto číslom neexistuje";
            priklad = prikladBackup;
        }
    }
}

function novyPriklad() {
    priklad = Math.floor(Math.random() * pocetPrikladov + 1);

    var prikladName = "" + priklad;
    var cookieValue = Cookies.get(prikladName);
    if (cookieValue == priklad) {
        //console.log("Tento priklad uz bol pouzity");
        i++;
        if (i < 50) {
            novyPriklad();
        } else {
            document.cookie.split(";").forEach(function (c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            novyPriklad();
        }
    } else {
        //console.log("Teto priklad este nebol pouzity")
        napisPriklad();
        saveCookie();
    }
}

function saveCookie() {
    Cookies.set(priklad, priklad, {
        expires: 10
    });
}

function napisPriklad() {
    enterDetect();
    document.getElementById("PrikladID").innerHTML = "PRÍKLAD " + priklad;
    document.getElementById("PrikladIMG").src = "priklady/" + priklad + ".png";
}

// Kontrolovanie odpovedi

function checkAns0() {
    //Reset the button
    var elm = document.getElementById("buttonCheck0");
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);

    loadAnswer();
    odpovedPouzivatela = document.getElementById("odpoved0Input").value;
    if (odpovedPouzivatela == "") {
        document.getElementById("odpoved0Input").placeholder = "######";
        document.getElementById("buttonCheck0").classList.add("Shake");
        return;
    }
    if (parseFloat(odpovedPouzivatela.replace(/,/, '.')) == spravnaOdpoved) {
        document.getElementById("odpoved0Input").style.borderColor = "#44D24F";
        document.getElementById("buttonCheck0").style.backgroundColor = "#44D24F";
        document.getElementById("buttonCheck0").classList.add("PulseShort");
        document.getElementsByClassName("odpovede0")[0].style.pointerEvents = "none";
    } else {
        document.getElementsByClassName("SpravnaOdpoved")[0].style.display = "initial";
        document.getElementById("odpoved0Input").style.borderColor = "#D24444";
        document.getElementById("buttonCheck0").style.backgroundColor = "#D24444";
        document.getElementById("buttonCheck0").classList.add("Shake");
        document.getElementsByClassName("odpovede0")[0].style.pointerEvents = "none";
    }
}

function checkAns1() {
    loadAnswer();
    odpovedPouzivatela = arguments[0];
    document.getElementsByClassName("odpovede1")[0].style.pointerEvents = "none";
    if (odpovedPouzivatela == spravnaOdpoved) {
        document.getElementById(odpovedPouzivatela).style.backgroundColor = '#44D24F';
        document.getElementById(spravnaOdpoved).classList.add("PulseShort");
    } else {
        document.getElementById(odpovedPouzivatela).style.backgroundColor = '#D24444';
        document.getElementById(spravnaOdpoved).classList.add("Pulse");
        document.getElementById(spravnaOdpoved).style.backgroundColor = '#44D24F';
        document.getElementById(odpovedPouzivatela).classList.add("Shake");
    }
}


//XML Nacitanie

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        loadXML(this);
    }
};
xhttp.open("GET", "priklady.xml", true);
xhttp.send();

function loadXML(xml) {
    xmlDoc = xml.responseXML;
    loadAnswer();
}

function loadAnswer() {
    spravnaOdpoved =
        xmlDoc.getElementsByTagName("odp")[priklad - 1].childNodes[0].nodeValue;
    if (xmlDoc.getElementsByTagName("typ")[priklad - 1].childNodes[0].nodeValue == 0) {
        document.getElementById("spravnaOdp").innerHTML = spravnaOdpoved;
        document.getElementsByClassName('odpovede0')[0].style.display = "flex";
        document.getElementsByClassName('odpovede1')[0].style.display = "none";
        spravnaOdpoved = parseFloat(spravnaOdpoved);
    }
    if (xmlDoc.getElementsByTagName("typ")[priklad - 1].childNodes[0].nodeValue == 1) {
        document.getElementsByClassName('odpovede0')[0].style.display = "none";
        document.getElementsByClassName('odpovede1')[0].style.display = "flex";
    }
}

// Misc

$('.Numeric').keypress(function (evt) {
    if (evt.which == 8) {
    } 
    else {
    return (/^[0-9]*[0-9]*$/).test($(this).val() + evt.key);
    }
});

$('.Decimal').keypress(function (evt) {
    if (evt.which == 8) {
    } 
    else {
        return (/^-?[0-9]*\.?,?[0-9]*$/).test($(this).val() + evt.key);
    }
});

document.getElementById("custPriklad").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
});

function enterDetect() {
    document.getElementById("odpoved0Input").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          document.getElementById("buttonCheck0").click();
        }
      });
}