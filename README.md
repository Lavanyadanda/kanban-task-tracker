# Kanban Task Tracker

A full-stack task management application designed to streamline workflows through visual organization, real-time drag-and-drop operations, and performance analytics.

## About Kanban

**Kanban** (meaning "visual board" or "signboard" in Japanese) is an agile workflow management method designed to visualize work, limit work-in-progress, and maximize efficiency. By breaking projects down into distinct stage columns (such as *To Do*, *In Progress*, and *Done*), teams gain complete transparency into task progression, identify bottlenecks instantly, and maintain a steady rhythm of delivery.

## Project Overview

This application bridges the gap between clean backend architecture and a responsive user interface. Built as a portfolio-grade full-stack project, it provides a robust REST API powered by Spring Boot and a dynamic, interactive client interface built with React. Users can manage tasks end-to-end, filter records on the fly, monitor deadlines with automated alerts, and track productivity metrics through an integrated summary dashboard.

## Tech Stack

* **Backend:** Java 17, Spring Boot, Spring Data JPA, Hibernate, MySQL, Lombok
* **Frontend:** React, Vite, Axios, `@hello-pangea/dnd`

## Core Features

* **Drag-and-Drop Workflow:** Move tasks smoothly across workflow columns with live backend synchronization.
* **Instant Search & Multi-Filter Toolbar:** Filter items dynamically by keyword search, priority level, or assigned user.
* **Full CRUD Modals:** Click any task card to edit its properties or permanently delete it.
* **Due Date Tracking:** Dynamic visual badges highlighting overdue items and imminent deadlines.
* **Analytics Summary Ribbon:** Top-level metrics tracking completion rates and priority counts.

## Getting Started

1. Database Setup
Ensure your MySQL server is running and create the database schema:
```sql
CREATE DATABASE kanban_db;


2. Backend Setup
Navigate to the backend directory, configure your database credentials in src/main/resources/application.properties, and run the app:

./mvnw spring-boot:run

3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the development server:

npm install
npm run dev
