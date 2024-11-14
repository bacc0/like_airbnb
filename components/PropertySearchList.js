import React, { Fragment, useEffect, useState } from 'react';
import ModalProperty from './ModalProperty';
import { AnimatePresence, motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import BorderLinearProgress from './BorderLinearProgress'
import styles from '../src/styles/index.module.css';



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
     const [showProgress, setShowProgress] = useState(false);

     const [isHovered, setIsHovered] = useState(false);

     const handleMouseEnter = () => {
          setIsHovered(true);
     };

     const handleMouseLeave = () => {
          setIsHovered(false);
     };
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
                    // console.log(propertyList)
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
                         // property.Address &&
                         // property.Address.city &&
                         // property.Address.city.toLowerCase() === destination.toLowerCase()
                         property.Address &&
                         property.Address.City &&
                         property.Address.City.toLowerCase() === destination.toLowerCase()
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

     useEffect(() => {
          if (filteredProperties.length !== 0) {
               // Set showProgress to true once filteredProperties becomes non-empty
               setShowProgress(true);

               // Hide the progress bar after 0.3 seconds
               const timer = setTimeout(() => {
                    setShowProgress(false);
               }, 1100); // 0.3 seconds

               // Cleanup function to clear the timeout
               return () => clearTimeout(timer);
          }
     }, [filteredProperties]);

     return (
          <>
               {showProgress && <BorderLinearProgress />}

               <motion.div

                    initial={{ opacity: 0, translateY: 40, scale: 1 }}
                    animate={{
                         opacity: 1,
                         translateY: calendarIsVisible ? 123 : 30,
                         scale: 1
                    }}
                    transition={{ duration: 0.35, delay: 0.1, type: "spring", stiffness: 200 }}

                    style={{
                         maxWidth: 996,
                         margin: '0 auto'
                    }}
               >
                    <h2 style={{ marginBottom: 37 }}>Available Properties</h2>

                    {!showAll && destination && filteredProperties.length === 0 ? (
                         <p
                         style={{
                              display: 'flex',
                              justifyContent: 'center', // Centers horizontally
                              alignItems: 'center',     // Centers vertically
                              height: '50vh',          // Ensures it takes up the full viewport heigh
                         }}
                    >
                         <div1
                              style={{
                                   position: 'absolute',
                                   top: 150,
                                   fontSize: 22,

                              }}
                         >  No properties available.</div1>
                         <span
                              style={{
                                   position: 'relative',
                                   top: 20,
                                   marginLeft: 20,

                              }}
                         >Please enter a valid destination or
                              <div />
                              <Button
                                   style={{
                                        position: 'relative',
                                        top: 5,
                                        fontSize: 16,
                                        height: 60,
                                        width: 340,
                                        textDecoration: 'none',
                                        padding: 12,
                                        marginTop: 40,
                                        marginLeft: -50,
                                        borderRadius: 30,
                                        color: '#FF385C',
                                        
                                        border: isHovered ? '0.1px solid #000000' :'0.1px solid #FF385C',

                                        background: isHovered ? '#FFF9F9' : '#ffffff',
                                        boxShadow: `0 0 ${isHovered ? 0 : 10}px #00000033`, 
                                        
                                        transition: 'background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease,', 
                                   }}
                                   href="#"
                                   onClick={handleShowAll}
                                   onMouseEnter={handleMouseEnter}
                                   onMouseLeave={handleMouseLeave}
                              >
                                   click here to see all properties
                              </Button>
                         </span>
                         <span
                              style={{
                                   position: 'relative',
                                   top: 20,
                              }}
                         >
                         </span>
                    </p>
                    ) : filteredProperties.length > 0 ? (

                         <motion.ul
                              initial={{ opacity: 0, translateY: -10, scale: 1.05 }}
                              animate={{ opacity: 1, translateY: 0, scale: 1 }}
                              transition={{ duration: 0.6, delay: 0.6 }}

                              style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: 0 }}>
                              {filteredProperties.map((property) => (
                                   <li key={property.id} style={{ listStyle: 'none', }}>
                                        <Card
                                             style={{
                                                  maxWidth: 310,
                                                  maxHeight: 310,
                                                  minWidth: 310,
                                                  minHeight: 310,
                                                  borderRadius: 20,
                                                  boxShadow: '0 0 0',
                                                  margin: '0 4px',
                                                  backgroundImage: `url('${property['Front Image']}')`,
                                                  backgroundRepeat: 'no-repeat',
                                                  backgroundPosition: 'center center',
                                                  backgroundSize: 'cover',
                                                  // border: '1px solid #fff',
                                                  // backgroundSize: '180%', 

                                             }}
                                             onClick={() => handlePropertyClick(property)}
                                        >
                                             <CardActionArea>
                                                  <CardMedia
                                                       // component="img"
                                                       // height="196"
                                                       // image={property['Front Image']}
                                                       // alt={property.Address.title}
                                                       style={{
                                                            //   margin: '0 6px'
                                                            borderRadius: '20px 0 0',
                                                            filter: 'contrast(120%)',
                                                            // border: '1px solid #bdbdbd',
                                                            minHeight: 197
                                                       }}
                                                  />
                                                  <CardContent

                                                       className={styles.card_content}
                                                       style={{
                                                            background: `linear-gradient(106deg, #fffffff9 0%, #ffffffdd 100%)`,
                                                            minHeight: 114,

                                                            'backdrop-filter': 'blur(12px)',
                                                            '-webkit-backdrop-filter': 'blur(12px)'

                                                       }}
                                                  >
                                                       <Typography gutterBottom variant="h5" component="div"
                                                            className={styles.card_content_title}>
                                                            {property.Address.Title}
                                                       </Typography>

                                                       <Typography variant="body2" sx={{ color: 'text.secondary' }} className={styles.card_content_text}>
                                                            City: {property.Address.City}
                                                       </Typography>
                                                       <Typography variant="body2" sx={{ color: 'text.secondary' }} className={styles.card_content_text}>
                                                            Price per night: £{property.PricePerNight}
                                                       </Typography>

                                                  </CardContent>
                                             </CardActionArea>
                                        </Card>
                                   </li>
                              ))}
                         </motion.ul>
                    ) : (
                         !showAll &&
                         <p
                              style={{
                                   display: 'flex',
                                   justifyContent: 'center', // Centers horizontally
                                   alignItems: 'center',     // Centers vertically
                                   height: '50vh',          // Ensures it takes up the full viewport heigh
                              }}
                         >
                              <div1
                                   style={{
                                        position: 'absolute',
                                        top: 150,
                                        fontSize: 22,

                                   }}
                              >  No properties available.</div1>
                              <span
                                   style={{
                                        position: 'relative',
                                        top: 20,
                                        marginLeft: 20,

                                   }}
                              >Please enter a valid destination or
                                   <div />
                                   <Button
                                        style={{
                                             position: 'relative',
                                             top: 5,
                                             fontSize: 16,
                                             height: 60,
                                             width: 340,
                                             textDecoration: 'none',
                                             padding: 12,
                                             marginTop: 40,
                                             marginLeft: -50,
                                             borderRadius: 30,
                                             color: '#FF385C',
                                             
                                             border: isHovered ? '0.1px solid #000000' :'0.1px solid #FF385C',

                                             background: isHovered ? '#FFF9F9' : '#ffffff',
                                             boxShadow: `0 0 ${isHovered ? 0 : 10}px #00000033`, 
                                             
                                             transition: 'background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease,', 
                                        }}
                                        href="#"
                                        onClick={handleShowAll}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                   >
                                        click here to see all properties
                                   </Button>
                              </span>
                              <span
                                   style={{
                                        position: 'relative',
                                        top: 20,
                                   }}
                              >
                                   {/* Or
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
                                        href="#" onClick={handleSearchResultsClose}>go to the home page</a> */}
                              </span>
                         </p>

                    )}
                    <div style={{ minHeight: 200 }} />

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
          </>
     );
};

export default PropertySearchList;
