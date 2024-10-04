import React, { Fragment, useEffect, useState } from 'react';
import ModalProperty from './ModalProperty';
import { AnimatePresence, motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const PropertySearchList = ({
     name,
     destination, handleSearchResultsClose, showAll, setShowAll, handleShowAll, handle_NOT_ShowAll,
     isLogin, handleSearchResultsOpen,
     formattedStartDate,
     formattedEndDate,
     lengthOfNights,
     calendarIsVisible
}) => {
     const [properties, setProperties] = useState([]);
     const [filteredProperties, setFilteredProperties] = useState([]);
     const [selectedProperty, setSelectedProperty] = useState(null); // State to track selected property for the modal

     // Fetch property data from Firebase
     useEffect(() => {
          fetch('https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Available%20Properties.json')
               .then((response) => response.json())
               .then((data) => {
                    const propertyList = Object.keys(data).map((key) => {
                         return {
                              id: key,
                              ...data[key],
                         };
                    });
                    setProperties(propertyList);
               })
               .catch((error) => {
                    console.error('Error fetching properties:', error);
               });
     }, []);

     // Filter properties based on the destination, or show all properties if showAll is true
     useEffect(() => {
          if (showAll) {
               setFilteredProperties(properties); // Show all properties
          } else if (destination) {
               const filtered = properties.filter(
                    (property) =>
                         property.Address &&
                         property.Address.city &&
                         property.Address.city.toLowerCase() === destination.toLowerCase()
               );
               setFilteredProperties(filtered);
          } else {
               setFilteredProperties([]); // Empty array when no destination is provided and not showing all
          }
     }, [destination, properties, showAll]);


     const handlePropertyClick = (property) => {
          setSelectedProperty(property); // Set the selected property to display in the modal
     };

     const handleCloseModal = () => {
          setSelectedProperty(null); // Close the modal by clearing the selected property
     };

     return (
          <motion.div

               initial={{ opacity: 0, translateY: 40, scale: 1 }}
               animate={{
                    opacity: 1,
                    translateY: calendarIsVisible ? 123 : 30,
                    scale: 1
               }}
               transition={{ duration: 0.35, delay: 0.1, type: "spring", stiffness: 200 }}

               style={{
                    maxWidth: 986,
                    margin: '0 auto'
               }}
          >
               <h2 style={{ marginBottom: 37 }}>Available Properties</h2>

               {!showAll && destination && filteredProperties.length === 0 ? (
                    <motion.p
                         initial={{ opacity: 0, translateY: -10, scale: 1.1 }}
                         animate={{ opacity: 1, translateY: 0, scale: 1 }}
                         transition={{ duration: 0.35, delay: 0.6 }}

                    >No properties available in {destination}. Please enter a valid destination or <a
                         style={{
                              fontSize: 20,
                              textDecoration: 'none',
                              padding: 12,
                              margin: 8,
                              border: '0.1px solid #FF385C',
                              borderRadius: 30,
                              color: '#FF385C'
                         }}
                         href="#" onClick={handleShowAll}>click here to see all properties</a>
                    </motion.p>
               ) : filteredProperties.length > 0 ? (

                    <motion.ul
                         initial={{ opacity: 0, translateY: -10, scale: 1.1 }}
                         animate={{ opacity: 1, translateY: 0, scale: 1 }}
                         transition={{ duration: 0.35, delay: 0.9 }}

                         style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: 0 }}>
                         {filteredProperties.map((property) => (
                              <li key={property.id} style={{ listStyle: 'none' }}>
                                   <Card
                                        style={{
                                             maxWidth: 310,
                                             maxHeight: 310,
                                             minWidth: 310,
                                             minHeight: 310,
                                             borderRadius: 20
                                        }}
                                        onClick={() => handlePropertyClick(property)}
                                   >
                                        <CardActionArea>
                                             <CardMedia
                                                  component="img"
                                                  height="192"
                                                  image={property['Front Image']}
                                                  alt={property.Address.title}
                                             />
                                             <CardContent>
                                                  <Typography gutterBottom variant="h5" component="div">
                                                       {property.Address.title}
                                                  </Typography>
                                                  {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                       {property.Address.description}
                                                  </Typography> */}
                                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                       City: {property.Address.city}
                                                  </Typography>
                                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                       Price per night: £{property.PricePerNight}
                                                  </Typography>

                                             </CardContent>
                                        </CardActionArea>
                                   </Card>
                              </li>
                         ))}
                    </motion.ul>
               ) : (
                    !showAll && <p>
                         <div>  No properties available.</div>
                         <span
                              style={{
                                   position: 'relative',
                                   top: 20,
                              }}
                         >Please enter a valid destination or
                              <a
                                   style={{
                                        fontSize: 20,
                                        textDecoration: 'none',
                                        padding: 12,
                                        margin: 8,
                                        border: '0.1px solid #FF385C',
                                        borderRadius: 30,
                                        color: '#FF385C'
                                   }}
                                   href="#" onClick={handleShowAll}
                              >
                                   click here to see all properties
                              </a><
                                        /span>
                              <span
                                   style={{
                                        position: 'relative',
                                        top: 20,
                                   }}
                              >  Or
                                   <a
                                        style={{

                                             fontSize: 20,
                                             textDecoration: 'none',
                                             padding: 12,

                                             margin: 8,
                                             border: '0.1px solid #FF385C',
                                             borderRadius: 30,
                                             color: '#FF385C'
                                        }}
                                        href="#" onClick={handleSearchResultsClose}>go to the home page</a>
                              </span>
                    </p>
               )}

               {selectedProperty &&
                    <ModalProperty
                         name={name}
                         property={selectedProperty}
                         isLogin={isLogin}
                         onClose={handleCloseModal}
                         handle_NOT_ShowAll={handle_NOT_ShowAll}
                         handleSearchResultsOpen={handleSearchResultsOpen}
                         handleSearchResultsClose={handleSearchResultsClose}

                         formattedStartDate={formattedStartDate}
                         formattedEndDate={formattedEndDate}
                         lengthOfNights={lengthOfNights}
                    />}
          </motion.div>
     );
};

export default PropertySearchList;
