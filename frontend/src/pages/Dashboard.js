import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Dashboard() {
    return (
        <Container style={{padding:20, minHeight:'450px'}}>
            <Box>
            <Typography
            variant="h2"
            noWrap
            component="a"
            sx={{ mr: 2, fontFamily: 'arial',fontWeight: 700,letterSpacing: '.3rem', 
            wordWrap:'normal', 
            fontSize:'2rem',
            lineHeight:'5rem'
            }} >Dashboard
            </Typography>
            </Box>
            <Box>
            <Typography
            variant="h3"
            noWrap
            component="a"
            sx={{
            mr: 2, 
            fontFamily: 'arial',
            fontWeight: 700,
            letterSpacing: '.1rem', 
            wordWrap:'normal', 
            fontSize:'1rem',
            lineHeight:'1.5rem',
            whiteSpace:'normal'
            }} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Typography>
            </Box>
        </Container>
    )
}
