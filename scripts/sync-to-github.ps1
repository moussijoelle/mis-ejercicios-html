param(
    [ValidateSet('updates', 'monorepo')]
    [string]$Mode = 'updates'
)

$git = "C:\Program Files\Git\cmd\git.exe"
$owner = "moussijoelle"
$localRoot = Split-Path $PSScriptRoot -Parent

$updates = @(
    @{ Repo = 'cssflex'; Local = 'cssflex' },
    @{ Repo = 'cv-joelle'; Local = 'cv' },
    @{ Repo = 'cv-joelle-tailwind'; Local = 'cv tailwind vrai' },
    @{ Repo = 'fabulas'; Local = 'la fabula' },
    @{ Repo = 'lista-de-compras'; Local = '6.2. Lista de Compras' },
    @{ Repo = 'mes-de-numero-a-letra'; Local = '6.1. Mes de número a letra' },
    @{ Repo = 'tamagotchi'; Local = 'Tamagotchi' },
    @{ Repo = 'Gastos-de-la-casa-'; Local = 'lista de compra' },
    @{ Repo = 'Dado'; Local = 'dado' },
    @{ Repo = 'determinar-numero-mayor'; Local = 'Determinar número mayor' },
    @{ Repo = 'convertir-numeros-a-lettra'; Local = 'convertir números  a letras' },
    @{ Repo = 'Exercicio-1-JavaScript'; Local = 'JavaScript1' },
    @{ Repo = 'nivel-de-experiencia'; Local = 'Nivel de experiencia' },
    @{ Repo = 'piedra-papel-tijera'; Local = 'Juguemos Piedra, papel o tijera' },
    @{ Repo = 'restaurante'; Local = 'restaurante' },
    @{ Repo = 'Verificar-n-mero-del-DNI'; Local = '8.2. Verificar número del DNI' },
    @{ Repo = 'ejecutar-operaci-n-selecionado'; Local = 'Ejecutar operación seleccionada' },
    @{ Repo = '-Practicar-arrays'; Local = 'praticar  arrays' }
)

function Copy-LocalIntoClone($localDir, $cloneDir) {
    Get-ChildItem $localDir -Recurse -File | ForEach-Object {
        $rel = $_.FullName.Substring($localDir.Length).TrimStart('\')
        $dest = Join-Path $cloneDir $rel
        $destDir = Split-Path $dest -Parent
        if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
        if (-not (Test-Path $dest) -or ((Get-FileHash $dest).Hash -ne (Get-FileHash $_.FullName).Hash)) {
            Copy-Item $_.FullName $dest -Force
        }
    }
}

foreach ($item in $updates) {
    $localPath = Join-Path $localRoot $item.Local
    if (-not (Test-Path $localPath)) {
        Write-Warning "Omitido (no existe): $($item.Local)"
        continue
    }
    $work = Join-Path $env:TEMP "sync-$($item.Repo)"
    if (Test-Path $work) { Remove-Item $work -Recurse -Force }
    & $git clone "https://github.com/$owner/$($item.Repo).git" $work 2>&1 | Out-Null
    if (-not (Test-Path $work)) {
        Write-Warning "No se pudo clonar: $($item.Repo)"
        continue
    }
    Copy-LocalIntoClone $localPath $work
    Push-Location $work
    & $git add -A
    $status = & $git status --porcelain
    if ($status) {
        & $git commit -m "Sincronizar archivos nuevos o actualizados desde carpeta local"
        & $git push origin main
        Write-Host "OK $($item.Repo)"
    } else {
        Write-Host "Sin cambios: $($item.Repo)"
    }
    Pop-Location
}
