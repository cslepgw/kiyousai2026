const pic1 = `<div class="slide"><picture><source srcset="img/hanabi.webp" type="image/webp"/><img src="img/hanabi.jpg" alt=""/></picture></div>`
const pic2 = `<div class="slide"><picture><source srcset="img/bird.webp" type="image/webp"/><img src="img/bird.jpg" alt=""/></picture></div>`
const pic3 = `<div class="slide"><picture><source srcset="img/flower.webp" type="image/webp"/><img src="img/flower.jpg" alt=""/></picture></div>`
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

/*
<div class="slide">
		   			<picture>
						<source srcset="img/hanabi.webp" type="image/webp"/>
						<img src="img/hanabi.jpg" alt=""/>
					</picture>
		   		</div>
		   		<div class="slide" style="">
		   			<picture>
						<source srcset="img/bird.webp" type="image/webp">
						<img src="img/bird.png" alt="">
					</picture>
				</div>
		   		<div class="slide" style="">
		   			<picture>
						<source srcset="img/flower.webp" type="image/webp">
						<img src="img/flower.jpg" alt="">
					</picture>
		   		</div>
・DOMを付け加える方法
・要素を移動させる方法
btnprev.addEventListener("click", () => {
	if (current == 0) {
		current = 2
	} else {
		current--
	}
	
	picRiv(current)
})

btnnext.addEventListener("click", () => {
	if (current == 2) {
		current = 0
	} else {
		current++
	}

	picRiv(current)
})
*/