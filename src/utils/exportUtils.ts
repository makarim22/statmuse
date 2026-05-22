import { SeasonRecord, ClubSummary } from '../types';

/**
 * Export utilities for downloading data in various formats
 */

// Convert data to CSV format
export const exportToCSV = (data: SeasonRecord[], filename: string = 'liga-indonesia-history.csv') => {
  // CSV Headers
  const headers = ['Season', 'Winner', 'Runner-Up', 'Top Scorer', 'Coach', 'Notes'];

  // Convert data to CSV rows
  const rows = data
    .filter(item => !item.isCancelled)
    .map(item => [
      item.season,
      item.winner,
      item.runnerUp,
      item.topScorer || '-',
      item.coach || '-',
      item.note || '-'
    ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Create and trigger download
  downloadFile(csvContent, filename, 'text/csv');
};

// Export club rankings to CSV
export const exportClubRankingsToCSV = (data: ClubSummary[], filename: string = 'club-rankings.csv') => {
  const headers = ['Rank', 'Club Name', 'Professional Titles', 'Runner-Ups', 'Amateur Titles', 'Seasons Won (Professional)', 'Seasons Won (Amateur)'];

  const rows = data.map((club, index) => [
    (index + 1).toString(),
    club.name,
    club.titles.toString(),
    club.runnerUps.toString(),
    club.amatirTitles.toString(),
    club.seasonsWon.join('; '),
    club.amatirSeasonsWon.join('; ')
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv');
};

// Export to JSON format
export const exportToJSON = (data: any, filename: string = 'liga-indonesia-data.json') => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
};

// Export standings to CSV
export const exportStandingsToCSV = (data: any[], seasonName: string) => {
  const headers = ['Rank', 'Club', 'Played', 'Won', 'Draw', 'Lost', 'Goals For', 'Goals Against', 'Goal Difference', 'Points'];

  const rows = data.map(entry => [
    entry.rank.toString(),
    entry.clubName,
    entry.played.toString(),
    entry.won.toString(),
    entry.draw.toString(),
    entry.lost.toString(),
    entry.goalsFor.toString(),
    entry.goalsAgainst.toString(),
    (entry.goalsFor - entry.goalsAgainst).toString(),
    entry.points.toString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  downloadFile(csvContent, `standings-${seasonName}.csv`, 'text/csv');
};

// Helper function to trigger file download
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate shareable stat card as text
export const generateStatCard = (club: ClubSummary): string => {
  return `
╔════════════════════════════════════════╗
║   GARUDA STATS - PROFIL KLUB          ║
╠════════════════════════════════════════╣
║                                        ║
║  ${club.name.toUpperCase().padEnd(38)}║
║                                        ║
║  🏆 Gelar Era Profesional: ${club.titles.toString().padStart(2)}         ║
║  🥈 Runner-Up: ${club.runnerUps.toString().padStart(2)}                    ║
║  📜 Gelar Era Amatir: ${club.amatirTitles.toString().padStart(2)}          ║
║                                        ║
║  Tahun Juara (Profesional):            ║
║  ${club.seasonsWon.join(', ').substring(0, 36).padEnd(38)}║
${club.seasonsWon.join(', ').length > 36 ? `║  ${club.seasonsWon.join(', ').substring(36, 72).padEnd(38)}║` : ''}
║                                        ║
╚════════════════════════════════════════╝

Sumber: Garuda Stats - Database Sejarah Liga Indonesia
`.trim();
};

// Copy stat card to clipboard
export const copyStatCardToClipboard = async (club: ClubSummary): Promise<boolean> => {
  try {
    const statCard = generateStatCard(club);
    await navigator.clipboard.writeText(statCard);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};
