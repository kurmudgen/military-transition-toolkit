#!/usr/bin/env python3
"""
Autonomous Career Data Extraction Script
Extracts MOS/rating data from 272 career guide markdown files
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

print("Starting autonomous career data extraction...")
print("=" * 80)

# Source directories
sources = {
    'army': Path('S:/Military-Toolkit-Content-Library/04-Army-MOS-Guides/'),
    'marines': Path('S:/Military-Toolkit-Content-Library/05-Marine-Corps-MOS-Guides/'),
    'navy': Path('S:/Military-Toolkit-Content-Library/06-Navy-Ratings-Guides/'),
    'coastguard': Path('S:/Military-Toolkit-Content-Library/07-Coast-Guard-Ratings-Guides/')
}

# Initialize results
career_data = {
    'army': {},
    'marines': {},
    'navy': {},
    'coastguard': {}
}

# Track extraction stats
stats = {
    'total_scanned': 0,
    'successful': 0,
    'partial': 0,
    'failed': 0,
    'errors': []
}

# Track common terms
all_skills = defaultdict(int)
all_civilian_jobs = defaultdict(int)

def extract_mos_code(filename, content):
    """Extract MOS/rating code from filename"""
    filename_lower = filename.lower()

    # Army MOS pattern
    if match := re.search(r'(\d{2}[a-z])', filename_lower):
        return match.group(1).upper()

    # Marine MOS pattern
    if match := re.search(r'(\d{4})', filename_lower):
        return match.group(1)

    # Navy/CG rating pattern
    if match := re.search(r'([a-z]{2,3})-', filename_lower):
        return match.group(1).upper()

    return None

def extract_title(content, filename):
    """Extract official job title from content"""
    # Try H1 title first
    if match := re.search(r'^#\s+(.+?)(?:\n|$)', content, re.MULTILINE):
        title = match.group(1).strip()
        # Clean up
        title = re.sub(r'\s*to\s+Civilian.*', '', title, flags=re.IGNORECASE)
        title = re.sub(r'\s*Career.*Guide.*', '', title, flags=re.IGNORECASE)
        title = re.sub(r'Army MOS \d{2}[A-Z]\s*[-:]\s*', '', title)
        title = re.sub(r'^\d{4}\s+', '', title)
        return title.strip()

    # Fallback
    title = filename.replace('-civilian-career-guide.md', '')
    title = re.sub(r'^army-mos-\d{2}[a-z]-', '', title)
    title = re.sub(r'^\d{4}-', '', title)
    title = title.replace('-', ' ').title()
    return title

def extract_list_items(content, section_keywords):
    """Extract bullet list items from sections"""
    items = []

    for keyword in section_keywords:
        pattern = rf'^#+\s+.*{keyword}.*?$\n(.*?)(?=^#+\s|\Z)'
        matches = re.finditer(pattern, content, re.MULTILINE | re.DOTALL | re.IGNORECASE)

        for match in matches:
            section_text = match.group(1)
            bullets = re.findall(r'^[\s]*[-•*]\s+(.+?)(?:\n|$)', section_text, re.MULTILINE)
            items.extend(bullets)

    # Clean items
    cleaned = []
    for item in items:
        item = re.sub(r'\*+', '', item)
        item = re.sub(r'\([^)]*\)', '', item)
        item = re.sub(r'\s+', ' ', item).strip()
        if item and len(item) > 3 and item not in cleaned:
            cleaned.append(item)

    return cleaned

def extract_civilian_jobs(content):
    """Extract civilian job titles"""
    keywords = [
        'Civilian Career', 'Career Path', 'Job Option', 'Top Career',
        'Realistic Career', 'Career Transition', 'Where.*Work'
    ]
    jobs = extract_list_items(content, keywords)
    return jobs[:8]

def extract_skills(content):
    """Extract transferable skills"""
    keywords = [
        'Transferable Skill', 'Key Skill', 'Core Competenc',
        'Technical Skill', 'What.*Learn', 'Skill.*Develop'
    ]
    skills = extract_list_items(content, keywords)

    if not skills:
        # Fallback: common skill keywords
        common_skills = [
            'Leadership', 'Management', 'Technical', 'Communication',
            'Planning', 'Coordination', 'Maintenance', 'Operations',
            'Training', 'Supervision', 'Analysis', 'Problem Solving'
        ]
        for skill in common_skills:
            if re.search(rf'\b{skill}\b', content, re.IGNORECASE):
                skills.append(skill)

    return skills[:10]

def extract_certifications(content):
    """Extract recommended certifications"""
    keywords = ['Certification', 'Credential', 'License', 'Professional.*Qualification']
    certs = extract_list_items(content, keywords)
    return certs[:6]

def extract_salary_range(content):
    """Extract salary range"""
    patterns = [
        r'\$[\d,]+\s*[-–]\s*\$[\d,]+',
        r'\$[\d,]+\s+to\s+\$[\d,]+',
    ]

    for pattern in patterns:
        if match := re.search(pattern, content):
            salary = match.group(0).replace('–', '-').replace(' to ', ' - ')
            return salary
    return None

# Process all files
for branch, directory in sources.items():
    print(f"\nProcessing {branch.upper()}...")
    files = sorted(directory.glob('*.md'))

    for filepath in files:
        stats['total_scanned'] += 1
        filename = filepath.name

        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            mos_code = extract_mos_code(filename, content)
            if not mos_code:
                stats['errors'].append(f"No code: {filename}")
                stats['failed'] += 1
                continue

            title = extract_title(content, filename)
            civilian_jobs = extract_civilian_jobs(content)
            skills = extract_skills(content)
            certifications = extract_certifications(content)
            salary_range = extract_salary_range(content)

            # Track common terms
            for job in civilian_jobs:
                all_civilian_jobs[job] += 1
            for skill in skills:
                all_skills[skill] += 1

            # Store data
            entry = {
                'title': title,
                'branch': branch.title() if branch != 'coastguard' else 'Coast Guard',
                'civilianJobs': civilian_jobs if civilian_jobs else ['Contact career counselor for options'],
                'skills': skills if skills else ['Leadership', 'Teamwork', 'Communication'],
                'certifications': certifications,
                'salaryRange': salary_range
            }

            career_data[branch][mos_code] = entry

            if len(civilian_jobs) >= 3 and len(skills) >= 3:
                stats['successful'] += 1
            else:
                stats['partial'] += 1

            if stats['total_scanned'] % 50 == 0:
                print(f"  Progress: {stats['total_scanned']}/272")

        except Exception as e:
            stats['failed'] += 1
            stats['errors'].append(f"{filename}: {str(e)}")

print(f"\n{'=' * 80}")
print(f"EXTRACTION COMPLETE")
print(f"Total: {stats['total_scanned']}/272")
print(f"Success: {stats['successful']}")
print(f"Partial: {stats['partial']}")
print(f"Failed: {stats['failed']}")

# Save results
output_data = {
    'data': career_data,
    'stats': stats,
    'common_jobs': dict(sorted(all_civilian_jobs.items(), key=lambda x: x[1], reverse=True)[:50]),
    'common_skills': dict(sorted(all_skills.items(), key=lambda x: x[1], reverse=True)[:50])
}

with open('career-data-extraction-results.json', 'w', encoding='utf-8') as f:
    json.dump(output_data, f, indent=2)

print(f"\nResults saved to: career-data-extraction-results.json")
print("Ready for JavaScript file generation...")
