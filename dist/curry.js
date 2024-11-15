var M = Object.defineProperty;
var R = (e, t, n) => t in e ? M(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var r = (e, t, n) => R(e, typeof t != "symbol" ? t + "" : t, n);
const L = "data-curry-";
function d(e) {
  return e ? Array.isArray(e) : !1;
}
function m(e) {
  const t = typeof e;
  return e != null && t === "object";
}
function H(e) {
  return e && {}.toString.call(e) === "[object Function]";
}
function j(e) {
  return e == null;
}
function O(e) {
  if (!e || !e.previousElementSibling)
    return 0;
  let t = 0, n = e;
  for (; (n = n.previousElementSibling) != null; )
    t++;
  return t;
}
function T(e, t, n) {
  return this.queue(() => {
    const i = e === "next" ? "nextElementSibling" : "previousElementSibling";
    typeof t != "number" && (n = t, t = void 0);
    const s = [];
    for (const o of this.nodes) {
      const c = o, h = c[i];
      if (!t || t === 1)
        h && (s.push(h), n && n.apply(h, [{
          self: h,
          prev: c,
          index: O(h),
          instance: this
        }]));
      else {
        let f = c;
        for (let p = 0; p < t; p++)
          f && (f = f[i]);
        f && (s.push(f), n && n.apply(f, [{
          self: f,
          prev: c,
          index: O(c),
          instance: this
        }]));
      }
    }
    this.nodes = s;
  }), this;
}
function $(e) {
  const t = document.createElement("div");
  return t.insertAdjacentHTML("beforeend", e), t.children[0];
}
function F(e = 1) {
  return new Promise((t) => setTimeout(t, e));
}
function I(e, t) {
  if (typeof e == "string") {
    let n;
    return t ? n = t.querySelectorAll(e) : n = document.querySelectorAll(e), Array.from(n);
  }
  return e instanceof HTMLCollection ? Array.from(e) : e instanceof Node ? [e] : e instanceof _ ? e.nodes : e;
}
const q = (e) => L + e, P = function(e, t = "append") {
  return this.queue(() => {
    d(e) || (e = [e]);
    for (const n of this.nodes) {
      const i = n;
      for (const s of e)
        (s instanceof Element || s instanceof Node) && i.parentNode && (t === "prepend" ? i.parentNode.insertBefore(s, i) : i.parentNode.insertBefore(s, i.nextSibling)), typeof s == "string" && (t === "prepend" ? i.insertAdjacentHTML("beforebegin", s) : i.insertAdjacentHTML("afterend", s));
    }
  }), this;
}, N = function(e) {
  return P.call(this, e, "prepend"), this;
}, z = function(e) {
  return P.call(this, e, "append"), this;
}, E = function(e, t = "append") {
  return this.queue(() => {
    d(e) || (e = [e]);
    for (const n of this.nodes) {
      const i = n;
      for (const s of e)
        (s instanceof Element || s instanceof Node) && (t === "prepend" ? i.insertBefore(s, i.firstChild) : i.appendChild(s)), typeof s == "string" && (t === "prepend" ? i.insertAdjacentHTML("afterbegin", s) : i.insertAdjacentHTML("beforeend", s));
    }
  }), this;
}, Q = function(e) {
  return E.call(this, e, "prepend"), this;
}, U = function(e) {
  return E.call(this, e, "append"), this;
}, W = {
  easing: "linear",
  duration: 300,
  iterations: 1,
  keepStyle: !1
}, k = function(e, t = {}) {
  return this.queue(async () => {
    if (!e)
      return Promise.resolve();
    const { onFinish: n, keepStyle: i, onStart: s, onCancel: o } = Object.assign(W, t);
    e = d(e) ? e : [e], e.length > 1 && e.unshift({});
    const c = e, h = [];
    for (const f of this.nodes) {
      const p = f;
      if (!p.animate)
        return Promise.resolve();
      const l = p.animate(c, t);
      s && s(l), l.onfinish = () => {
        if (n && n(l), i) {
          const a = c.at(-1);
          u(f).css(a);
        }
      }, l.oncancel = (a) => {
        o ? o(l, a) : console.warn(`[$.animate] Animation cancelled 
`, a);
      }, l.onremove = (a) => console.warn(`[$.animate] Animation removed by the browser 
`, a), h.push(l.finished);
    }
    return Promise.allSettled(h);
  }), this;
}, D = function(e) {
  return this.queue(
    () => (
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async (t) => {
        let n = 0;
        for (const i of this.nodes)
          await new Promise((s) => e.apply(i, [
            s,
            {
              self: i,
              index: n,
              instance: this
            }
          ])), n++;
        t(!0);
      })
    )
  ), this;
}, B = function(e) {
  const t = this.nodes[0];
  if (d(e)) {
    const n = e.map((i) => t.getAttribute(i)).filter((i) => i);
    return n.length > 0 ? n : null;
  } else
    return t.getAttribute(e);
};
function w(e, t, n) {
  j(n) ? e.removeAttribute(t) : e.setAttribute(t, String(n));
}
const K = function(e, t) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const i = n;
      if (typeof e == "string")
        w(i, e, t);
      else if (d(e))
        for (const s of e) {
          const o = Object.keys(s)[0], c = s[o];
          w(i, o, c);
        }
      else if (m(e)) {
        const s = Object.keys(e)[0], o = e[s];
        w(i, s, o);
      }
    }
  }), this;
}, Y = function(e) {
  return this.queue(() => {
    const t = [];
    for (const n of this.nodes) {
      const i = n;
      i.children && (e ? i.childNodes.forEach((s) => {
        const o = s;
        u(o).is(e) && t.push(o);
      }) : t.push(...Array.from(i.children)));
    }
    this.nodes = t;
  }), this;
}, X = function(e) {
  return this.queue(() => {
    for (const t of this.nodes) {
      const n = t;
      e = typeof e == "string" ? [e] : e, n.classList.add(...e);
    }
  }), this;
}, G = function(e) {
  return this.queue(() => {
    for (const t of this.nodes) {
      const n = t;
      e = typeof e == "string" ? [e] : e, n.classList.remove(...e);
    }
  }), this;
}, J = function(e) {
  return this.queue(() => {
    for (const t of this.nodes) {
      const n = t;
      e = typeof e == "string" ? [e] : e;
      for (const i of e)
        n.classList.toggle(i);
    }
  }), this;
}, V = function(e, t = "every") {
  const n = [], i = typeof e == "string" ? [e] : e;
  for (const s of this.nodes) {
    const o = s;
    n.push(i.some((c) => o.classList.contains(c)));
  }
  switch (t) {
    case "some":
      return n.some((s) => s);
    case "every":
      return n.every((s) => s);
    case "none":
      return !n.some((s) => s);
  }
}, Z = function(e) {
  return this.queue(async () => {
    const t = [];
    for (const n of this.nodes)
      t.push(new Promise((i) => {
        u(n).on("click", (s) => {
          i(!0), e && e.apply(n, [s, this]);
        });
      }));
    return Promise.allSettled(t);
  }), this;
}, ee = function(e, t) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const i = n;
      j(t) ? Object.assign(i.style, e) : typeof e == "string" && i.style.setProperty(e, String(t));
    }
  }), this;
}, te = function(e) {
  this.queue(() => {
    for (const t of this.nodes) {
      const n = t;
      if (e && !u(n).is(e))
        return;
      n.remove();
    }
  });
}, ne = function(e) {
  return this.queue(() => {
    this.nodes.forEach((t, n) => {
      e.apply(t, [
        {
          index: n,
          self: t,
          instance: this
        }
      ]);
    });
  }), this;
}, se = function(e) {
  return this.queue(() => {
    this.nodes = this.nodes.filter((t, n) => n % 2 === 0), e && this.nodes.forEach((t, n) => {
      e.apply(t, [
        {
          instance: this,
          self: t,
          index: n
        }
      ]);
    });
  }), this;
}, ie = function(e) {
  const { duration: t, to: n, easing: i } = Object.assign({
    duration: 300,
    to: 1,
    easing: "linear"
  }, e);
  return this.queue(() => {
    for (const s of this.nodes)
      u(s).animate([{ opacity: n }], { duration: t, easing: i, keepStyle: !0 });
  }), this;
}, oe = function(e) {
  const { duration: t, to: n, easing: i } = Object.assign({
    duration: 300,
    to: 0,
    easing: "linear"
  }, e);
  return this.queue(() => {
    for (const s of this.nodes)
      u(s).animate([{ opacity: n }], { duration: t, easing: i, keepStyle: !0 });
  }), this;
}, re = function(e = {}) {
  return this.queue(() => {
    for (const t of this.nodes) {
      const n = t, i = Number.parseFloat(n.style.opacity), s = {
        duration: 300,
        off: 0,
        on: 1,
        easing: "linear"
      };
      typeof e == "number" && (e = { duration: e });
      const { duration: o, off: c, on: h, easing: f } = Object.assign(s, e);
      i === 0 || i < h ? u(n).fadeIn({ duration: o, to: h, easing: f }) : u(n).fadeOut({ duration: o, to: c, easing: f });
    }
  }), this;
}, ce = function(e, t) {
  return this.queue(() => {
    const n = [];
    this.nodes.forEach((i, s) => {
      const o = i;
      if (d(e))
        switch (t) {
          case "every": {
            e.every((c) => o.matches(c)) && n.push(o);
            break;
          }
          case "none": {
            e.some((c) => o.matches(c)) || n.push(o);
            break;
          }
          case "some":
          default:
            e.some((c) => o.matches(c)) && n.push(o);
        }
      else typeof e == "string" ? u(o).is(e) && n.push(o) : e.apply(o, [
        { instance: this, self: o, index: s }
      ]) && n.push(o);
    }), this.nodes = n;
  }), this;
}, ue = function(e) {
  return this.queue(() => {
    this.nodes = [this.nodes[0]], e && e.apply(this.nodes[0], [
      {
        self: this.nodes[0],
        instance: this
      }
    ]);
  }), this;
}, he = async function(e, t, n) {
  const i = n ?? document;
  if (typeof e == "string") {
    const s = i.querySelector(e);
    if (!s)
      return Promise.reject(new Error("[$.fullscreen] Target does not exist"));
    e = s;
  }
  if (e) {
    const s = e;
    return Object.hasOwn(e, "requestFullscreen") ? (i.fullscreenElement && i.exitFullscreen(), s.requestFullscreen(t).then(() => {
      t != null && t.onOpen && (t == null || t.onOpen.apply(e));
    }).catch(
      (o) => t != null && t.onError ? t == null ? void 0 : t.onError.apply(e, [o]) : Promise.reject(new Error("[$.fullscreen] Error during initialization."))
    )) : Promise.reject(new Error("[$.fullscreen] Target does not implement the fullscreen API"));
  }
  return Promise.reject(new Error("[$.fullscreen] Target does not exist"));
}, fe = function(e, t) {
  return this.queue(() => (m(e) ? (t = e, e = this.nodes[0]) : e ?? (e = this.nodes[0]), he(e, t, this.doc))), this;
};
function de(e) {
  return this.queue(() => {
    if (this.nodes.length === 0)
      return;
    if (!e)
      return this.nodes;
    const t = [];
    for (const n of this.nodes)
      n && t.push(Reflect.get(n, e));
    return t.length === 1 ? t[0] : t;
  });
}
const le = function(e, t) {
  if (H(e)) {
    const n = [];
    this.nodes.forEach((i, s) => {
      const o = i;
      n[s] = o.cloneNode(!0), u(o).on(
        "mouseenter",
        (c) => e.apply(o, [c, this]),
        t
      ), u(o).on("mouseleave", () => {
        const c = n[s];
        o.removeAttribute("style"), o.removeAttribute("class"), o.innerHTML = c.innerHTML;
        for (const f in c.classList)
          o.classList.add(f);
        const h = [];
        for (; o.attributes.length > 0; ) {
          const f = o.attributes[0].name;
          o.removeAttribute(f), u(c).getAttr(f) && h.push(f);
        }
        for (const f of h)
          u(o).setAttr(f, u(c).getAttr(f));
      });
    });
  } else {
    const { enter: n, leave: i } = e;
    for (const s of this.nodes) {
      const o = s;
      u(o).on(
        "mouseenter",
        (c) => n.apply(o, [c, this]),
        t
      ), u(o).on(
        "mouseleave",
        (c) => i.apply(o, [c, this]),
        t
      );
    }
  }
  return this;
}, ae = function(e, t = "every") {
  const n = [];
  for (const i of this.nodes) {
    const s = i;
    if (d(e))
      for (const o of e)
        n.push(s.matches && s.matches(o));
    else s.matches && s.matches(e) ? n.push(!0) : n.push(!1);
  }
  switch (t) {
    case "some":
      return n.some((i) => i);
    case "none":
      return !n.some((i) => i);
    case "every":
      return n.every((i) => i);
  }
};
class pe {
  constructor(t) {
    r(this, "curryInstance");
    this.curryInstance = t;
  }
  /**
   * Same as addEventListener('keydown')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  down(t, n) {
    v.call(this.curryInstance, "keydown", t, n);
  }
  /**
   * Same as addEventListener('keyup')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  up(t, n) {
    v.call(this.curryInstance, "keyup", t, n);
  }
  /**
   * Same as addEventListener('keypress')
   *
   * @param keys Key or an array of keys (use capital letters for functional keys)
   * @param callback  Executed when the key(s) is/are pressed in the exact order
   */
  /* c8 ignore next 3 */
  press(t, n) {
    v.call(this.curryInstance, "keypress", t, n);
  }
}
class ye {
  constructor(t = 10) {
    r(this, "registry", []);
    r(this, "max", 0);
    this.max = t;
  }
  // Add a new key press to the registry
  add(t) {
    this.registry.push(t), this.registry.length > this.max && this.registry.shift();
  }
  pressing(t) {
    return t.every(
      (n, i) => this.registry.at(i - t.length) === n
    );
  }
}
function v(e, t, n) {
  const i = Array.isArray(t) ? t : [t], s = new ye(i.length);
  for (const o of this.nodes)
    u(o).on(e, (c) => {
      c = c, s.add(c.key), s.pressing(i) && n.apply(o, [c, this]);
    });
}
const be = function(e) {
  return this.queue(() => {
    const t = this.nodes.length;
    this.nodes = [this.nodes[t - 1]], e && e.apply(this.nodes[0], [
      {
        self: this.nodes[0],
        instance: this,
        index: t - 1
      }
    ]);
  }), this;
}, ge = function(e, t) {
  return T.apply(this, ["next", e, t]);
}, me = function(e, t) {
  return this.queue(() => {
    const n = [];
    typeof e == "number" && (e = [e]);
    for (let i = 1; i <= this.nodes.length; i++)
      e.includes(i) && n.push(this.nodes[i - 1]);
    this.nodes = n, t && this.nodes.forEach((i, s) => {
      t.apply(i, [
        {
          instance: this,
          self: i,
          /* c8 ignore next 1 */
          index: Array.isArray(e) ? e[s] : e
        }
      ]);
    });
  }), this;
}, _e = function(e, t) {
  return this.queue(
    () => new Promise((n) => {
      const i = [];
      Promise.all(
        this.nodes.map(async (s) => {
          const o = await u(s).children().nth(e).get();
          o && (i.push(...o), t && o.map(
            (c, h) => t.apply(c, [
              {
                self: c,
                instance: this,
                index: Array.isArray(e) ? e[h] : e
              }
            ])
          ));
        })
      ).then(() => {
        this.nodes = i, n(!0);
      });
    })
  ), this;
}, we = function(e) {
  return this.queue(() => {
    this.nodes = this.nodes.filter((t, n) => n % 2 !== 0), e && this.nodes.forEach((t, n) => {
      e.apply(t, [
        {
          instance: this,
          self: t,
          index: n
        }
      ]);
    });
  }), this;
}, ve = function(e, t, n) {
  return this.queue(async () => {
    const i = [];
    for (const s of this.nodes)
      i.push(new Promise((o) => {
        s.addEventListener(
          e,
          (c) => {
            o(!0), t && t.apply(s, [c, this]);
          },
          n
        );
      }));
    return Promise.allSettled(i);
  }), this;
}, y = /* @__PURE__ */ new WeakMap(), qe = function(e, t, n) {
  return this.queue(() => {
    if (!("IntersectionObserver" in window))
      return console.warn("Unsupported API - Intersection Observer");
    const i = {
      rootMargin: "0px",
      threshold: 0.1
    };
    n = Object.assign(i, n, e);
    for (const s of this.nodes) {
      const o = new IntersectionObserver((c, h) => {
        t.apply(s, [c, h]);
      }, i);
      o.observe(s), y.set(s, o);
    }
  }), this;
};
function Ae(e) {
  y.has(e) && (y.get(e).disconnect(), y.delete(e));
}
const Se = function() {
  return this.queue(() => {
    for (const e of this.nodes)
      Ae(e);
  }), this;
}, b = /* @__PURE__ */ new WeakMap(), Pe = function(e, t = {}) {
  return this.queue(async () => "MutationObserver" in window ? new Promise((n) => {
    t = Object.assign(t, {
      attributes: !0,
      childList: !0,
      subtree: !0
    });
    for (const s of this.nodes) {
      const o = new MutationObserver((c, h) => {
        e.apply(s, [c, h]), n(!0);
      });
      o.observe(s, t), b.set(s, o);
    }
  }) : console.warn("Unsupported API - Mutation Observer")), this;
};
function A(e) {
  b.has(e) && (b.get(e).disconnect(), b.delete(e));
}
const Ee = function() {
  return this.queue(() => {
    for (const e of this.nodes)
      A(e);
  }), this;
};
function Ge(e) {
  if (e instanceof Node)
    A(e);
  else
    for (const t of e)
      A(t);
}
const g = /* @__PURE__ */ new WeakMap(), Oe = function(e, t) {
  return this.queue(async () => "ResizeObserver" in window ? new Promise((n) => {
    for (const i of this.nodes) {
      const s = new ResizeObserver((c, h) => {
        e.apply(i, [c, h]), n(!0);
      }), o = i;
      s.observe(o, t), g.set(o, s);
    }
  }) : console.warn("Unsupported API - Mutation Observer")), this;
};
function S(e) {
  g.has(e) && (g.get(e).disconnect(), g.delete(e));
}
const Ce = function() {
  return this.queue(() => {
    for (const e of this.nodes)
      S(e);
  }), this;
};
function Je(e) {
  if (e instanceof Node)
    S(e);
  else
    for (const t of e)
      S(t);
}
const xe = function(e) {
  return this.queue(() => {
    const t = /* @__PURE__ */ new Set();
    for (const n of this.nodes) {
      const i = n;
      if (i.parentNode)
        if (e) {
          const s = i.parentNode;
          u(s).is(e) && t.add(s);
        } else
          t.add(i.parentNode);
    }
    this.nodes = Array.from(t);
  }), this;
}, je = function(e, t) {
  return T.apply(this, ["prev", e, t]);
}, Te = function(e, t) {
  return this.queue(() => {
    if (!e)
      return;
    const n = I(e, this.doc);
    this.nodes = t ? [...this.nodes, ...n] : n;
  }), this;
}, C = function(e, t, n) {
  var i;
  if (typeof e == "string") {
    const s = (n ?? document).querySelector(e);
    if (!s)
      return;
    e = s;
  }
  if (typeof t == "string")
    if (t.startsWith("<") && t.endsWith(">"))
      t = $(t);
    else {
      const s = (n ?? document).querySelector(t);
      if (!s)
        return;
      t = s;
    }
  t && e && ((i = e.parentNode) == null || i.replaceChild(t, e));
}, Ie = function(e, t, n) {
  return this.queue(() => {
    t ? C(e, t, n) : C(this.nodes[0], e, n);
  }), this;
}, Me = function(e) {
  return e ? (this.queue(async () => await e.call(this)), this) : this;
}, Re = function(e) {
  return this.queue(() => {
    var n;
    const t = [];
    for (const i of this.nodes) {
      const s = i;
      let o = (n = s == null ? void 0 : s.parentElement) == null ? void 0 : n.firstChild;
      for (; o; )
        !o.isEqualNode(s) && o.nodeType === 1 && (e && u(o).is(e) || !e) && t.push(o), o = o.nextSibling;
    }
    this.nodes = t;
  }), this;
}, Le = function(e) {
  return this.queue(() => {
    var n;
    const t = [];
    for (const i of this.nodes) {
      const s = i;
      let o = (n = s == null ? void 0 : s.parentElement) == null ? void 0 : n.firstChild;
      for (; o && !o.isEqualNode(s); )
        o.nodeType === 1 && (e && u(o).is(e) || !e) && t.push(o), o = o.nextSibling;
    }
    this.nodes = t;
  }), this;
}, He = function(e) {
  return this.queue(() => {
    const t = [];
    for (const n of this.nodes) {
      const i = n;
      let s = i.nextSibling;
      for (; s; )
        !s.isEqualNode(i) && s.nodeType === 1 && (e && u(s).is(e) || !e) && t.push(s), s = s.nextSibling;
    }
    this.nodes = t;
  }), this;
}, $e = function(e = 300, t = "linear") {
  return this.queue(async () => {
    const n = [];
    for (const i of this.nodes) {
      const s = i, o = s.scrollHeight;
      n.push(
        u(s).setAttr(q("original-height"), o).css("overflow", "hidden").animate({ height: "0px" }, {
          easing: t,
          duration: e,
          keepStyle: !0
        }).css("display", "none").await
      );
    }
    return Promise.allSettled(n);
  }), this;
}, Fe = function(e = 300, t = "linear") {
  return this.queue(async () => {
    const n = [];
    for (const i of this.nodes) {
      const s = i;
      s.style.removeProperty("display");
      const c = `${u(s).getAttr(q("original-height")) ?? s.scrollHeight}px`;
      n.push(
        u(s).animate({ height: c }, { easing: t, duration: e }).run(() => {
          s.style.removeProperty("overflow"), s.style.removeProperty("height");
        }).setAttr(q("original-height"), null).await
      );
    }
    return Promise.allSettled(n);
  }), this;
}, Ne = function(e, t) {
  return this.queue(async () => {
    const {
      duration: n = 300,
      easing: i = t ?? "linear",
      override: s = !1
    } = m(e) ? e : {}, o = [];
    for (const c of this.nodes) {
      const h = c, f = s ? this.nodes[0].style.display === "none" : h.style.display === "none";
      o.push(
        f ? u(h).slideDown(n, i).await : u(h).slideUp(n, i).await
      );
    }
    return Promise.allSettled(o);
  }), this;
}, ze = function(e, t) {
  if (Object.values(e).some((n) => d(n) || m(n)))
    throw new Error("You can only provide primitives as state values");
  for (const n of this.nodes)
    t.apply(n, [e, this]);
  return new Proxy(e, {
    has: (n, i) => Reflect.has(n, i),
    get: (n, i, s) => Reflect.get(n, i, s),
    set: (n, i, s, o) => {
      const c = Reflect.set(n, i, s, o);
      for (const h of this.nodes)
        t.apply(h, [n, this]);
      return c;
    },
    deleteProperty: (n, i) => {
      const s = Reflect.deleteProperty(n, i);
      for (const o of this.nodes)
        t.apply(o, [n, this]);
      return s;
    }
  });
}, x = function(e, t, n) {
  if (typeof e == "string") {
    const o = (n ?? document).querySelector(e);
    if (!o)
      return;
    e = o;
  }
  if (typeof t == "string") {
    const o = (n ?? document).querySelector(t);
    if (!o)
      return;
    t = o;
  }
  const i = e.cloneNode(!0), s = t.cloneNode(!0);
  u(t).replace(i), u(e).replace(s);
}, Qe = function(e, t) {
  return this.queue(() => {
    t ? x(e, t, this.doc) : x(this.nodes[0], e, this.doc);
  }), this;
}, Ue = function(e) {
  return this.queue(() => {
    const t = typeof e == "string" ? document.querySelector(e) : e;
    if (t)
      for (const n of this.nodes)
        t.appendChild(n);
  }), this;
}, We = function(e, t) {
  return this.queue(() => {
    for (const n of this.nodes)
      if (e)
        switch (t) {
          case "prepend": {
            n.textContent = String(e) + n.textContent;
            break;
          }
          case "append": {
            n.textContent = n.textContent + String(e);
            break;
          }
          default:
            n.textContent = String(e);
        }
  }), this;
}, ke = function(e, t = {}) {
  return this.queue(() => {
    for (const n of this.nodes) {
      const i = new CustomEvent(e, {
        detail: t
      });
      n.dispatchEvent(i);
    }
  }), this;
}, De = function() {
  return this.queue(() => {
    for (const e of this.nodes) {
      const t = e;
      t && t.style && t.style.removeProperty("display");
    }
  }), this;
}, Be = function() {
  return this.queue(() => {
    for (const e of this.nodes) {
      const t = e;
      t && t.style && (t.style.display = "none");
    }
  }), this;
}, Ke = function() {
  return this.queue(() => {
    for (const e of this.nodes) {
      const t = e;
      t.style.display === "none" ? u(t).show() : u(t).hide();
    }
  }), this;
}, Ye = function(e = 1) {
  return this.queue(() => F(e)), this;
};
function u(e, t) {
  return new _(e, t);
}
class _ {
  constructor(t, n) {
    r(this, "doc");
    r(this, "nodes");
    r(this, "taskQueue");
    /* ----------  Chaining API  ---------- */
    r(this, "fullscreen", fe.bind(this));
    r(this, "prependChild", Q.bind(this));
    r(this, "toggleClass", J.bind(this));
    r(this, "appendChild", U.bind(this));
    r(this, "fadeToggle", re.bind(this));
    r(this, "asyncEach", D.bind(this));
    r(this, "addClass", X.bind(this));
    r(this, "delClass", G.bind(this));
    r(this, "children", Y.bind(this));
    r(this, "hasClass", V.bind(this));
    r(this, "teleport", Ue.bind(this));
    r(this, "nthChild", _e.bind(this));
    r(this, "addChild", E.bind(this));
    r(this, "prepend", N.bind(this));
    r(this, "setAttr", K.bind(this));
    r(this, "getAttr", B.bind(this));
    r(this, "replace", Ie.bind(this));
    r(this, "trigger", ke.bind(this));
    r(this, "animate", k.bind(this));
    r(this, "fadeOut", oe.bind(this));
    r(this, "filter", ce.bind(this));
    r(this, "fadeIn", ie.bind(this));
    r(this, "append", z.bind(this));
    r(this, "toggle", Ke.bind(this));
    r(this, "parent", xe.bind(this));
    r(this, "click", Z.bind(this));
    r(this, "first", ue.bind(this));
    r(this, "hover", le.bind(this));
    r(this, "wait", Ye.bind(this));
    r(this, "swap", Qe.bind(this));
    r(this, "show", De.bind(this));
    r(this, "hide", Be.bind(this));
    r(this, "query", Te.bind(this));
    r(this, "text", We.bind(this));
    r(this, "each", ne.bind(this));
    r(this, "last", be.bind(this));
    r(this, "even", se.bind(this));
    r(this, "next", ge.bind(this));
    r(this, "prev", je.bind(this));
    r(this, "add", P.bind(this));
    r(this, "del", te.bind(this));
    r(this, "odd", we.bind(this));
    r(this, "get", de.bind(this));
    r(this, "css", ee.bind(this));
    r(this, "nth", me.bind(this));
    r(this, "run", Me.bind(this));
    r(this, "key", new pe(this));
    r(this, "is", ae.bind(this));
    r(this, "on", ve.bind(this));
    r(this, "slideUp", $e.bind(this));
    r(this, "slideDown", Fe.bind(this));
    r(this, "slideToggle", Ne.bind(this));
    r(this, "siblings", Re.bind(this));
    r(this, "prevSiblings", Le.bind(this));
    r(this, "nextSiblings", He.bind(this));
    r(this, "onMutate", Pe.bind(this));
    r(this, "stopOnMutate", Ee.bind(this));
    r(this, "onResize", Oe.bind(this));
    r(this, "stopOnResize", Ce.bind(this));
    r(this, "onIntersect", qe.bind(this));
    r(this, "stopOnIntersect", Se.bind(this));
    // Reactive state
    r(this, "state", ze.bind(this));
    this.doc = n, this.nodes = I(t, n), this.taskQueue = Promise.resolve();
  }
  /**
   * Functions which return Curry instance can be queued to be asyncronously executed.
   */
  async queue(t) {
    return await (this.taskQueue = this.taskQueue.then(t));
  }
  get length() {
    return this.nodes.length;
  }
  get await() {
    return new Promise((t) => this.queue(() => {
      t(!0);
    }));
  }
  /**
   *  Experimental extension API
   *  Expose prototype so that users can extend curry with their own functions
   */
  static $fn(t, n) {
    Object.defineProperty(_.prototype, t, {
      value() {
        return n.apply(this), this;
      }
    });
  }
}
export {
  u as $,
  _ as Curry,
  he as fullscreen,
  C as replace,
  Ge as stopOnMutate,
  Je as stopOnResize,
  x as swap
};
