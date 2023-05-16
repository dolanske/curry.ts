var O = Object.defineProperty;
var H = (t, e, n) => e in t ? O(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var r = (t, e, n) => (H(t, typeof e != "symbol" ? e + "" : e, n), n);
const A = function(t, e) {
  return this.queue(() => {
    for (const n of this.nodes)
      if (t)
        switch (e) {
          case "prepend": {
            n.textContent = String(t) + n.textContent;
            break;
          }
          case "append": {
            n.textContent = n.textContent + String(t);
            break;
          }
          default:
            n.textContent = String(t);
        }
  }), this;
}, L = "data-curry-";
function a(t) {
  return t ? Array.isArray(t) : !1;
}
function _(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function I(t) {
  return t && {}.toString.call(t) === "[object Function]";
}
function E(t) {
  return t == null;
}
function S(t) {
  if (!t || !t.previousElementSibling)
    return 0;
  let e = 0, n = t;
  for (; (n = n.previousElementSibling) != null; )
    e++;
  return e;
}
function P(t, e, n) {
  return this.queue(() => {
    const i = t === "next" ? "nextElementSibling" : "previousElementSibling";
    typeof e != "number" && (n = e, e = void 0);
    const s = [];
    for (const o of this.nodes) {
      const c = o, f = c[i];
      if (!e || e === 1)
        f && (s.push(f), n && n.apply(f, [{
          self: f,
          prev: c,
          index: S(f),
          instance: this
        }]));
      else {
        let h = c;
        for (let y = 0; y < e; y++)
          h && (h = h[i]);
        h && (s.push(h), n && n.apply(h, [{
          self: h,
          prev: c,
          index: S(c),
          instance: this
        }]));
      }
    }
    this.nodes = s;
  }), this;
}
function F(t) {
  const e = document.createElement("div");
  return e.insertAdjacentHTML("beforeend", t), e.children[0];
}
function $(t = 1) {
  return new Promise((e) => setTimeout(e, t));
}
function C(t, e) {
  if (typeof t == "string") {
    let n;
    return e ? n = e.querySelectorAll(t) : n = document.querySelectorAll(t), Array.from(n);
  }
  return t instanceof HTMLCollection ? Array.from(t) : t instanceof Node ? [t] : t instanceof l ? t.nodes : t;
}
const m = (t) => L + t;
function M(t) {
  return this.queue(() => {
    if (this.nodes.length === 0)
      return;
    if (!t)
      return this.nodes;
    const e = [];
    for (const n of this.nodes)
      n && e.push(Reflect.get(n, t));
    return e.length === 1 ? e[0] : e;
  });
}
const N = function(t, e = "every") {
  const n = [];
  for (const i of this.nodes) {
    const s = i;
    if (a(t))
      for (const o of t)
        n.push(s.matches && s.matches(o));
    else
      s.matches && s.matches(t) ? n.push(!0) : n.push(!1);
  }
  switch (e) {
    case "some":
      return n.some((i) => i);
    case "none":
      return !n.some((i) => i);
    case "every":
      return n.every((i) => i);
  }
}, R = function(t, e, n) {
  return this.queue(async () => {
    const i = [];
    for (const s of this.nodes)
      i.push(new Promise((o) => {
        s.addEventListener(
          t,
          (c) => {
            o(!0), e && e.apply(s, [c, this]);
          },
          n
        );
      }));
    return Promise.allSettled(i);
  }), this;
}, D = function(t) {
  return this.queue(async () => {
    const e = [];
    for (const n of this.nodes)
      e.push(new Promise((i) => {
        u(n).on("click", (s) => {
          i(!0), t && t.apply(n, [s, this]);
        });
      }));
    return Promise.allSettled(e);
  }), this;
}, Q = function(t) {
  this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      if (t && !u(n).is(t))
        return;
      n.remove();
    }
  });
}, U = function(t, e) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const i = n;
      E(e) ? Object.assign(i.style, t) : typeof t == "string" && i.style.setProperty(t, String(e));
    }
  }), this;
}, B = function(t) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      t = typeof t == "string" ? [t] : t, n.classList.add(...t);
    }
  }), this;
}, K = function(t) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      t = typeof t == "string" ? [t] : t, n.classList.remove(...t);
    }
  }), this;
}, W = function(t) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      t = typeof t == "string" ? [t] : t;
      for (const i of t)
        n.classList.toggle(i);
    }
  }), this;
}, k = function(t, e = "every") {
  const n = [], i = typeof t == "string" ? [t] : t;
  for (const s of this.nodes) {
    const o = s;
    n.push(i.some((c) => o.classList.contains(c)));
  }
  switch (e) {
    case "some":
      return n.some((s) => s);
    case "every":
      return n.every((s) => s);
    case "none":
      return !n.some((s) => s);
  }
}, z = function(t) {
  return this.queue(() => {
    this.nodes.forEach((e, n) => {
      t.apply(e, [
        {
          index: n,
          self: e,
          instance: this
        }
      ]);
    });
  }), this;
}, X = function(t) {
  return this.queue(
    () => (
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async () => {
        let e = 0;
        for (const n of this.nodes)
          await new Promise((i) => t.apply(n, [
            i,
            {
              self: n,
              index: e,
              instance: this
            }
          ])), e++;
      })
    )
  ), this;
}, Y = function(t, e) {
  return this.queue(() => {
    const n = [];
    typeof t == "number" && (t = [t]);
    for (let i = 1; i <= this.nodes.length; i++)
      t.includes(i) && n.push(this.nodes[i - 1]);
    this.nodes = n, e && this.nodes.forEach((i, s) => {
      e.apply(i, [
        {
          instance: this,
          self: i,
          /* c8 ignore next 1 */
          index: Array.isArray(t) ? t[s] : t
        }
      ]);
    });
  }), this;
}, G = function(t) {
  return this.queue(() => {
    this.nodes = [this.nodes[0]], t && t.apply(this.nodes[0], [
      {
        self: this.nodes[0],
        instance: this
      }
    ]);
  }), this;
}, J = function(t) {
  return this.queue(() => {
    const e = this.nodes.length;
    this.nodes = [this.nodes[e - 1]], t && t.apply(this.nodes[0], [
      {
        self: this.nodes[0],
        instance: this,
        index: e - 1
      }
    ]);
  }), this;
}, V = function(t) {
  return this.queue(() => {
    this.nodes = this.nodes.filter((e, n) => n % 2 !== 0), t && this.nodes.forEach((e, n) => {
      t.apply(e, [
        {
          instance: this,
          self: e,
          index: n
        }
      ]);
    });
  }), this;
}, Z = function(t) {
  return this.queue(() => {
    this.nodes = this.nodes.filter((e, n) => n % 2 === 0), t && this.nodes.forEach((e, n) => {
      t.apply(e, [
        {
          instance: this,
          self: e,
          index: n
        }
      ]);
    });
  }), this;
}, tt = function(t, e) {
  return P.apply(this, ["next", t, e]);
}, et = function(t, e) {
  return P.apply(this, ["prev", t, e]);
}, nt = function(t) {
  return this.queue(() => {
    const e = [];
    for (const n of this.nodes) {
      const i = n;
      i.children && (t ? i.childNodes.forEach((s) => {
        const o = s;
        u(o).is(t) && e.push(o);
      }) : e.push(...Array.from(i.children)));
    }
    this.nodes = e;
  }), this;
}, st = function() {
  return this.queue(() => {
    for (const t of this.nodes) {
      const e = t;
      e && e.style && e.style.removeProperty("display");
    }
  }), this;
}, it = function() {
  return this.queue(() => {
    for (const t of this.nodes) {
      const e = t;
      e && e.style && (e.style.display = "none");
    }
  }), this;
}, ot = function() {
  return this.queue(() => {
    for (const t of this.nodes) {
      const e = t;
      e.style.display === "none" ? u(e).show() : u(e).hide();
    }
  }), this;
}, rt = function(t) {
  const e = this.nodes[0];
  if (a(t)) {
    const n = t.map((i) => e.getAttribute(i)).filter((i) => i);
    return n.length > 0 ? n : null;
  } else
    return e.getAttribute(t);
};
function g(t, e, n) {
  E(n) ? t.removeAttribute(e) : t.setAttribute(e, String(n));
}
const ct = function(t, e) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const i = n;
      if (typeof t == "string")
        g(i, t, e);
      else if (a(t))
        for (const s of t) {
          const o = Object.keys(s)[0], c = s[o];
          g(i, o, c);
        }
      else if (_(t)) {
        const s = Object.keys(t)[0], o = t[s];
        g(i, s, o);
      }
    }
  }), this;
}, ut = function(t, e) {
  return this.queue(() => {
    const n = [];
    this.nodes.forEach((i, s) => {
      const o = i;
      if (a(t))
        switch (e) {
          case "every": {
            t.every((c) => o.matches(c)) && n.push(o);
            break;
          }
          case "none": {
            t.some((c) => o.matches(c)) || n.push(o);
            break;
          }
          case "some":
          default:
            t.some((c) => o.matches(c)) && n.push(o);
        }
      else
        typeof t == "string" ? u(o).is(t) && n.push(o) : t.apply(o, [
          { instance: this, self: o, index: s }
        ]) && n.push(o);
    }), this.nodes = n;
  }), this;
}, ht = function(t) {
  return this.queue(() => {
    const e = typeof t == "string" ? document.querySelector(t) : t;
    if (e)
      for (const n of this.nodes)
        e.appendChild(n);
  }), this;
}, ft = function(t, e) {
  if (I(t)) {
    const n = [];
    this.nodes.forEach((i, s) => {
      const o = i;
      n[s] = o.cloneNode(!0), u(o).on(
        "mouseenter",
        (c) => t.apply(o, [c, this]),
        e
      ), u(o).on("mouseleave", () => {
        const c = n[s];
        o.removeAttribute("style"), o.removeAttribute("class"), o.innerHTML = c.innerHTML;
        for (const h in c.classList)
          o.classList.add(h);
        const f = [];
        for (; o.attributes.length > 0; ) {
          const h = o.attributes[0].name;
          o.removeAttribute(h), u(c).getAttr(h) && f.push(h);
        }
        for (const h of f)
          u(o).setAttr(h, u(c).getAttr(h));
      });
    });
  } else {
    const { enter: n, leave: i } = t;
    for (const s of this.nodes) {
      const o = s;
      u(o).on(
        "mouseenter",
        (c) => n.apply(o, [c, this]),
        e
      ), u(o).on(
        "mouseleave",
        (c) => i.apply(o, [c, this]),
        e
      );
    }
  }
  return this;
}, dt = function(t) {
  return this.queue(() => {
    const e = /* @__PURE__ */ new Set();
    for (const n of this.nodes) {
      const i = n;
      if (i.parentNode)
        if (t) {
          const s = i.parentNode;
          u(s).is(t) && e.add(s);
        } else
          e.add(i.parentNode);
    }
    this.nodes = Array.from(e);
  }), this;
}, lt = function(t = 1) {
  return this.queue(() => $(t)), this;
}, x = function(t, e, n) {
  var i;
  if (typeof t == "string") {
    const s = (n ?? document).querySelector(t);
    if (!s)
      return;
    t = s;
  }
  if (typeof e == "string")
    if (e.startsWith("<") && e.endsWith(">"))
      e = F(e);
    else {
      const s = (n ?? document).querySelector(e);
      if (!s)
        return;
      e = s;
    }
  e && t && ((i = t.parentNode) == null || i.replaceChild(e, t));
}, at = function(t, e, n) {
  return this.queue(() => x(t, e ?? this.nodes[0], n)), this;
}, T = function(t, e, n) {
  if (typeof t == "string") {
    const o = (n ?? document).querySelector(t);
    if (!o)
      return;
    t = o;
  }
  if (typeof e == "string") {
    const o = (n ?? document).querySelector(e);
    if (!o)
      return;
    e = o;
  }
  const i = t.cloneNode(!0), s = e.cloneNode(!0);
  u(i).replace(e), u(s).replace(t);
}, pt = function(t, e) {
  return this.queue(() => T(t, e, this.doc)), this;
}, yt = function(t, e) {
  return this.queue(
    () => new Promise((n) => {
      const i = [];
      Promise.all(
        this.nodes.map(async (s) => {
          const o = await u(s).children().nth(t).get();
          o && (i.push(...o), e && o.map(
            (c, f) => e.apply(c, [
              {
                self: c,
                instance: this,
                index: Array.isArray(t) ? t[f] : t
              }
            ])
          ));
        })
      ).then(() => {
        this.nodes = i, n(!0);
      });
    })
  ), this;
}, q = function(t, e = "append") {
  return this.queue(() => {
    a(t) || (t = [t]);
    for (const n of this.nodes) {
      const i = n;
      for (const s of t)
        (s instanceof Element || s instanceof Node) && i.parentNode && (e === "prepend" ? i.parentNode.insertBefore(s, i) : i.parentNode.insertBefore(s, i.nextSibling)), typeof s == "string" && (e === "prepend" ? i.insertAdjacentHTML("beforebegin", s) : i.insertAdjacentHTML("afterend", s));
    }
  }), this;
}, gt = function(t) {
  return q.call(this, t, "prepend"), this;
}, bt = function(t) {
  return q.call(this, t, "append"), this;
}, w = function(t, e = "append") {
  return this.queue(() => {
    a(t) || (t = [t]);
    for (const n of this.nodes) {
      const i = n;
      for (const s of t)
        (s instanceof Element || s instanceof Node) && (e === "prepend" ? i.insertBefore(s, i.firstChild) : i.appendChild(s)), typeof s == "string" && (e === "prepend" ? i.insertAdjacentHTML("afterbegin", s) : i.insertAdjacentHTML("beforeend", s));
    }
  }), this;
}, mt = function(t) {
  return w.call(this, t, "prepend"), this;
}, _t = function(t) {
  return w.call(this, t, "append"), this;
};
class qt {
  constructor(e) {
    r(this, "curryInstance");
    this.curryInstance = e;
  }
  /**
   * Same as addEventListener('keydown')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  down(e, n) {
    b.call(this.curryInstance, "keydown", e, n);
  }
  /**
   * Same as addEventListener('keyup')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  up(e, n) {
    b.call(this.curryInstance, "keyup", e, n);
  }
  /**
   * Same as addEventListener('keypress')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  press(e, n) {
    b.call(this.curryInstance, "keypress", e, n);
  }
}
class wt {
  constructor(e = 10) {
    r(this, "registry", []);
    r(this, "max", 0);
    this.max = e;
  }
  // Add a new key press to the registry
  add(e) {
    this.registry.push(e), this.registry.length > this.max && this.registry.shift();
  }
  pressing(e) {
    return e.every(
      (n, i) => this.registry.at(i - e.length) === n
    );
  }
}
function b(t, e, n) {
  const i = Array.isArray(e) ? e : [e], s = new wt(i.length);
  for (const o of this.nodes)
    u(o).on(t, (c) => {
      c = c, s.add(c.key), s.pressing(i) && n.apply(o, [c, this]);
    });
}
const vt = function(t, e = {}) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const i = new CustomEvent(t, {
        detail: e
      });
      n.dispatchEvent(i);
    }
  }), this;
}, At = {
  easing: "linear",
  duration: 300,
  iterations: 1,
  keepStyle: !1
}, St = function(t, e = {}) {
  return this.queue(async () => {
    if (!t)
      return Promise.resolve();
    const { onFinish: n, keepStyle: i, onStart: s, onCancel: o } = Object.assign(At, e);
    t = a(t) ? t : [t], t.length > 1 && t.unshift({});
    const c = t, f = [];
    for (const h of this.nodes) {
      const y = h;
      if (!y.animate)
        return Promise.resolve();
      const d = y.animate(c, e);
      s && s(d), d.onfinish = () => {
        if (n && n(d), i) {
          const p = c.at(-1);
          u(h).css(p);
        }
      }, d.oncancel = (p) => {
        o ? o(d, p) : console.log(`[$.animate] Animation cancelled 
`, p);
      }, d.onremove = (p) => console.log(`[$.animate] Animation removed by the browser 
`, p), f.push(d.finished);
    }
    return Promise.allSettled(f);
  }), this;
}, j = async function(t, e, n) {
  const i = n ?? document;
  if (typeof t == "string") {
    const s = i.querySelector(t);
    if (!s)
      return Promise.reject(Error("[$.fullscreen] Target does not exist"));
    t = s;
  }
  if (t) {
    const s = t;
    return Object.hasOwn(t, "requestFullscreen") ? (i.fullscreenElement && i.exitFullscreen(), s.requestFullscreen(e).then(() => {
      e != null && e.onOpen && (e == null || e.onOpen());
    }).catch(
      (o) => e != null && e.onError ? e == null ? void 0 : e.onError(o) : Promise.reject(Error("[$.fullscreen] Error during initialization."))
    )) : Promise.reject(Error("[$.fullscreen] Target does not implement the fullscreen API"));
  }
  return Promise.reject(Error("[$.fullscreen] Target does not exist"));
}, Et = function(t, e) {
  return this.queue(() => (_(t) ? (e = t, t = this.nodes[0]) : t ?? (t = this.nodes[0]), j(t, e, this.doc))), this;
}, Pt = function(t) {
  const { duration: e, to: n, easing: i } = Object.assign({
    duration: 300,
    to: 1,
    easing: "linear"
  }, t);
  return this.queue(() => {
    for (const s of this.nodes)
      u(s).animate([{ opacity: n }], { duration: e, easing: i, keepStyle: !0 });
  }), this;
}, Ct = function(t) {
  const { duration: e, to: n, easing: i } = Object.assign({
    duration: 300,
    to: 0,
    easing: "linear"
  }, t);
  return this.queue(() => {
    for (const s of this.nodes)
      u(s).animate([{ opacity: n }], { duration: e, easing: i, keepStyle: !0 });
  }), this;
}, xt = function(t = {}) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e, i = parseFloat(n.style.opacity), s = {
        duration: 300,
        off: 0,
        on: 1,
        easing: "linear"
      };
      typeof t == "number" && (t = { duration: t });
      const { duration: o, off: c, on: f, easing: h } = Object.assign(s, t);
      i === 0 || i < f ? u(n).fadeIn({ duration: o, to: f, easing: h }) : u(n).fadeOut({ duration: o, to: c, easing: h });
    }
  }), this;
}, Tt = function(t) {
  return t ? (this.queue(async () => await t.call(this)), this) : this;
}, jt = function(t) {
  return this.queue(() => {
    t && (this.nodes = C(t, this.doc));
  }), this;
}, Ot = function(t = 300, e = "linear") {
  return this.queue(async () => {
    const n = [];
    for (const i of this.nodes) {
      const s = i, o = s.scrollHeight;
      n.push(
        u(s).setAttr(m("original-height"), o).css("overflow", "hidden").animate({ height: "0px" }, {
          easing: e,
          duration: t,
          keepStyle: !0
        }).css("display", "none").await
      );
    }
    return Promise.allSettled(n);
  }), this;
}, Ht = function(t = 300, e = "linear") {
  return this.queue(async () => {
    const n = [];
    for (const i of this.nodes) {
      const s = i;
      s.style.removeProperty("display");
      const c = `${u(s).getAttr(m("original-height")) ?? s.scrollHeight}px`;
      n.push(
        u(s).animate({ height: c }, { easing: e, duration: t }).run(() => {
          s.style.removeProperty("overflow"), s.style.removeProperty("height");
        }).setAttr(m("original-height"), null).await
      );
    }
    return Promise.allSettled(n);
  }), this;
}, Lt = function(t, e) {
  return this.queue(async () => {
    const {
      duration: n = 300,
      easing: i = e ?? "linear",
      override: s = !1
    } = _(t) ? t : {}, o = [];
    for (const c of this.nodes) {
      const f = c, h = s ? this.nodes[0].style.display === "none" : f.style.display === "none";
      o.push(
        h ? u(f).slideDown(n, i).await : u(f).slideUp(n, i).await
      );
    }
    return Promise.allSettled(o);
  }), this;
}, It = function(t) {
  return this.queue(() => {
    var n;
    const e = [];
    for (const i of this.nodes) {
      const s = i;
      let o = (n = s == null ? void 0 : s.parentElement) == null ? void 0 : n.firstChild;
      for (; o; )
        !o.isEqualNode(s) && o.nodeType === 1 && (t && u(o).is(t) || !t) && e.push(o), o = o.nextSibling;
    }
    this.nodes = e;
  }), this;
}, Ft = function(t) {
  return this.queue(() => {
    var n;
    const e = [];
    for (const i of this.nodes) {
      const s = i;
      let o = (n = s == null ? void 0 : s.parentElement) == null ? void 0 : n.firstChild;
      for (; o && !o.isEqualNode(s); )
        o.nodeType === 1 && (t && u(o).is(t) || !t) && e.push(o), o = o.nextSibling;
    }
    this.nodes = e;
  }), this;
}, $t = function(t) {
  return this.queue(() => {
    const e = [];
    for (const n of this.nodes) {
      const i = n;
      let s = i.nextSibling;
      for (; s; )
        !s.isEqualNode(i) && s.nodeType === 1 && (t && u(s).is(t) || !t) && e.push(s), s = s.nextSibling;
    }
    this.nodes = e;
  }), this;
};
function u(t, e) {
  return new l(t, e);
}
const v = class {
  constructor(e, n) {
    r(this, "doc");
    r(this, "nodes");
    r(this, "taskQueue");
    /* ----------  Chaining API  ---------- */
    r(this, "fullscreen", Et.bind(this));
    r(this, "prependChild", mt.bind(this));
    r(this, "toggleClass", W.bind(this));
    r(this, "appendChild", _t.bind(this));
    r(this, "fadeToggle", xt.bind(this));
    r(this, "asyncEach", X.bind(this));
    r(this, "addClass", B.bind(this));
    r(this, "delClass", K.bind(this));
    r(this, "children", nt.bind(this));
    r(this, "hasClass", k.bind(this));
    r(this, "teleport", ht.bind(this));
    r(this, "nthChild", yt.bind(this));
    r(this, "addChild", w.bind(this));
    r(this, "prepend", gt.bind(this));
    r(this, "setAttr", ct.bind(this));
    r(this, "getAttr", rt.bind(this));
    r(this, "replace", at.bind(this));
    r(this, "trigger", vt.bind(this));
    r(this, "animate", St.bind(this));
    r(this, "fadeOut", Ct.bind(this));
    r(this, "filter", ut.bind(this));
    r(this, "fadeIn", Pt.bind(this));
    r(this, "append", bt.bind(this));
    r(this, "toggle", ot.bind(this));
    r(this, "parent", dt.bind(this));
    r(this, "click", D.bind(this));
    r(this, "first", G.bind(this));
    r(this, "hover", ft.bind(this));
    r(this, "wait", lt.bind(this));
    r(this, "swap", pt.bind(this));
    r(this, "show", st.bind(this));
    r(this, "hide", it.bind(this));
    r(this, "query", jt.bind(this));
    r(this, "text", A.bind(this));
    r(this, "each", z.bind(this));
    r(this, "last", J.bind(this));
    r(this, "even", Z.bind(this));
    r(this, "next", tt.bind(this));
    r(this, "prev", et.bind(this));
    r(this, "add", q.bind(this));
    r(this, "del", Q.bind(this));
    r(this, "odd", V.bind(this));
    r(this, "get", M.bind(this));
    r(this, "css", U.bind(this));
    r(this, "nth", Y.bind(this));
    r(this, "run", Tt.bind(this));
    r(this, "key", new qt(this));
    r(this, "is", N.bind(this));
    r(this, "on", R.bind(this));
    r(this, "slideUp", Ot.bind(this));
    r(this, "slideDown", Ht.bind(this));
    r(this, "slideToggle", Lt.bind(this));
    r(this, "siblings", It.bind(this));
    r(this, "prevSiblings", Ft.bind(this));
    r(this, "nextSiblings", $t.bind(this));
    this.doc = n, this.nodes = C(e, n), this.taskQueue = Promise.resolve();
  }
  /**
   * Functions which return Curry instance can be queued to be asyncronously executed.
   */
  async queue(e) {
    return await (this.taskQueue = this.taskQueue.then(e));
  }
  static text(e, n) {
    const i = u(e);
    return A.bind(i)(n);
  }
  get length() {
    return this.nodes.length;
  }
  get await() {
    return new Promise((e) => this.queue(() => {
      e(!0);
    }));
  }
  // Expose prototype so that users can extend curry with their own functions
  /**
   *  Experimental extension API
   */
  static $fn(e, n) {
    Object.defineProperty(
      v.prototype,
      e,
      {
        value() {
          return n.apply(this), this;
        }
      }
    );
  }
};
let l = v;
/* ----------  Static API  ---------- */
r(l, "fullscreen", j), r(l, "replace", x), r(l, "swap", T);
export {
  u as $,
  l as Curry
};
