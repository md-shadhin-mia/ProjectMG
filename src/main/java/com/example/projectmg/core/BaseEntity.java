package com.example.projectmg.core;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;


@MappedSuperclass
@Data
public abstract class BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
