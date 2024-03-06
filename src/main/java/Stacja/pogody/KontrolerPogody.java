package Stacja.pogody;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class KontrolerPogody implements ErrorController {

    private final SerwisPogody serwisPogody;

    public KontrolerPogody(SerwisPogody serwisPogody) {
        this.serwisPogody = serwisPogody;
    }

    @GetMapping("/")
    public String stronaGlowna() {
        return "index";
    }

    @PostMapping("/pogoda")
    @ResponseBody
    public String pobierzPogode(@RequestParam String miasto) {
        return serwisPogody.pobierzPogode(miasto);
    }

    @RequestMapping("/error")
    public String przekierowanie404() {
        return "redirect:/";
    }
}
