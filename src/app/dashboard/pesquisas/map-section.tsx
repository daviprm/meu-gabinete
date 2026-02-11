"use client";

import { useState, useCallback } from "react";
import { Map, MapGeoJSONLayer, MapControls, MapPopup } from "@/components/ui/map";
import type { ResultadoBairro, CandidatoPrefeito, CandidatoVereador } from "@/lib/mock-data";

type Candidato = CandidatoPrefeito | CandidatoVereador;

interface MapSectionProps {
  coloredGeoJSON: GeoJSON.FeatureCollection;
  resultadosBairro: ResultadoBairro[];
  candidatos: Candidato[];
}

export default function MapSection({ coloredGeoJSON, resultadosBairro, candidatos }: MapSectionProps) {
  const [popup, setPopup] = useState<{
    bairro: string;
    lng: number;
    lat: number;
    resultado: ResultadoBairro;
  } | null>(null);

  const [hoveredBairro, setHoveredBairro] = useState<string | null>(null);

  const handleClick = useCallback(
    (feature: GeoJSON.Feature, lngLat: { lng: number; lat: number }) => {
      const nome = feature.properties?.nome as string;
      const resultado = resultadosBairro.find((r) => r.bairro === nome);
      if (resultado) {
        setPopup({ bairro: nome, lng: lngLat.lng, lat: lngLat.lat, resultado });
      }
    },
    [resultadosBairro]
  );

  const handleMouseEnter = useCallback((feature: GeoJSON.Feature) => {
    setHoveredBairro(feature.properties?.nome as string);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredBairro(null);
  }, []);

  // Use match expression for fill color based on feature property
  const fillColor: unknown[] = [
    "get", "cor"
  ];

  return (
    <Map
      center={[-37.055, -10.94]}
      zoom={12}
      className="h-full w-full"
    >
      <MapGeoJSONLayer
        id="bairros-choropleth"
        data={coloredGeoJSON}
        fillColor={fillColor}
        fillOpacity={0.55}
        outlineColor="#ffffff"
        outlineWidth={1.5}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <MapControls showZoom showCompass={false} />

      {popup && (
        <MapPopup
          longitude={popup.lng}
          latitude={popup.lat}
          onClose={() => setPopup(null)}
          closeButton
          className="min-w-[200px]"
        >
          <div className="space-y-2">
            <p className="text-sm font-semibold">{popup.bairro}</p>
            <p className="text-xs text-muted-foreground">
              {popup.resultado.totalEntrevistados} entrevistados
            </p>
            <div className="space-y-1.5">
              {[...popup.resultado.candidatos]
                .sort((a, b) => b.percentual - a.percentual)
                .map((c) => {
                  const cand = candidatos.find((x) => x.id === c.candidatoId);
                  if (!cand) return null;
                  return (
                    <div key={c.candidatoId} className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: cand.cor }}
                      />
                      <span className="text-xs flex-1 truncate">{cand.nome}</span>
                      <span className="text-xs font-medium tabular-nums">{c.percentual}%</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </MapPopup>
      )}
    </Map>
  );
}
