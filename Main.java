
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

class User {
    private String userId;
    private String name;
    private String email;
    private double budget;

    public User(String userId, String name, String email, double budget) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.budget = budget;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }
}

class TravelOption {
    private String id;
    private String type; // e.g., "flight", "hotel", "bus"
    private String name;
    private double price;
    private String location;
    private Date availableFrom;
    private Date availableTo;

    public TravelOption(String id, String type, String name, double price, String location, Date availableFrom, Date availableTo) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.price = price;
        this.location = location;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
    }

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getLocation() {
        return location;
    }

    public Date getAvailableFrom() {
        return availableFrom;
    }

    public Date getAvailableTo() {
        return availableTo;
    }
}

class Booking {
    private String bookingId;
    private String userId;
    private List<TravelOption> options;
    private double totalCost;
    private Date bookingDate;

    public Booking(String bookingId, String userId, List<TravelOption> options, double totalCost, Date bookingDate) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.options = options;
        this.totalCost = totalCost;
        this.bookingDate = bookingDate;
    }

    public String getBookingId() {
        return bookingId;
    }

    public String getUserId() {
        return userId;
    }

    public List<TravelOption> getOptions() {
        return options;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public Date getBookingDate() {
        return bookingDate;
    }
}

public class Main {
    private Map<String, User> users = new HashMap<>();
    private Map<String, TravelOption> travelOptions = new HashMap<>();
    private List<Booking> bookings = new ArrayList<>();

    // Add user
    public void addUser(User user) {
        users.put(user.getUserId(), user);
    }

    // Add travel option
    public void addTravelOption(TravelOption option) {
        travelOptions.put(option.getId(), option);
    }

    // Search travel options by location and budget
    public List<TravelOption> searchOptions(String location, double maxBudget) {
        List<TravelOption> results = new ArrayList<>();
        for (TravelOption option : travelOptions.values()) {
            if (option.getLocation().equalsIgnoreCase(location) && option.getPrice() <= maxBudget) {
                results.add(option);
            }
        }
        return results;
    }

    // Book travel options for a user
    public Booking bookOptions(String userId, List<String> optionIds) {
        User user = users.get(userId);
        if (user == null) return null;

        List<TravelOption> selectedOptions = new ArrayList<>();
        double totalCost = 0;
        for (String id : optionIds) {
            TravelOption option = travelOptions.get(id);
            if (option != null) {
                selectedOptions.add(option);
                totalCost += option.getPrice();
            }
        }

        if (selectedOptions.isEmpty() || totalCost > user.getBudget()) {
            return null; // Over budget or no valid options found
        }

        Booking booking = new Booking(UUID.randomUUID().toString(), userId, selectedOptions, totalCost, new Date());
        bookings.add(booking);
        user.setBudget(user.getBudget() - totalCost);
        return booking;
    }

    // Get bookings for a user
    public List<Booking> getUserBookings(String userId) {
        List<Booking> userBookings = new ArrayList<>();
        for (Booking booking : bookings) {
            if (booking.getUserId().equals(userId)) {
                userBookings.add(booking);
            }
        }
        return userBookings;
    }

    public static void main(String[] args) {
        Main data = new Main();

        // Create users
        User user1 = new User("1", "Alice", "alice@example.com", 2000.0);
        User user2 = new User("2", "Bob", "bob@example.com", 1500.0);
        data.addUser(user1);
        data.addUser(user2);

        // Create travel options
        TravelOption flight1 = new TravelOption("101", "flight", "Flight to Paris", 500.0, "Paris", new Date(), new Date());
        TravelOption hotel1 = new TravelOption("201", "hotel", "Hotel in Paris", 800.0, "Paris", new Date(), new Date());
        TravelOption bus1 = new TravelOption("301", "bus", "Bus to Berlin", 100.0, "Berlin", new Date(), new Date());
        data.addTravelOption(flight1);
        data.addTravelOption(hotel1);
        data.addTravelOption(bus1);

        // Search for options
        List<TravelOption> parisOptions = data.searchOptions("Paris", 2000.0);
        System.out.println("Available options in Paris with a budget of 1000.0:");
        for (TravelOption option : parisOptions) {
            System.out.println("- " + option.getName() + " ($" + option.getPrice() + ")");
        }

        // Book options
        List<String> bookingIds = new ArrayList<>();
        bookingIds.add("101");
        bookingIds.add("201");
        Booking booking = data.bookOptions("1", bookingIds);
        if (booking != null) {
            System.out.println("Booking successful for user " + booking.getUserId() + " with total cost $" + booking.getTotalCost());
        } else {
            System.out.println("Booking failed.");
        }

        // Get user bookings
        List<Booking> user1Bookings = data.getUserBookings("1");
        System.out.println("Bookings for user 1:");
        for (Booking b : user1Bookings) {
            System.out.println("- Booking ID: " + b.getBookingId());
        }
    }
}
