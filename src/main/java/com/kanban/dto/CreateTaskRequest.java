package com.kanban.dto;

import com.kanban.entity.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTaskRequest {
    @NotBlank(message = "Task title is required")
    private String title;

    private String description;
    private TaskPriority priority;
    private String assigneeName;
    private LocalDate dueDate;

    @NotNull(message = "Column ID is required")
    private Long columnId;
}