# Find and delete exact duplicate files in S: drive content library
$rootPath = "S:\Military-Toolkit-Content-Library"

Write-Host "=== SCANNING FOR DUPLICATE FILES ===" -ForegroundColor Cyan
Write-Host "Root Path: $rootPath`n"

# Priority for keeping files (higher number = higher priority to keep)
function Get-FolderPriority {
    param($path)

    $relativePath = $path.Replace($rootPath, "").TrimStart('\')

    # Organized folders have highest priority
    if ($relativePath -match "^0[1-9]-|^[1-9][0-9]-") {
        return 100
    }
    # INBOX has medium priority
    elseif ($relativePath -match "^00-INBOX") {
        return 50
    }
    # Archive has lowest priority
    elseif ($relativePath -match "^99-Archive") {
        return 10
    }
    # Unknown folders get medium-low priority
    else {
        return 40
    }
}

# Step 1: Scan all files and compute hashes
Write-Host "Step 1: Scanning all files..." -ForegroundColor Yellow
$allFiles = Get-ChildItem -Path $rootPath -File -Recurse -ErrorAction SilentlyContinue
Write-Host "Found $($allFiles.Count) total files`n"

# Step 2: Compute hash for each file
Write-Host "Step 2: Computing file hashes..." -ForegroundColor Yellow
$fileHashes = @{}
$processedCount = 0

foreach ($file in $allFiles) {
    $processedCount++
    if ($processedCount % 100 -eq 0) {
        Write-Host "  Processed $processedCount / $($allFiles.Count) files..." -ForegroundColor Gray
    }

    try {
        $hash = (Get-FileHash -Path $file.FullName -Algorithm SHA256).Hash

        if (-not $fileHashes.ContainsKey($hash)) {
            $fileHashes[$hash] = @()
        }

        $fileHashes[$hash] += @{
            Path = $file.FullName
            Name = $file.Name
            Size = $file.Length
            Directory = $file.DirectoryName
            Priority = Get-FolderPriority $file.DirectoryName
        }
    }
    catch {
        Write-Host "  Error processing $($file.FullName): $_" -ForegroundColor Red
    }
}

Write-Host "Completed hash computation`n"

# Step 3: Find duplicates (files with same hash)
Write-Host "Step 3: Identifying duplicates..." -ForegroundColor Yellow
$duplicateSets = $fileHashes.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }
$duplicateCount = ($duplicateSets | Measure-Object).Count

Write-Host "Found $duplicateCount sets of duplicate files`n"

if ($duplicateCount -eq 0) {
    Write-Host "No duplicates found. Exiting." -ForegroundColor Green
    exit
}

# Step 4: Delete duplicates
Write-Host "Step 4: Deleting duplicate files..." -ForegroundColor Yellow
$deletedFiles = @()
$totalSpaceSaved = 0

foreach ($duplicateSet in $duplicateSets) {
    $files = $duplicateSet.Value

    # Sort by priority (highest first) then by path length (shorter paths first)
    $sortedFiles = $files | Sort-Object -Property @{Expression={$_.Priority}; Descending=$true}, @{Expression={$_.Path.Length}; Ascending=$true}

    # Keep the first one (highest priority)
    $fileToKeep = $sortedFiles[0]

    # Delete all others
    for ($i = 1; $i -lt $sortedFiles.Count; $i++) {
        $fileToDelete = $sortedFiles[$i]

        try {
            Remove-Item -Path $fileToDelete.Path -Force

            $deletedFiles += [PSCustomObject]@{
                FileName = $fileToDelete.Name
                DeletedFrom = $fileToDelete.Path.Replace($rootPath, "S:")
                KeptIn = $fileToKeep.Path.Replace($rootPath, "S:")
                Size = $fileToDelete.Size
            }

            $totalSpaceSaved += $fileToDelete.Size

            Write-Host "  DELETED: $($fileToDelete.Name)" -ForegroundColor Red
            Write-Host "    From: $($fileToDelete.Directory.Replace($rootPath, 'S:'))" -ForegroundColor Gray
            Write-Host "    Kept: $($fileToKeep.Directory.Replace($rootPath, 'S:'))" -ForegroundColor Green
        }
        catch {
            Write-Host "  ERROR deleting $($fileToDelete.Path): $_" -ForegroundColor Red
        }
    }
}

# Step 5: Generate report
Write-Host "`n=== DEDUPLICATION COMPLETE ===" -ForegroundColor Green

Write-Host "`nSUMMARY:" -ForegroundColor Cyan
Write-Host "  Total files scanned: $($allFiles.Count)"
Write-Host "  Duplicate sets found: $duplicateCount"
Write-Host "  Files deleted: $($deletedFiles.Count)"
Write-Host "  Space saved: $([math]::Round($totalSpaceSaved / 1MB, 2)) MB"

# Count remaining files
$remainingFiles = (Get-ChildItem -Path $rootPath -File -Recurse -ErrorAction SilentlyContinue).Count
Write-Host "  Unique files remaining: $remainingFiles"

# Show breakdown by folder
Write-Host "`nDELETED FILES BREAKDOWN:" -ForegroundColor Cyan

$byFolder = $deletedFiles | Group-Object { Split-Path $_.DeletedFrom -Parent } | Sort-Object Count -Descending

foreach ($group in $byFolder) {
    Write-Host "  $($group.Name): $($group.Count) files deleted"
}

# Export detailed log
$logPath = "C:\Users\Jacob\Documents\military-transition-app\deduplication-log.csv"
$deletedFiles | Export-Csv -Path $logPath -NoTypeInformation
Write-Host "`nDetailed log saved to: $logPath" -ForegroundColor Green
