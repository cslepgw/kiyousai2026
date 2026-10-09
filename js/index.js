const slides = document.querySelector('#slides')
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			// 画面内に入ったらvisibleクラスを付ける
			entry.target.classList.add('visible')
		}
	})
})

document.querySelector("#icon").addEventListener('click', () => {
	console.log("iroha")
})

document.querySelectorAll('.expBox').forEach((exp) => {
	observer.observe(exp)
})

// スライドショー
// 中身（index.html の .slide）を複製して2倍にし、CSSアニメーションで半分流したら先頭に戻る＝継ぎ目なくループする
const SLIDE_SPEED = 100 // 流れる速さ（px/秒）
const originalSlides = Array.from(slides.children)
let slideshowWidth = 0

function setupSlideshow() {
	const carouselWidth = slides.parentElement.offsetWidth
	if (carouselWidth === slideshowWidth) return
	slideshowWidth = carouselWidth

	slides.querySelectorAll('.slideClone').forEach(clone => clone.remove())
	const setWidth = slides.getBoundingClientRect().width
	if (setWidth === 0) return

	// 1周分が画面幅より短いと途切れるので、足りるまで繰り返してから2倍にする
	const repeat = Math.ceil(carouselWidth / setWidth)
	for (let i = 0; i < repeat * 2 - 1; i++) {
		originalSlides.forEach(slide => {
			const clone = slide.cloneNode(true)
			clone.classList.add('slideClone')
			clone.setAttribute('aria-hidden', 'true')
			slides.appendChild(clone)
		})
	}
	slides.style.setProperty('--slide-duration', `${setWidth * repeat / SLIDE_SPEED}s`)
}

setupSlideshow()
window.addEventListener('resize', setupSlideshow)


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


const START = new Date('2026-10-17T10:00:00+09:00')
const END = new Date('2026-10-17T20:00:00+09:00')

function updateCountdown() {
	const now = new Date()
	const label = document.querySelector('#countdownLabel')
	const time = document.querySelector('#countdownTime')

	if (now >= END) {
		label.textContent = '紀葉祭は終了しました。ご来場ありがとうございました!'
		time.style.display = 'none'
		clearInterval(timerId)
		return
	}
	if (now >= START) {
		label.textContent = '紀葉祭 開催中!'
		time.style.display = 'none'
		return
	}

	const diff = START - now
	const days = Math.floor(diff / 86400000)
	const hours = Math.floor(diff / 3600000) % 24
	const minutes = Math.floor(diff / 60000) % 60
	const seconds = Math.floor(diff / 1000) % 60

	document.querySelector('#cdDays').textContent = days
	document.querySelector('#cdHours').textContent = String(hours).padStart(2, '0')
	document.querySelector('#cdMinutes').textContent = String(minutes).padStart(2, '0')
	document.querySelector('#cdSeconds').textContent = String(seconds).padStart(2, '0')
}

const timerId = setInterval(updateCountdown, 1000)
updateCountdown()
