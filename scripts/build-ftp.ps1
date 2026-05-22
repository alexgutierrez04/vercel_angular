# Genera la carpeta lista para subir por FTP a InfinityFree (htdocs)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "Compilando Angular en modo produccion..."
npx ng build --configuration=production

$origen = Join-Path $root "dist\practica_alternancia_angular\browser"
$destino = Join-Path $root "deploy\htdocs"

if (-not (Test-Path $origen)) {
  throw "No se encontro la carpeta de build: $origen"
}

if (Test-Path $destino) {
  Remove-Item $destino -Recurse -Force
}

New-Item -ItemType Directory -Path $destino -Force | Out-Null
Copy-Item -Path (Join-Path $origen "*") -Destination $destino -Recurse -Force
Copy-Item -Path (Join-Path $root "deploy\.htaccess") -Destination $destino -Force

Write-Host ""
Write-Host "Carpeta FTP generada en: $destino"
Write-Host "Sube TODO el contenido de deploy\htdocs a la carpeta htdocs de InfinityFree."
