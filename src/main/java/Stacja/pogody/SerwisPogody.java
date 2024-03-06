package Stacja.pogody;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SerwisPogody {

    @Value("${openweathermap.api.key}")
    private String kluczApi;

    private final String apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={miasto}&appid={kluczApi}";

    private final RestTemplate restTemplate;

    public SerwisPogody(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String pobierzPogode(String miasto) {
        String url = apiUrl.replace("{miasto}", miasto).replace("{kluczApi}", kluczApi);
        return restTemplate.getForObject(url, String.class);
    }
}