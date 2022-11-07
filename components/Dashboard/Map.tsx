import maplibregl, { Map } from "maplibre-gl";
import { useRef, useEffect } from "react";

import DeckGL from "@deck.gl/react/typed";
import { LineLayer } from "@deck.gl/layers/typed";
import { Map as RMap } from "react-map-gl";

export const AnalyticsMap = ({
  mapIsReadyCallback /* To be triggered when a map object is created */,
}: {
  mapIsReadyCallback?: (map: Map) => void;
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myAPIKey = "vlEegAtRj8kH5zdyaOBU";
    const mapStyle =
      "https://api.maptiler.com/maps/76a5db53-3488-402a-8f57-b3ca97dc3e61/style.json";

    const initialState = {
      lng: 11,
      lat: 49,
      zoom: 4,
    };

    const map = new Map({
      container: mapContainer.current!,
      style: `${mapStyle}?key=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    mapIsReadyCallback ? mapIsReadyCallback(map) : null;
  }, [mapContainer.current]);

  return (
    <div
      className="map-container"
      ref={mapContainer}
      style={{
        height: "100%",
      }}
    ></div>
  );
};

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

export function TextMap() {
  const layers = [new LineLayer({ id: "line-layer", data })];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
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
