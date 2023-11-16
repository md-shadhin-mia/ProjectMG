package com.example.projectmg.project;

import com.example.projectmg.authentication.User;
import com.example.projectmg.core.BaseEntity;
import com.example.projectmg.goal.Goal;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Project extends BaseEntity {
    private String title;
    private String description;
    private LocalDate deadline;

    @ManyToOne
    private User owner;

    @OneToMany(mappedBy = "project")
    private List<Goal> goals;


}
