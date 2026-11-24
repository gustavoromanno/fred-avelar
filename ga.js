/* Contagem de visitas (Google Analytics 4) com aviso de cookies (LGPD).
   Para ativar: coloque o ID de métricas abaixo (formato G-XXXXXXXXXX).
   Sem ID, nada é carregado. */
(function () {
  var GA_ID = ""; // ex.: "G-ABC123XYZ9"
  if (!GA_ID) return;

  var KEY = "fa-cookies";
  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // Começa sem cookies; só grava cookies depois que o visitante aceita.
  gtag("consent", "default", {
    analytics_storage: choice === "ok" ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"
  });
  gtag("js", new Date());
  gtag("config", GA_ID);

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  // Eventos: clique no WhatsApp e uso do botão "Copiar resumo" do simulador.
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("a.wa, #copy");
    if (!el) return;
    if (el.id === "copy") gtag("event", "simulador_copiar_resumo");
    else gtag("event", "whatsapp_click", { link_text: (el.textContent || "").trim().slice(0, 60) });
  });

  if (choice) return;

  // Aviso de cookies
  function banner() {
    var b = document.createElement("div");
    b.setAttribute("role", "region");
    b.setAttribute("aria-label", "Aviso de cookies");
    b.style.cssText = "position:fixed;z-index:80;left:max(12px,env(safe-area-inset-left,0px));right:max(12px,env(safe-area-inset-right,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));max-width:560px;margin:0 auto;background:#0d1a2e;color:#eef1f5;border:1px solid rgba(201,169,106,.45);border-radius:16px;padding:14px 16px;box-shadow:0 12px 34px rgba(0,0,0,.4);font:14px/1.5 Manrope,system-ui,-apple-system,sans-serif;display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center";
    b.innerHTML = '<span style="flex:1 1 260px">Usamos cookies só para contar visitas e melhorar o site. Nenhum dado pessoal é vendido ou compartilhado.</span>' +
      '<span style="display:flex;gap:8px">' +
      '<button type="button" data-c="no" style="cursor:pointer;border:1px solid rgba(238,241,245,.3);background:none;color:#eef1f5;border-radius:999px;padding:8px 14px;font-weight:600;font-size:13px;font-family:inherit">Recusar</button>' +
      '<button type="button" data-c="ok" style="cursor:pointer;border:0;background:linear-gradient(135deg,#e4cd9a,#c9a96a);color:#1a1407;border-radius:999px;padding:8px 16px;font-weight:600;font-size:13px;font-family:inherit">Aceitar</button>' +
      "</span>";
    b.addEventListener("click", function (e) {
      var c = e.target.getAttribute && e.target.getAttribute("data-c");
      if (!c) return;
      try { localStorage.setItem(KEY, c); } catch (err) {}
      if (c === "ok") gtag("consent", "update", { analytics_storage: "granted" });
      b.remove();
    });
    document.body.appendChild(b);
  }
  if (document.body) banner(); else document.addEventListener("DOMContentLoaded", banner);
})();
