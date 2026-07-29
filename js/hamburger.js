const btn = document.getElementById('hamburgerBtn');
const overlay = document.getElementById('menuOverlay');

btn.addEventListener('click', () => {
	const isOpen = btn.classList.toggle('active');
	overlay.classList.toggle('active');
	btn.setAttribute('aria-expanded', isOpen);
	btn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
	document.body.style.overflow = isOpen ? 'hidden' : '';
});

// メニュー内のリンクをクリックしたら閉じる
overlay.querySelectorAll('a').forEach(link => {
	link.addEventListener('click', () => {
		btn.classList.remove('active');
		overlay.classList.remove('active');
		btn.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = '';
	});
});