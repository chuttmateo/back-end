package tpigrupo2.bacend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class UserController {
    @RequestMapping(value = "/user", method = RequestMethod.GET)

    public ResponseEntity<?> user() throws Exception{


//FALTA AGREGAR LOGICA ACA!!!!!

        return ResponseEntity.ok(user());

    }
}
