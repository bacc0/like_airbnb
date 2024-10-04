import React, { useState } from 'react';
import Button from "@mui/material/Button";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';


const ModalProperty = ({
    property,
    onClose,
    isLogin,
    handleSearchResultsClose,
    formattedStartDate,
    formattedEndDate,
    lengthOfNights
}) => {
    const [enlargedImage, setEnlargedImage] = useState(null); // State to track the enlarged image

    if (!property) return null; // Don't render anything if no property is passed

    const handleImageClick = (url) => {
        setEnlargedImage(url); // Set the clicked image to be enlarged
    };

    const closeEnlargedImage = () => {
        setEnlargedImage(null); // Close the enlarged image
    };

    const imageUrls = [property['Front Image'], ...(property.ImageUrls || [])]; // Ensure Front Image is at the front of the list

    const handleButtonReserve = () => {
        if (isLogin) {
            // Add the reservation to the user's account
            addReservationToUser(property, formattedStartDate, formattedEndDate, lengthOfNights);
            handleSearchResultsClose();
        } else {
            handleSearchResultsClose(); // Close the modal if not logged in
        }
    };

    const addReservationToUser = async (property, startDate, endDate, nights) => {

        const user = 'Veselin'; // The currently logged-in user
        const url = `https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Reservations.json`;

        try {
            // Fetch existing reservations
            const existingReservationsResponse = await fetch(url);
            const existingReservations = await existingReservationsResponse.json();

            // Check if the same property with the same dates is already booked
            const isAlreadyBooked = Object.values(existingReservations || {}).some(reservation => {
                return reservation.title === property.Address.title &&
                    reservation.startDate === startDate &&
                    reservation.endDate === endDate;
            });

            if (isAlreadyBooked) {
                alert('This property is already booked for the selected dates.');
                return;
            }

            // If no conflict, proceed to add the reservation
            const reservation = {
                title: property.Address.title,
                owner: property.Name,
                email: property.Email,
                description: property.Address.description,
                address: property.Address.Address,
                city: property.Address.city,
                pricePerNight: property.PricePerNight,
                mainImage: property['Front Image'],  // Adding the front image as the main image
                imageUrls: imageUrls,
                startDate: startDate,
                endDate: endDate,
                nights: nights,
                customerName: user
            };

            const response = await fetch(url, {
                method: 'POST', // Use POST to add a new reservation to the array
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservation),
            });

            if (response.ok) {
                alert('Reservation successfully added to Veselin\'s account!');
            } else {
                alert('Failed to add reservation.');
            }
        } catch (error) {
            console.error('Error adding reservation:', error);
            alert('An error occurred while adding the reservation.');
        }
    };




    return (
        // <div style={{modalOverlayStyle}}>
        //     <div style={modalContentStyle}>
        //         <button onClick={onClose} style={closeButtonStyle}>X</button>
        //         <h2>{property.Address.title}</h2>
        //         <p>
        //             <span style={{ paddingRight: 7, color: "#FF385C" }}>  Description:</span>
        //             <span style={{ fontWeight: 600 }}>{property.Address.description}</span>
        //         </p>
        //         <p>
        //             <span style={{ paddingRight: 7, color: "#FF385C" }}> Address:</span>
        //             <span style={{ fontWeight: 600 }}>  {property.Address.Address}</span>
        //         </p>
        //         <p>
        //             <span style={{ paddingRight: 7, color: "#FF385C" }}> City:</span>
        //             <span style={{ fontWeight: 600 }}> {property.Address.city}</span>
        //         </p>
        //         <p>
        //             <span style={{ paddingRight: 7, color: "#FF385C" }}> Start Date:</span>
        //             <span style={{ fontWeight: 600 }}> {formattedStartDate}</span>
        //         </p>
        //         <p>
        //             <span style={{ paddingRight: 7, color: "#FF385C" }}> End Date:</span>
        //             <span style={{ fontWeight: 600 }}> {formattedEndDate}</span>
        //         </p>
        //         <p>
        //             <span style={{ paddingRight: 7, color: "#FF385C" }}> Nights:</span>
        //             <span style={{ fontWeight: 600 }}> {lengthOfNights} nights</span>
        //         </p>

        //         <div style={scrollableGalleryStyle}>
        //             {imageUrls.map((url, index) => (
        //                 <img
        //                     key={index}
        //                     src={url}
        //                     alt={`Image ${index + 1}`}
        //                     style={imageStyle}
        //                     onClick={() => handleImageClick(url)} // Enlarge the image when clicked
        //                 />
        //             ))}
        //         </div>
        //         <div
        //             style={{
        //                 display: 'flex',
        //                 justifyContent: 'space-between',
        //                 marginTop: 20,
        //                 marginBottom: 6,
        //             }}
        //         >
        //             <p>
        //                 <span style={{ paddingRight: 7, color: "#FF385C" }}> Price per night: </span>
        //                 <span style={{ fontWeight: 600 }}>  £{property.PricePerNight}</span></p>
        //             <Button
        //                 onClick={handleButtonReserve}
        //                 style={{
        //                     background: "#FF385C",
        //                     color: "#ffffff",
        //                     height: 60,
        //                     width: 160,
        //                     borderRadius: 60,
        //                     boxShadow: '0px 0 7px #bdbdbd'
        //                 }}
        //             >
        //                 Reserve
        //             </Button>
        //         </div>
        //         {/* Display the enlarged image in a modal */}
        //         {enlargedImage && (
        //             <div style={enlargedOverlayStyle} onClick={closeEnlargedImage}>
        //                 <img src={enlargedImage} alt="Enlarged" style={enlargedImageStyle} />
        //             </div>
        //         )}
        //     </div>
        // </div>

        <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >

                {/* <button >X</button> */}
                <div
                    onClick={onClose} style={closeButtonStyle}
                    style={{

                        position: 'absolute',
                        top: '4%',
                        left: '96%',
                        transform: 'translate(-50%, -50%)', // Center the "x" in the middle of the modal
                        // width: 100,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer', // Optional: Make it clickable
                        color: 'white',
                        background: '#FF385C',
                        borderRadius: 60
                    }}

                ><CloseIcon />
                </div>
                <h2>{property.Address.title}</h2>
                <p>
                    <span style={{ paddingRight: 7, color: "#FF385C" }}>  Description:</span>
                    <span style={{ fontWeight: 600 }}>{property.Address.description}</span>
                </p>
                <p>
                    <span style={{ paddingRight: 7, color: "#FF385C" }}> Address:</span>
                    <span style={{ fontWeight: 600 }}>  {property.Address.Address}</span>
                </p>
                <p>
                    <span style={{ paddingRight: 7, color: "#FF385C" }}> City:</span>
                    <span style={{ fontWeight: 600 }}> {property.Address.city}</span>
                </p>
                <p>
                    <span style={{ paddingRight: 7, color: "#FF385C" }}> Start Date:</span>
                    <span style={{ fontWeight: 600 }}> {formattedStartDate}</span>
                </p>
                <p>
                    <span style={{ paddingRight: 7, color: "#FF385C" }}> End Date:</span>
                    <span style={{ fontWeight: 600 }}> {formattedEndDate}</span>
                </p>
                <p>
                    <span style={{ paddingRight: 7, color: "#FF385C" }}> Nights:</span>
                    <span style={{ fontWeight: 600 }}> {lengthOfNights} nights</span>
                </p>

                <div style={scrollableGalleryStyle}>
                    {imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Image ${index + 1}`}
                            style={imageStyle}
                            onClick={() => handleImageClick(url)} // Enlarge the image when clicked
                        />
                    ))}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        marginBottom: 6,
                    }}
                >
                    <p>
                        <span style={{ paddingRight: 7, color: "#FF385C" }}> Price per night: </span>
                        <span style={{ fontWeight: 600 }}>  £{property.PricePerNight}</span></p>
                    <Button
                        onClick={handleButtonReserve}
                        style={{
                            background: "#FF385C",
                            color: "#ffffff",
                            height: 60,
                            width: 160,
                            borderRadius: 60,
                            boxShadow: '0px 0 7px #bdbdbd'
                        }}
                    >
                        Reserve
                    </Button>
                </div>
                {/* Display the enlarged image in a modal */}
                {enlargedImage && (
                    <div style={enlargedOverlayStyle} onClick={closeEnlargedImage}>

                        <img src={enlargedImage} alt="Enlarged" style={enlargedImageStyle} />
                        <div
                            style={{

                                position: 'absolute',
                                top: '0%',
                                left: '96%',
                                transform: 'translate(-50%, -50%)', // Center the "x" in the middle of the modal
                                // width: 100,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer', // Optional: Make it clickable
                                color: 'white',
                                background: '#FF385C',
                                borderRadius: 60
                            }}

                        ><CloseIcon /></div>
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
    // height: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: 7,
    boxShadow: 24,
    p: 4,
};
// Styles for the modal
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    width: '100%',
    position: 'relative',
};

// Styles for the scrollable image gallery
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
    minWidth: '200px',
    minHeight: '200px',
    maxWidth: '200px',
    maxHeight: '200px',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: '8px',
    scrollSnapAlign: 'start',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
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
