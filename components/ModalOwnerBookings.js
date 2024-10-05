import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
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

export default function OwnerBookingsModal({
     handleCloseOwner,
     openOwnerAccount,
     name,  // Owner's name (filtered properties)
}) {
     const [bookings, setBookings] = React.useState([]);
     const [loading, setLoading] = React.useState(true);

     React.useEffect(() => {
          if (openOwnerAccount) {
               fetchOwnerBookings();
          }
     }, [openOwnerAccount]);

     const fetchOwnerBookings = async () => {
          const url = 'https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Reservations.json';
          try {
               const response = await fetch(url);
               const data = await response.json();

               // Filter bookings for the logged-in owner by `owner` field
               const ownerBookings = Object.entries(data)
                    .filter(([key, booking]) => booking.owner === name)  // Fetching bookings where the logged-in user is the owner
                    .map(([key, booking]) => ({ id: key, ...booking }));

               setBookings(ownerBookings);
               setLoading(false);
          } catch (error) {
               console.error('Error fetching owner bookings:', error);
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
               open={openOwnerAccount}
               onClose={handleCloseOwner}
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
                              Bookings owner control panel
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
                                             key={booking.id}
                                             sx={{ display: 'flex', mb: 2, borderRadius: 5 }}
                                             style={{ boxShadow: '0 0 0' }}
                                        >

                                             <CardMedia
                                                  component="img"
                                                  sx={{
                                                       width: 160,
                                                       height: 160,
                                                       minHeight: 160,
                                                       minWidth: 160,
                                                       borderRadius: 5,
                                                       backgroundColor: '#f5f5f5',
                                                       border: '0.1px solid #e0e0e0'
                                                  }}
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
                                                       <div style={{ padding: '3px 10px 3px 30px', width: 366 }}>
                                                            {/* <Typography component="h5" variant="h5">
                                                                 {booking.title}
                                                            </Typography> */}
                                                            <div style={{
                                                                 whiteSpace: 'nowrap',
                                                                 overflowX: 'auto',
                                                                 display: 'block'
                                                            }}>
                                                                 <Typography variant="subtitle1" color="text.secondary">
                                                                      {booking.address}, {booking.city}
                                                                 </Typography>
                                                            </div>
                                                            <Typography variant="body2">
                                                                 Booked by: {booking.customerName} <br />
                                                                 Email: {booking.email} <br />
                                                                 Dates: {booking.startDate} - {booking.endDate} <br />
                                                                 Nights: {booking.nights},
                                                                 {/* <span style={{ marginLeft: 6 }} /> */}
                                                                 <br />
                                                                 Total Price: £{totalPrice}
                                                            </Typography>
                                                       </div>
                                                       <Box
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
                              <Typography variant="body1">No bookings found for your properties.</Typography>
                         )}
                    </Box>
               </motion.div>

          </Modal >
     );
}
