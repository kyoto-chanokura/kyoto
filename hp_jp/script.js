function adjustMainPadding() {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  if (header && main) {
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = headerHeight + 'px';
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function loadHTML(selectorId, url, label, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById(selectorId);
      if (container) {
        container.innerHTML = data;
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        console.warn(`${label}の挿入先が見つかりません: #${selectorId}`);
      }
    })
    .catch(error => {
      console.error(`${label}の読み込みに失敗しました:`, error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadHTML('headerContainer', 'header.html?v=1.0', 'ヘッダー', adjustMainPadding);
  loadHTML('footer-placeholder', 'footer.html?v=1.0', 'フッター');
});

window.addEventListener('resize', debounce(adjustMainPadding, 100));

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) {
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = `${headerHeight}px`;
  }
});

// スクロール時にヘッダーも少しスクロールさせる
window.addEventListener('scroll', function() {
  const logo = document.getElementById('main-image');
  const header = document.querySelector('header');
  if (!logo || !header) return;

  if (window.scrollY > 80) {
    logo.style.transform = 'scale(0.8)';
    logo.style.transition = 'transform 0.3s ease';
    header.style.transform = 'translateY(-40px)';
    header.style.transition = 'transform 0.3s ease';
  } else {
    logo.style.transform = 'scale(1)';
    header.style.transform = 'translateY(0)';
  }
});