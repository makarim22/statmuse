const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'standingsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const seasonsToUpdate = [
  "2008-2009", "2007-2008", "2006", "2005", "2004", "2003", "2002", "2001", 
  "1999-2000", "1998-1999", "1996-1997", "1995-1996", "1994-1995"
];

// Helper to generate dummy teams starting from rank 4 (or 3, depending on the season)
function generateDummyTeams(startRank, numTeams) {
  let teams = [];
  for (let i = startRank; i <= numTeams; i++) {
    teams.push(`    { rank: ${i}, clubName: "Klub Pesaing ${i}", played: 0, won: 0, draw: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, form: ["L", "D", "L", "D", "L"] }`);
  }
  return teams;
}

// Find the object
const seasonRegex = /"(\d{4}(?:-\d{4})?)":\s*\[\s*(\{[\s\S]*?\})\s*\]/g;

let match;
while ((match = seasonRegex.exec(content)) !== null) {
  const season = match[1];
  if (seasonsToUpdate.includes(season)) {
    const existingTeamsStr = match[2];
    const existingTeamsCount = (existingTeamsStr.match(/\{/g) || []).length;
    
    if (existingTeamsCount < 18) {
      const dummyTeamsStr = generateDummyTeams(existingTeamsCount + 1, 18).join(',\n');
      const newTeamsStr = existingTeamsStr + ',\n' + dummyTeamsStr;
      content = content.replace(match[0], `"${season}": [\n${newTeamsStr}\n  ]`);
    }
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Finished updating standingsData.ts");
