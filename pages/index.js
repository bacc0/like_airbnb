
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../src/styles/index.module.css'; // Import as a CSS module
import { AnimatePresence, motion } from 'framer-motion'; // Import motion from Framer Motion
import Image from 'next/image';

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from 'next/link'; // Make sure to use Next.js Link
import CardAdver from '../components/CardAdver';
import MainButtons from '../components/MainButtons';

import ButtonLogin from '../components/ModalLogin';
import PersonIcon from '@mui/icons-material/Person';
import AddHomeIcon from '@mui/icons-material/AddHome';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import BorderLinearProgress from '../components/BorderLinearProgress';
import ModalLogin from '../components/ModalLogin';
import ModalAccount from '../components/ModalAccount';

export default function Index() {
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState(''); // State for user's name
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [destination, setDestination] = useState('');
    const [formattedStartDate, setFormattedStartDate] = useState('');
    const [formattedEndDate, setFormattedEndDate] = useState('');
    const [lengthOfNights, setLengthOfNights] = useState(0);
    const [calendarIsVisible, setCalendarIsVisible] = useState(false);
    const [BorderLinearProgress_Visible, setBorderLinearProgress_Visible] = useState(true);
    const [open, setOpen] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);

    const router = useRouter(); // For redirection if needed

    const openMyAccount = () => {
        router.push('/myAccount'); // Navigate to the home page ("/")
    };


    useEffect(() => {
        if (isLogin) {
            handleClose();
        }
    }, [isLogin]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenAccount = () => setOpenAccount(true);
    const handleCloseAccount = () => setOpenAccount(false);

    const handleLogOut = () => {
        setIsLogin(false);
        setName(''); // Clear the user's name on logout
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setDateRange([start, end]); // Update both start and end dates

        if (start && end) {
            setFormattedStartDate(start.toLocaleDateString());
            setFormattedEndDate(end.toLocaleDateString());

            const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            setLengthOfNights(nights);
        } else {
            setFormattedStartDate('');
            setFormattedEndDate('');
            setLengthOfNights(0);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setBorderLinearProgress_Visible(false);
        }, 800);
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
        <div
            style={{
                backgroundSize: 'cover',
                minHeight: 480
            }}
        >

            {BorderLinearProgress_Visible && <BorderLinearProgress />}

            <Box sx={{ flexGrow: 1 }}>
                <AppBar style={{
                    background: '#ffffff',
                    boxShadow: '0 0 0',
                    height: 100
                }}
                    position="static"
                >
                    <motion.div
                        className={styles.custom_date_picker_container}
                        initial={{ opacity: 0, translateY: 43, translateX: 33, scale: 1 }}
                        animate={{ opacity: 1, translateY: 43, translateX: 33, scale: 1 }}
                        transition={{ duration: 0.55, delay: 0 }}
                        style={{ top: 45, left: 45 }}
                    >
                        <Image
                            src="/alibmb2.svg"
                            width={130}
                            height={60}
                            alt="Logo"
                        />
                    </motion.div>


                    <motion.div
                        className={styles.custom_date_picker_container}
                        initial={{ opacity: 0, translateY: -66, scale: 0.6 }}
                        animate={{ opacity: 1, translateY: -66, scale: 1 }}
                        transition={{ duration: 0.35, delay: 1.1, type: "spring", stiffness: 200 }}
                        style={{ position: "relative", top: 36 }}
                    >
                        <MainButtons
                            calendarIsVisible={calendarIsVisible}
                            setCalendarIsVisible={setCalendarIsVisible}
                            destination={destination}
                            setDestination={setDestination}
                            isLogin={isLogin}
                        />
                    </motion.div>

                    <AnimatePresence>
                        {isLogin && (
                            <motion.div
                                initial={{ opacity: 0, translateY: 43, translateX: 33, scale: 0 }}
                                animate={{ opacity: 1, translateY: 43, translateX: 33, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.7, type: "spring", stiffness: 200 }}
                                exit={{ opacity: 0, scale: 0 }}
                                style={{
                                    position: 'absolute', top: 12, left: 140,
                                    cursor: 'pointer',
                                }}

                            >
                                <Button
                                    onClick={handleOpenAccount}
                                    className={styles.button_my_account}>
                                    My account
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className={styles.custom_date_picker_container}
                        initial={{ opacity: 0, translateY: 0, scale: 1 }}
                        animate={{ opacity: 1, translateY: 0, scale: 1 }}
                        transition={{ duration: 0.55, delay: 0 }}
                        style={{
                            position: "absolute",
                            top: 46,
                            right: 45,
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 0 10px #bdbdbd',
                            borderRadius: 36
                        }}
                    >
                        <div
                            className={styles.button_list_item}
                            style={{
                                // position: 'relative',
                                // top: -11,
                            }}
                        >
                            <Image

                                src="/rentout.svg"
                                width={80}
                                height={36}
                                alt="Rent out button"
                            />
                        </div>
                        <Button
                            onClick={isLogin ? handleLogOut : handleOpen}
                            className={styles.button_account}
                            // style={{ marginLeft: 20 }}
                            variant="outlined" startIcon={<PersonIcon />}
                        >
                            <div>{isLogin ? 'Log Out' : 'My Account'}</div>
                            <div
                                style={{
                                    fontSize: 10,
                                    width: isLogin ? 40 : 0,
                                    marginLeft: 6,
                                    overflow: 'hidden',         // Hide any overflowed content
                                    textOverflow: 'ellipsis',   // Show "..." if the text is too long
                                    whiteSpace: 'nowrap'        // Prevent the text from wrapping to the next line
                                }}
                            >
                                {isLogin ? `${name}` : ''}
                            </div>
                        </Button>
                    </motion.div>
                </AppBar>
            </Box>

            <ModalLogin
                handleClose={handleClose}
                open={open}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                name={name} // Pass the setName function to ModalLogin
                setName={setName} // Pass the setName function to ModalLogin
            />
            <ModalAccount
                handleCloseAccount={handleCloseAccount}
                openAccount={openAccount}
                // isLogin={isLogin}
                // setIsLogin={setIsLogin}
                name={name} // Pass the setName function to ModalLogin
                // setName={setName} // Pass the setName function to ModalLogin
            />
            

            {
                calendarIsVisible && (
                    <motion.div
                        className={styles.custom_date_picker_container}
                        initial={{ opacity: 0, translateY: 46, scale: 1 }}
                        animate={{ opacity: 1, translateY: 68, scale: 1.3 }}
                        exit={{ opacity: 0, translateY: -30 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                    >
                        <div className={styles.custom_date_picker}>
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                inline
                                minDate={new Date()}
                                maxDate={new Date().setDate(new Date().getDate() + 180)}
                                monthsShown={2}
                                calendarClassName={styles.custom_calendar}
                            />
                        </div>
                    </motion.div>
                )
            }

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

            <div style={{ position: 'absolute', bottom: 0, left: 50, background: '#ffffffcc', padding: 30, borderRadius: 20 }}>
                <h3>Selected Dates:</h3>
                <p>Destination: {destination || '-'}</p>
                <p>Start Date: {formattedStartDate || '-'}</p>
                <p>End Date: {formattedEndDate || '-'}</p>
                <p>Length of Nights: {lengthOfNights > 0 ? lengthOfNights : '-'}</p>
            </div>
        </div >
    );
}






// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// import DatePicker from 'react-datepicker';

// import 'react-datepicker/dist/react-datepicker.css';
// import styles from '../src/styles/index.module.css'; // Import as a CSS module
// import { motion } from 'framer-motion'; // Import motion from Framer Motion
// import Image from 'next/image'

// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import Link from 'next/link'; // Make sure to use Next.js Link
// import CardAdver from '../components/CardAdver'
// import MainButtons from '../components/MainButtons';

// import ButtonLogin from '../components/ModalLogin'
// import PersonIcon from '@mui/icons-material/Person';
// import AddHomeIcon from '@mui/icons-material/AddHome';

// import Box from '@mui/material/Box';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// // import MenuIcon from '@mui/icons-material/Menu';


// import BorderLinearProgress from '../components/BorderLinearProgress'



// import ModalLogin from '../components/ModalLogin'



// export default function Index() {


//     const [isLogin, setIsLogin] = React.useState(false);
//     // State to manage both start and end dates for range selection
//     const [dateRange, setDateRange] = useState([null, null]);
//     const [startDate, endDate] = dateRange;

//     const [destination, setDestination] = useState('');

//     // States for formatted start date, end date, and length of nights
//     const [formattedStartDate, setFormattedStartDate] = useState('');
//     const [formattedEndDate, setFormattedEndDate] = useState('');
//     const [lengthOfNights, setLengthOfNights] = useState(0);
//     const [calendarIsVisible, setCalendarIsVisible] = useState(false);
//     const [BorderLinearProgress_Visible, setBorderLinearProgress_Visible] = useState(true);

//     useEffect(() => {

//         if (isLogin) {
//             handleClose()
//         }
//     }, [isLogin]);

//     // state for modal loging
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const handleLogOut = () => setIsLogin(false);


//     // Get today's date and calculate the date 180 days from today
//     const today = new Date();
//     const maxDate = new Date();
//     maxDate.setDate(today.getDate() + 180); // Set maximum date to 180 days from today

//     useEffect(() => {
//         setTimeout(() => {
//             setBorderLinearProgress_Visible(false)
//         }, 800);
//     }, []);

//     const handleDateChange = (dates) => {
//         const [start, end] = dates;
//         setDateRange([start, end]); // Update both start and end dates

//         if (start && end) {
//             // Format the dates
//             setFormattedStartDate(start.toLocaleDateString());
//             setFormattedEndDate(end.toLocaleDateString());

//             // Calculate the length of nights
//             const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//             setLengthOfNights(nights);
//         } else {
//             // Reset the values if dates are not fully selected
//             setFormattedStartDate('');
//             setFormattedEndDate('');
//             setLengthOfNights(0);
//         }
//     };


//     const cards1 = (
//         <div style={{ display: 'flex', maxWidth: 1200 }}>
//             <CardAdver
//                 img={"/cuba1.jpg"}
//                 title={'Havana'}
//                 text={'Join a living room session with Doja Hosted by Doja CatHosted by Doja Cat'}
//             />
//             <CardAdver
//                 img={"/monaco.jpg"}
//                 title={'Monaco'}
//                 text={'Stay in Prince’s Purple Rain house Hosted by Wendy and LisaHosted by Wendy and Lisa'}
//             />
//             <CardAdver
//                 img={"/tokyo.jpg"}
//                 title={'Tokyo'}
//                 text={'Open the Olympic Games at Musée d’Orsay Hosted by Mathieu LehanneurHosted by Mathieu Lehanneur'}
//             />



//         </div>
//     )

//     const cards2 = (
//         <div style={{ display: 'flex', maxWidth: 1200 }}>
//             <CardAdver
//                 img={"/beiging.jpg"}
//                 title={'Beiging'}
//                 text={'Spend the night in the Fer Museum Hosted by Kevin Li'}
//             />
//             <CardAdver
//                 img={"/moscow.jpg"}
//                 title={'Moscow'}
//                 text={'Go on tour with Feid Hosted by FeidHosted by Ivan'}
//             />
//             <CardAdver
//                 img={"/newY.jpg"}
//                 title={'New York'}
//                 text={'Game with Khaby Lame Hosted by Khaby LameHosted by Khaby Lame'}
//             />



//         </div>
//     )

//     return (
//         <div
//             style={{
//                 // backgroundImage: "url(/bg11.jpg)",
//                 'background-size': 'cover',
//                 '-webkit-background-size': 'cover',
//                 '-moz-background-size': 'cover',
//                 '-o-background-size': 'cover',
//                 minHeight: 480
//             }}
//         >

//             {BorderLinearProgress_Visible && <BorderLinearProgress />}


//             <Box sx={{ flexGrow: 1 }}>
//                 <AppBar style={{
//                     background: '#ffffff',
//                     boxShadow: '0 0 0',
//                     height: 100
//                 }}
//                     position="static"
//                 >
//                     <motion.div
//                         className={styles.custom_date_picker_container}
//                         initial={{
//                             opacity: 0,
//                             translateY: 43,
//                             translateX: -100,
//                             scale: 1
//                         }} // Initial state
//                         animate={{
//                             opacity: 1,
//                             translateY: 43,
//                             translateX: 33,
//                             scale: 1
//                         }} // Animate to visible state
//                         transition={{ duration: 0.35, delay: 1.2, type: "spring", stiffness: 200 }}

//                         style={{
//                             // position: "absolute",
//                             top: 45,
//                             left: 45

//                         }}
//                     >
//                         <Image
//                             src="/alibmb2.svg"
//                             width={130}
//                             height={60}
//                             alt="Picture of the logo"
//                         />

//                     </motion.div>





//                     <motion.div
//                         className={styles.custom_date_picker_container}
//                         initial={{ opacity: 0, translateY: -66, scale: 0.6 }} // Initial state
//                         animate={{ opacity: 1, translateY: -66, scale: 1 }} // Animate to visible state
//                         transition={{ duration: 0.35, delay: 1.1, type: "spring", stiffness: 200 }}

//                         style={{
//                             position: "relative",
//                             top: 36,

//                         }}
//                     >

//                         <MainButtons
//                             calendarIsVisible={calendarIsVisible}
//                             setCalendarIsVisible={setCalendarIsVisible}
//                             destination={destination}
//                             setDestination={setDestination}
//                         />
//                     </motion.div>



//                     <motion.div
//                         className={styles.custom_date_picker_container}
//                         initial={{ opacity: 0, translateY: 0, scale: 3 }} // Initial state
//                         animate={{ opacity: 1, translateY: 0, scale: 1 }} // Animate to visible state
//                         transition={{ duration: 0.35, delay: 0.7, type: "spring", stiffness: 200 }}

//                         style={{
//                             position: "absolute",
//                             top: 57,
//                             right: 45

//                         }}
//                     >
//                         <Image
//                             src="/rentout.svg"
//                             width={80}
//                             height={36}
//                             alt="Picture of the rent out button"
//                         />

//                         {/* <Link href="login/" passHref> */}
//                         <Button
//                              onClick={isLogin ?handleLogOut : handleOpen}
//                             className={styles.button_account}
//                             style={{ marginLeft: 20 }}
//                             variant="outlined" startIcon={<PersonIcon />}
//                         >
//                             {isLogin ? '1Log Out' : 'My Account'}

//                         </Button>
//                         {/* </Link> */}
//                     </motion.div>


//                 </AppBar>
//             </Box>




//             < ModalLogin
//                 handleClose={handleClose}
//                 open={open}


//                 isLogin={isLogin}
//                 setIsLogin={setIsLogin}
//             />





//             {
//                 calendarIsVisible && (

//                     <motion.div
//                         className={styles.custom_date_picker_container}
//                         initial={{ opacity: 0, translateY: 46, scale: 1 }} // Initial state
//                         animate={{ opacity: 1, translateY: 68, scale: 1.3 }} // Animate to visible state
//                         exit={{ opacity: 0, translateY: -30 }} // Exit state
//                         transition={{ duration: 0.35, delay: 0.05 }} // Duration for the animation
//                     >
//                         <div className={styles.custom_date_picker}>


//                             <DatePicker
//                                 // modifiersStyles={

//                                 //         midDays: {
//                                 //             color: 'red';
//                                 //             fontWeight: 5;
//                                 //             backgroundColor: 'lime';
//                                 //         }

//                                 // }

//                                 selected={startDate}
//                                 onChange={handleDateChange} // Updated function for date change
//                                 selectsRange
//                                 startDate={startDate}
//                                 endDate={endDate}
//                                 inline
//                                 minDate={today} // Prevent past date selection
//                                 maxDate={maxDate} // Limit selection to the next 180 days
//                                 monthsShown={2} // Show two months side by side
//                                 calendarClassName={styles.custom_calendar} // Apply the custom class for calendar styling
//                             // showTimeSelect
//                             />
//                         </div>
//                     </motion.div>
//                 )
//             }

//             {/* Display 1st screen adds*/}
//             <div
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     background: "#ffffff",
//                     marginTop: 120
//                 }}
//             >

//                 <motion.div
//                     className={styles.custom_date_picker_container}
//                     initial={{ opacity: 0.0, translateY: 520, scale: 1.3 }} // Initial state
//                     animate={{ opacity: 1, translateY: 128, scale: 1.3 }} // Animate to visible state
//                     exit={{ opacity: 0, translateY: -30 }} // Exit state
//                     transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 200 }} // Duration for the animation

//                     style={{
//                         position: 'relative',
//                         top: calendarIsVisible ? 0 : -80,

//                         transition: 'top 0.35s  ease',
//                         WebkitTransition: 'top 0.35s', // 3-second transition for Safari
//                     }}
//                 >
//                     <h3>Inspiration from past experiences</h3>
//                     {cards2}

//                     <motion.div
//                         className={styles.custom_date_picker_container}
//                         initial={{ opacity: 0.0, translateY: 320, scale: 1.5 }} // Initial state
//                         animate={{ opacity: 1, translateY: 70, scale: 1 }} // Animate to visible state
//                         exit={{ opacity: 0, translateY: -30 }} // Exit state
//                         transition={{ duration: 0.7, delay: 0.82, type: "spring", stiffness: 200 }} // Duration for the animation

//                         style={{
//                             position: 'relative',
//                             top: calendarIsVisible ? 0 : -80,

//                             transition: 'top 0.35s  ease',
//                             WebkitTransition: 'top 0.35s', // 3-second transition for Safari
//                         }}
//                     >
//                         {cards1}
//                     </motion.div>
//                 </motion.div>





//             </div>




//             {/* Display selected dates and length of nights */}
//             <div style={{ position: 'absolute', bottom: 0, left: 50, background: '#ffffffcc', padding: 30, borderRadius: 20 }}>
//                 <h3>Selected Dates:</h3>

//                 <p>Destination: {destination || '-'}</p>
//                 <p>Start Date: {formattedStartDate || '-'}</p>
//                 <p>End Date: {formattedEndDate || '-'}</p>
//                 <p>Length of Nights: {lengthOfNights > 0 ? lengthOfNights : '-'}</p>
//             </div>
//         </div >
//     );
// }
