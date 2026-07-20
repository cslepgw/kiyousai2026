const floatingBox = document.querySelector("#floatingBox")
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

		if( contentsHeight-276 < window.scrollY ) {
			floatingBox.style.opacity = 0
		} else {
			floatingBox.style.opacity = 1
		}
	});
});