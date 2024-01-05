'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonalCard from './PersonalCard';
import ProjectsGrid from './Projects'
import BasicGrid from './ExperienceGrid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Personal Info" {...a11yProps(0)} />
                    <Tab label="Projects" {...a11yProps(1)} />
                    <Tab label="Work and Education" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <PersonalCard />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ProjectsGrid />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <BasicGrid />
            </CustomTabPanel>
        </Box >
    );
}