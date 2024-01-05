import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ExperienceTreeView from './ExperienceTree';

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "50vh",
}));

export default function BasicGrid() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <ExperienceTreeView />
            </Grid>
            <Grid item xs={8} >
                <Item>Custom prop here that will display a given item based off of selection form Tree</Item>
            </Grid>
        </Grid>
    );
}