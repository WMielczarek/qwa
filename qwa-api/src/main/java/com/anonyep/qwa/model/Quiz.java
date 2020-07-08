package com.anonyep.qwa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Table(name = "quiz")
@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotEmpty
    @Size(min=3, max = 40)
    private String name;

    @NotEmpty
    @Size(min = 5, max = 1024)
    private String text;

    private Integer solvedTimes;

    private Double  rating;

    private Integer difficultRate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_name")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quiz", cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    private List<Question> questions = new ArrayList<>();

}
