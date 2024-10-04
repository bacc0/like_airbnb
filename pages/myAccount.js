import React, { useState } from "react";
import { Container, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router"; // Import Next.js useRouter
import styles from '../src/styles/index.module.css'; // Import as a CSS module
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import Image from 'next/image';

const AddNewProperty = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(true); // State to manage form visibility
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to manage success message visibility
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const router = useRouter(); // Initialize useRouter for redirection

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password validation (At least one capital letter, one small letter, one special character, and a minimum of 8 characters)
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@£$%^&*().,"']).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleCreateUser = () => {
        // Reset error messages
        setEmailError('');
        setPasswordError('');

        // Validate email and password
        const isEmailValid = validateEmail(newUser.email);
        const isPasswordValid = validatePassword(newUser.password);

        if (!isEmailValid) {
            setEmailError('Invalid email format.');
        }

        if (!isPasswordValid) {
            setPasswordError('Password must be at least 8 characters long, contain at least one capital letter, one small letter, and one special symbol (e.g. @£$%^&*().,").');
        }

        // If either email or password is invalid, stop the process
        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        setIsLoading(true);

        // Actual user creation logic
        fetch(`https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Users/${newUser.username}.json`, {
            method: 'PUT', // Use PUT to save user under the specific username
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Credentials: {
                    Email: newUser.email,
                    Password: newUser.password
                },
                isListing: false // Default value for a new user
            }),
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                setFormVisible(false);
                setShowSuccessMessage(true);

                // After 2 seconds, redirect to the index page with query parameter
                setTimeout(() => {
                    router.push({
                        pathname: "/",
                        query: { showLogin: true } // Pass query parameter to show the modal on the index page
                    });
                }, 2000);
            })
            .catch(error => {
                console.error('Error creating user:', error);
                setIsLoading(false);
            });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const redirectToHome = () => {
        router.push("/");
    };

    return (
        <div>
            <motion.div
                onClick={redirectToHome}
                className={styles.custom_date_picker_container}
                initial={{ opacity: 0, translateY: 43, translateX: 33, scale: 1 }}
                animate={{ opacity: 1, translateY: 43, translateX: 33, scale: 1 }}
                transition={{ duration: 0.55, delay: 0 }}
                style={{
                    top: 45, left: 45,
                    position: 'absolute', top: 0, left: 0,
                    cursor: 'pointer'
                }}
            >
                <Image
                    src="/alibmb2.svg"
                    width={130}
                    height={60}
                    alt="Logo"
                />
            </motion.div>

            <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                {formVisible ? (
                    <motion.div
                        initial={{
                            opacity: 0.5,
                            translateY: -30,
                            translateX: 0,
                            scale: 1.3
                        }} // Initial state
                        animate={{
                            opacity: 1,
                            translateY: 0,
                            translateX: 0,
                            scale: 1
                        }} // Animate to visible state
                        transition={{ duration: 0.35, delay: 0, type: "spring", stiffness: 200 }}
                    >
                        <h1 style={{ textAlign: 'center' }}>Create New User</h1>

                        <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                            <InputLabel htmlFor="outlined-adornment-username">Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username"
                                name="username"
                                value={newUser.username}
                                onChange={handleInputChange}
                                startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
                                label="Username"
                            />
                        </FormControl>

                        <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                name="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                                startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
                                label="Email"
                            />
                            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        </FormControl>

                        <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={newUser.password}
                                onChange={handleInputChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                        </FormControl>

                        <Button
                            variant="outlined"
                            color="info"
                            size="large"
                            fullWidth
                            sx={{ my: 2, backgroundColor: '#000000', color: '#ffffff', height: 60, borderRadius: 50 }}
                            onClick={handleCreateUser}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create User'}
                        </Button>

                        {/* New Button to Redirect to Home */}
                        <Button
                            variant="outlined"
                            color="info"
                            size="large"
                            fullWidth
                            sx={{ my: 2, backgroundColor: '#ffffff', color: '#000000', height: 60, borderRadius: 50, border: '0.3px solid #999' }}
                            onClick={redirectToHome}
                        >
                            Go to Home
                        </Button>
                    </motion.div>
                ) : (
                    showSuccessMessage && (
                        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <h2 style={{ fontWeight: 400, color: '#FF385C' }}>User created successfully!</h2>
                        </motion.div>
                    )
                )}

            </Container>
        </div>
    );
};

export default AddNewProperty;



