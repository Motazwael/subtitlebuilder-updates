! function(e) {
    "use strict";
    var t = /https?:\/\/[^\s<>"'،)\]]+/gi,
        i = "\\d{1,3}(?::\\d{2}){0,2}(?:[.,]\\d+)?",
        r = "(?:\\s*(?:ثانية|ثواني|ثانيه|ث|sec|s)\\b)?",
        l = new RegExp("(?:من\\s*(?:الثانية|الثانيه|الدقيقة|الدقيقه|الوقت|الزمن)?\\s*)?(" + i + ")" + r + "\\s*(?:إلى|الى|حتى|لغاية|لـ|[-–—~]|to)\\s*(?:الثانية\\s*)?(" + i + ")" + r, "i"),
        n = new RegExp("(?:^|\\s)من\\s*(?:الثانية|الثانيه|الدقيقة|الدقيقه)?\\s*(" + i + ")" + r + "(?=\\s|$)", "i"),
        o = [
            ["title", /^(?:(?:الثامبنيل|الثمبنيل|ثامبنيل|الصورة\s*المصغرة|Thumbnail)(?:\s*(?:و|and|&)?\s*(?:العنوان\s*الرئيسي|Main\s*title|Headline|Title)?)?|العنوان\s*الرئيسي|العنوان\s*الرئيسى|عنوان\s*رئيسي|الرئيسي|العنوان|عنوان|Main\s*title|Headline|Title|H1)/i],
            ["sub", /^(?:سابتيتل|سب\s*تايتل|ساب\s*تايتل|سبتايتل|العنوان\s*الفرعي|العنوان\s*الفرعى|عنوان\s*فرعي|عنوان\s*ثانوي|الفرعي|Sub\s*-?\s*title|Sub\s*-?\s*heading|Subhead(?:ing)?|H2)/i],
            ["loc", /^(?:الموقع|المكان|مكان|اللوكيشن|لوكيشن|المدينة|Location|Place)/i],
            ["src", /^(?:المصدر|Source)/i],
            ["link", /^(?:رابط\s*الفيديو|الرابط|رابط|اللينك|اللينكات|لينك|الخامة|Video\s*link|Video|Link|URL)/i],
            ["time", /^(?:التوقيت|الوقت|الزمن|المقطع|المدة|Timecode|Time|TC|Range|In\s*\/?\s*Out)/i],
            ["note", /^(?:ملاحظات?|الكابشن|كابشن|Caption|Notes?|Description)/i]
        ],
        s = /(?:^|\.)(?:facebook\.com|fb\.watch|fb\.com|instagram\.com|twitter\.com|x\.com|t\.co|tiktok\.com|youtube\.com|youtu\.be|t\.me|telegram\.me|vimeo\.com)$/i,
        // some editors write the platform's own name next to "المصدر" instead of an actual channel/account name
        // (e.g. "المصدر: تليجرام"). The platform is already shown via the source mogrt's icon, so a source value
        // that is ONLY a platform name (nothing else) is redundant and should not be written into the video.
        platformWord = "facebook|فيسبوك|فيس بوك|فيس|instagram|انستغرام|إنستغرام|انستجرام|إنستجرام|ستوري\\s*انستغرام|twitter|تويتر|[اإ]كس|x|telegram|تيليغرام|تلغرام|تليجرام|youtube|يوتيوب|tiktok|تيك\\s*توك|تيكتوك|whatsapp|واتساب|واتس\\s*اب",
        platformOnly = new RegExp("^\\s*(?:" + platformWord + ")\\s*$", "i"),
        // "إكس [YemenAFMedia](https://x.com/YemenAFMedia)" — editor names the platform then the real account as a
        // markdown link. Strip the leading bare platform word once real content follows it.
        platformPrefix = new RegExp("^\\s*(?:" + platformWord + ")\\s+(?=\\S)", "i"),
        mdLinkRe = /\[([^\]]+)\]\(https?:\/\/[^\s)]+\)/g;

    function u(e) {
        return String(e).replace(/^https?:\/\//i, "").split(/[\/?#]/)[0].replace(/^www\./, "").toLowerCase()
    }

    function c(e) {
        for (var t = 0; t < o.length; t++) {
            var i = o[t][1].exec(e);
            if (i) {
                var r = e.slice(i[0].length),
                    l = /^\s*[:：=\-–—]\s*/.exec(r);
                if (l) return {
                    key: o[t][0],
                    val: r.slice(l[0].length).trim()
                };
                if (!r.trim()) return {
                    key: o[t][0],
                    val: ""
                };
                if (/^[A-Za-z]/.test(i[0]) && /^\s/.test(r) && !/^[A-Za-z]/.test(r.trim())) return {
                    key: o[t][0],
                    val: r.trim()
                }
            }
        }
        return null
    }

    function a(e) {
        if (!(e = String(e).trim())) return null;
        // "01.35" with no ":" and a 2-digit fraction is how this team often types mm.ss ranges using a dot
        // instead of a colon (e.g. "00.00 - 01.35" meaning 0:00 to 1:35) — treat it as minutes:seconds, not
        // a decimal fraction of a second, or a 1:35 cut silently becomes a 1.35-second one.
        var mmss = /^(\d{1,3})[.,](\d{2})$/.exec(e);
        if (mmss && Number(mmss[2]) < 60) return 60 * Number(mmss[1]) + Number(mmss[2]);
        e = e.replace(",", ".");
        var t = e.split(":").map(Number);
        return t.some(isNaN) ? null : 3 === t.length ? 3600 * t[0] + 60 * t[1] + t[2] : 2 === t.length ? 60 * t[0] + t[1] : t[0]
    }

    function f(e) {
        return String(e).replace(/[​-‏‪-‮⁦-⁩﻿]/g, "").replace(/ /g, " ").replace(/^[\s•▪◦●\-–*]+(?=\S)/, "").replace(/^\d{1,2}[.)]\s+(?=\D)/, "").trim()
    }

    function m(e) {
        return e.url || e.title || e.subtitle
    }

    function p(e) {
        var i = String(e || "").split(/\r?\n/).map(f),
            r = [],
            blank = function() {
                return {
                    title: "",
                    subtitle: "",
                    url: "",
                    from: null,
                    to: null,
                    source: "",
                    location: "",
                    notes: "",
                    ranges: []
                }
            },
            o = blank(),
            p = null,
            d = {},
            // one script block can list SEVERAL separate cuts of the same clip/link, each on its own
            // "mm:ss - mm:ss" line (e.g. several non-contiguous moments to keep from one source video).
            // We collect every full (from+to) range seen; if more than one, v() below expands this single
            // block into one record per range — same title/subtitle/source/location/url, different from/to —
            // instead of silently keeping only the last one typed.
            pushRange = function(fr, to) {
                o.ranges.push([fr, to]), null == o.from && (o.from = fr, o.to = to)
            },
            v = function() {
                if (m(o)) {
                    var full = o.ranges.filter(function(rr) {
                        return null != rr[0] && null != rr[1]
                    });
                    if (full.length > 1) full.forEach(function(rr) {
                        var clone = {};
                        for (var k in o)
                            if ("ranges" !== k) clone[k] = o[k];
                        clone.from = rr[0], clone.to = rr[1], r.push(clone)
                    });
                    else {
                        var single = {};
                        for (var k2 in o)
                            if ("ranges" !== k2) single[k2] = o[k2];
                        r.push(single)
                    }
                }
                o = blank(), p = null
            },
            b = function(e) {
                var t, i = l.exec(e);
                if (i) return pushRange(a(i[1]), a(i[2])), !0;
                if (t = n.exec(e)) return pushRange(a(t[1]), null), !0;
                var r = /^(\d{1,3}(?::\d{2}){0,2}(?:[.,]\d+)?)$/.exec(e.trim());
                return !!r && (pushRange(a(r[1]), null), !0)
            },
            g = function(e, t) {
                (t = String(t || "").trim()) && ("title" === e ? (o.title && (o.url || o.subtitle || o.location) && v(), o.title = t) : "sub" === e ? o.subtitle = t : "loc" === e ? o.location = t : "src" === e ? (function() {
                    var c2 = t.replace(mdLinkRe, "$1").replace(platformPrefix, "").replace(/\s+/g, " ").trim();
                    c2 && !platformOnly.test(c2) && (o.source = c2)
                })() : "note" === e ? o.notes = (o.notes ? o.notes + " " : "") + t : "time" === e && b(t))
            };
        return i.forEach(function(e) {
            if (e)
                if (/^(?:-{3,}|_{3,}|={3,}|\*{3,})$/.test(e)) v();
                else if (/^(?:فيديو|مقطع|خام|Video|Clip|Raw)\s*\d+\s*[:：\-–]?\s*$/i.test(e)) v();
            else {
                // a link attached to the SOURCE/LOCATION field (e.g. "إكس [YemenAFMedia](https://x.com/...)")
                // is a reference, not "the video link" — unwrap it to its label BEFORE the generic URL-sniffer
                // below runs, or that link gets mistaken for the main video URL and the field is left mangled.
                if (p === "src" || p === "loc" || (function() { var m0 = c(e); return !!(m0 && (m0.key === "src" || m0.key === "loc")) })()) e = e.replace(mdLinkRe, "$1").replace(/\s+/g, " ").trim();
                var i = e,
                    f = i.match(t),
                    m = c(i);
                if (f) {
                    if (f.forEach(function(e) {
                            (e = e.replace(/[.,;:!؟?)\]]+$/, "")) === o.url || d[e] && r.some(function(t) {
                                return t.url === e
                            }) || (o.url ? s.test(u(e)) && s.test(u(o.url)) ? (v(), o.url = e) : o.notes = (o.notes ? o.notes + " " : "") + e : o.url = e, d[e] = 1, !0)
                        }), m = c(i = i.replace(t, " ").replace(/\s+/g, " ").trim()), !i || m && !m.val) return void(p = null)
                }
                if (!m || m.val || "link" === m.key)
                    if (m && "link" === m.key) m.val;
                    else {
                        if (m) return p = null, void("time" !== m.key || b(m.val) ? "time" !== m.key && g(m.key, m.val) : g("note", m.val));
                        if (p) {
                            var h = p;
                            return p = null, void("time" === h ? b(i) || g("note", i) : g(h, i))
                        }
                        var k = l.exec(i);
                        if (k && (/:|من|إلى|الى|حتى/.test(k[0]) || "" === i.replace(k[0], "").replace(/[\s:：\-–]/g, ""))) {
                            pushRange(a(k[1]), a(k[2]));
                            var w = i.replace(k[0], "").replace(/^[\s:：\-–]+|[\s:：\-–]+$/g, "");
                            if (!w) return;
                            i = w
                        } else {
                            var y = n.exec(i);
                            if (y && "" === i.replace(y[0], "").replace(/[\s:：\-–]/g, "")) return void pushRange(a(y[1]), null)
                        }
                        if (o.title) {
                            if (o.url && o.subtitle) return v(), void(o.title = i);
                            if (o.subtitle) return o.url ? (v(), void(o.title = i)) : void(o.notes = (o.notes ? o.notes + " " : "") + i);
                            o.subtitle = i
                        } else o.title = i
                    }
                else p = m.key
            }
        }), v(), r.forEach(function(e) {
            null != e.from && null != e.to && e.to <= e.from && (e.to = null)
        }), r
    }
    var d = {
        parse: p,
        parseOne: function(e) {
            var t = p(e),
                i = {
                    title: "",
                    subtitle: "",
                    url: "",
                    from: null,
                    to: null,
                    source: "",
                    location: "",
                    notes: ""
                };
            return t.forEach(function(e) {
                ["title", "subtitle", "url", "source", "location", "notes"].forEach(function(t) {
                    !i[t] && e[t] && (i[t] = e[t])
                }), null == i.from && null != e.from && (i.from = e.from, i.to = e.to)
            }), m(i) ? [i] : []
        },
        toSec: a,
        fmt: function(e) {
            if (null == e) return "";
            var t = Math.floor(e / 60),
                i = e - 60 * t;
            return t + ":" + ((i = Math.round(100 * i) / 100) < 10 ? "0" : "") + i
        }
    };
    e.SubRaw = d, "undefined" != typeof module && module.exports && (module.exports = d)
}("undefined" != typeof window ? window : this);