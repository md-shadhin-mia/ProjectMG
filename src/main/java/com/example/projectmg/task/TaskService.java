package com.example.projectmg.task;

import com.example.projectmg.core.BaseRepository;
import com.example.projectmg.core.BaseService;
import org.springframework.stereotype.Service;

@Service
public class TaskService extends BaseService<Task, TaskDto> {
    public TaskService(TaskRepository repository) {
        super(repository);
    }
}
