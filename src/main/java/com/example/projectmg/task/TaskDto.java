package com.example.projectmg.task;

import com.example.projectmg.core.BaseDto;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskDto extends BaseDto {
    private String title;
    private String description;
    private LocalDate deadline;
    private Long goalId;
}
