import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating  from '@material-ui/lab/Rating';

import useStyles from './styles'
import mapStyles from './mapStyles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys = {{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter = {coordinates}
                center = {coordinates}
                defaultZoom = {14}
                margin = {[50, 50, 50, 50]}
                options = {{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange = {(e) => {
                    console.log(e);
                    setCoordinates({lat: e.center.lat, long: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick = {(child) => setChildClicked(child)}
            >
            {places?.map((place, i) =>(
                <div 
                    className = {classes.markerContainer} 
                    lat = {Number(place.latitude)} 
                    long = {Number(place.longitude)}
                    key = {i}
                >
                    {
                        !isMobile ? (
                            <LocationOnOutlinedIcon color = "primary" fontSize = "large"/>
                        ) : (
                            <Paper elevation = {3} className = {classes.paper}>
                                <Typography className = {classes.typography} varient = "subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img 
                                    className = {classes.pointer} 
                                    src = {place.photo ? place.photo.images.large.url : 'https://media.cntraveler.com/photos/5859aad8eaa56c5e65d43539/16:9/w_2048,h_1152,c_limit/best-restaurants-NYC-Charlie-Bird-interior-2016.jpg'}
                                    alt = {place.name}
                                />
                                <Rating size = "small" value = {Number(place.rating)} readOnly />
                            </Paper>
                        )
                    }
                </div>
            ))}
            {weatherData?.list?.map((data, i) => (
                <div key = {i} lat = {data.coordinates.lat} lng = {data.coordinates.lon}>
                    <img height = "100" src = {`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                </div>
            ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;