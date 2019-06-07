package com.cezaram28.Assignment1.controller;

import com.cezaram28.Assignment1.service.TagManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TagsController {

    private final TagManagementService tagManagementService;

    @GetMapping("/tags")
    public List<String> loadTags(){
        return tagManagementService.listTags();
    }
}
