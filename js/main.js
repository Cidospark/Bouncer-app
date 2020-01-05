// make sure service worker is supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw_cached_pages.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log(`SW: ${err}`))
    })
} else {
    console.log('Service worker NOT supported by your browser');
}
