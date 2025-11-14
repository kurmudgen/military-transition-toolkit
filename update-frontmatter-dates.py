import os
import re

# Read the file-date mapping
date_mapping = {}
with open('file-date-mapping-nov.txt', 'r') as f:
    for line in f:
        filename, date = line.strip().split('|')
        date_mapping[filename] = date

print(f"Loaded {len(date_mapping)} file-date mappings")

# Directory containing blog posts
blog_dir = 'src/content/blog'

# Track updates
updated_count = 0
skipped_count = 0
error_count = 0

# Update each file
for filename, new_date in date_mapping.items():
    filepath = os.path.join(blog_dir, filename)

    if not os.path.exists(filepath):
        print(f"SKIP: {filename} (file not found)")
        skipped_count += 1
        continue

    try:
        # Read the file
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update the date in frontmatter
        # Pattern: date: "2025-01-10" or date: ""
        updated_content = re.sub(
            r'date:\s*"[0-9]{4}-[0-9]{2}-[0-9]{2}"',
            f'date: "{new_date}"',
            content
        )
        # Also handle empty dates: date: ""
        updated_content = re.sub(
            r'date:\s*""',
            f'date: "{new_date}"',
            updated_content
        )

        # Write back to file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated_content)

        print(f"UPDATE: {filename} -> {new_date}")
        updated_count += 1

    except Exception as e:
        print(f"ERROR: {filename} - {str(e)}")
        error_count += 1

print("\n" + "=" * 60)
print(f"SUMMARY:")
print(f"  Updated: {updated_count}")
print(f"  Skipped: {skipped_count}")
print(f"  Errors:  {error_count}")
print("=" * 60)
