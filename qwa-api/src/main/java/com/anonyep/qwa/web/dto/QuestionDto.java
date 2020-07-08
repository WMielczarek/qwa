package com.anonyep.qwa.web.dto;

import com.anonyep.qwa.model.Type;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionDto {
    private String quizId;
    private String text;
    private Type type;
}
