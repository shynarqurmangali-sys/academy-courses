// Wraps ../index.html (written as an artifact fragment) into a full HTML document for the app.
// The AI tutor needs Claude's page runtime, so the app hides that tab.
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const title = (src.match(/<title>[\s\S]*?<\/title>/) || ['<title>Ағылшынша оңай</title>'])[0];
const body = src.replace(title, '');
const html = `<!doctype html>
<html lang="kk"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#00839e">
${title}
<style>
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}
nav{grid-template-columns:repeat(3,1fr)!important}nav [data-tab="ai"]{display:none}
</style></head><body>
${body}
</body></html>`;
fs.mkdirSync(__dirname + '/www', { recursive: true });
fs.writeFileSync(__dirname + '/www/index.html', html);
console.log('www/index.html', html.length, 'bytes');
