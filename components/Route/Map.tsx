import maplibregl, { Map } from "maplibre-gl";
import { useRef, useEffect } from "react";

import DeckGL from "@deck.gl/react/typed";
// import { ColumnLayer } from "@deck.gl/layers/typed";
import { TripsLayer } from "@deck.gl/geo-layers/typed";
import { Map as RMap } from "react-map-gl";
import request from "superagent";
import useSWR from "swr";

// export const AnalyticsMap = ({
//   mapIsReadyCallback /* To be triggered when a map object is created */,
// }: {
//   mapIsReadyCallback?: (map: Map) => void;
// }) => {
//   const mapContainer = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const myAPIKey = "vlEegAtRj8kH5zdyaOBU";
//     const mapStyle =
//       "https://api.maptiler.com/maps/76a5db53-3488-402a-8f57-b3ca97dc3e61/style.json";

//     const initialState = {
//       lng: 11,
//       lat: 49,
//       zoom: 4,
//     };

//     const map = new Map({
//       container: mapContainer.current!,
//       style: `${mapStyle}?key=${myAPIKey}`,
//       center: [initialState.lng, initialState.lat],
//       zoom: initialState.zoom,
//     });

//     mapIsReadyCallback ? mapIsReadyCallback(map) : null;
//   }, [mapContainer.current]);

//   return (
//     <div
//       className="map-container"
//       ref={mapContainer}
//       style={{
//         height: "100%",
//       }}
//     ></div>
//   );
// };

const INITIAL_VIEW_STATE = {
  longitude: -74.03597999693177,
  latitude: 40.613662509168435,
  zoom: 13,
  pitch: 40.5,
  bearing: -27.396674584323023,
};

const linedata = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

const fetcher = (url: string, id: number) =>
  request
    .post(url)
    .send({ id })
    .then((res) => res.body);

export function VectorMap(props: { id: number }) {
  const { data, error } = useSWR(["/api/routes", props.id], fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const layer = new TripsLayer({
    id: "trips-layer",
    data,
    getPath: (d) => d.waypoints.map((p: any) => [p.X_loc, p.Y_loc]),
    getTimestamps: (d) =>
      d.waypoints.map((p: any) => p.Timestamp - data[0].waypoints[0].Timestamp),
    getColor: [253, 128, 93],
    opacity: 0.8,
    widthMinPixels: 5,
    rounded: true,
    fadeTrail: true,
    trailLength: 200,
    currentTime: 100,
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[layer]}
    >
      <RMap
        mapLib={maplibregl}
        mapStyle={
          "https://api.maptiler.com/maps/76a5db53-3488-402a-8f57-b3ca97dc3e61/style.json?key=vlEegAtRj8kH5zdyaOBU"
        }
      />
    </DeckGL>
  );
}

// Select unix_timestamp(Timestamp) as Timestamp, X_loc,Y_loc from Request, Router
// WHERE Person_ID = 1 AND Request.Router_ID = Router.ID
// ORDER BY Timestamp
