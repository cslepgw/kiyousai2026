// ===== カルーセル =====
// 画像を追加するときはこの配列に1行足すだけ（img/ に name.webp と name.ext を置く）
const IMAGES = [
	{ name: 'waidaibuilding', ext: 'jpg' },
	{ name: 'helicopter', ext: 'jpg' },
	{ name: 'ougigashima', ext: 'jpg' },
	{ name: 'IMG_0932', ext: 'JPG' },
	{ name: 'IMG_0938', ext: 'JPG' },
	{ name: 'IMG_1504', ext: 'JPG' },
	{ name: 'IMG_1508', ext: 'JPG' },
]
const SPEED = 60 // px/秒（フレームレートに依存しない）

const slides = document.querySelector('#slides')
const carousel = document.querySelector('.carousel')

function createSlide({ name, ext }, index) {
	const slide = document.createElement('div')
	slide.className = 'slide'
	slide.style.display = 'block'

	const picture = document.createElement('picture')
	const source = document.createElement('source')
	source.srcset = `img/${name}.webp`
	source.type = 'image/webp'

	const img = document.createElement('img')
	img.src = `img/${name}.${ext}`
	img.alt = ''
	img.decoding = 'async'
	img.loading = index < 3 ? 'eager' : 'lazy'

	picture.append(source, img)
	slide.append(picture)
	return slide
}

let setCount = 0

// 1セットの幅（1周ぶんの距離）。余白があっても崩れないよう位置の差で測る
function getSetWidth() {
	const all = slides.children
	if (all.length <= IMAGES.length) return 0
	return all[IMAGES.length].offsetLeft - all[0].offsetLeft
}

// 画面幅を埋めて、さらに1セット余るまで複製する（途中でDOMを作り直さないのでちらつかない）
function fillSlides() {
	if (slides.children.length === 0) {
		IMAGES.forEach((image, i) => slides.append(createSlide(image, i)))
		setCount = 1
	}
	let guard = 0
	while (guard++ < 20) {
		// 2セット目が無いと1セット幅が測れないので、最低2セットは作る
		if (setCount < 2) {
			IMAGES.forEach((image, i) => slides.append(createSlide(image, i)))
			setCount++
			continue
		}
		const setWidth = getSetWidth()
		if (setWidth > 0 && slides.scrollWidth >= carousel.clientWidth + setWidth) break
		IMAGES.forEach((image, i) => slides.append(createSlide(image, i)))
		setCount++
	}
}

let pos = 0
let last = null
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function animate(now) {
	if (last === null) last = now
	// タブが裏に回った後などで一気に飛ばないよう上限をつける
	const dt = Math.min((now - last) / 1000, 0.1)
	last = now

	if (!reduceMotion.matches) {
		const setWidth = getSetWidth()
		if (setWidth > 0) {
			pos = (pos + SPEED * dt) % setWidth
			slides.style.transform = `translate3d(${-pos}px, 0, 0)`
		}
	}
	requestAnimationFrame(animate)
}

if (slides && carousel) {
	slides.innerHTML = ''
	slides.style.willChange = 'transform'
	fillSlides()
	requestAnimationFrame(animate)

	let resizeTimer
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer)
		resizeTimer = setTimeout(fillSlides, 150)
	})
	// 画像の読み込み完了で幅が変わる場合に備えて、複製数を再確認する
	window.addEventListener('load', fillSlides)
}

// ===== スクロールで表示（企画ボックス） =====
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible')
			observer.unobserve(entry.target) // 一度表示したら監視不要
		}
	})
})
document.querySelectorAll('.expBox').forEach((exp) => observer.observe(exp))

// ===== floatingBox（存在するページだけ） =====
const floatingBox = document.querySelector('#floatingBox')
if (floatingBox) {
	window.addEventListener('scroll', () => {
		const pageHeight = document.documentElement.scrollHeight
		floatingBox.style.display = (pageHeight - 1000 < window.scrollY) ? 'none' : ''
	}, { passive: true })
}

// ===== ハンバーガーメニュー =====
const btn = document.getElementById('hamburgerBtn')
const overlay = document.getElementById('menuOverlay')

btn.addEventListener('click', () => {
	const isOpen = btn.classList.toggle('active')
	overlay.classList.toggle('active')
	btn.setAttribute('aria-expanded', isOpen)
	btn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く')
	document.body.style.overflow = isOpen ? 'hidden' : ''
})

// メニュー内のリンクをクリックしたら閉じる
overlay.querySelectorAll('a').forEach(link => {
	link.addEventListener('click', () => {
		btn.classList.remove('active')
		overlay.classList.remove('active')
		btn.setAttribute('aria-expanded', 'false')
		document.body.style.overflow = ''
	})
})

window.addEventListener('load', () => {
	document.body.classList.add('is-loaded')
})

// ===== カウントダウン =====
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
