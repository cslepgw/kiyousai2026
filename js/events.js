const floatingBox = document.querySelector("#floatingBox")
const btn = document.getElementById('hamburgerBtn');
const overlay = document.getElementById('menuOverlay');
let contentsHeight = 0
let pageHeight = 0

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			// 画面内に入ったらvisibleクラスを付ける
			entry.target.classList.add('visible')
		}
	})
})

window.addEventListener('load', (event) => {
	pageHeight = document.documentElement.scrollHeight
	contentsHeight = document.querySelector("#contents").getBoundingClientRect().height;
	window.addEventListener('scroll', (event) => {

		if( contentsHeight-530 < window.scrollY ) {
			floatingBox.style.opacity = 0
		} else {
			floatingBox.style.opacity = 1
		}
	});
});

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

window.addEventListener('load', function () {
	document.body.classList.add('is-loaded');
});