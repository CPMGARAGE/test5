'use strict';
/* Game data, mirrored from terminaltanks.py (unlock registry, Tournament, cheat table). */
const TT = {
  tanks: 'hornet titan phantom juggernaut sentinel glacier helios rattler miasma bastion zephyr geode mirage revenant corsair tyrant archon obsidian tempest sovereign scout mule badger turtle pioneer raider centurion warhound mantis paladin reaper leviathan banshee behemoth nightshade emperor celestial eternal dynasty overlord wardog spitfire blitz judge hydra ufo asciibot'.split(' '),
  ammo: 'venom starburst void inferno pulse cryo nova shrapnel blight siege cyclone crystal echo wraith barrage wrath zenith magma thunder aurora blazer dasher fizz slag needle ripple cinder frostbite photon toxin stormfront quasar abyss molten glacial helix eclipse bloom nebula supernova bandit salvo hailstorm meltdown oblivion xenon glyph'.split(' '),
  maps: 'THE FORGE|STORM SPIRE|THE CITADEL|HAYSTACK|CULVERT|PICNIC KNOLL|BOULDER FIELD|CROSSROADS|ANTHILL|TIDEPOOLS|WATCH RIDGE|SALT FLATS|COPPER MINE|SKYBRIDGE|THE MAW|CLOCKWORK|FROZEN FALLS|OBELISK FIELD|CRYSTAL SANCTUM|ECLIPSE GATE|ASTRAL BASTION|VOID CATHEDRAL|SOLAR TEMPLE|BUNKER LINE|RADAR HILL|SHELLED FIELD|SPACE ELEVATOR|ASTEROID FIELD|MOTHERSHIP'.split('|'),
  themes: 'SUNSET MEADOW DESERT HARBOR AUTUMN ARCTIC JUNGLE NEON DEEPSEA STORMFRONT MOLTEN CRYSTALCAVE BLOODMOON EMERALD GOLDENDUNES ECLIPSE VOIDRIFT SOLARCROWN STARFALL CELESTIAL OUTPOST RADAR WARZONE ORBITAL DEEPSPACE INVASION MASTER SECRET'.split(' '),
  levels: 'BOOT CAMP|PROVING GROUND|GHOST FRONT|IRON GAUNTLET|STEEL SENTRY|DEEP FREEZE|SOLAR FLARE|DUST BOWL|TOXIC MARSH|STONE WALL|WIND TUNNEL|CRYSTAL DEPTHS|HALL OF MIRRORS|GRAVEYARD SHIFT|SKY RAID|BLOOD MOON|THE GATEKEEPER|THE FORGE|STORM SPIRE|MASTER\u2019S CITADEL'.split('|'),
  words: 'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'.split(' '),
  missions: 50,
  copy(text, el) { (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => { const t = el.textContent; el.textContent = 'Copied'; setTimeout(() => { el.textContent = t; }, 1200); }, () => {}); },
  mapKey(n) { return ({ 'THE FORGE': 'forge', 'STORM SPIRE': 'spire', 'THE CITADEL': 'citadel' })[n] || n.toLowerCase().replace(/ /g, '-'); },
};

(function shell() {
  const page = document.body.dataset.page || '';
  const TANK = ['...ttttt...', '..ttttttt..', '.hhhhhhhhg.', 'hhhhhhhhhhh', 'kwkwkwkwkwk', '.kkkkkkkkk.'];
  const PAL = { t: '#8ff1ff', h: '#46dcf0', g: '#c8faff', k: '#1c4a56', w: '#6ac3d2' };
  let r = '';
  TANK.forEach((row, y) => [...row].forEach((c, x) => { if (c !== '.') r += `<rect x="${x + 1}" y="${y + 3}" width="1.02" height="1.02" fill="${PAL[c]}"/>`; }));
  for (let i = 0; i < 6; i++) r += `<rect x="${7 + i * 0.9}" y="${3.5 - i * 0.55}" width="1.02" height="1.02" fill="#e2f4fa"/>`;
  const icon = document.createElement('link'); icon.rel = 'icon';
  icon.href = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 9" shape-rendering="crispEdges"><rect width="14" height="9" fill="#05090f"/>${r}</svg>`);
  document.head.appendChild(icon);

  const mk = (n) => Array.from({ length: n }, () => `${(Math.random() * 100).toFixed(1)}vw ${(Math.random() * 78).toFixed(1)}vh ${Math.random() < .2 ? '#bfe9ff' : '#fff'}`).join(',');
  const nav = [['play.html', 'Play', 'play'], ['home.html', 'Home', 'home'], ['catalog.html', 'Catalog', 'catalog'], ['cheats.html', 'Cheat codes', 'cheats'], ['save-forge.html', 'Save forge', 'forge'], ['coming-soon.html', 'Coming soon', 'soon'], ['about.html', 'About', 'about']];
  const main = document.querySelector('main');
  main.classList.add('stage');
  const title = main.dataset.title || '';
  main.innerHTML = `<section class="bezel"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i>
    <div class="titlebar"><span class="name">&#9670; ${title}</span><span class="sp"></span>${main.dataset.chip ? `<span class="chip ok">${main.dataset.chip}</span>` : ''}</div>
    <div class="body" id="content">${main.innerHTML}</div></section>`;
  document.body.insertAdjacentHTML('afterbegin', `<div class="sky" aria-hidden="true"><div class="stars" style="box-shadow:${mk(70)}"></div><div class="stars2" style="box-shadow:${mk(50)}"></div><div class="ridge"></div></div>`);
  const app = document.createElement('div'); app.id = 'app';
  app.innerHTML = `<header class="bar"><a class="brand" href="home.html"><svg viewBox="0 0 14 9" aria-hidden="true">${r}</svg><div><h1>TERMINALTANKS</h1><small>TACTICAL ARTILLERY SIMULATION</small></div></a>
    <nav class="tools" aria-label="Site">${nav.map(([h, t, k]) => `<a class="btn${k === page ? ' on' : ''}${k === 'play' ? ' hot' : ''}" href="${h}"${k === page ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav></header>`;
  app.appendChild(main);
  app.insertAdjacentHTML('beforeend', `<footer class="foot"><div>&#9670; Source on <a href="https://github.com/ethanlabs101/TerminalTanks" target="_blank" rel="noopener">github.com/ethanlabs101/TerminalTanks</a> by <a href="https://github.com/ethanlabs101" target="_blank" rel="noopener">ethanlabs101</a></div><div>Runs in your browser. Your progress stays on this device.<span id="ver"></span></div></footer>`);
  document.body.appendChild(app);
  fetch('roadmap.json').then((r) => r.json()).then((j) => { document.getElementById('ver').textContent = ' Version ' + j.version + '.'; }).catch(() => {});
})();
