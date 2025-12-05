package backend;

import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * BookingModel - Database operations for bookings table
 * 
 * Table schema (from db/schema.sql):
 * - id (SERIAL PRIMARY KEY)
 * - user_id (INTEGER NOT NULL)
 * - from_location (VARCHAR)
 * - to_location (VARCHAR)
 * - travel_type (VARCHAR)
 * - departure_date (DATE)
 * - return_date (DATE)
 * - created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
 */
public class BookingModel {
    
    private Connection connection;
    
    /**
     * Constructor - accepts a database connection
     * @param connection JDBC Connection to PostgreSQL database
     */
    public BookingModel(Connection connection) {
        this.connection = connection;
    }
    
    /**
     * Create a new booking
     * @param userId User ID
     * @param fromLocation Departure location
     * @param toLocation Destination location
     * @param travelType Type of travel (flight/train/bus)
     * @param departureDate Departure date
     * @param returnDate Return date (can be null)
     * @return Created booking as a Map
     * @throws SQLException if database operation fails
     */
    public Map<String, Object> create(int userId, String fromLocation, String toLocation, 
                                      String travelType, LocalDate departureDate, LocalDate returnDate) 
                                      throws SQLException {
        String sql = "INSERT INTO bookings (user_id, from_location, to_location, travel_type, " +
                     "departure_date, return_date) VALUES (?, ?, ?, ?, ?, ?) RETURNING *";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            stmt.setString(2, fromLocation);
            stmt.setString(3, toLocation);
            stmt.setString(4, travelType);
            stmt.setDate(5, Date.valueOf(departureDate));
            if (returnDate != null) {
                stmt.setDate(6, Date.valueOf(returnDate));
            } else {
                stmt.setNull(6, Types.DATE);
            }
            
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return resultSetToMap(rs);
            }
            return null;
        }
    }
    
    /**
     * Find all bookings ordered by ID descending
     * @return List of bookings as Maps
     * @throws SQLException if database operation fails
     */
    public List<Map<String, Object>> findAll() throws SQLException {
        String sql = "SELECT * FROM bookings ORDER BY id DESC";
        List<Map<String, Object>> bookings = new ArrayList<>();
        
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                bookings.add(resultSetToMap(rs));
            }
        }
        return bookings;
    }
    
    /**
     * Find booking by ID
     * @param id Booking ID
     * @return Booking as a Map, or null if not found
     * @throws SQLException if database operation fails
     */
    public Map<String, Object> findById(int id) throws SQLException {
        String sql = "SELECT * FROM bookings WHERE id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return resultSetToMap(rs);
            }
            return null;
        }
    }
    
    /**
     * Update a booking
     * @param id Booking ID
     * @param updates Map of fields to update (only allowed fields will be updated)
     * @return Updated booking as a Map
     * @throws SQLException if database operation fails
     */
    public Map<String, Object> update(int id, Map<String, Object> updates) throws SQLException {
        String[] allowedFields = {"from_location", "to_location", "travel_type", "departure_date", "return_date"};
        List<String> setParts = new ArrayList<>();
        List<Object> params = new ArrayList<>();
        
        for (String field : allowedFields) {
            if (updates.containsKey(field)) {
                setParts.add(field + " = ?");
                params.add(updates.get(field));
            }
        }
        
        if (setParts.isEmpty()) {
            return findById(id);
        }
        
        params.add(id);
        String sql = "UPDATE bookings SET " + String.join(", ", setParts) + " WHERE id = ? RETURNING *";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            for (int i = 0; i < params.size(); i++) {
                Object param = params.get(i);
                if (param instanceof String) {
                    stmt.setString(i + 1, (String) param);
                } else if (param instanceof LocalDate) {
                    stmt.setDate(i + 1, Date.valueOf((LocalDate) param));
                } else if (param instanceof Integer) {
                    stmt.setInt(i + 1, (Integer) param);
                } else {
                    stmt.setObject(i + 1, param);
                }
            }
            
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return resultSetToMap(rs);
            }
            return null;
        }
    }
    
    /**
     * Delete a booking
     * @param id Booking ID
     * @return true if deleted successfully
     * @throws SQLException if database operation fails
     */
    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM bookings WHERE id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
            return true;
        }
    }
    
    /**
     * Find bookings by user ID
     * @param userId User ID
     * @return List of bookings for the user
     * @throws SQLException if database operation fails
     */
    public List<Map<String, Object>> findByUserId(int userId) throws SQLException {
        String sql = "SELECT * FROM bookings WHERE user_id = ? ORDER BY id DESC";
        List<Map<String, Object>> bookings = new ArrayList<>();
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                bookings.add(resultSetToMap(rs));
            }
        }
        return bookings;
    }
    
    /**
     * Convert ResultSet to Map
     * @param rs ResultSet from query
     * @return Map representation of the booking
     * @throws SQLException if column access fails
     */
    private Map<String, Object> resultSetToMap(ResultSet rs) throws SQLException {
        Map<String, Object> booking = new HashMap<>();
        booking.put("id", rs.getInt("id"));
        booking.put("user_id", rs.getInt("user_id"));
        booking.put("from_location", rs.getString("from_location"));
        booking.put("to_location", rs.getString("to_location"));
        booking.put("travel_type", rs.getString("travel_type"));
        
        Date departureDate = rs.getDate("departure_date");
        booking.put("departure_date", departureDate != null ? departureDate.toLocalDate() : null);
        
        Date returnDate = rs.getDate("return_date");
        booking.put("return_date", returnDate != null ? returnDate.toLocalDate() : null);
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        booking.put("created_at", createdAt != null ? createdAt.toLocalDateTime() : null);
        
        return booking;
    }
}
