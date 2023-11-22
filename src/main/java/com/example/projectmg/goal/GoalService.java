package com.example.projectmg.goal;


import com.example.projectmg.core.BaseRepository;
import com.example.projectmg.core.BaseService;
import org.springframework.stereotype.Service;

@Service
public class GoalService extends BaseService<Goal, GoalDto> {
    public GoalService(GoalRepository repository) {
        super(repository);
    }
}
