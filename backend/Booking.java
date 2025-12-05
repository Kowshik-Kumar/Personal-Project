package backend;

import java.util.Date;
import java.util.List;

public class Booking {
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
