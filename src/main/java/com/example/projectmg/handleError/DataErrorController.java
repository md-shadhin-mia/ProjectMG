package com.example.projectmg.handleError;


import com.example.projectmg.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class DataErrorController {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleDataNotFound(NoSuchElementException exception) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ErrorResponse.builder().errorMessage(exception.getMessage()).build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleDataNotFound(Exception exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ErrorResponse
                                .builder()
                                .errorMessage(exception.getMessage())
                                .build()
                );
    }
}
