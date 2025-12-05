package backend;

import java.util.Date;

public class TravelOption {
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
