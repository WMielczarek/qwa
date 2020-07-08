package com.anonyep.qwa.service;

import com.anonyep.qwa.model.Type;
import com.anonyep.qwa.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class TypeServiceImpl {

    private TypeRepository typeRepository;

    @Autowired
    public TypeServiceImpl(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public Type findById(Long typeId) {
        if(this.typeRepository.findById(typeId).isEmpty())
            throw new EntityNotFoundException("This type does not exist");
        return this.typeRepository.findById(typeId).get();
    }
}
