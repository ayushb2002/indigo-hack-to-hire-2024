# Project Summary

## Overview

This project aims to develop a comprehensive and secure airport system designed to enhance operational efficiency and improve the passenger experience. The system is built using a modern tech stack, including MongoDB for data management, a React-based frontend, and a Python Flask API backend. Key features include real-time updates, secure authentication, dynamic notifications, and email alerts.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Python Flask API
- **Database**: MongoDB
- **Real-Time Updates**: Apache Kafka
- **Socket Server**: Node.js with Socket.io
- **Email Notifications**: EmailJS
- **Styling**: Tailwind CSS

## Features

### Authentication
- **Admin and Staff**: Secure login for managing airport operations, including customer check-ins and real-time updates.
- **Customers**: Secure login for viewing flight details, boarding passes, seat numbers, and receiving notifications.

### Real-Time Updates
- **Kafka Integration**: Kafka is used for broadcasting real-time updates. Messages sent to Kafka topics are consumed by a Node.js socket server, which emits the updates to the React frontend.
- **Socket Server**: Node.js server using Socket.io to handle real-time communication between the backend and the frontend.

### Notifications
- **Dynamic Notifications**: Admins can send notifications and broadcasts to customers. Notifications are tied to specific flights, while broadcasts are general messages sent to all users.
- **Email Notifications**: Uses EmailJS to send email alerts to customers. The emails contain flight-related information, including subject and message, and are sent to all email addresses retrieved from the database.

### Data Management
- **MongoDB**: Stores all relevant data, including user information, flight details, and notifications. The `pymongo` library is used for database interactions.

### User Interface
- **Responsive Design**: The frontend is designed with Tailwind CSS for a responsive and user-friendly interface. Data is displayed in tables with proper text wrapping to ensure readability.
- **Dynamic Data Display**: Notifications and broadcasts are displayed in real-time, sorted by timestamp for easy tracking. 

## Implementation Details

### Authentication
- **Token-Based Authentication**: Utilizes JWT tokens for secure user authentication.
- **Role-Based Access Control**: Ensures only authorized users (admin and staff) can access specific functionalities.

### Real-Time Data Flow
- **Kafka Producer**: Flask API sends messages to Kafka topics (`notifications` and `broadcasts`) with attached timestamps.
- **Node.js Socket Server**: Consumes Kafka messages and emits them to connected clients. Also handles initial load of cached messages.
- **React Frontend**: Connects to the socket server to receive real-time updates and display them in a user-friendly manner.

### Email Notifications
- **EmailJS Integration**: Sends emails to multiple recipients with flight-related updates. Email template variables include subject and message, dynamically populated from the backend.

### UI/UX Enhancements
- **Dynamic Tables**: Data tables in the frontend are designed to handle large amounts of text, ensuring readability with proper text wrapping.
- **Real-Time Sorting**: Notifications and broadcasts are sorted by timestamp to maintain chronological order.

## Setup and Installation

### Prerequisites
- Node.js
- Python
- MongoDB
- Apache Kafka
- EmailJS account

### Installation Steps
1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```sh
     cd app
     ```
   - Install Python dependencies:
     ```sh
     pip install -r requirements.txt
     ```
   - Set up environment variables in `.env` file:
     ```
     SECRET_KEY=your_secret_key
     MONGO_UID=your_mongodb_user_id
     MONGO_PWD=your_mongodb_password
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```sh
     cd frontend
     ```
   - Install Node.js dependencies:
     ```sh
     npm install
     ```
   - Set up environment variables in `.env` file:
     ```
     REACT_APP_KAFKA_SERVER=localhost:9092
     REACT_APP_EMAILJS_SERVICE_ID=your_service_id
     REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
     REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
     ```

4. **Socket Server Setup**:
   - Navigate to the socket server directory:
     ```sh
     cd sockets
     ```
   - Install Node.js dependencies:
     ```sh
     npm install
     ```

5. **Run the services**:
   - Start the Flask backend:
     ```sh
     flask run
     ```
   - Start the React frontend:
     ```sh
     npm start
     ```
   - Start the Node.js socket server:
     ```sh
     npm start
     ```

## Conclusion

This airport system project integrates various modern technologies to deliver a robust, secure, and user-friendly platform for managing airport operations and enhancing passenger experience. The real-time updates, dynamic notifications, and responsive design ensure efficient communication and smooth operations.