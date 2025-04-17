import {
  MutableRefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import mapboxgl, { ImageSource, Map, Marker, RasterLayer } from "mapbox-gl";
import {
  BaseMapContext,
  useCurrentBaseMapBackground,
} from "./base-map-context";

const DEFAULT_POLUENT_VIEW = "Visibility";

const useLocalMap = (map: MutableRefObject<Map | null>) => {
  const { backgroundMapType, focalPoints, dispatch, poluentPrediction } =
    useContext(BaseMapContext);
};

const useNationalMap = (map: MutableRefObject<Map | null>) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const markersLoaded = useRef(false);
  const { backgroundMapType, focalPoints, dispatch } =
    useContext(BaseMapContext);

  const addMarkers = () => {
    if (
      !markersLoaded.current &&
      ["poluents", "indexes"].includes(backgroundMapType)
    ) {
      const newMarkers = focalPoints.map((focal) => {
        const marker = new mapboxgl.Marker({ clickTolerance: 10 })
          .setLngLat(focal.center)
          .addTo(map.current as Map);

        marker.getElement().addEventListener("click", () => {
          dispatch({
            currentFocal: focal,
            currentPrediction: focal.predictions[DEFAULT_POLUENT_VIEW][0],
            backgroundMapType: "focal",
            selectedPoluent: focal.poluents[0],
          });
        });

        return marker;
      });
      setMarkers(newMarkers);
      markersLoaded.current = true;
    }
  };

  useEffect(() => {
    if (
      map &&
      map.current &&
      ["indexes", "poluents"].includes(backgroundMapType)
    ) {
      addMarkers();
    } else {
      markers.forEach((m) => {
        m.getElement().hidden = true;
        m.remove();
      });
      setMarkers([]);
      markersLoaded.current = false;
    }
  }, [backgroundMapType]);

  return addMarkers;
};

const useCurrentLayer = (map: MutableRefObject<Map | null>) => {
  const currentLayer = useCurrentBaseMapBackground();
  const { backgroundMapType } = useContext(BaseMapContext);
  const addLayer = () => {
    if (map.current && currentLayer && map.current.isStyleLoaded()) {
      map.current.addSource("base-map", {
        type: "image",
        ...currentLayer,
      });
      map.current.addLayer({
        id: "base-map-background",
        type: "raster",
        source: "base-map",
        paint: {
          "raster-fade-duration": 0,
          "raster-opacity": 0.5,
        },
      });
    }
  };

  useEffect(() => {
  if (map && map.current && currentLayer) {
    const mapInstance = map.current;
    const layerId = "base-map-background";
    const sourceId = "base-map";

    const addBaseLayer = () => {
      // Remove camada e fonte antigas (se existirem)
      if (mapInstance.getLayer(layerId)) {
        mapInstance.removeLayer(layerId);
      }
      if (mapInstance.getSource(sourceId)) {
        mapInstance.removeSource(sourceId);
      }

      // Adiciona nova camada com URL cache-busting
      const updatedLayer = {
        ...currentLayer,
        url: `${currentLayer.url}?v=${new Date().getTime()}`
      };

      mapInstance.addSource(sourceId, {
        type: "image",
        ...updatedLayer,
      });

      mapInstance.addLayer({
        id: layerId,
        type: "raster",
        source: sourceId,
        paint: {
          "raster-fade-duration": 0,
          "raster-opacity": 0.5,
        },
      });
    };

    // Só adiciona se o estilo estiver carregado
    if (mapInstance.isStyleLoaded()) {
      addBaseLayer();
    } else {
      mapInstance.once("styledata", addBaseLayer);
    }
  }
}, [currentLayer]);
  const fitToLocal = () => {
    if (
      map.current &&
      currentLayer &&
      currentLayer.coordinates &&
      currentLayer.coordinates?.length >= 3
    ) {
      map.current.fitBounds([
        currentLayer?.coordinates[0] as [number, number],
        currentLayer?.coordinates[2] as [number, number],
      ]);
    }
  };
  useEffect(() => {
    if (map && map.current && currentLayer) {
      fitToLocal();
    }
  }, [backgroundMapType]);

  return addLayer;
};

const BaseMap = () => {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(-8.648321);
  const [lat, setLat] = useState(40.644971);
  const [zoom, setZoom] = useState(4);
  const handleMarkersOnLoad = useNationalMap(map);
  useLocalMap(map);
  const handleCurrentLayerOnLoad = useCurrentLayer(map);

  useLayoutEffect(() => {
    if (mapContainer && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
        touchPitch: false,
        touchZoomRotate: false,
        projection: { name: "mercator" },
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      });

      map.current.on("load", () => {
        handleCurrentLayerOnLoad();
        handleMarkersOnLoad();
      });
    }
  }, []);

  return <div id="base-map" ref={mapContainer} className="h-100"></div>;
};

export default BaseMap;
