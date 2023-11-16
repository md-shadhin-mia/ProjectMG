package com.example.projectmg.project;

import com.example.projectmg.core.BaseRepository;
import com.example.projectmg.core.BaseService;
import org.springframework.stereotype.Service;

@Service
public class ProjectService extends BaseService<Project, ProjectDto> {
    public ProjectService(BaseRepository<Project> repository) {
        super(repository);
    }
}
