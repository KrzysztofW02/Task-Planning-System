# Task Planning System

[![CodeFactor](https://www.codefactor.io/repository/github/krzysztofw02/task-planning-system/badge/main)](https://www.codefactor.io/repository/github/krzysztofw02/task-planning-system/overview/main)

Welcome to the Task Planning System repository! This is a microservices-based application built with C# in the backend and TypeScript, React, and Vite in the frontend. This system aims to streamline task management and planning for teams.

## Features

- **Microservices Architecture**: Built using a microservices architecture for scalability, modularity, and easy maintenance.
- **Backend in C#**: Utilizes C# for robust backend services, ensuring efficient data handling and processing.
- **Frontend with TypeScript, React, and Vite**: Offers a modern and responsive user interface powered by TypeScript, React, and Vite, enabling seamless user interactions and dynamic updates.
- **Task Management**: Allows users to create, assign, prioritize, and track tasks efficiently.
- **Team Collaboration**: Facilitates collaboration among team members by providing features for sharing tasks, commenting, and updating task statuses.
- **Containerization**: Containerized using Docker for easy deployment and scalability across different environments.
- **RESTful APIs**: Implements RESTful APIs for seamless communication between frontend and backend services.
- **Authentication and Authorization**: Ensures secure access to the system with authentication and authorization mechanisms.
- **Database Integration**: Integrates with a relational database (e.g., PostgreSQL, MySQL) for storing task-related data.

## Getting Started

To get started with the Task Planning System, follow these steps:

1. **Clone the Repository**:

git clone https://github.com/KrzysztofW02/Task-Planning-System/


2. **Navigate to the Project Directory**:

cd task-planning-system

3. **Set Up Backend**:

- Navigate to the backend directory and follow the instructions in the README.md file to set up and run the backend services.

4. **Set Up Frontend**:

- run with npm run dev

## Acknowledgements

- This project was inspired by the need for efficient task planning and management in modern software development environments.
- We thank all the contributors who have helped in the development and improvement of this project. (all 4 lol)

## Running docker app:

- docker build . -t "image_name"
- docker run --rm  -it -p="8080:8080" image_name 
- docker-compose up --build <== in location: Backend/AuthenticationService

## Running front-end tests:

- npx cypress open


