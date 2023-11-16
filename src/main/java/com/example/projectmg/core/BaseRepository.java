package com.example.projectmg.core;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface BaseRepository<E> extends JpaRepository<E, Long> {

}
