window.db = [];
window.db.push({ t: "Astro Bot", p: "PS5", h: 15, d: 3, ok: 1, on: 0, dh: 3, dt: 8, g: 2, s: 17, b: 24, price: "R1,099", sale: "R899 (-18%)" });
window.db.push({ t: "Spider-Man 2", p: "PS5", h: 25, d: 3, ok: 1, on: 0, dh: 2, dt: 2, g: 2, s: 17, b: 22, price: "R1,399", sale: "R799 (-43%)" });
window.db.push({ t: "God of War Ragnarök", p: "PS5", h: 50, d: 4, ok: 1, on: 0, dh: 12, dt: 12, g: 4, s: 15, b: 16, price: "R1,399", sale: "R699 (-50%)" });
window.db.push({ t: "Ghost of Tsushima", p: "PS5", h: 45, d: 3, ok: 1, on: 1, dh: 25, dt: 25, g: 2, s: 9, b: 40, price: "R1,399", sale: "PS+ Extra" });
window.db.push({ t: "Elden Ring", p: "PS5", h: 80, d: 6, ok: 1, on: 0, dh: 0, dt: 0, g: 3, s: 14, b: 24, price: "R1,069", sale: "R748 (-30%)" });
window.db.push({ t: "Cyberpunk 2077", p: "PS5", h: 75, d: 3, ok: 1, on: 0, dh: 25, dt: 13, g: 1, s: 17, b: 26, price: "R899", sale: "R449 (-50%)" });
window.db.push({ t: "Stray", p: "PS5", h: 8, d: 3, ok: 1, on: 0, dh: 0, dt: 0, g: 6, s: 9, b: 9, price: "R539", sale: "R323 (-40%)" });
window.db.push({ t: "The Witcher 3", p: "PS4", h: 100, d: 6, ok: 1, on: 0, dh: 45, dt: 26, g: 2, s: 8, b: 42, price: "R899", sale: "R224 (-75%)" });
window.db.push({ t: "Red Dead Redemption 2", p: "PS4", h: 200, d: 6, ok: 1, on: 1, dh: 0, dt: 0, g: 3, s: 4, b: 44, price: "R999", sale: "R329 (-67%)" });
window.db.push({ t: "It Takes Two", p: "PS5", h: 14, d: 2, ok: 1, on: 1, dh: 0, dt: 0, g: 10, s: 10, b: 0, price: "R729", sale: "R182 (-75%)" });
window.db.push({ t: "Grand Theft Auto IV", p: "PS3", h: 120, d: 7, ok: 1, on: 1, dh: 25, dt: 15, g: 2, s: 5, b: 43, price: "R399", sale: "R139 (-65%)" });
window.db.push({ t: "Mad Max", p: "PS4", h: 55, d: 4, ok: 0, on: 1, dh: 0, dt: 0, g: 2, s: 12, b: 35, price: "R329", sale: "R82 (-75%)" });

window.games = [];
window.shown = [];
window.currentPick = null;

window.fh = function(x) {
  var box = document.getElementById("dlc");
  return (box && box.checked) ? x.h + x.dh : x.h;
};

window.rem = function(x) {
  return Math.max(1, Math.round(window.fh(x) * ((100 - x.prog) / 100)));
};

window.cleanScore = function(x) {
  return (100 - x.prog) / window.rem(x);
};

window.showPriceAlert = function(title) {
  var g = window.db.find(function(x) { return x.t === title; });
  if (!g) return;
  var o = document.getElementById("cOut");
  o.innerHTML = "<strong>" + g.t + " (" + g.p + ") Store Tracker:</strong> Regular: <s>" + g.price + "</s> &rarr; <span class='b' style='background:#dcfce7;color:#15803d;'>Best Deal: " + g.sale + "</span> (Affiliate Tag Ready)";
};

window.chk = function() {
  var inp = document.getElementById("cIn");
  var o = document.getElementById("cOut");
  if (!inp || !o) return;
  var v = inp.value.trim().toLowerCase();
  if (!v) {
    o.textContent = "Type a game to check Online/Offline, DLC & Store Price";
    return;
  }
  var g = window.db.find(function(x) { return x.t.toLowerCase().indexOf(v) !== -1; });
  if (!g) {
    o.innerHTML = "<span class='b' style='background:#fee2e2;color:#b91c1c;'>Not in sample list</span>";
    return;
  }
  o.innerHTML = g.t + " (" + g.p + ") — <span class='b' style='background:" + (g.on ? "#fef3c7;color:#b45309" : "#e0f2fe;color:#0369a1") + ";'>" + (g.on ? "Online/Co-op" : "Offline Solo") + "</span> <span class='b' style='background:" + (g.dt ? "#f3e8ff;color:#7e22ce" : "#dcfce7;color:#15803d") + ";'>" + (g.dt ? "+" + g.dt + " DLC (+" + g.dh + "h)" : "No DLC") + "</span> Base: " + g.h + "h • <span class='b' style='background:#dcfce7;color:#15803d;'>Deal: " + g.sale + "</span>";
};

