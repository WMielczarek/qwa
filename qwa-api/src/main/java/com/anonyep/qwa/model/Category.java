package com.anonyep.qwa.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


@Getter
@Setter
@Entity
@Table(name="category")
public class Category {

    @Id
    @NotEmpty
    @Size(min = 2, max = 20)
    private String name;

    @Size(min = 5, max = 200)
    private String description;


}
