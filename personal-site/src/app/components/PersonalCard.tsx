import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PersonalCard() {
  return (
    <Card sx={{ align: 'center', maxWidth: '50%' }}>
      <CardMedia
        component="img"
        alt="card picture"
        height="250"
        image= '/random-cat.jpg'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Craig Parry
        </Typography>
        <Typography variant="body2" color="text.secondary">
          I am a software engineer, currently working or United HealthGroup. I am a competent, web developer, backend engineer, devops practitioner. 
          This year I am aspiring to build more data pipelines, learn new devops tools and to learn and apply AI toolsets to my workflows.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}