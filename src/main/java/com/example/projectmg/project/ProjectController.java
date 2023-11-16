package com.example.projectmg.project;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@AllArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    //Crud
    @GetMapping
    public List<Project> allProjects() {
        return projectService.findAll();
    }

    @PostMapping
    public Project createProject(@RequestBody ProjectDto projectDto) {
        return projectService.create(projectDto);
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectService.findById(id);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto) {
        return projectService.update(id, projectDto);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.delete(id);
    }
}