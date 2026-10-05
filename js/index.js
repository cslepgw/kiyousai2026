const pic1 = `<div class="slide"><picture><source srcset="img/waidaibuilding.webp" type="image/webp"/><img src="img/waidaibuilding.jpg" alt=""/></picture></div>`
const pic2 = `<div class="slide"><picture><source srcset="img/helicopter.webp" type="image/webp"/><img src="img/helicopter.jpg" alt=""/></picture></div>`
const pic3 = `<div class="slide"><picture><source srcset="img/ougigashima.webp" type="image/webp"/><img src="img/.jpg"ougigashima alt=""/></picture></div>`
const slides = document.querySelector('#slides')
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
	window.addEventListener('scroll', (event) => {

		if( pageHeight - 1000 < window.scrollY ) {
			document.querySelector("#floatingBox").style.display = "none"
		}
	});
});

document.querySelector("#icon").addEventListener('click', () => {
	console.log("iroha")
})

document.querySelectorAll('.expBox').forEach((exp) => {
	observer.observe(exp)
})

slides.innerHTML = pic1 + pic2 + pic3 + pic1 + pic2 + pic3 + pic1 + pic2 + pic3

document.querySelectorAll('.slide').forEach((slide, i) => {
	slide.style.display = "block"
})

let pos = 0
let current = 0

function animate() {
	pos -= 2

	slides.style.transform = `translateX(${pos}px)`

	if (pos <= -960) {
		pos = 0
		if (current == 0) {
			slides.innerHTML = pic2 + pic3 + pic1 + pic2 + pic3 + pic1 + pic2 + pic3 + pic1
			current ++
		} else if(current == 1) {
			slides.innerHTML = pic3 + pic1 + pic2 + pic3 + pic1 + pic2 + pic3 + pic1 + pic2
			current ++
		} else {
			slides.innerHTML = pic1 + pic2 + pic3 + pic1 + pic2 + pic3 + pic1 + pic2 + pic3
			current = 0
		}
		slides.style.transform = `translateX(${pos}px)`
	}

	requestAnimationFrame(animate) // 次のフレームでまた実行
}

requestAnimationFrame(animate) // 最初の1回だけ呼び出す

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

window.addEventListener('load', function () {
	document.body.classList.add('is-loaded');
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
