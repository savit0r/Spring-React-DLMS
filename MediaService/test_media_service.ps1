# Test Media Service
$BaseUrl = "http://localhost:8085/api/media"
$TestFileName = "test_media_file.txt"
$TestContent = "This is a test file for the DLMS Media Service."

# Create a dummy file
Set-Content -Path $TestFileName -Value $TestContent
Write-Host "Created test file: $TestFileName"

# 1. Test Upload (Admin Role)
Write-Host "`n1. Testing Upload (Admin Role)..."
$UploadUrl = "$BaseUrl/upload"
$Form = @{
    file = Get-Item $TestFileName
}

try {
    # We need to manually construct the multipart form data for Invoke-RestMethod in older PS or use specific params
    # Simplest way in modern PS (7+) is -Form, but strictly for compatibility and ease, let's use a curl-like approach or .NET objects if strictly needed.
    # However, standard Invoke-RestMethod -Form is available in PS 6+. Assuming user has decent PS or we use curl if installed.
    # Let's try curl (tar.exe/curl.exe usually available on Win10+) for reliability with multipart
    
    $Response = curl.exe -X POST -H "X-User-Role: ADMIN" -F "file=@$TestFileName" $UploadUrl
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nUpload Successful!"
        Write-Host "Response: $Response"
        
        # Parse JSON
        $Json = $Response | ConvertFrom-Json
        $MediaId = $Json.mediaId
        
        if ($MediaId) {
            Write-Host "Media ID received: $MediaId"
            
            # 2. Test Retrieval
            Write-Host "`n2. Testing Retrieval..."
            $GetUrl = "$BaseUrl/$MediaId"
            $GetResponse = Invoke-RestMethod -Uri $GetUrl -Method Get
            Write-Host "Retrieval Successful! Access URL: $GetResponse"
        } else {
            Write-Error "Failed to parse Media ID from response."
        }
    } else {
        Write-Error "Upload failed with exit code $LASTEXITCODE"
    }

} catch {
    Write-Error "An error occurred: $_"
}

# Cleanup
Remove-Item $TestFileName
Write-Host "`nTest Complete."
