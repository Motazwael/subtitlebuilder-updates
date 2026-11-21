! function(e) {
    "use strict";
    var t = .01;

    function n(e) {
        var t = e.slice().sort(function(e, t) {
                return e - t
            }),
            n = t[Math.floor(.1 * t.length)];
        return n + .35 * (t[Math.floor(.9 * t.length)] - n)
    }
    var r = {
        envelope: function(e, n) {
            for (var r = Math.floor(n * t), s = [], o = 0; o + r <= e.length; o += r) {
                for (var a = 0, h = 0; h < r; h++) a += e[o + h] * e[o + h];
                s.push(10 * Math.log10(a / r + 1e-10))
            }
            return s
        },
        refine: function(e, r, s) {
            s = s || {};
            var o, a = n(r),
                h = s.minSil || .12,
                f = s.reach || .6,
                u = [],
                l = 0;
            for (o = 0; o < e.length; o++) u.push({
                s: e[o].s,
                e: e[o].e
            });
            if (!u.length) return {
                times: u,
                moved: 0,
                thr: a
            };
            var i = function(e, n, r) {
                    for (var s = [], o = 0, a = e.length, h = Math.round(r / t); o < a;)
                        if (e[o] >= n) o++;
                        else {
                            for (var f = o; f < a && e[f] < n;) f++;
                            f - o >= h && s.push({
                                s: o * t,
                                e: f * t
                            }), o = f
                        } return s
                }(r, a, h),
                v = {};
            i.forEach(function(e) {
                var t = (e.s + e.e) / 2,
                    n = -1,
                    r = 1e9;
                for (o = 0; o + 1 < u.length; o++) {
                    var s = (u[o].e + u[o + 1].s) / 2,
                        a = Math.abs(s - t);
                    a < r && (r = a, n = o)
                }
                n < 0 || r > f || (!v[n] || e.e - e.s > v[n].e - v[n].s) && (v[n] = e)
            }), Object.keys(v).forEach(function(e) {
                var t = +e,
                    n = v[e],
                    r = u[t],
                    s = u[t + 1];
                n.s > r.s + .05 && n.s < s.e && (Math.abs(r.e - n.s) > .01 && l++, r.e = Math.min(n.s, s.s > n.s ? s.s : n.s)), n.e < s.e - .05 && n.e > r.s && (Math.abs(s.s - n.e) > .01 && l++, s.s = Math.max(n.e, r.e))
            });
            var c = i.filter(function(e) {
                return e.e <= u[0].e + .2 && e.e > u[0].s - f && e.e < u[0].e - .05
            });
            if (c.length) {
                var M = c[c.length - 1];
                M.e > u[0].s - f && (u[0].s = M.e, l++)
            }
            var d = u.length - 1,
                g = i.filter(function(e) {
                    return e.s >= u[d].s + .05 && e.s < u[d].e + f
                });
            for (g.length && (u[d].e = g[0].s, l++), o = 0; o < u.length; o++) u[o].e < u[o].s + .05 && (u[o].e = u[o].s + .05);
            return {
                times: u,
                moved: l,
                thr: a
            }
        },
        threshold: n,
        nearestOnset: function(e, n, r, s, o) {
            for (var a = Math.round(r / t), h = Math.round(s / t), f = null, u = Math.max(o, a - h); u <= Math.min(e.length - 1, a + h); u++)
                if (!(e[u] < n)) {
                    for (var l = !0, i = 1; i <= o; i++)
                        if (e[u - i] >= n) {
                            l = !1;
                            break
                        } l && (null == f || Math.abs(u - a) < Math.abs(f - a)) && (f = u)
                } return null == f ? null : f * t
        }
    };
    e.SubOnset = r, "undefined" != typeof module && module.exports && (module.exports = r)
}("undefined" != typeof window ? window : this);