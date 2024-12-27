
# API Endpoints

## Authentication Routes

### Register a new user
- **URL:** `/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "age": "number",
    "gender": 'MALE' | 'FEMALE' | 'OTHER'
  }
  ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "message": "User registered successfully"
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "error": "User registration failed"
    }
    ```

### Login a user
- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Login successful"
    }
    ```
  - **401 Unauthorized:**
    ```json
    {
      "error": "Invalid email or password"
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "error": "Login failed"
    }
    ```

## Dashboard Routes

### Get user profile
- **URL:** `/dashboard/profile`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    {
      "id": "number",
      "name": "string",
      "email": "string",
      "age": "number",
      "gender": "string"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "User not found"
    }
    ```

### Update user profile
- **URL:** `/dashboard/profile`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "name": "string",
    "age": "number",
    "gender": "string"
  }
  ```
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "User profile updated successfully"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "User not found"
    }
    ```

## Chat Routes

### Create a new chat
- **URL:** `/dashboard/chat`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "string"
  }
  ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "id": "number",
      "title": "string",
      "createdAt": "string (ISO date)"
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "error": "string"
    }
    ```

### Get all chats
- **URL:** `/dashboard/chat`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "number",
        "title": "string",
        "createdAt": "string (ISO date)"
      }
    ]
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Get chat by ID
- **URL:** `/dashboard/chat/:chatId`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    {
      "id": "number",
      "title": "string",
      "createdAt": "string (ISO date)",
      "messages": [
        {
          "id": "number",
          "content": "string",
          "isUser": "boolean",
          "timestamp": "string (ISO date)"
        }
      ]
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Delete a chat
- **URL:** `/dashboard/chat/:chatId`
- **Method:** `DELETE`
- **Response:**
  - **204 No Content**
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Create a new message
- **URL:** `/dashboard/chat/message/:chatId`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "content": "string",
    "isUser": "boolean"
  }
  ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "id": "number",
      "content": "string",
      "isUser": "boolean",
      "timestamp": "string (ISO date)"
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "error": "string"
    }
    ```

### Get messages for a chat
- **URL:** `/dashboard/chat/messages/:chatId`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "number",
        "content": "string",
        "isUser": "boolean",
        "timestamp": "string (ISO date)"
      }
    ]
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

## Forum Routes

### Create a new question
- **URL:** `/dashboard/forum/question`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
  }
  ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "id": "number",
      "title": "string",
      "content": "string",
      "likes": "number"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Get all questions
- **URL:** `/dashboard/forum/question`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "number",
        "title": "string",
        "content": "string",
        "likes": "number"
      }
    ]
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Get question by ID
- **URL:** `/dashboard/forum/question/:questionId`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    {
      "id": "number",
      "title": "string",
      "content": "string",
      "likes": "number"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Like/Dislike a question
- **URL:** `/dashboard/forum/question/vote/:questionId`
- **Method:** `PUT`
- **Response:**
  - **200 OK:**
    ```json
    {
      "likes": "number"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Delete a question
- **URL:** `/dashboard/forum/question/:questionId`
- **Method:** `DELETE`
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Question deleted successfully"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Create a reply to a question
- **URL:** `/dashboard/forum/question/reply`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "content": "string",
    "questionId": "number"
  }
  ```
- **Response:**
  - **200 OK:**
    ```json
    {
      "id": "number",
      "content": "string",
      "likes": "number"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Get replies for a question
- **URL:** `/dashboard/forum/question/reply/:questionId`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "number",
        "content": "string",
        "likes": "number"
      }
    ]
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Like/Dislike a reply
- **URL:** `/dashboard/forum/question/reply/vote/:replyId`
- **Method:** `PUT`
- **Response:**
  - **200 OK:**
    ```json
    {
      "likes": "number"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Delete a reply
- **URL:** `/dashboard/forum/question/reply/:replyId`
- **Method:** `DELETE`
- **Response:**
  - **200 OK:**
    ```json
    {
      "message": "Reply deleted successfully"
    }
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

## Journal Routes

### Create a new journal
- **URL:** `/dashboard/journal`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "id": "number",
      "title": "string",
      "content": "string",
      "createdAt": "string (ISO date)"
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "error": "string"
    }
    ```

### Get all journals
- **URL:** `/dashboard/journals`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "number",
        "title": "string",
        "content": "string",
        "createdAt": "string (ISO date)"
      }
    ]
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Delete a journal
- **URL:** `/dashboard/journal/:journalId`
- **Method:** `DELETE`
- **Response:**
  - **204 No Content**
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

## Mood Routes

### Create a new mood
- **URL:** `/dashboard/mood`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "mood": "number"
  }
  ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "id": "number",
      "mood": "number",
      "createdAt": "string (ISO date)"
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "error": "string"
    }
    ```

### Get all moods (Not Recommended)
- **URL:** `/dashboard/moods`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "number",
        "mood": "number",
        "date": "string (ISO date)"
      }
    ]
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Get moods Today
- **URL:** `/dashboard/moods/oneday/`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "number",
        "mood": "number",
        "date": "string (ISO date)"
      }
    ]
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Delete a mood
- **URL:** `/dashboard/mood/:moodId`
- **Method:** `DELETE`
- **Response:**
  - **204 No Content**
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

## Task Routes

### Create a new task
- **URL:** `/dashboard/task`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "type": "string",
    "description": "string"
  }
  ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "id": "number",
      "type": "string",
      "description": "string",
      "isCompleted": "boolean"
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "error": "string"
    }
    ```

### Get all tasks
- **URL:** `/dashboard/tasks`
- **Method:** `GET`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "id": "number",
        "type": "string",
        "description": "string",
        "isCompleted": "boolean"
      }
    ]
    ```
  - **404 Not Found:**
    ```json
    {
      "error": "string"
    }
    ```

### Update a task
- **URL:** `/dashboard/task/:taskId`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "isCompleted": "boolean"
  }
  ```
- **Response:**
  - **200 OK:**
    ```json
    {
      "id": "number",
      "type": "string",
      "description": "string",
      "isCompleted": "boolean"
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "error": "string"
    }
    ```

This documentation covers the main API endpoints for authentication, dashboard, chat, forum, journal, mood, and task functionalities.
