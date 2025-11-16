from datetime import datetime, timedelta
import os

# Starting date: Monday, January 5, 2026 (Jan 6 is Tuesday, so use Jan 5)
start_date = datetime(2026, 1, 5)

# Get all state files in order
states = ['ak', 'al', 'ar', 'az', 'ca', 'co', 'ct', 'de', 'fl', 'ga',
          'hi', 'ia', 'id', 'il', 'in', 'ks', 'ky', 'la', 'ma', 'md',
          'me', 'mi', 'mn', 'mo', 'ms', 'mt', 'nc', 'nd', 'ne', 'nh',
          'nj', 'nm', 'nv', 'ny', 'oh', 'ok', 'or', 'pa', 'ri', 'sc',
          'sd', 'tn', 'tx', 'ut', 'va', 'vt', 'wa', 'wi', 'wv', 'wy']

file_types = ['best-cities-veterans-2025', 'veteran-healthcare-education-jobs', 'veteran-tax-benefits-2025']

print("=" * 80)
print("STATE VETERANS GUIDES PUBLISHING CALENDAR")
print("=" * 80)
print(f"Total Posts: 152")
print(f"Schedule: Monday, Wednesday, Friday")
print(f"Start Date: {start_date.strftime('%B %d, %Y (%A)')}")
print("=" * 80)
print()

# Generate calendar
current_date = start_date
post_num = 1
file_date_map = {}

for state in states:
    state_upper = state.upper()
    print(f"\n--- {state_upper} ({post_num}-{post_num+2}) ---")

    for file_type in file_types:
        filename = f"{state}-{file_type}.md"
        day_name = current_date.strftime('%A')
        date_str = current_date.strftime('%Y-%m-%d')
        readable = current_date.strftime('%b %d, %Y')

        if 'best-cities' in file_type:
            guide_type = "Best Cities"
        elif 'healthcare' in file_type:
            guide_type = "Healthcare/Education/Jobs"
        else:
            guide_type = "Tax Benefits"

        print(f"  {post_num:3d}. {filename:50s} | {day_name:9s} {readable} ({date_str})")

        # Store mapping
        file_date_map[filename] = date_str

        # Move to next publishing day (Mon, Wed, Fri)
        if current_date.weekday() == 0:  # Monday -> Wednesday
            current_date += timedelta(days=2)
        elif current_date.weekday() == 2:  # Wednesday -> Friday
            current_date += timedelta(days=2)
        elif current_date.weekday() == 4:  # Friday -> Monday
            current_date += timedelta(days=3)

        post_num += 1

# Add overview files
print(f"\n--- OVERVIEW POSTS ({post_num}-{post_num+1}) ---")
overview_files = ['best-states-for-veterans-2025.md', 'best-states-military-retirees.md']
for overview in overview_files:
    day_name = current_date.strftime('%A')
    date_str = current_date.strftime('%Y-%m-%d')
    readable = current_date.strftime('%b %d, %Y')

    print(f"  {post_num:3d}. {overview:50s} | {day_name:9s} {readable} ({date_str})")

    file_date_map[overview] = date_str

    if current_date.weekday() == 0:
        current_date += timedelta(days=2)
    elif current_date.weekday() == 2:
        current_date += timedelta(days=2)
    elif current_date.weekday() == 4:
        current_date += timedelta(days=3)

    post_num += 1

end_date = current_date - timedelta(days=3 if current_date.weekday() == 0 else 2)
print("\n" + "=" * 80)
print(f"End Date: {end_date.strftime('%B %d, %Y')}")
print(f"Duration: {(end_date - start_date).days // 7} weeks")
print("=" * 80)

# Save mapping to file for later use
with open('file-date-mapping.txt', 'w') as f:
    for filename, date in file_date_map.items():
        f.write(f"{filename}|{date}\n")

print("\nDate mapping saved to file-date-mapping.txt")
