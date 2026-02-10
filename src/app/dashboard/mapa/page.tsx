"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Phone, Mail, MapPin, X, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
  type MapRef,
} from "@/components/ui/map";
import { eleitores, type Eleitor } from "@/lib/mock-data";

const intencaoRing: Record<string, string> = {
  Favorável: "ring-emerald-500",
  Indeciso: "ring-amber-500",
  Oposição: "ring-red-500",
};

const intencaoBorder: Record<string, string> = {
  Favorável: "border-emerald-500",
  Indeciso: "border-amber-500",
  Oposição: "border-red-500",
};

const intencaoBadge: Record<string, string> = {
  Favorável: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Indeciso: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Oposição: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const intencaoDot: Record<string, string> = {
  Favorável: "bg-emerald-500",
  Indeciso: "bg-amber-500",
  Oposição: "bg-red-500",
};

export default function MapaPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const mapRef = useRef<MapRef>(null);

  const filtered = useMemo(() => {
    if (!search) return eleitores;
    const q = search.toLowerCase();
    return eleitores.filter(
      (e) =>
        e.nome.toLowerCase().includes(q) || e.bairro.toLowerCase().includes(q)
    );
  }, [search]);

  const selected = useMemo(
    () => eleitores.find((e) => e.id === expandedId),
    [expandedId]
  );

  const handleListClick = useCallback(
    (e: Eleitor) => {
      setSelectedId(e.id);
      mapRef.current?.flyTo({
        center: [e.lng, e.lat],
        zoom: 15,
        duration: 800,
      });
    },
    []
  );

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          Mapa Eleitoral
        </h1>
        <p className="text-sm text-muted-foreground">
          Visualize a distribuição geográfica dos eleitores.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filtrar eleitores..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Legenda */}
          <div className="flex items-center gap-4 rounded-lg border border-border p-3">
            {(["Favorável", "Indeciso", "Oposição"] as const).map((i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <div className={`h-2.5 w-2.5 rounded-full ${intencaoDot[i]}`} />
                {i}
              </div>
            ))}
          </div>

          {/* Lista de eleitores */}
          <div className="max-h-64 md:max-h-[calc(100vh-320px)] space-y-1.5 overflow-y-auto pr-1">
            {filtered.map((e, i) => {
              const isExpanded = expandedId === e.id;
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`rounded-lg border border-border transition-colors overflow-hidden ${
                    selectedId === e.id
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                >
                  {/* Row clicável */}
                  <div
                    className="flex items-center gap-3 p-3 cursor-pointer"
                    onClick={() => handleListClick(e)}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={e.foto}
                        alt={e.nome}
                        className={`h-9 w-9 rounded-full object-cover ring-2 ${intencaoRing[e.intencao]}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{e.nome}</p>
                      <p className="text-xs text-muted-foreground">{e.bairro}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 shrink-0 p-0"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        setExpandedId(isExpanded ? null : e.id);
                      }}
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <X className="h-3.5 w-3.5" />
                      </motion.div>
                    </Button>
                  </div>

                  {/* Card expandido */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 space-y-3">
                          <Separator />
                          <Badge
                            variant="secondary"
                            className={intencaoBadge[e.intencao]}
                          >
                            {e.intencao}
                          </Badge>
                          <div className="space-y-1.5 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {e.telefone}
                            </div>
                            {e.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                {e.email}
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              {e.bairro}
                            </div>
                          </div>
                          {e.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {e.tags.map((t) => (
                                <Badge
                                  key={t}
                                  variant="outline"
                                  className="text-[10px] gap-0.5"
                                >
                                  <Tag className="h-2.5 w-2.5" />
                                  {t}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {e.observacoes && (
                            <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                              {e.observacoes}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mapa */}
        <div className="relative min-h-[350px] sm:min-h-[500px] rounded-lg border border-border overflow-hidden">
          <Map
            ref={mapRef}
            center={[-37.0600, -10.9300]}
            zoom={13}
          >
            <MapControls position="bottom-right" />

            {filtered.map((e) => (
              <MapMarker
                key={e.id}
                longitude={e.lng}
                latitude={e.lat}
                onClick={() => {
                  setSelectedId(e.id);
                  setExpandedId(e.id);
                }}
              >
                <MarkerContent>
                  <div className="relative group">
                    <div
                      className={`h-10 w-10 rounded-full border-[3px] ${intencaoBorder[e.intencao]} overflow-hidden bg-background transition-transform duration-150 group-hover:scale-125`}
                    >
                      <img
                        src={e.foto}
                        alt={e.nome}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* Pulse ring */}
                    {selectedId === e.id && (
                      <div
                        className={`absolute inset-0 rounded-full border-2 ${intencaoBorder[e.intencao]} animate-ping opacity-40`}
                      />
                    )}
                  </div>
                </MarkerContent>
                <MarkerPopup className="p-0 min-w-[220px]">
                  <div className="p-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={e.foto}
                        alt={e.nome}
                        className={`h-10 w-10 rounded-full object-cover ring-2 ${intencaoRing[e.intencao]}`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">
                          {e.nome}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {e.bairro}
                        </p>
                      </div>
                    </div>
                    <Separator className="my-2.5" />
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className={intencaoBadge[e.intencao]}
                      >
                        {e.intencao}
                      </Badge>
                      <div className="flex gap-1">
                        {e.tags.slice(0, 2).map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {e.telefone}
                    </div>
                  </div>
                </MarkerPopup>
              </MapMarker>
            ))}
          </Map>
        </div>
      </div>
    </motion.div>
  );
}
