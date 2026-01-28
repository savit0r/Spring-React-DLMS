# E2E Test: Admin Login -> Upload Media

$GatewayUrl = "http://localhost:8080"
$AuthUrl = "$GatewayUrl/api/auth/login"
$UploadUrl = "$GatewayUrl/api/media/upload"
$TestFile = "e2e_test_file.txt"

# Create dummy file
Set-Content -Path $TestFile -Value "E2E Test Content for IPFS"

# 0. Registration (Create a fresh Admin user to ensure credentials exist)
$RegisterUrl = "$GatewayUrl/api/auth/newUser"
Write-Host "0. Registering new Admin User (admin_test)..."
$RegisterPayload = @{
    userName = "admin_test"
    password = "password123"
    role = "ADMIN"
    email = "admin@test.com"
    mobileNo = "1234567890"
} | ConvertTo-Json

try {
    # Direct to Auth Service first to be sure, or Gateway. Let's try Gateway.
    # Gateway Route for auth is /api/auth/** -> 2000
    $RegResponse = Invoke-RestMethod -Uri $RegisterUrl -Method Post -Body $RegisterPayload -ContentType "application/json"
    Write-Host "Registration Response: $RegResponse"
} catch {
    Write-Host "Registration Failed (User might already exist): $_"
}

# 1. Login via Gateway
Write-Host "`n1. Logging in as Admin (admin_test) via Gateway..."
$LoginPayload = @{
    userName = "admin_test"
    password = "password123"
} | ConvertTo-Json


try {
    $LoginResponse = Invoke-RestMethod -Uri $AuthUrl -Method Post -Body $LoginPayload -ContentType "application/json"
    $Token = $LoginResponse.token
    Write-Host "Login Successful! Token received."
} catch {
    Write-Error "Login Failed: $_"
    exit 1
}

# 2. Upload
Write-Host "`n2. Uploading File via Gateway..."
try {
    # Using curl for multipart because Invoke-RestMethod multipart is tricky in older PS versions
    $Response = curl.exe -X POST -H "Authorization: Bearer $Token" -F "file=@$TestFile" $UploadUrl
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nUpload Successful!"
        Write-Host "Response: $Response"
    } else {
        Write-Error "Upload Failed with exit code $LASTEXITCODE"
    }
} catch {
    Write-Error "Upload Request Failed: $_"
}

# Cleanup
Remove-Item $TestFile
Write-Host "`nE2E Test Complete."
