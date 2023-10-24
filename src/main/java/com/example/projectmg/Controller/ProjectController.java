package com.example.projectmg.Controller;

import com.example.projectmg.JPA.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@AllArgsConstructor
public class ProjectController {


    private final ProjectRepository projectRepository;
    private final GoalRepository goalRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<Project> showAuthProjects(Authentication authentication){
        return projectRepository.findAllByOwnerUsername(authentication.getName());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Project> showAuthProject(Authentication authentication , @PathVariable Long id){
        Optional<Project> project = projectRepository.findById(id);
        if(!project.get().getOwner().getUsername().equals(authentication.getName())){
            throw new AccessDeniedException("User does not have permission to delete project");
        }
        return ResponseEntity.ok(project.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> UpdateAuthProject(Authentication authentication , @PathVariable Long id, @RequestBody Project updateProject){
        Optional<Project> project = projectRepository.findById(id);
        if(!project.get().getOwner().getUsername().equals(authentication.getName())){
            throw new AccessDeniedException("User does not have permission to delete project");
        }
        return ResponseEntity.ok(project.get());
    }
    @PostMapping
    public ResponseEntity<Project> createProject(Authentication authentication, @RequestBody Project project) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        project.setOwner(user);
        return ResponseEntity.ok(projectRepository.save(project));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity deleteProject(Authentication authentication,
                                        @PathVariable Long projectId){
        Optional<Project> project = projectRepository.findById(projectId);
        if (project.isPresent() && project.get().getOwner().getUsername().equals(authentication.getName()))
        {
            projectRepository.delete(project.get());
            return ResponseEntity.noContent().build();
        }
        else throw new AccessDeniedException("User does not have permission to delete project");
    }

// Goals opation
    @PostMapping("/{projectId}/goals")
    public ResponseEntity<Goal> addGoalToProject(Authentication authentication,
                                                 @PathVariable Long projectId,
                                                 @RequestBody Goal goal) {
        Project project = projectRepository.findById(projectId).orElseThrow(
                 () -> new NoSuchElementException("Project not found"));
        if (!project.getOwner().getUsername().equals(authentication.getName()))
            throw new AccessDeniedException("User does not have permission to add Goal");
        goal.setProject(project);
        return ResponseEntity.ok(goalRepository.save(goal));
    }

    @GetMapping("/{projectId}/goals/{goalId}")
    public ResponseEntity<Goal> viewAGoal(Authentication authentication,
                                           @PathVariable Long projectId,
                                           @PathVariable Long goalId
                                           ) {
        Goal existingGoal = goalRepository.findById(goalId).orElseThrow(() -> new NoSuchElementException("Goal not found"));

        return ResponseEntity.ok(existingGoal);
    }

    @GetMapping("/{projectId}/goals")
    public List<Goal> getGoalsFromProject(Authentication authentication,
                                                 @PathVariable Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(
                () -> new NoSuchElementException("Project not found"));
        if (!project.getOwner().getUsername().equals(authentication.getName()))
            throw new AccessDeniedException("User does not have permission to add Goal");

        return goalRepository.findAllByProjectId(projectId);
    }


    @PutMapping("/{projectId}/goals/{goalId}")
    public ResponseEntity<Goal> updateGoal(Authentication authentication,
                                           @PathVariable Long projectId,
                                           @PathVariable Long goalId,
                                           @RequestBody Goal goal) {
        Goal existingGoal = goalRepository.findById(goalId).orElseThrow(() -> new NoSuchElementException("Goal not found"));
        if(goal.getTitle() != null)existingGoal.setTitle(goal.getTitle());
        if(goal.getDescription() != null)existingGoal.setDescription(goal.getDescription());
        if(goal.getDeadline() != null)existingGoal.setDeadline(goal.getDeadline());
        return ResponseEntity.ok(goalRepository.save(existingGoal));
    }

    @DeleteMapping("/{projectId}/goals/{goalId}")
    public ResponseEntity deleteGoal(Authentication authentication,
                                     @PathVariable Long projectId,
                                     @PathVariable Long goalId) {
        goalRepository.deleteById(goalId);
        return ResponseEntity.ok().build();
    }

    //task manipulate
    @PostMapping("/{projectId}/goals/{goalId}/tasks")
    public ResponseEntity<Task> addTaskToGoal(Authentication authentication,
                                              @PathVariable Long projectId,
                                              @PathVariable Long goalId,
                                              @RequestBody Task task) {
        Goal goal = goalRepository.findById(goalId).orElseThrow(
                () -> new NoSuchElementException("Goal not found"));
        task.setGoal(goal);
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @GetMapping("/{projectId}/goals/{goalId}/tasks")
    public List<Task> showTasksFromGoal(Authentication authentication,
                                              @PathVariable Long projectId,
                                              @PathVariable Long goalId) {

        return taskRepository.findAllByGoalId(goalId);
    }
    @PutMapping("/{projectId}/goals/{goalId}/tasks/{taskId}")
    public ResponseEntity<Task> completeTask(Authentication authentication,
                                             @PathVariable Long projectId,
                                             @PathVariable Long goalId,
                                             @PathVariable Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new NoSuchElementException("Task not found"));
        if (!task.getGoal().getProject().getOwner().getUsername().equals(authentication.getName()) )
            throw new AccessDeniedException("User does not have permission to complete the task");
        task.setCompleted(true);
        task.setCompletedAt(Timestamp.from(Instant.now()));
        return ResponseEntity.ok(taskRepository.save(task));
    }

}
