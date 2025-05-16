import React, { useEffect, useRef, useState } from 'react'
import GooglePlacesAutocomplete  from 'react-google-places-autocomplete';
import { GoogleMap , LoadScript , Marker , useJsApiLoader , StandaloneSearchBox } from '@react-google-maps/api';
import Autocomplete , { usePlacesWidget } from "react-google-autocomplete";




const GOOGLE_MAPS_API_KEY = "AIzaSyD5_3Xmuuyxph0PEHPNK97qYyBr30OEllQ";


const MapsExamples = () => {

  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => console.log(place)
  })


      const [map, setMap] = useState(null);
  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Default to New Delhi
  const autocompleteRef = useRef(null)


  useEffect(() => {
    if (window.google && window.google.maps) {
      initAutocomplete();
    }
  }, []);


  const initAutocomplete = () => {
    const input = document.getElementById("autocomplete");
    autocompleteRef.current = new window.google.maps.places.Autocomplete(input);

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation({ lat, lng });
        
        // Send data to backend
      }
    });
  };


  console.log("Locartion" , location)

  return (
    <div>
      <input id="autocomplete" type="text" placeholder="Search for a place..." className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black `} />
      
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <GoogleMap center={location} zoom={14} mapContainerStyle={{ height: "400px", width: "100%" }} onLoad={map => setMap(map)}>
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
      {/* <GooglePlacesAutocomplete
        apiKey="AIzaSyCfHCytpE0Oq4tvXmCWaOl05iyH_OfLGuM"
      /> */}


<div className="google-search-map-input-sec relative">
                                  <div className="left-map-icon absolute left-6 top-1/2">
                                    <img src={MapIcon} className='w-6 h-6 object-contain' alt="" />
                                  </div>
                                  <input ref={ref} type="text" placeholder="Search for a place..." className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 pl-12 pr-5 py-3 rounded-lg bg-white w-full text-Black `} />
                                </div>
                                                    
                          <Autocomplete
                            apiKey={GOOGLE_MAPS_API_KEY}
                            onPlaceSelected={(place) => {
                              console.log(place);
                            }}
                          />
                          
    </div>
  )
}

export default MapsExamples











