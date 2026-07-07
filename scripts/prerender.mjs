import { readFileSync, writeFileSync } from 'fs'
import { PAGES } from '../src/seo-data.js'

const template = readFileSync('dist/index.html', 'utf-8')

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

for (const [route, page] of Object.entries(PAGES)) {
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)

  const extraTags = `
    <link rel="canonical" href="${page.canonical}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${page.canonical}" />
    <script type="application/ld+json" id="page-jsonld">${JSON.stringify(page.jsonLd)}</script>
  </head>`
  html = html.replace('</head>', extraTags)

  const outPath = route === '/' ? 'dist/index.html' : `dist${route}.html`
  writeFileSync(outPath, html)
  console.log(`prerendered ${route} -> ${outPath}`)
}
