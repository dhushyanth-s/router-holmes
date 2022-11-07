import maplibregl, { Map } from "maplibre-gl";
import { useRef, useEffect } from "react";

import DeckGL from "@deck.gl/react/typed";
import { ColumnLayer } from "@deck.gl/layers/typed";
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

const fetcher = (url: string) => request.get(url).then((res) => res.body);

export function VectorMap() {
  const { data, error } = useSWR("/api/diagnostic", fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const layer = new ColumnLayer({
    id: "column-layer",
    data,
    diskResolution: 12,
    radius: 30,
    extruded: true,
    pickable: true,
    elevationScale: 5,
    getPosition: (d) => [d.X_loc, d.Y_loc],
    getFillColor: (d: any) => [(d.Temperature - 30) * 7, 100, 40, 255],
    getLineColor: [0, 0, 0],
    getElevation: (d) => d.Temperature,
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
