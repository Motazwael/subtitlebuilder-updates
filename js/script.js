! function(s) {
    "use strict";
    var t = {
            "رويترز": "رويترز",
            reuters: "رويترز",
            afp: "أ ف ب",
            "أ ف ب": "أ ف ب",
            "فرانس برس": "أ ف ب",
            ap: "أسوشيتد برس",
            "أسوشيتد برس": "أسوشيتد برس",
            "الجزيرة": "الجزيرة",
            bbc: "بي بي سي",
            cnn: "سي إن إن"
        },
        e = "@@SAME@@",
        i = "(?:(?:ان|إن|أن|اين|إين)س[يىئ]?رت|insert|sot|sound\\s*bite|سوند\\s*بايت|سوندبايت|مقابلة|مداخلة|تصريح|بايت)",
        n = new RegExp("^[\\[\\(\\*\\s]*" + i + "\\s*\\d*[\\]\\)\\*:：.\\s-]*$", "i"),
        r = new RegExp("^[\\[\\(\\*\\s]*" + i + "\\s*\\d*\\s*[\\]\\)\\*]?\\s*[:：\\-–—]\\s*(.+)$", "i"),
        l = /^(?:اسم الضيف|الضيف|الاسم|اسم)\s*[:：]\s*(.+)$/,
        u = /^(?:صفة الضيف|الصفة|المنصب|الوصف|اللقب|صفته)\s*[:：]\s*(.+)$/,
        o = [
            [/^(رويترز|رويتر|رويتز|رويترس|ريوترز|reuters)/i, "رويترز"],
            [/^(فرانس\s*برس|فرانس\s*بريس|أ\s*ف\s*ب|ا\s*ف\s*ب|afp)/i, "أ ف ب"],
            [/^(أسوشيتد|اسوشيتد|أسوشييتد|اسوشييتد|ايه\s*بي|أ\s*ب\b|ap\b)/i, "أسوشيتد برس"],
            [/^(الجزيرة|aljazeera)/i, "الجزيرة"],
            [/^(الغارديان|ذا\s*غارديان|guardian)/i, "الغارديان"],
            [/^(بي\s*بي\s*سي|bbc)/i, "بي بي سي"],
            [/^(سي\s*ان\s*ان|سي\s*إن\s*إن|cnn)/i, "سي إن إن"],
            [/^(أكسيوس|اكسيوس|أكسيوز|اكسيوز|أكسيس|axios)/i, "أكسيوس"],
            [/^(بلومبرغ|بلومبيرغ|بلومبرج|بلومبيرج|bloomberg)/i, "بلومبرغ"],
            [/^(نيويورك\s*تايمز|نيويورك\s*تايمس|ذا\s*نيويورك|nyt|new\s*york\s*times)/i, "نيويورك تايمز"],
            [/^(واشنطن\s*بوست|واشنطن\s*بوس|washington\s*post)/i, "واشنطن بوست"],
            [/^(وول\s*ستريت|wall\s*street)/i, "وول ستريت جورنال"],
            [/^(بوليتيكو|politico)/i, "بوليتيكو"],
            [/^(فاينانشال\s*تايمز|فايننشال\s*تايمز|financial\s*times)/i, "فاينانشال تايمز"],
            [/^(سكاي\s*نيوز|sky\s*news)/i, "سكاي نيوز"],
            [/^(العربية|العربيه|alarabiya)/i, "العربية"],
            [/^(الحدث)$/i, "الحدث"],
            [/^(الشرق\s*الأوسط|الشرق\s*الاوسط)$/i, "الشرق الأوسط"],
            [/^(تايمز\s*أوف\s*إسرائيل|تايمز\s*اوف\s*اسرائيل|times\s*of\s*israel)/i, "تايمز أوف إسرائيل"],
            [/^(هآرتس|هاآرتس|haaretz)/i, "هآرتس"],
            [/^(يديعوت\s*أحرونوت|يديعوت\s*احرونوت|يديعوت)/i, "يديعوت أحرونوت"],
            [/^(ذا\s*إيكونوميست|ذا\s*ايكونوميست|الإيكونوميست|الايكونوميست|economist)/i, "ذا إيكونوميست"],
            [/^(الإندبندنت|الاندبندنت|إندبندنت|اندبندنت|independent)/i, "الإندبندنت"],
            [/^(دويتشه\s*فيله|دوتشيه\s*فيله|dw)\b/i, "دويتشه فيله"],
            [/^(يورونيوز|euronews)/i, "يورونيوز"],
            [/^(تاس|tass)$/i, "تاس"],
            [/^(شينخوا|شينهوا|xinhua)/i, "شينخوا"],
            [/^(إن\s*بي\s*سي|ان\s*بي\s*سي|nbc)/i, "إن بي سي"],
            [/^(فوكس\s*نيوز|fox\s*news)/i, "فوكس نيوز"],
            [/^(سي\s*بي\s*اس|سي\s*بي\s*إس|cbs)/i, "سي بي إس"],
            [/^(الأناضول|الاناضول|anadolu)/i, "الأناضول"],
            [/^(تي\s*آر\s*تي|trt)/i, "تي آر تي"],
            [/^(ميدل\s*إيست\s*آي|ميدل\s*ايست\s*اي|middle\s*east\s*eye)/i, "ميدل إيست آي"],
            [/^(التلغراف|تلغراف|الترلغراف|ذا\s*تلغراف|telegraph)/i, "التلغراف"],
            [/^(ديلي\s*ميل|daily\s*mail)/i, "ديلي ميل"],
            [/^(ذا\s*صن|the\s*sun)/i, "ذا صن"],
            [/^(يو\s*إس\s*إيه\s*توداي|usa\s*today)/i, "يو إس إيه توداي"],
            [/^(لوس\s*أنجلوس\s*تايمز|لوس\s*انجلوس\s*تايمز|la\s*times|los\s*angeles\s*times)/i, "لوس أنجلوس تايمز"]
        ],
        c = /^(نيوز|news|عربية|الإخبارية|تي|في|tv|برس|بريس|لندن|واشنطن|باريس|-|–|—)$/i;

    function a(s) {
        var t = String(s).replace(/[\u064B-\u0652\u0640]/g, "").trim(),
            e = /^(المصدر|مصدر|source)\s*[:：\-–]?\s*/i.test(t);
        if (!(t = t.replace(/^(المصدر|مصدر|source)\s*[:：\-–]?\s*/i, "").replace(/^[\[\(\s]+|[\]\)\s.،:]+$/g, ""))) return "";
        if (!e && t.split(/\s+/).length > 4) return "";
        for (var i = 0; i < o.length; i++) {
            var n = o[i][0].exec(t);
            if (n) {
                var r = t.slice(n[0].length).split(/\s+/).filter(Boolean);
                if (e || r.every(function(s) {
                        return c.test(s.replace(/[()\[\]]/g, ""))
                    })) return o[i][1]
            }
        }
        if (e && t.split(/\s+/).length <= 8) return t;
        return ""
    }
    var f = /^(تر[اأ]?ن[زس]ي?شن|transition|ستينغر|ستنغر|stinger|لوغو|لوجو|logo|فاصل|بامبر|bumper|ميوزك|موسيقى|music|sfx|مؤثر(?:ات)?\s+صوتي(?:ة)?|fade|فيد|سكرول|scroll|ملاحظة|ملاحظات)(?=\s|$|[:：.\-])/i,
        p = /(?:^|\s)[\[\(\{<]?\s*(?:تر[اأ]?ن[زس]ي?[شص]ن|تر[اأ]?ن[زس]ي?شن|transition|ستين?غر|stinger|sfx|bumper|بامبر)\s*[\]\)\}>]?\s*[:：\-]?(?=\s|$)|[\[\(\{<]\s*فاصل(?:\s*(?:إعلاني|اعلاني))?\s*[\]\)\}>]/gi,
        h = function(s) {
            return s.replace(p, " ").replace(/\s{2,}/g, " ").trim()
        },
        g = function(s) {
            return /^[\[\(\{<].*[\]\)\}>]$/.test(s) || f.test(s) && s.split(/\s+/).length <= 4
        },
        m = function(s) {
            return /^https?:\/\//i.test(s)
        },
        d = function(s) {
            return /^[\d.:+\-\s]+$/.test(s) && /[\d+]/.test(s)
        },
        v = function(s) {
            return s.split(/\s+/).filter(Boolean).length
        };
    var x = /(^|\.)(facebook\.com|fb\.watch|fb\.com|instagram\.com|twitter\.com|x\.com|t\.co|tiktok\.com|vm\.tiktok\.com)$/i;

    function w(s) {
        try {
            return s.replace(/^https?:\/\//i, "").split(/[\/?#]/)[0].replace(/^www\./, "")
        } catch (s) {
            return ""
        }
    }
    var b = /^[\[\(\{<]*(?:تر[اأ]?ن[زس]ي?[شص]ن|transition|ستين?غر|stinger|sfx|bumper|بامبر)[\]\)\}>:：\-.،,]*$/i,
        $ = {
            parse: function(s) {
                var i, o = String(s).replace(/^﻿/, "").split(/\r?\n/).map(function(s) {
                        return s.replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\u00AD\uFEFF]/g, "").replace(/\u00A0/g, " ").trim()
                    }),
                    c = !1;
                for (i = 0; i < o.length; i++)
                    if (m(o[i]) || n.test(o[i]) || "الخامة البصرية" === o[i]) {
                        c = !0;
                        break
                    }
                var f = 0,
                    p = o.slice(0, 40),
                    x = p.indexOf("ملاحظات");
                x < 0 && (x = p.indexOf("الخامة البصرية")), x < 0 && (x = p.indexOf("النص")), x >= 0 && (f = x + 1);
                var w = !1,
                    b = !1,
                    $ = null,
                    S = !1,
                    k = [],
                    y = 0,
                    B = null,
                    E = null,
                    F = [],
                    O = [],
                    j = null;

                function A() {
                    if (j) {
                        var s, t = j.lines.filter(Boolean),
                            e = "",
                            i = "";
                        t = t.filter(function(s) {
                            var t = l.exec(s),
                                n = u.exec(s);
                            return t ? (e = t[1].trim(), !1) : !n || (i = n[1].trim(), !1)
                        }), (s = !e && t.length >= 2 ? /^(.{2,45}?)\s+(?:[-–—|\/])\s+(.{3,90})$/.exec(t[t.length - 1]) : null) ? (e = s[1].trim(), i = s[2].trim(), t.pop()) : !e && t.length >= 3 && v(t[t.length - 1]) <= 8 && !/^و/.test(t[t.length - 1]) && v(t[t.length - 2]) <= 3 && v(t[t.length - 3]) >= 3 && (i = t.pop(), e = t.pop()), $ = {
                            pos: j.pos,
                            lines: t,
                            name: e,
                            title: i,
                            tcs: [],
                            dur: 0
                        }, O.push($), S = !1, j = null
                    }
                }

                function L(s) {
                    if (null != B && y > B) {
                        var t = E;
                        if (t) {
                            F[F.length - 1];
                            F.push({
                                w0: B,
                                w1: y - 1,
                                label: t
                            })
                        }
                    }
                    B = null, E = null
                }
                for (i = f; i < o.length; i++) {
                    var z = o[i];
                    if (z) {
                        var C = w;
                        if (w = !1, n.test(z)) L(), A(), j = {
                            pos: y,
                            lines: []
                        };
                        else {
                            var R = r.exec(z);
                            if (R && v(z) <= 40) L(), A(), j = {
                                pos: y,
                                lines: [R[1].trim()]
                            };
                            else if (m(z)) j ? A() : L();
                            else if (!/^(فيديو|فيديوهات|صورة|صور|ملاحظة)$/.test(z))
                                if (d(z)) {
                                    if (j) {
                                        var D = j.lines.filter(Boolean),
                                            M = D.length;
                                        M >= 3 && v(D[M - 1]) <= 8 && !/^و/.test(D[M - 1]) && v(D[M - 2]) <= 3 && v(D[M - 3]) >= 3 ? A() : (j.starts = j.starts || []).push(z);
                                        continue
                                    }
                                    if ($ && !S && $.tcs.length < 2) {
                                        var q = /^(\d+)[.:](\d{2})$/.exec(z);
                                        q && $.tcs.push(60 * +q[1] + +q[2])
                                    }
                                } else {
                                    var G = a(z) || (t[z.toLowerCase()] && v(z) <= 2 ? t[z.toLowerCase()] : "");
                                    G ? (j || (E = G), w = !0) : g(z) || (z = h(z)) && (z === e || C && /^(نفسه|نفس الخامة|مكرر)$/.test(z) || (j || "و" !== z ? (b && !j && (z = "و" + z, b = !1), j ? j.lines.push(z) : (S = !0, null == B && (B = y), k.push(z), y += v(z))) : b = !0))
                                }
                        }
                    }
                }
                return A(), O.forEach(function(s) {
                    2 === s.tcs.length && s.tcs[1] > s.tcs[0] && (s.dur = s.tcs[1] - s.tcs[0])
                }), null != B && L(), {
                    isScript: c || F.length > 0 || O.length > 0,
                    text: k.join("\n"),
                    sources: F,
                    inserts: O
                }
            },
            links: function(s) {
                var t, i, l = !1,
                    u = String(s || "").split(/\r?\n/).map(function(s) {
                        return s.trim()
                    }),
                    o = [],
                    c = {},
                    f = [],
                    p = null,
                    h = null,
                    v = !1,
                    b = !1,
                    $ = !1,
                    S = [],
                    k = /^(الخامة البصرية|فيديو|صورة|ملاحظات|النص|الوقت|المصدر)$/;
                for (t = 0; t < u.length; t++)
                    if (i = u[t]) {
                        var y = l;
                        if (l = !1, m(i)) {
                            var B = i.split(/\s+/)[0],
                                E = {
                                    url: B,
                                    host: w(B),
                                    ctx: f.join(" ").slice(0, 90),
                                    tcs: $ ? S.slice() : [],
                                    dup: !!c[B],
                                    social: x.test(w(B)),
                                    interview: $
                                };
                            c[B] = 1, o.push(E), p = E, h = E, f = [], b = !1, $ = !1, S = [], v = !1
                        } else if (d(i)) {
                            if (/^[+\s]+$/.test(i)) continue;
                            if ($) {
                                S.push(i);
                                continue
                            }
                            if (p) p.tcs.length < 6 && p.tcs.indexOf(i) < 0 && p.tcs.push(i);
                            else if (h && v) {
                                var F = {
                                    url: h.url,
                                    host: h.host,
                                    ctx: f.join(" ").slice(0, 90),
                                    tcs: [i],
                                    dup: !0,
                                    social: h.social
                                };
                                o.push(F), p = F, v = !1, f = []
                            } else h && b && h.tcs.indexOf(i) < 0 && h.tcs.length < 6 && h.tcs.push(i)
                        } else n.test(i) || r.test(i) ? (p = null, $ = !0, S = []) : k.test(i) ? p = null : i === e || y && /^(نفسه|نفس الخامة|مكرر)$/.test(i) ? (v = !0, p = null) : a(i) ? (l = !0, p = null) : g(i) ? p = null : $ || (p = null, (b = i.split(/\s+/).length <= 1) || f.push(i), f.length > 4 && f.shift())
                    } return o
            },
            srcLabel: a,
            isStage: function(s) {
                return b.test(String(s).replace(/[\u0640\u200B-\u200F]/g, ""))
            }
        };
    s.SubScript = $, "undefined" != typeof module && module.exports && (module.exports = $)
}("undefined" != typeof window ? window : this);