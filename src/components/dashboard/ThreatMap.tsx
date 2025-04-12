
import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

type ThreatLocation = {
  name: string;
  coordinates: [number, number];
  threatCount: number;
  type: 'malware' | 'ransomware' | 'phishing' | 'ddos' | 'other';
};

const markerColors = {
  malware: '#dc2626',
  ransomware: '#9333ea',
  phishing: '#f59e0b',
  ddos: '#3b82f6',
  other: '#64ffda',
};

type ThreatMapProps = {
  threatLocations?: ThreatLocation[];
};

const defaultThreatLocations: ThreatLocation[] = [
  { name: "New York", coordinates: [-74.006, 40.7128], threatCount: 52, type: 'ransomware' },
  { name: "London", coordinates: [-0.1278, 51.5074], threatCount: 47, type: 'malware' },
  { name: "Tokyo", coordinates: [139.6503, 35.6762], threatCount: 38, type: 'phishing' },
  { name: "Moscow", coordinates: [37.6173, 55.7558], threatCount: 65, type: 'malware' },
  { name: "Beijing", coordinates: [116.4074, 39.9042], threatCount: 49, type: 'ddos' },
  { name: "Mumbai", coordinates: [72.8777, 19.0760], threatCount: 31, type: 'phishing' },
  { name: "São Paulo", coordinates: [-46.6333, -23.5505], threatCount: 27, type: 'ransomware' },
  { name: "Sydney", coordinates: [151.2093, -33.8688], threatCount: 19, type: 'other' },
];

export function ThreatMap({ threatLocations = defaultThreatLocations }: ThreatMapProps) {
  return (
    <div className="cyber-card p-4 h-full">
      <h3 className="text-lg font-medium mb-4">Global Threat Activity</h3>
      <TooltipProvider>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            rotate: [-10, 0, 0],
            center: [0, 10],
          }}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#0a192f"
                  stroke="#64ffda"
                  strokeWidth={0.1}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#142440" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {threatLocations.map(({ name, coordinates, threatCount, type }) => (
            <Tooltip key={name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Marker coordinates={coordinates}>
                  <circle
                    r={Math.sqrt(threatCount) * 0.3 + 3}
                    fill={markerColors[type]}
                    stroke="#fff"
                    strokeWidth={0.5}
                    opacity={0.8}
                    className="animate-pulse-glow cursor-pointer"
                  />
                </Marker>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-1">
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">Threat type: {type}</p>
                  <p className="text-xs">{threatCount} incidents detected</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </ComposableMap>
      </TooltipProvider>
    </div>
  );
}
