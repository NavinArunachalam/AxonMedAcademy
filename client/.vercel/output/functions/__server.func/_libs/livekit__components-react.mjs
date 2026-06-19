import { r as reactExports } from "./react.mjs";
import { c as RoomEvent, T as Track, P as ParticipantEvent, b as Room, M as MediaDeviceFailure, a as RemoteTrackPublication, R as RemoteAudioTrack } from "./livekit-client.mjs";
var os = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Fe = { exports: {} }, qr = Fe.exports, Rt;
function Kr() {
  return Rt || (Rt = 1, (function(e) {
    (function(t, n) {
      e.exports ? e.exports = n() : t.log = n();
    })(qr, function() {
      var t = function() {
      }, n = "undefined", r = typeof window !== n && typeof window.navigator !== n && /Trident\/|MSIE /.test(window.navigator.userAgent), i = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
      ], o = {}, s = null;
      function a(p, g) {
        var h = p[g];
        if (typeof h.bind == "function")
          return h.bind(p);
        try {
          return Function.prototype.bind.call(h, p);
        } catch {
          return function() {
            return Function.prototype.apply.apply(h, [p, arguments]);
          };
        }
      }
      function c() {
        console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
      }
      function u(p) {
        return p === "debug" && (p = "log"), typeof console === n ? false : p === "trace" && r ? c : console[p] !== void 0 ? a(console, p) : console.log !== void 0 ? a(console, "log") : t;
      }
      function l() {
        for (var p = this.getLevel(), g = 0; g < i.length; g++) {
          var h = i[g];
          this[h] = g < p ? t : this.methodFactory(h, p, this.name);
        }
        if (this.log = this.debug, typeof console === n && p < this.levels.SILENT)
          return "No console available for logging";
      }
      function f(p) {
        return function() {
          typeof console !== n && (l.call(this), this[p].apply(this, arguments));
        };
      }
      function v(p, g, h) {
        return u(p) || f.apply(this, arguments);
      }
      function d(p, g) {
        var h = this, x, T2, E, S = "loglevel";
        typeof p == "string" ? S += ":" + p : typeof p == "symbol" && (S = void 0);
        function b(C) {
          var O = (i[C] || "silent").toUpperCase();
          if (!(typeof window === n || !S)) {
            try {
              window.localStorage[S] = O;
              return;
            } catch {
            }
            try {
              window.document.cookie = encodeURIComponent(S) + "=" + O + ";";
            } catch {
            }
          }
        }
        function P() {
          var C;
          if (!(typeof window === n || !S)) {
            try {
              C = window.localStorage[S];
            } catch {
            }
            if (typeof C === n)
              try {
                var O = window.document.cookie, j = encodeURIComponent(S), k = O.indexOf(j + "=");
                k !== -1 && (C = /^([^;]+)/.exec(
                  O.slice(k + j.length + 1)
                )[1]);
              } catch {
              }
            return h.levels[C] === void 0 && (C = void 0), C;
          }
        }
        function M2() {
          if (!(typeof window === n || !S)) {
            try {
              window.localStorage.removeItem(S);
            } catch {
            }
            try {
              window.document.cookie = encodeURIComponent(S) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            } catch {
            }
          }
        }
        function R(C) {
          var O = C;
          if (typeof O == "string" && h.levels[O.toUpperCase()] !== void 0 && (O = h.levels[O.toUpperCase()]), typeof O == "number" && O >= 0 && O <= h.levels.SILENT)
            return O;
          throw new TypeError("log.setLevel() called with invalid level: " + C);
        }
        h.name = p, h.levels = {
          TRACE: 0,
          DEBUG: 1,
          INFO: 2,
          WARN: 3,
          ERROR: 4,
          SILENT: 5
        }, h.methodFactory = g || v, h.getLevel = function() {
          return E ?? T2 ?? x;
        }, h.setLevel = function(C, O) {
          return E = R(C), O !== false && b(E), l.call(h);
        }, h.setDefaultLevel = function(C) {
          T2 = R(C), P() || h.setLevel(C, false);
        }, h.resetLevel = function() {
          E = null, M2(), l.call(h);
        }, h.enableAll = function(C) {
          h.setLevel(h.levels.TRACE, C);
        }, h.disableAll = function(C) {
          h.setLevel(h.levels.SILENT, C);
        }, h.rebuild = function() {
          if (s !== h && (x = R(s.getLevel())), l.call(h), s === h)
            for (var C in o)
              o[C].rebuild();
        }, x = R(
          s ? s.getLevel() : "WARN"
        );
        var W2 = P();
        W2 != null && (E = R(W2)), l.call(h);
      }
      s = new d(), s.getLogger = function(g) {
        if (typeof g != "symbol" && typeof g != "string" || g === "")
          throw new TypeError("You must supply a name when creating a logger.");
        var h = o[g];
        return h || (h = o[g] = new d(
          g,
          s.methodFactory
        )), h;
      };
      var m = typeof window !== n ? window.log : void 0;
      return s.noConflict = function() {
        return typeof window !== n && window.log === s && (window.log = m), s;
      }, s.getLoggers = function() {
        return o;
      }, s.default = s, s;
    });
  })(Fe)), Fe.exports;
}
var Gr = Kr();
const Qr = /* @__PURE__ */ Yr(Gr);
var ft = function(e, t) {
  return ft = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
  }, ft(e, t);
};
function oe(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  ft(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Jr(e, t, n, r) {
  function i(o) {
    return o instanceof n ? o : new n(function(s) {
      s(o);
    });
  }
  return new (n || (n = Promise))(function(o, s) {
    function a(l) {
      try {
        u(r.next(l));
      } catch (f) {
        s(f);
      }
    }
    function c(l) {
      try {
        u(r.throw(l));
      } catch (f) {
        s(f);
      }
    }
    function u(l) {
      l.done ? o(l.value) : i(l.value).then(a, c);
    }
    u((r = r.apply(e, [])).next());
  });
}
function ln(e, t) {
  var n = { label: 0, sent: function() {
    if (o[0] & 1) throw o[1];
    return o[1];
  }, trys: [], ops: [] }, r, i, o, s = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return s.next = a(0), s.throw = a(1), s.return = a(2), typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(l) {
      return c([u, l]);
    };
  }
  function c(u) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, u[0] && (n = 0)), n; ) try {
      if (r = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done) return o;
      switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
        case 0:
        case 1:
          o = u;
          break;
        case 4:
          return n.label++, { value: u[1], done: false };
        case 5:
          n.label++, i = u[1], u = [0];
          continue;
        case 7:
          u = n.ops.pop(), n.trys.pop();
          continue;
        default:
          if (o = n.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
            n = 0;
            continue;
          }
          if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
            n.label = u[1];
            break;
          }
          if (u[0] === 6 && n.label < o[1]) {
            n.label = o[1], o = u;
            break;
          }
          if (o && n.label < o[2]) {
            n.label = o[2], n.ops.push(u);
            break;
          }
          o[2] && n.ops.pop(), n.trys.pop();
          continue;
      }
      u = t.call(e, n);
    } catch (l) {
      u = [6, l], i = 0;
    } finally {
      r = o = 0;
    }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: true };
  }
}
function we(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function he(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e), i, o = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = r.next()).done; ) o.push(i.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (s) throw s.error;
    }
  }
  return o;
}
function xe(e, t, n) {
  if (arguments.length === 2) for (var r = 0, i = t.length, o; r < i; r++)
    (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return e.concat(o || Array.prototype.slice.call(t));
}
function ge(e) {
  return this instanceof ge ? (this.v = e, this) : new ge(e);
}
function Xr(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), i, o = [];
  return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", s), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function s(d) {
    return function(m) {
      return Promise.resolve(m).then(d, f);
    };
  }
  function a(d, m) {
    r[d] && (i[d] = function(p) {
      return new Promise(function(g, h) {
        o.push([d, p, g, h]) > 1 || c(d, p);
      });
    }, m && (i[d] = m(i[d])));
  }
  function c(d, m) {
    try {
      u(r[d](m));
    } catch (p) {
      v(o[0][3], p);
    }
  }
  function u(d) {
    d.value instanceof ge ? Promise.resolve(d.value.v).then(l, f) : v(o[0][2], d);
  }
  function l(d) {
    c("next", d);
  }
  function f(d) {
    c("throw", d);
  }
  function v(d, m) {
    d(m), o.shift(), o.length && c(o[0][0], o[0][1]);
  }
}
function Zr(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], n;
  return t ? t.call(e) : (e = typeof we == "function" ? we(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function r(o) {
    n[o] = e[o] && function(s) {
      return new Promise(function(a, c) {
        s = e[o](s), i(a, c, s.done, s.value);
      });
    };
  }
  function i(o, s, a, c) {
    Promise.resolve(c).then(function(u) {
      o({ value: u, done: a });
    }, s);
  }
}
function A(e) {
  return typeof e == "function";
}
function yt(e) {
  var t = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, n = e(t);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var it = yt(function(e) {
  return function(n) {
    e(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, i) {
      return i + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function Ve(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var Le = (function() {
  function e(t) {
    this.initialTeardown = t, this.closed = false, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, n, r, i, o;
    if (!this.closed) {
      this.closed = true;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var a = we(s), c = a.next(); !c.done; c = a.next()) {
              var u = c.value;
              u.remove(this);
            }
          } catch (p) {
            t = { error: p };
          } finally {
            try {
              c && !c.done && (n = a.return) && n.call(a);
            } finally {
              if (t) throw t.error;
            }
          }
        else
          s.remove(this);
      var l = this.initialTeardown;
      if (A(l))
        try {
          l();
        } catch (p) {
          o = p instanceof it ? p.errors : [p];
        }
      var f = this._finalizers;
      if (f) {
        this._finalizers = null;
        try {
          for (var v = we(f), d = v.next(); !d.done; d = v.next()) {
            var m = d.value;
            try {
              Dt(m);
            } catch (p) {
              o = o ?? [], p instanceof it ? o = xe(xe([], he(o)), he(p.errors)) : o.push(p);
            }
          }
        } catch (p) {
          r = { error: p };
        } finally {
          try {
            d && !d.done && (i = v.return) && i.call(v);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (o)
        throw new it(o);
    }
  }, e.prototype.add = function(t) {
    var n;
    if (t && t !== this)
      if (this.closed)
        Dt(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var n = this._parentage;
    return n === t || Array.isArray(n) && n.includes(t);
  }, e.prototype._addParent = function(t) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }, e.prototype._removeParent = function(t) {
    var n = this._parentage;
    n === t ? this._parentage = null : Array.isArray(n) && Ve(n, t);
  }, e.prototype.remove = function(t) {
    var n = this._finalizers;
    n && Ve(n, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = (function() {
    var t = new e();
    return t.closed = true, t;
  })(), e;
})(), fn = Le.EMPTY;
function dn(e) {
  return e instanceof Le || e && "closed" in e && A(e.remove) && A(e.add) && A(e.unsubscribe);
}
function Dt(e) {
  A(e) ? e() : e.unsubscribe();
}
var ei = {
  Promise: void 0
}, ti = {
  setTimeout: function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setTimeout.apply(void 0, xe([e, t], he(n)));
  },
  clearTimeout: function(e) {
    return clearTimeout(e);
  },
  delegate: void 0
};
function pn(e) {
  ti.setTimeout(function() {
    throw e;
  });
}
function He() {
}
function Ne$1(e) {
  e();
}
var wt = (function(e) {
  oe(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r.isStopped = false, n ? (r.destination = n, dn(n) && n.add(r)) : r.destination = ii, r;
  }
  return t.create = function(n, r, i) {
    return new Oe(n, r, i);
  }, t.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, t.prototype.error = function(n) {
    this.isStopped || (this.isStopped = true, this._error(n));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = true, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = true, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(n) {
    this.destination.next(n);
  }, t.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
})(Le), ni = (function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(t);
      } catch (r) {
        Me(r);
      }
  }, e.prototype.error = function(t) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(t);
      } catch (r) {
        Me(r);
      }
    else
      Me(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (n) {
        Me(n);
      }
  }, e;
})(), Oe = (function(e) {
  oe(t, e);
  function t(n, r, i) {
    var o = e.call(this) || this, s;
    return A(n) || !n ? s = {
      next: n ?? void 0,
      error: r ?? void 0,
      complete: i ?? void 0
    } : s = n, o.destination = new ni(s), o;
  }
  return t;
})(wt);
function Me(e) {
  pn(e);
}
function ri(e) {
  throw e;
}
var ii = {
  closed: true,
  next: He,
  error: ri,
  complete: He
}, xt = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function et(e) {
  return e;
}
function oi(e) {
  return e.length === 0 ? et : e.length === 1 ? e[0] : function(n) {
    return e.reduce(function(r, i) {
      return i(r);
    }, n);
  };
}
var L$1 = (function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var n = new e();
    return n.source = this, n.operator = t, n;
  }, e.prototype.subscribe = function(t, n, r) {
    var i = this, o = ai(t) ? t : new Oe(t, n, r);
    return Ne$1(function() {
      var s = i, a = s.operator, c = s.source;
      o.add(a ? a.call(o, c) : c ? i._subscribe(o) : i._trySubscribe(o));
    }), o;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (n) {
      t.error(n);
    }
  }, e.prototype.forEach = function(t, n) {
    var r = this;
    return n = Ft$1(n), new n(function(i, o) {
      var s = new Oe({
        next: function(a) {
          try {
            t(a);
          } catch (c) {
            o(c), s.unsubscribe();
          }
        },
        error: o,
        complete: i
      });
      r.subscribe(s);
    });
  }, e.prototype._subscribe = function(t) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t);
  }, e.prototype[xt] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    return oi(t)(this);
  }, e.prototype.toPromise = function(t) {
    var n = this;
    return t = Ft$1(t), new t(function(r, i) {
      var o;
      n.subscribe(function(s) {
        return o = s;
      }, function(s) {
        return i(s);
      }, function() {
        return r(o);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
})();
function Ft$1(e) {
  var t;
  return (t = e ?? ei.Promise) !== null && t !== void 0 ? t : Promise;
}
function si(e) {
  return e && A(e.next) && A(e.error) && A(e.complete);
}
function ai(e) {
  return e && e instanceof wt || si(e) && dn(e);
}
function ci(e) {
  return A(e?.lift);
}
function B(e) {
  return function(t) {
    if (ci(t))
      return t.lift(function(n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function z(e, t, n, r, i) {
  return new ui(e, t, n, r, i);
}
var ui = (function(e) {
  oe(t, e);
  function t(n, r, i, o, s, a) {
    var c = e.call(this, n) || this;
    return c.onFinalize = s, c.shouldUnsubscribe = a, c._next = r ? function(u) {
      try {
        r(u);
      } catch (l) {
        n.error(l);
      }
    } : e.prototype._next, c._error = o ? function(u) {
      try {
        o(u);
      } catch (l) {
        n.error(l);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, c._complete = i ? function() {
      try {
        i();
      } catch (u) {
        n.error(u);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, c;
  }
  return t.prototype.unsubscribe = function() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      e.prototype.unsubscribe.call(this), !r && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }, t;
})(wt), li = yt(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), ie = (function(e) {
  oe(t, e);
  function t() {
    var n = e.call(this) || this;
    return n.closed = false, n.currentObservers = null, n.observers = [], n.isStopped = false, n.hasError = false, n.thrownError = null, n;
  }
  return t.prototype.lift = function(n) {
    var r = new Nt(this, this);
    return r.operator = n, r;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new li();
  }, t.prototype.next = function(n) {
    var r = this;
    Ne$1(function() {
      var i, o;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var s = we(r.currentObservers), a = s.next(); !a.done; a = s.next()) {
            var c = a.value;
            c.next(n);
          }
        } catch (u) {
          i = { error: u };
        } finally {
          try {
            a && !a.done && (o = s.return) && o.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, t.prototype.error = function(n) {
    var r = this;
    Ne$1(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = true, r.thrownError = n;
        for (var i = r.observers; i.length; )
          i.shift().error(n);
      }
    });
  }, t.prototype.complete = function() {
    var n = this;
    Ne$1(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = true;
        for (var r = n.observers; r.length; )
          r.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    },
    enumerable: false,
    configurable: true
  }), t.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, n);
  }, t.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, t.prototype._innerSubscribe = function(n) {
    var r = this, i = this, o = i.hasError, s = i.isStopped, a = i.observers;
    return o || s ? fn : (this.currentObservers = null, a.push(n), new Le(function() {
      r.currentObservers = null, Ve(a, n);
    }));
  }, t.prototype._checkFinalizedStatuses = function(n) {
    var r = this, i = r.hasError, o = r.thrownError, s = r.isStopped;
    i ? n.error(o) : s && n.complete();
  }, t.prototype.asObservable = function() {
    var n = new L$1();
    return n.source = this, n;
  }, t.create = function(n, r) {
    return new Nt(n, r);
  }, t;
})(L$1), Nt = (function(e) {
  oe(t, e);
  function t(n, r) {
    var i = e.call(this) || this;
    return i.destination = n, i.source = r, i;
  }
  return t.prototype.next = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || i === void 0 || i.call(r, n);
  }, t.prototype.error = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || i === void 0 || i.call(r, n);
  }, t.prototype.complete = function() {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || r === void 0 || r.call(n);
  }, t.prototype._subscribe = function(n) {
    var r, i;
    return (i = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)) !== null && i !== void 0 ? i : fn;
  }, t;
})(ie);
(function(e) {
  oe(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r._value = n, r;
  }
  return Object.defineProperty(t.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: false,
    configurable: true
  }), t.prototype._subscribe = function(n) {
    var r = e.prototype._subscribe.call(this, n);
    return !r.closed && n.next(this._value), r;
  }, t.prototype.getValue = function() {
    var n = this, r = n.hasError, i = n.thrownError, o = n._value;
    if (r)
      throw i;
    return this._throwIfClosed(), o;
  }, t.prototype.next = function(n) {
    e.prototype.next.call(this, this._value = n);
  }, t;
})(ie);
var fi = {
  now: function() {
    return Date.now();
  }
}, di = (function(e) {
  oe(t, e);
  function t(n, r) {
    return e.call(this) || this;
  }
  return t.prototype.schedule = function(n, r) {
    return this;
  }, t;
})(Le), $t = {
  setInterval: function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setInterval.apply(void 0, xe([e, t], he(n)));
  },
  clearInterval: function(e) {
    return clearInterval(e);
  },
  delegate: void 0
}, pi = (function(e) {
  oe(t, e);
  function t(n, r) {
    var i = e.call(this, n, r) || this;
    return i.scheduler = n, i.work = r, i.pending = false, i;
  }
  return t.prototype.schedule = function(n, r) {
    var i;
    if (r === void 0 && (r = 0), this.closed)
      return this;
    this.state = n;
    var o = this.id, s = this.scheduler;
    return o != null && (this.id = this.recycleAsyncId(s, o, r)), this.pending = true, this.delay = r, this.id = (i = this.id) !== null && i !== void 0 ? i : this.requestAsyncId(s, this.id, r), this;
  }, t.prototype.requestAsyncId = function(n, r, i) {
    return i === void 0 && (i = 0), $t.setInterval(n.flush.bind(n, this), i);
  }, t.prototype.recycleAsyncId = function(n, r, i) {
    if (i === void 0 && (i = 0), i != null && this.delay === i && this.pending === false)
      return r;
    r != null && $t.clearInterval(r);
  }, t.prototype.execute = function(n, r) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = false;
    var i = this._execute(n, r);
    if (i)
      return i;
    this.pending === false && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, t.prototype._execute = function(n, r) {
    var i = false, o;
    try {
      this.work(n);
    } catch (s) {
      i = true, o = s || new Error("Scheduled action threw falsy error");
    }
    if (i)
      return this.unsubscribe(), o;
  }, t.prototype.unsubscribe = function() {
    if (!this.closed) {
      var n = this, r = n.id, i = n.scheduler, o = i.actions;
      this.work = this.state = this.scheduler = null, this.pending = false, Ve(o, this), r != null && (this.id = this.recycleAsyncId(i, r, null)), this.delay = null, e.prototype.unsubscribe.call(this);
    }
  }, t;
})(di), Ut = (function() {
  function e(t, n) {
    n === void 0 && (n = e.now), this.schedulerActionCtor = t, this.now = n;
  }
  return e.prototype.schedule = function(t, n, r) {
    return n === void 0 && (n = 0), new this.schedulerActionCtor(this, t).schedule(r, n);
  }, e.now = fi.now, e;
})(), hi = (function(e) {
  oe(t, e);
  function t(n, r) {
    r === void 0 && (r = Ut.now);
    var i = e.call(this, n, r) || this;
    return i.actions = [], i._active = false, i;
  }
  return t.prototype.flush = function(n) {
    var r = this.actions;
    if (this._active) {
      r.push(n);
      return;
    }
    var i;
    this._active = true;
    do
      if (i = n.execute(n.state, n.delay))
        break;
    while (n = r.shift());
    if (this._active = false, i) {
      for (; n = r.shift(); )
        n.unsubscribe();
      throw i;
    }
  }, t;
})(Ut);
new hi(pi);
function mi(e) {
  return e && A(e.schedule);
}
function gi(e) {
  return e[e.length - 1];
}
function St(e) {
  return mi(gi(e)) ? e.pop() : void 0;
}
var Tt = (function(e) {
  return e && typeof e.length == "number" && typeof e != "function";
});
function vn(e) {
  return A(e?.then);
}
function mn(e) {
  return A(e[xt]);
}
function gn(e) {
  return Symbol.asyncIterator && A(e?.[Symbol.asyncIterator]);
}
function bn(e) {
  return new TypeError("You provided " + (e !== null && typeof e == "object" ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function bi() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var yn = bi();
function wn(e) {
  return A(e?.[yn]);
}
function xn(e) {
  return Xr(this, arguments, function() {
    var n, r, i, o;
    return ln(this, function(s) {
      switch (s.label) {
        case 0:
          n = e.getReader(), s.label = 1;
        case 1:
          s.trys.push([1, , 9, 10]), s.label = 2;
        case 2:
          return [4, ge(n.read())];
        case 3:
          return r = s.sent(), i = r.value, o = r.done, o ? [4, ge(void 0)] : [3, 5];
        case 4:
          return [2, s.sent()];
        case 5:
          return [4, ge(i)];
        case 6:
          return [4, s.sent()];
        case 7:
          return s.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return n.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function Sn(e) {
  return A(e?.getReader);
}
function Q(e) {
  if (e instanceof L$1)
    return e;
  if (e != null) {
    if (mn(e))
      return yi(e);
    if (Tt(e))
      return wi(e);
    if (vn(e))
      return xi(e);
    if (gn(e))
      return Tn(e);
    if (wn(e))
      return Si(e);
    if (Sn(e))
      return Ti(e);
  }
  throw bn(e);
}
function yi(e) {
  return new L$1(function(t) {
    var n = e[xt]();
    if (A(n.subscribe))
      return n.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function wi(e) {
  return new L$1(function(t) {
    for (var n = 0; n < e.length && !t.closed; n++)
      t.next(e[n]);
    t.complete();
  });
}
function xi(e) {
  return new L$1(function(t) {
    e.then(function(n) {
      t.closed || (t.next(n), t.complete());
    }, function(n) {
      return t.error(n);
    }).then(null, pn);
  });
}
function Si(e) {
  return new L$1(function(t) {
    var n, r;
    try {
      for (var i = we(e), o = i.next(); !o.done; o = i.next()) {
        var s = o.value;
        if (t.next(s), t.closed)
          return;
      }
    } catch (a) {
      n = { error: a };
    } finally {
      try {
        o && !o.done && (r = i.return) && r.call(i);
      } finally {
        if (n) throw n.error;
      }
    }
    t.complete();
  });
}
function Tn(e) {
  return new L$1(function(t) {
    Ci(e, t).catch(function(n) {
      return t.error(n);
    });
  });
}
function Ti(e) {
  return Tn(xn(e));
}
function Ci(e, t) {
  var n, r, i, o;
  return Jr(this, void 0, void 0, function() {
    var s, a;
    return ln(this, function(c) {
      switch (c.label) {
        case 0:
          c.trys.push([0, 5, 6, 11]), n = Zr(e), c.label = 1;
        case 1:
          return [4, n.next()];
        case 2:
          if (r = c.sent(), !!r.done) return [3, 4];
          if (s = r.value, t.next(s), t.closed)
            return [2];
          c.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return a = c.sent(), i = { error: a }, [3, 11];
        case 6:
          return c.trys.push([6, , 9, 10]), r && !r.done && (o = n.return) ? [4, o.call(n)] : [3, 8];
        case 7:
          c.sent(), c.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (i) throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function ce$1(e, t, n, r, i) {
  r === void 0 && (r = 0), i === void 0 && (i = false);
  var o = t.schedule(function() {
    n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if (e.add(o), !i)
    return o;
}
function Cn$1(e, t) {
  return t === void 0 && (t = 0), B(function(n, r) {
    n.subscribe(z(r, function(i) {
      return ce$1(r, e, function() {
        return r.next(i);
      }, t);
    }, function() {
      return ce$1(r, e, function() {
        return r.complete();
      }, t);
    }, function(i) {
      return ce$1(r, e, function() {
        return r.error(i);
      }, t);
    }));
  });
}
function En(e, t) {
  return t === void 0 && (t = 0), B(function(n, r) {
    r.add(e.schedule(function() {
      return n.subscribe(r);
    }, t));
  });
}
function Ei(e, t) {
  return Q(e).pipe(En(t), Cn$1(t));
}
function Pi(e, t) {
  return Q(e).pipe(En(t), Cn$1(t));
}
function Oi(e, t) {
  return new L$1(function(n) {
    var r = 0;
    return t.schedule(function() {
      r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function Ai(e, t) {
  return new L$1(function(n) {
    var r;
    return ce$1(n, t, function() {
      r = e[yn](), ce$1(n, t, function() {
        var i, o, s;
        try {
          i = r.next(), o = i.value, s = i.done;
        } catch (a) {
          n.error(a);
          return;
        }
        s ? n.complete() : n.next(o);
      }, 0, true);
    }), function() {
      return A(r?.return) && r.return();
    };
  });
}
function Pn(e, t) {
  if (!e)
    throw new Error("Iterable cannot be null");
  return new L$1(function(n) {
    ce$1(n, t, function() {
      var r = e[Symbol.asyncIterator]();
      ce$1(n, t, function() {
        r.next().then(function(i) {
          i.done ? n.complete() : n.next(i.value);
        });
      }, 0, true);
    });
  });
}
function _i(e, t) {
  return Pn(xn(e), t);
}
function ki(e, t) {
  if (e != null) {
    if (mn(e))
      return Ei(e, t);
    if (Tt(e))
      return Oi(e, t);
    if (vn(e))
      return Pi(e, t);
    if (gn(e))
      return Pn(e, t);
    if (wn(e))
      return Ai(e, t);
    if (Sn(e))
      return _i(e, t);
  }
  throw bn(e);
}
function be(e, t) {
  return t ? ki(e, t) : Q(e);
}
yt(function(e) {
  return function(n) {
    n === void 0 && (n = null), e(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this.info = n;
  };
});
function _(e, t) {
  return B(function(n, r) {
    var i = 0;
    n.subscribe(z(r, function(o) {
      r.next(e.call(t, o, i++));
    }));
  });
}
function $i(e, t, n, r, i, o, s, a) {
  var c = [], u = 0, l = 0, f = false, v = function() {
    f && !c.length && !u && t.complete();
  }, d = function(p) {
    return u < r ? m(p) : c.push(p);
  }, m = function(p) {
    u++;
    var g = false;
    Q(n(p, l++)).subscribe(z(t, function(h) {
      t.next(h);
    }, function() {
      g = true;
    }, void 0, function() {
      if (g)
        try {
          u--;
          for (var h = function() {
            var x = c.shift();
            s || m(x);
          }; c.length && u < r; )
            h();
          v();
        } catch (x) {
          t.error(x);
        }
    }));
  };
  return e.subscribe(z(t, d, function() {
    f = true, v();
  })), function() {
  };
}
function Ae(e, t, n) {
  return n === void 0 && (n = 1 / 0), A(t) ? Ae(function(r, i) {
    return _(function(o, s) {
      return t(r, o, i, s);
    })(Q(e(r, i)));
  }, n) : (typeof t == "number" && (n = t), B(function(r, i) {
    return $i(r, i, e, n);
  }));
}
function Ui(e) {
  return Ae(et, e);
}
function Wi() {
  return Ui(1);
}
function ze() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  return Wi()(be(e, St(e)));
}
function U() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  var n = St(e);
  return B(function(r, i) {
    (n ? ze(e, r, n) : ze(e, r)).subscribe(i);
  });
}
var An = "lk";
function K(e) {
  return typeof e > "u" ? false : so(e) || ao(e);
}
function so(e) {
  var t;
  return e ? e.hasOwnProperty("participant") && e.hasOwnProperty("source") && e.hasOwnProperty("track") && typeof ((t = e.publication) == null ? void 0 : t.track) < "u" : false;
}
function ao(e) {
  return e ? e.hasOwnProperty("participant") && e.hasOwnProperty("source") && e.hasOwnProperty("publication") && typeof e.publication < "u" : false;
}
var fo = [
  RoomEvent.ConnectionStateChanged,
  RoomEvent.RoomMetadataChanged,
  RoomEvent.ActiveSpeakersChanged,
  RoomEvent.ConnectionQualityChanged,
  RoomEvent.ParticipantConnected,
  RoomEvent.ParticipantDisconnected,
  RoomEvent.ParticipantPermissionsChanged,
  RoomEvent.ParticipantMetadataChanged,
  RoomEvent.ParticipantNameChanged,
  RoomEvent.ParticipantAttributesChanged,
  RoomEvent.TrackMuted,
  RoomEvent.TrackUnmuted,
  RoomEvent.TrackPublished,
  RoomEvent.TrackUnpublished,
  RoomEvent.TrackStreamStateChanged,
  RoomEvent.TrackSubscriptionFailed,
  RoomEvent.TrackSubscriptionPermissionChanged,
  RoomEvent.TrackSubscriptionStatusChanged
], _n = [
  ...fo,
  RoomEvent.LocalTrackPublished,
  RoomEvent.LocalTrackUnpublished
];
[
  ParticipantEvent.TrackPublished,
  ParticipantEvent.TrackUnpublished,
  ParticipantEvent.TrackMuted,
  ParticipantEvent.TrackUnmuted,
  ParticipantEvent.TrackStreamStateChanged,
  ParticipantEvent.TrackSubscribed,
  ParticipantEvent.TrackUnsubscribed,
  ParticipantEvent.TrackSubscriptionPermissionChanged,
  ParticipantEvent.TrackSubscriptionFailed,
  ParticipantEvent.LocalTrackPublished,
  ParticipantEvent.LocalTrackUnpublished
];
var ho = [
  ParticipantEvent.ConnectionQualityChanged,
  ParticipantEvent.IsSpeakingChanged,
  ParticipantEvent.ParticipantMetadataChanged,
  ParticipantEvent.ParticipantPermissionsChanged,
  ParticipantEvent.TrackMuted,
  ParticipantEvent.TrackUnmuted,
  ParticipantEvent.TrackPublished,
  ParticipantEvent.TrackUnpublished,
  ParticipantEvent.TrackStreamStateChanged,
  ParticipantEvent.TrackSubscriptionFailed,
  ParticipantEvent.TrackSubscriptionPermissionChanged,
  ParticipantEvent.TrackSubscriptionStatusChanged
];
[
  ...ho,
  ParticipantEvent.LocalTrackPublished,
  ParticipantEvent.LocalTrackUnpublished
];
var I$1 = Qr.getLogger("lk-components-js");
I$1.setDefaultLevel("WARN");
var go = /* @__PURE__ */ ((e) => (e.AgentState = "lk.agent.state", e.PublishOnBehalf = "lk.publish_on_behalf", e.TranscriptionFinal = "lk.transcription_final", e.TranscriptionSegmentId = "lk.segment_id", e.TranscribedTrackId = "lk.transcribed_track_id", e))(go || {});
function bo(e) {
  return typeof e == "object";
}
function ws(e) {
  return Array.isArray(e) && e.filter(bo).length > 0;
}
function Y$1(e) {
  return `${An}-${e}`;
}
function Cs(e) {
  const t = qt(e), n = Fn(e.participant).pipe(
    _(() => qt(e)),
    U(t)
  );
  return { className: Y$1(
    e.source === Track.Source.Camera || e.source === Track.Source.ScreenShare ? "participant-media-video" : "participant-media-audio"
  ), trackObserver: n };
}
function qt(e) {
  if (K(e))
    return e.publication;
  {
    const { source: t, name: n, participant: r } = e;
    if (t && n)
      return r.getTrackPublications().find((i) => i.source === t && i.trackName === n);
    if (n)
      return r.getTrackPublicationByName(n);
    if (t)
      return r.getTrackPublication(t);
    throw new Error("At least one of source and name needs to be defined");
  }
}
function ve(e, ...t) {
  return new L$1((r) => {
    const i = () => {
      r.next(e);
    };
    return t.forEach((s) => {
      e.on(s, i);
    }), () => {
      t.forEach((s) => {
        e.off(s, i);
      });
    };
  }).pipe(U(e));
}
function Ce(e, ...t) {
  return new L$1((r) => {
    const i = () => {
      r.next(e);
    };
    return t.forEach((s) => {
      e.on(s, i);
    }), () => {
      t.forEach((s) => {
        e.off(s, i);
      });
    };
  }).pipe(U(e));
}
function Fn(e) {
  return Ce(
    e,
    ParticipantEvent.TrackMuted,
    ParticipantEvent.TrackUnmuted,
    ParticipantEvent.ParticipantPermissionsChanged,
    // ParticipantEvent.IsSpeakingChanged,
    ParticipantEvent.TrackPublished,
    ParticipantEvent.TrackUnpublished,
    ParticipantEvent.LocalTrackPublished,
    ParticipantEvent.LocalTrackUnpublished,
    ParticipantEvent.MediaDevicesError,
    ParticipantEvent.TrackSubscriptionStatusChanged
    // ParticipantEvent.ConnectionQualityChanged,
  ).pipe(
    _((n) => {
      const { isMicrophoneEnabled: r, isCameraEnabled: i, isScreenShareEnabled: o } = n, s = n.getTrackPublication(Track.Source.Microphone), a = n.getTrackPublication(Track.Source.Camera);
      return {
        isCameraEnabled: i,
        isMicrophoneEnabled: r,
        isScreenShareEnabled: o,
        cameraTrack: a,
        microphoneTrack: s,
        participant: n
      };
    })
  );
}
function Js() {
  return { className: "lk-room-container" };
}
function Kt(e, t, n = true) {
  const i = [e.localParticipant, ...Array.from(e.remoteParticipants.values())], o = [];
  return i.forEach((s) => {
    t.forEach((a) => {
      const c = Array.from(
        s.trackPublications.values()
      ).filter(
        (u) => u.source === a && // either return all or only the ones that are subscribed
        (!n || u.track)
      ).map((u) => ({
        participant: s,
        publication: u,
        source: u.source
      }));
      o.push(...c);
    });
  }), { trackReferences: o, participants: i };
}
function Xs(e, t, n) {
  var r, i;
  const o = (r = n.additionalRoomEvents) != null ? r : _n, s = (i = n.onlySubscribed) != null ? i : true, a = Array.from(
    (/* @__PURE__ */ new Set([
      RoomEvent.ParticipantConnected,
      RoomEvent.ParticipantDisconnected,
      RoomEvent.ConnectionStateChanged,
      RoomEvent.LocalTrackPublished,
      RoomEvent.LocalTrackUnpublished,
      RoomEvent.TrackPublished,
      RoomEvent.TrackUnpublished,
      RoomEvent.TrackSubscriptionStatusChanged,
      ...o
    ])).values()
  );
  return ve(e, ...a).pipe(
    _((u) => {
      const l = Kt(u, t, s);
      return I$1.debug(`TrackReference[] was updated. (length ${l.trackReferences.length})`, l), l;
    }),
    U(Kt(e, t, s))
  );
}
reactExports.createContext(void 0);
const jn = reactExports.createContext(
  void 0
);
function Vn() {
  return reactExports.useContext(jn);
}
function fa(e) {
  const t = Vn(), n = e ?? t;
  if (!n)
    throw new Error(
      "No TrackRef, make sure you are inside a TrackRefContext or pass the TrackRef explicitly"
    );
  return n;
}
reactExports.createContext(void 0);
const zn = reactExports.createContext(void 0);
function ts() {
  return reactExports.useContext(zn);
}
function va(e) {
  const t = ts(), n = e ?? t;
  if (!n)
    throw new Error(
      "No room provided, make sure you are inside a Room context or pass the room explicitly"
    );
  return n;
}
reactExports.createContext(void 0);
const rs = reactExports.createContext(void 0);
function M(n) {
  var e, t, o = "";
  if (typeof n == "string" || typeof n == "number") o += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var r = n.length;
    for (e = 0; e < r; e++) n[e] && (t = M(n[e])) && (o && (o += " "), o += t);
  } else for (t in n) n[t] && (o && (o += " "), o += t);
  return o;
}
function F() {
  for (var n, e, t = 0, o = "", r = arguments.length; t < r; t++) (n = arguments[t]) && (e = M(n)) && (o && (o += " "), o += e);
  return o;
}
function I(...n) {
  return (...e) => {
    for (const t of n)
      if (typeof t == "function")
        try {
          t(...e);
        } catch (o) {
          console.error(o);
        }
  };
}
function L(...n) {
  const e = { ...n[0] };
  for (let t = 1; t < n.length; t++) {
    const o = n[t];
    for (const r in o) {
      const f = e[r], c = o[r];
      typeof f == "function" && typeof c == "function" && // This is a lot faster than a regex.
      r[0] === "o" && r[1] === "n" && r.charCodeAt(2) >= /* 'A' */
      65 && r.charCodeAt(2) <= /* 'Z' */
      90 ? e[r] = I(f, c) : (r === "className" || r === "UNSAFE_className") && typeof f == "string" && typeof c == "string" ? e[r] = F(f, c) : e[r] = c !== void 0 ? c : f;
    }
  }
  return e;
}
function J(n) {
  return n !== void 0;
}
function G(...n) {
  return L(...n.filter(J));
}
function T(n, e) {
  return n === "processor" && e && typeof e == "object" && "name" in e ? e.name : (n === "e2ee" || n === "encryption") && e ? "e2ee-enabled" : e;
}
const q = {
  connect: true,
  audio: false,
  video: false
};
function $(n) {
  const {
    token: e,
    serverUrl: t,
    options: o,
    room: r,
    connectOptions: f,
    connect: c,
    audio: p,
    video: y,
    screen: g,
    onConnected: b,
    onDisconnected: C,
    onError: m,
    onMediaDeviceFailure: R,
    onEncryptionError: w,
    simulateParticipants: E,
    ...N
  } = { ...q, ...n };
  o && r && I$1.warn(
    "when using a manually created room, the options object will be ignored. set the desired options directly when creating the room instead."
  );
  const [s, A2] = reactExports.useState(), h = reactExports.useRef(c);
  reactExports.useEffect(() => {
    A2(r ?? new Room(o));
  }, [r, JSON.stringify(o, T)]);
  const O = reactExports.useMemo(() => {
    const { className: d } = Js();
    return L(N, { className: d });
  }, [N]);
  return reactExports.useEffect(() => {
    if (!s) return;
    const d = () => {
      const u = s.localParticipant;
      I$1.debug("trying to publish local tracks"), Promise.all([
        u.setMicrophoneEnabled(!!p, typeof p != "boolean" ? p : void 0),
        u.setCameraEnabled(!!y, typeof y != "boolean" ? y : void 0),
        u.setScreenShareEnabled(!!g, typeof g != "boolean" ? g : void 0)
      ]).catch((v) => {
        I$1.warn(v), m?.(v);
      });
    }, P = (u, v) => {
      const K2 = MediaDeviceFailure.getFailure(u);
      R?.(K2, v);
    }, S = (u) => {
      w?.(u);
    }, k = (u) => {
      C?.(u);
    }, D = () => {
      b?.();
    };
    return s.on(RoomEvent.SignalConnected, d).on(RoomEvent.MediaDevicesError, P).on(RoomEvent.EncryptionError, S).on(RoomEvent.Disconnected, k).on(RoomEvent.Connected, D), () => {
      s.off(RoomEvent.SignalConnected, d).off(RoomEvent.MediaDevicesError, P).off(RoomEvent.EncryptionError, S).off(RoomEvent.Disconnected, k).off(RoomEvent.Connected, D);
    };
  }, [
    s,
    p,
    y,
    g,
    m,
    w,
    R,
    b,
    C
  ]), reactExports.useEffect(() => {
    if (s) {
      if (E) {
        s.simulateParticipants({
          participants: {
            count: E
          },
          publish: {
            audio: true,
            useRealTracks: true
          }
        });
        return;
      }
      if (c) {
        if (h.current = true, I$1.debug("connecting"), !e) {
          I$1.debug("no token yet");
          return;
        }
        if (!t) {
          I$1.warn("no livekit url provided"), m?.(Error("no livekit url provided"));
          return;
        }
        s.connect(t, e, f).catch((d) => {
          I$1.warn(d), h.current === true && m?.(d);
        });
      } else
        I$1.debug("disconnecting because connect is false"), h.current = false, s.disconnect();
    }
  }, [
    c,
    e,
    JSON.stringify(f),
    s,
    m,
    t,
    E
  ]), reactExports.useEffect(() => {
    if (s)
      return () => {
        I$1.info("disconnecting on onmount"), s.disconnect();
      };
  }, [s]), { room: s, htmlProps: O };
}
const W = /* @__PURE__ */ reactExports.forwardRef(function(e, t) {
  const { room: o, htmlProps: r } = $(e);
  return /* @__PURE__ */ reactExports.createElement("div", { ref: t, ...r }, o && /* @__PURE__ */ reactExports.createElement(zn.Provider, { value: o }, /* @__PURE__ */ reactExports.createElement(rs.Provider, { value: e.featureFlags }, e.children)));
});
function ur(e = [
  Track.Source.Camera,
  Track.Source.Microphone,
  Track.Source.ScreenShare,
  Track.Source.ScreenShareAudio,
  Track.Source.Unknown
], n = {}) {
  const t = va(n.room), [o, s] = reactExports.useState([]), [a, i] = reactExports.useState([]), u = reactExports.useMemo(() => e.map((h) => bo(h) ? h.source : h), [JSON.stringify(e)]);
  return reactExports.useEffect(() => {
    const h = Xs(t, u, {
      additionalRoomEvents: n.updateOnlyOn,
      onlySubscribed: n.onlySubscribed
    }).subscribe(({ trackReferences: m, participants: d }) => {
      I$1.debug("setting track bundles", m, d), s(m), i(d);
    });
    return () => h.unsubscribe();
  }, [
    t,
    JSON.stringify(n.onlySubscribed),
    JSON.stringify(n.updateOnlyOn),
    JSON.stringify(e)
  ]), reactExports.useMemo(() => {
    if (ws(e)) {
      const h = an(e, a), m = Array.from(o);
      return a.forEach((d) => {
        h.has(d.identity) && (h.get(d.identity) ?? []).forEach((g) => {
          if (o.find(
            ({ participant: M2, publication: T2 }) => d.identity === M2.identity && T2.source === g
          ))
            return;
          I$1.debug(
            `Add ${g} placeholder for participant ${d.identity}.`
          );
          const k = {
            participant: d,
            source: g
          };
          m.push(k);
        });
      }), m;
    } else
      return o;
  }, [o, a, e]);
}
function on(e, n) {
  const t = new Set(e);
  for (const o of n)
    t.delete(o);
  return t;
}
function an(e, n) {
  const t = /* @__PURE__ */ new Map();
  if (ws(e)) {
    const o = e.filter((s) => s.withPlaceholder).map((s) => s.source);
    n.forEach((s) => {
      const a = s.getTrackPublications().map((u) => u.track?.source).filter((u) => u !== void 0), i = Array.from(
        on(new Set(o), new Set(a))
      );
      i.length > 0 && t.set(s.identity, i);
    });
  }
  return t;
}
go.AgentState;
var ce = { exports: {} }, Ne;
function Cn() {
  if (Ne) return ce.exports;
  Ne = 1;
  var e = typeof Reflect == "object" ? Reflect : null, n = e && typeof e.apply == "function" ? e.apply : function(f, b, v) {
    return Function.prototype.apply.call(f, b, v);
  }, t;
  e && typeof e.ownKeys == "function" ? t = e.ownKeys : Object.getOwnPropertySymbols ? t = function(f) {
    return Object.getOwnPropertyNames(f).concat(Object.getOwnPropertySymbols(f));
  } : t = function(f) {
    return Object.getOwnPropertyNames(f);
  };
  function o(p) {
    console && console.warn && console.warn(p);
  }
  var s = Number.isNaN || function(f) {
    return f !== f;
  };
  function a() {
    a.init.call(this);
  }
  ce.exports = a, ce.exports.once = w, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
  var i = 10;
  function u(p) {
    if (typeof p != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof p);
  }
  Object.defineProperty(a, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return i;
    },
    set: function(p) {
      if (typeof p != "number" || p < 0 || s(p))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + p + ".");
      i = p;
    }
  }), a.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, a.prototype.setMaxListeners = function(f) {
    if (typeof f != "number" || f < 0 || s(f))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + f + ".");
    return this._maxListeners = f, this;
  };
  function l(p) {
    return p._maxListeners === void 0 ? a.defaultMaxListeners : p._maxListeners;
  }
  a.prototype.getMaxListeners = function() {
    return l(this);
  }, a.prototype.emit = function(f) {
    for (var b = [], v = 1; v < arguments.length; v++) b.push(arguments[v]);
    var C = f === "error", R = this._events;
    if (R !== void 0)
      C = C && R.error === void 0;
    else if (!C)
      return false;
    if (C) {
      var y;
      if (b.length > 0 && (y = b[0]), y instanceof Error)
        throw y;
      var N = new Error("Unhandled error." + (y ? " (" + y.message + ")" : ""));
      throw N.context = y, N;
    }
    var x = R[f];
    if (x === void 0)
      return false;
    if (typeof x == "function")
      n(x, this, b);
    else
      for (var j = x.length, z2 = k(x, j), v = 0; v < j; ++v)
        n(z2[v], this, b);
    return true;
  };
  function h(p, f, b, v) {
    var C, R, y;
    if (u(b), R = p._events, R === void 0 ? (R = p._events = /* @__PURE__ */ Object.create(null), p._eventsCount = 0) : (R.newListener !== void 0 && (p.emit(
      "newListener",
      f,
      b.listener ? b.listener : b
    ), R = p._events), y = R[f]), y === void 0)
      y = R[f] = b, ++p._eventsCount;
    else if (typeof y == "function" ? y = R[f] = v ? [b, y] : [y, b] : v ? y.unshift(b) : y.push(b), C = l(p), C > 0 && y.length > C && !y.warned) {
      y.warned = true;
      var N = new Error("Possible EventEmitter memory leak detected. " + y.length + " " + String(f) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      N.name = "MaxListenersExceededWarning", N.emitter = p, N.type = f, N.count = y.length, o(N);
    }
    return p;
  }
  a.prototype.addListener = function(f, b) {
    return h(this, f, b, false);
  }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function(f, b) {
    return h(this, f, b, true);
  };
  function m() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function d(p, f, b) {
    var v = { fired: false, wrapFn: void 0, target: p, type: f, listener: b }, C = m.bind(v);
    return C.listener = b, v.wrapFn = C, C;
  }
  a.prototype.once = function(f, b) {
    return u(b), this.on(f, d(this, f, b)), this;
  }, a.prototype.prependOnceListener = function(f, b) {
    return u(b), this.prependListener(f, d(this, f, b)), this;
  }, a.prototype.removeListener = function(f, b) {
    var v, C, R, y, N;
    if (u(b), C = this._events, C === void 0)
      return this;
    if (v = C[f], v === void 0)
      return this;
    if (v === b || v.listener === b)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete C[f], C.removeListener && this.emit("removeListener", f, v.listener || b));
    else if (typeof v != "function") {
      for (R = -1, y = v.length - 1; y >= 0; y--)
        if (v[y] === b || v[y].listener === b) {
          N = v[y].listener, R = y;
          break;
        }
      if (R < 0)
        return this;
      R === 0 ? v.shift() : M2(v, R), v.length === 1 && (C[f] = v[0]), C.removeListener !== void 0 && this.emit("removeListener", f, N || b);
    }
    return this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(f) {
    var b, v, C;
    if (v = this._events, v === void 0)
      return this;
    if (v.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : v[f] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete v[f]), this;
    if (arguments.length === 0) {
      var R = Object.keys(v), y;
      for (C = 0; C < R.length; ++C)
        y = R[C], y !== "removeListener" && this.removeAllListeners(y);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (b = v[f], typeof b == "function")
      this.removeListener(f, b);
    else if (b !== void 0)
      for (C = b.length - 1; C >= 0; C--)
        this.removeListener(f, b[C]);
    return this;
  };
  function c(p, f, b) {
    var v = p._events;
    if (v === void 0)
      return [];
    var C = v[f];
    return C === void 0 ? [] : typeof C == "function" ? b ? [C.listener || C] : [C] : b ? T2(C) : k(C, C.length);
  }
  a.prototype.listeners = function(f) {
    return c(this, f, true);
  }, a.prototype.rawListeners = function(f) {
    return c(this, f, false);
  }, a.listenerCount = function(p, f) {
    return typeof p.listenerCount == "function" ? p.listenerCount(f) : g.call(p, f);
  }, a.prototype.listenerCount = g;
  function g(p) {
    var f = this._events;
    if (f !== void 0) {
      var b = f[p];
      if (typeof b == "function")
        return 1;
      if (b !== void 0)
        return b.length;
    }
    return 0;
  }
  a.prototype.eventNames = function() {
    return this._eventsCount > 0 ? t(this._events) : [];
  };
  function k(p, f) {
    for (var b = new Array(f), v = 0; v < f; ++v)
      b[v] = p[v];
    return b;
  }
  function M2(p, f) {
    for (; f + 1 < p.length; f++)
      p[f] = p[f + 1];
    p.pop();
  }
  function T2(p) {
    for (var f = new Array(p.length), b = 0; b < f.length; ++b)
      f[b] = p[b].listener || p[b];
    return f;
  }
  function w(p, f) {
    return new Promise(function(b, v) {
      function C(y) {
        p.removeListener(f, R), v(y);
      }
      function R() {
        typeof p.removeListener == "function" && p.removeListener("error", C), b([].slice.call(arguments));
      }
      L2(p, f, R, { once: true }), f !== "error" && O(p, C, { once: true });
    });
  }
  function O(p, f, b) {
    typeof p.on == "function" && L2(p, "error", f, b);
  }
  function L2(p, f, b, v) {
    if (typeof p.on == "function")
      v.once ? p.once(f, b) : p.on(f, b);
    else if (typeof p.addEventListener == "function")
      p.addEventListener(f, function C(R) {
        v.once && p.removeEventListener(f, C), b(R);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof p);
  }
  return ce.exports;
}
Cn();
function Se(t, n = {}) {
  const [a, c] = reactExports.useState(qt(t)), [r, i] = reactExports.useState(a?.isMuted), [o, l] = reactExports.useState(a?.isSubscribed), [s, u] = reactExports.useState(a?.track), [d, h] = reactExports.useState("landscape"), m = reactExports.useRef(), { className: E, trackObserver: w } = reactExports.useMemo(() => Cs(t), [
    t.participant.sid ?? t.participant.identity,
    t.source,
    K(t) && t.publication.trackSid
  ]);
  return reactExports.useEffect(() => {
    const g = w.subscribe((v) => {
      I$1.debug("update track", v), c(v), i(v?.isMuted), l(v?.isSubscribed), u(v?.track);
    });
    return () => g?.unsubscribe();
  }, [w]), reactExports.useEffect(() => (s && (m.current && s.detach(m.current), n.element?.current && !(t.participant.isLocal && s?.kind === "audio") && s.attach(n.element.current)), m.current = n.element?.current, () => {
    m.current && s?.detach(m.current);
  }), [s, n.element]), reactExports.useEffect(() => {
    if (typeof a?.dimensions?.width == "number" && typeof a?.dimensions?.height == "number") {
      const g = a.dimensions.width > a.dimensions.height ? "landscape" : "portrait";
      h(g);
    }
  }, [a]), {
    publication: a,
    isMuted: r,
    isSubscribed: o,
    track: s,
    elementProps: G(n.props, {
      className: E,
      "data-lk-local-participant": t.participant.isLocal,
      "data-lk-source": a?.source,
      ...a?.kind === "video" && { "data-lk-orientation": d }
    })
  };
}
var Y, ue;
function Lt() {
  if (ue) return Y;
  ue = 1;
  var t = "Expected a function", n = NaN, a = "[object Symbol]", c = /^\s+|\s+$/g, r = /^[-+]0x[0-9a-f]+$/i, i = /^0b[01]+$/i, o = /^0o[0-7]+$/i, l = parseInt, s = typeof os == "object" && os && os.Object === Object && os, u = typeof self == "object" && self && self.Object === Object && self, d = s || u || Function("return this")(), h = Object.prototype, m = h.toString, E = Math.max, w = Math.min, g = function() {
    return d.Date.now();
  };
  function v(f, b, p) {
    var R, P, _2, L2, y, T2, F2 = 0, re = false, Z = false, $2 = true;
    if (typeof f != "function")
      throw new TypeError(t);
    b = N(b) || 0, S(p) && (re = !!p.leading, Z = "maxWait" in p, _2 = Z ? E(N(p.maxWait) || 0, b) : _2, $2 = "trailing" in p ? !!p.trailing : $2);
    function U2(k) {
      var x = R, H = P;
      return R = P = void 0, F2 = k, L2 = f.apply(H, x), L2;
    }
    function xe2(k) {
      return F2 = k, y = setTimeout(O, b), re ? U2(k) : L2;
    }
    function Pe(k) {
      var x = k - T2, H = k - F2, ie2 = b - x;
      return Z ? w(ie2, _2 - H) : ie2;
    }
    function ce2(k) {
      var x = k - T2, H = k - F2;
      return T2 === void 0 || x >= b || x < 0 || Z && H >= _2;
    }
    function O() {
      var k = g();
      if (ce2(k))
        return le(k);
      y = setTimeout(O, Pe(k));
    }
    function le(k) {
      return y = void 0, $2 && R ? U2(k) : (R = P = void 0, L2);
    }
    function Te() {
      y !== void 0 && clearTimeout(y), F2 = 0, R = T2 = P = y = void 0;
    }
    function Ae2() {
      return y === void 0 ? L2 : le(g());
    }
    function G2() {
      var k = g(), x = ce2(k);
      if (R = arguments, P = this, T2 = k, x) {
        if (y === void 0)
          return xe2(T2);
        if (Z)
          return y = setTimeout(O, b), U2(T2);
      }
      return y === void 0 && (y = setTimeout(O, b)), L2;
    }
    return G2.cancel = Te, G2.flush = Ae2, G2;
  }
  function S(f) {
    var b = typeof f;
    return !!f && (b == "object" || b == "function");
  }
  function C(f) {
    return !!f && typeof f == "object";
  }
  function A2(f) {
    return typeof f == "symbol" || C(f) && m.call(f) == a;
  }
  function N(f) {
    if (typeof f == "number")
      return f;
    if (A2(f))
      return n;
    if (S(f)) {
      var b = typeof f.valueOf == "function" ? f.valueOf() : f;
      f = S(b) ? b + "" : b;
    }
    if (typeof f != "string")
      return f === 0 ? f : +f;
    f = f.replace(c, "");
    var p = i.test(f);
    return p || o.test(f) ? l(f.slice(2), p ? 2 : 8) : r.test(f) ? n : +f;
  }
  return Y = v, Y;
}
var zt = Lt();
const de = /* @__PURE__ */ Yr(zt);
function Vt(t) {
  const n = reactExports.useRef(t);
  n.current = t, reactExports.useEffect(
    () => () => {
      n.current();
    },
    []
  );
}
function Ft(t, n = 500, a) {
  const c = reactExports.useRef();
  Vt(() => {
    c.current && c.current.cancel();
  });
  const r = reactExports.useMemo(() => {
    const i = de(t, n, a), o = (...l) => i(...l);
    return o.cancel = () => {
      i.cancel();
    }, o.isPending = () => !!c.current, o.flush = () => i.flush(), o;
  }, [t, n, a]);
  return reactExports.useEffect(() => {
    c.current = de(t, n, a);
  }, [t, n, a]), r;
}
function Zt(t, n, a) {
  const c = ((u, d) => u === d), r = t instanceof Function ? t() : t, [i, o] = reactExports.useState(r), l = reactExports.useRef(r), s = Ft(
    o,
    n,
    a
  );
  return c(l.current, r) || (s(r), l.current = r), [i, s];
}
function Ht({
  threshold: t = 0,
  root: n = null,
  rootMargin: a = "0%",
  freezeOnceVisible: c = false,
  initialIsIntersecting: r = false,
  onChange: i
} = {}) {
  var o;
  const [l, s] = reactExports.useState(null), [u, d] = reactExports.useState(() => ({
    isIntersecting: r,
    entry: void 0
  })), h = reactExports.useRef();
  h.current = i;
  const m = ((o = u.entry) == null ? void 0 : o.isIntersecting) && c;
  reactExports.useEffect(() => {
    if (!l || !("IntersectionObserver" in window) || m)
      return;
    const g = new IntersectionObserver(
      (v) => {
        const S = Array.isArray(g.thresholds) ? g.thresholds : [g.thresholds];
        v.forEach((C) => {
          const A2 = C.isIntersecting && S.some((N) => C.intersectionRatio >= N);
          d({ isIntersecting: A2, entry: C }), h.current && h.current(A2, C);
        });
      },
      { threshold: t, root: n, rootMargin: a }
    );
    return g.observe(l), () => {
      g.disconnect();
    };
  }, [
    l,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(t),
    n,
    a,
    m,
    c
  ]);
  const E = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var g;
    !l && ((g = u.entry) != null && g.target) && !c && !m && E.current !== u.entry.target && (E.current = u.entry.target, d({ isIntersecting: r, entry: void 0 }));
  }, [l, u.entry, c, m, r]);
  const w = [
    s,
    !!u.isIntersecting,
    u.entry
  ];
  return w.ref = w[0], w.isIntersecting = w[1], w.entry = w[2], w;
}
const Bt = /* @__PURE__ */ reactExports.forwardRef(
  function({
    onTrackClick: n,
    onClick: a,
    onSubscriptionStatusChanged: c,
    trackRef: r,
    manageSubscription: i,
    ...o
  }, l) {
    const s = fa(r), u = reactExports.useRef(null);
    reactExports.useImperativeHandle(l, () => u.current);
    const d = Ht({ root: u.current }), [h] = Zt(d, 3e3);
    reactExports.useEffect(() => {
      i && s.publication instanceof RemoteTrackPublication && h?.isIntersecting === false && d?.isIntersecting === false && s.publication.setSubscribed(false);
    }, [h, s, i]), reactExports.useEffect(() => {
      i && s.publication instanceof RemoteTrackPublication && d?.isIntersecting === true && s.publication.setSubscribed(true);
    }, [d, s, i]);
    const {
      elementProps: m,
      publication: E,
      isSubscribed: w
    } = Se(s, {
      element: u,
      props: o
    });
    reactExports.useEffect(() => {
      c?.(!!w);
    }, [w, c]);
    const g = (v) => {
      a?.(v), n?.({ participant: s?.participant, track: E });
    };
    return /* @__PURE__ */ reactExports.createElement("video", { ref: u, ...m, muted: true, onClick: g });
  }
), ae = /* @__PURE__ */ reactExports.forwardRef(
  function({ trackRef: n, onSubscriptionStatusChanged: a, volume: c, ...r }, i) {
    const o = fa(n), l = reactExports.useRef(null);
    reactExports.useImperativeHandle(i, () => l.current);
    const {
      elementProps: s,
      isSubscribed: u,
      track: d,
      publication: h
    } = Se(o, {
      element: l,
      props: r
    });
    return reactExports.useEffect(() => {
      a?.(!!u);
    }, [u, a]), reactExports.useEffect(() => {
      d === void 0 || c === void 0 || (d instanceof RemoteAudioTrack ? d.setVolume(c) : I$1.warn("Volume can only be set on remote audio tracks."));
    }, [c, d]), reactExports.useEffect(() => {
      h === void 0 || r.muted === void 0 || (h instanceof RemoteTrackPublication ? h.setEnabled(!r.muted) : I$1.warn("Can only call setEnabled on remote track publications."));
    }, [r.muted, h, d]), /* @__PURE__ */ reactExports.createElement("audio", { ref: l, ...s });
  }
);
export {
  Bt as B,
  W,
  ae as a,
  ur as u
};
