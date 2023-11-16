package com.example.projectmg.handleError;

// Import the necessary packages
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

// Annotate the class with @ControllerAdvice
@ControllerAdvice
public class CommonExceptionHandler {

    // Define a method to handle NullPointerException
    // Annotate it with @ExceptionHandler and @Order
    @ExceptionHandler(NullPointerException.class)
    @Order(1)
    public ResponseEntity<String> handleNullPointerException(NullPointerException e) {
        // Return a response entity with status code 400 and error message
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Null pointer exception occurred: " + e.getMessage());
    }

    // Define another method to handle IllegalArgumentException
    // Annotate it with @ExceptionHandler and @Order
    @ExceptionHandler(IllegalArgumentException.class)
    @Order(2)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        // Return a response entity with status code 400 and error message
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Illegal argument exception occurred: " + e.getMessage());
    }
}
