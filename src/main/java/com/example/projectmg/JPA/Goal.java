package com.example.projectmg.JPA;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class Goal {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private LocalDate deadline;
    @ManyToOne
    @JsonIgnore
    private Project project;
    @OneToMany(mappedBy = "goal",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Task> tasks;

}