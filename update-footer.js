const fs = require("fs");
const path = require("path");

const newFooter = `  <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__gridbox">
            <h3>Nova Health<br />芯凝物理治療及護理有限公司</h3>
            <p class="footer__tagline">專業．貼心．到戶</p>
          </div>

          <div class="footer__gridbox">
            <h4>聯絡資訊</h4>
            <address class="footer__contact">
              <ul class="footer__contact">

                <li class="footer__contact-item">
                  <i class="fas fa-phone"></i>
                  <a href="tel:+85254736204">+852 5473 6204</a>
                </li>
                <li class="footer__contact-item">
                  <i class="fas fa-envelope"></i>
                  <a href="mailto:info@novahealth.com.hk">info@novahealth.com.hk</a>
                </li>
              </ul>
            </address>
            <ul class="footer__social-links">
              <a href="#" class="footer__social-link" aria-label="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="footer__social-link" aria-label="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
            </ul>
            </div>
          </div>
        </div>

        <nav class="footer__nav">
          <a href="../footer/privacy-policy.html" class="footer__link"
            >隱私政策</a
          >
          <a href="../footer/terms-of-service.html" class="footer__link"
            >客戶服務條款</a
          >
          <a href="../footer/terms-of-use.html" class="footer__link"
            >使用條款</a
          >
          <a href="../footer/cookie-policy.html" class="footer__link"
            >Cookies 設定</a
          >
        </nav>
        <div class="footer__copyright">
          <p>&copy; 2026 Nova Health 芯凝物理治療及護理有限公司. 版權所有.</p>
        </div>
      </div>
    </footer>`;

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (path.extname(file) === ".html") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function updateFooter(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  const footerRegex = /<!--\s*Footer\s*-->[\s\S]*?<\/footer>/i;

  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, newFooter);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✓ 已更新: ${filePath}`);
    return true;
  } else {
    console.log(`✗ 找不到footer: ${filePath}`);
    return false;
  }
}

const rootDir = __dirname;
const htmlFiles = getAllHtmlFiles(rootDir);

console.log(`找到 ${htmlFiles.length} 個HTML檔案\n`);

let updatedCount = 0;
htmlFiles.forEach((file) => {
  if (updateFooter(file)) {
    updatedCount++;
  }
});

console.log(`\n完成！共更新了 ${updatedCount} 個檔案`);
