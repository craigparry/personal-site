'use client'
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function Footer() {
    const theme = useTheme();
    return (
        <Box

            sx={{
                p: '2rem',
                width: '100%',
                position: 'fixed',
                bottom: 0,
                backgroundColor: theme.palette.primary.main,
            }}
            component="footer"
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color='primary.contrastText' align="center">
                    {"Copyright © "}
                    <Link color="inherit" href="https://your-website.com/">
                        Your Website
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </Container>
        </Box>
    );
}