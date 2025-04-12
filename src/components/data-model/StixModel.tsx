
import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Node = {
  id: string;
  name: string;
  type: string;
  color: string;
  val: number;
};

type Link = {
  source: string;
  target: string;
  label?: string;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

const defaultData: GraphData = {
  nodes: [
    { id: 'threat-actor', name: 'Threat Actor', type: 'threat-actor', color: '#dc2626', val: 20 },
    { id: 'campaign', name: 'Campaign', type: 'campaign', color: '#f59e0b', val: 15 },
    { id: 'malware', name: 'Malware', type: 'malware', color: '#9333ea', val: 18 },
    { id: 'attack-pattern', name: 'Attack Pattern', type: 'attack-pattern', color: '#3b82f6', val: 12 },
    { id: 'indicator', name: 'Indicator', type: 'indicator', color: '#10b981', val: 10 },
    { id: 'identity', name: 'Identity', type: 'identity', color: '#64ffda', val: 14 },
    { id: 'vulnerability', name: 'Vulnerability', type: 'vulnerability', color: '#fb7185', val: 16 },
    { id: 'infrastructure', name: 'Infrastructure', type: 'infrastructure', color: '#a8a29e', val: 13 },
    { id: 'tool', name: 'Tool', type: 'tool', color: '#8b5cf6', val: 11 },
  ],
  links: [
    { source: 'threat-actor', target: 'campaign', label: 'conducts' },
    { source: 'campaign', target: 'malware', label: 'uses' },
    { source: 'malware', target: 'attack-pattern', label: 'uses' },
    { source: 'malware', target: 'indicator', label: 'indicates' },
    { source: 'malware', target: 'vulnerability', label: 'targets' },
    { source: 'attack-pattern', target: 'vulnerability', label: 'targets' },
    { source: 'identity', target: 'vulnerability', label: 'has' },
    { source: 'threat-actor', target: 'infrastructure', label: 'compromises' },
    { source: 'infrastructure', target: 'tool', label: 'uses' },
    { source: 'tool', target: 'attack-pattern', label: 'implements' },
  ],
};

export function StixModel({ data = defaultData }: { data?: GraphData }) {
  const graphRef = useRef<any>();

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-400);
      graphRef.current.d3Force('link').distance(100);
    }
  }, []);

  return (
    <Card className="cyber-card overflow-hidden">
      <CardHeader>
        <CardTitle>STIX Data Model</CardTitle>
        <CardDescription>Visual representation of threat intelligence using the STIX framework</CardDescription>
      </CardHeader>
      <CardContent className="h-[600px]">
        <ForceGraph2D
          ref={graphRef}
          graphData={data}
          nodeLabel="name"
          nodeColor={(node: any) => node.color}
          nodeVal={(node: any) => node.val}
          linkLabel={(link: any) => link.label}
          linkDirectionalArrowLength={6}
          linkDirectionalArrowRelPos={0.8}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={d => 0.005}
          linkDirectionalParticleColor={() => '#64ffda'}
          linkDirectionalParticleWidth={2}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.8);

            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = 'rgba(10, 25, 47, 0.8)';
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y - bckgDimensions[1] / 2 - 10,
              bckgDimensions[0],
              bckgDimensions[1]
            );

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = node.color;
            ctx.fillText(label, node.x, node.y - 10);
          }}
          backgroundColor="transparent"
        />
      </CardContent>
    </Card>
  );
}
