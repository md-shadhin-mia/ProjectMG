package com.example.projectmg.JPA;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String profileImage;

    private String coverImage;

    private String mobileNumber;

    private String email;

    private String profession;

    private String location;

    private String details;
    private String description;

    @OneToOne
    @JsonIgnore
    private User user;
}
