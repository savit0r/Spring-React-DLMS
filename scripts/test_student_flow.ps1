# E2E Test: Student Login -> Download Media

$GatewayUrl = "http://localhost:8080"
$MediaId = "697a4519843bea5c8cf358ee" # ID from previous Admin upload
$OutputFile = "student_download_test.txt"

# 0. Ensure Student Exists (Registration Attempt)
Write-Host "0. checking/registering Student user..."
$RegisterPayload = @{
    userName = "student"
    password = "student123"
    role = "STUDENT"
    email = "student@test.com"
    mobileNo = "0987654321"
} | ConvertTo-Json

try {
    $RegResponse = Invoke-RestMethod -Uri "$GatewayUrl/api/auth/newUser" -Method Post -Body $RegisterPayload -ContentType "application/json"
    Write-Host "Registration: $RegResponse"
} catch {
    Write-Host "Registration note: User likely already exists."
}

# 1. Login
Write-Host "`n1. Logging in as Student..."
$LoginPayload = @{
    userName = "student"
    password = "student123"
} | ConvertTo-Json

try {
    $LoginResponse = Invoke-RestMethod -Uri "$GatewayUrl/api/auth/login" -Method Post -Body $LoginPayload -ContentType "application/json"
    $Token = $LoginResponse.token
    Write-Host "Login Successful! Token received."
} catch {
    Write-Error "Login Failed: $_"
    exit 1
}

# 2. Get Media URL
Write-Host "`n2. Fetching Media URL for ID: $MediaId..."
try {
    # GET /api/media/{id}
    $MediaUrl = Invoke-RestMethod -Uri "$GatewayUrl/api/media/$MediaId" -Method Get -Headers @{ "Authorization" = "Bearer $Token" }
    Write-Host "Media URL Received: $MediaUrl"
} catch {
    Write-Error "Failed to fetch Media URL: $_"
    exit 1
}

# 3. Download/Verify Content
Write-Host "`n3. Verifying Content Access via IPFS Gateway..."
try {
    Invoke-WebRequest -Uri $MediaUrl -OutFile $OutputFile
    $Content = Get-Content $OutputFile
    Write-Host "Content Downloaded Successfully!"
    Write-Host "Parameters Checked:"
    Write-Host " - Auth Role 'STUDENT' Allowed? YES"
    Write-Host " - IPFS Gateway Reachable? YES"
    Write-Host "`nFile Content Preview: $Content"
} catch {
    Write-Error "Failed to download content: $_"
}

# Cleanup
Remove-Item $OutputFile
