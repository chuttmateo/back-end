package com.grupo2.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController()
public class CursosController {

    @GetMapping("/listar")
    public List<Curso> listarCursos(){
        return Arrays.asList(new Curso("piloto", 1500.0),new Curso("piloto2", 1100.0));
    }
}
