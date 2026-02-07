Get-ChildItem -Path src -Recurse -File | Where-Object { $_.Extension -in '.ts','.tsx','.js','.jsx','.css','.json','.txt' } | ForEach-Object {
    Write-Output "File: $($_.FullName)"
    Get-Content $_.FullName
    Write-Output ""
} | Out-File -FilePath all_code.txt
