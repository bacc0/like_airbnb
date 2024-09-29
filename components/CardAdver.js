import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function CardAdver({ img, title, text }) {
     return (
          <div style={{ width: 240, margin: '8px 10px ', borderRadius: 20 }}>

               <CardMedia
                    style={{ width: 240, height: 240, borderRadius: 20 }}
                    component="img"
                    height="140"
                    image={img}
                    alt={img}
               />
               <CardContent>
                    <Typography gutterBottom variant="h6" component="div" style={{color: "#FF385C", fontSize: 15 }}>
                         {title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontSize: 11 }}>
                         {text}

                    </Typography>
               </CardContent>

          </div>
     );
}
