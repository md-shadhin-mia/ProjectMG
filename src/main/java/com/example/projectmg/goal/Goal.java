package com.example.projectmg.goal;


import com.example.projectmg.core.BaseEntity;
import com.example.projectmg.project.Project;
import com.example.projectmg.task.Task;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;



@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Goal extends BaseEntity {

    private String title;
    private String description;
    private LocalDate deadline;
    @ManyToOne
    private Project project;
    @OneToMany(mappedBy = "goal")
    private List<Task> tasks;
}
