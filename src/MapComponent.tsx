import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol, PMTiles } from 'pmtiles';

const PMTILES_URL = ""; // アップロードしたS3のPMTilesのURL


const MapComponent: React.FC<{}> = () => {
  const mapContainer = useRef(null);
  const map = useRef<any>(null); 
  const [lat, setLat] = useState(33.5676);
  const [lon, setLon] = useState(130.4102);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    console.log("Initializing map...");

    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    const p = new PMTiles(PMTILES_URL);
    protocol.add(p);

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      center: [lon, lat],
      zoom: zoom,
      style: {
        version: 8,
        sources: {
          "osm": {
            "type": "raster",
            "tiles": ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            "tileSize": 256,
            "attribution": '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          },
          "gyousei-kukaku": {
            "type": "vector",
            "url": "pmtiles://" + PMTILES_URL,
            "attribution": '© <a href="https://openstreetmap.org">OpenStreetMap</a>'
          }
        },
        layers: [
          {
            "id": "osm-tiles",
            "type": "raster",
            "source": "osm",
            "minzoom": 0,
            "maxzoom": 19,
          },
          {
            "id": "sample-layer",
            "source": "gyousei-kukaku",
            "source-layer": "N0323_230101",
            "type": "fill",
            "paint": {
              "fill-color": "#00ffff",
              "fill-opacity": 0.4,
              "fill-outline-color": "#ff0000",
            }
          },
        ]
      }
    });
  }, [lat, lon, zoom]);

  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" style={{ height: '100vh', width: '100%' }} />
    </div>
  );
};

export default MapComponent;
