const fs = require('fs');
const f = 'src/data/exercises.json';
const orig = fs.readFileSync(f, 'utf8');

// Insert "type": "Strength" after "equipment": [...], before "information":
const result = orig.replace(
  /("equipment":\s*\[[^\]]*?\]),(\s*\r?\n\s*)("information")/g,
  '$1,$2"type": "Strength",$2$3'
);

fs.writeFileSync(f, result);

// Verify it's valid JSON
const parsed = JSON.parse(result);
console.log(`Done. Updated ${parsed.length} exercises. All have type field:`, 
  parsed.every(ex => ex.type === 'Strength'));
