INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', 'hashed_password_1'),
('jane_smith', 'jane@example.com', 'hashed_password_2');

INSERT INTO bookings (user_id, from_location, to_location, travel_type, departure_date, return_date) VALUES
(1, 'New York', 'Los Angeles', 'flight', '2024-05-01', '2024-05-10'),
(2, 'Chicago', 'Miami', 'train', '2024-06-15', '2024-06-20'),
(1, 'San Francisco', 'Seattle', 'bus', '2024-07-05', '2024-07-07');

INSERT INTO trips (user_id, booking_id, trip_name) VALUES
(1, 1, 'California Adventure'),
(2, 2, 'Florida Getaway');