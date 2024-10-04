import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Padding } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 600,
    bgcolor: 'background.paper',
    borderRadius: 7,
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',  // Enable scrolling if content exceeds height

    border: '6px solid #ffffff'
};

export default function ModalUserBookings({
    handleCloseAccount,
    openAccount,
    name,  // User's name (filtered bookings)
}) {
    const [bookings, setBookings] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (openAccount) {
            fetchBookings();
        }
    }, [openAccount]);

    const fetchBookings = async () => {
        const url = 'https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Reservations.json';
        try {
            const response = await fetch(url);
            const data = await response.json();

            // Filter bookings for the logged-in user by `customerName`
            const userBookings = Object.entries(data)
                .filter(([key, booking]) => booking.customerName === name)
                .map(([key, booking]) => ({ id: key, ...booking }));

            setBookings(userBookings);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        const url = `https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Reservations/${bookingId}.json`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Booking canceled successfully');
                setBookings(bookings.filter(booking => booking.id !== bookingId));
            } else {
                alert('Failed to cancel booking');
            }
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };

    return (
        <Modal
            open={openAccount}
            onClose={handleCloseAccount}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <motion.div
                initial={{ opacity: 0, translateY: 470, translateX: 0, scale: 1 }}
                animate={{ opacity: 1, translateY: 470, translateX: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0 }}
            >
                <Box sx={style}>

                    <Typography variant="h4" gutterBottom style={{ marginBottom: 40, marginTop: 10 }}>
                        My Bookings
                    </Typography>

                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <CircularProgress />
                        </Box>
                    ) : bookings.length > 0 ? (
                        bookings.map(booking => {
                            const totalPrice = (parseFloat(booking.pricePerNight) * booking.nights).toFixed(2);

                            return (
                                <Card
                                    key={booking.id} sx={{ display: 'flex', mb: 2, borderRadius: 7 }}

                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151, minHeight: 160, borderRadius: '7px 0 0 7px' }}
                                        image={booking.mainImage}
                                        alt={booking.title}
                                    />
                                    <Box style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center', // Centers vertically
                                        alignItems: 'center',     // Centers horizontally (optional)
                                        height: '100%'
                                    }}>
                                        <div style={{
                                            display: 'flex', minHeight: 160
                                        }}>
                                            <div style={{ padding: '3px 10px 3px 30px', width: 366}}>
                                                <Typography component="h5" variant="h5">
                                                    {booking.title}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary">
                                                    {booking.address}, {booking.city}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Dates: {booking.startDate} - {booking.endDate} <br />
                                                    Nights: {booking.nights} <br />
                                                    Total Price: £{totalPrice}
                                                </Typography>
                                            </div>
                                            <Box
                                                // style={{ backgroundColor: 'lime' }}
                                                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 1 }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleCancelBooking(booking.id)}
                                                    style={{ borderRadius: 30 }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </div>
                                    </Box>
                                </Card>
                            );
                        })
                    ) : (
                        <Typography variant="body1">No bookings found for {name}.</Typography>
                    )}
                </Box>
            </motion.div>
        </Modal >
    );
}
