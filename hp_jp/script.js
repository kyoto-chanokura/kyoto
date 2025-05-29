// ヘッダーの高さ分だけメインコンテンツの上部余白を設定する関数
function adjustMainPadding() {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  if (header && main) {
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = headerHeight + 'px';
  }
}

// debounce関数：指定時間内に何度も呼ばれても、最後の1回だけ実行されるようにする
// 主にresizeイベントなどの高頻度なイベントの負荷軽減に使う
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 指定したIDの要素に、指定URLから取得したHTMLを挿入する関数
// 挿入成功後にコールバック関数を実行できる
function loadHTML(selectorId, url, label, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById(selectorId);
      // コールバック関数が指定されていれば実行
      if (container) {
        container.innerHTML = data;
        if (typeof callback === 'function') {
          callback();
        }
      } else {
        // 要素が見つからなかった場合の警告
        console.warn(`${label}の挿入先が見つかりません: #${selectorId}`);
      }
    })
    .catch(error => {
      // 通信エラーなどの際にエラーを出力
      console.error(`${label}の読み込みに失敗しました:`, error);
    });
}

// DOMの読み込み完了時に、ヘッダーとフッターを読み込む
// ヘッダー読み込み後に adjustMainPadding を実行
document.addEventListener('DOMContentLoaded', () => {
  loadHTML('headerContainer', 'header.html?v=1.0', 'ヘッダー', adjustMainPadding);
  loadHTML('footer-placeholder', 'footer.html?v=1.0', 'フッター');
});

// ウィンドウリサイズ時に、adjustMainPaddingを実行（100ms以内に連続実行されないよう制限）
window.addEventListener('resize', debounce(adjustMainPadding, 100));

// DOMの読み込み完了時に、bodyタグにもヘッダー分の余白を追加する処理
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