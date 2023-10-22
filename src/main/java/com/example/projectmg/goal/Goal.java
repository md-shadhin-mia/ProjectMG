package com.example.projectmg.goal;

import com.example.projectmg.JPA.Project;
import com.example.projectmg.JPA.Task;
import com.example.projectmg.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