window.openT = function(x) {
  window.currentPick = x;
  var list = [{ y: "Plat", n: x.t + " Master" }];
  for (var i = 1; i <= x.g; i++) list.push({ y: "Gold", n: "Gold #" + i });
  for (var j = 1; j <= x.s; j++) list.push({ y: "Silver", n: "Silver #" + j });
  for (var k = 1; k <= x.b; k++) list.push({ y: "Bronze", n: "Bronze #" + k });
  if (document.getElementById("dlc").checked) {
    for (var d = 1; d <= x.dt; d++) list.push({ y: "DLC", n: "DLC #" + d });
  }
  var got = Math.floor(list.length * (x.prog / 100));
  document.getElementById("dTitle").textContent = x.t + " (" + x.p + ") — " + window.rem(x) + "h left";
  document.getElementById("dSub").textContent = (x.on ? "Online/Co-op" : "Offline Solo") + " • " + (x.dt ? "+" + x.dt + " DLC (+" + x.dh + "h)" : "No DLC") + " • PS Store Deal: " + x.sale + " • " + got + "/" + list.length + " Earned";

  var sLink = document.getElementById("storeLink");
  if (sLink) {
    sLink.removeAttribute("href");
    sLink.removeAttribute("target");
    sLink.onclick = function(e) {
      e.preventDefault();
      window.showPriceAlert(x.t);
    };
  }

  document.getElementById("tBox").innerHTML = list.map(function(v, idx) {
    var ok = idx > 0 && idx <= got;
    return "<div class='tItem'><span><b>[" + v.y + "]</b> " + v.n + "</span><span class='b' style='background:" + (ok ? "#dcfce7;color:#15803d" : "#fee2e2;color:#b91c1c") + ";'>" + (ok ? "Earned" : "Needed") + "</span></div>";
  }).join("");
  document.getElementById("drawer").style.display = "block";
};

window.runCleaner = function() {
  document.getElementById("st").value = "ok";
  document.getElementById("so").value = "clean";
  window.draw();
  if (window.shown.length) {
    window.openT(window.shown);
  }
};

window.sim = function() {
  var u = document.getElementById("uIn");
  if (!u) return;
  document.getElementById("sUser").textContent = u.value || "Player";
  document.getElementById("drawer").style.display = "none";
  window.games = window.db.slice().sort(function() { return 0.5 - Math.random(); }).slice(0, 8).map(function(x) {
    return Object.assign({}, x, { prog: Math.floor(Math.random() * 88) + 5 });
  });
  window.draw();
};

window.allG = function() {
  document.getElementById("sUser").textContent = "All (12)";
  document.getElementById("drawer").style.display = "none";
  window.games = window.db.map(function(x) {
    return Object.assign({}, x, { prog: Math.floor(Math.random() * 85) + 5 });
  });
  window.draw();
};

window.pick = function() {
  if (window.shown.length) window.openT(window.shown[Math.floor(Math.random() * window.shown.length)]);
};

window.draw = function() {
  var tb = document.getElementById("tb");
  if (!tb) return;
  var q = document.getElementById("q").value.toLowerCase();
  var p = document.getElementById("p").value;
  var m = document.getElementById("m").value;
  var d = document.getElementById("d").value;
  var h = +document.getElementById("h").value || 9999;
  var st = document.getElementById("st").value;
  var so = document.getElementById("so").value;

  window.shown = window.games.filter(function(x) {
    return x.t.toLowerCase().indexOf(q) !== -1 &&
      (p === "ALL" || x.p === p) &&
      (m === "ALL" || (m === "SOLO" && !x.on) || (m === "COOP" && x.on)) &&
      (d === "ALL" || (d === "NO" && !x.dt) || (d === "YES" && x.dt)) &&
      window.rem(x) <= h &&
      (st === "all" || x.ok);
  });

  window.shown.sort(function(a, b) {
    if (so === "asc") return window.rem(a) - window.rem(b);
    if (so === "desc") return window.rem(b) - window.rem(a);
    if (so === "clean") return window.cleanScore(b) - window.cleanScore(a);
    return a.d - b.d;
  });

  var avgComp = window.shown.length ? (window.shown.reduce(function(s, x) { return s + x.prog; }, 0) / window.shown.length).toFixed(1) : 0;
  document.getElementById("sAvg").textContent = avgComp + "%";
  document.getElementById("sHrs").textContent = window.shown.reduce(function(s, x) { return s + window.rem(x); }, 0) + "h";
  document.getElementById("sDif").textContent = (window.shown.length ? (window.shown.reduce(function(s, x) { return s + x.d; }, 0) / window.shown.length).toFixed(1) : 0) + "/10";

  tb.innerHTML = window.shown.map(function(x, i) {
    var cleanBadge = (so === "clean" && i === 0) ? " <span class='b' style='background:#fef3c7;color:#b45309;'>BEST % BOOST</span>" : "";
    return "<tr onclick='window.openT(window.shown[" + i + "])'><td><b style='color:#1e4b8f;'>" + x.t + "</b>" + cleanBadge + "</td><td><span class='b' style='background:#1e293b;color:#fff;'>" + x.p + "</span></td><td><b>" + x.prog + "%</b></td><td><b>" + window.rem(x) + "h</b></td><td>" + (x.on ? "Online/Co-op" : "Offline Solo") + "</td><td>" + (x.dt ? "+" + x.dt + " (+" + x.dh + "h)" : "None") + "</td><td>" + x.d + "/10</td><td style='font-weight:bold;color:" + (x.ok ? "#15803d" : "#b91c1c") + ";'>" + (x.ok ? "Attainable" : "Closed") + "</td></tr>";
  }).join("");
};

function initApp() {
  var gl = document.getElementById("gList");
  if (gl) {
    gl.innerHTML = window.db.map(function(x) { return "<option value='" + x.t + "'>"; }).join("");
  }
  window.sim();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
