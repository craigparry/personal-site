import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PersonalCard() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ align: 'center', maxWidth: '50%' }}>
                <CardMedia
                    component="img"
                    alt="card picture"
                    height="250"
                    image='/electronic-stock.jpg'
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Craig Parry
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        I am a software engineer currently working for United HealthGroup. I am a competent web developer, backend engineer, devops practitioner, and enjoy learning new technologies.
                        This year I am aspiring to build more data pipelines, learn new cloud engineering tools and to apply AI tools to my workflows.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}