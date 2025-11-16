# Expanded search for more blog posts

$rootPath = "S:\Military-Toolkit-Content-Library\01-Blog-Posts"

Write-Host "=== EXPANDED SEARCH FOR MORE POSTS ===" -ForegroundColor Cyan
Write-Host ""

# More STATE GUIDES - search all State-Guides subfolders
Write-Host "STATE GUIDES (All types):" -ForegroundColor Yellow
$stateFiles = Get-ChildItem "$rootPath\State-Guides" -Recurse -File -Filter "*.md" | Where-Object { $_.Name -notmatch 'README' } | Select-Object -First 15
Write-Host "  Found $($stateFiles.Count) state guide files" -ForegroundColor White
$stateFiles | ForEach-Object { Write-Host "    - $($_.Name)" -ForegroundColor Gray }
Write-Host ""

# More CAREER GUIDES - include all branches
Write-Host "CAREER GUIDES (All branches):" -ForegroundColor Yellow
$careerFiles = Get-ChildItem "$rootPath\Career-Guides" -Recurse -File -Filter "*civilian-career-guide.md" | Select-Object -First 20
Write-Host "  Found $($careerFiles.Count) career guide files" -ForegroundColor White
$careerFiles | ForEach-Object { Write-Host "    - $($_.Name)" -ForegroundColor Gray }
Write-Host ""

# More HOW-TO GUIDES
Write-Host "HOW-TO GUIDES (All Additional-Posts):" -ForegroundColor Yellow
$howToFiles = Get-ChildItem "$rootPath\Additional-Posts\How-To-Guides" -File -Filter "how-to-*.md" -ErrorAction SilentlyContinue | Select-Object -First 10
Write-Host "  Found $($howToFiles.Count) how-to guide files" -ForegroundColor White
$howToFiles | ForEach-Object { Write-Host "    - $($_.Name)" -ForegroundColor Gray }
Write-Host ""

# CAREER TRANSITION GUIDES
Write-Host "CAREER TRANSITION GUIDES:" -ForegroundColor Yellow
$transitionFiles = Get-ChildItem "$rootPath\Additional-Posts\Career-Transition" -File -Filter "*.md" -ErrorAction SilentlyContinue
Write-Host "  Found $($transitionFiles.Count) career transition files" -ForegroundColor White
$transitionFiles | ForEach-Object { Write-Host "    - $($_.Name)" -ForegroundColor Gray }
Write-Host ""

# Write lists to files for reference
$stateFiles | Select-Object -ExpandProperty FullName | Out-File "S:\state-posts-available.txt"
$careerFiles | Select-Object -ExpandProperty FullName | Out-File "S:\career-posts-available.txt"
$howToFiles | Select-Object -ExpandProperty FullName | Out-File "S:\howto-posts-available.txt"

Write-Host "✅ Lists saved to S: drive" -ForegroundColor Green
