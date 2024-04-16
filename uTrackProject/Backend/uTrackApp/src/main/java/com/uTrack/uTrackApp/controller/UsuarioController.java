package com.uTrack.uTrackApp.controller;

import com.uTrack.uTrackApp.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
    @Autowired
    UsuarioRepository usuarioRepository;

}
