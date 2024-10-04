import React, { Fragment } from 'react'
import CardAdver from '../components/CardAdver';
import { AnimatePresence, motion } from 'framer-motion'; // Import motion from Framer Motion
import styles from '../src/styles/index.module.css'; // 

const InspirationImages = ({
     calendarIsVisible, destination, formattedStartDate,formattedEndDate,lengthOfNights
}) => {

     const cards1 = (
          <div style={{ display: 'flex', maxWidth: 1200 }}>
               <CardAdver
                    img={"/cuba1.jpg"}
                    title={'Havana'}
                    text={'Join a living room session with Doja Hosted by Doja Cat'}
               />
               <CardAdver
                    img={"/monaco.jpg"}
                    title={'Monaco'}
                    text={'Stay in Prince’s Purple Rain house Hosted by Wendy and Lisa'}
               />
               <CardAdver
                    img={"/tokyo.jpg"}
                    title={'Tokyo'}
                    text={'Open the Olympic Games at Musée d’Orsay Hosted by Mathieu Lehanneur'}
               />
          </div>
     );

     const cards2 = (
          <div style={{ display: 'flex', maxWidth: 1200 }}>
               <CardAdver
                    img={"/beiging.jpg"}
                    title={'Beijing'}
                    text={'Spend the night in the Fer Museum Hosted by Kevin Li'}
               />
               <CardAdver
                    img={"/moscow.jpg"}
                    title={'Moscow'}
                    text={'Go on tour with Feid Hosted by Feid'}
               />
               <CardAdver
                    img={"/newY.jpg"}
                    title={'New York'}
                    text={'Game with Khaby Lame Hosted by Khaby Lame'}
               />
          </div>
     );

     return (
          <Fragment>
               <div
                    style={{
                         display: 'flex',
                         justifyContent: 'center',
                         background: "#ffffff",
                         marginTop: 120
                    }}
               >
                    <motion.div
                         className={styles.custom_date_picker_container}
                         initial={{ opacity: 0.0, translateY: 118, scale: 1.35 }}
                         animate={{ opacity: 1, translateY: 128, scale: 1.3 }}

                         transition={{ duration: 0.6, delay: 0.6 }}

                         style={{
                              position: 'relative',
                              top: calendarIsVisible ? 0 : -80,
                              transition: 'top 0.35s ease'
                         }}
                    >
                         <h3>Inspiration from past experiences</h3>
                         {cards2}

                         <motion.div
                              className={styles.custom_date_picker_container}
                              initial={{ opacity: 0.0, translateY: 80, scale: 1.15 }}
                              animate={{ opacity: 1, translateY: 70, scale: 1 }}
                              transition={{ duration: 0.6, delay: 0.63 }}

                              style={{ position: 'relative', top: calendarIsVisible ? 0 : -80, transition: 'top 0.35s ease' }}
                         >
                              {cards1}
                         </motion.div>
                    </motion.div>
               </div>

               {/* <div style={{ position: 'absolute', bottom: 0, left: 50, background: '#ffffffcc', padding: 30, borderRadius: 20 }}>
                    <h3>Selected Dates:</h3>
                    <p>Destination: {destination || '-'}</p>
                    <p>Start Date: {formattedStartDate || '-'}</p>
                    <p>End Date: {formattedEndDate || '-'}</p>
                    <p>Length of Nights: {lengthOfNights > 0 ? lengthOfNights : '-'}</p>
               </div> */}
          </Fragment>
     )
}

export default InspirationImages