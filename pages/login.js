import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField"; // For input fields
import Link from 'next/link'; // Use Next.js's Link

const AddNewProperty = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [usersData, setUsersData] = useState(null);
     const [newUser, setNewUser] = useState({
          username: "",
          email: "",
          password: ""
     });

     useEffect(() => {
          setIsLoading(true);
          fetch('https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Users.json')
               .then(response => response.json())
               .then(data => {
                    setUsersData(data);
                    setIsLoading(false);

                    // Log each user
                    Object.entries(data).forEach(([key, value]) => {
                         // console.log(`Username: ${key}, Data: `, value);
                         console.log(key);
                         console.log(value.Credentials.Email);
                         console.log(value.Credentials.Password);
                         console.log('- - - - - -');
                    });
               })
               .catch(error => {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
               });
     }, []);

     // console.log(usersData)

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setNewUser({ ...newUser, [name]: value });
     };

     const handleCreateUser = () => {
          if (!newUser.username) {
               alert("Username is required!");
               return;
          }

          setIsLoading(true);
          // Create the user with the username as the key
          fetch(`https://airbnb-d4964-default-rtdb.europe-west1.firebasedatabase.app/Users/${newUser.username}.json`, {
               method: 'PUT', // Using PUT to save under the specific username key
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
                    // Update local state with new user
                    setUsersData({ ...usersData, [newUser.username]: data });
                    setNewUser({ username: "", email: "", password: "" }); // Clear form
                    setIsLoading(false);
               })
               .catch(error => {
                    console.error('Error creating user:', error);
                    setIsLoading(false);
               });
     };

     if (isLoading) {
          return <div>Loading...</div>;
     }

     return (
          <Container maxWidth="sm">
               <h1>User List</h1>
               {/* {usersData ? (
                    <ul>
                         {Object.entries(usersData).map(([key, user]) => (
                              <li key={key}>
                                   {key}: {JSON.stringify(user)}
                              </li>
                         ))}
                    </ul>
               ) : (
                    <p>No users found</p>
               )} */}

               <h1>Create New User</h1>
               <TextField
                    label="Username"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
               />
               <TextField
                    label="Email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
               />
               <TextField
                    label="Password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    type="password"
               />
               <Button variant="contained" color="primary" onClick={handleCreateUser}>
                    Create User
               </Button>

               <h1>Login</h1>
               <Link href="/" passHref>
                    <Button>Go Back to Home</Button>
               </Link>
          </Container>
     );
};

export default AddNewProperty;
