package com.example.projectmg.JPA;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"projects", "profile"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    String username;
    private String firstName , lastName;
    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private List<Project> projects;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Profile profile;
}
