# GlobalTasksService API Documentation

## Overview

The GlobalTasksService API allows clients to manage global tasks. This includes retrieving all global tasks, creating new global tasks, updating existing global tasks, and deleting global tasks.

### Base URL

```
/GlobalTasks
```

## Endpoints

### 1. Get All Global Tasks

#### GET `/GlobalTasks`

Retrieves all global tasks.

##### Responses

- `200 OK`: Request was successful, and the list of global tasks is returned.

##### Example Request

```
GET /GlobalTasks
```

### 2. Create a New Global Task

#### POST `/GlobalTasks`

Creates a new global task.

##### Request Body

- `GlobalTask` (application/json, text/json, application/*+json): A JSON object representing the task to be created.

```json
{
  "taskName": "Global Task 1",
  "taskDescription": "Description of global task 1",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "participants": ["user1", "user2"]
}
```

##### Responses

- `200 OK`: Task creation was successful.

##### Example Request

```
POST /GlobalTasks
Content-Type: application/json

{
  "taskName": "Global Task 1",
  "taskDescription": "Description of global task 1",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "participants": ["user1", "user2"]
}
```

### 3. Update an Existing Global Task

#### PUT `/GlobalTasks`

Updates an existing global task.

##### Request Body

- `GlobalTask` (application/json, text/json, application/*+json): A JSON object representing the task to be updated.

```json
{
  "_id": "task-456",
  "taskName": "Updated Global Task 1",
  "taskDescription": "Updated description of global task 1",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "participants": ["user1", "user2", "user3"]
}
```

##### Responses

- `200 OK`: Task update was successful.

##### Example Request

```
PUT /GlobalTasks
Content-Type: application/json

{
  "_id": "Empty to outo create",
  "taskName": "Updated Global Task 1",
  "taskDescription": "Updated description of global task 1",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "participants": ["user1", "user2", "user3"]
}
```

### 4. Delete a Global Task

#### DELETE `/GlobalTasks`

Deletes a specified global task.

##### Parameters

- `taskId` (query, string): The ID of the task to be deleted.

##### Responses

- `200 OK`: Task deletion was successful.

##### Example Request

```
DELETE /GlobalTasks?taskId=task-456
```

## 6. Add new participant
This endpoint is used to add a participant to a global task. The participant can be specified by their username, or if the username is not provided, the current user's username will be used based on the JWT claims.

### Request Parameters

| Parameter      | Type   | Location  | Required | Description                                                        |
|----------------|--------|-----------|----------|--------------------------------------------------------------------|
| `username`     | string | Query/Body| No       | The username of the participant to be added to the global task.    |
| `globalTaskId` | string | Query/Body| Yes      | The unique identifier of the global task to which the participant is being added. |

### Request Example

#### Example 1: Providing a username
POST /AddParticipant  
Content-Type: application/json

{
    "username": "john.doe",
    "globalTaskId": "12345"
}

## Models

### GlobalTask

- `_id` (string, nullable): The unique identifier for the task.
- `taskName` (string, nullable): The name of the task.
- `taskDescription` (string, nullable): The description of the task.
- `taskStart` (string, format: date-time): The start time of the task.
- `taskEnd` (string, format: date-time): The end time of the task.
- `participants` (array of strings, nullable): The list of participants involved in the task.

```json
{
  "_id": "string",
  "taskName": "string",
  "taskDescription": "string",
  "taskStart": "2024-05-20T08:00:00Z",
  "taskEnd": "2024-05-20T10:00:00Z",
  "participants": ["string"]
}
```
