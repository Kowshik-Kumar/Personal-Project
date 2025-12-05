package backend;

public class User {
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
