const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Replace standard tailwind utility classes
  content = content.replace(/bg-\[#00FF85\]/g, 'bg-primary');
  content = content.replace(/text-\[#00FF85\]/g, 'text-primary');
  content = content.replace(/border-\[#00FF85\]/g, 'border-primary');
  content = content.replace(/ring-\[#00FF85\]/g, 'ring-primary');
  content = content.replace(/fill-\[#00FF85\]/g, 'fill-primary');
  content = content.replace(/stroke-\[#00FF85\]/g, 'stroke-primary');
  content = content.replace(/from-\[#00FF85\]/g, 'from-primary');
  content = content.replace(/to-\[#00FF85\]/g, 'to-primary');
  content = content.replace(/via-\[#00FF85\]/g, 'via-primary');

  // Replace shadow arbitrary values
  // e.g. shadow-[4px_4px_0px_0px_#00FF85] -> shadow-[4px_4px_0px_0px_var(--theme-primary)]
  content = content.replace(/shadow-\[([^\]]+)_#00FF85\]/g, 'shadow-[$1_var(--theme-primary)]');

  // Replace any remaining #00FF85 with var(--theme-primary)
  // This covers <Line stroke="#00FF85" /> -> <Line stroke="var(--theme-primary)" />
  content = content.replace(/#00FF85/gi, 'var(--theme-primary)');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
};

const walk = (dir) => {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      walk(fullPath);
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
        replaceInFile(fullPath);
      }
    }
  });
};

walk(srcDir);
console.log('Replacement complete.');
