# Noto Serif TC 字體子集生成腳本
# 使用 fonttools 的 pyftsubset 工具生成優化的字體子集

# 檢查是否安裝 fonttools
Write-Host "檢查 fonttools 是否已安裝..." -ForegroundColor Cyan

try {
    $null = python -m pip show fonttools
    Write-Host "✓ fonttools 已安裝" -ForegroundColor Green
} catch {
    Write-Host "✗ fonttools 未安裝，正在安裝..." -ForegroundColor Yellow
    python -m pip install fonttools brotli
}

# 需要包含的字符
$characters = "心凝物理治療及護堅持「專科配」醫對口"

# 源字體文件
$sourceFont = "NotoSerifTC-SemiBold.woff2"

# 輸出字體文件
$outputFont = "NotoSerifTC-SemiBold-Subset.woff2"

# 檢查源字體是否存在
if (-not (Test-Path $sourceFont)) {
    Write-Host "✗ 錯誤：找不到源字體文件 $sourceFont" -ForegroundColor Red
    exit 1
}

Write-Host "`n生成字體子集..." -ForegroundColor Cyan
Write-Host "源字體：$sourceFont" -ForegroundColor Gray
Write-Host "輸出字體：$outputFont" -ForegroundColor Gray
Write-Host "字符數：$($characters.Length)" -ForegroundColor Gray

# 執行 pyftsubset
try {
    python -m fontTools.subset $sourceFont `
        --text="$characters" `
        --output-file="$outputFont" `
        --flavor=woff2 `
        --layout-features="*" `
        --desubroutinize

    if (Test-Path $outputFont) {
        $originalSize = (Get-Item $sourceFont).Length
        $subsetSize = (Get-Item $outputFont).Length
        $reduction = [math]::Round((1 - $subsetSize / $originalSize) * 100, 2)

        Write-Host "`n✓ 字體子集生成成功！" -ForegroundColor Green
        Write-Host "原始大小：$([math]::Round($originalSize / 1KB, 2)) KB" -ForegroundColor Gray
        Write-Host "子集大小：$([math]::Round($subsetSize / 1KB, 2)) KB" -ForegroundColor Gray
        Write-Host "減少：$reduction%" -ForegroundColor Green
        
        Write-Host "`n接下來的步驟：" -ForegroundColor Cyan
        Write-Host "1. 更新 css/fonts.css 以使用 $outputFont" -ForegroundColor Yellow
        Write-Host "2. 測試網站以確保字體正常顯示" -ForegroundColor Yellow
    } else {
        Write-Host "✗ 生成失敗" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ 錯誤：$_" -ForegroundColor Red
    exit 1
}
