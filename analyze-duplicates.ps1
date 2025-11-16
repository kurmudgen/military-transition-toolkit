# Load file lists
$appBlog = Get-Content 'C:\Users\Jacob\Documents\military-transition-app\app-blog-files.txt'
$marine = Get-Content 'C:\Users\Jacob\Documents\military-transition-app\marine-files.txt'
$navy = Get-Content 'C:\Users\Jacob\Documents\military-transition-app\navy-files.txt'
$blogPosts = Get-Content 'C:\Users\Jacob\Documents\military-transition-app\blog-posts-files.txt'
$inbox = Get-Content 'C:\Users\Jacob\Documents\military-transition-app\inbox-files.txt'

Write-Host "=== FILE COUNTS BY LOCATION ==="
Write-Host "App content/blog: $($appBlog.Count)"
Write-Host "Marine Corps MOS Guides: $($marine.Count)"
Write-Host "Navy Ratings Guides: $($navy.Count)"
Write-Host "Blog Posts folder: $($blogPosts.Count)"
Write-Host "INBOX: $($inbox.Count)"
Write-Host ""

# Find duplicates between app blog and Marine Corps
$appMarineDupes = $appBlog | Where-Object { $marine -contains $_ }
Write-Host "=== DUPLICATES: App Blog <-> Marine Corps ==="
Write-Host "Count: $($appMarineDupes.Count)"
if ($appMarineDupes.Count -gt 0) {
    $appMarineDupes | Select-Object -First 5 | ForEach-Object { Write-Host "  - $_" }
    if ($appMarineDupes.Count -gt 5) { Write-Host "  ... and $($appMarineDupes.Count - 5) more" }
}
Write-Host ""

# Find duplicates between app blog and Navy
$appNavyDupes = $appBlog | Where-Object { $navy -contains $_ }
Write-Host "=== DUPLICATES: App Blog <-> Navy ==="
Write-Host "Count: $($appNavyDupes.Count)"
if ($appNavyDupes.Count -gt 0) {
    $appNavyDupes | Select-Object -First 5 | ForEach-Object { Write-Host "  - $_" }
    if ($appNavyDupes.Count -gt 5) { Write-Host "  ... and $($appNavyDupes.Count - 5) more" }
}
Write-Host ""

# Find duplicates between app blog and Blog Posts
$appBlogPostsDupes = $appBlog | Where-Object { $blogPosts -contains $_ }
Write-Host "=== DUPLICATES: App Blog <-> Blog Posts Folder ==="
Write-Host "Count: $($appBlogPostsDupes.Count)"
if ($appBlogPostsDupes.Count -gt 0) {
    $appBlogPostsDupes | Select-Object -First 5 | ForEach-Object { Write-Host "  - $_" }
    if ($appBlogPostsDupes.Count -gt 5) { Write-Host "  ... and $($appBlogPostsDupes.Count - 5) more" }
}
Write-Host ""

# Find files in INBOX that match app blog
$appInboxDupes = $appBlog | Where-Object { $inbox -contains $_ }
Write-Host "=== DUPLICATES: App Blog <-> INBOX ==="
Write-Host "Count: $($appInboxDupes.Count)"
if ($appInboxDupes.Count -gt 0) {
    $appInboxDupes | Select-Object -First 5 | ForEach-Object { Write-Host "  - $_" }
    if ($appInboxDupes.Count -gt 5) { Write-Host "  ... and $($appInboxDupes.Count - 5) more" }
}
Write-Host ""

# Calculate totals
$allSFiles = @()
$allSFiles += $marine
$allSFiles += $navy
$allSFiles += $blogPosts
$allSFiles += $inbox
$uniqueSFiles = $allSFiles | Sort-Object -Unique

Write-Host "=== SUMMARY ==="
Write-Host "Total files in app blog: $($appBlog.Count)"
Write-Host "Total files in S: drive (all folders): $($allSFiles.Count)"
Write-Host "Unique files in S: drive: $($uniqueSFiles.Count)"
Write-Host "Duplicates within S: drive: $($allSFiles.Count - $uniqueSFiles.Count)"
Write-Host ""

# Check how many app blog files exist somewhere in S: drive
$appInS = $appBlog | Where-Object { $uniqueSFiles -contains $_ }
Write-Host "App blog files that exist in S: drive: $($appInS.Count)"
Write-Host "App blog files unique to app: $($appBlog.Count - $appInS.Count)"
