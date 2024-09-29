import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from 'next/link'; // Use Next.js's Link

const AddNewProperty = () => {
     return (
          <Container maxWidth="sm">
               <h1>login</h1>
               {/* Use Link from Next.js with passHref */}
               <Link href="/" passHref>
                    <Button>Go Back to Home</Button>
               </Link>
               <p>Add your new property details here.</p>
          </Container>
     );
};

export default AddNewProperty;
