var C = Object.defineProperty;
var j = (t, e, n) => e in t ? C(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var r = (t, e, n) => (j(t, typeof e != "symbol" ? e + "" : e, n), n);
const _ = function(t, e) {
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
};
function l(t) {
  return t ? Array.isArray(t) : !1;
}
function q(t) {
  const e = typeof t;
  return t != null && e === "object";
}
function P(t) {
  return t && {}.toString.call(t) === "[object Function]";
}
function O(t) {
  return t == null;
}
function m(t) {
  if (!t || !t.previousElementSibling)
    return 0;
  let e = 0, n = t;
  for (; (n = n.previousElementSibling) != null; )
    e++;
  return e;
}
function A(t, e, n) {
  return this.queue(() => {
    const s = t === "next" ? "nextElementSibling" : "previousElementSibling";
    typeof e != "number" && (n = e);
    const i = [];
    for (const o of this.nodes) {
      const c = o, f = c[s];
      if (!e || e === 1)
        f && (i.push(f), n && n.apply(f, [{
          self: f,
          prev: c,
          index: m(f),
          instance: this
        }]));
      else {
        let h = c;
        for (let g = 0; g < e; g++)
          h && (h = h[s]);
        h && (i.push(h), n && n.apply(h, [{
          self: h,
          prev: c,
          index: m(c),
          instance: this
        }]));
      }
    }
    this.nodes = i;
  }), this;
}
function T(t) {
  const e = document.createElement("div");
  return e.insertAdjacentHTML("beforeend", t), e.children[0];
}
function L(t = 1) {
  return new Promise((e) => setTimeout(e, t));
}
function v(t, e) {
  if (typeof t == "string") {
    let n;
    return e ? n = e.querySelectorAll(t) : n = document.querySelectorAll(t), Array.from(n);
  }
  return t instanceof HTMLCollection ? Array.from(t) : t instanceof Node ? [t] : t instanceof d ? t.nodes : t;
}
const x = function(t) {
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
}, H = function(t, e = "every") {
  const n = [];
  for (const s of this.nodes) {
    const i = s;
    if (l(t))
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
}, I = function(t, e, n) {
  return this.queue(() => {
    for (const s of this.nodes)
      s.addEventListener(
        t,
        (i) => e.apply(s, [i, this]),
        n
      );
  }), this;
}, F = function(t) {
  for (const e of this.nodes)
    u(e).on("click", (n) => {
      t.apply(e, [n, this]);
    });
  return this;
}, M = function(t) {
  this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      if (t && !u(n).is(t))
        return;
      n.remove();
    }
  });
}, $ = function(t, e) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const s = n;
      O(e) ? Object.assign(s.style, t) : typeof t == "string" && s.style.setProperty(t, String(e));
    }
  }), this;
}, Q = function(t) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      t = typeof t == "string" ? [t] : t, n.classList.add(...t);
    }
  }), this;
}, B = function(t) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      t = typeof t == "string" ? [t] : t, n.classList.remove(...t);
    }
  }), this;
}, K = function(t) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e;
      t = typeof t == "string" ? [t] : t;
      for (const s of t)
        n.classList.toggle(s);
    }
  }), this;
}, N = function(t, e = "every") {
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
}, k = function(t) {
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
}, R = function(t) {
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
}, W = function(t, e) {
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
}, z = function(t) {
  return this.queue(() => {
    this.nodes = [this.nodes[0]], t && t.apply(this.nodes[0], [
      {
        self: this.nodes[0],
        instance: this
      }
    ]);
  }), this;
}, D = function(t) {
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
}, G = function(t) {
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
}, J = function(t) {
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
}, U = function(t, e) {
  return A.apply(this, ["next", t, e]);
}, V = function(t, e) {
  return A.apply(this, ["prev", t, e]);
}, X = function(t) {
  return this.queue(() => {
    const e = [];
    for (const n of this.nodes) {
      const s = n;
      s.children && (t ? s.childNodes.forEach((i) => {
        const o = i;
        u(o).is(t) && e.push(o);
      }) : e.push(...Array.from(s.children)));
    }
    this.nodes = e;
  }), this;
}, Y = function() {
  return this.queue(() => {
    for (const t of this.nodes) {
      const e = t;
      e && e.style && e.style.removeProperty("display");
    }
  }), this;
}, Z = function() {
  return this.queue(() => {
    for (const t of this.nodes) {
      const e = t;
      e && e.style && (e.style.display = "none");
    }
  }), this;
}, tt = function() {
  return this.queue(() => {
    for (const t of this.nodes) {
      const e = t;
      e.style.display === "none" ? u(e).show() : u(e).hide();
    }
  }), this;
}, et = function(t) {
  const e = this.nodes[0];
  if (l(t)) {
    const n = t.map((s) => e.getAttribute(s)).filter((s) => s);
    return n.length > 0 ? n : null;
  } else
    return e.getAttribute(t);
}, nt = function(t, e) {
  for (const n of this.nodes) {
    const s = n;
    if (typeof t == "string" && e)
      s.setAttribute(t, String(e));
    else if (l(t))
      for (const i of t) {
        const o = Object.keys(i)[0], c = i[o];
        s.setAttribute(o, String(c));
      }
    else if (q(t)) {
      const i = Object.keys(t)[0], o = t[i];
      s.setAttribute(i, String(o));
    }
  }
}, st = function(t, e) {
  return this.queue(() => {
    const n = [];
    this.nodes.forEach((s, i) => {
      const o = s;
      if (l(t))
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
          { instance: this, self: o, index: i }
        ]) && n.push(o);
    }), this.nodes = n;
  }), this;
}, it = function(t) {
  return this.queue(() => {
    const e = typeof t == "string" ? document.querySelector(t) : t;
    if (e)
      for (const n of this.nodes)
        e.appendChild(n);
  }), this;
}, ot = function(t, e) {
  if (P(t)) {
    const n = [];
    this.nodes.forEach((s, i) => {
      const o = s;
      n[i] = o.cloneNode(!0), u(o).on(
        "mouseenter",
        (c) => t.apply(o, [c, this]),
        e
      ), u(o).on("mouseleave", () => {
        const c = n[i];
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
    const { enter: n, leave: s } = t;
    for (const i of this.nodes) {
      const o = i;
      u(o).on(
        "mouseenter",
        (c) => n.apply(o, [c, this]),
        e
      ), u(o).on(
        "mouseleave",
        (c) => s.apply(o, [c, this]),
        e
      );
    }
  }
  return this;
}, rt = function(t) {
  return this.queue(() => {
    const e = /* @__PURE__ */ new Set();
    for (const n of this.nodes) {
      const s = n;
      if (s.parentNode)
        if (t) {
          const i = s.parentNode;
          u(i).is(t) && e.add(i);
        } else
          e.add(s.parentNode);
    }
    this.nodes = Array.from(e);
  }), this;
}, ct = function(t = 1) {
  return this.queue(() => L(t)), this;
}, w = function(t, e, n) {
  var s;
  if (typeof t == "string") {
    const i = (n ?? document).querySelector(t);
    if (!i)
      return;
    t = i;
  }
  if (typeof e == "string")
    if (e.startsWith("<") && e.endsWith(">"))
      e = T(e);
    else {
      const i = (n ?? document).querySelector(e);
      if (!i)
        return;
      e = i;
    }
  e && t && ((s = t.parentNode) == null || s.replaceChild(e, t));
}, ut = function(t, e, n) {
  return this.queue(() => w(t, e ?? this.nodes[0], n)), this;
}, S = function(t, e, n) {
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
  u(s).replace(e), u(i).replace(t);
}, ht = function(t, e) {
  return this.queue(() => S(t, e, this.doc)), this;
}, ft = function(t, e) {
  return this.queue(
    () => new Promise((n) => {
      const s = [];
      Promise.all(
        this.nodes.map(async (i) => {
          const o = await u(i).children().nth(t).get();
          if (o) {
            const c = Array.isArray(o) ? o : [o];
            s.push(...c), e && c.map(
              (f, h) => e.apply(f, [
                {
                  self: f,
                  instance: this,
                  index: Array.isArray(t) ? t[h] : t
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
}, p = function(t, e = "append") {
  return this.queue(() => {
    l(t) || (t = [t]);
    for (const n of this.nodes) {
      const s = n;
      for (const i of t)
        (i instanceof Element || i instanceof Node) && s.parentNode && (e === "prepend" ? s.parentNode.insertBefore(i, s) : s.parentNode.insertBefore(i, s.nextSibling)), typeof i == "string" && (e === "prepend" ? s.insertAdjacentHTML("beforebegin", i) : s.insertAdjacentHTML("afterend", i));
    }
  }), this;
}, dt = function(t) {
  return p.call(this, t, "prepend"), this;
}, lt = function(t) {
  return p.call(this, t, "append"), this;
}, y = function(t, e = "append") {
  return this.queue(() => {
    l(t) || (t = [t]);
    for (const n of this.nodes) {
      const s = n;
      for (const i of t)
        (i instanceof Element || i instanceof Node) && (e === "prepend" ? s.insertBefore(i, s.firstChild) : s.appendChild(i)), typeof i == "string" && (e === "prepend" ? s.insertAdjacentHTML("afterbegin", i) : s.insertAdjacentHTML("beforeend", i));
    }
  }), this;
}, at = function(t) {
  return y.call(this, t, "prepend"), this;
}, pt = function(t) {
  return y.call(this, t, "append"), this;
};
class yt {
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
    a.call(this.curryInstance, "keydown", e, n);
  }
  /**
   * Same as addEventListener('keyup')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  up(e, n) {
    a.call(this.curryInstance, "keyup", e, n);
  }
  /**
   * Same as addEventListener('keypress')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  press(e, n) {
    a.call(this.curryInstance, "keypress", e, n);
  }
}
class bt {
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
function a(t, e, n) {
  const s = Array.isArray(e) ? e : [e], i = new bt(s.length);
  for (const o of this.nodes)
    u(o).on(t, (c) => {
      c = c, i.add(c.key), i.pressing(s) && n.apply(o, [c, this]);
    });
}
const gt = function(t, e = {}) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const s = new CustomEvent(t, {
        detail: e
      });
      n.dispatchEvent(s);
    }
  }), this;
}, _t = {
  easing: "linear",
  duration: 300,
  iterations: 1,
  keepStyle: !1
}, mt = function(t, e = {}) {
  return this.queue(async () => {
    if (!t)
      return;
    const { onFinish: n, keepStyle: s } = Object.assign(_t, e);
    t = l(t) ? t : [t], t.length > 1 && t.unshift({});
    const i = t;
    for (const o of this.nodes) {
      const c = o;
      if (!c.animate)
        return;
      const f = c.animate(i, e);
      await f.finished.then(() => {
        if (s) {
          const h = i.at(-1);
          u(o).css(h);
        }
        n && n(f);
      });
    }
    return Promise.resolve();
  }), this;
}, E = async function(t, e, n) {
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
}, qt = function(t, e) {
  return this.queue(() => (q(t) ? (e = t, t = this.nodes[0]) : t ?? (t = this.nodes[0]), E(t, e, this.doc))), this;
}, At = function(t) {
  const { duration: e, to: n } = Object.assign({
    duration: 300,
    to: 1
  }, t);
  return this.queue(() => {
    for (const s of this.nodes)
      u(s).animate([{ opacity: n }], { duration: e, keepStyle: !0 });
  }), this;
}, vt = function(t) {
  const { duration: e, to: n } = Object.assign({
    duration: 300,
    to: 0
  }, t);
  return this.queue(() => {
    for (const s of this.nodes)
      u(s).animate([{ opacity: n }], { duration: e, keepStyle: !0 });
  }), this;
}, wt = function(t = {}) {
  return this.queue(() => {
    for (const e of this.nodes) {
      const n = e, s = parseFloat(n.style.opacity), i = {
        duration: 300,
        off: 0,
        on: 1
      };
      typeof t == "number" && (t = { duration: t });
      const { duration: o, off: c, on: f } = Object.assign(i, t);
      s === 0 || s < f ? u(n).fadeIn({ duration: o, to: f }) : u(n).fadeOut({ duration: o, to: c });
    }
  }), this;
}, St = function(t) {
  return t ? (this.queue(() => t.call(this)), this) : this;
}, Et = function(t) {
  return this.queue(() => {
    t && (this.nodes = v(t, this.doc));
  }), this;
};
function u(t, e) {
  return new d(t, e);
}
const b = class {
  constructor(e, n) {
    r(this, "doc");
    r(this, "nodes");
    r(this, "taskQueue");
    /* ----------  Chaining API  ---------- */
    r(this, "fullscreen", qt.bind(this));
    r(this, "prependChild", at.bind(this));
    r(this, "appendChild", pt.bind(this));
    r(this, "fadeToggle", wt.bind(this));
    r(this, "asyncEach", R.bind(this));
    r(this, "addClass", Q.bind(this));
    r(this, "delClass", B.bind(this));
    r(this, "tglClass", K.bind(this));
    r(this, "children", X.bind(this));
    r(this, "hasClass", N.bind(this));
    r(this, "teleport", it.bind(this));
    r(this, "nthChild", ft.bind(this));
    r(this, "addChild", y.bind(this));
    r(this, "prepend", dt.bind(this));
    r(this, "setAttr", nt.bind(this));
    r(this, "getAttr", et.bind(this));
    r(this, "replace", ut.bind(this));
    r(this, "trigger", gt.bind(this));
    r(this, "animate", mt.bind(this));
    r(this, "fadeOut", vt.bind(this));
    r(this, "filter", st.bind(this));
    r(this, "fadeIn", At.bind(this));
    r(this, "append", lt.bind(this));
    r(this, "toggle", tt.bind(this));
    r(this, "parent", rt.bind(this));
    r(this, "click", F.bind(this));
    r(this, "first", z.bind(this));
    r(this, "hover", ot.bind(this));
    r(this, "wait", ct.bind(this));
    r(this, "swap", ht.bind(this));
    r(this, "show", Y.bind(this));
    r(this, "hide", Z.bind(this));
    r(this, "query", Et.bind(this));
    r(this, "text", _.bind(this));
    r(this, "each", k.bind(this));
    r(this, "last", D.bind(this));
    r(this, "even", J.bind(this));
    r(this, "next", U.bind(this));
    r(this, "prev", V.bind(this));
    r(this, "add", p.bind(this));
    r(this, "del", M.bind(this));
    r(this, "odd", G.bind(this));
    r(this, "get", x.bind(this));
    r(this, "css", $.bind(this));
    r(this, "nth", W.bind(this));
    r(this, "run", St.bind(this));
    r(this, "key", new yt(this));
    r(this, "is", H.bind(this));
    r(this, "on", I.bind(this));
    this.doc = n, this.nodes = v(e, n), this.taskQueue = Promise.resolve();
  }
  /**
   * Functions which return Curry instance can be queued to be asyncronously executed.
   */
  async queue(e) {
    return await (this.taskQueue = this.taskQueue.then(e));
  }
  static text(e, n) {
    const s = u(e);
    return _.bind(s)(n);
  }
  // Expose prototype so that users can extend curry with their own functions
  get length() {
    return this.nodes.length;
  }
  /**
   *  Experimental extension API
   */
  static $fn(e, n) {
    Object.defineProperty(
      b.prototype,
      e,
      {
        value() {
          return n.apply(this), this;
        }
      }
    );
  }
};
let d = b;
/* ----------  Static API  ---------- */
r(d, "fullscreen", E), r(d, "replace", w), r(d, "swap", S);
export {
  d as Curry
};
