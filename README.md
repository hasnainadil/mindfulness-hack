# Mindfulness Hack

## Overview

Mindfulness Hack is a server application that provides various endpoints for user authentication, chat, tasks, journals, and mood tracking. This README provides instructions on how to set up and run the server.

## Prerequisites

- Docker
- Docker Compose
- Node.js
- npm

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/your-repo/mindfulness-hack.git
cd mindfulness-hack


### 2. Start the Docker Services

Navigate to the root directory of the project and run the following command to start the Docker services:

```sh
docker-compose up --build -d
```

This will start the Redis, MySQL, and ChromaDB services.

### 3. Install npm Packages

Navigate to the backend directory and install the required npm packages:

```sh
cd backend
npm install
```

### 4. Run the Server

After installing the npm packages, you can start the server:

```sh
npm start
```

## API Endpoints

The [api-endpoints.md](api-endpoints.md) file contains the description of all the available API endpoints.

## Postman Collection

The [mindfulness-hack.postman_collection.json](mindfulness-hack.postman_collection.json) file contains the Postman examples of the endpoints. You can import this file into Postman to test the API endpoints.

## Environment Variables

Make sure to set up the necessary environment variables in a `.env` file in the backend directory. Here is an example of the required environment variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=mindfullnesshack
COOKIE_TOKEN=access_token
GEMINI_API_KEY=gemini-api-key
EXASEARCH_API_KEY=exasearch-api-key
```