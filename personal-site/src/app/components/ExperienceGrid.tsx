'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ExperienceTreeView from './ExperienceTree';
import ExperienceTable from './ExperienceTable';


const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "50vh",
}));


export default function BasicGrid() {
    const [experienceDescripiton, setExperienceDescription] = React.useState<{}>({});
    const [listofExperience, setListofExperience] = React.useState<[]>([]);
    const [header, setHeader] = React.useState<string>("Please select a path of experience on the dropdown menu.");

    React.useEffect(() => {
        let tempList: any = []
        Object.entries(experienceDescripiton).forEach(([key, index]) => {
            tempList.push([key, index]);
        })
        setListofExperience(tempList)
    }, [experienceDescripiton]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <ExperienceTreeView setExperience={setExperienceDescription} setHeader={setHeader} />
            </Grid>
            <Grid item xs={8} >
                <ExperienceTable tableData={listofExperience} header={header}></ExperienceTable>
            </Grid>
        </Grid>
    );
}