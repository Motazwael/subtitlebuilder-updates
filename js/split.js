! function(t) {
    "use strict";

    function n(t) {
        var n = [];
        return String(t).replace(/\r/g, "").split(/\n+/).forEach(function(t) {
            var r = t.trim().split(/\s+/).filter(Boolean),
                e = [];
            r.forEach(function(t) {
                e.push(t), ".!?؟…,;:،؛".indexOf(t.charAt(t.length - 1)) > -1 && (n.push(e.join(" ")), e = [])
            }), e.length && n.push(e.join(" "))
        }), n
    }

    function r(t, n) {
        for (var e = t.split(" "), a = Math.ceil(t.length / n), i = [], h = 0; a > 1 && h < e.length;) {
            for (var u = e.slice(h).join(" ").length / a, l = e[h++]; h < e.length;) {
                var o = l + " " + e[h];
                if (o.length > n || Math.abs(o.length - u) >= Math.abs(l.length - u)) break;
                l = o, h++
            }
            i.push(l), a--
        }
        if (h < e.length) {
            var s = e.slice(h).join(" ");
            s.length > n && s.indexOf(" ") > -1 ? i = i.concat(r(s, n)) : i.push(s)
        }
        return i
    }

    function e(t, n, r) {
        if (t = String(t).replace(/\s*\n\s*/g, " ").trim(), r < 2 || t.length <= n) return t;
        for (var e = t.split(" "), a = -1, i = 1 / 0, h = 1; h < e.length; h++) {
            var u = e.slice(0, h).join(" ").length,
                l = e.slice(h).join(" ").length,
                o = Math.max(u, l) > n ? 1e3 + Math.max(u, l) : Math.abs(u - l);
            o < i && (i = o, a = h)
        }
        return a < 0 ? t : e.slice(0, a).join(" ") + "\n" + e.slice(a).join(" ")
    }

    function a(t, n) {
        for (t = String(t); t.length < n;) t = "0" + t;
        return t
    }

    function i(t, n) {
        var r = Math.ceil(1e3 * t / n - 1e-6),
            e = Math.floor(r / 36e5);
        r -= 36e5 * e;
        var i = Math.floor(r / 6e4);
        r -= 6e4 * i;
        var h = Math.floor(r / 1e3);
        return r -= 1e3 * h, a(e, 2) + ":" + a(i, 2) + ":" + a(h, 2) + "," + a(r, 3)
    }
    var h = /^(في|على|علي|من|الى|إلى|عن|حتى|مع|بين|عند|نحو|خلال|ضد|منذ|لدى|حول|عبر|تجاه|دون|و|ب|ل|ك|ف|لـ|بـ|كـ|أمام|تحت|فوق|ضمن|عبر|رغم|بعد|قبل|أن|إن|ان|أنه|انه|لأن|لان|قد)$/;

    function u(t) {
        return h.test(String(t).replace(/[\u064B-\u0652\u0640]/g, "").replace(/[.,;:!?\u061F\u060C\u061B\u2026]+$/, "")) && !/[.,;:!?\u061F\u060C\u061B\u2026]$/.test(String(t))
    }

    function l(t, n, r) {
        var e, i = 0;
        for (e = 0; e + 1 < t.length; e++)
            for (var h = t[e], l = t[e + 1]; h.length >= 1 && i++ < 500;) {
                var o = h[h.length - 1];
                if (!u(n[o].t)) break;
                if (l.length + 1 > (r.maxWords || 5) + 1) break;
                l.unshift(h.pop())
            }
        return t.filter(function(t) {
            return t.length
        })
    }
    var o = {
        fixPrepEnds: l,
        prepWord: u,
        byTiming: function(t, n) {
            var r, e = /[.!?\u061F\u2026]$/,
                a = /[.!?\u061F\u2026,;:\u060C\u061B]$/,
                i = [],
                h = [];
            for (r = 0; r < t.length; r++) h.length && t[r].s - t[r - 1].e >= n.pause && (i.push({
                w: h,
                hard: e.test(t[h[h.length - 1]].t),
                brk: !0
            }), h = []), h.push(r), a.test(t[r].t) ? (i.push({
                w: h,
                hard: e.test(t[r].t),
                brk: !0
            }), h = []) : t[r].lb && r < t.length - 1 && (i.push({
                w: h,
                hard: !1,
                brk: !1
            }), h = []);
            h.length && i.push({
                w: h,
                hard: !1,
                brk: !0
            });
            for (var u = 0; u < i.length - 1;) {
                var o = i[u],
                    s = i[u + 1];
                !o.brk && !o.hard && o.w.length + s.w.length <= n.maxWords ? (s.w = o.w.concat(s.w), i.splice(u, 1)) : u++
            }
            for (var f = 0; f < i.length;) {
                if (1 === i[f].w.length) {
                    var c = f > 0 && !i[f - 1].hard && i[f - 1].w.length + 1 <= n.maxWords ? t[i[f].w[0]].s - t[i[f - 1].w[i[f - 1].w.length - 1]].e : 1 / 0,
                        g = f + 1 < i.length && !i[f].hard && i[f + 1].w.length + 1 <= n.maxWords ? t[i[f + 1].w[0]].s - t[i[f].w[0]].e : 1 / 0;
                    if (c >= n.pause && (c = 1 / 0), g >= n.pause && (g = 1 / 0), c !== 1 / 0 && c <= g) {
                        i[f - 1].w = i[f - 1].w.concat(i[f].w), i[f - 1].hard = i[f].hard, i.splice(f, 1);
                        continue
                    }
                    if (g !== 1 / 0) {
                        i[f + 1].w = i[f].w.concat(i[f + 1].w), i.splice(f, 1);
                        continue
                    }
                }
                f++
            }
            var p = [];
            return i.forEach(function(r) {
                for (var e, a = r.w.length, i = Math.max(1, Math.ceil(a / n.maxWords));;) {
                    e = [];
                    var h, u = Math.floor(a / i),
                        l = a % i;
                    for (h = 0; h < i; h++) e.push(u + (h < l ? 1 : 0));
                    var o = 0,
                        s = !1;
                    if (e.forEach(function(e) {
                            r.w.slice(o, o + e).map(function(n) {
                                return t[n].t
                            }).join(" ").length > n.maxChars && (s = !0), o += e
                        }), !s || i >= a) break;
                    i++
                }
                var f = 0;
                e.forEach(function(t) {
                    p.push(r.w.slice(f, f + t)), f += t
                })
            }), l(p, t, n)
        },
        phrases: n,
        splitLong: r,
        breakLines: e,
        toBlocks: function(t, a) {
            var i = a.maxChars * a.maxLines,
                h = [];
            n(t).forEach(function(t) {
                t.length <= i ? h.push(t) : r(t, i).forEach(function(t) {
                    h.push(t)
                })
            });
            var u = [],
                l = "";
            return h.forEach(function(t) {
                l && l.length < a.minChars && (l + " " + t).length <= i ? l += " " + t : (l && u.push(l), l = t)
            }), l && u.push(l), u.map(function(t) {
                return e(t, a.maxChars, a.maxLines)
            })
        },
        buildCues: function(t, n) {
            var r, e = t.length;
            if (!e) return {
                ok: !1,
                error: "No subtitles yet. Split the text first."
            };
            for (r = 0; r < e; r++) {
                if (null == t[r].start || isNaN(t[r].start)) return {
                    ok: !1,
                    error: "Subtitle " + (r + 1) + " has no start time."
                };
                if (r > 0 && t[r].start <= t[r - 1].start) return {
                    ok: !1,
                    error: "Subtitle " + (r + 1) + " starts at or before subtitle " + r + "."
                }
            }
            var a = n.fps,
                i = [],
                h = [];
            for (r = 0; r < e; r++) i.push(Math.round(Math.max(0, t[r].start - n.lead) * a));
            var u = Math.max(1, Math.round(n.minDur * a)),
                l = Math.max(u, Math.round(n.maxDur * a));
            for (r = 0; r < e; r++) {
                var o, s = i[r];
                if (null == t[r].endAbs) {
                    var f = null != t[r].end && null != n.hold ? Math.round((t[r].end + n.hold) * a) : null;
                    if (null != f && null != t[r].limit && (f = Math.min(f, Math.round(t[r].limit * a))), r < e - 1) {
                        var c = i[r + 1];
                        o = Math.min(c, s + l), o = Math.max(o, Math.min(s + u, c)), null != f && (o = Math.min(o, Math.max(f, Math.min(s + u, c))))
                    } else if (null != n.finalEnd) o = Math.round(n.finalEnd * a);
                    else if (null != f) o = Math.max(f, s + u);
                    else {
                        var g = Math.max(n.minDur, Math.min(n.maxDur, .07 * t[r].text.replace(/\s/g, "").length));
                        o = s + Math.round(g * a)
                    }
                    o <= s && (o = s + 1), h.push({
                        startF: s,
                        endF: o,
                        text: t[r].text,
                        interview: !!t[r].interview
                    })
                } else(o = Math.round(t[r].endAbs * a)) <= s && (o = s + 1), h.push({
                    startF: s,
                    endF: o,
                    text: t[r].text,
                    interview: !!t[r].interview
                })
            }
            return {
                ok: !0,
                cues: h
            }
        },
        toSrt: function(t, n) {
            return t.map(function(t, r) {
                return r + 1 + "\n" + i(t.startF, n) + " --\x3e " + i(t.endF, n) + "\n" + t.text + "\n"
            }).join("\n")
        }
    };
    t.SubSplit = o, "undefined" != typeof module && module.exports && (module.exports = o)
}("undefined" != typeof window ? window : this);