# UserTasksService API Documentation

## Overview

The UserTasksService API allows clients to manage user tasks. This includes retrieving tasks, creating new tasks, updating existing tasks, and deleting tasks.

### Base URL

```
/UserTask
```

## Endpoints

### 1. Get User Tasks

#### GET `/UserTask/Get`

Retrieves all tasks for a specified user.

##### Parameters

- `UserName` (query, string): The username of the user whose tasks are to be retrieved.

##### Responses

- `200 OK`: Request was successful, and the tasks for the specified user are returned.

##### Example Request

```
GET /UserTask/Get?UserName=johndoe
```

### 2. Get User Tasks by Date

#### GET `/UserTask/GetByDate`

Retrieves tasks for a specified user on a particular date.

##### Parameters

- `UserName` (query, string): The username of the user whose tasks are to be retrieved.
- `date` (query, string, format: date-time): The date for which tasks are to be retrieved.

##### Responses

- `200 OK`: Request was successful, and the tasks for the specified user on the given date are returned.

##### Example Request

```
GET /UserTask/GetByDate?UserName=johndoe&date=2024-05-20T00:00:00Z
```

### 3. Create a New User Task

#### POST `/UserTask`

Creates a new task for a user.

##### Request Body

- `UserTask` (application/json, text/json, application/*+json): A JSON object representing the task to be created.

```json
{
  "userName": "johndoe",
  "taskName": "Task 1",
  "taskDescription": "Description of task 1",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "globalTaskId": "global-123",
  "category": "Work"
}
```

##### Responses

- `200 OK`: Task creation was successful.

##### Example Request

```
POST /UserTask
Content-Type: application/json

{
  "userName": "johndoe",
  "taskName": "Task 1",
  "taskDescription": "Description of task 1",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "globalTaskId": "global-123",
  "category": "Work"
}
```

### 4. Update an Existing User Task

#### PUT `/UserTask`

Updates an existing task for a user.

##### Request Body

- `UserTask` (application/json, text/json, application/*+json): A JSON object representing the task to be updated.

```json
{
  "_id": "task-456",
  "userName": "johndoe",
  "taskName": "Updated Task 1",
  "taskDescription": "Updated description of task 1",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "globalTaskId": "global-123",
  "category": "Work"
}
```

##### Responses

- `200 OK`: Task update was successful.

##### Example Request

```
PUT /UserTask
Content-Type: application/json

{
  "_id": "task-456",
  "userName": "johndoe",
  "taskName": "Updated Task 1",
  "taskDescription": "Updated description of task 1",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "globalTaskId": "global-123",
  "category": "Work"
}
```

### 5. Delete a User Task

#### DELETE `/UserTask`

Deletes a specified task for a user.

##### Parameters

- `taskId` (query, string): The ID of the task to be deleted.

##### Responses

- `200 OK`: Task deletion was successful.

##### Example Request

```
DELETE /UserTask?taskId=task-456
```

## Models

### UserTask

- `_id` (string, nullable): The unique identifier for the task.
- `userName` (string, nullable): The username of the user associated with the task.
- `taskName` (string, nullable): The name of the task.
- `taskDescription` (string, nullable): The description of the task.
- `taskStart` (string, format: date-time): The start time of the task.
- `taskEnd` (string, format: date-time): The end time of the task.
- `globalTaskId` (string, nullable): The global identifier for the task.
- `category` (string, nullable): The category of the task.

```json
{
  "_id": "string",
  "userName": "string",
  "taskName": "string",
  "taskDescription": "string",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "globalTaskId": "string",
  "category": "string"
}
```
