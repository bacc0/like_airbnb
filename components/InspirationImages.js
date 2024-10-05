import React, { Fragment, useState, useEffect } from 'react'
import CardAdver from '../components/CardAdver';
import { AnimatePresence, motion } from 'framer-motion'; // Import motion from Framer Motion
import styles from '../src/styles/index.module.css'; // 
import BorderLinearProgress from '../components/BorderLinearProgress';


const InspirationImages = ({
     calendarIsVisible,
     // destination, formattedStartDate,formattedEndDate,lengthOfNights
}) => {

     const [BorderLinearProgress_Visible, setBorderLinearProgress_Visible] = useState(true);

     useEffect(() => {
          setTimeout(() => {
               setBorderLinearProgress_Visible(false);
          }, 1100);
     }, []);

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
               {BorderLinearProgress_Visible && <BorderLinearProgress />}
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

                              initial={{
                                   opacity: 0, translateY: calendarIsVisible ? 20 : 80, scale: 1.15
                              }}
                              animate={{
                                   opacity: 1, translateY: calendarIsVisible ? 70 : 70, scale: 1
                              }}

                              transition={{ duration: 0.6, delay: calendarIsVisible ? 0.1 : 0.63 }}

                              style={{ position: 'relative', top: -80, transition: 'top 0.35s ease' }}
                         >
                              {cards1}
                         </motion.div>
                    </motion.div>
               </div>

          </Fragment>
     )
}

export default InspirationImages