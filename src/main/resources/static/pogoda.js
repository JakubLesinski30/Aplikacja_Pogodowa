$(document).ready(function () {
    var zapisaneMiasto = pobierzCiasteczko("miasto");
    if (zapisaneMiasto) {
        $("#miasto").val(zapisaneMiasto);
    }

    $('#formularzPogody').submit(function (event) {
        event.preventDefault();
        var miasto = $('#miasto').val();
        $.ajax({
            type: 'POST',
            url: '/pogoda',
            data: { 'miasto': miasto },
            success: function (data) {
                $('#infoPogody').html(formatujOdpowiedzPogody(data));
                setCookie("miasto", miasto, 7);
            }
        });
    });

    function formatujOdpowiedzPogody(odpowiedz) {
        var danePogodowe = JSON.parse(odpowiedz);

        var sformatowanaOdpowiedz = "<div class='karta-pogody'>";

        sformatowanaOdpowiedz += "<h2><b>Pogoda w " + danePogodowe.name + ":</b></h2>";

        var opisPogody = {
            "clear sky": "czyste niebo",
            "few clouds": "małe zachmurzenie",
            "scattered clouds": "rozproszone chmury",
            "broken clouds": "rozproszone chmury",
            "overcast clouds": "pochmurno",
            "light rain": "lekki deszcz",
            "moderate rain": "umiarkowany deszcz",
            "heavy intensity rain": "intensywny deszcz",
            "very heavy rain": "bardzo silny deszcz",
            "extreme rain": "ekstremalny deszcz",
            "freezing rain": "marznący deszcz",
            "light intensity shower rain": "lekki deszcz",
            "shower rain": "przelotne opady deszczu",
            "heavy intensity shower rain": "intensywne przelotne opady deszczu",
            "ragged shower rain": "burze deszczu",
            "light snow": "lekki śnieg",
            "snow": "śnieg",
            "heavy snow": "ciężki śnieg",
            "sleet": "śnieg z deszczem",
            "shower sleet": "śnieg z deszczem",
            "light rain and snow": "lekki deszcz ze śniegiem",
            "rain and snow": "deszcz ze śniegiem",
            "light shower snow": "lekki opad śniegu",
            "shower snow": "opad śniegu",
            "heavy shower snow": "ciężki opad śniegu",
            "mist": "mgła",
            "smoke": "dym",
            "haze": "mgła",
            "sand/ dust whirls": "wirujący piasek/kurz",
            "fog": "mgła",
            "sand": "piasek",
            "dust": "kurz",
            "volcanic ash": "pył wulkaniczny",
            "squalls": "szkwał",
            "tornado": "tornado",
            "clear": "czyste niebo"
        };

        var opis = opisPogody[danePogodowe.weather[0].description.toLowerCase()] || danePogodowe.weather[0].description;

        sformatowanaOdpowiedz += "<p>Opis pogody: <b>" + opis + "</b></p>";

        sformatowanaOdpowiedz += "<p>Temperatura: <b>" + (danePogodowe.main.temp - 273.15).toFixed(2) + " °C</b></p>";

        sformatowanaOdpowiedz += "<p>Odczuwalna temperatura: <b>" + (danePogodowe.main.feels_like - 273.15).toFixed(2) + " °C</b></p>";

        sformatowanaOdpowiedz += "<p>Minimalna temperatura: <b>" + (danePogodowe.main.temp_min - 273.15).toFixed(2) + " °C</b></p>";

        sformatowanaOdpowiedz += "<p>Maksymalna temperatura: <b>" + (danePogodowe.main.temp_max - 273.15).toFixed(2) + " °C</b></p>";

        sformatowanaOdpowiedz += "<p>Ciśnienie: <b>" + danePogodowe.main.pressure + " hPa</b></p>";

        sformatowanaOdpowiedz += "<p>Wilgotność: <b>" + danePogodowe.main.humidity + "%</b></p>";

        sformatowanaOdpowiedz += "<p>Prędkość wiatru: <b>" + danePogodowe.wind.speed + " m/s</b></p>";

        sformatowanaOdpowiedz += "<p>Zachmurzenie: <b>" + danePogodowe.clouds.all + "%</b></p>";

        var czasWschoduSlonca = new Date(danePogodowe.sys.sunrise * 1000);

        var godzinaWschodu = czasWschoduSlonca.getHours();

        var minutaWschodu = czasWschoduSlonca.getMinutes();

        sformatowanaOdpowiedz += "<p>Wschód słońca: <b>" + godzinaWschodu + ":" + (minutaWschodu < 10 ? '0' : '') + minutaWschodu + "</b></p>";

        var czasZachoduSlonca = new Date(danePogodowe.sys.sunset * 1000);

        var godzinaZachodu = czasZachoduSlonca.getHours();

        var minutaZachodu = czasZachoduSlonca.getMinutes();

        sformatowanaOdpowiedz += "<p>Zachód słońca: <b>" + godzinaZachodu + ":" + (minutaZachodu < 10 ? '0' : '') + minutaZachodu + "</b></p>";

        sformatowanaOdpowiedz += "</div>";

        return sformatowanaOdpowiedz;
    }
});

    function ustawCiasteczko(nazwa, wartosc, dni) {
        var wygasa = "";
        if (dni) {
            var data = new Date();
            data.setTime(data.getTime() + (dni * 24 * 60 * 60 * 1000));
            wygasa = "; wygasa=" + data.toUTCString();
        }
        document.cookie = nazwa + "=" + (wartosc || "") + wygasa + "; ścieżka=/";
    }

    function pobierzCiasteczko(nazwa) {
        var nazwaEQ = nazwa + "=";
        var ciasteczka = document.cookie.split(';');
        for (var i = 0; i < ciasteczka.length; i++) {
            var ciasteczko = ciasteczka[i];
            while (ciasteczko.charAt(0) === ' ') {
                ciasteczko = ciasteczko.substring(1, ciasteczko.length);
            }
            if (ciasteczko.indexOf(nazwaEQ) === 0) {
                return ciasteczko.substring(nazwaEQ.length, ciasteczko.length);
            }
        }
        return null;
    }