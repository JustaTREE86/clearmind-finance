// Google Ads / GA4 + Meta Pixel loader. No-ops until IDs are set in Vercel env vars
// (VITE_GA_ID, VITE_META_PIXEL_ID) — safe to ship before ad accounts exist.

const GA_ID = import.meta.env.VITE_GA_ID
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID

let initialized = false

export function initAnalytics() {
  if (initialized) return
  initialized = true

  if (GA_ID) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
  }

  if (META_PIXEL_ID) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */
    window.fbq('init', META_PIXEL_ID)
    window.fbq('track', 'PageView')
  }
}

// Fire on every successful lead form submit — Google Ads/GA4 + Meta both need
// this event to build conversion campaigns and lookalike audiences.
export function trackLead(source) {
  if (GA_ID && window.gtag) window.gtag('event', 'generate_lead', { source })
  if (META_PIXEL_ID && window.fbq) window.fbq('track', 'Lead', { content_name: source })
}
