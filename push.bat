@echo off
setlocal enabledelayedexpansion
title Push FPDB to GitHub

echo ========================================================
echo        AUTO PUSH TO GITHUB - MODENA FPDB PORTAL
echo        Repo: https://github.com/yodakuyy/fpdb-new.git
echo ========================================================
echo.

:: 1. Tampilkan status perubahan
echo [1/4] Mengecek perubahan file...
git status -s
echo.

:: Cek apakah ada perubahan
git status --porcelain > "%temp%\git_status.tmp"
for %%A in ("%temp%\git_status.tmp") do if %%~zA==0 (
    echo [INFO] Tidak ada perubahan file yang perlu di-commit.
    del "%temp%\git_status.tmp"
    echo.
    echo Ingin tetap melakukan git push? (Y/N)
    set /p PUSH_ANYWAY=Pilihan [N]: 
    if /i "!PUSH_ANYWAY!"=="Y" (
        goto do_push
    ) else (
        echo Selesai.
        pause
        exit /b 0
    )
)
del "%temp%\git_status.tmp"

:: 2. Input pesan commit
set "COMMIT_MSG="
set /p COMMIT_MSG="[2/4] Masukkan pesan commit (Tekan Enter utk default: 'update code'): "

if "!COMMIT_MSG!"=="" (
    set "COMMIT_MSG=update code: %date% %time%"
)

echo.
echo [3/4] Melakukan git add ^& commit...
git add .
git commit -m "!COMMIT_MSG!"
if %errorlevel% neq 0 (
    echo [WARNING] Commit gagal atau tidak ada perubahan baru.
)

:do_push
echo.
echo [4/4] Mengunggah (git push) ke GitHub (branch: main)...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo    [SUKSES] Perubahan berhasil di-push ke GitHub!
    echo    URL: https://github.com/yodakuyy/fpdb-new
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo    [GAGAL] Terjadi kesalahan saat git push.
    echo    Pastikan koneksi internet aktif dan akses repo benar.
    echo ========================================================
)

echo.
pause
