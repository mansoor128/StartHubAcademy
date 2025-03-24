# Task App – NestJS To-Do List with ELK Logging

## Overview  
This is a simple to-do list application built using NestJS and MongoDB, containerized with Docker, and integrated with the ELK Stack (Elasticsearch, Logstash, Kibana) for logging and visualization.

## Tech Stack
- **Backend**: NestJS (TypeScript, Express)
- **Database**: MongoDB
- **Logging**: JSON logs with Logstash forwarding to Elasticsearch
- **Visualization**: Kibana Dashboard
- **Containerization**: Docker and Docker Compose

---

## Why Dockerize Each Service?

| Service        | Reason for Dockerization |
|---------------|------------------------|
| **NestJS App**  | Ensures consistency in dependencies, environment setup, and scalability. |
| **MongoDB**  | Avoids local installation issues and makes the database portable. |
| **Elasticsearch** | Provides a self-contained instance of the log storage. |
| **Kibana** | Allows centralized visualization of logs without external dependencies. |
| **Logstash** | Enables log collection and forwarding in a reproducible environment. |
| **Ubuntu Log Writer** | Simulates log generation to test ELK functionality. |

---

## How to Run the Application  

### Prerequisites:
- Docker & Docker Compose installed

### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/task-app.git
   cd task-app
   ```
2. Run the application using Docker Compose:
   ```sh
   docker-compose up -d
   ```
3. Access the services:
   - **NestJS API**: [http://localhost:3000](http://localhost:3000)
   - **MongoDB**: `mongodb://localhost:27017`
   - **Kibana Dashboard**: [http://localhost:5601](http://localhost:5601)

---

## API Usage (cURL Commands)

### Create a Task
```sh
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"task": "Complete NestJS tutorial"}'
```

### Update a Task
```sh
curl -X PUT http://localhost:3000/tasks/67e05b1d3e3fbf7d822c6684 -H "Content-Type: application/json" -d '{"task": "Update NestJS project"}'
```

### Edit a Task Description
```sh
curl -X PUT http://localhost:3000/tasks/edit/67e05be83e3fbf7d822c6688 -H "Content-Type: application/json" -d '{"task": "Edited task description"}'
```

### Delete a Task
```sh
curl -X DELETE http://localhost:3000/tasks/67e05b1d3e3fbf7d822c6684
```

### Get All Tasks
```sh
curl -X GET http://localhost:3000/tasks
```

---

## Logging Implementation

### How Logs Are Generated:
- Logs are written in JSON format to the `/app/logs` directory inside the `task-app` container.
- Logstash reads logs from this directory and forwards them to Elasticsearch.

### Example Log Entry:
```json
{
  "timestamp": "2025-03-24T12:00:00Z",
  "level": "info",
  "message": "Task created successfully",
  "taskId": "65f2c2c4e01c4f001c8a5a7b"
}
```

### Steps to Access Kibana Dashboard:
1. Open Kibana: [http://localhost:5601](http://localhost:5601)
2. Navigate to **"Discover"**.
3. Select the appropriate index pattern (`logstash-*`).
4. View CRUD operation logs.

---

## Screenshots of Kibana Dashboard  
(Screenshots showing visualized logs should be added here)

---

## Additional Notes
- If you need to stop the services, run:
  ```sh
  docker-compose down
  ```
- To rebuild after changes:
  ```sh
  docker-compose up --build -d
  ```

---

