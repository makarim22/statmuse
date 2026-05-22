import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ClubSummary } from '../types';
import { getModernLeagueData, getLiginaData, getPerserikatanData } from '../data/leagueData';
import { clubMetadataList } from '../data/clubMetadata';

interface ClubRadarChartProps {
  clubA: ClubSummary;
  clubB: ClubSummary;
}

export default function ClubRadarChart({ clubA, clubB }: ClubRadarChartProps) {
  const chartData = useMemo(() => {
    // Helper to calculate how many times a club's player became top scorer
    const getTopScorerCount = (clubName: string) => {
      const allData = [...getModernLeagueData(), ...getLiginaData()];
      // Some top scorers are listed like: "Marko Šimić (Persija Jakarta, 23 gol)"
      return allData.filter(d => d.topScorer && d.topScorer.includes(clubName)).length;
    };

    const getCoachTitlesCount = (clubName: string) => {
      const allData = [...getModernLeagueData(), ...getLiginaData()];
      return allData.filter(d => d.winner === clubName && d.coach).length;
    };

    const topScorerA = getTopScorerCount(clubA.name);
    const topScorerB = getTopScorerCount(clubB.name);

    const coachA = getCoachTitlesCount(clubA.name);
    const coachB = getCoachTitlesCount(clubB.name);

    // To make radar chart look good, we need to normalize or just use raw values 
    // if they are somewhat in the same range (0-10).
    return [
      {
        subject: 'Gelar Profesional',
        A: clubA.titles,
        B: clubB.titles,
        fullMark: Math.max(clubA.titles, clubB.titles, 4),
      },
      {
        subject: 'Gelar Klasik (Amatir)',
        A: clubA.amatirTitles || 0,
        B: clubB.amatirTitles || 0,
        fullMark: Math.max(clubA.amatirTitles || 0, clubB.amatirTitles || 0, 4),
      },
      {
        subject: 'Runner-Up (Pro)',
        A: clubA.runnerUps,
        B: clubB.runnerUps,
        fullMark: Math.max(clubA.runnerUps, clubB.runnerUps, 4),
      },
      {
        subject: 'Gelar Top Skor',
        A: topScorerA,
        B: topScorerB,
        fullMark: Math.max(topScorerA, topScorerB, 3),
      },
      {
        subject: 'Gelar Pelatih',
        A: coachA,
        B: coachB,
        fullMark: Math.max(coachA, coachB, 3),
      }
    ];
  }, [clubA, clubB]);

  const metaA = clubMetadataList[clubA.name];
  const metaB = clubMetadataList[clubB.name];

  const colorA = metaA?.colors.primary || "#EF4444";
  const colorB = metaB?.colors.primary || "#3B82F6";

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-black text-sm uppercase mb-2 border-b-2 border-black pb-1">{payload[0].payload.subject}</p>
          <div className="space-y-1 text-xs font-bold uppercase">
            <p style={{ color: colorA }}>{clubA.name}: {payload[0].value}</p>
            <p style={{ color: colorB }}>{clubB.name}: {payload[1].value}</p>
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
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Komparasi Atribut Head-to-Head</p>
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
            <Radar 
              name={clubA.name} 
              dataKey="A" 
              stroke="#000" 
              strokeWidth={3}
              fill={colorA} 
              fillOpacity={0.6} 
            />
            <Radar 
              name={clubB.name} 
              dataKey="B" 
              stroke="#000" 
              strokeWidth={3}
              fill={colorB} 
              fillOpacity={0.6} 
            />
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
