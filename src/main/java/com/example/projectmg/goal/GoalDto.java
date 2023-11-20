package com.example.projectmg.goal;

import lombok.Data;

import java.time.LocalDate;

@Data
public class GoalDto {
    private String title;
    private String description;
    private LocalDate deadline;
    private Long projectId;
}
