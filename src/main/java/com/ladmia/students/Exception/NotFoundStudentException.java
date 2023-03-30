package com.ladmia.students.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundStudentException extends RuntimeException{
    public NotFoundStudentException(String s) {
        super(s);
    }
}
