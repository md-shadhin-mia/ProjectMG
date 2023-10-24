package com.example.projectmg.Services;

import com.example.projectmg.JPA.Project;
import com.example.projectmg.JPA.ProjectRepository;
import com.example.projectmg.JPA.User;
import com.example.projectmg.JPA.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class ProjectService {
/*    ProjectRepository projectRepository;
    UserRepository userRepository;

    public List<Project> findAllByAuth(Authentication auth){
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        return projectRepository.findAllByOwner(user);
    }

    public Project createProject(Authentication auth, Project project) {
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        project.setOwner(user);
        return projectRepository.save(project);
    }

    public Project updateProject(Authentication auth, Long id, Project updateProject) {
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Project project = projectRepository.findAllByOwnerAndId(user, id).orElseThrow(() -> new NoSuchElementException("Project not found"));
        if(!user.getId().equals(project.getOwner().getId()))
            throw new AccessDeniedException("User does not have permission to update the project");
        if(updateProject.getTitle()!=null)
            project.setTitle(updateProject.getTitle());
        if(updateProject.getDescription()!=null)
            project.setDescription(updateProject.getDescription());
        if(updateProject.getDeadline()!=null)
            project.setDeadline(updateProject.getDeadline());
        return projectRepository.save(project);
    }

    public Project getProject(Authentication auth, Long id) {
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Project project = projectRepository.findAllByOwnerAndId(user, id)
                .orElseThrow(() -> new NoSuchElementException("Project not found"));
        if(!user.getId().equals(project.getOwner().getId()))
            throw new AccessDeniedException("User does not have permission to update the project");
        return project;
    }

    public void deleteProject(Authentication auth, Long id) {
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Project project = projectRepository.findAllByOwnerAndId(user, id)
                .orElseThrow(() -> new NoSuchElementException("Project not found"));
        if(!user.getId().equals(project.getOwner().getId()))
            throw new AccessDeniedException("User does not have permission to update the project");
        projectRepository.delete(project);
    }*/
}
