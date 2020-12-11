import React from "react";
import "./MapSearch.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import image from "../Images/biz-wiz-map.jpg";
import userImage from "../Images/user_yellow.png";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    top: "3rem",
    position: "absolute",
    zIndex: "10",
    borderRadius: "5px",
    padding: "20px",
    boxSizing: "border-box",
  },

  input: {
    marginLeft: "2%",
    marginRight: "2%",
    borderRadius: "10px",
    width: "16%",
    boxSizing: "border-box",
    height: "40px",
    fontSize: "24px",
    padding: "5px",
  },

  sideList: {
    height: "80vh",
    width: "29%",
    float: "left",
    marginTop: "20px",
    backgroundColor: "#eaeced",
    boxSizing: "border-box",
    overflowY: "scroll",
  },

  listingBox: {
    borderRadius: "25px",
    wordWrap: "break-word",
    backgroundColor: "white",
    width: "80%",
    height: "25%",
    margin: "0 auto",
    marginTop: "25px",
    marginBottom: "25px",
  },

  button: {
    height: "30px",
    width: "30%",
    marginRight: "5%",
    borderRadius: "15px",
  },

  icon: { width: "115%", height: "100%" },
}));

//Function to return jsx to render map onto website screen
function MapSearch() {
  //use react's special local css styling
  const classes = useStyles();
  const history = useHistory();

  //load in api key for google maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY_HERE", //my personal key for building this application, need partner to provide their own later
  });

  //map states
  const [markers, setMarkers] = React.useState([]);

  //marker states
  const [selected, setSelected] = React.useState(null);

  //input states
  const [input, updateInput] = React.useState({
    city: "",
    keyword: "",
    industry: "",
  });

  //data states
  const [optionData, updateOptionData] = React.useState({
    cities: [],
    industry: [],
    keyword: [],
  });

  //listing states
  const [listings, updateListings] = React.useState([]);

  //map focus states
  const [focus, updateFocus] = React.useState({
    lat: 44.0384,
    lng: -79.2,
    zoom: 9,
  }); //TODO after searching city return coords of city, also after clicking marker focus onto marker

  //get the option information regarding the available cities and different types of listings
  React.useEffect(() => {
    (async () => {
      const get_url = "http://localhost:8000/api/options"; //TODO need backend team to change types to industries, and give keywords
      const response = await axios({
        method: "get",
        url: get_url,
      });

      updateOptionData({
        cities: response.data.cities,
        industry: response.data.industry,
        keyword: response.data.keyword,
      });
    })();
  }, []);

  //error checking
  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  //post onclick function
  const handleViewPost = (post_id) => () => {
    history.push({
      pathname: "/pages/post",
      search: "?the=search",
      state: { id: post_id },
    });
  };

  //return map rendering
  return (
    <div>
      <div
        style={{
          backgroundSize: "cover",
          width: "100%",
          height: "750px",
          backgroundImage: `url(${image})`,
        }}
      >
        <div>
          <p
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: "200%",
              paddingTop: "375px",
              textAlign: "center",
            }}
          >
            Get matched with businesses in
          </p>
          <p
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: "200%",
              textAlign: "center",
            }}
          >
            your community.
          </p>

          <form
            className="form"
            style={{ paddingTop: "175px", width: "100%" }}
            onSubmit={(e) => {
              console.log(input);
              axios
                .post("http://localhost:8000/api/listings", {
                  keyword: input.keyword,
                  city: input.city,
                  type: input.industry,
                })
                .then((response) => {
                  updateListings(response.data);
                  setMarkers(response.data);
                  console.log(response.data);
                })
                .catch((err) => console.log(err));

              e.preventDefault();
            }}
          >
            <input
              className={classes.input}
              list="data"
              type="text"
              placeholder="Search Keywords..."
              onChange={(e) => {
                updateInput((current) => ({
                  ...current,
                  keyword: e.target.value,
                }));
              }}
            />
            <datalist id="data">{getKeywords(optionData.keyword)}</datalist>

            <select
              className={classes.input}
              onChange={(e) => {
                updateInput((current) => ({
                  ...current,
                  city: e.target.value,
                }));
              }}
            >
              <option value="" disabled selected>
                Location
              </option>
              <option value="">Any</option>
              {getData(optionData.cities)}
            </select>

            <select
              className={classes.input}
              onChange={(e) => {
                updateInput((current) => ({
                  ...current,
                  industry: e.target.value,
                }));
              }}
            >
              <option value="" disabled selected>
                Industry
              </option>
              <option value="">Any</option>
              {getData(optionData.industry)}
            </select>

            <input
              className={classes.input}
              style={{ width: "10%" }}
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>

      <div>
        <div className={classes.sideList}>
          {createListings(listings, classes)}
        </div>

        <div
          style={{
            marginTop: "20px",
            width: "70%",
            height: "80vh",
            float: "right",
          }}
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "80vh" }}
            zoom={focus.zoom}
            center={{ lat: focus.lat, lng: focus.lng }}
            options={{ disableDefaultUI: true, zoomControl: true }}
          >
            {markers.map((marker) => (
              <Marker
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                  updateFocus({ lat: marker.lat, lng: marker.lng, zoom: 15 });
                }}
              />
            ))}

            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div style={{ width: "300px", height: "150px" }}>
                  <div style={{ width: "100%", height: "70%" }}>
                    <div
                      style={{ float: "left", width: "25%", height: "100%" }}
                    >
                      <img
                        style={{ float: "left" }}
                        className={classes.icon}
                        src={userImage}
                        alt="user_yellow"
                      ></img>
                    </div>
                    <div
                      style={{
                        float: "right",
                        width: "75%",
                        height: "100%",
                        wordWrap: "break-word",
                      }}
                    >
                      <h3>{selected.companyName}</h3>
                      <p>{selected.description}</p>
                    </div>
                  </div>

                  <div>
                    <button
                      className={classes.button}
                      type="button"
                      onClick={handleViewPost(selected.id)}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

//return jsx html with options for dropdown regarding cities or industries
function getData(typeData) {
  const options = [];
  for (let i = 0; i < typeData.length; i++) {
    options.push(
      <option key={"type" + i} value={typeData[i]}>
        {typeData[i]}
      </option>
    );
  }
  return options;
}

//retrun jsx html with options for special datalist input
function getKeywords(typeData) {
  const options = [];
  for (let i = 0; i < typeData.length; i++) {
    options.push(<option key={"type" + i} value={typeData[i]} />);
  }
  return options;
}

//return jsx elements to populate the side list of the map with opportunities
function createListings(data, classes) {
  const listings = [];
  for (let i = 0; i < data.length; i++) {
    listings.push(
      <div className={classes.listingBox}>
        <div style={{ height: "100%", width: "100%" }}>
          <div style={{ width: "20%", height: "100%", float: "left" }}>
            <img
              style={{ padding: "40px 0", marginLeft: "25px" }}
              className={classes.icon}
              src={userImage}
              alt="user_yellow"
            ></img>
          </div>

          <div
            style={{
              width: "70%",
              height: "100%",
              float: "right",
              marginTop: "30px",
            }}
          >
            <b>{data[i].companyName}</b>
            <p>{data[i].description}</p>
          </div>
        </div>
      </div>
    );
  }
  return listings;
}

export default MapSearch;
