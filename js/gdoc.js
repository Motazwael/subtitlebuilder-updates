! function(t) {
    "use strict";

    function e(t) {
        return t.replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, function(t, e) {
            return String.fromCharCode(+e)
        }).replace(/&#x([0-9a-f]+);/gi, function(t, e) {
            return String.fromCharCode(parseInt(e, 16))
        }).replace(/&amp;/g, "&")
    }

    function r(t) {
        var r = e(t),
            n = /[?&]q=([^&]+)/.exec(r);
        if (/google\.com\/url/.test(r) && n) try {
            return decodeURIComponent(n[1])
        } catch (t) {
            return n[1]
        }
        return r
    }

    function n(t, n) {
        var c = t.match(/<p[\s\S]*?<\/p>|<li[\s\S]*?<\/li>/gi) || [t],
            o = [];
        return c.forEach(function(t) {
            var c = t.replace(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, function(t, c, o) {
                var i = r(c),
                    a = e(o.replace(/<[^>]*>/g, "")).trim();
                if (!/^https?:\/\//i.test(i)) return o;
                var s = !a || /^https?:\/\//i.test(a) || /…|\.\.\./.test(a);
                return n ? (!s && a.length >= 2 && a.length <= 30 ? "\n" + a + "\n" : "\n") + i + "\n" : a.length < 6 || s ? " " + i + " " : o
            });
            e(c = c.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "")).split("\n").forEach(function(t) {
                (t = t.replace(/\s+/g, " ").trim()) && o.push(t)
            })
        }), o
    }
    var c = {
        plain: function(t) {
            var n = String(t).replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/gi, ""),
                c = /<body[\s\S]*<\/body>/i.exec(n);
            return c && (n = c[0]), n = n.replace(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, function(t, n, c) {
                var o = r(n),
                    i = e(c.replace(/<[^>]+>/g, "")).trim();
                return !/^https?:\/\//i.test(o) || /docs\.google\.com\/document/i.test(o) ? c : /^https?:\/\//i.test(i) || /…|\.\.\./.test(i) || !i ? " " + o + " " : " " + i + " " + o + " "
            }), e(n = n.replace(/<\/(?:p|div|h[1-6]|li|tr|table)>|<br\s*\/?>/gi, "\n").replace(/<\/t[dh]>/gi, "\n").replace(/<[^>]+>/g, "")).replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim()
        },
        anchors: function(t) {
            for (var e, n = [], c = /<a\s[^>]*href="([^"]*)"/gi; e = c.exec(t);) {
                var o = r(e[1]);
                !/^https?:\/\//i.test(o) || /^https?:\/\/(www\.)?google\.com\/(?!url)/i.test(o) || /docs\.google\.com\/document/i.test(o) || n.push(o)
            }
            return n
        },
        toText: function(t) {
            var dia = function(s) {
                return String(s).replace(/[ـً-ٰٟ]/g, "").replace(/\s+/g, " ").trim()
            };
            var e = t.match(/<table[\s\S]*?<\/table>/gi) || [];
            if (!e.length) return "";
            var r = (e.reduce(function(t, e) {
                    return e.length > t.length ? e : t
                }, "").match(/<tr[\s\S]*?<\/tr>/gi) || []).map(function(t) {
                    return (t.match(/<td[\s\S]*?<\/td>|<th[\s\S]*?<\/th>/gi) || []).map(function(t) {
                        return t
                    })
                }),
                c = 0,
                o = 1,
                cFound = !1,
                oFound = !1,
                headerIdx = -1;
            r.slice(0, 3).forEach(function(t, ri) {
                t.forEach(function(t, e) {
                    var r = dia(n(t, !1).join(" "));
                    /^النص$/.test(r) && (c = e, cFound = !0, headerIdx = ri), /الخام/.test(r) && (o = e, oFound = !0, headerIdx = ri)
                })
            });
            var i = [];
            return r.forEach(function(t, ri) {
                if (ri === headerIdx) return;
                var textCells = t[c] ? n(t[c], !1) : [];
                textCells.forEach(function(t) {
                    i.push(t)
                });
                var textJoined = dia(textCells.join(" "));
                if (c === o) return;
                (t[o] ? n(t[o], !0) : []).forEach(function(t) {
                    if (textJoined && dia(t) === textJoined) return;
                    var same = /^(نفسه|نفس الخامة|مكرر)$/.test(dia(t));
                    if (!oFound && !same && !/^https?:\/\//i.test(t)) return;
                    i.push(same ? "@@SAME@@" : t)
                })
            }), i.join("\n")
        },
        docId: function(t) {
            var e = /\/d\/([a-zA-Z0-9_-]{20,})/.exec(String(t));
            return e ? e[1] : ""
        },
        decode: e
    };
    t.SubGDoc = c, "undefined" != typeof module && module.exports && (module.exports = c)
}("undefined" != typeof window ? window : this);