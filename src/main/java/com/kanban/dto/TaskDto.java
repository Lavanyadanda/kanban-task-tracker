package com.kanban.dto;

import com.kanban.entity.TaskPriority;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class TaskDto {
    private Long id;
    private String title;
    private String description;
    private TaskPriority priority;
    private String assigneeName;
    private LocalDate dueDate;
    private Integer position;
    private Long columnId;
    private LocalDateTime createdAt;
}