'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation'

const pages = ['test'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onResumeClick = () => {
        const pdfUrl = "Craig_Parry_Resume_1_17_24.pdf";
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Craig_Parry_Resume.pdf"; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const theme = useTheme();
    const router = useRouter()

    return (
        <AppBar sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: '0.5rem',
        }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Cursive',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        href={'http://localhost:3000'}
                    >
                        CLP
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => { router.push(window.location.protocol + "//" + window.location.host + '/' + page.toLowerCase()) }}
                                sx={{ my: 1, color: theme.palette.primary.contrastText, display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}
                        <Button
                            key="Resume"
                            onClick={onResumeClick}
                            sx={{ my: 1, color: theme.palette.primary.contrastText, display: 'block' }}
                        >
                            Resume
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default ResponsiveAppBar;