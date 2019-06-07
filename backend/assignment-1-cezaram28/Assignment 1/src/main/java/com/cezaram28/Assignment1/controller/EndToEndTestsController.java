package com.cezaram28.Assignment1.controller;

import com.cezaram28.Assignment1.seed.Seed;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Profile("e2e")
@RestController
@RequiredArgsConstructor
public class EndToEndTestsController {
    private final Seed seed;

    @RequestMapping("/test/reseed")
    public void reseed(){
        seed.clear();
        seed.run();
    }
}
