let V = {}, J;
function z(e = {}) {
  V = {
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
function a(e) {
  return e ? V[e] : V;
}
function le(e) {
  J = e;
}
function S() {
  return J;
}
let M = {};
function O(e, o) {
  M[e] = o;
}
function E(e) {
  var o;
  (o = M[e]) == null || o.call(M);
}
function de() {
  M = {};
}
function D(e, o, t, i) {
  return (e /= i / 2) < 1 ? t / 2 * e * e + o : -t / 2 * (--e * (e - 2) - 1) + o;
}
function U(e) {
  const o = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return e.flatMap((t) => {
    const i = t.matches(o), l = Array.from(t.querySelectorAll(o));
    return [...i ? [t] : [], ...l];
  }).filter((t) => getComputedStyle(t).pointerEvents !== "none" && ve(t));
}
function ee(e) {
  if (!e || ue(e))
    return;
  const o = a("smoothScroll"), t = e.offsetHeight > window.innerHeight;
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
let F = {};
function k(e, o) {
  F[e] = o;
}
function c(e) {
  return e ? F[e] : F;
}
function X() {
  F = {};
}
function fe(e, o, t, i) {
  let l = c("__activeStagePosition");
  const n = l || t.getBoundingClientRect(), h = i.getBoundingClientRect(), w = D(e, n.x, h.x - n.x, o), r = D(e, n.y, h.y - n.y, o), f = D(e, n.width, h.width - n.width, o), g = D(e, n.height, h.height - n.height, o);
  l = {
    x: w,
    y: r,
    width: f,
    height: g
  }, oe(l), k("__activeStagePosition", l);
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
  const e = c("__activeStagePosition"), o = c("__overlaySvg");
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
  const o = c("__overlaySvg");
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
  const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return l.setAttribute("d", ie(e)), l.style.fill = a("overlayColor") || "rgb(0,0,0)", l.style.opacity = `${a("overlayOpacity")}`, l.style.pointerEvents = "auto", l.style.cursor = "auto", i.appendChild(l), i;
}
function ie(e) {
  const o = window.innerWidth, t = window.innerHeight, i = a("stagePadding") || 0, l = a("stageRadius") || 0, n = e.width + i * 2, h = e.height + i * 2, w = Math.min(l, n / 2, h / 2), r = Math.floor(Math.max(w, 0)), f = e.x - i + r, g = e.y - i, P = n - r * 2, s = h - r * 2;
  return `M${o},0L0,0L0,${t}L${o},${t}L${o},0Z
    M${f},${g} h${P} a${r},${r} 0 0 1 ${r},${r} v${s} a${r},${r} 0 0 1 -${r},${r} h-${P} a${r},${r} 0 0 1 -${r},-${r} v-${s} a${r},${r} 0 0 1 ${r},-${r} z`;
}
function me() {
  const e = c("__overlaySvg");
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
  const e = c("__activeElement"), o = c("__activeStep");
  e && (te(e), he(), ae(e, o));
}
function be(e, o) {
  var x;
  const i = Date.now(), l = c("__activeStep"), n = c("__activeElement") || e, h = !n || n === e, w = e.id === "driver-dummy-element", r = n.id === "driver-dummy-element", f = a("animate"), g = o.onHighlightStarted || a("onHighlightStarted"), P = (o == null ? void 0 : o.onHighlighted) || a("onHighlighted"), s = (l == null ? void 0 : l.onDeselected) || a("onDeselected"), d = a(), p = c();
  !h && s && s(r ? void 0 : n, l, {
    config: d,
    state: p,
    driver: S()
  }), g && g(w ? void 0 : e, o, {
    config: d,
    state: p,
    driver: S()
  });
  const v = !h && f;
  let u = !1;
  Le(), k("previousStep", l), k("previousElement", n), k("activeStep", o), k("activeElement", e);
  const m = () => {
    if (c("__transitionCallback") !== m)
      return;
    const b = Date.now() - i, T = 400 - b <= 400 / 2;
    o.popover && T && !u && v && (Q(e, o), u = !0), a("animate") && b < 400 ? fe(b, 400, n, e) : (te(e), P && P(w ? void 0 : e, o, {
      config: a(),
      state: c(),
      driver: S()
    }), k("__transitionCallback", void 0), k("__previousStep", l), k("__previousElement", n), k("__activeStep", o), k("__activeElement", e)), window.requestAnimationFrame(m);
  };
  k("__transitionCallback", m), window.requestAnimationFrame(m), ee(e), !v && o.popover && Q(e, o), n.classList.remove("driver-active-element", "driver-no-interaction"), n.removeAttribute("aria-haspopup"), n.removeAttribute("aria-expanded"), n.removeAttribute("aria-controls"), ((x = o.disableActiveInteraction) != null ? x : a("disableActiveInteraction")) && e.classList.add("driver-no-interaction"), e.classList.add("driver-active-element"), e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", "true"), e.setAttribute("aria-controls", "driver-popover-content");
}
function Ce() {
  var e;
  (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((o) => {
    o.classList.remove("driver-active-element", "driver-no-interaction"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls");
  });
}
function N() {
  const e = c("__resizeTimeout");
  e && window.cancelAnimationFrame(e), k("__resizeTimeout", window.requestAnimationFrame(xe));
}
function Pe(e) {
  var r;
  if (!c("isInitialized") || !(e.key === "Tab" || e.keyCode === 9))
    return;
  const i = c("__activeElement"), l = (r = c("popover")) == null ? void 0 : r.wrapper, n = U([
    ...l ? [l] : [],
    ...i ? [i] : []
  ]), h = n[0], w = n[n.length - 1];
  if (e.preventDefault(), e.shiftKey) {
    const f = n[n.indexOf(document.activeElement) - 1] || w;
    f == null || f.focus();
  } else {
    const f = n[n.indexOf(document.activeElement) + 1] || h;
    f == null || f.focus();
  }
}
function ne(e) {
  var t;
  ((t = a("allowKeyboardControl")) == null || t) && (e.key === "Escape" ? E("escapePress") : e.key === "ArrowRight" ? E("arrowRightPress") : e.key === "ArrowLeft" && E("arrowLeftPress"));
}
function re(e, o, t) {
  const i = (n, h) => {
    const w = n.target;
    e.contains(w) && ((!t || t(w)) && (n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation()), h == null || h(n));
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
  window.addEventListener("keyup", ne, !1), window.addEventListener("keydown", Pe, !1), window.addEventListener("resize", N), window.addEventListener("scroll", N);
}
function Se() {
  window.removeEventListener("keyup", ne), window.removeEventListener("resize", N), window.removeEventListener("scroll", N);
}
function Le() {
  const e = c("popover");
  e && (e.wrapper.style.display = "none");
}
function Q(e, o) {
  var C, T;
  let t = c("popover");
  t && document.body.removeChild(t.wrapper), t = Ee(), document.body.appendChild(t.wrapper);
  const {
    title: i,
    description: l,
    showButtons: n,
    disableButtons: h,
    showProgress: w,
    nextBtnText: r = a("nextBtnText") || "Next &rarr;",
    prevBtnText: f = a("prevBtnText") || "&larr; Previous",
    progressText: g = a("progressText") || "{current} of {total}",
    nextBtnClass: P = a("nextBtnClass") || ""
  } = o.popover || {};
  t.nextButton.innerHTML = r, t.previousButton.innerHTML = f, t.progress.innerHTML = g, P && t.nextButton.classList.add(P), i ? (t.title.innerHTML = i, t.title.style.display = "block") : t.title.style.display = "none", l ? (t.description.innerHTML = l, t.description.style.display = "block") : t.description.style.display = "none";
  const s = n || a("showButtons"), d = w || a("showProgress") || !1, p = (s == null ? void 0 : s.includes("next")) || (s == null ? void 0 : s.includes("previous")) || d;
  t.closeButton.style.display = s.includes("close") ? "block" : "none", p ? (t.footer.style.display = "flex", t.progress.style.display = d ? "block" : "none", t.nextButton.style.display = s.includes("next") ? "block" : "none", t.previousButton.style.display = s.includes("previous") ? "block" : "none") : t.footer.style.display = "none";
  const v = h || a("disableButtons") || [];
  v != null && v.includes("next") && (t.nextButton.disabled = !0, t.nextButton.classList.add("driver-popover-btn-disabled")), v != null && v.includes("previous") && (t.previousButton.disabled = !0, t.previousButton.classList.add("driver-popover-btn-disabled")), v != null && v.includes("close") && (t.closeButton.disabled = !0, t.closeButton.classList.add("driver-popover-btn-disabled"));
  const u = t.wrapper;
  u.style.display = "block", u.style.left = "", u.style.top = "", u.style.bottom = "", u.style.right = "", u.id = "driver-popover-content", u.setAttribute("role", "dialog"), u.setAttribute("aria-labelledby", "driver-popover-title"), u.setAttribute("aria-describedby", "driver-popover-description");
  const m = t.arrow;
  m.className = "driver-popover-arrow";
  const y = ((C = o.popover) == null ? void 0 : C.popoverClass) || a("popoverClass") || "";
  u.className = `driver-popover ${y}`.trim(), re(
    t.wrapper,
    (_) => {
      var R, W, I;
      const A = _.target, B = ((R = o.popover) == null ? void 0 : R.onNextClick) || a("onNextClick"), H = ((W = o.popover) == null ? void 0 : W.onPrevClick) || a("onPrevClick"), $ = ((I = o.popover) == null ? void 0 : I.onCloseClick) || a("onCloseClick");
      if (A.classList.contains("driver-popover-next-btn"))
        return B ? B(e, o, {
          config: a(),
          state: c(),
          driver: S()
        }) : E("nextClick");
      if (A.classList.contains("driver-popover-prev-btn"))
        return H ? H(e, o, {
          config: a(),
          state: c(),
          driver: S()
        }) : E("prevClick");
      if (A.classList.contains("driver-popover-close-btn"))
        return $ ? $(e, o, {
          config: a(),
          state: c(),
          driver: S()
        }) : E("closeClick");
    },
    (_) => !(t != null && t.description.contains(_)) && !(t != null && t.title.contains(_)) && typeof _.className == "string" && _.className.includes("driver-popover")
  ), k("popover", t);
  const x = ((T = o.popover) == null ? void 0 : T.onPopoverRender) || a("onPopoverRender");
  x && x(t, {
    config: a(),
    state: c(),
    driver: S()
  }), ae(e, o), ee(u);
  const L = e.classList.contains("driver-dummy-element"), b = U([u, ...L ? [] : [e]]);
  b.length > 0 && b[0].focus();
}
function se() {
  const e = c("popover");
  if (!(e != null && e.wrapper))
    return;
  const o = e.wrapper.getBoundingClientRect(), t = a("stagePadding") || 0, i = a("popoverOffset") || 0;
  return {
    width: o.width + t + i,
    height: o.height + t + i,
    realWidth: o.width,
    realHeight: o.height
  };
}
function Z(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: l, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.top - l,
      window.innerHeight - i.realHeight - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.top - (i == null ? void 0 : i.realHeight) + t.height + l,
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
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: l, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.left - l,
      window.innerWidth - i.realWidth - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.left - (i == null ? void 0 : i.realWidth) + t.width + l,
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
  const t = c("popover");
  if (!t)
    return;
  const { align: i = "start", side: l = "left" } = (o == null ? void 0 : o.popover) || {}, n = i, h = e.id === "driver-dummy-element" ? "over" : l, w = a("stagePadding") || 0, r = se(), f = t.arrow.getBoundingClientRect(), g = e.getBoundingClientRect(), P = g.top - r.height;
  let s = P >= 0;
  const d = window.innerHeight - (g.bottom + r.height);
  let p = d >= 0;
  const v = g.left - r.width;
  let u = v >= 0;
  const m = window.innerWidth - (g.right + r.width);
  let y = m >= 0;
  const x = !s && !p && !u && !y;
  let L = h;
  if (h === "top" && s ? y = u = p = !1 : h === "bottom" && p ? y = u = s = !1 : h === "left" && u ? y = s = p = !1 : h === "right" && y && (u = s = p = !1), h === "over") {
    const b = window.innerWidth / 2 - r.realWidth / 2, C = window.innerHeight / 2 - r.realHeight / 2;
    t.wrapper.style.left = `${b}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${C}px`, t.wrapper.style.bottom = "auto";
  } else if (x) {
    const b = window.innerWidth / 2 - (r == null ? void 0 : r.realWidth) / 2, C = 10;
    t.wrapper.style.left = `${b}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${C}px`, t.wrapper.style.top = "auto";
  } else if (u) {
    const b = Math.min(
      v,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - f.width
    ), C = Z(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: f
    });
    t.wrapper.style.left = `${b}px`, t.wrapper.style.top = `${C}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", L = "left";
  } else if (y) {
    const b = Math.min(
      m,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - f.width
    ), C = Z(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: f
    });
    t.wrapper.style.right = `${b}px`, t.wrapper.style.top = `${C}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", L = "right";
  } else if (s) {
    const b = Math.min(
      P,
      window.innerHeight - r.realHeight - f.width
    );
    let C = G(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: f
    });
    t.wrapper.style.top = `${b}px`, t.wrapper.style.left = `${C}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", L = "top";
  } else if (p) {
    const b = Math.min(
      d,
      window.innerHeight - (r == null ? void 0 : r.realHeight) - f.width
    );
    let C = G(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: f
    });
    t.wrapper.style.left = `${C}px`, t.wrapper.style.bottom = `${b}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", L = "bottom";
  }
  x ? t.arrow.classList.add("driver-popover-arrow-none") : _e(n, L, e);
}
function _e(e, o, t) {
  const i = c("popover");
  if (!i)
    return;
  const l = t.getBoundingClientRect(), n = se(), h = i.arrow, w = n.width, r = window.innerWidth, f = l.width, g = l.left, P = n.height, s = window.innerHeight, d = l.top, p = l.height;
  h.className = "driver-popover-arrow";
  let v = o, u = e;
  if (o === "top" ? (g + f <= 0 ? (v = "right", u = "end") : g + f - w <= 0 && (v = "top", u = "start"), g >= r ? (v = "left", u = "end") : g + w >= r && (v = "top", u = "end")) : o === "bottom" ? (g + f <= 0 ? (v = "right", u = "start") : g + f - w <= 0 && (v = "bottom", u = "start"), g >= r ? (v = "left", u = "start") : g + w >= r && (v = "bottom", u = "end")) : o === "left" ? (d + p <= 0 ? (v = "bottom", u = "end") : d + p - P <= 0 && (v = "left", u = "start"), d >= s ? (v = "top", u = "end") : d + P >= s && (v = "left", u = "end")) : o === "right" && (d + p <= 0 ? (v = "bottom", u = "start") : d + p - P <= 0 && (v = "right", u = "start"), d >= s ? (v = "top", u = "start") : d + P >= s && (v = "right", u = "end")), !v)
    h.classList.add("driver-popover-arrow-none");
  else {
    h.classList.add(`driver-popover-arrow-side-${v}`), h.classList.add(`driver-popover-arrow-align-${u}`);
    const m = t.getBoundingClientRect(), y = h.getBoundingClientRect(), x = a("stagePadding") || 0, L = m.left - x < window.innerWidth && m.right + x > 0 && m.top - x < window.innerHeight && m.bottom + x > 0;
    o === "bottom" && L && (y.x > m.x && y.x + y.width < m.x + m.width ? i.wrapper.style.transform = "translateY(0)" : (h.classList.remove(`driver-popover-arrow-align-${u}`), h.classList.add("driver-popover-arrow-none"), i.wrapper.style.transform = `translateY(-${x / 2}px)`));
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
  const l = document.createElement("button");
  l.type = "button", l.classList.add("driver-popover-close-btn"), l.setAttribute("aria-label", "Close"), l.innerHTML = "&times;";
  const n = document.createElement("footer");
  n.classList.add("driver-popover-footer");
  const h = document.createElement("span");
  h.classList.add("driver-popover-progress-text"), h.innerText = "";
  const w = document.createElement("span");
  w.classList.add("driver-popover-navigation-btns");
  const r = document.createElement("button");
  r.type = "button", r.classList.add("driver-popover-prev-btn"), r.innerHTML = "&larr; Previous";
  const f = document.createElement("button");
  return f.type = "button", f.classList.add("driver-popover-next-btn"), f.innerHTML = "Next &rarr;", w.appendChild(r), w.appendChild(f), n.appendChild(h), n.appendChild(w), e.appendChild(l), e.appendChild(o), e.appendChild(t), e.appendChild(i), e.appendChild(n), {
    wrapper: e,
    arrow: o,
    title: t,
    description: i,
    footer: n,
    previousButton: r,
    nextButton: f,
    closeButton: l,
    footerButtons: w,
    progress: h
  };
}
function Te() {
  var o;
  const e = c("popover");
  e && ((o = e.wrapper.parentElement) == null || o.removeChild(e.wrapper));
}
function Ae(e = {}) {
  z(e);
  function o() {
    a("allowClose") && g();
  }
  function t() {
    const s = a("overlayClickBehavior");
    if (a("allowClose") && s === "close") {
      g();
      return;
    }
    s === "nextStep" && i();
  }
  function i() {
    const s = c("activeIndex"), d = a("steps") || [];
    if (typeof s == "undefined")
      return;
    const p = s + 1;
    d[p] ? f(p) : g();
  }
  function l() {
    const s = c("activeIndex"), d = a("steps") || [];
    if (typeof s == "undefined")
      return;
    const p = s - 1;
    d[p] ? f(p) : g();
  }
  function n(s) {
    (a("steps") || [])[s] ? f(s) : g();
  }
  function h() {
    var y;
    if (c("__transitionCallback"))
      return;
    const d = c("activeIndex"), p = c("__activeStep"), v = c("__activeElement");
    if (typeof d == "undefined" || typeof p == "undefined" || typeof c("activeIndex") == "undefined")
      return;
    const m = ((y = p.popover) == null ? void 0 : y.onPrevClick) || a("onPrevClick");
    if (m)
      return m(v, p, {
        config: a(),
        state: c(),
        driver: S()
      });
    l();
  }
  function w() {
    var m;
    if (c("__transitionCallback"))
      return;
    const d = c("activeIndex"), p = c("__activeStep"), v = c("__activeElement");
    if (typeof d == "undefined" || typeof p == "undefined")
      return;
    const u = ((m = p.popover) == null ? void 0 : m.onNextClick) || a("onNextClick");
    if (u)
      return u(v, p, {
        config: a(),
        state: c(),
        driver: S()
      });
    i();
  }
  function r() {
    c("isInitialized") || (k("isInitialized", !0), document.body.classList.add("driver-active", a("animate") ? "driver-fade" : "driver-simple"), ke(), O("overlayClick", t), O("escapePress", o), O("arrowLeftPress", h), O("arrowRightPress", w));
  }
  function f(s = 0) {
    var H, $, R, W, I, q, K, Y;
    const d = a("steps");
    if (!d) {
      console.error("No steps to drive through"), g();
      return;
    }
    if (!d[s]) {
      g();
      return;
    }
    k("__activeOnDestroyed", document.activeElement), k("activeIndex", s);
    const p = d[s], v = d[s + 1], u = d[s - 1], m = ((H = p.popover) == null ? void 0 : H.doneBtnText) || a("doneBtnText") || "Done", y = a("allowClose"), x = typeof (($ = p.popover) == null ? void 0 : $.showProgress) != "undefined" ? (R = p.popover) == null ? void 0 : R.showProgress : a("showProgress"), b = (((W = p.popover) == null ? void 0 : W.progressText) || a("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${s + 1}`).replace("{{total}}", `${d.length}`), C = ((I = p.popover) == null ? void 0 : I.showButtons) || a("showButtons"), T = [
      "next",
      "previous",
      ...y ? ["close"] : []
    ].filter((ce) => !(C != null && C.length) || C.includes(ce)), _ = ((q = p.popover) == null ? void 0 : q.onNextClick) || a("onNextClick"), A = ((K = p.popover) == null ? void 0 : K.onPrevClick) || a("onPrevClick"), B = ((Y = p.popover) == null ? void 0 : Y.onCloseClick) || a("onCloseClick");
    j({
      ...p,
      popover: {
        showButtons: T,
        nextBtnText: v ? void 0 : m,
        nextBtnClass: v ? "" : "driver-popover-done-btn",
        disableButtons: [...u ? [] : ["previous"]],
        showProgress: x,
        progressText: b,
        onNextClick: _ || (() => {
          v ? f(s + 1) : g();
        }),
        onPrevClick: A || (() => {
          f(s - 1);
        }),
        onCloseClick: B || (() => {
          g();
        }),
        ...(p == null ? void 0 : p.popover) || {}
      }
    });
  }
  function g(s = !0) {
    const d = c("__activeElement"), p = c("__activeStep"), v = c("__activeOnDestroyed"), u = a("onDestroyStarted");
    if (s && u) {
      const x = !d || (d == null ? void 0 : d.id) === "driver-dummy-element";
      u(x ? void 0 : d, p, {
        config: a(),
        state: c(),
        driver: S()
      });
      return;
    }
    const m = (p == null ? void 0 : p.onDeselected) || a("onDeselected"), y = a("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), Se(), Te(), Ce(), me(), de(), X(), d && p) {
      const x = d.id === "driver-dummy-element";
      m && m(x ? void 0 : d, p, {
        config: a(),
        state: c(),
        driver: S()
      }), y && y(x ? void 0 : d, p, {
        config: a(),
        state: c(),
        driver: S()
      });
    }
    v && v.focus();
  }
  const P = {
    isActive: () => c("isInitialized") || !1,
    refresh: N,
    drive: (s = 0) => {
      r(), f(s);
    },
    setConfig: z,
    setSteps: (s) => {
      X(), z({
        ...a(),
        steps: s
      });
    },
    getConfig: a,
    getState: c,
    getActiveIndex: () => c("activeIndex"),
    isFirstStep: () => c("activeIndex") === 0,
    isLastStep: () => {
      const s = a("steps") || [], d = c("activeIndex");
      return d !== void 0 && d === s.length - 1;
    },
    getActiveStep: () => c("activeStep"),
    getActiveElement: () => c("activeElement"),
    getPreviousElement: () => c("previousElement"),
    getPreviousStep: () => c("previousStep"),
    moveNext: i,
    movePrevious: l,
    moveTo: n,
    hasNextStep: () => {
      const s = a("steps") || [], d = c("activeIndex");
      return d !== void 0 && !!s[d + 1];
    },
    hasPreviousStep: () => {
      const s = a("steps") || [], d = c("activeIndex");
      return d !== void 0 && !!s[d - 1];
    },
    highlight: (s) => {
      r(), j({
        ...s,
        popover: s.popover ? {
          showButtons: [],
          showProgress: !1,
          progressText: "",
          ...s.popover
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
