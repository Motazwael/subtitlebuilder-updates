! function(r) {
    "use strict";
    var n = function(r) {
        return r >= "ء" && r <= "ي"
    };

    function e(r) {
        for (var e = r.length - 2; e >= 1; e--) {
            var a = r.charAt(e),
                t = r.charAt(e + 1);
            if (!("بتثجحخسشصضطظعغفقكلمنهيئى".indexOf(a) < 0) && n(t) && "ء" !== t && ("ل" !== a || "ا" !== t && "أ" !== t && "إ" !== t && "آ" !== t)) return e
        }
        return -1
    }

    function a(r, a, t) {
        var i = r.split(" "),
            o = i.map(function() {
                return 0
            }),
            f = [];
        for (i.forEach(function(r, a) {
                (function(r) {
                    for (var e = 0; e < r.length; e++)
                        if ("ـ" !== r.charAt(e) && !n(r.charAt(e))) return !1;
                    return r.length >= 3
                })(r) && r.indexOf("ـ") < 0 && e(r) >= 0 && f.push(a)
            }), f.sort(function(r, n) {
                return i[n].length - i[r].length
            }); a > 0 && f.length;) {
            for (var h = !1, u = 0; u < f.length && a > 0; u++) o[f[u]] < t && (o[f[u]]++, a--, h = !0);
            if (!h) break
        }
        return i.map(function(r, n) {
            if (!o[n]) return r;
            for (var a = e(r), t = "", i = 0; i < o[n]; i++) t += "ـ";
            return r.slice(0, a + 1) + t + r.slice(a + 1)
        }).join(" ")
    }

    function t(r, n) {
        var e, a = [],
            t = 2 === r ? .35 : .2;
        for (e = 0; e < r; e++) a.push("equal" === n ? 1 : 1 - e * t);
        return "up" === n && a.reverse(), a
    }

    function* i(r, n) {
        if (1 !== n)
            for (var e = 1; e <= r - (n - 1); e++)
                for (var a of i(r - e, n - 1)) yield [e].concat(a);
        else yield [r]
    }
    var o = /^(في|على|علي|من|الى|إلى|عن|حتى|مع|بين|عند|نحو|خلال|ضد|منذ|لدى|حول|عبر|تجاه|دون|و|ب|ل|ك|ف|لـ|بـ|كـ|أمام|تحت|فوق|ضمن|رغم|بعد|قبل|أن|إن|ان|أنه|انه|لأن|لان)$/;
    var f = {
        shapeLines: function(r, n) {
            var e = r.join(" "),
                f = e.length,
                h = r.length,
                u = Math.max(8, Math.floor(.88 * n.maxChars)),
                s = Math.max(1, Math.ceil(f / u));
            1 === s && h >= 4 && n.fields >= 2 && f > .55 * n.maxChars && (s = 2), n.minLines && h >= 2 && (s = Math.max(s, Math.min(n.minLines, h))), n.maxWords && (s = Math.max(s, Math.ceil(h / n.maxWords))), s = Math.min(s, n.fields, h);
            var l = Math.ceil(f / n.maxChars) > n.fields || n.maxWords && Math.ceil(h / n.maxWords) > n.fields;
            if (1 === s) return {
                lines: [e],
                over: f > n.maxChars
            };
            for (var c, m = null, d = 1 / 0, v = s, x = s, g = Math.min(n.fields, h), p = x; p <= g; p++) {
                var M = (c = t(p, n.shape)).reduce(function(r, n) {
                    return r + n
                }, 0);
                for (var W of i(h, p)) {
                    var C = 0,
                        b = 5 * (p - x);
                    W.forEach(function(e, a) {
                        var t = r.slice(C, C + e).join(" ").length;
                        C += e, b += Math.abs(t - c[a] / M * f), t > u && (b += 1e3 * (t - u)), 1 === e && t <= 3 && (b += 6), n.maxWords && e > n.maxWords && (b += 500 * (e - n.maxWords))
                    }), b < d && (d = b, m = W, v = p)
                }
            }
            c = t(s = v, n.shape), m = m.slice();
            for (var j = 0; j + 1 < m.length; j++) {
                for (var w = 0, y = 0; y <= j; y++) w += m[y];
                m[j] > 1 && o.test(String(r[w - 1]).replace(/[\u064B-\u0652\u0640]/g, "")) && (m[j]--, m[j + 1]++)
            }
            var A = [],
                E = 0;
            if (m.forEach(function(n) {
                    A.push(r.slice(E, E + n).join(" ")), E += n
                }), n.kashida) {
                var k = 0;
                A.forEach(function(r, n) {
                    k = Math.max(k, r.length / c[n])
                }), A = A.map(function(r, n) {
                    var e = Math.round(k * c[n]) - r.length;
                    return (e = Math.min(e, Math.floor(.3 * r.length), u - r.length)) > 0 ? a(r, e, 3) : r
                })
            }
            return {
                lines: A,
                over: l || A.some(function(r) {
                    return r.length > n.maxChars + 3
                })
            }
        },
        kashidize: a,
        bestPos: e
    };
    r.SubShape = f, "undefined" != typeof module && module.exports && (module.exports = f)
}("undefined" != typeof window ? window : this);