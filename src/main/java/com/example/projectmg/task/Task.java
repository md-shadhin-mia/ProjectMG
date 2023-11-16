package com.example.projectmg.task;

import com.example.projectmg.core.BaseEntity;
import com.example.projectmg.goal.Goal;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Task extends BaseEntity {
    private String title;
    private String description;
    private LocalDate deadline;
    @ManyToOne
    private Goal goal;
}
