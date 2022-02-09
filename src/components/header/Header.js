import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";

export default function Header({ setCoordinates }) {
  const classes = useStyles();
  const [AutoComplete, setAutoComplete] = useState(null);

  const onload = (autoc) => setAutoComplete(autoc);
  const onplace = () => {
    const lat = AutoComplete.getPlace().geometry.location.lat();
    const lng = AutoComplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Travel Advisor
          </Typography>
          <Box display="flex">
            <Typography variant="h6" className={classes.title}>
              Explore New Places
            </Typography>
            <Autocomplete onLoad={onload} onPlaceChanged={onplace}>
              <div className={classes.search}>
                <div className={classes.searchicon}>
                  <SearchIcon style={{ display: "flex" }} />
                </div>
                <InputBase
                  placeholder="Search..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
