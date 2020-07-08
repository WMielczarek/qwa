package com.anonyep.qwa.service;

import com.anonyep.qwa.model.User;
import com.anonyep.qwa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;

@Service
public class UserServiceImpl {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByName(String username) {

        if(this.userRepository.findByUsername(username).isEmpty()) {
            throw new EntityExistsException("Could not find user");
        }

        return this.userRepository.findByUsername(username).get();
    }
}
