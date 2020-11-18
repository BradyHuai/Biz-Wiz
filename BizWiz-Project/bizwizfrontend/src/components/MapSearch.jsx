import React from "react";
import "./MapSearch.css";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";


//all three need to be retrieved from database
const search_results = [{lat: "number", lng: "number", data: "Listing Description"}];           //list of opportunity data
const cities = ["Toronto", "Markham", "Scarborough", "Guelph", "Richmond Hill", "Hamilton", "Newmarket"];     //list of city locations with opportunities
const types = ["Online Services", "Work", "Volunteer"];                                         //list of different types of opporunities


//Function to return jsx to render map onto website screen
function MapSearch() {
    
    //load in api key for google maps
    const {isLoaded, loadError} = useLoadScript({
            googleMapsApiKey: "AIzaSyBTqSHfkmVBJ2A5TwE7szjjd4pTd9CCfVo", //my personal key for building this application, need partner to provide their own later 
        });

    //map states
    //const [markers, setMarkers] = React.useState([{lat: 43.662891, lng: -79.395653, companyName: "Company Name", data: "Looking for x"}]);
    const [markers, setMarkers] = React.useState([]);

    //marker states
    const [selected, setSelected] = React.useState(null);

    //input states
    const [input, updateInput] = React.useState({city: "", keyword: "", type: ""});

    //list states
    //const [listings, updateListings] = React.useState([{address: "", companyName: "", description: "", link: ""}]);
    const [listings, updateListings] = React.useState([]);

    //error checking
    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loading Maps";   

    //return map rendering
    return <div>

        <div className="inputField">
            <form onSubmit={(e) => {
                const searchResults = getListings(input.city, input.keyword, input.type);
                setMarkers(searchResults);
                updateListings(searchResults);
                e.preventDefault();
            }}>

                <div style={{float: "left", margin: 10, marginLeft: "0%"}}>
                    <input style={{padding: "10px"}} className="input" type="text" placeholder="Search Keywords..." value={input.keyword} onChange={(e) => {
                        updateInput((current) => ({...current, keyword: e.target.value}));
                    }}/>
                </div>

                <div style={{float: "left", margin: 10, marginLeft: "10%"}}>
                    <select style={{padding: "10px"}} className="input" onChange={(e) => {
                        updateInput((current) => ({...current, city: e.target.value}))
                    }}>

                        <option value="" disabled selected>Select a city...</option>
                        {getCities()}

                    </select>
                </div>

                <div style={{float: "left", margin: 10, marginLeft: "10%"}}>
                    <select style={{padding: "10px"}} className="input" onChange={(e) => {
                        updateInput((current) => ({...current, type: e.target.value}));
                    }}>

                        <option value="" disabled selected>Select opportunity type...</option>
                        {getTypes()}

                    </select>
                </div>

                <div style={{float: "left", margin: 10, marginLeft: "10%"}}>
                <input className="submit" type="submit" value="Submit"/>
                </div>

            </form>
        </div>

        <div className="sideList">

            {createListings(listings)}

        </div>
        
        <div className="map">
            <GoogleMap 
            mapContainerStyle={{width: "100vw", height: "100vh"}} 
            zoom={11} 
            center={{lat: 43.662891, lng: -79.395653}}
            options={{disableDefaultUI: true, zoomControl: true}}
            >
                {markers.map(marker => <Marker 
                    //key={marker.data}                             //may not need key value
                    position={{lat: marker.lat, lng: marker.lng}} 
                    onClick={() => {setSelected(marker);}}/>)}
                
                {selected ? (<InfoWindow 
                    position={{lat: selected.lat, lng: selected.lng}}
                    onCloseClick={() => {setSelected(null);}}>
                    <div style={{width: "150px", height: "100px"}}>
                        <h3>{selected.companyName}</h3>
                        <p>{selected.data}</p>
                        <a href={"https://www.google.com"}>View Listing</a>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    </div>
} 

//return jsx html with options for dropdown regarding cities
function getCities() {

    const options = [];
    for (let i = 0; i < cities.length; i++) {
        options.push(<option value={cities[i]}>{cities[i]}</option>);
    }
    return options;
}

//return jsx html with options for dropdown regarding opportunity types
function getTypes() {

    const options = [];
    for (let i = 0; i < types.length; i++) {
    options.push(<option value={types[i]}>{types[i]}</option>)
    }
    return options;
}

//return a list of opportunities that match the search query
function getListings(city, keyword, type) {             //need to retrieve data from database here

    if (keyword === "school") {                          //example format return
        return [{lat: 43.662891, lng: -79.395653, companyName: "Company Name", data: "Looking for x"},
                {lat: 43.660964, lng: -79.395104, companyName: "Company Name", data: "looking for x"},
                {lat: 43.660729, lng: -79.396282, companyName: "Company Name", data: "looking for x"},
                {lat: 43.664017, lng: -79.394448, companyName: "Company Name", data: "looking for x"},
                {lat: 43.662582, lng: -79.398425, companyName: "Company Name", data: "looking for x"}];
    }
    else if (keyword === "mall") {
        return [{lat: 43.654496, lng: -79.381048, companyName: "Company Name", data: "looking for x"}];
    }
    else {
        return [];
    }

}

//return jsx elements to populate the side list of the map with opportunities
function createListings(data) {

    const listings = [];
    for (let i = 0; i < data.length; i++) {

        listings.push(
            <div className="listingBox" style={{backgroundColor: "white", width: "100%", height: "25%"}}>
                <h6>Company name</h6>
                <p>Information about company listing</p>
                <a href="www.google.com">Link to listing</a>
            </div>
        );

    }

    return listings;
}

export default MapSearch;