package com.anonyep.qwa.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizForm {

    private String name;

    private String text;

    private String category;

    private String difficultRate;

    private String solvedTimes;
}
