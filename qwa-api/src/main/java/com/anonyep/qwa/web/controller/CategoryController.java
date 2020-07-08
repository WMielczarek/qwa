package com.anonyep.qwa.web.controller;

import com.anonyep.qwa.model.Category;
import com.anonyep.qwa.model.Quiz;
import com.anonyep.qwa.service.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private CategoryServiceImpl categoryService;

    @Autowired
    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/add")
    //@PreAuthorize("hasRole('USER')")
    @ResponseStatus(HttpStatus.CREATED)
    public Category addNewCategory(@RequestBody @Valid Category newCategory) {
        return this.categoryService.saveCategory(newCategory);
    }

    @DeleteMapping("/delete/{category}")
    //@PreAuthorize
    @ResponseStatus(HttpStatus.OK)
    public void deleteCategory(@PathVariable String category) {
        this.categoryService.deleteCategory(category);
    }

    @GetMapping("/all")
    //@PreAuthorize
    @ResponseStatus(HttpStatus.OK)
    public List<Category> findAll() {
        return this.categoryService.findAllCategories();
    }

    @GetMapping("/find/{category_name}")
    //@PreAuthorize()
    @ResponseStatus(HttpStatus.OK)
    public Category findByName(@PathVariable String category_name) {
        return this.categoryService.findByName(category_name);

    }

}
