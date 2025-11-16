# Search for blog posts matching 7-day deployment criteria

$rootPath = "S:\Military-Toolkit-Content-Library\01-Blog-Posts"

Write-Host "=== SEARCHING FOR 7-DAY DEPLOYMENT POSTS ===" -ForegroundColor Cyan
Write-Host ""

# STATE GUIDES
Write-Host "STATE BENEFITS GUIDES:" -ForegroundColor Yellow
$statePosts = @()
$states = @('texas', 'california', 'virginia', 'north-carolina', 'georgia', 'arizona', 'washington')
foreach ($state in $states) {
    $found = Get-ChildItem "$rootPath\State-Guides\State-Benefits" -File -Filter "*$state*.md" -ErrorAction SilentlyContinue
    if ($found) {
        $statePosts += $found[0]
        Write-Host "  ✅ $($found[0].Name)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $state - not found" -ForegroundColor Red
    }
}
Write-Host ""

# VA DISABILITY GUIDES
Write-Host "VA DISABILITY GUIDES:" -ForegroundColor Yellow
$vaPosts = @()
$conditions = @('ptsd', 'tinnitus', 'sleep-apnea', 'back', 'shoulder', 'migraine', 'hypertension')
foreach ($condition in $conditions) {
    $found = Get-ChildItem "$rootPath\VA-Disability-Guides" -Recurse -File -Filter "*$condition*.md" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $vaPosts += $found
        Write-Host "  ✅ $($found.Name)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $condition - not found" -ForegroundColor Red
    }
}
Write-Host ""

# ARMY CAREER GUIDES
Write-Host "ARMY MOS CAREER GUIDES:" -ForegroundColor Yellow
$armyPosts = @()
$mos = @('11b', '68w', '35f', '92y', '31b', '25u', '13b', '15t')
foreach ($m in $mos) {
    $found = Get-ChildItem "$rootPath\Career-Guides\Army-MOS" -File -Filter "*$m*.md" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $armyPosts += $found
        Write-Host "  ✅ $($found.Name)" -ForegroundColor Green
    }
}
Write-Host ""

# NAVY CAREER GUIDES
Write-Host "NAVY RATING CAREER GUIDES:" -ForegroundColor Yellow
$navyPosts = @()
$ratings = @('hm', 'it', 'ctn', 'ma', 'yn', 'ls')
foreach ($r in $ratings) {
    $found = Get-ChildItem "$rootPath\Career-Guides\Navy-Ratings" -File -Filter "$r-*.md" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $navyPosts += $found
        Write-Host "  ✅ $($found.Name)" -ForegroundColor Green
    }
}
Write-Host ""

# MARINES CAREER GUIDES
Write-Host "MARINE MOS CAREER GUIDES:" -ForegroundColor Yellow
$marinePosts = @()
$marineMos = @('0311', '0621', '6073')
foreach ($m in $marineMos) {
    $found = Get-ChildItem "$rootPath\Career-Guides\Marines-MOS" -File -Filter "$m*.md" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $marinePosts += $found
        Write-Host "  ✅ $($found.Name)" -ForegroundColor Green
    }
}
Write-Host ""

# HOW-TO GUIDES
Write-Host "HOW-TO / ADDITIONAL GUIDES:" -ForegroundColor Yellow
$howToPosts = @()
$topics = @('resume', 'linkedin', 'salary', 'interview', 'network')
foreach ($topic in $topics) {
    $found = Get-ChildItem "$rootPath\Additional-Posts" -Recurse -File -Filter "*$topic*.md" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $howToPosts += $found
        Write-Host "  ✅ $($found.Name)" -ForegroundColor Green
    }
}
Write-Host ""

Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "State guides found: $($statePosts.Count)" -ForegroundColor White
Write-Host "VA guides found: $($vaPosts.Count)" -ForegroundColor White
Write-Host "Army MOS found: $($armyPosts.Count)" -ForegroundColor White
Write-Host "Navy ratings found: $($navyPosts.Count)" -ForegroundColor White
Write-Host "Marine MOS found: $($marinePosts.Count)" -ForegroundColor White
Write-Host "How-To guides found: $($howToPosts.Count)" -ForegroundColor White
Write-Host ""

$totalCareer = $armyPosts.Count + $navyPosts.Count + $marinePosts.Count
Write-Host "Total career guides: $totalCareer" -ForegroundColor Yellow
Write-Host "Need for 6 days: 30 posts (6 states, 6 VA, 12 career, 6 how-to)" -ForegroundColor Yellow
