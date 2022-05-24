const resolveRedirect = async (audio: string) => {
	try {
		const res = await fetch(audio);
		return res.url;
	} catch (err) {
		console.info(
			'[@remotion/preload] Resource does not support CORS. Cannot handle any potential redirects'
		);
		return audio;
	}
};

export const preloadAudio = (src: string): (() => void) => {
	if (typeof document === 'undefined') {
		console.warn(
			'preloadAudio() was called outside the browser. Doing nothing.'
		);
		return () => undefined;
	}

	const resolved = resolveRedirect(src);

	let cancelled = false;

	if (navigator.userAgent.match(/Firefox\//)) {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'audio';
		resolved
			.then((realUrl) => {
				if (!cancelled) {
					link.href = realUrl;
					document.head.appendChild(link);
				}
			})
			.catch((err) => {
				console.log(`Failed to preload audio`, err);
			});
		return () => {
			cancelled = true;
			link.remove();
		};
	}

	const vid = document.createElement('audio');
	vid.preload = 'auto';
	vid.controls = true;
	vid.style.display = 'none';
	resolved
		.then((realUrl) => {
			if (!cancelled) {
				vid.src = realUrl;
				document.body.appendChild(vid);
			}
		})
		.catch((err) => {
			console.log('Failed to preload audio', err);
		});

	return () => {
		cancelled = true;
		vid.remove();
	};
};
