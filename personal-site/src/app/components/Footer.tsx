'use client'
import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                p: '0.5rem',
                width: '100%',
                position: 'fixed',
                bottom: 0,
                backgroundColor: theme.palette.primary.main,
            }}
            component="footer"
        >
            <Box display="flex" justifyContent="flex-end">
                <a target="_blank" href="https://github.com/craigparry" rel="noopener noreferrer">
                    <IconButton onClick={() => { console.log('github') }} size='small' >
                        <GitHubIcon sx={{ color: theme.palette.primary.contrastText }} />
                    </IconButton>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/craig-parry-599a70144/" rel="noopener noreferrer">
                    <IconButton onClick={() => { console.log('linkedin') }} size='small' >
                        <LinkedInIcon sx={{ color: theme.palette.primary.contrastText }} />
                    </IconButton>
                </a>
            </Box>
            <Typography variant="body2" color='primary.contrastText' align="center" >
                {"Copyright © "}
                <Link color="inherit" href="https://google.com/" rel="noopener noreferrer">
                    Your Website
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </Box >
    );
}