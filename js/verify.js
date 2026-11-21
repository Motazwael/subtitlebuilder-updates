! function(e) {
    "use strict";

    function r(e) {
        return String(e).normalize("NFKC").replace(/[ـً-ْٰ]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/[ؤئ]/g, "ء").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase()
    }
    var n = /^(وال|بال|كال|فال|لل|ال|و|ب|ل|ك|ف)/;

    function t(e, r) {
        if (!e || !r) return !1;
        if (e === r) return !0;
        var t = e.replace(n, ""),
            a = r.replace(n, "");
        if (t.length >= 3 && t === a) return !0;
        var o = Math.max(e.length, r.length);
        return o >= 4 && Math.abs(e.length - r.length) <= 2 && function(e, r) {
            var n, t, a, o = e.length,
                u = r.length,
                i = [];
            for (t = 0; t <= u; t++) i.push(t);
            for (n = 1; n <= o; n++) {
                for (a = [n], t = 1; t <= u; t++) a.push(Math.min(i[t] + 1, a[t - 1] + 1, i[t - 1] + (e.charAt(n - 1) === r.charAt(t - 1) ? 0 : 1)));
                i = a
            }
            return i[u]
        }(e, r) <= (o >= 8 ? 2 : 1)
    }
    var a = {
        compare: function(e, n, a) {
            var o, u, i = (a = a || {}).maxGap || 3,
                c = e.map(r),
                f = n.map(r),
                l = c.length,
                p = f.length,
                h = [];
            for (o = 0; o <= l; o++) h.push(new Int16Array(p + 1));
            var s = function(e, r) {
                return t(c[e], f[r])
            };
            for (o = l - 1; o >= 0; o--)
                for (u = p - 1; u >= 0; u--) h[o][u] = s(o, u) ? h[o + 1][u + 1] + 1 : Math.max(h[o + 1][u], h[o][u + 1]);
            var g = [],
                m = 0;
            for (o = 0, u = 0; o < l && u < p;) s(o, u) ? (g.push([o, u]), m++, o++, u++) : h[o + 1][u] >= h[o][u + 1] ? o++ : u++;
            var v = [],
                d = [],
                w = [],
                x = -1,
                y = -1,
                M = function(r, t) {
                    var a = r - x - 1,
                        o = t - y - 1;
                    if (a > 0 && 0 === o && a <= i)
                        for (var u = x + 1; u < r; u++) v.push(u);
                    else a > 0 && o > 0 && a <= 3 && o <= 3 ? w.push({
                        script: e.slice(x + 1, r).join(" "),
                        asr: n.slice(y + 1, t).join(" ")
                    }) : 0 === a && o > 0 && o <= 6 && d.push({
                        at: r,
                        words: n.slice(y + 1, t).join(" ")
                    })
                };
            return g.forEach(function(e) {
                M(e[0], e[1]), x = e[0], y = e[1]
            }), M(l, p), {
                remove: v,
                extra: d,
                subs: w,
                matched: m,
                total: l
            }
        },
        same: t,
        n2: r
    };
    e.SubVerify = a, "undefined" != typeof module && module.exports && (module.exports = a)
}("undefined" != typeof window ? window : this);