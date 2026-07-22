(async function () {
  const n = 6;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const r = await fetch('webgl_b64/' + String(i).padStart(2, '0') + '.b64');
    if (!r.ok) { console.error('missing b64', i); return; }
    parts.push(await r.text());
  }
  const bin = atob(parts.join(''));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const js = new TextDecoder('utf-8').decode(bytes);
  const s = document.createElement('script');
  s.textContent = js;
  document.body.appendChild(s);
})();
