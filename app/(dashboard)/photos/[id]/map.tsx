"use client";

import { useEditPhoto } from "@/features/photos/api/use-edit-photo";
import Map, { NavigationControl, Marker, MapEvent } from "react-map-gl";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface Props {
  id: string;
  latitude?: number | null;
  longitude?: number | null;
}

const Mapbox = ({ id, latitude, longitude }: Props) => {
  const editMutation = useEditPhoto(id);

  const viewState = latitude &&
    longitude && {
      latitude,
      longitude,
      zoom: 14,
    };
  const handleClick = (event: any) => {
    console.log(event.lngLat.lat);

    editMutation.mutate(
      {
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng,
      },
      { onSuccess: () => console.log("success") }
    );
  };

  return (
    <Map
      id="map"
      mapboxAccessToken={TOKEN}
      style={{
        width: "100%",
        height: "100%",
      }}
      initialViewState={{ ...viewState }}
      mapStyle="mapbox://styles/mapbox/standard"
      onClick={handleClick}
    >
      <NavigationControl />
      {latitude && longitude && (
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </Marker>
      )}
    </Map>
  );
};

export default Mapbox;
