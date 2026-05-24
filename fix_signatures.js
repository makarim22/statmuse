import fs from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'src/components/logos');
const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(path.join(outputDir, file), 'utf8');
  
  if (content.includes('BrutalistLogoProps')) {
    continue; // Already fixed
  }

  content = content.replace(
    /const (\w+) = \(props: SVGProps<SVGSVGElement>\) => <svg/,
    `interface BrutalistLogoProps extends SVGProps<SVGSVGElement> {\n  primaryColor?: string;\n  secondaryColor?: string;\n  borderColor?: string;\n}\n\nconst $1 = ({ primaryColor = "var(--theme-primary, #000)", secondaryColor = "#fff", borderColor = "#1A1A1A", ...props }: BrutalistLogoProps) => <svg`
  );

  fs.writeFileSync(path.join(outputDir, file), content);
  console.log(`Fixed ${file}`);
}
