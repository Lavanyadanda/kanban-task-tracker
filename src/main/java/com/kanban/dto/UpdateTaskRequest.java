package com.kanban.dto;

import com.kanban.entity.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTaskRequest {
    @NotBlank(message = "Title cannot be blank")
    private String title;

    private String description;

    @NotNull(message = "Priority is required")
    private TaskPriority priority;

    private LocalDate dueDate;
    private String assigneeName;
}