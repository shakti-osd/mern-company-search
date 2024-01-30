import React from 'react';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export default function Profile() {
  return (
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <p>Edit user</p>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <InputLabel id="demo-multiple-name-label">Company name</InputLabel>
                <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <InputLabel id="demo-multiple-name-label">Company Website</InputLabel>
                <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
            </Grid>
        </Grid>
        <Grid container spacing={2}> 
            <Grid item xs={6}>
                <InputLabel id="demo-multiple-name-label">Company name</InputLabel>
                <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
                <FormControl sx={{ m: 1, minWidth: "100%" }}>
                    <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
                    <Select defaultValue="" id="grouped-select" label="Grouping">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Option 1</MenuItem>
                        <MenuItem value={2}>Option 2</MenuItem>
                        <MenuItem value={3}>Option 3</MenuItem>
                        <MenuItem value={4}>Option 4</MenuItem>
                    </Select>
                </FormControl>
                
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <InputLabel id="demo-multiple-name-label">Company name</InputLabel>
                <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <InputLabel id="demo-multiple-name-label">Company Website</InputLabel>
                <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
            </Grid>
        </Grid>
    </Container>
  )
}
