import React from "react";
import "./MapSearch.css";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";
import axios from "axios";


//Function to return jsx to render map onto website screen
function MapSearch() {
    
    //load in api key for google maps
    const {isLoaded, loadError} = useLoadScript({
            googleMapsApiKey: "AIzaSyBTqSHfkmVBJ2A5TwE7szjjd4pTd9CCfVo", //my personal key for building this application, need partner to provide their own later 
        });


    //map states
    const [markers, setMarkers] = React.useState([]);

    //marker states
    const [selected, setSelected] = React.useState(null);

    //input states
    const [input, updateInput] = React.useState({city: "", keyword: "", type: ""});

    //data states
    const [optionData, updateOptionData] = React.useState({cities: [], types: []});

    //listing states
    const [listings, updateListings] = React.useState([]);

    //get the option information regarding the available cities and different types of listings
    React.useEffect(() => {
        (async () => {
            
          const get_url = "http://localhost:8000/api/options";
          const response = await axios({
            method: "get",
            url: get_url,
          });

          updateOptionData({
            cities: response.data.cities,
            types: response.data.types
          });
        })();
      }, []);

    //error checking
    if (loadError) return "Error Loading Maps";
    if (!isLoaded) return "Loading Maps";   

    //return map rendering
    return <div>

        <div className="inputField">
            <form onSubmit={(e) => {

                axios
                .post("http://localhost:8000/api/listings", {keyword: input.keyword, city: input.city, type: input.type})
                .then(
                    response => {
                        updateListings(response.data);
                        setMarkers(response.data);
                })
                .catch(err => console.log(err));
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
                        <option value="">Any</option>
                        {getCities(optionData.cities)}

                    </select>
                </div>

                <div style={{float: "left", margin: 10, marginLeft: "10%"}}>
                    <select style={{padding: "10px"}} className="input" onChange={(e) => {
                        updateInput((current) => ({...current, type: e.target.value}));
                    }}>

                        <option value="" disabled selected>Select opportunity type...</option>
                        <option value="">Any</option>
                        {getTypes(optionData.types)}

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
                    position={{lat: marker.lat, lng: marker.lng}} 
                    onClick={() => {setSelected(marker);}}/>)}
                
                {selected ? (<InfoWindow 
                    position={{lat: selected.lat, lng: selected.lng}}
                    onCloseClick={() => {setSelected(null);}}>
                    <div style={{width: "150px", height: "100px"}}>
                        <h3>{selected.companyName}</h3>
                        <p>{selected.description}</p>
                        <a href={selected.hyperlink}>View Listing</a>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    </div>
}

//return jsx html with options for dropdown regarding cities
function getCities(cityData) {

    const options = [];
    for (let i = 0; i < cityData.length; i++) {
        options.push(<option key={"city" + i} value={cityData[i]}>{cityData[i]}</option>);
    }
    return options;
}

//return jsx html with options for dropdown regarding opportunity types
function getTypes(typeData) {

    const options = [];
    for (let i = 0; i < typeData.length; i++) {
        options.push(<option key={"type" + i} value={typeData[i]}>{typeData[i]}</option>)
    }
    return options;
}

//return jsx elements to populate the side list of the map with opportunities
function createListings(data) {

    const listings = [];
    for (let i = 0; i < data.length; i++) {
        listings.push(
            <div className="listingBox" style={{backgroundColor: "white", width: "100%", height: "30%"}}>
                <b>{data[i].companyName}</b>
                <div style={{height: "40%"}}>
                    <p>{data[i].description}</p>
                </div>
                <p>{data[i].address}</p>
                <a href={data[i].hyperlink}>View Listing</a>
            </div>
        );
    }
    return listings;
}

export default MapSearch;