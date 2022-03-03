import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import tripicon from '../content/images/trip-location-icon.svg';
import drivertripicon from '../content/images/driver-trip-location-icon.svg';
const mapStyles = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends Component {
    state = {
        googleMapCenterlatitude:38.9699716 ,
        googleMapCenterlongitude:-77.0124504,
        showMap: false,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        tripCoordinates: [{ latitude: 47.49855629475769, longitude: -122.14184416996333, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 47.359423, longitude: -122.021071, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 47.2052192687988, longitude: -121.988426208496, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 47.6307081, longitude: -122.1434325, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 47.3084488, longitude: -122.2140121, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 47.5524695, longitude: -122.0425407, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' }],
        activityCoordinates: [{ latitude: 38.9512639, longitude: -77.0124738, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 38.9699716, longitude: -77.0124504, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 38.9585817, longitude: -77.0030609, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 38.962735, longitude: -77.0051188, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 38.9305213, longitude: -76.9949651, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' },
        { latitude: 38.9247563, longitude: -76.9968353, EventTime: '9/1/2021  8:51:00 AM', Arrival: '9:13:00 AM' }]
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // fetch(
        //     process.env.REACT_APP_SERVER_API_URL + "GetActionByEmail", {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ tripnumber: this.state.email })
        // })
        //     .then((response) => response.json())
        //     .then((response) => {
        //         console.log(response.tripcoordinates);
        //         console.log(response.activitycoordinates);
        //         this.setState({
        //             tripCoordinates: response.tripcoordinates

        //         });
        //         this.setState({
        //             activityCoordinates: response.activitycoordinates

        //         });
        //     });
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    displayTripMarkers = () => {
        return this.state.tripCoordinates.map((trip, index) => {
            return <Marker key={index} id={index} position={{
                lat: trip.latitude,
                lng: trip.longitude
            }}

                icon={{
                    url: tripicon,
                    anchor: new window.google.maps.Point(17, 46),
                    scaledSize: new window.google.maps.Size(37, 37)
                }}
                onClick={this.onMarkerClick} name={index} eventtime={trip.EventTime} arrival={trip.Arrival} />
        })
    }
    displayActivityMarkers = () => {
        return this.state.activityCoordinates.map((activity, index) => {
            return <Marker key={index} id={index} position={{
                lat: activity.latitude,
                lng: activity.longitude
            }}

                icon={{
                    url: drivertripicon,
                    anchor: new window.google.maps.Point(17, 46),
                    scaledSize: new window.google.maps.Size(37, 37)
                }}
                onClick={this.onMarkerClick} name={index} eventtime={activity.EventTime} arrival={activity.Arrival} />
        })
    }
    handleSubmit = (event) => {

        event.preventDefault();
        console.log(event.target[0].value);
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ tripnumber: this.state.email })
        // };
        // fetch(process.env.REACT_APP_SERVER_API_URL + 'GetTripRoutes', requestOptions)
        //     .then(function (response) {
        //         response.json();
        //     }).then((result) => {
        //         console.log(response.tripcoordinates);
        //         console.log(response.activitycoordinates);
        //         this.setState({
        //             tripCoordinates: response.tripcoordinates

        //         });
        //         this.setState({
        //             activityCoordinates: response.activitycoordinates

        //         });
        //         this.setState({
        //             showMap: true
        //         });
        //     });
        
        this.setState({
            showMap: true,
            googleMapCenterlatitude: this.state.activityCoordinates[0].latitude ,
            googleMapCenterlongitude: this.state.activityCoordinates[0].longitude 
        });       
    }
    render() {
        return (
            <>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="tripnumber" placeholder='enter trip number to fetch data' />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                {
                    this.state.showMap == true ?
                        <Map
                            google={this.props.google}
                            zoom={8}
                            style={mapStyles}
                            initialCenter={{ lat: this.state.googleMapCenterlatitude, lng: this.state.googleMapCenterlongitude }}
                        >
                            {this.displayTripMarkers()}
                            {this.displayActivityMarkers()}
                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                                onClose={this.onClose}
                            >
                                <div>
                                    <h4>Trip serial number: {this.state.selectedPlace.name}</h4>
                                    <h4>Trip Event Time:{this.state.selectedPlace.eventtime}</h4>
                                    <h4>Driver Arrival Time: {this.state.selectedPlace.arrival}</h4>
                                </div>
                            </InfoWindow>
                            {/* <DirectionsRenderer directions={{ lat: 47.359423, lon: -122.021071 }} /> */}
                        </Map>
                        : <></>
                }
            </>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBebUQoS9asX-IzJLJQ3Mall0JM4Zim6Cw'
})(MapContainer);