package com.example.projectmg.Controller;

import com.example.projectmg.JPA.*;
import com.example.projectmg.goal.Goal;
import com.example.projectmg.goal.GoalRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/reports")
@AllArgsConstructor
public class ReportController {
    private final ProjectRepository projectRepository;
    private final GoalRepository goalRepository;
    private final TaskRepository taskRepository;

    @GetMapping("/summary")
    public ResponseEntity<ProjectSummaryReport> getSummary(Authentication authentication) {
        List<Project> projects = projectRepository.findAllByOwnerUsername(authentication.getName());

        int totalGoals = 0;
        int totalTasks = 0;
        int completedTasks = 0;
        List<ProjectSummary> projectSummaries = new ArrayList<>();

        for (Project project : projects) {
            List<Goal> goals = goalRepository.findAllByProjectId(project.getId());
            totalGoals += goals.size();

            int projectTasks = 0;
            int projectCompleted = 0;

            for (Goal goal : goals) {
                List<Task> tasks = taskRepository.findAllByGoalId(goal.getId());
                projectTasks += tasks.size();
                for (Task task : tasks) {
                    if (task.isCompleted()) projectCompleted++;
                }
            }

            totalTasks += projectTasks;
            completedTasks += projectCompleted;

            projectSummaries.add(new ProjectSummary(
                    project.getId(),
                    project.getTitle(),
                    goals.size(),
                    projectTasks,
                    projectCompleted
            ));
        }

        int pendingTasks = totalTasks - completedTasks;
        double completionRate = totalTasks > 0 ? (double) completedTasks / totalTasks * 100 : 0.0;
        completionRate = Math.round(completionRate * 100.0) / 100.0;

        ProjectSummaryReport report = new ProjectSummaryReport(
                projects.size(),
                totalGoals,
                totalTasks,
                completedTasks,
                pendingTasks,
                completionRate,
                projectSummaries
        );

        return ResponseEntity.ok(report);
    }

    @GetMapping("/projects/{projectId}")
    public ResponseEntity<ProjectDetailReport> getProjectReport(
            Authentication authentication,
            @PathVariable Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NoSuchElementException("Project not found"));

        if (!project.getOwner().getUsername().equals(authentication.getName())) {
            throw new AccessDeniedException("User does not have permission to access this project's report");
        }

        List<Goal> goals = goalRepository.findAllByProjectId(projectId);
        List<GoalReport> goalReports = new ArrayList<>();

        int totalTasks = 0;
        int completedTasks = 0;

        for (Goal goal : goals) {
            List<Task> tasks = taskRepository.findAllByGoalId(goal.getId());
            int goalCompleted = 0;
            for (Task task : tasks) {
                if (task.isCompleted()) goalCompleted++;
            }

            totalTasks += tasks.size();
            completedTasks += goalCompleted;

            goalReports.add(new GoalReport(
                    goal.getId(),
                    goal.getTitle(),
                    goal.getDescription(),
                    goal.getDeadline(),
                    tasks.size(),
                    goalCompleted
            ));
        }

        int pendingTasks = totalTasks - completedTasks;
        double completionRate = totalTasks > 0 ? (double) completedTasks / totalTasks * 100 : 0.0;
        completionRate = Math.round(completionRate * 100.0) / 100.0;

        ProjectDetailReport report = new ProjectDetailReport(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCreatedAt(),
                project.getDeadline(),
                goals.size(),
                totalTasks,
                completedTasks,
                pendingTasks,
                completionRate,
                goalReports
        );

        return ResponseEntity.ok(report);
    }

    @Data
    @AllArgsConstructor
    static class ProjectSummaryReport {
        private int totalProjects;
        private int totalGoals;
        private int totalTasks;
        private int completedTasks;
        private int pendingTasks;
        private double completionRate;
        private List<ProjectSummary> projects;
    }

    @Data
    @AllArgsConstructor
    static class ProjectSummary {
        private Long id;
        private String title;
        private int goalCount;
        private int taskCount;
        private int completedTasks;
    }

    @Data
    @AllArgsConstructor
    static class ProjectDetailReport {
        private Long id;
        private String title;
        private String description;
        private Timestamp createdAt;
        private Date deadline;
        private int totalGoals;
        private int totalTasks;
        private int completedTasks;
        private int pendingTasks;
        private double completionRate;
        private List<GoalReport> goals;
    }

    @Data
    @AllArgsConstructor
    static class GoalReport {
        private Long id;
        private String title;
        private String description;
        private LocalDate deadline;
        private int totalTasks;
        private int completedTasks;
    }
}
