package com.example.projectmg.JPA;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class Goal {
    @Id
    @GeneratedValue
    private Long id;

}