from datetime import datetime, timedelta
import os

# NEW SCHEDULE: Monday, November 25, 2025
start_date = datetime(2025, 11, 25)

# Get all state files in order
states = ['ak', 'al', 'ar', 'az', 'ca', 'co', 'ct', 'de', 'fl', 'ga',
          'hi', 'ia', 'id', 'il', 'in', 'ks', 'ky', 'la', 'ma', 'md',
          'me', 'mi', 'mn', 'mo', 'ms', 'mt', 'nc', 'nd', 'ne', 'nh',
          'nj', 'nm', 'nv', 'ny', 'oh', 'ok', 'or', 'pa', 'ri', 'sc',
          'sd', 'tn', 'tx', 'ut', 'va', 'vt', 'wa', 'wi', 'wv', 'wy']

file_types = ['best-cities-veterans-2025', 'veteran-healthcare-education-jobs', 'veteran-tax-benefits-2025']

print("=" * 80)
print("STATE VETERANS GUIDES PUBLISHING CALENDAR (UPDATED)")
print("=" * 80)
print(f"Total Posts: 151")
print(f"Schedule: 4 posts/week (Monday, Tuesday, Thursday, Friday)")
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

        # Move to next publishing day (Mon, Tue, Thu, Fri - skip Wed)
        if current_date.weekday() == 0:  # Monday -> Tuesday
            current_date += timedelta(days=1)
        elif current_date.weekday() == 1:  # Tuesday -> Thursday
            current_date += timedelta(days=2)
        elif current_date.weekday() == 3:  # Thursday -> Friday
            current_date += timedelta(days=1)
        elif current_date.weekday() == 4:  # Friday -> Monday
            current_date += timedelta(days=3)

        post_num += 1

# Add overview file
print(f"\n--- OVERVIEW POST ({post_num}) ---")
overview_file = 'best-states-for-veterans-2025.md'
day_name = current_date.strftime('%A')
date_str = current_date.strftime('%Y-%m-%d')
readable = current_date.strftime('%b %d, %Y')

print(f"  {post_num:3d}. {overview_file:50s} | {day_name:9s} {readable} ({date_str})")

file_date_map[overview_file] = date_str
post_num += 1

end_date = current_date
print("\n" + "=" * 80)
print(f"End Date: {end_date.strftime('%B %d, %Y (%A)')}")
weeks = ((end_date - start_date).days + 1) / 7
print(f"Duration: {weeks:.1f} weeks (~{int(weeks)} weeks)")
print(f"Total Posts Published: {post_num - 1}")
print("=" * 80)

# Save mapping to file for later use
with open('file-date-mapping-nov.txt', 'w') as f:
    for filename, date in file_date_map.items():
        f.write(f"{filename}|{date}\n")

print("\nDate mapping saved to file-date-mapping-nov.txt")
