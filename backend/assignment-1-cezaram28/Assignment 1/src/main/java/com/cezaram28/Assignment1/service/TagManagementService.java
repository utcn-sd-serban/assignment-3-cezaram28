package com.cezaram28.Assignment1.service;

import com.cezaram28.Assignment1.entity.Tag;
import com.cezaram28.Assignment1.exception.TagNotFoundException;
import com.cezaram28.Assignment1.repository.RepositoryFactory;
import com.cezaram28.Assignment1.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagManagementService {

    private final RepositoryFactory repositoryFactory;

    @Transactional
    public Tag addTag(Tag tag){ return repositoryFactory.createTagRepository().save(tag);}

    @Transactional
    public void remove(int id) {
        TagRepository repository = repositoryFactory.createTagRepository();
        Tag tag = repository.findById(id).orElseThrow(TagNotFoundException::new);
        repository.remove(tag);
    }

    @Transactional
    public List<String> listTags() {
        List<Tag> tags = repositoryFactory.createTagRepository().findAll();
        //if(tags.isEmpty()) throw new TagNotFoundException();
        return tags.stream().map(Tag::getName).collect(Collectors.toList());
    }

    @Transactional
    public ArrayList<Tag> addTags(List<String> t) {
        ArrayList<Tag> tags = new ArrayList<Tag>();
        t.forEach(tag -> tags.add(new Tag(null, tag)));
        tags.forEach(tag -> tag.setId(addTag(tag).getId()));
        return tags;
    }

    @Transactional
    public Tag findById(int id) { return repositoryFactory.createTagRepository().findById(id).orElseThrow(TagNotFoundException::new);}
}
