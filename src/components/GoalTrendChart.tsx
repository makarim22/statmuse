import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getModernLeagueData } from '../data/leagueData';

interface GoalTrendProps {
  className?: string;
}

export default function GoalTrendChart({ className }: GoalTrendProps) {
  const chartData = useMemo(() => {
    const modernData = getModernLeagueData();
    
    return modernData
      .filter(item => !item.isCancelled && item.topScorer)
      .map(item => {
        // Extract goals using regex, e.g., "Nama Pemain (Klub, 25 gol)" -> 25
        const match = item.topScorer?.match(/(\d+)\s*gol/i);
        const goals = match ? parseInt(match[1], 10) : 0;
        
        // Extract top scorer name
        const nameMatch = item.topScorer?.split('(')[0].trim();
        
        return {
          season: item.season.replace(/20/g, "'").replace("–", "-"), // Shorten season "2010–11" -> "'10-'11"
          fullSeason: item.season,
          goals: goals,
          player: nameMatch || "Unknown",
          clubWinner: item.winner
        };
      })
      .filter(data => data.goals > 0);
  }, []);

  // Custom Neo-Brutalist Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-[250px]">
          <p className="font-black text-lg border-b-2 border-black pb-1 mb-2">Musim {data.fullSeason}</p>
          <div className="space-y-1">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Top Skor:</p>
            <p className="text-xl font-black text-primary drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
              {data.goals} GOL
            </p>
            <p className="text-sm font-bold text-black mt-1">👤 {data.player}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`border-4 border-black bg-white p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-black italic uppercase tracking-tighter">Evolusi Ketajaman Top Skor</h3>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">
          Trend Produktivitas Gol Pencetak Terbanyak per Musim (Era Modern)
        </p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--theme-primary)" stopOpacity={1}/>
                <stop offset="95%" stopColor="var(--theme-primary)" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#000" strokeWidth={1} opacity={0.2} />
            <XAxis 
              dataKey="season" 
              tick={{ fontFamily: 'monospace', fontWeight: 900, fill: '#000', fontSize: 10 }}
              axisLine={{ stroke: '#000', strokeWidth: 4 }}
              tickLine={{ stroke: '#000', strokeWidth: 2 }}
            />
            <YAxis 
              tick={{ fontFamily: 'monospace', fontWeight: 900, fill: '#000', fontSize: 12 }}
              axisLine={{ stroke: '#000', strokeWidth: 4 }}
              tickLine={false}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#000', strokeWidth: 2, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="goals" 
              stroke="#000" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorGoals)" 
              activeDot={{ r: 8, stroke: '#000', strokeWidth: 3, fill: '#FFF' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