// import React, { useState } from "react";
// import { Container, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useRouter } from "next/router"; // Import Next.js useRouter
// import { motion } from 'framer-motion'; // For animations



// const AddNewProperty = () => {

//     const [isLoading, setIsLoading] = useState(false);
//     const [formVisible, setFormVisible] = useState(true); // State to manage form visibility
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to manage success message visibility
//     const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
//     const [showPassword, setShowPassword] = useState(false);

//     const router = useRouter(); // Initialize useRouter for redirection

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewUser({ ...newUser, [name]: value });
//     };

//     const handleCreateUser = () => {
//         if (!newUser.username || !newUser.email || !newUser.password) {
//             alert("All fields are required!");
//             return;
//         }

//         setIsLoading(true);

//         // Actual user creation logic
//         fetch(`https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Users/${newUser.username}.json`, {
//             method: 'PUT', // Use PUT to save user under the specific username
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 Credentials: {
//                     Email: newUser.email,
//                     Password: newUser.password
//                 },
//                 isListing: false // Default value for a new user
//             }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 // Once the user is created, hide the form and show the success message
//                 setIsLoading(false);
//                 setFormVisible(false);
//                 setShowSuccessMessage(true);

//                 // After 4 seconds, redirect to the index page with query parameter
//                 setTimeout(() => {
//                     router.push({
//                         pathname: "/",
//                         query: { showLogin: true } // Pass query parameter to show the modal on the index page
//                     });
//                 }, 2000);
//             })
//             .catch(error => {
//                 console.error('Error creating user:', error);
//                 setIsLoading(false);
//             });
//     };

//     const handleClickShowPassword = () => setShowPassword((show) => !show);
//     const handleMouseDownPassword = (event) => event.preventDefault();

//     const redirectToHome = () => {
//         router.push("/home");
//     };

//     return (
//         <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//             {formVisible ? (
//                 <motion.div
//                     initial={{
//                         opacity: 0.5,
//                         translateY: -30,
//                         translateX: 0,
//                         scale: 1.3
//                     }} // Initial state
//                     animate={{
//                         opacity: 1,
//                         translateY: 0,
//                         translateX: 0,
//                         scale: 1
//                     }} // Animate to visible state
//                     transition={{ duration: 0.35, delay: 0, type: "spring", stiffness: 200 }}

//                 >
//                     <h1 style={{ textAlign: 'center' }}>Create New User</h1>

//                     <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
//                         <InputLabel htmlFor="outlined-adornment-username">Name</InputLabel>
//                         <OutlinedInput
//                             id="outlined-adornment-username"
//                             name="username"
//                             value={newUser.username}
//                             onChange={handleInputChange}
//                             startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
//                             label="Username"
//                         />
//                     </FormControl>

//                     <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
//                         <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
//                         <OutlinedInput
//                             id="outlined-adornment-email"
//                             name="email"
//                             value={newUser.email}
//                             onChange={handleInputChange}
//                             startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
//                             label="Email"
//                         />
//                     </FormControl>

//                     <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
//                         <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//                         <OutlinedInput
//                             id="outlined-adornment-password"
//                             name="password"
//                             type={showPassword ? 'text' : 'password'}
//                             value={newUser.password}
//                             onChange={handleInputChange}
//                             endAdornment={
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="toggle password visibility"
//                                         onClick={handleClickShowPassword}
//                                         onMouseDown={handleMouseDownPassword}
//                                     >
//                                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             }
//                             label="Password"
//                         />
//                     </FormControl>

//                     <Button
//                         variant="outlined"
//                         color="info"
//                         size="large"
//                         fullWidth
//                         sx={{ my: 2, backgroundColor: '#000000', color: '#ffffff', height: 60, borderRadius: 50 }}
//                         onClick={handleCreateUser}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? 'Creating...' : 'Create User'}
//                     </Button>

//                     {/* New Button to Redirect to Home */}
//                     <Button
//                         variant="outlined"
//                         color="info"
//                         size="large"
//                         fullWidth
//                         sx={{ my: 2, backgroundColor: '#ffffff', color: '#000000', height: 60, borderRadius: 50, border: '0.3px solid #999' }}
//                         onClick={redirectToHome}
//                     >
//                         Go to Home
//                     </Button>
//                 </motion.div>
//             ) : (
//                 showSuccessMessage && (
//                     <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
//                         <h2 style={{ fontWeight: 400, color: '#FF385C'}}>User created successfully!</h2>
//                     </motion.div>
//                 )
//             )}
//         </Container>
//     );
// };

// export default AddNewProperty;
