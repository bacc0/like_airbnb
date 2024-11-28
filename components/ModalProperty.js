import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { AnimatePresence, motion } from 'framer-motion';
import dayjs from 'dayjs';


const ModalProperty = ({
    name,
    property,
    onClose,
    isLogin,
    handleSearchResultsClose,
    formattedStartDate,
    formattedEndDate,
    lengthOfNights
}) => {
    const [enlargedImage, setEnlargedImage] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false); // State to toggle payment form
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    if (!property) return null;

    const handleImageClick = (url) => {
        setEnlargedImage(url);
    };

    const closeEnlargedImage = () => {
        setEnlargedImage(null);
    };

    const imageUrls = [property['Front Image'], ...(property.ImageUrls || [])];

    const handleButtonReserve = () => {
        if (isLogin) {
            // Add reservation logic
            addReservationToUser(property, formattedStartDate, formattedEndDate, lengthOfNights);
            handleSearchResultsClose();
        } else {
            alert('Please ensure you are logged in first.');
            handleSearchResultsClose();
        }
    };

    const handleButtonBook = () => {
        setShowPaymentForm(true); // Show payment form when "Book" is clicked
    };

    const addReservationToUser = async (property, startDate, endDate, nights) => {
        const url = `https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Reservations.json`;

        try {
            if (!startDate || !endDate) {
                alert('You must add start and end days before you reserve.');
                handleSearchResultsClose();
                return;
            }

            const existingReservationsResponse = await fetch(url);
            const existingReservations = await existingReservationsResponse.json();

            const isAlreadyBooked = Object.values(existingReservations || {}).some(reservation => {
                return reservation.title === property.Address.title &&
                    reservation.startDate === startDate &&
                    reservation.endDate === endDate;
            });

            if (isAlreadyBooked) {
                alert('This property is already booked for the selected dates.');
                handleSearchResultsClose();
                return;
            }

            const reservation = {
                title: property.Address.title,
                owner: property.Name,
                email: property.Email,
                description: property.Address.description,
                address: property.Address.Address,
                city: property.Address.city,
                pricePerNight: property.PricePerNight,
                mainImage: property['Front Image'],
                imageUrls: property.imageUrls,
                startDate: startDate,
                endDate: endDate,
                nights: nights,
                customerName: name
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservation),
            });

            if (response.ok) {
                alert('Reservation successfully added!');
                handleSearchResultsClose();
            } else {
                alert('Failed to add reservation.');
                handleSearchResultsClose();
            }
        } catch (error) {
            console.error('Error adding reservation:', error);
            alert('An error occurred while adding the reservation.');
            handleSearchResultsClose();
        }
    };

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {!showPaymentForm && <div>
                    <div
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '4%',
                            left: '96%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            background: '#FF385C',
                            borderRadius: 60
                        }}
                    >
                        <CloseIcon />
                    </div>
                    <h2>{property.Address.Title}</h2>
                    <p>
                        <span style={{ paddingRight: 7, color: "#FF385C" }}> Description:</span>
                        <span style={{ fontWeight: 600 }}>{property.Address.Description}</span>
                    </p>
                    <p>
                        <span style={{ paddingRight: 7, color: "#FF385C" }}> Address:</span>
                        <span style={{ fontWeight: 600 }}> {property.Address.Address}</span>
                    </p>
                    <p>
                        <span style={{ paddingRight: 7, color: "#FF385C" }}> City:</span>
                        <span style={{ fontWeight: 600 }}> {property.Address.City}</span>
                    </p>


                    <p>
                        <span style={{ paddingRight: 7, color: "#FF385C" }}>
                            Price per night:
                        </span>

                        <span style={{ fontWeight: 600 }}>  £{property.PricePerNight}</span>

                        {lengthOfNights > 0 &&
                            <>
                                <span style={{ paddingRight: 7, paddingLeft: '1.5em', color: "#FF385C" }}>
                                    Total Price:
                                </span>
                                <span style={{ fontWeight: 600, fontSize: 26 }}>
                                    £{(property.PricePerNight * lengthOfNights).toFixed(2)}
                                </span>
                            </>}

                    </p>



                    <div style={scrollableGalleryStyle}>
                        {imageUrls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Image ${index + 1}`}
                                style={imageStyle}
                                onClick={() => handleImageClick(url)}
                            />
                        ))}
                    </div>
                </div>}
                {/* Show Book button initially */}
                {!showPaymentForm && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={handleButtonBook}
                            style={{
                                background: "#000000",
                                color: "#ffffff",
                                height: 60,
                                width: 160,
                                borderRadius: 60,
                                boxShadow: '0px 0 7px #bdbdbd',
                                marginTop: 20,
                                marginRight: 40
                            }}
                        >
                            Book
                        </Button>
                    </div>
                )}

                {/* Show payment form after clicking Book */}
                {showPaymentForm && (
                    <Box sx={{ mt: 2 }}>
                        <div
                            style={{ padding: '20px 40px 40px' }}
                        >
                            <h1>Card Payment</h1>
//payment
                            <p>
                                <span style={{ paddingRight: 7, color: "#FF385C" }}>
                                    Price per night:
                                </span>

                                <span style={{ fontWeight: 600 }}>  £{property.PricePerNight}</span>

                                {lengthOfNights > 0 &&
                                    <>
                                        <span style={{ paddingRight: 7, paddingLeft: '1.5em', color: "#FF385C" }}>
                                            Total Price:
                                        </span>
                                        <span style={{ fontWeight: 600, fontSize: 26 }}>
                                            £{(property.PricePerNight * lengthOfNights).toFixed(2)}
                                        </span>
                                    </>}

                            </p>


                            <TextField
                                label="Card Number"
                                variant="outlined"
                                fullWidth
                                value={cardNumber}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                                    const formattedInput = input
                                        .replace(/(.{4})/g, '$1 ') // Add a space every 4 digits
                                        .trim(); // Remove trailing spaces
                                    setCardNumber(formattedInput);
                                }}
                                inputProps={{
                                    maxLength: 19, // Maximum length includes spaces (16 digits + 3 spaces)
                                }}
                                sx={{
                                    mb: 2,
                                    borderRadius: '60px', // Apply the border-radius
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '60px',
                                    }
                                }}
                                style={{
                                    marginTop: 40
                                }}
                            />



                            <TextField
                                label="Expiry Date MM/YY"
                                variant="outlined"
                                fullWidth
                                value={expiryDate}
                                onChange={(e) => {
                                    let input = e.target.value.replace(/\D/g, ''); // Allow only numbers

                                    if (input.length > 4) {
                                        input = input.slice(0, 4); // Limit to 4 digits
                                    }

                                    if (input.length > 2) {
                                        input = `${input.slice(0, 2)}/${input.slice(2, 4)}`; // Add a slash after 2 digits
                                    }

                                    setExpiryDate(input);
                                }}
                                onBlur={() => {
                                    // Validate the expiry date when the user leaves the field
                                    if (expiryDate.length === 5) {
                                        const [month, year] = expiryDate.split('/').map(Number);
                                        const currentYear = dayjs().year() % 100; // Last two digits of the current year
                                        const currentMonth = dayjs().month() + 1; // Current month (1-12)

                                        if (month < 1 || month > 12) {
                                            alert('Invalid month. Please enter a value between 01 and 12.');
                                            setExpiryDate('');
                                            return;
                                        }

                                        if (year < currentYear || (year === currentYear && month < currentMonth)) {
                                            alert('Expiry date must be in the future.');
                                            setExpiryDate('');
                                            return;
                                        }
                                    } else {
                                        alert('Please enter a valid expiry date in MM/YY format.');
                                        setExpiryDate('');
                                    }
                                }}
                                inputProps={{
                                    maxLength: 5, // Maximum length is 5 (MM/YY)
                                    pattern: "\\d*" // Only allow numeric input on mobile devices
                                }}
                                sx={{
                                    mb: 2,
                                    borderRadius: '60px', // Apply the border-radius
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '60px',
                                    }
                                }}
                                style={{
                                    marginTop: 40
                                }}
                            />


                            <TextField
                                label="CVV"
                                variant="outlined"
                                fullWidth
                                value={cvv}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, ''); // Allow only numeric input
                                    if (input.length <= 4) {
                                        setCvv(input); // Limit to 4 digits maximum
                                    }
                                }}
                                onBlur={() => {
                                    // Validate CVV on blur
                                    if (cvv.length < 3 || cvv.length > 4) {
                                        alert('CVV must be 3 or 4 digits.');
                                        setCvv('');
                                    }
                                }}
                                inputProps={{
                                    maxLength: 4, // Maximum length is 4 digits
                                    pattern: "\\d*" // Ensure only numbers are allowed on mobile devices
                                }}
                                sx={{
                                    mb: 2,
                                    borderRadius: '60px', // Apply the border-radius
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '60px',
                                    }
                                }}
                                style={{
                                    marginTop: 40
                                }}
                            />


                            <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                                <Button
                                    onClick={handleButtonReserve}
                                    style={{
                                        background: "#FF385C",
                                        color: "#ffffff",
                                        height: 60,
                                        width: 160,
                                        borderRadius: 60,
                                        boxShadow: '0px 0 7px #bdbdbd',
                                        marginTop: 20,

                                    }}
                                >
                                    Reserve
                                </Button>
                            </div>
                        </div>
                    </Box>
                )}

                {enlargedImage && (
                    <div style={enlargedOverlayStyle} onClick={closeEnlargedImage}>
                        <img src={enlargedImage} alt="Enlarged" style={enlargedImageStyle} />
                    </div>
                )}
            </Box>
        </Modal>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: 7,
    boxShadow: 24,
    p: 4,
};

const scrollableGalleryStyle = {
    display: 'flex',
    overflowX: 'auto',
    gap: '10px',
    padding: '10px 0',
    scrollSnapType: 'x mandatory',
    whiteSpace: 'nowrap',
};

const imageStyle = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: '8px',
    scrollSnapAlign: 'start',
};

const enlargedOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1100,
    cursor: 'pointer',
};

const enlargedImageStyle = {
    width: '750px',
    height: '750px',
    objectFit: 'cover',
    borderRadius: 20,
};

export default ModalProperty;

