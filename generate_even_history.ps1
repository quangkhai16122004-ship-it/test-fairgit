# Generate a simulated git history for fairgit testing.
# Each contributor gets a predictable set of weekly commits so consistency scores reflect spread over time.

$authors = @(
    @{Email = "khoa.tran@capstonehub.dev"; Name = "Tran Minh Khoa"; Weeks = @(1..13); CommitsPerWeek = 1 },
    @{Email = "lananh.nguyen@capstonehub.dev"; Name = "Nguyen Lan Anh"; Weeks = @(1..12); CommitsPerWeek = 1 },
    @{Email = "huy.le@capstonehub.dev"; Name = "Le Quang Huy"; Weeks = @(1..11); CommitsPerWeek = 1 },
    @{Email = "bao.pham@capstonehub.dev"; Name = "Pham Gia Bao"; Weeks = @(2..11); CommitsPerWeek = 1 },
    @{Email = "mai.do@capstonehub.dev"; Name = "Do Thu Mai"; Weeks = @(3..11); CommitsPerWeek = 1 },
    @{Email = "dat.vu@capstonehub.dev"; Name = "Vu Tien Dat"; Weeks = @(4..10); CommitsPerWeek = 1 },
    @{Email = "linh.hoang@capstonehub.dev"; Name = "Hoang Nhat Linh"; Weeks = @(12..13); CommitsPerWeek = 1 }
)

$baseDate = Get-Date "2026-01-01T09:00:00"

function Set-GitAuthor([string]$name, [string]$email) {
    $env:GIT_AUTHOR_NAME = $name
    $env:GIT_AUTHOR_EMAIL = $email
    $env:GIT_COMMITTER_NAME = $name
    $env:GIT_COMMITTER_EMAIL = $email
}

Write-Host "Resetting repo to root commit..."
git reset --hard 4f84af55be351da42f6c63562a0d1cd55ee2c4c8

foreach ($author in $authors) {
    foreach ($week in $author.Weeks) {
        for ($commitIndex = 1; $commitIndex -le $author.CommitsPerWeek; $commitIndex++) {
            $commitDate = $baseDate.AddDays(($week - 1) * 7 + ($commitIndex - 1)).AddHours($commitIndex)
            $dateArg = $commitDate.ToString('yyyy-MM-ddTHH:mm:ss')
            Set-GitAuthor $author.Name $author.Email
            git commit --allow-empty -m "Simulated commit by $($author.Name) for week $week" --date="$dateArg"
            Write-Host "Committed $($author.Email) on week $week at $dateArg"
        }
    }
}

Write-Host "Done. Generated simulated history with evenly spread weekly commits."