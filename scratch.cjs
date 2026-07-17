const fs = require('fs');
const files = ['Hero.jsx', 'About.jsx', 'Experience.jsx', 'Portfolio.jsx', 'Skills.jsx', 'Testimonials.jsx', 'Contact.jsx'];

files.forEach(f => {
  let p = 'src/components/' + f;
  if (!fs.existsSync(p)) return;
  
  let c = fs.readFileSync(p, 'utf8');
  
  // Only replace if not already motion.section
  if (c.includes('<section ')) {
    c = c.replace(/<section id="([^"]+)" className="([^"]+)"\s*>/, 
      '<motion.section id="$1" className="$2"\n      initial={{ opacity: 0.3, filter: \'blur(10px)\' }}\n      whileInView={{ opacity: 1, filter: \'blur(0px)\' }}\n      viewport={{ amount: 0.2 }}\n      transition={{ duration: 0.8, ease: "easeOut" }}\n    >');
      
    c = c.replace(/<\/section>/g, '</motion.section>');
    
    // Check if framer-motion is imported. It should be, but let's check
    if (!c.includes('framer-motion')) {
      c = "import { motion } from 'framer-motion';\n" + c;
    }
    
    fs.writeFileSync(p, c);
    console.log('Updated ' + f);
  }
});
