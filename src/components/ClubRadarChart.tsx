import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ClubSummary } from '../types';
import { getModernLeagueData, getLiginaData } from '../data/leagueData';
import { clubMetadataList } from '../data/clubMetadata';

interface ClubRadarChartProps {
  clubs: ClubSummary[];
}

export default function ClubRadarChart({ clubs }: ClubRadarChartProps) {
  const chartData = useMemo(() => {
    // Helper to calculate how many times a club's player became top scorer
    const getTopScorerCount = (clubName: string) => {
      const allData = [...getModernLeagueData(), ...getLiginaData()];
      return allData.filter(d => d.topScorer && d.topScorer.includes(clubName)).length;
    };

    const getCoachTitlesCount = (clubName: string) => {
      const allData = [...getModernLeagueData(), ...getLiginaData()];
      return allData.filter(d => d.winner === clubName && d.coach).length;
    };

    const dataTemplate: { subject: string; fullMark: number; [key: string]: any }[] = [
      { subject: 'Gelar Profesional', fullMark: 4 },
      { subject: 'Gelar Klasik (Amatir)', fullMark: 4 },
      { subject: 'Runner-Up (Pro)', fullMark: 4 },
      { subject: 'Gelar Top Skor', fullMark: 3 },
      { subject: 'Gelar Pelatih', fullMark: 3 }
    ];

    clubs.forEach(club => {
      const tsCount = getTopScorerCount(club.name);
      const coachCount = getCoachTitlesCount(club.name);

      dataTemplate[0][club.name] = club.titles;
      dataTemplate[1][club.name] = club.amatirTitles || 0;
      dataTemplate[2][club.name] = club.runnerUps;
      dataTemplate[3][club.name] = tsCount;
      dataTemplate[4][club.name] = coachCount;

      dataTemplate[0].fullMark = Math.max(dataTemplate[0].fullMark, club.titles);
      dataTemplate[1].fullMark = Math.max(dataTemplate[1].fullMark, club.amatirTitles || 0);
      dataTemplate[2].fullMark = Math.max(dataTemplate[2].fullMark, club.runnerUps);
      dataTemplate[3].fullMark = Math.max(dataTemplate[3].fullMark, tsCount);
      dataTemplate[4].fullMark = Math.max(dataTemplate[4].fullMark, coachCount);
    });

    return dataTemplate;
  }, [clubs]);

  const defaultColors = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-black text-sm uppercase mb-2 border-b-2 border-black pb-1">{payload[0].payload.subject}</p>
          <div className="space-y-1 text-xs font-bold uppercase">
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: {entry.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border-4 border-black bg-[#F2F2F2] p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
      <div className="mb-2">
        <h3 className="text-xl font-black italic uppercase tracking-tighter">Peta Kekuatan (Radar)</h3>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Komparasi Atribut Multi-Klub</p>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#000" strokeWidth={2} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#000', fontSize: 10, fontWeight: 900, fontFamily: 'monospace' }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#000', fontWeight: 'bold' }} />
            <Tooltip content={<CustomTooltip />} />
            {clubs.map((club, index) => {
              const meta = clubMetadataList[club.name];
              const color = meta?.colors?.primary || defaultColors[index % defaultColors.length];
              return (
                <Radar 
                  key={club.name}
                  name={club.name} 
                  dataKey={club.name} 
                  stroke={color} 
                  strokeWidth={3}
                  fill={color} 
                  fillOpacity={0.5} 
                />
              );
            })}
            <Legend 
              wrapperStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', fontFamily: 'monospace' }} 
              iconType="square"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
