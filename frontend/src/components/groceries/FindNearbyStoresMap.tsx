import {
  APIProvider,
  useMap,
  Map,
  useMapsLibrary,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import styles from "./FindNearbyStoresMap.module.css";

type Props = {
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "error" | "warning" | "success") => void;
};
export default function FindNearbyStoresMap({
  setAlertMessage,
  setAlertType,
}: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const defaultLocation = { lat: 28.600246, lng: -81.33882 };
  const [center, setCenter] = useState<google.maps.LatLngLiteral | undefined>(
    defaultLocation
  );

  return (
    <APIProvider apiKey={apiKey}>
      <Map zoom={13} defaultCenter={center}>
        <MapLogic
          onUserLocation={setCenter}
          setAlertMessage={setAlertMessage}
          setAlertType={setAlertType}
        />
      </Map>
    </APIProvider>
  );
}
type MapLogicProps = {
  onUserLocation: (location: google.maps.LatLngLiteral) => void;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "error" | "warning" | "success") => void;
};
function MapLogic({
  onUserLocation,
  setAlertMessage,
  setAlertType,
}: MapLogicProps) {
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
  const [detailedStore, setDetailedStore] =
    useState<google.maps.places.PlaceResult | null>(null);

  // create placesService once map and library load
  useEffect(() => {
    if (!placesLibrary || !map) return;
    setPlacesService(new placesLibrary.PlacesService(map));
  }, [placesLibrary, map]);

  // focus map on user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(location);
        onUserLocation(location);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setAlertMessage("Location access denied, using default location");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setAlertMessage("Location unavailable, using default location");
        }
        setAlertType("warning");
      }
    );
  }, [onUserLocation, setAlertMessage, setAlertType]);

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

  // use places sevrice to get details for selected store
  useEffect(() => {
    if (!placesService || !selectedStore?.place_id) {
      setDetailedStore(null);
      return;
    }

    const request = {
      placeId: selectedStore.place_id,
      fields: [
        "name",
        "vicinity",
        "geometry",
        "opening_hours",
        "formatted_phone_number",
        "website",
      ],
    };

    placesService.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        setDetailedStore(place);
        console.log("detailed store:", place);
      } else {
        setDetailedStore(null);
        console.log("search failed", status);
      }
    });
  }, [placesService, selectedStore]);

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
        {detailedStore?.geometry?.location && (
          <InfoWindow
            position={{
              lat: detailedStore.geometry.location.lat(),
              lng: detailedStore.geometry.location.lng(),
            }}
            onCloseClick={() => {
              setSelectedStore(null);
              setDetailedStore(null);
            }}
          >
            <div className={styles.infoWindow}>
              <h3 className="bold">{detailedStore.name}</h3>
              {detailedStore.vicinity && (
                <h4 className="italic">{detailedStore.vicinity}</h4>
              )}
              {detailedStore.opening_hours?.isOpen &&
              detailedStore.opening_hours?.isOpen() ? (
                <h4 style={{ color: "green" }}>Store is open!</h4>
              ) : (
                <h4 style={{ color: "red" }}>Store is not open!</h4>
              )}
              <div className={styles.contact}>
                <h4>Contact:</h4>
                {detailedStore.formatted_phone_number && (
                  <p>Phone: {detailedStore.formatted_phone_number}</p>
                )}
                {detailedStore.website && (
                  <p>
                    <a
                      href={detailedStore.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit their website
                    </a>
                  </p>
                )}
              </div>
              {detailedStore.opening_hours?.weekday_text && (
                <div className={styles.openHours}>
                  <h4>Open Hours:</h4>
                  {detailedStore.opening_hours.weekday_text.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </div>
    </>
  );
}
