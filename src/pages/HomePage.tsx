import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { svy21ToWgs84 } from "svy21";

// Matches the CSV header: SN,GANTRY_HEIGHT,ADDRESS,CAR_PARK_NO,X_COORD,Y_COORD,CAR_PARK_TYPE
interface Carpark {
  CAR_PARK_NO: string;
  ADDRESS: string;
  GANTRY_HEIGHT: number;
  CAR_PARK_TYPE: string;
  X_COORD: number;
  Y_COORD: number;
}

const HomePage = () => {
  const [allCarparks, setAllCarparks] = useState<Carpark[]>([]);
  const [filteredCarparks, setFilteredCarparks] = useState<Carpark[]>([]);
  const [vehicleHeight, setVehicleHeight] = useState("");
  const [destination, setDestination] = useState("");
  const [walkingDistance, setWalkingDistance] = useState("300");
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    /**
     * Fetches and parses the carpark data from the local CSV file.
     */
    const fetchCarparkData = async () => {
      const response = await fetch("/Carpark_gantryheight.csv");
      const reader = response.body!.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvString = decoder.decode(result.value);

      Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          const carparkData = results.data as Carpark[];
          console.log("Loaded", carparkData.length, "carparks.");
          setAllCarparks(carparkData);
        },
      });
    };

    fetchCarparkData();
  }, []);

  /**
   * Handles the search functionality based on user inputs.
   */
  const handleSearch = () => {
    setSearchPerformed(true);
    let results = allCarparks;

    const height = parseFloat(vehicleHeight);
    if (!isNaN(height) && height > 0) {
      results = results.filter(
        (carpark) =>
          carpark.GANTRY_HEIGHT === 0 || carpark.GANTRY_HEIGHT >= height
      );
    }

    if (destination.trim() !== "") {
      results = results.filter((carpark) =>
        carpark.ADDRESS.toLowerCase().includes(destination.toLowerCase())
      );
    }

    setFilteredCarparks(results);
  };

  /**
   * Opens Google Maps in a new tab with the carpark's location.
   */
  const handleOpenMap = (carpark: Carpark) => {
    if (carpark.X_COORD && carpark.Y_COORD) {
      const [lat, lon] = svy21ToWgs84(carpark.Y_COORD, carpark.X_COORD);
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Public Carpark Finder
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Find the perfect spot, hassle-free.
        </Typography>
      </Box>

      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 3,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
          mb: 4,
        }}
      >
        {/* Search form elements... */}
        <TextField
          id="vehicle-height"
          label="Vehicle Height (meters)"
          type="number"
          variant="outlined"
          fullWidth
          value={vehicleHeight}
          onChange={(e) => setVehicleHeight(e.target.value)}
          InputProps={{ inputProps: { step: 0.1, min: 0 } }}
          aria-label="Vehicle Height in meters"
        />
        <TextField
          id="destination"
          label="Destination (e.g., Blk 133 Woodlands)"
          variant="outlined"
          fullWidth
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          aria-label="Destination Location"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend" aria-label="Walking distance to carpark">
            Walking distance to carpark
          </FormLabel>
          <RadioGroup
            row
            aria-label="walking distance options"
            name="row-radio-buttons-group"
            value={walkingDistance}
            onChange={(e) => setWalkingDistance(e.target.value)}
          >
            <FormControlLabel value="100" control={<Radio />} label="100m" />
            <FormControlLabel value="300" control={<Radio />} label="300m" />
            <FormControlLabel value="500" control={<Radio />} label="500m" />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ alignSelf: "center" }}
          onClick={handleSearch}
        >
          Search Carparks
        </Button>
      </Box>

      {searchPerformed ? (
        filteredCarparks.length === 0 ? (
          <Typography sx={{ textAlign: "center", my: 5 }}>
            No carparks found matching your criteria. Please try a different
            search.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredCarparks.map((carpark) => (
              <Grid item xs={12} sm={6} md={4} key={carpark.CAR_PARK_NO}>
                <Card sx={{ height: "100%", cursor: "pointer" }} onClick={() => handleOpenMap(carpark)}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {carpark.ADDRESS}
                    </Typography>
                    <Typography color="text.secondary">
                      Type: {carpark.CAR_PARK_TYPE}
                    </Typography>
                    <Typography color="text.secondary">
                      Height Limit:{" "}
                      {carpark.GANTRY_HEIGHT === 0
                        ? "No limit"
                        : `${carpark.GANTRY_HEIGHT}m`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      ) : null}
    </Container>
  );
};

export default HomePage;
