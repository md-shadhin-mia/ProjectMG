package com.example.projectmg.goal;

import com.example.projectmg.core.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends BaseRepository<Goal> {
    List<Goal> findAllByProjectId(Long id);
}
