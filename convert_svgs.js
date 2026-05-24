import { transform } from '@svgr/core';
import fs from 'fs';
import path from 'path';

const logosDir = path.join(process.cwd(), 'src/assets/logo');
const outputDir = path.join(process.cwd(), 'src/components/logos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const batch3 = ['persita-tangerang.svg', 'psbs-biak.svg', 'psim-yogyakarta.svg', 'psm-makassar.svg', 'semen-padang.svg'];

async function processSVGs() {
  for (const svgFile of batch3) {
    let svgCode = fs.readFileSync(path.join(logosDir, svgFile), 'utf8');
    
    let componentName = svgFile.replace('.svg', '').split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('') + 'Logo';
    
    let jsCode = await transform(
      svgCode,
      { 
        plugins: ['@svgr/plugin-jsx'],
        typescript: true,
        icon: false,
      },
      { componentName }
    );

    // Inject the Brutalist Props into the component signature
    jsCode = jsCode.replace(
      /const (\w+) = \(props: SVGProps<SVGSVGElement>\) => <svg/,
      `interface BrutalistLogoProps extends SVGProps<SVGSVGElement> {\n  primaryColor?: string;\n  secondaryColor?: string;\n  borderColor?: string;\n}\n\nconst $1 = ({ primaryColor = "var(--theme-primary, #000)", secondaryColor = "#fff", borderColor = "#1A1A1A", ...props }: BrutalistLogoProps) => <svg`
    );

    // White colors -> secondaryColor
    jsCode = jsCode.replace(/fill:\s*["']#(f{3,6}|ffffff)["']/gi, 'fill: secondaryColor');
    jsCode = jsCode.replace(/fill=["']#(f{3,6}|ffffff)["']/gi, 'fill={secondaryColor}');
    
    // Black colors or dark grays -> borderColor
    jsCode = jsCode.replace(/fill:\s*["']#(0{3,6}|1a1a1a|222|333|000000)["']/gi, 'fill: borderColor');
    jsCode = jsCode.replace(/fill=["']#(0{3,6}|1a1a1a|222|333|000000)["']/gi, 'fill={borderColor}');

    // Other hex colors -> primaryColor
    jsCode = jsCode.replace(/fill:\s*["']#[a-zA-Z0-9]+["']/gi, 'fill: primaryColor');
    jsCode = jsCode.replace(/fill=["']#[a-zA-Z0-9]+["']/gi, 'fill={primaryColor}');

    fs.writeFileSync(path.join(outputDir, `${componentName}.tsx`), jsCode);
    console.log(`Generated Brutalist ${componentName}.tsx`);
  }
}

processSVGs();
