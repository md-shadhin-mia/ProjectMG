package com.example.projectmg.goal;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
@AllArgsConstructor
public class GoalController {
    private final GoalService goalService;

    //Crud
    @GetMapping
    public List<Goal> allGoals() {
        return goalService.findAll();
    }

    @PostMapping
    public Goal createGoal(@RequestBody GoalDto goalDto) {
        return goalService.create(goalDto);
    }

    @GetMapping("/{id}")
    public Goal getGoal(@PathVariable Long id) {
        return goalService.findById(id);
    }

    @PutMapping("/{id}")
    public Goal updateGoal(@PathVariable Long id, @RequestBody GoalDto goalDto) {
        return goalService.update(id, goalDto);
    }

    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable Long id) {
        goalService.delete(id);
    }
}