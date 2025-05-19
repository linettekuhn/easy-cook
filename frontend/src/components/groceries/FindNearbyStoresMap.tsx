import {
  APIProvider,
  useMap,
  Map,
  useMapsLibrary,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function FindNearbyStoresMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);

  return (
    <APIProvider apiKey={apiKey}>
      <Map zoom={13} center={center}>
        <MapLogic onUserLocation={setCenter} />
      </Map>
    </APIProvider>
  );
}
type MapLogicProps = {
  onUserLocation: (location: google.maps.LatLngLiteral) => void;
};
function MapLogic({ onUserLocation }: MapLogicProps) {
  const map = useMap();
  const placesLibrary = useMapsLibrary("places");
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [nearbyStores, setNearbyStores] = useState<
    google.maps.places.PlaceResult[]
  >([]);
  const [selectedStore, setSelectedStore] =
    useState<google.maps.places.PlaceResult | null>(null);

  // create placesService once map and library load
  useEffect(() => {
    if (!placesLibrary || !map) return;
    setPlacesService(new placesLibrary.PlacesService(map));
  }, [placesLibrary, map]);

  // focus map on user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setUserLocation(location);
      onUserLocation(location);
    });
  }, [onUserLocation]);

  // use places sevrice to nearby search for stores
  useEffect(() => {
    if (!placesService || !userLocation) return;

    const request = {
      location: userLocation,
      radius: 5000,
      type: "grocery_or_supermarket",
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setNearbyStores(results);
        console.log("nearby stores:", nearbyStores);
      } else {
        console.log("search failed", status);
      }
    });
  }, [placesService, userLocation, nearbyStores]);

  return (
    <>
      <div className="markers">
        {nearbyStores.map((place, index) => {
          if (!place.geometry?.location) return null;

          const pos = {
            lat: place.geometry.location?.lat(),
            lng: place.geometry.location.lng(),
          };
          return (
            <Marker
              key={index}
              position={pos}
              title={place.name}
              onClick={() => setSelectedStore(place)}
            />
          );
        })}
      </div>
      <div className="info">
        {selectedStore?.geometry?.location && (
          <InfoWindow
            position={{
              lat: selectedStore.geometry.location.lat(),
              lng: selectedStore.geometry.location.lng(),
            }}
            onCloseClick={() => setSelectedStore(null)}
          >
            <h4>{selectedStore.name}</h4>
            {selectedStore.vicinity && <p>{selectedStore.vicinity}</p>}
            {selectedStore.opening_hours?.weekday_text?.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </InfoWindow>
        )}
      </div>
    </>
  );
}
