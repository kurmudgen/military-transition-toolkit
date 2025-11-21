#!/usr/bin/env python3
"""Generate JavaScript database files from extracted career data"""

import json

# Load extraction results
with open('career-data-extraction-results.json', 'r', encoding='utf-8') as f:
    results = json.load(f)

career_data = results['data']
common_jobs = results['common_jobs']
common_skills = results['common_skills']

# Generate careerDatabase.js
js_content = '''/**
 * Career Translation Database
 * Auto-generated from 272 MOS/rating career guides
 *
 * Data extracted from Military Toolkit Content Library
 * Last updated: 2025-11-20
 */

export const careerDatabase = {
'''

# Add each branch
for branch in ['army', 'marines', 'navy', 'coastguard']:
    branch_data = career_data[branch]
    js_content += f"  {branch}: {{\n"

    for mos_code, data in sorted(branch_data.items()):
        # Escape quotes in strings
        title = data['title'].replace("'", "\\'").replace('"', '\\"')
        branch_name = data['branch'].replace("'", "\\'")

        js_content += f"    '{mos_code}': {{\n"
        js_content += f"      title: '{title}',\n"
        js_content += f"      branch: '{branch_name}',\n"

        # Civilian jobs array
        js_content += "      civilianJobs: [\n"
        for job in data['civilianJobs']:
            job_clean = job.replace("'", "\\'").replace('"', '\\"')
            js_content += f"        '{job_clean}',\n"
        js_content += "      ],\n"

        # Skills array
        js_content += "      skills: [\n"
        for skill in data['skills']:
            skill_clean = skill.replace("'", "\\'").replace('"', '\\"')
            js_content += f"        '{skill_clean}',\n"
        js_content += "      ],\n"

        # Certifications array
        if data['certifications']:
            js_content += "      certifications: [\n"
            for cert in data['certifications']:
                cert_clean = cert.replace("'", "\\'").replace('"', '\\"')
                js_content += f"        '{cert_clean}',\n"
            js_content += "      ],\n"
        else:
            js_content += "      certifications: [],\n"

        # Salary range
        if data['salaryRange']:
            salary = data['salaryRange'].replace("'", "\\'")
            js_content += f"      salaryRange: '{salary}'\n"
        else:
            js_content += "      salaryRange: null\n"

        js_content += "    },\n"

    js_content += "  },\n\n"

js_content += "};\n\n"

# Add flattened lookup
js_content += '''/**
 * Flattened lookup table for quick access by MOS/rating code
 */
export const careerLookup = {
'''

for branch in ['army', 'marines', 'navy', 'coastguard']:
    branch_data = career_data[branch]
    for mos_code in sorted(branch_data.keys()):
        js_content += f"  '{mos_code}': careerDatabase.{branch}['{mos_code}'],\n"

js_content += "};\n"

# Save careerDatabase.js
with open('src/data/translations/careerDatabase.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

file_size = len(js_content) / 1024
print(f"Created careerDatabase.js ({file_size:.1f} KB)")

# Generate skillsJargon.js
jargon_content = '''/**
 * Military-to-Civilian Jargon Translation Dictionary
 * Auto-generated from career guides
 */

export const jargonDictionary = {
  'NCOIC': ['supervisor', 'team lead', 'manager'],
  'OIC': ['officer in charge', 'program manager', 'director'],
  'squad leader': ['team supervisor', 'group lead', 'unit manager'],
  'platoon sergeant': ['senior supervisor', 'operations manager', 'department head'],
  'conducted': ['executed', 'performed', 'completed', 'carried out'],
  'supervised': ['managed', 'oversaw', 'directed', 'led'],
  'coordinated': ['organized', 'arranged', 'facilitated', 'managed'],
  'maintained': ['serviced', 'preserved', 'managed', 'kept'],
  'trained': ['educated', 'instructed', 'developed', 'coached'],
  'operated': ['used', 'ran', 'managed', 'controlled'],
  'accountability': ['responsibility', 'oversight', 'management'],
  'mission': ['project', 'objective', 'goal', 'assignment'],
  'deployment': ['assignment', 'project', 'operation'],
  'billet': ['position', 'role', 'assignment'],
  'collateral duty': ['additional responsibility', 'secondary role'],
  'watch': ['shift', 'duty period', 'scheduled work period'],
  'quarters': ['work area', 'workspace', 'facility'],
  'head count': ['attendance', 'roster check', 'personnel count'],
  'muster': ['meeting', 'assembly', 'team gathering'],
  'liberty': ['time off', 'leave', 'personal time'],
  'field day': ['facility cleaning', 'maintenance day'],
  'PCS': ['relocation', 'transfer', 'job change'],
  'TDY': ['temporary assignment', 'business travel'],
  'TAD': ['temporary duty', 'short-term assignment'],
  'SOP': ['standard operating procedure', 'established process', 'protocol'],
  'ROE': ['rules of engagement', 'operational guidelines', 'protocols'],
  'SITREP': ['status report', 'situation update', 'progress report'],
  'AAR': ['after action review', 'post-project assessment', 'lessons learned'],
  'zero defects': ['error-free', 'perfect record', '100% compliance']
};

export function translateTerm(term) {
  const normalized = term.toLowerCase().trim();
  return jargonDictionary[normalized] || [term];
}

export function civilianizeText(text) {
  let result = text;
  Object.entries(jargonDictionary).forEach(([military, civilian]) => {
    const regex = new RegExp(`\\\\b${military}\\\\b`, 'gi');
    result = result.replace(regex, civilian[0]);
  });
  return result;
}
'''

# Save skillsJargon.js
with open('src/data/translations/skillsJargon.js', 'w', encoding='utf-8') as f:
    f.write(jargon_content)

jargon_size = len(jargon_content) / 1024
print(f"Created skillsJargon.js ({jargon_size:.1f} KB)")

print("\nTop 10 civilian jobs across all MOS:")
for i, (job, count) in enumerate(list(common_jobs.items())[:10], 1):
    print(f"  {i}. {job} ({count} mentions)")

print("\nTop 10 skills across all MOS:")
for i, (skill, count) in enumerate(list(common_skills.items())[:10], 1):
    print(f"  {i}. {skill} ({count} mentions)")
