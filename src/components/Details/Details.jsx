import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardActions, Chip, CardContent } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

const Details = ({ place, selected, refProp }) => 
{
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start"})

    return(
        <Card elevation = {6}>
            <CardMedia 
                style = {{height: 350}}
                image = {place.photo ? place.photo.images.large.url : 'https://media.cntraveler.com/photos/5859aad8eaa56c5e65d43539/16:9/w_2048,h_1152,c_limit/best-restaurants-NYC-Charlie-Bird-interior-2016.jpg'}
                title = {place.name}
            />
            <CardContent>
                <Typography gutterBottom varient = "h5">{place.name}</Typography>
                <Box display = "flex" justifyContent = "spaceBetween">
                    <Rating value = {Number(place.rating)} readOnly />
                    <Typography gutterBottom varient = "subtitle1">Out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display = "flex" justifyContent = "spaceBetween">
                    <Typography varient = "subtitle1">Price</Typography>
                    <Typography gutterBottom varient = "subtitle1">{place.price_level}</Typography>
                </Box>
                <Box display = "flex" justifyContent = "spaceBetween">
                    <Typography varient = "subtitle1">Ranking</Typography>
                    <Typography gutterBottom varient = "subtitle1">{place.ranking}</Typography>
                </Box>

                {place?.awards?.map((award) => (
                    <Box my = {1} display = "flex" justifyContent = "spaceBetween" alignItems = "center">
                        <img src = {award.images.small} alt = {award.display_name}/>
                        <Typography varient = "subtitle2" color = "textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({ name }) => (
                    <Chip key = {name} size = "small" label = {name} className = {classes.chip}>

                    </Chip>
                ))}
                {place?.address && (
                    <Typography gutterBottom varient = "subtitle2" color = "textSecondary" className = {classes.subtitle}>
                        <LocationOnIcon/> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom varient = "subtitle2" color = "textSecondary" className = {classes.spacing}>
                        <PhoneIcon/> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size = "small" color = "primary" onClick = { () => window.open(place.web_url, '_blank')}>
                        TripAdvisor
                    </Button>
                    <Button size = "small" color = "primary" onClick = { () => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default Details;