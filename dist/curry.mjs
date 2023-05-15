var O = Object.defineProperty;
var H = (t, e, n) => e in t ? O(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var r = (t, e, n) => (H(t, typeof e != "symbol" ? e + "" : e, n), n);
const w = function(t, e) {
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
    const s = t === "next" ? "nextElementSibling" : "previousElementSibling";
    typeof e != "number" && (n = e, e = void 0);
    const i = [];
    for (const o of this.nodes) {
      const c = o, f = c[s];
      if (!e || e === 1)
        f && (i.push(f), n && n.apply(f, [{
          self: f,
          prev: c,
          index: S(f),
          instance: this
        }]));
      else {
        let u = c;
        for (let y = 0; y < e; y++)
          u && (u = u[s]);
        u && (i.push(u), n && n.apply(u, [{
          self: u,
          prev: c,
          index: S(c),
          instance: this
        }]));
      }
    }
    this.nodes = i;
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
const b = (t) => L + t;
function M(t) {
  return this.queue(() => {
    if (this.nodes.length === 0)
      return;
    if (!t)
      return this.nodes.length === 1 ? this.nodes[0] : this.nodes;
    const e = [];
    for (const n of this.nodes)
      n && e.push(Reflect.get(n, t));
    return e.length === 1 ? e[0] : e;
  });
}
const R = function(t, e = "every") {
  const n = [];
  for (const s of this.nodes) {
    const i = s;
    if (a(t))
      for (const o of t)
        n.push(i.matches && i.matches(o));
    else
      i.matches && i.matches(t) ? n.push(!0) : n.push(!1);
  }
  switch (e) {
    case "some":
      return n.some((s) => s);
    case "none":
      return !n.some((s) => s);
    case "every":
      return n.every((s) => s);
  }
}, D = function(t, e, n) {
  return this.queue(() => {
    for (const s of this.nodes)
      s.addEventListener(
        t,
        (i) => e.apply(s, [i, this]),
        n
      );
  }), this;
}, Q = function(t) {
  for (const e of this.nodes)
    h(e).on("click", (n) => {
      t.apply(e, [n, this]);
    });
  return this;
}, U = function(t) {
  this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      if (t && !h(n).is(t))
        return;
      n.remove();
    }
  });
}, B = function(t, e) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const s = n;
      E(e) ? Object.assign(s.style, t) : typeof t == "string" && s.style.setProperty(t, String(e));
    }
  }), this;
}, K = function(t) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      t = typeof t == "string" ? [t] : t, n.classList.add(...t);
    }
  }), this;
}, N = function(t) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      t = typeof t == "string" ? [t] : t, n.classList.remove(...t);
    }
  }), this;
}, k = function(t) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      t = typeof t == "string" ? [t] : t;
      for (const s of t)
        n.classList.toggle(s);
    }
  }), this;
}, W = function(t, e = "every") {
  const n = [], s = typeof t == "string" ? [t] : t;
  for (const i of this.nodes) {
    const o = i;
    n.push(s.some((c) => o.classList.contains(c)));
  }
  switch (e) {
    case "some":
      return n.some((i) => i);
    case "every":
      return n.every((i) => i);
    case "none":
      return !n.some((i) => i);
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
          await new Promise((s) => t.apply(n, [
            s,
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
    for (let s = 1; s <= this.nodes.length; s++)
      t.includes(s) && n.push(this.nodes[s - 1]);
    this.nodes = n, e && this.nodes.forEach((s, i) => {
      e.apply(s, [
        {
          instance: this,
          self: s,
          /* c8 ignore next 1 */
          index: Array.isArray(t) ? t[i] : t
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
      const s = n;
      s.children && (t ? s.childNodes.forEach((i) => {
        const o = i;
        h(o).is(t) && e.push(o);
      }) : e.push(...Array.from(s.children)));
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
      e.style.display === "none" ? h(e).show() : h(e).hide();
    }
  }), this;
}, rt = function(t) {
  const e = this.nodes[0];
  if (a(t)) {
    const n = t.map((s) => e.getAttribute(s)).filter((s) => s);
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
      const s = n;
      if (typeof t == "string")
        g(s, t, e);
      else if (a(t))
        for (const i of t) {
          const o = Object.keys(i)[0], c = i[o];
          g(s, o, c);
        }
      else if (_(t)) {
        const i = Object.keys(t)[0], o = t[i];
        g(s, i, o);
      }
    }
  }), this;
}, ht = function(t, e) {
  return this.queue(() => {
    const n = [];
    this.nodes.forEach((s, i) => {
      const o = s;
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
        typeof t == "string" ? h(o).is(t) && n.push(o) : t.apply(o, [
          { instance: this, self: o, index: i }
        ]) && n.push(o);
    }), this.nodes = n;
  }), this;
}, ut = function(t) {
  return this.queue(() => {
    const e = typeof t == "string" ? document.querySelector(t) : t;
    if (e)
      for (const n of this.nodes)
        e.appendChild(n);
  }), this;
}, ft = function(t, e) {
  if (I(t)) {
    const n = [];
    this.nodes.forEach((s, i) => {
      const o = s;
      n[i] = o.cloneNode(!0), h(o).on(
        "mouseenter",
        (c) => t.apply(o, [c, this]),
        e
      ), h(o).on("mouseleave", () => {
        const c = n[i];
        o.removeAttribute("style"), o.removeAttribute("class"), o.innerHTML = c.innerHTML;
        for (const u in c.classList)
          o.classList.add(u);
        const f = [];
        for (; o.attributes.length > 0; ) {
          const u = o.attributes[0].name;
          o.removeAttribute(u), h(c).getAttr(u) && f.push(u);
        }
        for (const u of f)
          h(o).setAttr(u, h(c).getAttr(u));
      });
    });
  } else {
    const { enter: n, leave: s } = t;
    for (const i of this.nodes) {
      const o = i;
      h(o).on(
        "mouseenter",
        (c) => n.apply(o, [c, this]),
        e
      ), h(o).on(
        "mouseleave",
        (c) => s.apply(o, [c, this]),
        e
      );
    }
  }
  return this;
}, dt = function(t) {
  return this.queue(() => {
    const e = /* @__PURE__ */ new Set();
    for (const n of this.nodes) {
      const s = n;
      if (s.parentNode)
        if (t) {
          const i = s.parentNode;
          h(i).is(t) && e.add(i);
        } else
          e.add(s.parentNode);
    }
    this.nodes = Array.from(e);
  }), this;
}, lt = function(t = 1) {
  return this.queue(() => $(t)), this;
}, j = function(t, e, n) {
  var s;
  if (typeof t == "string") {
    const i = (n ?? document).querySelector(t);
    if (!i)
      return;
    t = i;
  }
  if (typeof e == "string")
    if (e.startsWith("<") && e.endsWith(">"))
      e = F(e);
    else {
      const i = (n ?? document).querySelector(e);
      if (!i)
        return;
      e = i;
    }
  e && t && ((s = t.parentNode) == null || s.replaceChild(e, t));
}, at = function(t, e, n) {
  return this.queue(() => j(t, e ?? this.nodes[0], n)), this;
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
  const s = t.cloneNode(!0), i = e.cloneNode(!0);
  h(s).replace(e), h(i).replace(t);
}, pt = function(t, e) {
  return this.queue(() => T(t, e, this.doc)), this;
}, yt = function(t, e) {
  return this.queue(
    () => new Promise((n) => {
      const s = [];
      Promise.all(
        this.nodes.map(async (i) => {
          const o = await h(i).children().nth(t).get();
          if (o) {
            const c = Array.isArray(o) ? o : [o];
            s.push(...c), e && c.map(
              (f, u) => e.apply(f, [
                {
                  self: f,
                  instance: this,
                  index: Array.isArray(t) ? t[u] : t
                }
              ])
            );
          }
        })
      ).then(() => {
        this.nodes = s, n(!0);
      });
    })
  ), this;
}, q = function(t, e = "append") {
  return this.queue(() => {
    a(t) || (t = [t]);
    for (const n of this.nodes) {
      const s = n;
      for (const i of t)
        (i instanceof Element || i instanceof Node) && s.parentNode && (e === "prepend" ? s.parentNode.insertBefore(i, s) : s.parentNode.insertBefore(i, s.nextSibling)), typeof i == "string" && (e === "prepend" ? s.insertAdjacentHTML("beforebegin", i) : s.insertAdjacentHTML("afterend", i));
    }
  }), this;
}, gt = function(t) {
  return q.call(this, t, "prepend"), this;
}, mt = function(t) {
  return q.call(this, t, "append"), this;
}, v = function(t, e = "append") {
  return this.queue(() => {
    a(t) || (t = [t]);
    for (const n of this.nodes) {
      const s = n;
      for (const i of t)
        (i instanceof Element || i instanceof Node) && (e === "prepend" ? s.insertBefore(i, s.firstChild) : s.appendChild(i)), typeof i == "string" && (e === "prepend" ? s.insertAdjacentHTML("afterbegin", i) : s.insertAdjacentHTML("beforeend", i));
    }
  }), this;
}, bt = function(t) {
  return v.call(this, t, "prepend"), this;
}, _t = function(t) {
  return v.call(this, t, "append"), this;
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
    m.call(this.curryInstance, "keydown", e, n);
  }
  /**
   * Same as addEventListener('keyup')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  up(e, n) {
    m.call(this.curryInstance, "keyup", e, n);
  }
  /**
   * Same as addEventListener('keypress')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  press(e, n) {
    m.call(this.curryInstance, "keypress", e, n);
  }
}
class vt {
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
      (n, s) => this.registry.at(s - e.length) === n
    );
  }
}
function m(t, e, n) {
  const s = Array.isArray(e) ? e : [e], i = new vt(s.length);
  for (const o of this.nodes)
    h(o).on(t, (c) => {
      c = c, i.add(c.key), i.pressing(s) && n.apply(o, [c, this]);
    });
}
const At = function(t, e = {}) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const s = new CustomEvent(t, {
        detail: e
      });
      n.dispatchEvent(s);
    }
  }), this;
}, wt = {
  easing: "linear",
  duration: 300,
  iterations: 1,
  keepStyle: !1
}, St = function(t, e = {}) {
  return this.queue(async () => {
    if (!t)
      return Promise.resolve();
    const { onFinish: n, keepStyle: s, onStart: i, onCancel: o } = Object.assign(wt, e);
    t = a(t) ? t : [t], t.length > 1 && t.unshift({});
    const c = t, f = [];
    for (const u of this.nodes) {
      const y = u;
      if (!y.animate)
        return Promise.resolve();
      const d = y.animate(c, e);
      i && i(d), d.onfinish = () => {
        if (n && n(d), s) {
          const p = c.at(-1);
          h(u).css(p);
        }
      }, d.oncancel = (p) => {
        o ? o(d, p) : console.log(`[$.animate] Animation cancelled 
`, p);
      }, d.onremove = (p) => console.log(`[$.animate] Animation removed by the browser 
`, p), f.push(d.finished);
    }
    return Promise.allSettled(f);
  }), this;
}, x = async function(t, e, n) {
  const s = n ?? document;
  if (typeof t == "string") {
    const i = s.querySelector(t);
    if (!i)
      return Promise.reject(Error("[$.fullscreen] Target does not exist"));
    t = i;
  }
  if (t) {
    const i = t;
    return Object.hasOwn(t, "requestFullscreen") ? (s.fullscreenElement && s.exitFullscreen(), i.requestFullscreen(e).then(() => {
      e != null && e.onOpen && (e == null || e.onOpen());
    }).catch(
      (o) => e != null && e.onError ? e == null ? void 0 : e.onError(o) : Promise.reject(Error("[$.fullscreen] Error during initialization."))
    )) : Promise.reject(Error("[$.fullscreen] Target does not implement the fullscreen API"));
  }
  return Promise.reject(Error("[$.fullscreen] Target does not exist"));
}, Et = function(t, e) {
  return this.queue(() => (_(t) ? (e = t, t = this.nodes[0]) : t ?? (t = this.nodes[0]), x(t, e, this.doc))), this;
}, Pt = function(t) {
  const { duration: e, to: n, easing: s } = Object.assign({
    duration: 300,
    to: 1,
    easing: "linear"
  }, t);
  return this.queue(() => {
    for (const i of this.nodes)
      h(i).animate([{ opacity: n }], { duration: e, easing: s, keepStyle: !0 });
  }), this;
}, Ct = function(t) {
  const { duration: e, to: n, easing: s } = Object.assign({
    duration: 300,
    to: 0,
    easing: "linear"
  }, t);
  return this.queue(() => {
    for (const i of this.nodes)
      h(i).animate([{ opacity: n }], { duration: e, easing: s, keepStyle: !0 });
  }), this;
}, jt = function(t = {}) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e, s = parseFloat(n.style.opacity), i = {
        duration: 300,
        off: 0,
        on: 1,
        easing: "linear"
      };
      typeof t == "number" && (t = { duration: t });
      const { duration: o, off: c, on: f, easing: u } = Object.assign(i, t);
      s === 0 || s < f ? h(n).fadeIn({ duration: o, to: f, easing: u }) : h(n).fadeOut({ duration: o, to: c, easing: u });
    }
  }), this;
}, Tt = function(t) {
  return t ? (this.queue(() => t.call(this)), this) : this;
}, xt = function(t) {
  return this.queue(() => {
    t && (this.nodes = C(t, this.doc));
  }), this;
}, Ot = function(t = 300, e = "linear") {
  return this.queue(async () => {
    const n = [];
    for (const s of this.nodes) {
      const i = s, o = i.scrollHeight;
      n.push(
        h(i).setAttr(b("original-height"), o).css("overflow", "hidden").animate({ height: "0px" }, {
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
    for (const s of this.nodes) {
      const i = s;
      i.style.removeProperty("display");
      const c = `${h(i).getAttr(b("original-height")) ?? i.scrollHeight}px`;
      n.push(
        h(i).animate({ height: c }, { easing: e, duration: t }).run(() => {
          i.style.removeProperty("overflow"), i.style.removeProperty("height");
        }).setAttr(b("original-height"), null).await
      );
    }
    return Promise.allSettled(n);
  }), this;
}, Lt = function(t, e) {
  return this.queue(async () => {
    const {
      duration: n = 300,
      easing: s = e ?? "linear",
      override: i = !1
    } = _(t) ? t : {}, o = [];
    for (const c of this.nodes) {
      const f = c, u = i ? this.nodes[0].style.display === "none" : f.style.display === "none";
      o.push(
        u ? h(f).slideDown(n, s).await : h(f).slideUp(n, s).await
      );
    }
    return Promise.allSettled(o);
  }), this;
};
function h(t, e) {
  return new l(t, e);
}
const A = class {
  constructor(e, n) {
    r(this, "doc");
    r(this, "nodes");
    r(this, "taskQueue");
    /* ----------  Chaining API  ---------- */
    r(this, "fullscreen", Et.bind(this));
    r(this, "prependChild", bt.bind(this));
    r(this, "toggleClass", k.bind(this));
    r(this, "appendChild", _t.bind(this));
    r(this, "fadeToggle", jt.bind(this));
    r(this, "asyncEach", X.bind(this));
    r(this, "addClass", K.bind(this));
    r(this, "delClass", N.bind(this));
    r(this, "children", nt.bind(this));
    r(this, "hasClass", W.bind(this));
    r(this, "teleport", ut.bind(this));
    r(this, "nthChild", yt.bind(this));
    r(this, "addChild", v.bind(this));
    r(this, "prepend", gt.bind(this));
    r(this, "setAttr", ct.bind(this));
    r(this, "getAttr", rt.bind(this));
    r(this, "replace", at.bind(this));
    r(this, "trigger", At.bind(this));
    r(this, "animate", St.bind(this));
    r(this, "fadeOut", Ct.bind(this));
    r(this, "filter", ht.bind(this));
    r(this, "fadeIn", Pt.bind(this));
    r(this, "append", mt.bind(this));
    r(this, "toggle", ot.bind(this));
    r(this, "parent", dt.bind(this));
    r(this, "click", Q.bind(this));
    r(this, "first", G.bind(this));
    r(this, "hover", ft.bind(this));
    r(this, "wait", lt.bind(this));
    r(this, "swap", pt.bind(this));
    r(this, "show", st.bind(this));
    r(this, "hide", it.bind(this));
    r(this, "query", xt.bind(this));
    r(this, "text", w.bind(this));
    r(this, "each", z.bind(this));
    r(this, "last", J.bind(this));
    r(this, "even", Z.bind(this));
    r(this, "next", tt.bind(this));
    r(this, "prev", et.bind(this));
    r(this, "add", q.bind(this));
    r(this, "del", U.bind(this));
    r(this, "odd", V.bind(this));
    r(this, "get", M.bind(this));
    r(this, "css", B.bind(this));
    r(this, "nth", Y.bind(this));
    r(this, "run", Tt.bind(this));
    r(this, "key", new qt(this));
    r(this, "is", R.bind(this));
    r(this, "on", D.bind(this));
    r(this, "slideUp", Ot.bind(this));
    r(this, "slideDown", Ht.bind(this));
    r(this, "slideToggle", Lt.bind(this));
    this.doc = n, this.nodes = C(e, n), this.taskQueue = Promise.resolve();
  }
  /**
   * Functions which return Curry instance can be queued to be asyncronously executed.
   */
  async queue(e) {
    return await (this.taskQueue = this.taskQueue.then(e));
  }
  static text(e, n) {
    const s = h(e);
    return w.bind(s)(n);
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
      A.prototype,
      e,
      {
        value() {
          return n.apply(this), this;
        }
      }
    );
  }
};
let l = A;
/* ----------  Static API  ---------- */
r(l, "fullscreen", x), r(l, "replace", j), r(l, "swap", T);
export {
  h as $,
  l as Curry
};
