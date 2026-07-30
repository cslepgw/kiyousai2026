const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			// 画面内に入ったらvisibleクラスを付ける
			entry.target.classList.add('visible')
		}
	})
})

document.querySelectorAll('.expBox').forEach((exp) => {
	observer.observe(exp)
})
