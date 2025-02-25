package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KundeRepository {

    @Autowired
    public JdbcTemplate db;


    public void lagreKunde(Kunde innKunde) {
        String sql = "INSERT INTO Kunde (film,antall,fornavn,etternavn,telefonnr,epost) VALUES(?,?,?,?,?,?)";
        db.update(sql,innKunde.getFilm(),innKunde.getAntall(),innKunde.getFornavn(),
                innKunde.getEtternavn(),innKunde.getTelefonnr(),innKunde.getEpost());
    }

    public List<Kunde> hentAlleKunder(){
        String sql = "SELECT * FROM Kunde";
        List <Kunde> alleKunder = db.query(sql, new BeanPropertyRowMapper(Kunde.class));
        return alleKunder;
    }

    public void slettAlleKunder(){
        String sql = "DELETE FROM Kunde";
        db.update(sql);
    }
}
