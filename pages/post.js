import React, { useState } from "react";
import {
     Container,
     Button,
     FormControl,
     InputLabel,
     OutlinedInput,
     InputAdornment,
     IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const AddNewProperty = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [formVisible, setFormVisible] = useState(true);
     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
     const [newProperty, setNewProperty] = useState({
          title: "Charming flat",
          address: "9 Liverpool Street, E3 6KU, London",
          city: "London",
          description: "A charming flat in the heart of London",
          pricePerNight: "149.99",
          email: "jake@gmail.com",
          frontImage: "https://firebasestorage.googleapis.com/v0/b/airbnb-d4964.appspot.com/o/Jake%2Ffront%20image%2FMP_oct22_0617.jpg?alt=media&token=49d4f2a3-7d10-420d-9a89-04574770d48e",
          imageUrls: [
               "https://firebasestorage.googleapis.com/v0/b/airbnb-d4964.appspot.com/o/Jake%2Fimages%2Fdesign-box-london-interior-design-hampstead-family-home-n6-4.jpg?alt=media&token=1807bffb-c552-4a1d-b91e-061a855f2303",
               "https://firebasestorage.googleapis.com/v0/b/airbnb-d4964.appspot.com/o/Jake%2Fimages%2Fezgif-3-763d0f7658.jpg?alt=media&token=9fad7bf5-4e51-46f5-a5d2-e51fc36e5874",
               "https://firebasestorage.googleapis.com/v0/b/airbnb-d4964.appspot.com/o/Jake%2Fimages%2FGeorgian%2Binterior%2Bdesign.jpg?alt=media&token=6ca199b4-4b07-47ed-8e2b-9ed0503a1029",
               "https://firebasestorage.googleapis.com/v0/b/airbnb-d4964.appspot.com/o/Jake%2Fimages%2FWalthamstow%2BHome%2B1.jpg?alt=media&token=50c2a71c-914e-4273-859e-aa668ba7a93b"
          ]
     });

     const router = useRouter();

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setNewProperty({ ...newProperty, [name]: value });
     };

     const handleArrayChange = (index, value) => {
          const updatedUrls = [...newProperty.imageUrls];
          updatedUrls[index] = value;
          setNewProperty({ ...newProperty, imageUrls: updatedUrls });
     };

     const handleCreateProperty = () => {
          if (
               !newProperty.title ||
               !newProperty.address ||
               !newProperty.city ||
               !newProperty.description ||
               !newProperty.pricePerNight ||
               !newProperty.email ||
               !newProperty.frontImage ||
               newProperty.imageUrls.some((url) => !url)
          ) {
               alert("All fields are required!");
               return;
          }

          setIsLoading(true);

          // Create new property in Firebase
          fetch(
               `https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Available%20Properties/${newProperty.title}.json`,
               {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                         Address: {
                              Address: newProperty.address,
                              city: newProperty.city,
                              description: newProperty.description,
                              title: newProperty.title,
                         },
                         Email: newProperty.email,
                         'Front Image': newProperty.frontImage,
                         ImageUrls: newProperty.imageUrls,
                         Name: newProperty.title,
                         PricePerNight: newProperty.pricePerNight

                    }),
               }
          )
               .then((response) => response.json())
               .then((data) => {
                    setIsLoading(false);
                    setFormVisible(false);
                    setShowSuccessMessage(true);

                    // After 2 seconds, redirect to the home page
                    setTimeout(() => {
                         router.push("/");
                    }, 2000);
               })
               .catch((error) => {
                    console.error("Error creating property:", error);
                    setIsLoading(false);
               });
     };

     return (
          <Container
               maxWidth="sm"
               sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
               }}
          >
               {formVisible ? (
                    <motion.div
                         initial={{
                              opacity: 0.5,
                              translateY: -30,
                              scale: 1.3,
                         }}
                         animate={{
                              opacity: 1,
                              translateY: 0,
                              scale: 1,
                         }}
                         transition={{
                              duration: 0.35,
                              type: "spring",
                              stiffness: 200,
                         }}
                    >
                         <h1 style={{ textAlign: "center" }}>Add New Property</h1>

                         <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                              <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
                              <OutlinedInput
                                   id="outlined-adornment-title"
                                   name="title"
                                   value={newProperty.title}
                                   onChange={handleInputChange}
                                   label="Title"
                              />
                         </FormControl>

                         <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                              <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
                              <OutlinedInput
                                   id="outlined-adornment-address"
                                   name="address"
                                   value={newProperty.address}
                                   onChange={handleInputChange}
                                   label="Address"
                              />
                         </FormControl>

                         <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                              <InputLabel htmlFor="outlined-adornment-city">City</InputLabel>
                              <OutlinedInput
                                   id="outlined-adornment-city"
                                   name="city"
                                   value={newProperty.city}
                                   onChange={handleInputChange}
                                   label="City"
                              />
                         </FormControl>

                         <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                              <InputLabel htmlFor="outlined-adornment-description">Description</InputLabel>
                              <OutlinedInput
                                   id="outlined-adornment-description"
                                   name="description"
                                   value={newProperty.description}
                                   onChange={handleInputChange}
                                   label="Description"
                              />
                         </FormControl>

                         <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                              <InputLabel htmlFor="outlined-adornment-pricePerNight">
                                   Price per Night
                              </InputLabel>
                              <OutlinedInput
                                   id="outlined-adornment-pricePerNight"
                                   name="pricePerNight"
                                   type="number"
                                   value={newProperty.pricePerNight}
                                   onChange={handleInputChange}
                                   label="Price per Night"
                              />
                         </FormControl>

                         <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                              <OutlinedInput
                                   id="outlined-adornment-email"
                                   name="email"
                                   value={newProperty.email}
                                   onChange={handleInputChange}
                                   label="Email"
                              />
                         </FormControl>

                         <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                              <InputLabel htmlFor="outlined-adornment-frontImage">Front Image URL</InputLabel>
                              <OutlinedInput
                                   id="outlined-adornment-frontImage"
                                   name="frontImage"
                                   value={newProperty.frontImage}
                                   onChange={handleInputChange}
                                   label="Front Image URL"
                              />
                         </FormControl>

                         {newProperty.imageUrls.map((url, index) => (
                              <FormControl key={index} fullWidth variant="outlined" sx={{ my: 2 }}>
                                   <InputLabel htmlFor={`image-url-${index}`}>Image URL {index + 1}</InputLabel>
                                   <OutlinedInput
                                        id={`image-url-${index}`}
                                        value={url}
                                        onChange={(e) => handleArrayChange(index, e.target.value)}
                                        label={`Image URL ${index + 1}`}
                                   />
                              </FormControl>
                         ))}

                         <Button
                              variant="outlined"
                              color="info"
                              size="large"
                              fullWidth
                              sx={{
                                   my: 2,
                                   backgroundColor: "#000000",
                                   color: "#ffffff",
                                   height: 60,
                                   borderRadius: 50,
                              }}
                              onClick={handleCreateProperty}
                              disabled={isLoading}
                         >
                              {isLoading ? "Creating..." : "Add Property"}
                         </Button>
                    </motion.div>
               ) : (
                    showSuccessMessage && (
                         <motion.div
                              initial={{ opacity: 0, y: -50 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                         >
                              <h2 style={{ fontWeight: 400, color: "#FF385C" }}>
                                   Property added successfully!
                              </h2>
                         </motion.div>
                    )
               )}
          </Container>
     );
};

export default AddNewProperty;
