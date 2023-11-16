package com.example.projectmg.project;

import java.time.LocalDate;
import java.util.List;

public class ProjectDto {
    private String title;
    private String description;
    private LocalDate deadline;
    private Long ownerId;

    private List<String> goalsIds;
}
