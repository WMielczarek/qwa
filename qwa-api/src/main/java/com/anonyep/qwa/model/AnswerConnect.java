package com.anonyep.qwa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name="answer_connect")
public class AnswerConnect {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(min=3, max=100)
    private String leftText;

    @NotEmpty
    @Size(min=3, max=100)
    private String rightText;

    @ManyToOne
    @JoinColumn(name="question_id")
    @JsonIgnore
    private Question question;


}
