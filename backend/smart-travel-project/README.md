# Smart Travel Booking & Management

## Overview
This project is a Smart Travel Booking and Management platform designed to help users plan, book, and manage their travel itineraries efficiently and affordably. The application consists of a backend server and a frontend user interface.

## Project Structure
```
smart-travel-project
├── backend
│   ├── src
│   │   ├── index.js                # Entry point of the backend application
│   │   ├── controllers              # Contains controllers for handling requests
│   │   │   └── bookingsController.js # Booking-related request handlers
│   │   ├── models                   # Contains data models
│   │   │   └── bookingModel.js      # Booking data model
│   │   └── db                      # Database connection and configuration
│   │       └── pool.js              # Database connection pool setup
│   └── package.json                 # Backend project dependencies and scripts
├── frontend
│   ├── face.html                    # Frontend HTML structure
│   └── styles
│       └── style.css                # CSS styles for the frontend
├── db
│   ├── schema.sql                   # Database schema definitions
│   ├── seeds.sql                    # Initial data population scripts
│   └── migrations
│       └── 001_create_tables.sql    # Database migration scripts
├── docker-compose.yml               # Docker configuration for services
├── .env.example                     # Example environment variables
└── README.md                        # Project documentation
```

## Getting Started

### Prerequisites
- Node.js and npm installed
- PostgreSQL or MySQL database
- Docker (optional, for containerized setup)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd smart-travel-project
   ```

2. **Backend Setup:**
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

3. **Database Setup:**
   - Create a database and run the SQL scripts located in the `db` directory to set up the schema and seed data.

4. **Frontend Setup:**
   - The frontend files are located in the `frontend` directory. You can open `face.html` in a web browser to view the application.

5. **Run the Application:**
   - Start the backend server:
     ```bash
     node src/index.js
     ```
   - Alternatively, if using Docker, run:
     ```bash
     docker-compose up
     ```

## Usage
- Access the frontend application through your web browser.
- Use the provided forms to search for travel options, manage bookings, and explore features.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.