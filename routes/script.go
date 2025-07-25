package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterScriptRoutes(r *gin.Engine) {
	r.GET("/script.js", func(c *gin.Context) {

		script := `(function () {
	const currentScript = document.currentScript;
	const initVisitors = parseInt(currentScript.getAttribute('init-visitors') || '0', 10);
	const initViews = parseInt(currentScript.getAttribute('init-views') || '0', 10);
	const origin = currentScript.src.split('/script.js')[0];

	const startAt = new Date('2020-01-01').getTime();
	const endAt = Date.now();
	const url = origin + '/proxy?startAt=' + startAt + '&endAt=' + endAt;

	fetch(url)
		.then(res => res.json())
		.then(data => {
		const visitors = (data.visitors?.value || 0) + initVisitors;
		const views = (data.pageviews?.value || 0) + initViews;

		const uvSpan = document.getElementById('uv-count');
		const pvSpan = document.getElementById('pv-count');

		if (uvSpan) uvSpan.textContent = visitors.toLocaleString();
		if (pvSpan) pvSpan.textContent = views.toLocaleString();
		})
		.catch(err => {
		console.error('Umami fetch data error:', err);
		});
	})();`

		c.Header("Content-Type", "application/javascript")
		c.String(200, script)
	})
}
