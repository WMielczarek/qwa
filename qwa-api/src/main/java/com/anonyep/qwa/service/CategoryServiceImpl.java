package com.anonyep.qwa.service;

import com.anonyep.qwa.model.Category;
import com.anonyep.qwa.model.Quiz;
import com.anonyep.qwa.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository){
        this.categoryRepository=categoryRepository;
    }

    public Category findByName(String categoryName) {
        if(this.categoryRepository.findById(categoryName).isEmpty()){
            throw new EntityNotFoundException("Could not find category");
        }

        return this.categoryRepository.findById(categoryName).get();
    }

    public Category saveCategory(Category newGenre) {
        if(this.categoryRepository.findById(newGenre.getName()).isPresent())
            throw new EntityExistsException("Category already exist");

        return this.categoryRepository.save(newGenre);
    }

    public void deleteCategory(String categoryName) {
        Optional<Category> category = this.categoryRepository.findById(categoryName);
        if(category.isEmpty())
            throw new EntityNotFoundException("Category doesnt exist");
        else {
            this.categoryRepository.delete(category.get());
        }
    }

    public List<Category> findAllCategories() {
        return this.categoryRepository.findAll();
    }


}
