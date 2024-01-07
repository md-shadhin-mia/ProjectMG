package com.example.projectmg.JPA;

import com.example.projectmg.goal.Goal;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String title;
    private String description;
    private String status;
    private int priority;
    private boolean completed;
    @Column(name = "completed_at")
    private Timestamp completedAt;

    @ManyToOne
    @JsonIgnore
    private Goal goal;

    @ManyToOne
    @JsonIgnore
    private User assignee;

}
