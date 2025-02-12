let q = {}, J;
function V(e = {}) {
  q = {
    animate: !0,
    allowClose: !0,
    overlayClickBehavior: "close",
    overlayOpacity: 0.7,
    smoothScroll: !1,
    disableActiveInteraction: !1,
    showProgress: !1,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...e
  };
}
function s(e) {
  return e ? q[e] : q;
}
function le(e) {
  J = e;
}
function S() {
  return J;
}
let N = {};
function D(e, o) {
  N[e] = o;
}
function E(e) {
  var o;
  (o = N[e]) == null || o.call(N);
}
function de() {
  N = {};
}
function F(e, o, t, i) {
  return (e /= i / 2) < 1 ? t / 2 * e * e + o : -t / 2 * (--e * (e - 2) - 1) + o;
}
function U(e) {
  const o = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return e.flatMap((t) => {
    const i = t.matches(o), d = Array.from(t.querySelectorAll(o));
    return [...i ? [t] : [], ...d];
  }).filter((t) => getComputedStyle(t).pointerEvents !== "none" && ve(t));
}
function ee(e) {
  if (!e || ue(e))
    return;
  const o = s("smoothScroll"), t = e.offsetHeight > window.innerHeight;
  e.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !o || pe(e) ? "auto" : "smooth",
    inline: "center",
    block: t ? "start" : "center"
  });
}
function pe(e) {
  if (!e || !e.parentElement)
    return;
  const o = e.parentElement;
  return o.scrollHeight > o.clientHeight;
}
function ue(e) {
  const o = e.getBoundingClientRect();
  return o.top >= 0 && o.left >= 0 && o.bottom <= (window.innerHeight || document.documentElement.clientHeight) && o.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function ve(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
let z = {};
function k(e, o) {
  z[e] = o;
}
function l(e) {
  return e ? z[e] : z;
}
function X() {
  z = {};
}
function fe(e, o, t, i) {
  let d = l("__activeStagePosition");
  const n = d || t.getBoundingClientRect(), f = i.getBoundingClientRect(), m = F(e, n.x, f.x - n.x, o), r = F(e, n.y, f.y - n.y, o), v = F(e, n.width, f.width - n.width, o), g = F(e, n.height, f.height - n.height, o);
  d = {
    x: m,
    y: r,
    width: v,
    height: g
  }, oe(d), k("__activeStagePosition", d);
}
function te(e) {
  if (!e)
    return;
  const o = e.getBoundingClientRect(), t = {
    x: o.x,
    y: o.y,
    width: o.width,
    height: o.height
  };
  k("__activeStagePosition", t), oe(t);
}
function he() {
  const e = l("__activeStagePosition"), o = l("__overlaySvg");
  if (!e)
    return;
  if (!o) {
    console.warn("No stage svg found.");
    return;
  }
  const t = window.innerWidth, i = window.innerHeight;
  o.setAttribute("viewBox", `0 0 ${t} ${i}`);
}
function ge(e) {
  const o = we(e);
  document.body.appendChild(o), re(o, (t) => {
    t.target.tagName === "path" && E("overlayClick");
  }), k("__overlaySvg", o);
}
function oe(e) {
  const o = l("__overlaySvg");
  if (!o) {
    ge(e);
    return;
  }
  const t = o.firstElementChild;
  if ((t == null ? void 0 : t.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  t.setAttribute("d", ie(e));
}
function we(e) {
  const o = window.innerWidth, t = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${o} ${t}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
  const d = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return d.setAttribute("d", ie(e)), d.style.fill = s("overlayColor") || "rgb(0,0,0)", d.style.opacity = `${s("overlayOpacity")}`, d.style.pointerEvents = "auto", d.style.cursor = "auto", i.appendChild(d), i;
}
function ie(e) {
  const o = window.innerWidth, t = window.innerHeight, i = s("stagePadding") || 0, d = s("stageRadius") || 0, n = e.width + i * 2, f = e.height + i * 2, m = Math.min(d, n / 2, f / 2), r = Math.floor(Math.max(m, 0)), v = e.x - i + r, g = e.y - i, P = n - r * 2, a = f - r * 2;
  return `M${o},0L0,0L0,${t}L${o},${t}L${o},0Z
    M${v},${g} h${P} a${r},${r} 0 0 1 ${r},${r} v${a} a${r},${r} 0 0 1 -${r},${r} h-${P} a${r},${r} 0 0 1 -${r},-${r} v-${a} a${r},${r} 0 0 1 ${r},-${r} z`;
}
function me() {
  const e = l("__overlaySvg");
  e && e.remove();
}
function ye() {
  const e = document.getElementById("driver-dummy-element");
  if (e)
    return e;
  let o = document.createElement("div");
  return o.id = "driver-dummy-element", o.style.width = "0", o.style.height = "0", o.style.pointerEvents = "none", o.style.opacity = "0", o.style.position = "fixed", o.style.top = "50%", o.style.left = "50%", document.body.appendChild(o), o;
}
function j(e) {
  const { element: o } = e;
  let t = typeof o == "function" ? o() : typeof o == "string" ? document.querySelector(o) : o;
  t || (t = ye()), be(t, e);
}
function xe() {
  const e = l("__activeElement"), o = l("__activeStep");
  e && (te(e), he(), ae(e, o));
}
function be(e, o) {
  var x;
  const i = Date.now(), d = l("__activeStep"), n = l("__activeElement") || e, f = !n || n === e, m = e.id === "driver-dummy-element", r = n.id === "driver-dummy-element", v = s("animate"), g = o.onHighlightStarted || s("onHighlightStarted"), P = (o == null ? void 0 : o.onHighlighted) || s("onHighlighted"), a = (d == null ? void 0 : d.onDeselected) || s("onDeselected"), c = s(), p = l();
  !f && a && a(r ? void 0 : n, d, {
    config: c,
    state: p,
    driver: S()
  }), g && g(m ? void 0 : e, o, {
    config: c,
    state: p,
    driver: S()
  });
  const w = !f && v;
  let u = !1;
  Se(), k("previousStep", d), k("previousElement", n), k("activeStep", o), k("activeElement", e);
  const h = () => {
    if (l("__transitionCallback") !== h)
      return;
    const b = Date.now() - i, T = 400 - b <= 400 / 2;
    o.popover && T && !u && w && (Q(e, o), u = !0), s("animate") && b < 400 ? fe(b, 400, n, e) : (te(e), P && P(m ? void 0 : e, o, {
      config: s(),
      state: l(),
      driver: S()
    }), k("__transitionCallback", void 0), k("__previousStep", d), k("__previousElement", n), k("__activeStep", o), k("__activeElement", e)), window.requestAnimationFrame(h);
  };
  k("__transitionCallback", h), window.requestAnimationFrame(h), ee(e), !w && o.popover && Q(e, o), n.classList.remove("driver-active-element", "driver-no-interaction"), n.removeAttribute("aria-haspopup"), n.removeAttribute("aria-expanded"), n.removeAttribute("aria-controls"), ((x = o.disableActiveInteraction) != null ? x : s("disableActiveInteraction")) && e.classList.add("driver-no-interaction"), e.classList.add("driver-active-element"), e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", "true"), e.setAttribute("aria-controls", "driver-popover-content");
}
function Ce() {
  var e;
  (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((o) => {
    o.classList.remove("driver-active-element", "driver-no-interaction"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls");
  });
}
function O() {
  const e = l("__resizeTimeout");
  e && window.cancelAnimationFrame(e), k("__resizeTimeout", window.requestAnimationFrame(xe));
}
function Pe(e) {
  var r;
  if (!l("isInitialized") || !(e.key === "Tab" || e.keyCode === 9))
    return;
  const i = l("__activeElement"), d = (r = l("popover")) == null ? void 0 : r.wrapper, n = U([
    ...d ? [d] : [],
    ...i ? [i] : []
  ]), f = n[0], m = n[n.length - 1];
  if (e.preventDefault(), e.shiftKey) {
    const v = n[n.indexOf(document.activeElement) - 1] || m;
    v == null || v.focus();
  } else {
    const v = n[n.indexOf(document.activeElement) + 1] || f;
    v == null || v.focus();
  }
}
function ne(e) {
  var t;
  ((t = s("allowKeyboardControl")) == null || t) && (e.key === "Escape" ? E("escapePress") : e.key === "ArrowRight" ? E("arrowRightPress") : e.key === "ArrowLeft" && E("arrowLeftPress"));
}
function re(e, o, t) {
  const i = (n, f) => {
    const m = n.target;
    e.contains(m) && ((!t || t(m)) && (n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation()), f == null || f(n));
  };
  document.addEventListener("pointerdown", i, !0), document.addEventListener("mousedown", i, !0), document.addEventListener("pointerup", i, !0), document.addEventListener("mouseup", i, !0), document.addEventListener(
    "click",
    (n) => {
      i(n, o);
    },
    !0
  );
}
function ke() {
  window.addEventListener("keyup", ne, !1), window.addEventListener("keydown", Pe, !1), window.addEventListener("resize", O), window.addEventListener("scroll", O);
}
function Le() {
  window.removeEventListener("keyup", ne), window.removeEventListener("resize", O), window.removeEventListener("scroll", O);
}
function Se() {
  const e = l("popover");
  e && (e.wrapper.style.display = "none");
}
function Q(e, o) {
  var T, B;
  let t = l("popover");
  t && document.body.removeChild(t.wrapper), t = Ee(), document.body.appendChild(t.wrapper);
  const {
    title: i,
    description: d,
    showButtons: n,
    disableButtons: f,
    showProgress: m,
    nextBtnText: r = s("nextBtnText") || "Next &rarr;",
    prevBtnText: v = s("prevBtnText") || "&larr; Previous",
    progressText: g = s("progressText") || "{current} of {total}",
    nextBtnClass: P = s("nextBtnClass") || "",
    prevBtnClass: a = s("prevBtnClass") || ""
  } = o.popover || {};
  t.nextButton.innerHTML = r, t.previousButton.innerHTML = v, t.progress.innerHTML = g, P && t.nextButton.classList.add(P), a && t.previousButton.classList.add(a), i ? (t.title.innerHTML = i, t.title.style.display = "block") : t.title.style.display = "none", d ? (t.description.innerHTML = d, t.description.style.display = "block") : t.description.style.display = "none";
  const c = n || s("showButtons"), p = m || s("showProgress") || !1, w = (c == null ? void 0 : c.includes("next")) || (c == null ? void 0 : c.includes("previous")) || p;
  t.closeButton.style.display = c.includes("close") ? "block" : "none", w ? (t.footer.style.display = "flex", t.progress.style.display = p ? "block" : "none", t.nextButton.style.display = c.includes("next") ? "block" : "none", t.previousButton.style.display = c.includes("previous") ? "block" : "none") : t.footer.style.display = "none";
  const u = f || s("disableButtons") || [];
  u != null && u.includes("next") && (t.nextButton.disabled = !0, t.nextButton.classList.add("driver-popover-btn-disabled")), u != null && u.includes("previous") && (t.previousButton.disabled = !0, t.previousButton.classList.add("driver-popover-btn-disabled")), u != null && u.includes("close") && (t.closeButton.disabled = !0, t.closeButton.classList.add("driver-popover-btn-disabled"));
  const h = t.wrapper;
  h.style.display = "block", h.style.left = "", h.style.top = "", h.style.bottom = "", h.style.right = "", h.id = "driver-popover-content", h.setAttribute("role", "dialog"), h.setAttribute("aria-labelledby", "driver-popover-title"), h.setAttribute("aria-describedby", "driver-popover-description");
  const y = t.arrow;
  y.className = "driver-popover-arrow";
  const x = ((T = o.popover) == null ? void 0 : T.popoverClass) || s("popoverClass") || "";
  h.className = `driver-popover ${x}`.trim(), re(
    t.wrapper,
    (_) => {
      var W, I, M;
      const A = _.target, H = ((W = o.popover) == null ? void 0 : W.onNextClick) || s("onNextClick"), $ = ((I = o.popover) == null ? void 0 : I.onPrevClick) || s("onPrevClick"), R = ((M = o.popover) == null ? void 0 : M.onCloseClick) || s("onCloseClick");
      if (A.classList.contains("driver-popover-next-btn"))
        return H ? H(e, o, {
          config: s(),
          state: l(),
          driver: S()
        }) : E("nextClick");
      if (A.classList.contains("driver-popover-prev-btn"))
        return $ ? $(e, o, {
          config: s(),
          state: l(),
          driver: S()
        }) : E("prevClick");
      if (A.classList.contains("driver-popover-close-btn"))
        return R ? R(e, o, {
          config: s(),
          state: l(),
          driver: S()
        }) : E("closeClick");
    },
    (_) => !(t != null && t.description.contains(_)) && !(t != null && t.title.contains(_)) && typeof _.className == "string" && _.className.includes("driver-popover")
  ), k("popover", t);
  const L = ((B = o.popover) == null ? void 0 : B.onPopoverRender) || s("onPopoverRender");
  L && L(t, {
    config: s(),
    state: l(),
    driver: S()
  }), ae(e, o), ee(h);
  const b = e.classList.contains("driver-dummy-element"), C = U([h, ...b ? [] : [e]]);
  C.length > 0 && C[0].focus();
}
function se() {
  const e = l("popover");
  if (!(e != null && e.wrapper))
    return;
  const o = e.wrapper.getBoundingClientRect(), t = s("stagePadding") || 0, i = s("popoverOffset") || 0;
  return {
    width: o.width + t + i,
    height: o.height + t + i,
    realWidth: o.width,
    realHeight: o.height
  };
}
function Z(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: d, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.top - d,
      window.innerHeight - i.realHeight - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.top - (i == null ? void 0 : i.realHeight) + t.height + d,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
    ),
    n.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.top + t.height / 2 - (i == null ? void 0 : i.realHeight) / 2,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
    ),
    n.width
  ) : 0;
}
function G(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: d, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.left - d,
      window.innerWidth - i.realWidth - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.left - (i == null ? void 0 : i.realWidth) + t.width + d,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
    ),
    n.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.left + t.width / 2 - (i == null ? void 0 : i.realWidth) / 2,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
    ),
    n.width
  ) : 0;
}
function ae(e, o) {
  const t = l("popover");
  if (!t)
    return;
  const { align: i = "start", side: d = "left" } = (o == null ? void 0 : o.popover) || {}, n = i, f = e.id === "driver-dummy-element" ? "over" : d, m = s("stagePadding") || 0, r = se(), v = t.arrow.getBoundingClientRect(), g = e.getBoundingClientRect(), P = g.top - r.height;
  let a = P >= 0;
  const c = window.innerHeight - (g.bottom + r.height);
  let p = c >= 0;
  const w = g.left - r.width;
  let u = w >= 0;
  const h = window.innerWidth - (g.right + r.width);
  let y = h >= 0;
  const x = !a && !p && !u && !y;
  let L = f;
  if (f === "top" && a ? y = u = p = !1 : f === "bottom" && p ? y = u = a = !1 : f === "left" && u ? y = a = p = !1 : f === "right" && y && (u = a = p = !1), f === "over") {
    const b = window.innerWidth / 2 - r.realWidth / 2, C = window.innerHeight / 2 - r.realHeight / 2;
    t.wrapper.style.left = `${b}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${C}px`, t.wrapper.style.bottom = "auto";
  } else if (x) {
    const b = window.innerWidth / 2 - (r == null ? void 0 : r.realWidth) / 2, C = 10;
    t.wrapper.style.left = `${b}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${C}px`, t.wrapper.style.top = "auto";
  } else if (u) {
    const b = Math.min(
      w,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
    ), C = Z(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: m,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${b}px`, t.wrapper.style.top = `${C}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", L = "left";
  } else if (y) {
    const b = Math.min(
      h,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
    ), C = Z(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: m,
      popoverArrowDimensions: v
    });
    t.wrapper.style.right = `${b}px`, t.wrapper.style.top = `${C}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", L = "right";
  } else if (a) {
    const b = Math.min(
      P,
      window.innerHeight - r.realHeight - v.width
    );
    let C = G(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: m,
      popoverArrowDimensions: v
    });
    t.wrapper.style.top = `${b}px`, t.wrapper.style.left = `${C}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", L = "top";
  } else if (p) {
    const b = Math.min(
      c,
      window.innerHeight - (r == null ? void 0 : r.realHeight) - v.width
    );
    let C = G(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: m,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${C}px`, t.wrapper.style.bottom = `${b}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", L = "bottom";
  }
  x ? t.arrow.classList.add("driver-popover-arrow-none") : _e(n, L, e);
}
function _e(e, o, t) {
  const i = l("popover");
  if (!i)
    return;
  const d = t.getBoundingClientRect(), n = se(), f = i.arrow, m = n.width, r = window.innerWidth, v = d.width, g = d.left, P = n.height, a = window.innerHeight, c = d.top, p = d.height;
  f.className = "driver-popover-arrow";
  let w = o, u = e;
  if (o === "top" ? (g + v <= 0 ? (w = "right", u = "end") : g + v - m <= 0 && (w = "top", u = "start"), g >= r ? (w = "left", u = "end") : g + m >= r && (w = "top", u = "end")) : o === "bottom" ? (g + v <= 0 ? (w = "right", u = "start") : g + v - m <= 0 && (w = "bottom", u = "start"), g >= r ? (w = "left", u = "start") : g + m >= r && (w = "bottom", u = "end")) : o === "left" ? (c + p <= 0 ? (w = "bottom", u = "end") : c + p - P <= 0 && (w = "left", u = "start"), c >= a ? (w = "top", u = "end") : c + P >= a && (w = "left", u = "end")) : o === "right" && (c + p <= 0 ? (w = "bottom", u = "start") : c + p - P <= 0 && (w = "right", u = "start"), c >= a ? (w = "top", u = "start") : c + P >= a && (w = "right", u = "end")), !w)
    f.classList.add("driver-popover-arrow-none");
  else {
    f.classList.add(`driver-popover-arrow-side-${w}`), f.classList.add(`driver-popover-arrow-align-${u}`);
    const h = t.getBoundingClientRect(), y = f.getBoundingClientRect(), x = s("stagePadding") || 0, L = h.left - x < window.innerWidth && h.right + x > 0 && h.top - x < window.innerHeight && h.bottom + x > 0;
    o === "bottom" && L && (y.x > h.x && y.x + y.width < h.x + h.width ? i.wrapper.style.transform = "translateY(0)" : (f.classList.remove(`driver-popover-arrow-align-${u}`), f.classList.add("driver-popover-arrow-none"), i.wrapper.style.transform = `translateY(-${x / 2}px)`));
  }
}
function Ee() {
  const e = document.createElement("div");
  e.classList.add("driver-popover");
  const o = document.createElement("div");
  o.classList.add("driver-popover-arrow");
  const t = document.createElement("header");
  t.id = "driver-popover-title", t.classList.add("driver-popover-title"), t.style.display = "none", t.innerText = "Popover Title";
  const i = document.createElement("div");
  i.id = "driver-popover-description", i.classList.add("driver-popover-description"), i.style.display = "none", i.innerText = "Popover description is here";
  const d = document.createElement("button");
  d.type = "button", d.classList.add("driver-popover-close-btn"), d.setAttribute("aria-label", "Close"), d.innerHTML = "&times;";
  const n = document.createElement("footer");
  n.classList.add("driver-popover-footer");
  const f = document.createElement("span");
  f.classList.add("driver-popover-progress-text"), f.innerText = "";
  const m = document.createElement("span");
  m.classList.add("driver-popover-navigation-btns");
  const r = document.createElement("button");
  r.type = "button", r.classList.add("driver-popover-prev-btn"), r.innerHTML = "&larr; Previous";
  const v = document.createElement("button");
  return v.type = "button", v.classList.add("driver-popover-next-btn"), v.innerHTML = "Next &rarr;", m.appendChild(r), m.appendChild(v), n.appendChild(f), n.appendChild(m), e.appendChild(d), e.appendChild(o), e.appendChild(t), e.appendChild(i), e.appendChild(n), {
    wrapper: e,
    arrow: o,
    title: t,
    description: i,
    footer: n,
    previousButton: r,
    nextButton: v,
    closeButton: d,
    footerButtons: m,
    progress: f
  };
}
function Te() {
  var o;
  const e = l("popover");
  e && ((o = e.wrapper.parentElement) == null || o.removeChild(e.wrapper));
}
function Ae(e = {}) {
  V(e);
  function o() {
    s("allowClose") && g();
  }
  function t() {
    const a = s("overlayClickBehavior");
    if (s("allowClose") && a === "close") {
      g();
      return;
    }
    a === "nextStep" && i();
  }
  function i() {
    const a = l("activeIndex"), c = s("steps") || [];
    if (typeof a == "undefined")
      return;
    const p = a + 1;
    c[p] ? v(p) : g();
  }
  function d() {
    const a = l("activeIndex"), c = s("steps") || [];
    if (typeof a == "undefined")
      return;
    const p = a - 1;
    c[p] ? v(p) : g();
  }
  function n(a) {
    (s("steps") || [])[a] ? v(a) : g();
  }
  function f() {
    var y;
    if (l("__transitionCallback"))
      return;
    const c = l("activeIndex"), p = l("__activeStep"), w = l("__activeElement");
    if (typeof c == "undefined" || typeof p == "undefined" || typeof l("activeIndex") == "undefined")
      return;
    const h = ((y = p.popover) == null ? void 0 : y.onPrevClick) || s("onPrevClick");
    if (h)
      return h(w, p, {
        config: s(),
        state: l(),
        driver: S()
      });
    d();
  }
  function m() {
    var h;
    if (l("__transitionCallback"))
      return;
    const c = l("activeIndex"), p = l("__activeStep"), w = l("__activeElement");
    if (typeof c == "undefined" || typeof p == "undefined")
      return;
    const u = ((h = p.popover) == null ? void 0 : h.onNextClick) || s("onNextClick");
    if (u)
      return u(w, p, {
        config: s(),
        state: l(),
        driver: S()
      });
    i();
  }
  function r() {
    l("isInitialized") || (k("isInitialized", !0), document.body.classList.add("driver-active", s("animate") ? "driver-fade" : "driver-simple"), ke(), D("overlayClick", t), D("escapePress", o), D("arrowLeftPress", f), D("arrowRightPress", m));
  }
  function v(a = 0) {
    var H, $, R, W, I, M, K, Y;
    const c = s("steps");
    if (!c) {
      console.error("No steps to drive through"), g();
      return;
    }
    if (!c[a]) {
      g();
      return;
    }
    k("__activeOnDestroyed", document.activeElement), k("activeIndex", a);
    const p = c[a], w = c[a + 1], u = c[a - 1], h = ((H = p.popover) == null ? void 0 : H.doneBtnText) || s("doneBtnText") || "Done", y = s("allowClose"), x = typeof (($ = p.popover) == null ? void 0 : $.showProgress) != "undefined" ? (R = p.popover) == null ? void 0 : R.showProgress : s("showProgress"), b = (((W = p.popover) == null ? void 0 : W.progressText) || s("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${a + 1}`).replace("{{total}}", `${c.length}`), C = ((I = p.popover) == null ? void 0 : I.showButtons) || s("showButtons"), T = [
      "next",
      "previous",
      ...y ? ["close"] : []
    ].filter((ce) => !(C != null && C.length) || C.includes(ce)), B = ((M = p.popover) == null ? void 0 : M.onNextClick) || s("onNextClick"), _ = ((K = p.popover) == null ? void 0 : K.onPrevClick) || s("onPrevClick"), A = ((Y = p.popover) == null ? void 0 : Y.onCloseClick) || s("onCloseClick");
    j({
      ...p,
      popover: {
        showButtons: T,
        nextBtnText: w ? void 0 : h,
        nextBtnClass: w ? "" : "driver-popover-done-btn",
        disableButtons: [...u ? [] : ["previous"]],
        showProgress: x,
        progressText: b,
        onNextClick: B || (() => {
          w ? v(a + 1) : g();
        }),
        onPrevClick: _ || (() => {
          v(a - 1);
        }),
        onCloseClick: A || (() => {
          g();
        }),
        ...(p == null ? void 0 : p.popover) || {}
      }
    });
  }
  function g(a = !0) {
    const c = l("__activeElement"), p = l("__activeStep"), w = l("__activeOnDestroyed"), u = s("onDestroyStarted");
    if (a && u) {
      const x = !c || (c == null ? void 0 : c.id) === "driver-dummy-element";
      u(x ? void 0 : c, p, {
        config: s(),
        state: l(),
        driver: S()
      });
      return;
    }
    const h = (p == null ? void 0 : p.onDeselected) || s("onDeselected"), y = s("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), Le(), Te(), Ce(), me(), de(), X(), c && p) {
      const x = c.id === "driver-dummy-element";
      h && h(x ? void 0 : c, p, {
        config: s(),
        state: l(),
        driver: S()
      }), y && y(x ? void 0 : c, p, {
        config: s(),
        state: l(),
        driver: S()
      });
    }
    w && w.focus();
  }
  const P = {
    isActive: () => l("isInitialized") || !1,
    refresh: O,
    drive: (a = 0) => {
      r(), v(a);
    },
    setConfig: V,
    setSteps: (a) => {
      X(), V({
        ...s(),
        steps: a
      });
    },
    getConfig: s,
    getState: l,
    getActiveIndex: () => l("activeIndex"),
    isFirstStep: () => l("activeIndex") === 0,
    isLastStep: () => {
      const a = s("steps") || [], c = l("activeIndex");
      return c !== void 0 && c === a.length - 1;
    },
    getActiveStep: () => l("activeStep"),
    getActiveElement: () => l("activeElement"),
    getPreviousElement: () => l("previousElement"),
    getPreviousStep: () => l("previousStep"),
    moveNext: i,
    movePrevious: d,
    moveTo: n,
    hasNextStep: () => {
      const a = s("steps") || [], c = l("activeIndex");
      return c !== void 0 && !!a[c + 1];
    },
    hasPreviousStep: () => {
      const a = s("steps") || [], c = l("activeIndex");
      return c !== void 0 && !!a[c - 1];
    },
    highlight: (a) => {
      r(), j({
        ...a,
        popover: a.popover ? {
          showButtons: [],
          showProgress: !1,
          progressText: "",
          ...a.popover
        } : void 0
      });
    },
    destroy: () => {
      g(!1);
    }
  };
  return le(P), P;
}
export {
  Ae as driver
};
