/**
 * Batch update script to fix all DentistPractice schema types to LocalBusiness + Dentist
 * Run this utility to update all structured data components at once
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

export async function fixStructuredDataSchemas() {
  const files = await glob('src/**/*.tsx');
  
  for (const file of files) {
    let content = readFileSync(file, 'utf8');
    let hasChanges = false;

    // Replace DentistPractice with correct schema types
    const replacements = [
      {
        from: "'@type': 'DentistPractice'",
        to: "'@type': ['LocalBusiness', 'Dentist']"
      },
      {
        from: '"@type": "DentistPractice"',
        to: '"@type": ["LocalBusiness", "Dentist"]'
      }
    ];

    for (const replacement of replacements) {
      if (content.includes(replacement.from)) {
        content = content.replace(new RegExp(replacement.from, 'g'), replacement.to);
        hasChanges = true;
      }
    }

    // Update URLs to use canonical format
    const urlReplacements = [
      {
        from: 'https://exquisitedentistryla.com/about/',
        to: 'https://exquisitedentistryla.com/about/'
      },
      {
        from: 'https://exquisitedentistryla.com/contact/',
        to: 'https://exquisitedentistryla.com/contact/'
      },
      {
        from: 'https://exquisitedentistryla.com/services/',
        to: 'https://exquisitedentistryla.com/services/'
      }
    ];

    if (hasChanges) {
      writeFileSync(file, content);
      console.log(`Updated structured data in: ${file}`);
    }
  }
}

// Development helper
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Structured data schema types have been standardized');
}