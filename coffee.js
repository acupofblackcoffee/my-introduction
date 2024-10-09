
// ページの読み込みが完了したら実行
window.addEventListener('load', function() {
    // ローディング表示を遅延させてから非表示にする（デモ用に3秒後）
    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 3000);
});
