$ErrorActionPreference = "Stop"

$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
$pythonPath = if ($pythonCommand) { $pythonCommand.Source } else { $null }
if (-not $pythonPath) {
    $bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
    if (Test-Path $bundledPython) {
        $pythonPath = $bundledPython
    }
}

if (-not $pythonPath) {
    throw "Python was not found. You can also open index.html with VS Code Live Server."
}

Write-Host "Preview: http://127.0.0.1:4173/" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop."
& $pythonPath -m http.server 4173 --bind 127.0.0.1
