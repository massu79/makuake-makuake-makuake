@echo off
setlocal

set "PYTHON_EXE=python"
set "USING_BUNDLED_PYTHON=0"
python --version >nul 2>&1
if errorlevel 1 (
  set "PYTHON_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
  set "USING_BUNDLED_PYTHON=1"
)

if "%USING_BUNDLED_PYTHON%"=="1" if not exist "%PYTHON_EXE%" (
  echo Python was not found. You can also open index.html with VS Code Live Server.
  exit /b 1
)

echo Preview: http://127.0.0.1:4173/
echo Press Ctrl+C to stop.
"%PYTHON_EXE%" -m http.server 4173 --bind 127.0.0.1
