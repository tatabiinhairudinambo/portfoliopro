const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.jsx'));

let changedFiles = 0;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace viewport configs that don't have once: true
  content = content.replace(/viewport=\{\{\s*amount:\s*(0\.\d+)\s*\}\}/g, 'viewport={{ once: true, amount: $1 }}');
  
  // Remove blur filters from framer-motion animations
  content = content.replace(/,\s*filter:\s*'blur\(\d+px\)'/g, '');
  content = content.replace(/filter:\s*'blur\(\d+px\)'\s*,?/g, '');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    changedFiles++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Successfully updated ${changedFiles} files.`);
