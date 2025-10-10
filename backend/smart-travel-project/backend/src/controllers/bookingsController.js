class BookingsController {
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }

    async createBooking(req, res) {
        try {
            const bookingData = req.body;
            const newBooking = await this.bookingModel.create(bookingData);
            res.status(201).json(newBooking);
        } catch (error) {
            res.status(500).json({ message: 'Error creating booking', error });
        }
    }

    async getBooking(req, res) {
        try {
            const { id } = req.params;
            const booking = await this.bookingModel.findById(id);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving booking', error });
        }
    }

    async updateBooking(req, res) {
        try {
            const { id } = req.params;
            const bookingData = req.body;
            const updatedBooking = await this.bookingModel.update(id, bookingData);
            if (!updatedBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.status(200).json(updatedBooking);
        } catch (error) {
            res.status(500).json({ message: 'Error updating booking', error });
        }
    }

    async deleteBooking(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.bookingModel.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting booking', error });
        }
    }
}

export default BookingsController;