const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');

// Chemins
const dataPath = path.join(__dirname, 'data', 'tools.json');
const templatePath = path.join(__dirname, 'outil', 'template.html');
const outputDir = path.join(__dirname, 'outil');

// Lire les outils
const tools = fs.readJsonSync(dataPath);

// Lire le template HTML
const templateContent = fs.readFileSync(templatePath, 'utf-8');
const template = Handlebars.compile(templateContent);

// Créer le dossier de sortie s'il n'existe pas
fs.ensureDirSync(outputDir);

// Générer chaque page
tools.forEach(tool => {
  const html = template(tool);
  const outputFile = path.join(outputDir, `${tool.slug}.html`);
  fs.writeFileSync(outputFile, html, 'utf-8');
  console.log(`✅ Généré : ${tool.slug}.html`);
});

console.log('🎉 Toutes les pages outils ont été générées !');
