package com.example.projectmg;

import lombok.Data;

@Data
public class ErrorResponse {
    private String errorCode, errorMessage;
}
