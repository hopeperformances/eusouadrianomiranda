(function () {
  "use strict";

  var GTM_ID = "GTM-WW7G887N";
  var whatsappNumber = "5547992691769";
  var whatsappMessage = "Olá! Vim pelo site e gostaria de agendar uma consulta com o Dr. Adriano Miranda.";
  var whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage);

  window.dataLayer = window.dataLayer || [];
  if (!window.google_tag_manager && !window.__hopeGtmRequested) {
    window.__hopeGtmRequested = true;
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
    document.head.appendChild(gtmScript);
  }

  function isTrackableWhatsAppLink(link) {
    return link.getAttribute("data-track") === "whatsapp" || /(?:wa\.me|api\.whatsapp\.com|whatsapp)/i.test(link.getAttribute("href") || "");
  }

  function trackWhatsAppClick(link) {
    window.dataLayer.push({
      event: "generate_lead_whatsapp",
      cta_location: link.getAttribute("data-location") || "whatsapp-cta",
      page_path: window.location.pathname,
      link_url: whatsappUrl
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[data-track="whatsapp"]').forEach(function (link) {
      link.setAttribute("href", whatsappUrl);
    });

    document.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (!link || !isTrackableWhatsAppLink(link)) return;

      var currentHref = link.getAttribute("href") || "";
      link.setAttribute("href", whatsappUrl);
      trackWhatsAppClick(link);

      if (currentHref === whatsappUrl || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      var opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!opened) window.location.href = whatsappUrl;
    }, true);
  });
}());
