package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RegistrerteBilletter {

    public static final List<Kunde> alleKunder = new ArrayList<>();

    @Autowired
    private KundeRepository rep;

    @GetMapping("/lagreKunde")
    public void lagreKunde(Kunde enKunde){
        rep.lagreKunde(enKunde);
    }

    @GetMapping("/skrivUtAlt")
    public List<Kunde> skrivUtAlt(){
        return rep.hentAlleKunder();
    }

    @GetMapping("/slettTabell")
    public void slettTabell(){
        rep.slettAlleKunder();
    }

}
