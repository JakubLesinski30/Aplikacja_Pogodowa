function pokazZegarek() {

    var data = new Date();
    var godzina = data.getHours();
    var minuta = data.getMinutes();
    var sekunda = data.getSeconds();

    godzina = (godzina < 10) ? "0" + godzina : godzina;
    minuta = (minuta < 10) ? "0" + minuta : minuta;
    sekunda = (sekunda < 10) ? "0" + sekunda : sekunda;
    var czas = godzina + ":" + minuta + ":" + sekunda + " ";

    document.getElementById("ZegarekJS").innerText = czas;

    setTimeout(pokazZegarek, 1000);
}

pokazZegarek();
