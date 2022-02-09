import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/header/Header";
import List from "./components/list/List";
import Map from "./components/map/Map";
import { getPlaceData } from "./api/index";

function App() {
  const [Places, setPlaces] = useState([]);
  const [FilteredPlaces, setFilteredPlaces] = useState([]);
  const [Coordinates, setCoordinates] = useState({});
  const [Bounds, setBounds] = useState({});
  const [ChildClicked, setChildClicked] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Type, setType] = useState("restaurants");
  const [Rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const Filteredplaces = Places.filter((place) => place.rating > Rating);
    setFilteredPlaces(Filteredplaces);
  }, [Rating]);

  useEffect(() => {
    if (Bounds.sw && Bounds.ne) {
      setLoading(true);
      getPlaceData(Type, Bounds.sw, Bounds.ne).then((data) => {
        // console.log(data);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setLoading(false);
      });
    }
  }, [Type, Bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={5}>
          <List
            places={FilteredPlaces.length ? FilteredPlaces : Places}
            ChildClicked={ChildClicked}
            Loading={Loading}
            type={Type}
            setType={setType}
            rating={Rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={7} style={{marginTop: "20px"}}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            Coordinates={Coordinates}
            places={FilteredPlaces.length ? FilteredPlaces : Places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
