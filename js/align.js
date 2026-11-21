! function(e) {
    "use strict";

    function t(e) {
        return String(e).normalize("NFKC").replace(/[ـً-ٰٟ]/g, "").replace(/[أإآٱ]/g, "ا").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase()
    }
    var r = {
        norm: t,
        flatten: function(e) {
            var r = [];
            return (e.segments || []).forEach(function(e) {
                (e.words || []).forEach(function(e) {
                    r.push({
                        t: String(null != e.word ? e.word : e.text || ""),
                        s: Number(e.start),
                        e: Number(e.end)
                    })
                })
            }), !r.length && e.words && e.words.forEach(function(e) {
                r.push({
                    t: String(e.word || e.text || ""),
                    s: Number(e.start),
                    e: Number(e.end)
                })
            }), r.filter(function(e) {
                return isFinite(e.s) && isFinite(e.e) && t(e.t)
            })
        },
        mapWords: function(e, r) {
            var n, o, s = e.length,
                a = new Array(s),
                i = 0,
                f = 0;
            for (n = 0; n < s; n++) {
                var u = t(e[n].t);
                if (u)
                    for (o = i; o < Math.min(r.length, i + 4); o++)
                        if (t(r[o].t) === u) {
                            a[n] = {
                                s: r[o].s,
                                e: r[o].e
                            }, i = o + 1, f++;
                            break
                        }
            }
            var h = [];
            for (n = 0; n < s; n++) a[n] && h.push(n);
            if (!h.length) return {
                times: [],
                matched: 0,
                total: s
            };
            for (n = 0; n < s; n++)
                if (!a[n]) {
                    for (var l = n - 1; l >= 0 && !a[l];) l--;
                    for (var c = n + 1; c < s && !a[c];) c++;
                    if (l < 0) a[n] = {
                        s: a[c].s,
                        e: a[c].s
                    };
                    else if (c >= s) a[n] = {
                        s: a[l].e,
                        e: a[l].e
                    };
                    else {
                        var d, m = [];
                        for (d = l + 1; d < c; d++) m.push(d);
                        var g = 0;
                        m.forEach(function(t) {
                            g += Math.max(1, e[t].t.length)
                        });
                        var p = a[l].e,
                            w = Math.max(0, a[c].s - p),
                            v = 0;
                        m.forEach(function(t) {
                            var r = Math.max(1, e[t].t.length);
                            a[t] = {
                                s: p + w * v / g,
                                e: p + w * (v + r) / g
                            }, v += r
                        })
                    }
                } for (n = 1; n < s; n++) a[n].s < a[n - 1].s && (a[n].s = a[n - 1].s), a[n].e < a[n].s && (a[n].e = a[n].s);
            return {
                times: a,
                matched: f,
                total: s
            }
        }
    };
    e.SubAlign = r, "undefined" != typeof module && module.exports && (module.exports = r)
}("undefined" != typeof window ? window : this);