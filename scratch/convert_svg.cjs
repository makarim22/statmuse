const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'src', 'assets', 'indonesia.svg');
const tsxPath = path.join(__dirname, '..', 'src', 'components', 'IndonesiaMap.tsx');

let svgContent = fs.readFileSync(svgPath, 'utf8');

// Remove XML and doctype tags
svgContent = svgContent.replace(/<\?xml.*?\?>/s, '');
svgContent = svgContent.replace(/<!--.*?-->/s, '');

// Fix namespace prefixes for React
svgContent = svgContent.replace(/xmlns:mapsvg=".*?"/g, '');
svgContent = svgContent.replace(/xmlns:dc=".*?"/g, '');
svgContent = svgContent.replace(/xmlns:rdf=".*?"/g, '');
svgContent = svgContent.replace(/xmlns:svg=".*?"/g, '');
svgContent = svgContent.replace(/xmlns=".*?"/g, '');
svgContent = svgContent.replace(/mapsvg:geoViewBox/g, 'data-geoviewbox');

// Remove title="..."
svgContent = svgContent.replace(/title="[^"]*"/g, '');

// Handle closing slash properly
const pathRegex = /<path([^>]*?)id="([^"]+)"([^>]*?)>/g;

let newSvg = svgContent.replace(pathRegex, (match, beforeId, id, afterId) => {
  let isSelfClosing = afterId.trim().endsWith('/');
  let cleanAfterId = isSelfClosing ? afterId.replace(/\/$/, '') : afterId;
  
  return `<path${beforeId}id="${id}"${cleanAfterId} fill={provinceColors["${id}"] || defaultColor} className="transition-colors duration-500 cursor-pointer hover:opacity-80 stroke-black stroke-[1]" onClick={() => onProvinceClick && onProvinceClick("${id}")} ${isSelfClosing ? '/>' : '>'}`;
});

// Create the component wrapper
const componentCode = `import React from 'react';

export interface IndonesiaMapProps {
  provinceColors?: Record<string, string>;
  defaultColor?: string;
  onProvinceClick?: (provinceId: string) => void;
  className?: string;
}

const IndonesiaMap: React.FC<IndonesiaMapProps> = ({ 
  provinceColors = {}, 
  defaultColor = '#E2E8F0',
  onProvinceClick,
  className = ''
}) => {
  return (
    <div className={\`w-full h-full flex justify-center items-center \${className}\`}>
      <svg 
        viewBox="0 0 792.54596 316.66394" 
        width="100%" 
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        ${newSvg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
      </svg>
    </div>
  );
};

export default IndonesiaMap;
`;

fs.writeFileSync(tsxPath, componentCode, 'utf8');
console.log('Successfully generated IndonesiaMap.tsx');
