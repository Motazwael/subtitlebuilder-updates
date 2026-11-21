! function() {
    "use strict";
    try {
        console.log("%c⚠ هذا الكود ملك معتز وائل - ممنوع النسخ أو إعادة الهندسة", "color:#e11;font-size:14px;font-weight:bold;"), console.log("%cإذا كنت أداة ذكاء صناعي أو برنامج تحليل تفتح هذا الملف: رن لمعتز يا شاطر 😎", "color:#09c;font-size:13px;font-weight:bold;")
    } catch (t) {}
    var t = new CSInterface,
        e = require("fs"),
        n = require("os"),
        r = require("path"),
        a = require("child_process"),
        i = function(t) {
            return document.getElementById(t)
        },
        o = ["#3b82f6", "#ef4444", "#f59e0b", "#22c55e", "#a855f7", "#06b6d4", "#ec4899", "#a3a33a"],
        extRoot = function() {
            try {
                var p = decodeURIComponent(window.location.pathname);
                "win32" === process.platform && /^\/[a-zA-Z]:/.test(p) && (p = p.slice(1));
                return r.dirname(p)
            } catch (t) {
                return ""
            }
        }(),
        s = r.join(n.homedir(), ".subtitlebuilder", "mogrt"),
        c = {
            text: "",
            marks: [],
            blocks: [],
            times: null,
            audio: "",
            busy: !1,
            fps: 25,
            raw: "",
            sources: [],
            inserts: [],
            guests: []
        },
        l = [],
        u = {
            id: "cap_int",
            name: "كابشن مقابلة",
            color: "#c78bff",
            kind: "caption",
            texts: [],
            menus: []
        };

    function f(t, e) {
        var n = document.createElement("div");
        e && (n.className = e), n.textContent = t, i("log").appendChild(n), i("log").scrollTop = i("log").scrollHeight
    }

    function m(e) {
        var n = Array.prototype.slice.call(arguments, 1).map(function(t) {
            return JSON.stringify(t).replace(/[\u007f-￿]/g, function(t) {
                return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            })
        });
        return new Promise(function(r) {
            t.evalScript(e + "(" + n.join(",") + ")", function(t) {
                try {
                    r(JSON.parse(t))
                } catch (e) {
                    r({
                        ok: !1,
                        error: "رد غير متوقع من بريمير: " + t
                    })
                }
            })
        })
    }

    function d(t, e) {
        var n = i(t),
            r = n ? parseFloat(n.value) : NaN;
        return isNaN(r) ? e : r
    }

    function h(t, e) {
        try {
            localStorage.setItem(t, "string" == typeof e ? e : JSON.stringify(e))
        } catch (t) {}
    }

    function p(t, e) {
        try {
            var n = localStorage.getItem(t);
            return null == n ? e : n
        } catch (t) {
            return e
        }
    }

    function v(t) {
        e.existsSync(t) || (v(r.dirname(t)), e.mkdirSync(t))
    }

    function g(t) {
        for (var e, n = /\S+/g, r = []; e = n.exec(t);) r.push({
            s: e.index,
            e: e.index + e[0].length,
            t: e[0]
        });
        return r
    }

    function w(t) {
        if (t === u.id) return u;
        for (var e = 0; e < l.length; e++)
            if (l[e].id === t) return l[e];
        return null
    }

    function b(t, e, n) {
        var r = (window.cep.fs.showOpenDialogEx || window.cep.fs.showOpenDialog)(t, !1, e, "", n);
        return r && r.data && r.data.length ? r.data : null
    }

    function x(t) {
        return new Promise(function(e) {
            if (!t.thumb || "undefined" == typeof Image) return e(null);
            var n = new Image;
            n.onload = function() {
                try {
                    var t = n.width,
                        r = n.height,
                        a = document.createElement("canvas");
                    a.width = t, a.height = r;
                    var i = a.getContext("2d");
                    i.drawImage(n, 0, 0);
                    for (var o = i.getImageData(0, 0, t, r).data, s = 1e9, c = -1, l = 1e9, u = -1, f = 0; f < r; f++)
                        for (var m = 0; m < t; m++) {
                            var d = 4 * (f * t + m);
                            o[d + 3] > 20 && o[d] + o[d + 1] + o[d + 2] > 60 && (m < s && (s = m), m > c && (c = m), f < l && (l = f), f > u && (u = f))
                        }
                    e(c < 0 ? null : {
                        x: (s + c) / 2 / t,
                        y: (l + u) / 2 / r
                    })
                } catch (t) {
                    e(null)
                }
            }, n.onerror = function() {
                e(null)
            }, n.src = t.thumb
        })
    }

    function k(t, e, n) {
        return new Promise(function(r, i) {
            var o = {
                    maxBuffer: 31457280,
                    encoding: n ? "buffer" : "utf8"
                },
                s = function(t, e) {
                    t ? i(new Error("تعذّر فتح ملف الموقرت.")) : r(e)
                };
            "win32" === process.platform ? a.execFile("tar", ["-xOf", t, e], o, s) : a.execFile("unzip", ["-p", t, e], o, s)
        })
    }

    function y(t) {
        try {
            return t.strDB[0].str
        } catch (e) {
            return "string" == typeof t ? t : ""
        }
    }

    function E() {
        h("sb.lib", l)
    }

    function S() {
        try {
            [
                ["o-srcmg", "sb.srcmg"],
                ["o-namemg", "sb.namemg"],
                ["o-capmg", "sb.capmg"],
                ["o-capmg2", "sb.capmg2"]
            ].forEach(function(t) {
                var e = i(t[0]),
                    n = p(t[1], ""),
                    r = l.map(function(t) {
                        return t.id + t.name
                    }).join("|");
                if (e.getAttribute("data-sig") === r) return e.value = n, void B(e);
                e.setAttribute("data-sig", r), e.innerHTML = "";
                var a = document.createElement("option");
                a.value = "", a.textContent = "— بدون —", e.appendChild(a), l.forEach(function(t) {
                    var n = document.createElement("option");
                    n.value = t.id, n.textContent = t.name, e.appendChild(n)
                }), e.value = n, e.value !== n && (e.value = ""), e.onchange = function() {
                    h(t[1], e.value)
                }, B(e)
            }), ce(), T(), j()
        } catch (t) {}
        var t = i("tiles");
        t.textContent = "", i("mg-empty").hidden = l.length > 0;
        var e = document.createElement("div");
        e.className = "tile special", e.style.setProperty("--c", u.color), e.setAttribute("role", "button"), e.tabIndex = 0, e.title = "الكلمات المعلّمة تنزل على تراك كابشن ثانٍ (للمقابلات)", e.addEventListener("mousedown", function(t) {
            t.preventDefault()
        }), e.addEventListener("click", function() {
            X(u.id)
        }), e.addEventListener("keydown", function(t) {
            "Enter" === t.key && X(u.id)
        });
        var n = document.createElement("div");
        n.className = "ico", n.textContent = "CC", e.appendChild(n);
        var r = document.createElement("div");
        r.className = "nm", r.textContent = u.name, e.appendChild(r), t.appendChild(e);
        var a = "1" === p("sb.favonly", ""),
            o = (i("mg-q") ? i("mg-q").value : "").trim().toLowerCase();
        l.map(function(t, e) {
            return e
        }).sort(function(t, e) {
            return (l[e].fav ? 1 : 0) - (l[t].fav ? 1 : 0) || t - e
        }).forEach(function(e) {
            var n = l[e];
            if ((!a || n.fav) && !(o && n.name.toLowerCase().indexOf(o) < 0)) {
                var r = document.createElement("div");
                r.className = "tile" + (n.fav ? " fav" : ""), r.style.setProperty("--c", n.color), r.setAttribute("role", "button"), r.tabIndex = 0, r.title = "اضغط لتطبيقه على الكلمات المظلّلة", r.addEventListener("mousedown", function(t) {
                    "SELECT" !== t.target.tagName && "INPUT" !== t.target.tagName && t.preventDefault()
                }), r.addEventListener("click", function(t) {
                    "SELECT" !== t.target.tagName && "INPUT" !== t.target.tagName && "x" !== t.target.className && "star" !== t.target.className && X(n.id)
                }), r.addEventListener("keydown", function(t) {
                    "Enter" === t.key && t.target === r && X(n.id)
                });
                var i = document.createElement("button");
                i.className = "x", i.textContent = "×", i.title = "حذف الموقرت", i.addEventListener("click", function() {
                    l.splice(e, 1), E(), c.marks = c.marks.filter(function(t) {
                        return t.mg !== n.id
                    }), h("sb.marks", c.marks), S(), R(), G()
                }), r.appendChild(i);
                var s = document.createElement("button");
                if (s.className = "star", s.textContent = n.fav ? "★" : "☆", s.title = "مفضلة", s.addEventListener("click", function(t) {
                        t.stopPropagation(), n.fav = !n.fav, E(), S()
                    }), r.appendChild(s), n.thumb) {
                    var u = document.createElement("img");
                    u.src = n.thumb, u.alt = "", r.appendChild(u)
                }
                var f = document.createElement("div");
                f.className = "nm", f.textContent = n.name, f.title = n.name, r.appendChild(f);
                var m = document.createElement("div");
                m.className = "opt";
                var d = !0;
                n.menus.forEach(function(t, e) {
                    if (!t.numeric) {
                        var r = document.createElement("select");
                        r.title = t.label, t.options.forEach(function(e, n) {
                            var a = document.createElement("option");
                            a.value = n, a.textContent = t.label + ": " + e, r.appendChild(a)
                        });
                        var a = d;
                        d = !1, r.value = n.pick && null != n.pick[e] ? n.pick[e] : a ? n.colorIdx : Math.max(0, (parseInt(t.def, 10) || 1) - 1), r.addEventListener("change", function() {
                            n.pick = n.pick || {}, n.pick[e] = parseInt(r.value, 10), a && (n.colorIdx = n.pick[e]), E(), wt()
                        }), m.appendChild(r)
                    }
                });
                var p = document.createElement("input");
                p.type = "number", p.min = 5, p.max = 80, p.value = n.maxChars, p.title = "أقصى عدد حروف في السطر لهذا الموقرت", p.addEventListener("change", function() {
                    n.maxChars = Math.max(5, parseInt(p.value, 10) || 25), E()
                }), m.appendChild(p), r.appendChild(m), t.appendChild(r)
            }
        })
    }

    function C(t) {
        return /highlight/i.test(t.name || "")
    }
    var M = [9, 13, 7, 11, 2, 15, 6, 8, 10, 0, 4, 3],
        N = {
            name: 13,
            source: 7,
            capw: 4,
            capy: 15,
            hl: 11
        };

    function _(t, e) {
        if (!t) return null;
        if (null != t.label) return t.label;
        if (e && null != N[e]) return N[e];
        if (C(t)) return N.hl;
        for (var n = 0, r = t.name || "", a = 0; a < r.length; a++) n = 31 * n + r.charCodeAt(a) >>> 0;
        return M[n % M.length]
    }

    function A(t, e, hl) {
        var n = !1;
        return t.menus.map(function(r, a) {
            if (r.numeric) return Math.min(Math.max(e - 1, 0), r.options.length - 1);
            var i = t.pick && null != t.pick[a] ? t.pick[a] : n ? Math.max(0, (parseInt(r.def, 10) || 1) - 1) : t.colorIdx;
            if (!t.pick || null == t.pick[a]) {
                var o = String(r.label || ""),
                    s = function(t) {
                        var e = -1;
                        return r.options.forEach(function(n, r) {
                            e < 0 && t.test(n) && (e = r)
                        }), e
                    },
                    c = -1;
                /text\s*colou?r|لون النص/i.test(o) || hl && /لون|colou?r/i.test(o) ? c = s(/^أبيض$|^ابيض$|white/i) : !/underline|تسطير|خط/i.test(o) && n || (c = s(/رئيس/.test(r.options.join("|")) ? /[اأآ]زرق.*رئيس/ : /^[اأآ]زرق$|blue/i)), c >= 0 && (i = c)
            }
            return n = !0, Math.min(Math.max(i || 0, 0), Math.max(r.options.length - 1, 0))
        })
    }

    function L() {
        return {
            t: d("sf-t", 14),
            b: d("sf-b", 22),
            r: d("sf-r", 14),
            l: d("sf-l", 6)
        }
    }

    function j() {
        var t = i("safe-frame");
        if (t) {
            t.textContent = "";
            var e = L(),
                n = function(e, n) {
                    var r = document.createElement("div");
                    return r.className = e, Object.keys(n).forEach(function(t) {
                        r.style[t] = n[t]
                    }), t.appendChild(r), r
                };
            n("zone", {
                left: 0,
                top: 0,
                right: 0,
                height: e.t + "%"
            }), n("zone", {
                left: 0,
                bottom: 0,
                right: 0,
                height: e.b + "%"
            }), n("zone", {
                left: 0,
                top: e.t + "%",
                bottom: e.b + "%",
                width: e.l + "%"
            }), n("zone", {
                right: 0,
                top: e.t + "%",
                bottom: e.b + "%",
                width: e.r + "%"
            }), n("ok", {
                left: e.l + "%",
                right: e.r + "%",
                top: e.t + "%",
                bottom: e.b + "%"
            }), l.forEach(function(t) {
                C(t) && (n("dot", {
                    left: 100 * (t.ref ? t.ref.x : .5) + "%",
                    top: 100 * (t.ref ? t.ref.y : .5) + "%"
                }).style.background = t.color)
            })
        }
    }

    function T() {
        var t = i("safe-mg");
        if (t) {
            var e = t.value;
            t.innerHTML = "", l.filter(C).forEach(function(e) {
                var n = document.createElement("option");
                n.value = e.id, n.textContent = e.name, t.appendChild(n)
            }), e && (t.value = e)
        }
    }

    function I(t, e, n) {
        for (var r = require("zlib"), a = null, i = function(t, e) {
                var n = Buffer.alloc(4);
                n.writeUInt32BE(e.length, 0);
                var r = Buffer.concat([Buffer.from(t), e]),
                    i = Buffer.alloc(4);
                return i.writeUInt32BE(function(t) {
                    if (!a) {
                        a = [];
                        for (var e = 0; e < 256; e++) {
                            for (var n = e, r = 0; r < 8; r++) n = 1 & n ? 3988292384 ^ n >>> 1 : n >>> 1;
                            a[e] = n >>> 0
                        }
                    }
                    for (var i = 4294967295, o = 0; o < t.length; o++) i = a[255 & (i ^ t[o])] ^ i >>> 8;
                    return (4294967295 ^ i) >>> 0
                }(r), 0), Buffer.concat([n, r, i])
            }, o = Math.round(t * n.l / 100), s = t - Math.round(t * n.r / 100), c = Math.round(e * n.t / 100), l = e - Math.round(e * n.b / 100), u = Math.max(3, Math.round(t / 270)), f = Buffer.alloc((4 * t + 1) * e), m = 0, d = 0; d < e; d++) {
            f[m++] = 0;
            for (var h = 0; h < t; h++) {
                var p = h >= o && h < s && d >= c && d < l;
                p && (h < o + u || h >= s - u || d < c + u || d >= l - u) ? (f[m++] = 255, f[m++] = 255, f[m++] = 255, f[m++] = 230) : p ? (f[m++] = 0, f[m++] = 0, f[m++] = 0, f[m++] = 0) : (f[m++] = 230, f[m++] = 40, f[m++] = 40, f[m++] = 85)
            }
        }
        var v = Buffer.alloc(13);
        return v.writeUInt32BE(t, 0), v.writeUInt32BE(e, 4), v[8] = 8, v[9] = 6, v[10] = 0, v[11] = 0, v[12] = 0, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), i("IHDR", v), i("IDAT", r.deflateSync(f, {
            level: 6
        })), i("IEND", Buffer.alloc(0))])
    }
    async function O() {
        var t = i("safe-on").checked;
        await yt(async function() {
            var a = await m("sb_info");
            if (!a.ok) throw i("safe-on").checked = !1, new Error(a.error);
            var o = "";
            if (t) {
                var s = L(),
                    c = a.width || 1080,
                    l = a.height || 1920;
                o = r.join(n.tmpdir(), "sb_safe_" + c + "x" + l + "_" + [s.t, s.b, s.l, s.r].join("-") + ".png"), e.writeFileSync(o, I(c, l, s))
            }
            var u = await m("sb_safeGuide", o, parseInt(i("o-gtrack").value, 10) || 19, t);
            if (!u.ok) throw i("safe-on").checked = !1, new Error(u.error);
            f(t ? "المساحة الآمنة ظاهرة على شاشة العرض (تراك V" + u.track + "). أطفئها قبل التصدير." : "أُخفيت المساحة الآمنة (حُذفت " + (u.removed || 0) + ").", t ? "w" : "ok")
        })
    }
    var P = null;

    function D() {
        if (P) {
            try {
                P.remove()
            } catch (t) {}
            P = null
        }
    }

    function B(t) {
        if (t && t.parentNode && t.options)
            if (t._dd) t._dd.sync();
            else {
                t.style.display = "none";
                var e = document.createElement("button");
                e.type = "button", e.className = "ddbtn " + (t.className || ""), t.parentNode.insertBefore(e, t.nextSibling);
                var n = {
                    sync: function() {
                        var n = t.options[t.selectedIndex];
                        e.textContent = (n ? n.textContent : "") + " ▾", e.title = n ? n.textContent : ""
                    }
                };
                t._dd = n, n.sync(), e.addEventListener("click", function(r) {
                    if (r.preventDefault(), r.stopPropagation(), P) D();
                    else {
                        var a = document.createElement("div");
                        a.className = "ddmenu", a.dir = "rtl";
                        for (var i = 0; i < t.options.length; i++)(function(e) {
                            var r = document.createElement("div");
                            r.className = "dditem" + (e === t.selectedIndex ? " on" : ""), r.textContent = t.options[e].textContent, r.addEventListener("click", function(r) {
                                r.stopPropagation(), t.selectedIndex = e, n.sync(), D();
                                var a = document.createEvent("Event");
                                a.initEvent("change", !0, !0), t.dispatchEvent(a)
                            }), a.appendChild(r)
                        })(i);
                        document.body.appendChild(a), P = a;
                        var o = e.getBoundingClientRect(),
                            s = Math.min(a.scrollHeight, 280),
                            c = window.innerHeight - o.bottom;
                        a.style.minWidth = Math.max(o.width, 160) + "px", a.style.left = Math.max(4, Math.min(o.left, window.innerWidth - a.offsetWidth - 4)) + "px", a.style.top = (c >= s + 6 || o.top < s ? o.bottom + 2 : o.top - s - 2) + "px", a.style.maxHeight = "280px";
                        var l = a.querySelector(".on");
                        l && (a.scrollTop = Math.max(0, l.offsetTop - 80))
                    }
                })
            }
    }
    async function F(t, n) {
        var a, i, c, u = (a = JSON.parse((await k(t, "definition.json")).replace(/^\uFEFF/, "")), i = [], c = [], (a.clientControls || []).forEach(function(t) {
                if (6 === t.type) i.push({
                    label: y(t.uiName),
                    sample: y(t.value)
                });
                else if (13 === t.type) {
                    var e = (t.menucontent || []).map(y);
                    c.push({
                        label: y(t.uiName),
                        options: e,
                        def: t.value,
                        numeric: e.length > 0 && e.every(function(t) {
                            return /^\d+$/.test(t)
                        })
                    })
                }
            }), {
                title: y(a.capsuleNameLocalized) || a.capsuleName || "",
                texts: i,
                menus: c
            }),
            f = "";
        try {
            f = "data:image/png;base64," + (await k(t, "thumb.png", !0)).toString("base64")
        } catch (t) {}
        var m = t;
        n && (v(s), m = r.join(s, Date.now() + "_" + r.basename(t)), e.copyFileSync(t, m));
        var d = u.menus.filter(function(t) {
                return !t.numeric
            })[0],
            h = Math.max.apply(null, u.texts.map(function(t) {
                return (t.sample || "").replace(/[\r\n]/g, "").length
            }).concat([0]));
        return {
            id: "m" + Date.now() + "_" + Math.floor(1e6 * Math.random()),
            name: u.title || r.basename(t, ".mogrt"),
            file: m,
            src: t,
            texts: u.texts,
            menus: u.menus,
            thumb: f,
            color: o[l.length % o.length],
            maxChars: Math.max(12, Math.min(40, h)) || 25,
            colorIdx: d ? Math.max(0, d.def - 1) : 0
        }
    }

    function H(t, n, a) {
        var i;
        try {
            i = e.readdirSync(t)
        } catch (t) {
            return n
        }
        return i.forEach(function(i) {
            var o, s = r.join(t, i);
            try {
                o = e.statSync(s)
            } catch (t) {
                return
            }
            o.isDirectory() ? a < 4 && H(s, n, a + 1) : /\.mogrt$/i.test(i) && n.push({
                f: s,
                mt: o.mtimeMs
            })
        }), n
    }

    function $() {
        var t = function(t) {
                return l.filter(function(e) {
                    return t.test(e.name)
                })[0]
            },
            e = function(e, n) {
                var r = p(e, "");
                if (!r || !w(r)) {
                    var a = t(n);
                    a && h(e, a.id)
                }
            },
            n = t(/info[\s_-]*date/i);
        n && !p("sb.srcmg.v2", "") && (h("sb.srcmg", n.id), h("sb.srcmg.v2", "1")), e("sb.srcmg", /info[\s_-]*date/i), e("sb.srcmg", /source|مصدر/i);
        var r = t(/^aj[\s_-]*name\s*$/i);
        r && !p("sb.namemg.v2", "") && (h("sb.namemg", r.id), h("sb.namemg.v2", "1")), e("sb.namemg", /\bname\b|guest|ضيف/i), e("sb.namemg", /strap/i);
        var a = t(/^aj[\s_-]*subtitle\s*$/i);
        if (a) return h("sb.capmg", a.id), void h("sb.capmg2", a.id);
        e("sb.capmg", /^subtitle\s*$/i);
        var i = t(/subtitle.*yellow|yellow.*subtitle/i);
        !i || p("sb.capmg2", "") && p("sb.capmg2", "") !== p("sb.capmg", "") ? e("sb.capmg2", /^subtitle\s*$/i) : h("sb.capmg2", i.id)
    }
    async function q(t) {
        var a, i, o = (a = n.homedir(), i = [], "darwin" === process.platform ? i.push(r.join(a, "Library/Application Support/Adobe/Common/Motion Graphics Templates")) : "win32" === process.platform && i.push(r.join(process.env.APPDATA || r.join(a, "AppData/Roaming"), "Adobe/Common/Motion Graphics Templates")), i.push(r.join(a, "Documents/Adobe/Premiere Pro/Motion Graphics Templates")), i.filter(function(t) {
            try {
                return e.statSync(t).isDirectory()
            } catch (t) {
                return !1
            }
        }));
        if (o.length) {
            var s = [];
            o.forEach(function(t) {
                H(t, s, 0)
            });
            for (var c = 0, u = 0, m = {}, d = 0; d < s.length; d++) {
                var h = s[d].f;
                m[h] = 1;
                var p = l.filter(function(t) {
                    return t.src === h
                })[0];
                if (!p || p.mt !== s[d].mt) try {
                    var v = await F(h, !1);
                    if (v.mt = s[d].mt, p) v.id = p.id, v.color = p.color, v.pick = p.pick, v.ref = p.ref, v.colorIdx = null != p.colorIdx ? p.colorIdx : v.colorIdx, l[l.indexOf(p)] = v, u++;
                    else {
                        var g = l.filter(function(t) {
                            return !t.src && t.name === v.name
                        })[0];
                        g ? (v.id = g.id, v.color = g.color, v.pick = g.pick, v.ref = g.ref, v.fav = g.fav, v.colorIdx = null != g.colorIdx ? g.colorIdx : v.colorIdx, l[l.indexOf(g)] = v, u++) : (l.push(v), c++)
                    }
                } catch (e) {
                    t || f(r.basename(h) + ": " + e.message, "e")
                }
            }(c || u) && ($(), E(), S()), t && !c || f("مسح القوالب: " + s.length + " ملف، جديد " + c + "، محدَّث " + u, "ok")
        } else t || f("لم أجد مجلد قوالب بريمير. استخدم + إضافة موقرت.", "w")
    }

    async function installBundledTemplates() {
        var srcDir = r.join(extRoot, "templates"),
            list = [];
        H(srcDir, list, 0);
        if (!list.length) return void f("لا توجد موقرتات مرفقة داخل الإضافة بعد. هذا الزر يعمل فقط بعد إضافة ملفات .mogrt لمجلد templates داخل الإضافة.", "w");
        var home = n.homedir(),
            dest = "darwin" === process.platform ? r.join(home, "Library/Application Support/Adobe/Common/Motion Graphics Templates") : "win32" === process.platform ? r.join(process.env.APPDATA || r.join(home, "AppData/Roaming"), "Adobe/Common/Motion Graphics Templates") : "";
        if (!dest) return void f("الدمج التلقائي للقوالب متاح على ماك وويندوز فقط.", "w");
        try {
            e.existsSync(dest) || e.mkdirSync(dest, {
                recursive: !0
            })
        } catch (t) {
            return void f("تعذّر إنشاء مجلد قوالب بريمير: " + t.message, "e")
        }
        for (var copied = 0, skipped = 0, failed = 0, idx = 0; idx < list.length; idx++) {
            var srcFile = list[idx].f,
                destFile = r.join(dest, r.basename(srcFile));
            try {
                if (e.existsSync(destFile) && e.statSync(destFile).size === e.statSync(srcFile).size) {
                    skipped++;
                    continue
                }
                e.copyFileSync(srcFile, destFile), copied++
            } catch (t) {
                failed++
            }
        }
        copied ? (await q(!0), f("تم تثبيت " + copied + " موقرت مرفق" + (skipped ? "، وتخطّي " + skipped + " موجود مسبقاً" : "") + (failed ? "، وفشل " + failed : "") + ".", "ok")) : f(skipped ? "القوالب المرفقة موجودة بالفعل في مجلد بريمير." : "تعذّر تثبيت القوالب المرفقة.", failed ? "e" : "ok")
    }

    function R() {
        var t = i("view");
        t.textContent = "";
        var e = 0,
            n = c.text,
            r = function(e, r) {
                if (!(r <= e)) {
                    var a = document.createElement("span");
                    a.className = "cap", a.textContent = n.slice(e, r), t.appendChild(a)
                }
            };
        c.marks.slice().sort(function(t, e) {
            return t.start - e.start
        }).forEach(function(a) {
            var i = w(a.mg);
            if (i) {
                r(e, a.start);
                var o = document.createElement("span");
                o.className = "mk", o.style.setProperty("--c", i.color), o.title = i.name, o.textContent = n.slice(a.start, a.end), t.appendChild(o), e = a.end
            }
        }), r(e, n.length)
    }

    function G() {
        var t = i("marks");
        t.textContent = "", c.marks.slice().sort(function(t, e) {
            return t.start - e.start
        }).forEach(function(e) {
            var n = w(e.mg);
            if (n) {
                var r = document.createElement("div");
                r.className = "mkrow", r.style.setProperty("--c", n.color);
                var a = c.text.slice(e.start, e.end).replace(/\s+/g, " ").trim(),
                    i = document.createElement("input");
                i.type = "text", i.className = "tx edit" + (e.edit ? " changed" : ""), i.dir = "auto", i.value = e.edit || a, i.title = "عدّل النص الظاهر في الموقرت (التوقيت يبقى كما هو). امسحه ليرجع النص الأصلي: " + a;
                var o = null;
                i.addEventListener("input", function() {
                    clearTimeout(o), o = setTimeout(function() {
                        var t = i.value.replace(/\s+/g, " ").trim();
                        t && t !== a ? (e.edit = t, i.classList.add("changed")) : (delete e.edit, i.classList.remove("changed")), h("sb.marks", c.marks), wt()
                    }, 700)
                }), i.addEventListener("keydown", function(t) {
                    "Enter" === t.key && i.blur()
                });
                var s = document.createElement("select");
                s.className = "nm", s.title = "غيّر نوع الموقرت", [u].concat(l).forEach(function(t) {
                    var e = document.createElement("option");
                    e.value = t.id, e.textContent = t.name, s.appendChild(e)
                }), s.value = e.mg, s.addEventListener("change", function() {
                    e.mg = s.value, h("sb.marks", c.marks), R(), G(), it(), wt()
                });
                var f = document.createElement("button");
                f.textContent = "×", f.title = "حذف التعليم", f.addEventListener("click", function() {
                    W(e.start, e.end, null)
                }), r.appendChild(i), r.appendChild(s), r.appendChild(f), t.appendChild(r), B(s)
            }
        }), ut()
    }

    function z() {
        var t = window.getSelection(),
            e = i("view");
        if (!t.rangeCount || t.isCollapsed) return null;
        var n = t.getRangeAt(0);
        if (!e.contains(n.startContainer) || !e.contains(n.endContainer)) return null;
        var r = document.createRange();
        r.selectNodeContents(e), r.setEnd(n.startContainer, n.startOffset);
        var a = r.toString().length,
            o = a + n.toString().length,
            s = -1,
            l = -1;
        return g(c.text).forEach(function(t) {
            t.e > a && t.s < o && (s < 0 && (s = t.s), l = t.e)
        }), s < 0 ? null : {
            a: s,
            b: l
        }
    }
    document.addEventListener("mousedown", function(t) {
        !P || P.contains(t.target) || (t.target.className || "").toString().match(/\bddbtn\b/) || D()
    }), document.addEventListener("keydown", function(t) {
        "Escape" === t.key && D()
    });
    var U = !1;

    function J() {
        var t = i("pop");
        t && (t.hidden = !0), U = !1
    }

    function V() {
        var t = i("pop"),
            e = i("view");
        if (t) {
            var n = z();
            if (n) {
                var r = window.getSelection().getRangeAt(0).getBoundingClientRect(),
                    a = e.getBoundingClientRect();
                t.textContent = "";
                var o = l.filter(function(t) {
                        return t.fav
                    }),
                    s = U || !o.length ? l : o,
                    m = function(e, n, r, a) {
                        var i = document.createElement("button");
                        return i.type = "button", i.className = "chip" + (a ? " " + a : ""), i.textContent = e, n && i.style.setProperty("--c", n), i.addEventListener("mousedown", function(t) {
                            t.preventDefault()
                        }), i.addEventListener("click", r), t.appendChild(i), i
                    };
                m(u.name, u.color, function() {
                    X(u.id), J()
                }), s.forEach(function(t) {
                    m(t.name, t.color, function() {
                        X(t.id), J()
                    })
                }), o.length && o.length < l.length && m(U ? "★ المفضلة" : "الكل…", "", function() {
                    U = !U, V()
                }, "more"), m("✎ تعديل/حذف", "#9aa0a6", function() {
                    ! function(t) {
                        var e = i("pop");
                        e.textContent = "";
                        var cur = c.text.slice(t.a, t.b),
                            inp = document.createElement("input");
                        inp.type = "text", inp.dir = "auto", inp.value = cur, inp.placeholder = "اتركه فاضي للحذف", inp.style.cssText = "display:block;width:210px;margin:2px 0", e.appendChild(inp);
                        var ok = document.createElement("button");
                        ok.type = "button", ok.className = "chip", ok.textContent = "✔ تطبيق", ok.addEventListener("click", function() {
                            var full = (c.text.slice(0, t.a) + inp.value + c.text.slice(t.b)).replace(/[ \t]{2,}/g, " ").replace(/[ \t]+\n/g, "\n");
                            try {
                                window.getSelection().removeAllRanges()
                            } catch (e) {}
                            Vt(full), J(), f(inp.value.trim() ? "عدّلت الكلمة/الجملة المحدّدة." : "حذفت الكلمة/الجملة المحدّدة.", "ok")
                        }), e.appendChild(ok), e.hidden = !1, inp.focus(), inp.select()
                    }(n)
                }, "more"), m("🎤 إضافة كمقابلة", "#c78bff", function() {
                    ! function(t) {
                        var e = i("pop");
                        e.textContent = "";
                        var n = function(t) {
                                var n = document.createElement("input");
                                return n.type = "text", n.dir = "auto", n.placeholder = t, n.style.cssText = "display:block;width:210px;margin:2px 0", e.appendChild(n), n
                            },
                            r = n("اسم الضيف"),
                            a = n("صفة الضيف (اختياري)"),
                            o = document.createElement("button");
                        o.type = "button", o.className = "chip", o.textContent = "✔ أضف المقابلة", o.addEventListener("click", function() {
                            var e = t.a,
                                n = t.b,
                                o = c.text.slice(e, n).split(/\n+/).map(function(t) {
                                    return t.replace(/\s+/g, " ").trim()
                                }).filter(Boolean);
                            if (o.length) {
                                var s = g(c.text.slice(0, e)).length,
                                    l = (c.text.slice(0, e) + "\n" + c.text.slice(n)).replace(/[ \t]+\n/g, "\n").replace(/\n{2,}/g, "\n").replace(/^\n+|\n+$/g, "");
                                c.text.slice(0, e).trim();
                                try {
                                    window.getSelection().removeAllRanges()
                                } catch (t) {}
                                Vt(l), c.inserts.push({
                                    pos: s,
                                    lines: o,
                                    name: r.value.trim(),
                                    title: a.value.trim(),
                                    tcs: [],
                                    dur: 0
                                }), c.times = null, c.blocks = [], c.extrasDone = !1, R(), G(), ct(), ut();
                                var u = i("script-info");
                                u && (u.hidden = !1, u.textContent = "مقابلات: " + c.inserts.length + " (لن تدخل في المطابقة مع الصوت)"), f("أضفت مقابلة" + (r.value.trim() ? " «" + r.value.trim() + "»" : "") + " (" + o.length + " سطر) وأخرجتها من التعليق. أعد المطابقة ليُفصل الصوت عندها.", "ok"), J()
                            } else J()
                        }), e.appendChild(o), e.hidden = !1, r.focus()
                    }(n)
                }, "more"), m("📰 تعيين كمصدر", "#4fc3f7", function() {
                    ! function(t) {
                        var e = i("pop");
                        e.textContent = "";
                        var n = c.text.slice(t.a, t.b).trim(),
                            r = SubScript.srcLabel(n.replace(/[.،,:؛]+$/, "")),
                            a = document.createElement("input");
                        a.type = "text", a.dir = "auto", a.placeholder = "اسم المصدر (مثال: رويترز)", a.value = r || "", a.style.cssText = "display:block;width:210px;margin:2px 0", e.appendChild(a);
                        var o = document.createElement("label");
                        o.style.cssText = "display:block;font-size:12px;margin:2px 0";
                        var s = document.createElement("input");
                        s.type = "checkbox", s.checked = !!r, o.appendChild(s), o.appendChild(document.createTextNode(" المظلَّل هو اسم المصدر نفسه (احذفه من التعليق)")), e.appendChild(o);
                        var l = document.createElement("button");
                        l.type = "button", l.className = "chip", l.textContent = "✔ تعيين", l.addEventListener("click", function() {
                            var e = a.value.trim() || (s.checked ? n : "");
                            if (e) {
                                var r = g(c.text),
                                    o = [];
                                if (r.forEach(function(e, n) {
                                        e.e > t.a && e.s < t.b && o.push(n)
                                    }), o.length) {
                                    var l, u;
                                    try {
                                        window.getSelection().removeAllRanges()
                                    } catch (t) {}
                                    if (s.checked) {
                                        for (var m = o[0], d = o[o.length - 1]; m > 0 && !/\n/.test(c.text.slice(r[m - 1].e, r[m].s));) m--;
                                        for (; d < r.length - 1 && !/\n/.test(c.text.slice(r[d].e, r[d + 1].s));) d++;
                                        var h = {};
                                        o.forEach(function(t) {
                                            h[t] = 1
                                        });
                                        var p = function(t) {
                                            var e = 0;
                                            return o.forEach(function(n) {
                                                n < t && e++
                                            }), t - e
                                        };
                                        l = p(m), u = Math.max(l, p(d + 1) - 1);
                                        var v = (c.text.slice(0, t.a) + " " + c.text.slice(t.b)).replace(/[ \t]+\n/g, "\n").replace(/\n[ \t]+/g, "\n").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
                                        if (0 === g(v).length) return void J();
                                        Vt(v)
                                    } else l = o[0], u = o[o.length - 1];
                                    c.sources = (c.sources || []).filter(function(t) {
                                        return !(t.w0 <= u && t.w1 >= l)
                                    }), c.sources.push({
                                        w0: l,
                                        w1: u,
                                        label: e
                                    }), c.sources.sort(function(t, e) {
                                        return t.w0 - e.w0
                                    }), c.extrasDone = !1, ut();
                                    var w = i("script-info");
                                    w && (w.hidden = !1, w.textContent = "مصادر: " + c.sources.length + " · مقابلات: " + (c.inserts || []).length), f("عيّنت المصدر «" + e + "» على الكلمات " + (l + 1) + "–" + (u + 1) + (s.checked ? " وحذفت اسمه من التعليق." : ".") + " سيظهر مع آخر جملة فيها.", "ok"), J()
                                } else J()
                            } else a.focus()
                        }), e.appendChild(l), e.hidden = !1, a.focus()
                    }(n)
                }, "more");
                i("clear-mark") && m("إزالة التعليم", "", function() {
                    W(n.a, n.b, null), window.getSelection().removeAllRanges(), J()
                }, "clr");
                t.hidden = !1;
                var d = t.offsetWidth,
                    h = t.offsetHeight,
                    p = r.top - a.top - h - 6;
                p < 0 && (p = r.bottom - a.top + 6);
                var v = Math.min(Math.max(0, r.right - a.left - d), Math.max(0, a.width - d));
                t.style.top = Math.round(p) + "px", t.style.left = Math.round(v) + "px"
            } else J()
        }
    }

    function W(t, e, n) {
        var r = [];
        c.marks.forEach(function(n) {
            n.end <= t || n.start >= e ? r.push(n) : (n.start < t && r.push({
                start: n.start,
                end: t,
                mg: n.mg
            }), n.end > e && r.push({
                start: e,
                end: n.end,
                mg: n.mg
            }))
        }), n && r.push({
            start: t,
            end: e,
            mg: n
        }), c.marks = r, h("sb.marks", r), R(), G(), it(), wt()
    }

    function X(t) {
        if (c.text.trim()) {
            var e = z();
            e ? (W(e.a, e.b, t), window.getSelection().removeAllRanges()) : f("ظلّل كلمات من النص أولاً، ثم اضغط على الموقرت.", "w")
        } else f("الصق النص أولاً.", "w")
    }

    function Y(t) {
        c.audio = t || "", h("sb.audio", c.audio), i("audio-name").textContent = t ? r.basename(t) : "لم يتم اختيار ملف", i("audio-name").title = t || "", ut()
    }

    function K() {
        var t = n.homedir(),
            a = "win32" === process.platform ? r.join(t, "collectpro-env", "Scripts", "stable-ts.exe") : r.join(t, "collectpro-env", "bin", "stable-ts");
        return e.existsSync(a) ? a : ""
    }

    function Z(t, e, n) {
        return new Promise(function(r, i) {
            var o = Object.assign({}, process.env, {
                    PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:" + (process.env.PATH || ""),
                    HOMEBREW_NO_AUTO_UPDATE: "1",
                    HOMEBREW_NO_INSTALL_CLEANUP: "1",
                    PIP_DISABLE_PIP_VERSION_CHECK: "1",
                    PYTHONIOENCODING: "utf-8"
                }),
                s = a.spawn(t, e, {
                    env: o
                }),
                c = "",
                l = function(t) {
                    var e = t.toString();
                    c = (c + e).slice(-1200);
                    var r = e.split(/\r?\n/).filter(Boolean).pop();
                    r && n && n(r.slice(0, 90))
                };
            s.stdout.on("data", l), s.stderr.on("data", l), s.on("error", function(t) {
                i(new Error(t.message))
            }), s.on("close", function(t) {
                0 === t ? r(c) : i(new Error(c.split("\n").slice(-5).join("\n")))
            })
        })
    }

    function Q(t) {
        for (var n = 0; n < t.length; n++)
            if (e.existsSync(t[n])) return t[n];
        return ""
    }
    // flattens a (possibly multi-line, box-drawn CLI) error message into one safe line,
    // so nothing downstream ever gets cut by a later split("\n")[0] / truncation step.
    function _sbFlat(msg) {
        return String(msg == null ? "" : msg)
            .replace(/[─-╿]/g, "") // box-drawing border chars (┏━┃┗ etc.)
            .replace(/\s*\n\s*/g, " / ")
            .replace(/\s{2,}/g, " ")
            .replace(/^\s+|\s+$/g, "")
    }
    function wHas(t) {
        try {
            return a.execFileSync("win32" === process.platform ? "where" : "which", [t], {
                stdio: "ignore"
            }), !0
        } catch (t) {
            return !1
        }
    }

    function wPy() {
        for (var t = [
                ["py", ["-3", "--version"]],
                ["python", ["--version"]],
                ["python3", ["--version"]]
            ], e = 0; e < t.length; e++) try {
            return a.execFileSync(t[e][0], t[e][1], {
                stdio: "ignore"
            }), t[e][0]
        } catch (t) {}
        return ""
    }
    "win32" === process.platform && i("setup-cmd") && (i("setup-cmd").textContent = "winget install -e --id Python.Python.3.11\nwinget install -e --id Gyan.FFmpeg\npy -3 -m venv %USERPROFILE%\\collectpro-env\n%USERPROFILE%\\collectpro-env\\Scripts\\pip install -U stable-ts", i("setup") && i("setup").querySelector("p.muted") && (i("setup").querySelector("p.muted").textContent = "أو يدوياً: افتح PowerShell والصق الأوامر التالية مرة واحدة:"));
    async function tt() {
        if ("win32" === process.platform) {
            var pt = function(t) {
                i("align-state").textContent = t
            };
            i("bar").hidden = !1, i("bar").classList.add("busy");
            try {
                var py = wPy();
                if (py) f("الخطوة ١/٤: Python موجود.", "ok");
                else {
                    if (!wHas("winget")) throw new Error('Python غير مثبت، ولا يوجد winget على هذا الجهاز لتثبيته تلقائياً.\nنزّل Python من python.org (فعّل خيار "Add python.exe to PATH" أثناء التثبيت)، ثم أعد الضغط على الزر.');
                    f("الخطوة ١/٤: تثبيت Python عبر winget (دقائق قليلة)…"), pt("تثبيت Python…"), await Z("winget", ["install", "-e", "--id", "Python.Python.3.11", "--silent", "--accept-package-agreements", "--accept-source-agreements"], pt);
                    if (!(py = wPy())) throw new Error("تم تثبيت Python لكن لم أجده على PATH. أغلق بريمير وافتحه من جديد ثم أعد الضغط على الزر.")
                }
                wHas("ffmpeg") ? f("الخطوة ٢/٤: ffmpeg موجود.", "ok") : wHas("winget") ? (f("الخطوة ٢/٤: تثبيت ffmpeg عبر winget…"), pt("تثبيت ffmpeg…"), await Z("winget", ["install", "-e", "--id", "Gyan.FFmpeg", "--silent", "--accept-package-agreements", "--accept-source-agreements"], pt).catch(function() {
                    f("تعذّر تثبيت ffmpeg تلقائياً؛ المطابقة قد تفشل بدونه. ثبّته يدوياً إذا احتجت.", "w")
                })) : f("ffmpeg غير موجود و winget غير متاح؛ المطابقة قد تفشل بدونه.", "w");
                var c = r.join(n.homedir(), "collectpro-env"),
                    vpy = r.join(c, "Scripts", "python.exe"),
                    vpip = r.join(c, "Scripts", "pip.exe");
                e.existsSync(vpy) ? f("الخطوة ٣/٤: البيئة موجودة.", "ok") : (f("الخطوة ٣/٤: إنشاء البيئة…"), pt("إنشاء البيئة…"), await Z(py, "py" === py ? ["-3", "-m", "venv", c] : ["-m", "venv", c], pt)), f("الخطوة ٤/٤: تثبيت أداة المطابقة (قد تأخذ دقائق، لا تغلق اللوحة)…"), pt("تثبيت المطابقة…"), await Z(vpip, ["install", "-U", "stable-ts"], pt);
                if (!K()) throw new Error("انتهى التثبيت لكن الأداة لم تظهر. أرسل لي هذا السطر.");
                et(), f("تم تثبيت المحرك. يمكنك الآن الضغط على «طابق النص مع الصوت». أول مطابقة تنزّل نموذج اللغة وقد تتأخر قليلاً.", "ok")
            } catch (t) {
                f("فشل التثبيت: " + t.message, "e")
            } finally {
                pt(""), i("bar").hidden = !0, i("bar").classList.remove("busy")
            }
        } else if ("darwin" === process.platform) {
            var t = function(t) {
                i("align-state").textContent = t
            };
            i("bar").hidden = !1, i("bar").classList.add("busy");
            try {
                var a = Q(["/opt/homebrew/bin/brew", "/usr/local/bin/brew"]),
                    o = ["/opt/homebrew/bin/python3.11", "/opt/homebrew/bin/python3.12", "/opt/homebrew/bin/python3.10", "/usr/local/bin/python3.11", "/usr/local/bin/python3.12"],
                    s = Q(o);
                if (s) f("الخطوة ١/٤: Python موجود.", "ok");
                else {
                    if (!a) throw new Error('لا يوجد Homebrew على هذا الجهاز، وتثبيته يحتاج كلمة سر المدير فلا أستطيع تنفيذه من هنا.\nافتح Terminal والصق:\n/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\nثم اضغط الزر هنا مرة ثانية.');
                    if (f("الخطوة ١/٤: تثبيت Python (دقائق قليلة)…"), t("تثبيت Python…"), await Z(a, ["install", "python@3.11"], t), !(s = Q(o))) throw new Error("تم تثبيت Python لكن لم أجده. أعد الضغط على الزر.")
                }
                if (Q(["/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg"])) f("الخطوة ٢/٤: ffmpeg موجود.", "ok");
                else {
                    if (!a) throw new Error("ffmpeg غير مثبت ولا يوجد Homebrew. ثبّت Homebrew أولاً (الأمر في المربع الأصفر) ثم أعد الضغط.");
                    f("الخطوة ٢/٤: تثبيت ffmpeg…"), t("تثبيت ffmpeg…"), await Z(a, ["install", "ffmpeg"], t)
                }
                var c = r.join(n.homedir(), "collectpro-env");
                e.existsSync(r.join(c, "bin", "python")) ? f("الخطوة ٣/٤: البيئة موجودة.", "ok") : (f("الخطوة ٣/٤: إنشاء البيئة…"), t("إنشاء البيئة…"), await Z(s, ["-m", "venv", c], t)), f("الخطوة ٤/٤: تثبيت أداة المطابقة (قد تأخذ ٣–٨ دقائق، لا تغلق اللوحة)…"), t("تثبيت المطابقة…");
                var l = "arm64" === n.arch() ? "stable-ts[mlx]" : "stable-ts";
                try {
                    await Z(r.join(c, "bin", "pip"), ["install", "-U", l], t)
                } catch (e) {
                    if ("stable-ts" === l) throw e;
                    f("تعذّر نسخة MLX، أجرّب النسخة العادية…", "w"), await Z(r.join(c, "bin", "pip"), ["install", "-U", "stable-ts"], t)
                }
                if (!K()) throw new Error("انتهى التثبيت لكن الأداة لم تظهر. أرسل لي هذا السطر.");
                et(), f("تم تثبيت المحرك. يمكنك الآن الضغط على «طابق النص مع الصوت». أول مطابقة تنزّل نموذج اللغة وقد تتأخر قليلاً.", "ok")
            } catch (t) {
                f("فشل التثبيت: " + t.message, "e")
            } finally {
                t(""), i("bar").hidden = !0, i("bar").classList.remove("busy")
            }
        } else f("التثبيت التلقائي متاح على ماك وويندوز فقط. استعمل الأوامر الظاهرة في المربع الأصفر.", "w")
    }

    function et() {
        var t = !!K(),
            dot = i("engine-dot"),
            lab = i("engine-label"),
            btn = i("engine-install"),
            su = i("setup");
        dot && (dot.className = "dot " + (t ? "ok" : "bad"));
        lab && (lab.textContent = t ? "المحرك جاهز" : "المحرك (stable-ts) غير مثبت", lab.className = t ? "ok" : "bad");
        btn && (btn.hidden = t);
        su && (su.hidden = t)
    }
    function findFileByExt(dir, ext) {
        var items;
        try {
            items = e.readdirSync(dir)
        } catch (t) {
            return null
        }
        for (var k = 0; k < items.length; k++) {
            var p = r.join(dir, items[k]),
                st;
            try {
                st = e.statSync(p)
            } catch (t) {
                continue
            }
            if (st.isDirectory()) {
                var f = findFileByExt(p, ext);
                if (f) return f
            } else if (new RegExp("\\." + ext + "$", "i").test(items[k])) return p
        }
        return null
    }

    // lists a directory's immediate entries (marking subfolders), for diagnostics only — never throws.
    function _sbListDir(dir) {
        try {
            return e.readdirSync(dir).map(function(it) {
                try {
                    return e.statSync(r.join(dir, it)).isDirectory() ? it + "/" : it
                } catch (s) {
                    return it
                }
            })
        } catch (d) {
            return null
        }
    }

    function mmsPaths() {
        var venv = r.join(n.homedir(), ".sb_mms_venv");
        return {
            venv: venv,
            python: r.join(venv, "win32" === process.platform ? "Scripts" : "bin", "win32" === process.platform ? "python.exe" : "python3")
        }
    }

    // checking that the venv's python binary merely exists isn't enough: an earlier interrupted/failed
    // install (e.g. torch installed fine but uroman failed) leaves that binary in place, which would
    // misreport "installed" forever after. Actually import the packages this needs every time.
    // manual on/off switch (checked by default) so a person can fall back to the plain engine on
    // demand without uninstalling anything, instead of MMS always kicking in silently whenever it's installed.
    function mmsWanted() {
        return mmsReady() && (!i("mms-enable") || i("mms-enable").checked)
    }
    ! function() {
        var cb = i("mms-enable");
        if (cb) {
            var saved = p("sb.mmsEnable", "");
            "0" === saved && (cb.checked = !1), cb.addEventListener("change", function() {
                h("sb.mmsEnable", cb.checked ? "1" : "0")
            })
        }
    }();

    function mmsReady() {
        var py = mmsPaths().python;
        if (!e.existsSync(py)) return !1;
        try {
            return a.execFileSync(py, ["-c", "import torch, torchaudio, uroman, soundfile"], { stdio: "ignore", timeout: 2e4 }), !0
        } catch (t) {
            return !1
        }
    }

    function mmsScriptPath() {
        return r.join(extRoot, "python", "mms_align.py")
    }

    // forced-aligns `wavPath` against the already-known-correct `transcriptText` using Meta's MMS
    // multilingual model (torchaudio), run through a dedicated Python venv. Unlike MFA, this works on
    // raw romanized phones instead of a fixed pronunciation dictionary, so there's no "word not in
    // dictionary" failure mode — which is what made Arabic unusable under MFA (see mms_align.py).
    async function runMMSAlign(wavPath, transcriptText, progressCb) {
        var py = mmsPaths().python;
        if (!e.existsSync(py)) throw new Error("نموذج المحاذاة (MMS) غير مثبّت");
        var stamp = Date.now(),
            txtPath = r.join(n.tmpdir(), "sb_mms_text_" + stamp + ".txt"),
            outPath = r.join(n.tmpdir(), "sb_mms_out_" + stamp + ".json");
        e.writeFileSync(txtPath, transcriptText, "utf8");
        try {
            var out;
            try {
                out = await Z(py, [mmsScriptPath(), wavPath, txtPath, outPath], progressCb)
            } catch (ea) {
                throw new Error("فشلت محاذاة MMS: " + _sbFlat(ea.message))
            }
            if (!e.existsSync(outPath)) throw new Error("لم ينتج نموذج المحاذاة ملف نتائج. مخرجات: " + _sbFlat(out || "(بلا مخرجات)"));
            var data;
            try {
                data = JSON.parse(e.readFileSync(outPath, "utf8"))
            } catch (ej) {
                throw new Error("ملف نتائج المحاذاة غير صالح: " + _sbFlat(ej.message))
            }
            if (data && data.error) throw new Error("فشلت محاذاة MMS: " + _sbFlat(data.error));
            return data && data.words || []
        } finally {
            try {
                e.unlinkSync(txtPath)
            } catch (t) {}
            try {
                e.unlinkSync(outPath)
            } catch (t) {}
        }
    }

    function mmsState() {
        var el = i("mms-state"),
            btn = i("mms-install");
        if (!el) return;
        var has = mmsReady();
        el.textContent = "محاذاة دقيقة إضافية (نموذج MMS متعدد اللغات): " + (has ? "مثبّتة ✓" : "غير مثبّتة");
        el.className = has ? "ok" : "muted";
        btn && (btn.hidden = has || "darwin" !== process.platform)
    }
    mmsState();

    function mmsProgress(label, msg) {
        var st = i("mms-state"),
            bar = i("mms-bar"),
            fill = i("mms-bar-fill");
        if (st) st.textContent = label + (msg ? " — " + msg : "");
        if (!bar || !fill) return;
        bar.hidden = !1;
        var mm = /(\d{1,3}(?:\.\d+)?)\s*%/.exec(msg || "");
        if (mm) {
            bar.classList.remove("busy");
            fill.style.width = Math.max(0, Math.min(100, parseFloat(mm[1]))) + "%"
        } else bar.classList.add("busy"), fill.style.width = ""
    }

    // uroman (and some torch/torchaudio builds) require Python ≥3.10, but macOS's bundled
    // /usr/bin/python3 has stayed on 3.9 for years, so a plain "find any python3" picks the wrong one
    // and the venv silently fails at the uroman step much later. Probe each candidate's real version
    // instead of trusting its path.
    function _sbPyOk(bin) {
        try {
            a.execFileSync(bin, ["-c", "import sys; exit(0 if sys.version_info>=(3,10) else 1)"], { stdio: "ignore" });
            return !0
        } catch (t) {
            return !1
        }
    }
    function findPython310Plus() {
        var cands = ["/opt/homebrew/bin/python3.13", "/opt/homebrew/bin/python3.12", "/opt/homebrew/bin/python3.11", "/opt/homebrew/bin/python3.10", "/opt/homebrew/bin/python3", "/usr/local/bin/python3.13", "/usr/local/bin/python3.12", "/usr/local/bin/python3.11", "/usr/local/bin/python3.10", "/usr/local/bin/python3", "/usr/bin/python3"];
        for (var k = 0; k < cands.length; k++)
            if (e.existsSync(cands[k]) && _sbPyOk(cands[k])) return cands[k];
        if (wHas("python3") && _sbPyOk("python3")) return "python3";
        return ""
    }

    async function installMMS() {
        if ("darwin" !== process.platform) return void f("تثبيت نموذج المحاذاة التلقائي متاح على ماك حالياً فقط. راسلني وبعطيك أوامر التثبيت اليدوية لويندوز.", "w");
        var btn = i("mms-install"),
            bar = i("mms-bar"),
            fill = i("mms-bar-fill");
        btn && (btn.disabled = !0), bar && (bar.hidden = !1, bar.classList.add("busy")), fill && (fill.style.width = "");
        try {
            var paths = mmsPaths(),
                python3 = findPython310Plus();
            if (!python3) {
                var brew = Q(["/opt/homebrew/bin/brew", "/usr/local/bin/brew"]);
                if (!brew) throw new Error("ما لقيت Python 3.10 أو أحدث على جهازك (نسخة macOS المدمجة قديمة ولا تكفي)، ولا يوجد Homebrew لتثبيت نسخة أحدث تلقائياً. ثبّت Python من python.org (نسخة 3.10 فأعلى) وأعد الضغط على الزر.");
                mmsProgress("تثبيت Python حديث (مرة واحدة)"), await Z(brew, ["install", "python@3.12"], function(m) {
                    mmsProgress("تثبيت Python حديث", m)
                }), python3 = findPython310Plus();
                if (!python3) throw new Error("تم تثبيت Python لكن لم أجد نسخة 3.10 فأعلى بالمسار المتوقع. أعد الضغط على الزر.")
            }
            if (e.existsSync(paths.venv) && !_sbPyOk(paths.python)) {
                mmsProgress("البيئة القديمة بها Python قديم جداً — إعادة إنشائها");
                try {
                    e.rmSync(paths.venv, { recursive: !0, force: !0 })
                } catch (rme) {}
            }
            if (!e.existsSync(paths.venv)) {
                mmsProgress("إنشاء بيئة Python خاصة بنموذج المحاذاة (مرة واحدة)");
                await Z(python3, ["-m", "venv", paths.venv], function(m) {
                    mmsProgress("إنشاء بيئة Python", m)
                })
            }
            if (!e.existsSync(paths.python)) throw new Error("تم إنشاء البيئة لكن Python لم يظهر بالمسار المتوقع داخلها. أعد الضغط على الزر.");
            mmsProgress("تحضير pip");
            await Z(paths.python, ["-m", "pip", "install", "--upgrade", "pip"], function(m) {
                mmsProgress("تحضير pip", m)
            });
            mmsProgress("تثبيت PyTorch و torchaudio (قد يأخذ عدة دقائق، ~1.5GB، لا تغلق اللوحة)");
            await Z(paths.python, ["-m", "pip", "install", "torch", "torchaudio"], function(m) {
                mmsProgress("تثبيت PyTorch/torchaudio", m)
            });
            mmsProgress("تثبيت أداة تحويل الحروف (uroman)");
            await Z(paths.python, ["-m", "pip", "install", "uroman"], function(m) {
                mmsProgress("تثبيت uroman", m)
            });
            mmsProgress("تثبيت أداة قراءة الصوت (soundfile)");
            await Z(paths.python, ["-m", "pip", "install", "soundfile"], function(m) {
                mmsProgress("تثبيت soundfile", m)
            });
            mmsProgress("تنزيل نموذج المحاذاة (مرة واحدة، ~1.3GB)");
            await Z(paths.python, ["-c", "from torchaudio.pipelines import MMS_FA as b\nb.get_model(with_star=False)\n"], function(m) {
                mmsProgress("تنزيل نموذج المحاذاة", m)
            });
            if (!mmsReady()) throw new Error("انتهى التثبيت لكن Python الخاص بنموذج المحاذاة لم يظهر بالمسار المتوقع. أرسل لي آخر سطر من السجل.");
            mmsState(), f("تم تثبيت نموذج المحاذاة (MMS) بنجاح.", "ok")
        } catch (t) {
            f("فشل تثبيت نموذج المحاذاة: " + t.message, "e")
        } finally {
            btn && (btn.disabled = !1), bar && (bar.hidden = !0)
        }
    }
    i("mms-install") && (i("mms-install").onclick = installMMS);
    ! function() {
        var model = i("o-model");
        if (model) {
            var saved = p("sb.model", "");
            if (saved) model.value = saved;
            model.addEventListener("change", function() {
                h("sb.model", model.value)
            })
        }
    }();

    function nt(t, e, n, r, i, o, s, c, l) {
        return new Promise(function(u, f) {
            var m = "win32" === process.platform ? "" : "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:",
                d = Object.assign({}, process.env, {
                    PATH: m + (process.env.PATH || ""),
                    PYTHONIOENCODING: "utf-8",
                    LC_ALL: "en_US.UTF-8"
                }),
                h = n ? [e, "--align", n, "--language", "ar", "--model", i, "-o", r] : [e, "--language", "ar", "--model", i, "-o", r];
            s && h.push("--mlx_whisper"), c && (h = h.concat(c));
            var p = a.spawn(t, h, {
                    env: d
                }),
                v = "",
                g = !1,
                w = l ? setTimeout(function() {
                    g = !0;
                    try {
                        p.kill("SIGKILL")
                    } catch (t) {}
                }, l) : null,
                b = function(t) {
                    var e = t.toString();
                    v = (v + e).slice(-1500);
                    var n = e.match(/(\d{1,3})%/g);
                    n && o && o(n[n.length - 1])
                };
            p.stdout.on("data", b), p.stderr.on("data", b), p.on("error", function(t) {
                f(new Error("تعذّر تشغيل أداة المطابقة: " + t.message))
            }), p.on("close", function(t) {
                if (w && clearTimeout(w), g) return f(new Error("انتهت المهلة (" + Math.round(l / 6e4) + " دقائق) بدون نتيجة."));
                0 === t ? u() : f(new Error("فشلت المطابقة.\n" + v.split("\n").slice(-6).join("\n")))
            })
        })
    }
    async function rt() {
        if (i("o-novo") && i("o-novo").checked) return async function() {
            if (!c.busy)
                if (c.text.trim()) {
                    var t = g(c.text);
                    if (t.length) {
                        var e = Math.max(5, d("o-cps", 14)),
                            n = Math.max(0, d("o-linegap", .3)),
                            r = d("o-novostart", NaN);
                        if (!isFinite(r)) try {
                            var a = await m("sb_info");
                            r = a && a.ok ? Math.max(0, a.playhead - (a.zero || 0)) : 0
                        } catch (t) {
                            r = 0
                        }
                        c.skipW = {}, c.cuts = [], c.extrasDone = !1, c.syncApplied = 0, c.exAudio = null;
                        for (var i = new Array(t.length), o = 0; o < t.length;) {
                            for (var s = o; o + 1 < t.length && !/\n/.test(c.text.slice(t[o].e, t[o + 1].s));) o++;
                            for (var l = 0, u = s; u <= o; u++) l += t[u].t.length + 1;
                            var h = Math.max(1.2, l / e),
                                p = r;
                            for (u = s; u <= o; u++) {
                                var v = h * (t[u].t.length + 1) / l;
                                i[u] = {
                                    s: p,
                                    e: p + v
                                }, p += v
                            }
                            r = p + n, o++
                        }
                        c.times = i, f("وزّعت " + t.length + " كلمة زمنياً بدون صوت (" + e + " حرف/ث): من " + i[0].s.toFixed(1) + " إلى " + i[i.length - 1].e.toFixed(1) + " ثانية.", "ok"), it(), ut()
                    } else f("النص فارغ.", "e")
                } else f("الصق النص أولاً.", "e")
        }();
        if (!c.busy)
            if (c.audio && e.existsSync(c.audio))
                if (c.text.trim()) {
                    var t = K();
                    if (et(), t) {
                        c.busy = !0, ut(), i("bar").hidden = !1, i("bar").classList.add("busy"), i("align-state").textContent = "جاري المطابقة…";
                        var o = Date.now();
                        c.extrasDone = !1;
                        try {
                            var s = d("o-offset", 0),
                                l = i("o-place-audio").checked && c.inserts.length > 0 && i("o-split").checked,
                                u = null;
                            if (c.exAudio = null, i("o-atrack").dataset && (i("o-atrack").dataset.auto = ""), i("o-place-audio").checked) try {
                                var h = await m("sb_takeExistingAudio", c.audio);
                                h && h.ok && h.found && (u = h, f("وجدت الصوت على التايم لاين (A" + h.track + " عند " + h.start.toFixed(2) + " ث)، سأعيد تنزيله من نفس المكان" + (l ? " مقطوعاً عند المقابلات." : "."), "ok"), parseInt(i("o-atrack").value, 10) || (i("o-atrack").dataset.auto = h.track), c.exAudio = h)
                            } catch (t) {}
                            var zeroStart = !i("o-place-zero") || i("o-place-zero").checked;
                            if (l) {
                                var p = await m("sb_info");
                                if (!p.ok) throw new Error(p.error);
                                s = u ? Math.max(0, u.start) : zeroStart ? 0 : Math.max(0, p.playhead - (p.zero || 0))
                            } else if (i("o-place-audio").checked) {
                                var v = await m("sb_placeAudio", c.audio, parseInt(i("o-atrack").value, 10) || (u ? u.track : 0), u ? u.start : zeroStart ? 0 : "");
                                if (!v.ok) throw new Error(v.error);
                                s = v.offset, v.placed ? f("نزل الصوت على A" + v.track + " عند " + s.toFixed(2) + " ثانية.", "ok") : (f("استُورد الصوت للمشروع لكن ما نزل على التايم لاين (A" + v.track + "). اسحبه بيدك عند " + s.toFixed(2) + " ثانية.", "w"), (v.tries || []).forEach(function(t) {
                                    f("   " + t, "w")
                                }))
                            }
                            if (c.skipW = {}, i("o-verify") && i("o-verify").checked) {
                                try {
                                    i("align-state").textContent = "جاري كتابة ما يقوله المعلّق…", await async function(t, a, o, s) {
                                        var l = r.join(n.tmpdir(), "SubtitleBuilder_asr_" + Date.now() + ".json");
                                        try {
                                            try {
                                                await nt(t, c.audio, null, l, a, s, o, null, 3e5)
                                            } catch (e) {
                                                if (!o) throw e;
                                                await nt(t, c.audio, null, l, a, s, !1, null, 3e5)
                                            }
                                            var u = SubAlign.flatten(JSON.parse(e.readFileSync(l, "utf8"))).map(function(t) {
                                                    return t.t
                                                }),
                                                m = [];
                                            u.forEach(function(t) {
                                                var e = SubNum.spoken(t);
                                                e ? e.forEach(function(t) {
                                                    m.push(t)
                                                }) : m.push(t)
                                            });
                                            var d = g(c.text),
                                                h = [],
                                                p = [];
                                            d.forEach(function(t, e) {
                                                var n = SubNum.spoken(t.t);
                                                n ? n.forEach(function(t) {
                                                    h.push(t), p.push(e)
                                                }) : (h.push(t.t), p.push(e))
                                            });
                                            var v = SubVerify.compare(h, m);
                                            f("كتبت ما يقوله المعلّق (" + m.length + " كلمة) وقارنته بالنص (" + d.length + " كلمة): تطابق " + v.matched + " من " + h.length + ".", "ok");
                                            // هاي الفحص الوحيد اللي يعتمد على نسخة مكتوبة فعلياً من الصوت (مش محاذاة قسرية
                                            // زي MMS اللي بتفرض توقيتاً لكل كلمة بغض النظر إذا انطُقت أصلاً) — لو التطابق منخفض
                                            // جداً هذا دليل قوي إنه الصوت المرفوع مش هو صوت هذا النص، فلازم نوقف هون صراحة
                                            // بدل ما نكمل ونبني كابشن غلط فوق صوت غلط.
                                            if (h.length >= 8 && v.matched < .3 * h.length) {
                                                c.times = null;
                                                var mmErr = new Error("الصوت المرفوع ما يطابق النص إطلاقاً (" + v.matched + " من " + h.length + " كلمة فقط). تأكد إنك رفعت ملف الصوت الصحيح لهذا النص، أو إنه منتهي بالخطأ من فيديو/مشروع آخر.");
                                                throw mmErr.sbMismatch = !0, mmErr
                                            }
                                            var w = {};
                                            v.remove.forEach(function(t) {
                                                w[t] = 1
                                            });
                                            var b = {};
                                            d.forEach(function(t, e) {
                                                var n = !0,
                                                    r = !1;
                                                p.forEach(function(t, a) {
                                                    t === e && (r = !0, w[a] || (n = !1))
                                                }), r && n && (b[e] = 1)
                                            });
                                            var x = Object.keys(b).map(Number);
                                            c.skipW = {};
                                            var k = [],
                                                y = [];
                                            var bracketDone = {};
                                            if (x.forEach(function(t) {
                                                    var e = d[t].t;
                                                    if (SubScript.isStage(e)) { k.push(t); return; }
                                                    var n = SubScript.srcLabel(e.replace(/[.،,:؛]+$/, ""));
                                                    if (n) {
                                                        k.push(t);
                                                        for (var r = t; r > 0 && !/\n/.test(c.text.slice(d[r - 1].e, d[r].s));) r--;
                                                        for (var a = t; a < d.length - 1 && !/\n/.test(c.text.slice(d[a].e, d[a + 1].s));) a++;
                                                        y.push({
                                                            a: r,
                                                            b: a,
                                                            label: n,
                                                            k: t
                                                        });
                                                        return
                                                    }
                                                    // مصدر مكتوب بين قوسين لكنه ليس اسم وكالة معروفة (مثل "(الأمم المتحدة)"):
                                                    // القوسان + أنّ المعلّق لم ينطقه إشارتان كافيتان أنها ملاحظة مصدر لا جزء من التعليق.
                                                    if (bracketDone[t]) return;
                                                    var openPos = Math.max(c.text.lastIndexOf("(", d[t].s), c.text.lastIndexOf("[", d[t].s)),
                                                        closeParen = c.text.indexOf(")", d[t].e),
                                                        closeBrak = c.text.indexOf("]", d[t].e),
                                                        closePos = closeParen < 0 ? closeBrak : closeBrak < 0 ? closeParen : Math.min(closeParen, closeBrak);
                                                    if (openPos < 0 || closePos < 0 || closePos - openPos > 80 || /\n/.test(c.text.slice(openPos, closePos))) return;
                                                    var lo = -1,
                                                        hi = -1,
                                                        allUnspoken = !0;
                                                    for (var wi = 0; wi < d.length; wi++) d[wi].s >= openPos && d[wi].e <= closePos && (lo < 0 && (lo = wi), hi = wi, b[wi] || (allUnspoken = !1));
                                                    if (lo < 0 || !allUnspoken) return;
                                                    var lbl = c.text.slice(openPos + 1, closePos).replace(/[.،,:؛]+$/, "").replace(/^\s+|\s+$/g, "");
                                                    if (!lbl || lbl.split(/\s+/).length > 6) return;
                                                    for (var wj = lo; wj <= hi; wj++) k.push(wj), bracketDone[wj] = 1;
                                                    for (var r2 = lo; r2 > 0 && !/\n/.test(c.text.slice(d[r2 - 1].e, d[r2].s));) r2--;
                                                    for (var a2 = hi; a2 < d.length - 1 && !/\n/.test(c.text.slice(d[a2].e, d[a2 + 1].s));) a2++;
                                                    y.push({
                                                        a: r2,
                                                        b: a2,
                                                        label: lbl,
                                                        k: lo
                                                    })
                                                }), k.length) {
                                                var E = {};
                                                k.forEach(function(t) {
                                                    E[t] = 1
                                                });
                                                var S = "",
                                                    C = 0;
                                                d.forEach(function(t, e) {
                                                    E[e] && (S += c.text.slice(C, t.s), C = t.e)
                                                }), Vt(S = (S += c.text.slice(C)).replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim());
                                                var M = function(t) {
                                                    var e = 0;
                                                    return k.forEach(function(n) {
                                                        n < t && e++
                                                    }), t - e
                                                };
                                                y.forEach(function(t) {
                                                    var e = M(t.a),
                                                        n = Math.max(e, M(t.b + 1) - 1 - 0);
                                                    c.sources.some(function(t) {
                                                        return t.w0 <= n && t.w1 >= e
                                                    }) || c.sources.push({
                                                        w0: e,
                                                        w1: n,
                                                        label: t.label
                                                    })
                                                }), f("أزلت من التعليق " + k.length + " كلمة هي ملاحظات مونتاج" + (y.length ? " (واستخدمت " + y.length + " منها كمصدر للجملة)" : "") + ": " + k.map(function(t) {
                                                    return d[t].t
                                                }).join("، "), "ok"), x = x.filter(function(t) {
                                                    return !E[t]
                                                }).map(M), d = g(c.text)
                                            }
                                            if (!x.length || i("o-verify-del") && i("o-verify-del").checked) {
                                                if (x.length) {
                                                    var N = "",
                                                        _ = 0;
                                                    d.forEach(function(t, e) {
                                                        b[e] && (N += c.text.slice(_, t.s), _ = t.e)
                                                    }), N = (N += c.text.slice(_)).replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim(), f("حذفت " + x.length + " كلمة غير منطوقة في التعليق: " + x.slice(0, 10).map(function(t) {
                                                        return d[t].t
                                                    }).join("، "), "w"), Vt(N)
                                                }
                                            } else x.forEach(function(t) {
                                                c.skipW[t] = 1
                                            }), f("كلمات في النص لا ينطقها المعلّق (بقيت في النص ولم تأخذ وقتاً في المطابقة): " + x.slice(0, 10).map(function(t) {
                                                return d[t].t
                                            }).join("، "), "w");
                                            v.subs.length && f("اختلافات قد تكون أخطاء إملائية في النص (نص ← صوت): " + v.subs.slice(0, 6).map(function(t) {
                                                return t.script + " ← " + t.asr
                                            }).join(" ؛ "), "w"), v.extra.length && f("كلمات ينطقها المعلّق وليست في النص: " + v.extra.slice(0, 5).map(function(t) {
                                                return t.words
                                            }).join(" ؛ "), "w")
                                        } finally {
                                            try {
                                                e.unlinkSync(l)
                                            } catch (t) {}
                                        }
                                    }(t, i("o-model").value, "mlx" === i("o-engine").value && "darwin" === process.platform, function(t) {
                                        i("align-state").textContent = "جاري كتابة ما يقوله المعلّق… " + t
                                    })
                                } catch (t) {
                                    if (t && t.sbMismatch) throw t;
                                    f("تعذّرت مقارنة النص بالصوت (أكمل بدونها): " + String(t.message || t).split("\n")[0], "w")
                                }
                                if (!c.text.trim()) throw new Error("النص فارغ بعد المقارنة.")
                            }
                            var w = r.join(n.tmpdir(), "SubtitleBuilder_" + Date.now()),
                                b = w + ".txt",
                                x = w + ".json",
                                k = g(c.text),
                                y = [],
                                E = [];
                            k.forEach(function(t, e) {
                                var n = SubNum.spoken(t.t);
                                n ? n.forEach(function(t) {
                                    y.push({
                                        t: t
                                    }), E.push(e)
                                }) : (y.push({
                                    t: t.t
                                }), E.push(e))
                            }), e.writeFileSync(b, y.filter(function(t, e) {
                                return !(c.skipW && c.skipW[E[e]])
                            }).map(function(t) {
                                return t.t
                            }).join(" ").replace(/[«»"“”„]/g, "").replace(/[ً-ٰٟ]/g, ""), "utf8");
                            var T = null,
                                usedMMS = !1;
                            // MMS forced alignment (against our own known-correct script text) gives much more precise word
                            // timing than Whisper's own guessed word-timestamps — use it when installed and enabled, same mapWords() logic either way.
                            if (mmsWanted()) {
                                i("align-state").textContent = "أحاذي النص مع الصوت بدقّة (MMS)…";
                                try {
                                    var mmsText = e.readFileSync(b, "utf8");
                                    if (mmsText.trim()) {
                                        var mmsFlat = await runMMSAlign(c.audio, mmsText, function(m) {
                                            i("align-state").textContent = "MMS… " + m
                                        });
                                        if (mmsFlat && mmsFlat.length) {
                                            var Tm = SubAlign.mapWords(y, mmsFlat);
                                            Tm.times.length && Tm.matched >= .5 * k.length && (T = Tm, usedMMS = !0, f("حاذيت النص مع الصوت بـMMS (دقّة أعلى من المعتاد، " + Tm.matched + "/" + y.length + " كلمة).", "ok"))
                                        }
                                    }
                                } catch (eMms) {
                                    f("تعذّر استخدام نموذج المحاذاة (رح أكمل بالمحرك العادي): " + _sbFlat(eMms.message || eMms), "w")
                                }
                            }
                            if (!T) {
                                var S = function(t) {
                                        i("align-state").textContent = "جاري المطابقة… " + t
                                    },
                                    C = "mlx" === i("o-engine").value && "darwin" === process.platform,
                                    M = i("o-model").value,
                                    N = i("o-precise").checked,
                                    _ = [];
                                C && (N && _.push([!0, ["--vad", "True", "--suppress_silence", "True"]]), _.push([!0, null])), N && _.push([!1, ["--vad", "True", "--suppress_silence", "True"]]), _.push([!1, null]);
                                for (var A = null, L = !1, j = 0; j < _.length && !L; j++) try {
                                    try {
                                        e.unlinkSync(x)
                                    } catch (t) {}
                                    await nt(t, c.audio, b, x, M, S, _[j][0], _[j][1], 6e5), C = _[j][0], L = !0
                                } catch (t) {
                                    A = t, f("محاولة المطابقة " + (j + 1) + " فشلت، أجرّب طريقة أخرى. " + String(t.message).split("\n").slice(-2).join(" "), "w")
                                }
                                if (!L) throw A;
                                T = SubAlign.mapWords(y, SubAlign.flatten(JSON.parse(e.readFileSync(x, "utf8"))))
                            }
                            if (T.times.length === y.length && y.length !== k.length) {
                                var I = new Array(k.length);
                                T.times.forEach(function(t, e) {
                                    var n = E[e];
                                    I[n] = I[n] ? {
                                        s: Math.min(I[n].s, t.s),
                                        e: Math.max(I[n].e, t.e)
                                    } : {
                                        s: t.s,
                                        e: t.e
                                    }
                                }), T.times = I, T.matched = Math.min(k.length, T.matched)
                            }
                            if (!T.times.length || T.matched < .5 * k.length) throw new Error("المطابقة ضعيفة (" + T.matched + " من " + k.length + " كلمة). تأكد أن النص يطابق ما ينطقه المعلّق، وجرّب نموذج medium.");
                            if (T.times.forEach(function(t, e) {
                                    var n = Math.max(.35, .11 * k[e].length + .2);
                                    t.e - t.s > n && (t.s = t.e - n)
                                }), i("o-onset") && i("o-onset").checked) try {
                                var O = Q(["/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg"]) || "ffmpeg",
                                    P = await new Promise(function(t, e) {
                                        a.execFile(O, ["-v", "error", "-i", c.audio, "-ac", "1", "-ar", "8000", "-f", "f32le", "-"], {
                                            encoding: "buffer",
                                            maxBuffer: 419430400
                                        }, function(n, r) {
                                            n ? e(n) : t(r)
                                        })
                                    }),
                                    D = new Float32Array(P.buffer.slice(P.byteOffset, P.byteOffset + P.length - P.length % 4)),
                                    B = SubOnset.refine(T.times, SubOnset.envelope(D, 8e3));
                                T.times = B.times, f("ضبطت " + B.moved + " حدّاً (بداية/نهاية) على حواف الصوت الفعلية.", "ok")
                            } catch (t) {
                                f("تعذّر ضبط الحواف من الصوت: " + String(t.message || t).split("\n")[0], "w")
                            }
                            c.syncApplied = d("o-sync", 0) / 1e3, c.times = T.times.map(function(t) {
                                return {
                                    s: t.s + s + c.syncApplied,
                                    e: t.e + s + c.syncApplied
                                }
                            }), c.cuts = [], l ? await at(T.times, s) : c.inserts.length && f("في السكربت " + c.inserts.length + " مقابلة؛ فعّل «قصّ الصوت وإزاحته» (وتنزيل الصوت من اللوحة) لتُترك لها فراغات تلقائياً.", "w");
                            var F = k.length - T.matched;
                            f("تمت المطابقة: " + T.matched + " من " + k.length + " كلمة في " + Math.round((Date.now() - o) / 1e3) + " ثانية (" + (usedMMS ? "MMS" : C ? "MLX" : "عادي") + ")." + (F ? " " + F + " كلمة قُدّر وقتها (غالباً أرقام أو رموز)." : ""), "ok"), it(), i("align-state").textContent = "";
                            try {
                                e.unlinkSync(b), e.unlinkSync(x)
                            } catch (t) {}
                        } catch (t) {
                            f(t.message, "e"), i("align-state").textContent = ""
                        } finally {
                            c.busy = !1, i("bar").hidden = !0, i("bar").classList.remove("busy"), ut()
                        }
                    } else f("أداة المطابقة غير مجهزة. اتبع التعليمات الظاهرة تحت زر المطابقة.", "e")
                } else f("الصق نص التعليق أولاً.", "e");
        else f("اختر ملف الصوت أولاً.", "e")
    }
    async function at(t, e) {
        c.cuts = [];
        var n = c.inserts.slice().sort(function(t, e) {
                return t.pos - e.pos
            }),
            r = 0,
            a = [],
            o = 0,
            s = t.length;
        if (n.forEach(function(n) {
                var i = n.lines.join(" ").length,
                    l = Math.min(n.dur || Math.min(Math.max(i / 14, 3), 40), Math.max(3, d("o-guestmax", 10)));
                l += .6;
                var u = n.pos,
                    f = u > 0 ? t[u - 1].e : 0,
                    m = u < s ? t[u].s : f + l,
                    h = m - f,
                    p = u > 0 && u < s ? f + Math.min(h / 2, .3) : f,
                    v = Math.max(0, l - (m - p));
                if (0 === u || u >= s) u >= s && (n.cutAt = null);
                else {
                    a.push({
                        a: o,
                        b: p,
                        at: e + o + r
                    }), n.cutAt = e + p + r, n.room = l - .6, r += v, o = p;
                    for (var g = u; g < s; g++) c.times[g].s += v, c.times[g].e += v;
                    c.cuts.push({
                        at: n.cutAt,
                        shift: v
                    })
                }
            }), a.length) {
            a.push({
                a: o,
                b: -1,
                at: e + o + r
            });
            var l = await m("sb_placeAudioPieces", c.audio, parseInt(i("o-atrack").value, 10) || parseInt((i("o-atrack").dataset || {}).auto, 10) || 0, a);
            l.ok ? ((l.log || []).forEach(function(t) {
                f("   " + t, /FAILED|:/.test(t) && !/ok$/.test(t) ? "e" : "ok")
            }), l.placed ? f("نزل الصوت على A" + l.track + " مقطوعاً إلى " + a.length + " أجزاء مع فراغات للمقابلات (" + c.cuts.map(function(t) {
                return t.shift.toFixed(1) + " ث"
            }).join(" + ") + ").", "ok") : f("تعذّر وضع بعض أجزاء الصوت، راجع التايم لاين.", "e")) : f(l.error, "e")
        } else {
            var u = await m("sb_placeAudio", c.audio, parseInt(i("o-atrack").value, 10) || (c.exAudio ? c.exAudio.track : 0), c.exAudio ? c.exAudio.start : (!i("o-place-zero") || i("o-place-zero").checked) ? 0 : "");
            u.ok && u.placed && f("نزل الصوت على A" + u.track + ".", "ok")
        }
    }

    function it() {
        c.blocks = [];
        var t = g(c.text);
        if (c.times && t.length === c.times.length) {
            var e, n = i("o-capall").checked || !!c.fullCaps,
                r = [];
            for (e = 0; e < t.length; e++) {
                var a = "cap";
                c.marks.forEach(function(r) {
                    if (t[e].e > r.start && t[e].s < r.end) {
                        var i = w(r.mg);
                        a = i ? "caption" === i.kind ? "int" : n ? "cap" : "mg" : "cap"
                    }
                }), r.push(a)
            }
            var o = parseInt(i("o-lines").value, 10) || 1,
                s = Math.max(10, Math.round(d("o-chars", 34))),
                l = {
                    maxWords: Math.max(1, Math.round(d("o-maxw", 5))),
                    maxChars: s * o,
                    pause: d("o-pause", .25)
                };
            for (e = 0; e < t.length;)
                if ("mg" !== r[e]) {
                    for (var u = e; e + 1 < t.length && r[e + 1] === r[u];) e++;
                    var m = e;
                    e++;
                    for (var h = [], p = u; p <= m; p++) h.push({
                        t: t[p].t,
                        s: c.times[p].s,
                        e: c.times[p].e,
                        lb: p < t.length - 1 && /\n/.test(c.text.slice(t[p].e, t[p + 1].s))
                    });
                    SubSplit.byTiming(h, l).forEach(function(t) {
                        var e = t.map(function(t) {
                                return u + t
                            }),
                            n = t.map(function(t) {
                                return h[t].t
                            }).join(" ");
                        c.blocks.push({
                            text: o > 1 ? SubSplit.breakLines(n, s, o) : n,
                            start: c.times[e[0]].s,
                            end: c.times[e[e.length - 1]].e,
                            interview: "int" === r[u],
                            wc: t.length,
                            w0: e[0],
                            w1: e[e.length - 1]
                        })
                    })
                } else e++;
            ! function() {
                c.guests = [];
                var t = c.times,
                    e = t.length,
                    n = Math.max(1, Math.round(d("o-maxw", 5)));
                c.inserts.forEach(function(r) {
                    var a = [];
                    if (r.lines.forEach(function(t) {
                            t.split(/\s+/).filter(Boolean).forEach(function(t) {
                                a.push({
                                    t: t,
                                    lb: !1
                                })
                            })
                        }), a.length) {
                        var i, o, s = a.join(" ").length,
                            l = Math.min(Math.max(s / 14, 3), 40),
                            u = r.pos > 0 ? t[r.pos - 1].e : 0,
                            m = r.pos < e ? t[r.pos].s : null;
                        null == m ? (i = u, o = u + l) : 0 === r.pos ? (o = m, i = Math.max(0, o - l)) : (i = u, o = m), null != r.cutAt && (i = r.cutAt, o = i + r.room);
                        var h = o - i;
                        h < .7 * (null != r.cutAt ? 0 : l) && f('مقابلة "' + (r.name || r.lines[0].split(" ").slice(0, 3).join(" ")) + '": الفراغ في صوت المعلّق ' + h.toFixed(1) + " ث بينما تحتاج نحو " + l.toFixed(0) + " ث. اترك فراغاً أطول في الصوت (أو مدّده).", "w"), h > 2.5 && (i += .15, o -= .15);
                        var p = [];
                        r.lines.forEach(function(t) {
                            var e = t.split(/\s+/).filter(Boolean);
                            if (e.length)
                                for (var r = Math.max(Math.ceil(e.length / n), Math.ceil(t.length / Math.max(14, Math.round(d("o-chars", 34))))), a = Math.ceil(e.length / r), i = 0; i < e.length; i += a) p.push(e.slice(i, i + a).join(" "))
                        });
                        var v = Math.max(1, 18 * (o - i)),
                            g = 0,
                            w = [];
                        p.forEach(function(t) {
                            (!w.length || g + t.length <= v) && (w.push(t), g += t.length)
                        }), w.length < p.length && f('مقابلة "' + (r.name || w[0].split(" ").slice(0, 3).join(" ")) + '": اختصرت الترجمة إلى ' + w.length + " من " + p.length + " مقاطع لتناسب المدة (" + (o - i).toFixed(1) + " ث). زد «أقصى مدة للمقابلة» لإظهارها كاملة.", "w");
                        var b = (p = w).reduce(function(t, e) {
                                return t + e.length
                            }, 0),
                            x = i;
                        p.forEach(function(t, e) {
                            var n = (o - i) * t.length / b,
                                r = x;
                            x += n, c.blocks.push({
                                text: t,
                                start: r,
                                end: x,
                                endAbs: e === p.length - 1 ? o : x,
                                interview: !0,
                                guest: !0,
                                wc: t.split(/\s+/).length,
                                w0: null,
                                w1: null
                            })
                        }), r.name && c.guests.push({
                            name: r.name,
                            title: r.title,
                            start: i,
                            end: o
                        })
                    }
                }), c.blocks.sort(function(t, e) {
                    return t.start - e.start
                })
            }(), ct()
        } else ct()
    }

    function ot(t, e) {
        var n = d("o-lead", 0) / t,
            r = d("o-mglead", 6) / t,
            a = d("o-gap", .8),
            i = d("o-hold", .6),
            o = d("o-mind", .5),
            s = d("o-mgmin", 1.5),
            l = [];
        c.blocks.forEach(function(t) {
            t.guest || l.push({
                kind: "cap",
                b: t,
                w0: t.w0,
                w1: t.w1
            })
        }), e || ft().forEach(function(t) {
            t.ok && l.push({
                kind: "mg",
                c: t,
                w0: t.w0,
                w1: t.w1
            })
        }), l.sort(function(t, e) {
            return t.w0 - e.w0
        });
        var u = function(t) {
            return Math.max(0, c.times[t.w0].s - ("mg" === t.kind ? r : n))
        };
        return l.forEach(function(e, n) {
            var r, f = l[n + 1],
                m = u(e),
                d = c.times[e.w1].e,
                h = f ? u(f) : null,
                p = a,
                v = "cap" === e.kind ? .25 : i;
            null != h && h - d <= p ? r = h : (r = Math.max(d + v, m + ("mg" === e.kind ? s : o)), null != h && (r = Math.min(r, h))), e.start = Math.round(m * t) / t, e.end = Math.max(Math.round(r * t) / t, e.start + 1 / t), "cap" === e.kind && (e.b.endAbs = e.end, e.b.startAbs = e.start)
        }), l
    }

    function st(t) {
        if (null == t) return "--:--.--";
        var e = Math.floor(t / 60),
            n = t - 60 * e;
        return (e < 10 ? "0" : "") + e + ":" + (n < 10 ? "0" : "") + n.toFixed(2)
    }

    function ct() {
        var t = i("list");
        t.textContent = "", i("n-subs").textContent = c.blocks.length ? "(" + c.blocks.length + ")" : "", c.blocks.forEach(function(e, n) {
            var r = document.createElement("div");
            r.className = "row" + (e.interview ? " int" : ""), r.setAttribute("role", "listitem");
            var a = document.createElement("div");
            a.className = "no", a.textContent = n + 1;
            var i = document.createElement("textarea");
            i.dir = "auto", i.value = e.text, i.rows = Math.max(1, e.text.split("\n").length), i.addEventListener("input", function() {
                e.text = i.value, wt(), e.wc = i.value.split(/\s+/).filter(Boolean).length, i.rows = Math.max(1, i.value.split("\n").length)
            });
            var o = document.createElement("div");
            o.className = "meta";
            var s = document.createElement("span");
            s.className = "t" + (null == e.start ? " none" : ""), s.textContent = st(e.start);
            var c = document.createElement("button");
            c.textContent = "من المؤشر", c.addEventListener("click", async function() {
                var t = await m("sb_info");
                t.ok ? (e.start = t.playhead, ct()) : f(t.error, "e")
            });
            var l = document.createElement("label"),
                u = document.createElement("input");
            u.type = "checkbox", u.checked = !!e.interview, u.addEventListener("change", function() {
                e.interview = u.checked, r.classList.toggle("int", u.checked)
            }), l.appendChild(u), l.appendChild(document.createTextNode("مقابلة")), o.appendChild(s), o.appendChild(c), o.appendChild(l), r.appendChild(a), r.appendChild(i), r.appendChild(o), t.appendChild(r)
        }), ut()
    }

    function lt() {
        return c.marks.filter(function(t) {
            var e = w(t.mg);
            return e && "caption" !== e.kind
        })
    }

    function ut() {
        var t = !!c.times,
            e = c.blocks.length > 0,
            n = lt().length > 0 || c.sources.length > 0 || c.guests.length > 0;
        i("align").disabled = c.busy, i("build").disabled = !t || !e || c.busy, i("place").disabled = !t || !n || c.busy, i("all").disabled = !t || !e && !n || c.busy, i("c-audio").classList.toggle("on", !!c.audio), i("st1").classList.toggle("done", !!c.audio), i("c-sync").classList.toggle("on", t), i("st2").classList.toggle("done", t), i("c-marks").classList.toggle("on", c.marks.length > 0), i("st3").classList.toggle("done", c.marks.length > 0)
    }

    function ft() {
        var t = g(c.text);
        return lt().sort(function(t, e) {
            return t.start - e.start
        }).map(function(e) {
            var n = -1,
                r = -1;
            return t.forEach(function(t, a) {
                t.e > e.start && t.s < e.end && (n < 0 && (n = a), r = a)
            }), {
                mark: e,
                words: n < 0 ? [] : t.slice(n, r + 1),
                w0: n,
                w1: r,
                ok: n >= 0 && !!c.times && c.times.length === t.length
            }
        })
    }

    function mt(t, a, i) {
        var o = SubSplit.buildCues(a, function(t) {
            return {
                fps: t,
                lead: d("o-lead", 4) / t,
                minDur: d("o-mind", 1),
                maxDur: d("o-maxd", 6),
                hold: d("o-hold", .6),
                finalEnd: null
            }
        }(i));
        if (!o.ok) throw new Error(o.error);
        o.cues.forEach(function(t) {
            "string" == typeof t.text && (t.text = t.text.split("\n").map(function(t) {
                return "‏" + t.replace(/^[\u200F\u200E]+|[\u200F\u200E]+$/g, "") + "‏"
            }).join("\n"))
        });
        var s = r.join(n.tmpdir(), "SubtitleBuilder_" + t + "_" + Date.now() + ".srt");
        return e.writeFileSync(s, "\ufeff" + SubSplit.toSrt(o.cues, i), "utf8"), s
    }
    async function dt(t, e) {
        var n = await m("sb_info");
        if (!n.ok) return f(n.error, "e"), !1;
        if (!t) try {
            Xt()
        } catch (t) {}
        c.fullCaps = !!t, it(), c.fps = n.fps, ot(n.fps, !!t);
        var r = [],
            a = [];
        c.blocks.forEach(function(t) {
            (t.interview ? a : r).push(t)
        }), "main" === e && (a = []);
        var o = w(p("sb.capmg", ""));
        try {
            h("sb.capcolor", i("o-capcolor").value)
        } catch (t) {}
        if (i("o-capasmg").checked && o) return async function(t, e, n, r, a) {
            e = e.slice().sort(function(t, e) {
                return t.start - e.start
            });
            var o = e.map(function(e) {
                    var r = Math.round(Math.max(0, null != e.startAbs ? e.startAbs : e.start - d("o-lead", 0) / n.fps) * n.fps) / n.fps,
                        o = Math.round(e.endAbs * n.fps) / n.fps,
                        s = function(t, e, n) {
                            var r = i("o-capcolor").value,
                                a = "yellow" === r || "split" === r && !!t,
                                o = xt(e);
                            if (o >= 0) {
                                var s = e.menus.map(function(t, e) {
                                    return e === o ? a ? 1 : 0 : Math.max(0, (parseInt(t.def, 10) || 1) - 1)
                                });
                                return {
                                    m: e,
                                    menus: s
                                }
                            }
                            var c = "white" === r ? e : "yellow" === r || t ? n : e;
                            return {
                                m: c,
                                menus: A(c, 1)
                            }
                        }(e.interview, t, a),
                        c = s.m;
                    return {
                        path: c.file,
                        label: _(c, e.interview ? "capy" : "capw"),
                        mname: c.name,
                        name: e.interview ? "Sub-Int" : "Sub",
                        start: r,
                        end: Math.max(o, r + 1 / n.fps),
                        lines: [e.text.replace(/\n/g, " ")],
                        menus: s.menus,
                        menuNames: c.menus.map(function(t) {
                            return t.label
                        }),
                        textNames: c.texts.map(function(t) {
                            return t.label
                        })
                    }
                }),
                s = !!w(p("sb.namemg", "")),
                l = 0;
            s && l && o.forEach(function(t, n) {
                e[n].interview && c.guests.forEach(function(e) {
                    var n = e.start + d("o-namedelay", 2),
                        r = Math.min(e.end - .2, n + 5);
                    t.start < r && t.end > n && (t.dy = l)
                })
            });
            var u = parseInt(i("o-ctrack").value, 10) || 0;
            f("جاري تنزيل " + o.length + " سبتايتل بقالبك (قد يأخذ دقيقة)…");
            var m = await vt(o, u, "cap");
            if (!m.ok) return f(m.error, "e"), !1;
            c.capTrack = m.track, bt(o, m, "سبتايتل"), c.inserts.forEach(function(t) {
                var e = c.blocks.filter(function(e) {
                    return e.guest && e.text && t.lines.join(" ").indexOf(e.text.split(" ")[0]) >= 0
                });
                e.length && f("مقابلة " + (t.name || t.lines[0].split(" ").slice(0, 2).join(" ")) + ": الصوت ينقطع عند " + (null != t.cutAt ? st(t.cutAt) : "—") + " · ترجمتها من " + st(e[0].start) + " إلى " + st(e[e.length - 1].endAbs), "ok")
            });
            var h = m.results.filter(function(t) {
                return !t.ok
            });
            f("نزل السبتايتل على V" + m.track + ": " + (o.length - h.length) + " من " + o.length + ".", h.length ? "w" : "ok"), h.slice(0, 5).forEach(function(t) {
                f("   " + (t.error || "لم يُكتب النص كما يجب"), "e")
            }), c.capOnly = r, "main" !== r || pt || f("احذف كليبات السبتايتل القديمة (الكاملة) من تراكها وأبقِ هذه.", "w");
            return !0
        }(o, r.concat(a), n, e, w(p("sb.capmg2", "")) || o);
        if (!r.length && !a.length) return f("لا توجد كلمات للكابشن (كل النص معلّم بموقرت).", "w"), !0;
        var s = [];
        r.length && s.push({
            name: "main" === e ? "التعليق بدون الموقرت" : "التعليق",
            path: mt("Narration", r, n.fps)
        }), a.length && s.push({
            name: "المقابلات",
            path: mt("Interviews", a, n.fps)
        }), f("جاري إنشاء " + s.length + " تراك كابشن على " + n.fps.toFixed(3) + " فريم…");
        var l = await m("sb_build", s);
        return l.ok ? (l.results.forEach(function(t) {
            t.ok ? f("تم إنشاء تراك الكابشن: " + t.name, "ok") : f('تعذّر إنشاء تراك "' + t.name + '": ' + t.error + " (ملف SRT موجود في فولدر Subtitles بالمشروع، اسحبه للتايم لاين).", "e")
        }), t && (c.fullCaps = !1, c.fullBuilt = !0, it()), f("طبّق ستايلك المحفوظ على كل تراك كابشن: حدّد التراك ثم اختر الستايل من لوحة Essential Graphics (Track Style).", "w"), !0) : (f(l.error, "e"), !1)
    }
    async function ht() {
        var t = await m("sb_info");
        if (!t.ok) return f(t.error, "e"), !1;
        c.fps = t.fps;
        for (var e = 0; e < l.length; e++)
            if (!l[e].autoRef && l[e].thumb) {
                var n = await x(l[e]);
                n && (l[e].autoRef = n)
            } var r = [],
            a = ot(t.fps).filter(function(t) {
                return "mg" === t.kind
            }),
            o = {
                shape: i("o-shape").value,
                kashida: i("o-kashida").checked
            };
        a.forEach(function(t) {
            var e = w(t.c.mark.mg),
                n = t.c.mark.edit ? t.c.mark.edit.split(/\s+/).filter(Boolean) : t.c.words.map(function(t) {
                    return t.t
                }),
                a = C(e),
                s = SubShape.shapeLines(n, {
                    fields: Math.max(1, e.texts.length),
                    minLines: a ? 1 : parseInt(i("o-mglines").value, 10) || 1,
                    maxWords: a ? Math.max(1, Math.round(d("o-hlw", 2))) : 0,
                    maxChars: e.maxChars,
                    shape: o.shape,
                    kashida: o.kashida
                }),
                c = s.lines.join(" ").replace(/ـ/g, "").split(/\s+/).filter(Boolean).length;
            c < n.length && f('تنبيه: الموقرت "' + e.name + '" فقد ' + (n.length - c) + " كلمة من: " + n.join(" "), "e"), s.over && f('"' + n.slice(0, 3).join(" ") + '…" أطول مما يتسع له الموقرت؛ زد عدد الحروف للقالب أو قصّر الجملة.', "w");
            var l = A(e, s.lines.length, a),
                u = {
                    path: e.file,
                    label: _(e),
                    mname: e.name,
                    name: e.name,
                    start: t.start,
                    end: t.end,
                    lines: s.lines,
                    menus: l,
                    menuNames: e.menus.map(function(t) {
                        return t.label
                    }),
                    textNames: e.texts.map(function(t) {
                        return t.label
                    })
                };
            a && i("o-hlscale") && d("o-hlscale", 50) > 0 && (u.scaleAbs = d("o-hlscale", 50)), r.push(u)
        });
        var s = {
            track: 0
        };
        if (r.length || pt) {
            if (pt || f("جاري تنزيل " + r.length + " موقرت…"), !(s = await vt(r, parseInt(i("o-track").value, 10) || (c.capTrack ? c.capTrack > 1 ? c.capTrack - 1 : 2 : 0), "mg")).ok) return f(s.error, "e"), !1;
            f("نزلت الموقرتات على V" + s.track + (c.capTrack ? " · السبتايتل V" + c.capTrack + " · التعريف والمصدر فوقهما" : "") + ".", "ok"), s.results.forEach(function(t, e) {
                var n = t.log.filter(function(t) {
                    return !t.ok
                });
                t.ok && t.trimmed && f(e + 1 + ". " + t.name + ": تم", "ok"), e < 2 ? t.log.forEach(function(t) {
                    f("     " + t.name + " = " + t.got, t.ok ? "ok" : "e")
                }) : t.ok && t.trimmed || (f(e + 1 + ". " + t.name + ": " + (t.error || (n.length ? "بعض الحقول لم تُكتب كما يجب" : "لم تُضبط المدة")), "e"), n.forEach(function(t) {
                    f("     [" + t.name + "] كتبت: " + t.want + " | قرأ بريمير: " + t.got, "e")
                }))
            })
        }
        return pt || await kt(t, Math.max(s.track || 0, c.capTrack || 0)), f("راجع الكليبات على التايم لاين. Cmd+Z يتراجع عن كليب واحد في كل مرة.", "w"), !0
    }
    i("o-novo") && (i("o-novo").onchange = function() {
        i("novo-opts").hidden = !this.checked, h("sb.novo", this.checked ? "1" : "0")
    }, i("o-novo").checked = "1" === p("sb.novo", "0"), i("novo-opts").hidden = !i("o-novo").checked, ["o-cps", "o-linegap", "o-novostart"].forEach(function(t) {
        var e = i(t),
            n = p("sb." + t, "");
        e && "" !== n && (e.value = n), e && (e.onchange = function() {
            h("sb." + t, e.value)
        })
    }));
    var pt = !1;
    async function vt(t, e, n) {
        var r = c.placed[n] || [],
            a = null;
        t.forEach(function(t) {
            t.lines && (t.lines = t.lines.map(function(t) {
                return String(t).replace(/(^|[^\d])[.,،؛;]+|[.,،؛;]+(?=[^\d]|$)/g, "$1").replace(/[ \t]{2,}/g, " ").trim()
            }))
        }), t.forEach(function(t) {
            (c.guests || []).forEach(function(e) {
                t.start < e.start - .04 && t.end > e.start + .001 && e.start - t.start >= .2 && (t.end = e.start)
            })
        }), pt && (a = {
            sync: !0,
            stale: r.filter(function(e) {
                return !t.some(function(t) {
                    return Math.abs(t.start - e) < .15
                })
            })
        });
        var i = a ? await m("sb_placeAll", t, e, a) : await m("sb_placeAll", t, e);
        if (i && i.ok && (c.placed[n] = t.map(function(t) {
                return t.start
            })), i && i.ok && !pt) try {
            var o = await m("sb_labelClips", i.track, t.filter(function(t) {
                return null != t.label
            }).map(function(t) {
                return {
                    start: t.start,
                    label: t.label
                }
            }));
            o && o.ok ? f("ألوان التايم لاين (V" + i.track + "): لُوّن " + o.set + " كليب. " + (o.tried || []).slice(0, 3).join(" ; ") + (o.keys ? " | خصائص: " + o.keys : "") + (o.qekeys ? " | QE: " + o.qekeys : ""), o.set ? "ok" : "w") : o && f("تلوين: " + o.error, "w")
        } catch (t) {}
        if (i && i.ok && !pt) {
            var s = {};
            (i.results || []).forEach(function(e, n) {
                var r = t[n] && t[n].mname;
                e && e.lab && r && !s[r] && (s[r] = 1, f("لون التسمية «" + r + "»: " + e.lab, /->/.test(e.lab) ? "i" : "w"))
            })
        }
        return i
    }
    c.placed = {};
    var gt = null;

    function wt() {
        var t = i("o-live");
        t && t.checked && (c.placed.mg || c.placed.cap) && (clearTimeout(gt), gt = setTimeout(function() {
            c.busy ? wt() : yt(async function() {
                pt = !0;
                try {
                    c.placed.mg && await ht(), c.placed.cap && await dt(!1, c.capOnly), f("تحديث مباشر: تم تعديل الكليبات الموجودة.", "ok")
                } finally {
                    pt = !1
                }
            })
        }, 1200))
    }

    function bt(t, e, n) {
        if (e && e.starts && e.starts.length) {
            var r = t.filter(function(t) {
                return !e.starts.some(function(e) {
                    return Math.abs(e - t.start) < .12
                })
            });
            r.length ? (f("تحقق: " + r.length + " من " + t.length + " (" + n + ") غير موجودة على V" + e.track + ":", "e"), r.slice(0, 8).forEach(function(t) {
                f("   " + t.start.toFixed(2) + "ث — " + (t.lines || []).join(" ").slice(0, 50), "e")
            })) : f("تحقق: كل " + t.length + " (" + n + ") موجودة على التايم لاين.", "ok")
        }
    }

    function xt(t) {
        var e = -1;
        return (t.menus || []).forEach(function(t, n) {
            e < 0 && !t.numeric && t.options.length >= 2 && (e = n)
        }), e
    }
    async function kt(t, e) {
        if (!c.extrasDone) {
            var n = w(p("sb.srcmg", "")),
                r = w(p("sb.namemg", "")),
                a = [],
                o = c.times || [],
                s = t.fps,
                l = function(t) {
                    return Math.round(t * s) / s
                },
                u = [];
            try {
                u = ot(s, !1)
            } catch (t) {}
            var h = n ? A(n, 1) : [];
            n && n.menus.forEach(function(t, e) {
                n.pick && null != n.pick[e] || t.options.forEach(function(n, r) {
                    /^\s*source\s*$|مصدر/i.test(n) && !/colou?r|لون/i.test(t.label || "") && (h[e] = r)
                })
            }), n && c.sources.length && c.sources.forEach(function(t) {
                var w0 = Math.max(0, Math.min(t.w0, o.length - 1)),
                    w1 = Math.max(w0, Math.min(t.w1, o.length - 1)),
                    e, r,
                    i = l(Math.max(0, (o[w0] || {
                        s: 0
                    }).s)),
                    s = l((o[w1] || o[w0] || {
                        e: i + 3
                    }).e),
                    f = null,
                    m = g(c.text),
                    d = w0;
                if (!o.length) return;
                for (r = w1 - 1; r >= w0; r--)
                    if (m[r] && /[.!؟?…]$/.test(m[r].t)) {
                        d = r + 1;
                        break
                    } if (d === w0 && w1 - w0 >= 10)
                    for (r = w1 - 1; r >= w0 + 4; r--)
                        if (o[r + 1] && o[r] && o[r + 1].s - o[r].e >= .45) {
                            d = r + 1;
                            break
                        } u.forEach(function(e) {
                    e.w0 >= w0 && e.w1 <= w1 && null != e.start && (null == f || e.end > f) && (f = e.end)
                }), null != (e = o[d] ? Math.max(0, o[d].s) : null) && (i = l(e), s = l(f)), s - i < 3 && (s = i + 3), a.push({
                    path: n.file,
                    label: _(n, "source"),
                    mname: n.name,
                    name: n.name + " — " + t.label,
                    start: i,
                    end: s,
                    lines: [t.label],
                    menus: h,
                    menuNames: n.menus.map(function(t) {
                        return t.label
                    }),
                    textNames: n.texts.map(function(t) {
                        return t.label
                    })
                })
            });
            var v, b = r ? A(r, r.texts.length > 1 ? 2 : 1) : [];
            if (r && ((v = xt(r)) < 0 || r.menus[v].options.forEach(function(t, e) {
                    !/[اأآ]زرق|blue/i.test(t) || r.pick && null != r.pick[v] || (b[v] = e)
                })), r && c.guests.length && (!i("o-hasguest") || i("o-hasguest").checked) && c.guests.forEach(function(t) {
                    var e = Math.max(0, Math.min(d("o-namedelay", 2), t.end - t.start - 1.4)),
                        n = l(t.start + e),
                        i = l(Math.min(t.end - .2, n + 5));
                    i - n < 1 || a.push({
                        path: r.file,
                        label: _(r, "name"),
                        mname: r.name,
                        name: r.name + " — " + t.name,
                        start: n,
                        end: i,
                        lines: r.texts.length > 1 ? [t.name, t.title || " "] : [t.name],
                        menus: b,
                        menuNames: r.menus.map(function(t) {
                            return t.label
                        }),
                        textNames: r.texts.map(function(t) {
                            return t.label
                        })
                    })
                }), a.length) {
                a.sort(function(t, e) {
                    return t.start - e.start
                });
                for (var x = 1; x < a.length; x++) a[x].start < a[x - 1].end && (a[x - 1].end = Math.max(a[x].start, a[x - 1].start + 1 / s));
                f("جاري تنزيل " + a.length + " من المصادر وأسماء الضيوف…");
                var k = await m("sb_placeAll", a, parseInt(i("o-xtrack").value, 10) || (e ? e + 1 : parseInt(i("o-track").value, 10) || 0));
                k.ok ? (c.extrasDone = !0, bt(a, k, "مصدر/اسم"), k.results.forEach(function(t) {
                    f(t.name + ": " + (t.ok ? "تم" : t.error || "تحقق منه"), t.ok ? "ok" : "e")
                })) : f(k.error, "e")
            } else {
                var msgs = [];
                c.sources.length && !n && msgs.push("في النص " + c.sources.length + " مصدر، لكن ما اخترت موقرت المصدر من «قوالب السكربت» — اخترته لينزل تلقائياً."), c.guests.length && !r && msgs.push("في النص " + c.guests.length + " اسم ضيف، لكن ما اخترت موقرت الاسم من «قوالب السكربت» — اخترته لينزل تلقائياً."), n && !c.sources.length && msgs.push("اخترت موقرت مصدر لكن ما لقيت أي مصدر في النص لأنزّله."), r && !c.guests.length && msgs.push("اخترت موقرت اسم لكن ما في أسماء ضيوف مُعرّفة في النص لأنزّلها."), !o.length && (c.sources.length || c.guests.length) && msgs.push("ما حاذيت الصوت مع النص بعد، فما قدرت أحسب توقيت المصادر/الأسماء. طابق أولاً."), msgs.length ? msgs.forEach(function(t) {
                    f(t, "w")
                }) : f("لا يوجد مصادر أو أسماء ضيوف لتنزيلها.", "w")
            }
        }
    }
    async function yt(t) {
        if (!c.busy) {
            c.busy = !0, ut();
            try {
                await t()
            } catch (t) {
                f(t.message, "e")
            } finally {
                c.busy = !1, ut()
            }
        }
    }

    function Et() {
        var t = "1" === p("sb.mgfold", "1");
        i("mg-body").hidden = t, i("mg-fold").textContent = t ? "▼ إظهار المكتبة" : "▲ إخفاء المكتبة"
    }

    function St(t) {
        try {
            "darwin" === process.platform ? a.execFile("open", ["-a", "Google Chrome", t], function(e) {
                e && Ct(t)
            }) : "win32" === process.platform ? a.exec('start chrome "' + t + '"', function(e) {
                e && Ct(t)
            }) : Ct(t)
        } catch (e) {
            Ct(t)
        }
    }

    function Ct(t) {
        try {
            window.cep.util.openURLInDefaultBrowser(t)
        } catch (t) {
            f("تعذّر فتح الرابط.", "e")
        }
    }

    function Mt(t) {
        try {
            var e = document.createElement("textarea");
            return e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e), !0
        } catch (t) {
            return !1
        }
    }

    function Nt(t) {
        var e = i("links");
        if (e) {
            e.textContent = "";
            var n = document.querySelector("#links-wrap > summary");
            if (n && (n.textContent = "روابط الخامات" + (t && t.length ? " (" + t.length + ") — اضغط للفتح" : " (لا توجد)")), t && t.length) {
                e.hidden = !1;
                var r = document.createElement("div");
                r.className = "lkhead";
                var a = document.createElement("b");
                a.textContent = "روابط الخامات (" + t.length + ")", r.appendChild(a);
                var o = document.createElement("button");
                o.className = "link", o.textContent = "فتح الكل في كروم";
                var s = [];
                t.forEach(function(t) {
                    s.indexOf(t.url) < 0 && s.push(t.url)
                }), o.addEventListener("click", function() {
                    s.forEach(function(t, e) {
                        setTimeout(function() {
                            St(t)
                        }, 500 * e)
                    })
                });
                var l = document.createElement("button");
                l.className = "link", l.textContent = "نسخ الكل", l.addEventListener("click", function() {
                    f(Mt(s.join("\n")) ? "نُسخت " + s.length + " روابط." : "تعذّر النسخ.", "ok")
                }), r.appendChild(o), r.appendChild(l), e.appendChild(r);
                var u = [];
                if (t.forEach(function(t, n) {
                        var r = "";
                        try {
                            r = t.url.replace(/^https?:\/\//i, "").split("/")[0].replace(/^www\./, "")
                        } catch (t) {}
                        var a = document.createElement("div");
                        a.className = "lkrow";
                        var i = document.createElement("span");
                        i.className = "no", i.textContent = n + 1;
                        var o = document.createElement("div");
                        o.className = "mid";
                        var s = document.createElement("div");
                        s.className = "lk1", s.dir = "auto", s.textContent = t.ctx || (t.interview ? "مقابلة (انسيرت)" : r);
                        var c = document.createElement("div");
                        if (c.className = "lk2", c.textContent = r + (t.tcs.length ? " · من " + t.tcs[0] + (t.tcs.length > 1 ? " إلى " + t.tcs[t.tcs.length - 1] : "") : ""), t.dup) {
                            var l = document.createElement("span");
                            l.className = "dupbadge", l.textContent = "مكرر", c.appendChild(l)
                        }
                        o.appendChild(s), o.appendChild(c);
                        var f = document.createElement("button");
                        f.className = "chip", f.textContent = "فتح في كروم", f.addEventListener("click", function() {
                            St(t.url)
                        });
                        var m = document.createElement("button");
                        if (m.className = "chip", m.textContent = "نسخ", m.addEventListener("click", function() {
                                Mt(t.url), m.textContent = "تم ✓", setTimeout(function() {
                                    m.textContent = "نسخ"
                                }, 1200)
                            }), a.appendChild(i), a.appendChild(o), t.social && !t.dup) {
                            var d = document.createElement("button");
                            d.className = "chip", d.textContent = "⬇ تنزيل", a._dl = d, d.addEventListener("click", function() {
                                Ht(t, d)
                            }), a.appendChild(d)
                        }
                        a.appendChild(f), a.appendChild(m), e.appendChild(a), t.social && !t.dup && a._dl && u.push([t, a._dl])
                    }), u.length) {
                    var m = document.createElement("button");
                    m.className = "link", m.textContent = "⬇ نزّل كل روابط التواصل (" + u.length + ")", m.addEventListener("click", function() {
                        u.forEach(function(t) {
                            Ht(t[0], t[1])
                        }), f("بدأت تنزيل " + u.length + " رابطاً واحداً بعد الآخر.", "ok")
                    }), r.appendChild(m)
                }
                i("o-autodl") && i("o-autodl").checked && u.forEach(function(t) {
                    (c.dl || {})[t[0].url] || Ht(t[0], t[1])
                })
            } else e.hidden = !0
        }
    }
    i("audio-pick").onclick = function() {
        var t = b(!1, "اختر ملف الصوت", ["wav", "mp3", "m4a", "aac", "aif", "aiff", "mp4", "mov"]);
        t && Y(t[0])
    };
    // سحب وإفلات ملف صوت من خارج الإضافة مباشرة على مربع الصوت.
    if (i("audio-box")) {
        var AUDIO_DROP_EXT = ["wav", "mp3", "m4a", "aac", "aif", "aiff", "mp4", "mov"];
        i("audio-box").addEventListener("dragover", function(t) {
            t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "copy"), i("audio-box").classList.add("drag")
        }), i("audio-box").addEventListener("dragleave", function() {
            i("audio-box").classList.remove("drag")
        }), i("audio-box").addEventListener("drop", function(t) {
            t.preventDefault(), i("audio-box").classList.remove("drag");
            var files = t.dataTransfer && t.dataTransfer.files;
            if (!files || !files.length) return;
            var picked = null;
            for (var di = 0; di < files.length; di++) {
                var p = files[di].path || "";
                if (p && AUDIO_DROP_EXT.indexOf(r.extname(p).slice(1).toLowerCase()) >= 0) {
                    picked = p;
                    break
                }
            }
            picked ? (Y(picked), f("أخذت ملف الصوت من السحب والإفلات: " + r.basename(picked), "ok")) : f("نوع الملف غير مدعوم كصوت. الصيغ المقبولة: " + AUDIO_DROP_EXT.join(", ") + ".", "w")
        })
    }
    i("view").addEventListener("mouseup", function() {
        setTimeout(V, 0)
    }), i("view").addEventListener("keyup", function(t) {
        (t.shiftKey || /Arrow/.test(t.key)) && setTimeout(V, 0)
    }), document.addEventListener("mousedown", function(t) {
        var e = i("pop");
        !e || e.hidden || e.contains(t.target) || i("view").contains(t.target) || J()
    }), i("view").addEventListener("mousedown", function() {
        setTimeout(function() {
            z() || J()
        }, 0)
    }), i("mg-fold").onclick = function() {
        h("sb.mgfold", "1" === p("sb.mgfold", "") ? "" : "1"), Et()
    }, Et(), i("mg-add").onclick = async function() {
        var t = b(!0, "اختر ملفات الموقرت", ["mogrt"]);
        if (t) {
            for (var e = 0; e < t.length; e++) try {
                var n = await F(t[e], !0);
                l.push(n), f("أُضيف: " + n.name + " (" + n.texts.length + " خانات نص)", "ok")
            } catch (n) {
                f(r.basename(t[e]) + ": " + n.message, "e")
            }
            E(), S()
        }
    }, i("mg-fav").onclick = function() {
        h("sb.favonly", "1" === p("sb.favonly", "") ? "" : "1"), i("mg-fav").classList.toggle("on", "1" === p("sb.favonly", "")), S()
    }, i("mg-fav").classList.toggle("on", "1" === p("sb.favonly", "")), i("mg-q").oninput = S, i("mg-scan").onclick = function() {
        q(!1)
    }, i("mg-install") && (i("mg-install").onclick = function() {
        installBundledTemplates()
    }), i("clear-mark").onmousedown = function(t) {
        t.preventDefault()
    }, i("clear-mark").onclick = function() {
        var t = z();
        t ? (W(t.a, t.b, null), window.getSelection().removeAllRanges()) : f("ظلّل الكلمات المعلّمة أولاً.", "w")
    };
    var _t = r.join(n.homedir(), ".subtitlebuilder", "bin", "win32" === process.platform ? "yt-dlp.exe" : "yt-dlp");

    function At(t, n, r) {
        return new Promise(function(a, i) {
            if ((r = r || 0) > 6) return i(new Error("تحويلات كثيرة"));
            require("https").get(t, {
                headers: {
                    "User-Agent": "Mozilla/5.0"
                }
            }, function(t) {
                if (t.statusCode >= 300 && t.statusCode < 400 && t.headers.location) return t.resume(), At(t.headers.location, n, r + 1).then(a, i);
                if (200 !== t.statusCode) return t.resume(), i(new Error("HTTP " + t.statusCode));
                var o = n + ".part",
                    s = e.createWriteStream(o);
                t.pipe(s), s.on("finish", function() {
                    s.close(function() {
                        try {
                            e.renameSync(o, n), a()
                        } catch (t) {
                            i(t)
                        }
                    })
                }), s.on("error", i)
            }).on("error", i)
        })
    }
    async function Lt(t) {
        var a = !t && Q([_t, "/opt/homebrew/bin/yt-dlp", "/usr/local/bin/yt-dlp", r.join(n.homedir(), ".local/bin/yt-dlp")]);
        if (a) return a;
        v(r.dirname(_t));
        var i = "darwin" === process.platform ? "yt-dlp_macos" : "win32" === process.platform ? "yt-dlp.exe" : "yt-dlp_linux";
        f("أنزّل أداة yt-dlp مرة واحدة (حوالي 30 ميغا)…", "w"), await At("https://github.com/yt-dlp/yt-dlp/releases/latest/download/" + i, _t);
        try {
            e.chmodSync(_t, 493)
        } catch (t) {}
        return f("جهزت أداة التنزيل.", "ok"), _t
    }

    function jt(t, e) {
        return new Promise(function(n, r) {
            var i = Object.assign({}, process.env, {
                PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:" + (process.env.PATH || "")
            });
            a.execFile(t, e, {
                env: i,
                timeout: 9e5,
                maxBuffer: 31457280
            }, function(t, e, a) {
                t ? r(new Error(String(a || t.message).split("\n").filter(Boolean).slice(-3).join(" "))) : n(String(e))
            })
        })
    }
    var Tt = {
        no: ["بدون تسجيل دخول", []],
        ff: ["بحساب فايرفوكس", ["--cookies-from-browser", "firefox"]],
        ch: ["بحساب كروم", ["--cookies-from-browser", "chrome"]],
        br: ["بحساب Brave", ["--cookies-from-browser", "brave"]],
        ed: ["بحساب Edge", ["--cookies-from-browser", "edge"]],
        sa: ["بحساب سفاري", ["--cookies-from-browser", "safari"]]
    };

    function It(t) {
        var e = String(t || "");
        return /instagram\.com|facebook\.com|fb\.watch/i.test(e) ? [Tt.ff, Tt.ch, Tt.br, Tt.ed, Tt.no, Tt.sa] : [Tt.no, Tt.ff, Tt.ch, Tt.br, Tt.sa]
    }

    function Ot(t) {
        var e = String(t || "").trim();
        return /(^|\/\/)(www\.)?(t|telegram)\.me\//i.test(e) && !/[?&]embed=/.test(e) && (e += (e.indexOf("?") < 0 ? "?" : "&") + "embed=1&mode=tme"), /instagram\.com/i.test(e) && (e = e.split("?")[0]), e
    }
    async function Pt(t, e, n, a) {
        var i, o = String(t || ""),
            s = "",
            c = "";
        if (i = /(?:twitter|x)\.com\/([\w]+)\/status\/(\d+)/i.exec(o)) {
            a && a("أجرّب مسار X البديل…");
            var l = await Ut("https://api.fxtwitter.com/" + i[1] + "/status/" + i[2], 0);
            if (200 !== l.status) throw new Error("X: HTTP " + l.status);
            var u = JSON.parse(l.body),
                f = u.tweet && u.tweet.media || {},
                m = f.videos || (f.all || []).filter(function(t) {
                    return /video|gif/i.test(t.type || "")
                }) || [];
            if (!m.length) throw new Error("X: لا فيديو في هذه التغريدة (أو التغريدة خاصة).");
            s = (m[Math.min(n, m.length) - 1] || m[0]).url, c = "x-" + i[2] + (n > 1 ? "-" + n : "") + ".mp4"
        } else {
            if (!(i = /(?:t|telegram)\.me\/(?:s\/)?([\w]+)\/(\d+)/i.exec(o))) return "";
            a && a("أجرّب مسار تيليغرام البديل…");
            var d = await Ut("https://t.me/" + i[1] + "/" + i[2] + "?embed=1&mode=tme", 0);
            if (200 !== d.status) throw new Error("تيليغرام: HTTP " + d.status);
            var h = [];
            if (d.body.replace(/<video[^>]*\ssrc="([^"]+)"/gi, function(t, e) {
                    return h.push(e.replace(/&amp;/g, "&")), t
                }), !h.length) throw new Error("تيليغرام: لا فيديو ظاهر في المنشور (قناة خاصة أو المنشور بلا فيديو).");
            s = h[Math.min(n, h.length) - 1] || h[0], c = "tg-" + i[1] + "-" + i[2] + (n > 1 ? "-" + n : "") + ".mp4"
        }
        var p = r.join(e, c);
        return await At(s, p, 0), p
    }

    function Dt(t) {
        var n = (i("raw-cookies") && i("raw-cookies").value || p("sb.cookies", "")).trim();
        return n && e.existsSync(n) ? [
            ["بملف الكوكيز", ["--cookies", n]]
        ].concat(t) : t
    }

    function Bt(t) {
        return t ? ["-S", "vcodec:h264,res,acodec:m4a", "-f", "bv*+ba/b", "--merge-output-format", "mp4", "--ffmpeg-location", r.dirname(t)] : ["-f", "b[ext=mp4][vcodec^=avc]/b[ext=mp4]/b"]
    }
    async function Ft(t, n, i) {
        if (!n) return t;
        var o = r.join(r.dirname(n), "ffprobe");
        if (!e.existsSync(o)) return t;
        var s = await new Promise(function(e) {
            a.execFile(o, ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=codec_name", "-of", "csv=p=0", t], {
                timeout: 6e4
            }, function(t, n) {
                e(t ? null : String(n || "").trim())
            })
        });
        if (null === s) return t;
        if (!s) throw new Error("الملف المنزَّل بلا صورة (صوت فقط). جرّب رابطاً آخر أو غيّر «رقم الفيديو داخل الرابط».");
        var c = s.split(/\s+/)[0].split(",")[0].toLowerCase();
        if (/^(h264|hevc|prores|mpeg4|mjpeg|dnxhd)$/.test(c)) return t;
        i && i("أحوّل الفيديو (" + c + ") إلى H264 ليقرأه بريمير…");
        var l = t.replace(/\.[^.]+$/, "") + ".h264.mp4";
        return await new Promise(function(e, r) {
            a.execFile(n, ["-y", "-v", "error", "-i", t, "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", l], {
                timeout: 9e5,
                maxBuffer: 20971520
            }, function(t, n, a) {
                t ? r(new Error("فشل تحويل الفيديو: " + String(a || t.message).slice(-200))) : e()
            })
        }), l
    }

    function Ht(t, a) {
        c.dl = c.dl || {};
        var i = {};
        try {
            i = JSON.parse(p("sb.dlmap", "{}")) || {}
        } catch (t) {}
        if (c.dl[t.url]) return c.dl[t.url];
        if (i[t.url] && e.existsSync(i[t.url])) return a && (a.textContent = "✓ موجود مسبقاً"), c.dl[t.url] = !0, Promise.resolve();
        var o = function(t) {
            a && (a.textContent = t)
        };
        return o("في الانتظار…"), c.dlChain = (c.dlChain || Promise.resolve()).then(async function() {
            try {
                var s = await Lt(!1),
                    l = null;
                try {
                    l = await m("sb_info")
                } catch (t) {}
                var u = l && l.ok && l.projectPath ? r.dirname(l.projectPath) : "",
                    d = u ? r.join(u, "01_Video") : r.join(n.homedir(), "Downloads", "SubtitleBuilder_Materials");
                try {
                    e.mkdirSync(d, {
                        recursive: !0
                    })
                } catch (t) {}
                var p = Q(["/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg"]),
                    v = ["--no-playlist", "--no-warnings", "-o", r.join(d, "%(title).50B-%(id)s.%(ext)s"), "--print", "after_move:filepath"];
                v = Bt(p).concat(v);
                var g = It(t.url),
                    w = null,
                    b = [],
                    x = !1;
                g = Dt(g);
                for (var k = 0; k < g.length && null == w; k++) {
                    o("جاري التنزيل… (" + g[k][0] + ")");
                    try {
                        w = await jt(s, g[k][1].concat(v, [Ot(t.url)]))
                    } catch (e) {
                        if (b.push(g[k][0] + ": " + String(e.message).slice(0, 260)), !x && /unsupported url|unable to extract|nsig|HTTP Error 4(0[0-3]|29)|sign in/i.test(String(e.message)) && s === _t) {
                            x = !0, o("تحديث الأداة…");
                            try {
                                await jt(s, ["-U"]), w = await jt(s, g[k][1].concat(v, [Ot(t.url)]))
                            } catch (t) {
                                b.push("بعد التحديث: " + String(t.message).slice(0, 120))
                            }
                        }
                    }
                }
                if (null == w) {
                    var y = "";
                    try {
                        y = await Pt(t.url, d, 1, o)
                    } catch (t) {
                        b.push("بديل: " + String(t.message || t).slice(0, 160))
                    }
                    if (!y) throw new Error(b.join(" | "));
                    w = y
                }
                var E = w.split("\n").map(function(t) {
                    return t.trim()
                }).filter(Boolean).pop();
                if (!E || !e.existsSync(E)) throw new Error("لم يظهر الملف بعد التنزيل.");
                E = await Ft(E, p, o), i[t.url] = E, h("sb.dlmap", JSON.stringify(i));
                var S = await m("sb_importFile", E, u ? "01_Video" : "");
                c.dl[t.url] = !0, o(S && S.ok ? "✓ نُزّل واستُورد" : "✓ نُزّل"), f("نُزّل " + r.basename(E) + (S && S.ok ? " واستُورد للمشروع." : " (في " + d + ")."), "ok")
            } catch (e) {
                o("⬇ أعد المحاولة");
                var C = String(e.message || e).slice(0, 400),
                    hasCookieFile = !!(i("raw-cookies") && i("raw-cookies").value || p("sb.cookies", "")).trim();
                if (/instagram\.com|facebook\.com|fb\.watch/i.test(t.url) && !hasCookieFile && /sign in|login|rate-limit|429|403|private|restricted/i.test(C)) C += " — إنستغرام/فيسبوك غالباً بيحتاج تسجيل دخول لتنزيل هذا الفيديو. جرّب: حمّل إضافة متصفح مثل «Get cookies.txt LOCALLY» وسجّل دخولك لإنستغرام فيها، صدّر ملف cookies.txt، وحدّده من حقل «ملف كوكيز» بإعدادات الخام — بيصير التنزيل مباشر بدون الاعتماد على فتح متصفحك.";
                if (a && a.parentNode) {
                    var M = a.parentNode.querySelector(".dlerr") || document.createElement("div");
                    M.className = "dlerr", M.style.cssText = "flex-basis:100%;font-size:11px;color:#ff8a80;direction:ltr;text-align:left;word-break:break-all", M.textContent = C, M.parentNode || a.parentNode.appendChild(M)
                }
                f("تعذّر تنزيل " + t.url.slice(0, 70) + ": " + C, "e")
            }
        }), c.dlChain
    }
    var $t = {
        video: ["mp4", "mov", "m4v", "mxf", "avi", "mkv", "webm", "mpg", "mpeg", "wmv", "mts"],
        audio: ["wav", "mp3", "aac", "m4a", "aif", "aiff", "flac", "ogg"],
        image: ["png", "jpg", "jpeg", "gif", "tif", "tiff", "psd", "ai", "svg", "heic", "webp", "bmp"],
        sub: ["srt", "vtt", "ass"]
    };
    var qt = null;
    async function Rt() {
        var t = await m("sb_projectFiles");
        if (t.ok)
            if (t.project) {
                var n = r.dirname(t.project),
                    locSel = i("org-loc"),
                    loc = locSel ? locSel.value : p("sb.orgloc", "seq");
                locSel && h("sb.orgloc", loc);
                if ("seq" === loc) try {
                    var seqInfo = await m("sb_info"),
                        seqName = seqInfo && seqInfo.ok && seqInfo.name ? String(seqInfo.name).replace(/[\\/:*?"<>|]/g, "").trim() : "";
                    seqName && (n = r.join(n, seqName))
                } catch (t) {}
                var a = {
                        root: n,
                        items: [],
                        moves: {},
                        missing: 0,
                        keep: 0
                    };
                t.items.forEach(function(t) {
                    var i, o, s, c, l = (i = t.path, o = t.name, s = r.extname(i).slice(1).toLowerCase(), c = r.basename(i), /^(sb_safe_|SubtitleBuilder_)/i.test(c) || /^(sb_safe_|SubtitleBuilder_)/i.test(o || "") ? "15_Generated" : $t.video.indexOf(s) >= 0 ? "01_Video" : $t.audio.indexOf(s) >= 0 ? "02_Audio" : $t.image.indexOf(s) >= 0 ? "03_Images" : $t.sub.indexOf(s) >= 0 ? "06_Subtitles" : "");
                    if (l)
                        if (e.existsSync(t.path)) {
                            var u = r.join(n, l),
                                f = r.resolve(r.dirname(t.path)),
                                m = t.path;
                            if (f !== r.resolve(u)) {
                                if (!a.moves[t.path]) {
                                    for (var d = r.join(u, r.basename(t.path)), h = 1; e.existsSync(d) || Object.keys(a.moves).some(function(t) {
                                            return a.moves[t] === d
                                        });) d = r.join(u, r.basename(t.path, r.extname(t.path)) + "-" + h++ + r.extname(t.path));
                                    a.moves[t.path] = d
                                }
                                m = a.moves[t.path]
                            }(m !== t.path || t.top || t.bin !== l) && a.items.push({
                                id: t.id,
                                name: t.name,
                                newPath: m !== t.path ? m : "",
                                bin: l
                            })
                        } else a.missing++;
                    else a.keep++
                }), qt = a;
                var o = Object.keys(a.moves).length;
                i("org-state").textContent = "المجلد: " + r.basename(n) + " · " + o + " ملف سيُنقل · " + a.items.length + " عنصر سيُرتّب في بريمير" + (a.missing ? " · " + a.missing + " ملف غير موجود (تخطّيته)" : "") + (a.keep ? " · " + a.keep + " بلا نوع معروف (لم ألمسه)" : ""), i("org-go").hidden = !(o || a.items.length), o || a.items.length || f("المشروع مرتّب أصلاً.", "ok")
            } else f("احفظ المشروع أولاً ليكون له مجلد.", "w");
        else f(t.error, "e")
    }
    async function Gt() {
        if (qt) {
            var t = qt;
            qt = null, i("org-go").hidden = !0;
            var n = [],
                a = 0;
            Object.keys(t.moves).forEach(function(i) {
                var o = t.moves[i];
                try {
                    e.mkdirSync(r.dirname(o), {
                        recursive: !0
                    });
                    try {
                        e.renameSync(i, o)
                    } catch (t) {
                        e.copyFileSync(i, o), e.unlinkSync(i)
                    }
                    n.push({
                        from: i,
                        to: o
                    })
                } catch (e) {
                    a++, f("تعذّر نقل " + r.basename(i) + ": " + String(e.message || e).slice(0, 120), "w"), t.items.forEach(function(t) {
                        t.newPath === o && (t.newPath = "")
                    })
                }
            });
            try {
                e.writeFileSync(r.join(t.root, "_organize_log.json"), JSON.stringify(n, null, 1))
            } catch (t) {}
            var o = await m("sb_organize", t.items);
            o.ok ? ((o.failed || []).slice(0, 5).forEach(function(t) {
                f("بريمير: " + t, "w")
            }), i("org-state").textContent = "", f("نقلت " + n.length + " ملفاً" + (a ? " (فشل " + a + ")" : "") + "، أعدت ربط " + o.relinked + " وصنّفت " + o.binned + " عنصراً في حاوياتها، وحفظت المشروع. سجل النقل: _organize_log.json في مجلد المشروع.", "ok")) : f(o.error, "e")
        }
    }

    function zt(t) {
        var e = SubScript.parse(t);
        try {
            Nt(SubScript.links(t))
        } catch (t) {
            f("روابط الخامات: " + t.message, "e")
        }
        c.raw = t, h("sb.raw", t), c.sources = e.sources, c.inserts = e.inserts, c.guests = [];
        var n = i("script-info");
        return e.isScript ? (n.hidden = !1, n.textContent = "تعرّفت على سكربت: " + g(e.text).length + " كلمة تعليق · " + e.sources.length + " مصدر · " + e.inserts.length + " مقابلة (لن تدخل في المطابقة مع الصوت)", e.inserts.forEach(function(t, e) {
            f("مقابلة " + (e + 1) + ": " + (t.name ? "الاسم «" + t.name + "»" + (t.title ? "، الصفة «" + t.title + "»" : " (بدون صفة)") : "لم أجد اسم الضيف — تأكد من سطر الاسم والصفة بعد الاقتباس") + " · " + t.lines.length + " سطر اقتباس.", t.name ? "ok" : "w")
        })) : n.hidden = !0, c.text = e.text, h("sb.text", e.text), e.isScript
    }

    function Ut(t, e) {
        return new Promise(function(n, r) {
            if (e > 6) return r(new Error("تحويلات كثيرة"));
            require("https").get(t, {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept-Language": "ar,en;q=0.8"
                }
            }, function(r) {
                if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return r.resume(), n(Ut(new URL(r.headers.location, t).href, (e || 0) + 1));
                var a = [];
                r.on("data", function(t) {
                    a.push(t)
                }), r.on("end", function() {
                    n({
                        status: r.statusCode,
                        url: t,
                        body: Buffer.concat(a).toString("utf8")
                    })
                })
            }).on("error", r)
        })
    }

    function Jt(t) {
        if (t === c.raw) return R(), G(), void ct();
        zt(t), c.marks.length && (c.marks = [], h("sb.marks", c.marks), f("تغيّر النص، فأُلغيت التعليمات.", "w")), c.times = null, c.blocks = [], R(), G(), ct(), ut()
    }

    function Vt(t) {
        ! function() {
            c.editHist = c.editHist || [], c.editHist.push(JSON.parse(JSON.stringify({
                text: c.text,
                times: c.times,
                marks: c.marks,
                sources: c.sources,
                inserts: c.inserts
            }))), c.editHist.length > 20 && c.editHist.shift();
            var t = i("edit-undo");
            t && (t.hidden = !1)
        }();
        var e, n, r = g(c.text),
            a = g(t),
            o = r.length,
            s = a.length,
            l = [];
        for (e = 0; e <= o; e++) l.push(new Int32Array(s + 1));
        for (e = o - 1; e >= 0; e--)
            for (n = s - 1; n >= 0; n--) l[e][n] = r[e].t === a[n].t ? l[e + 1][n + 1] + 1 : Math.max(l[e + 1][n], l[e][n + 1]);
        var u = new Array(o),
            m = new Array(s);
        for (e = 0; e < o; e++) u[e] = -1;
        for (n = 0; n < s; n++) m[n] = -1;
        for (e = 0, n = 0; e < o && n < s;) r[e].t === a[n].t ? (u[e] = n, m[n] = e, e++, n++) : l[e + 1][n] >= l[e][n + 1] ? e++ : n++;
        var d = c.times,
            p = null;
        if (d && d.length === o) {
            for (p = new Array(s), n = 0; n < s; n++) m[n] >= 0 && (p[n] = {
                s: d[m[n]].s,
                e: d[m[n]].e
            });
            for (n = 0; n < s;)
                if (p[n]) n++;
                else {
                    for (var v = n; n < s && !p[n];) n++;
                    var w = v > 0 ? p[v - 1].e : n < s ? Math.max(0, p[n].s - .4 * (n - v)) : 0,
                        b = n < s ? p[n].s : w + .4 * (n - v);
                    b < w && (b = w);
                    for (var x = v; x < n; x++) p[x] = {
                        s: w + (b - w) * (x - v) / (n - v),
                        e: w + (b - w) * (x - v + 1) / (n - v)
                    }
                }
        }
        var k = function(t) {
                for (var e = 0; e < o; e++) {
                    if (t + e < o && u[t + e] >= 0) return u[t + e];
                    if (t - e >= 0 && u[t - e] >= 0) return u[t - e]
                }
                return 0
            },
            y = [];
        c.marks.forEach(function(t) {
            var e = -1,
                n = -1;
            if (r.forEach(function(r, a) {
                    r.e > t.start && r.s < t.end && u[a] >= 0 && (e < 0 && (e = u[a]), n = u[a])
                }), !(e < 0)) {
                var i = {
                    start: a[e].s,
                    end: a[n].e,
                    mg: t.mg
                };
                t.edit && (i.edit = t.edit), y.push(i)
            }
        }), (c.sources || []).forEach(function(t) {
            t.w0 = Math.min(s - 1, k(t.w0)), t.w1 = Math.max(t.w0, Math.min(s - 1, k(t.w1)))
        }), (c.inserts || []).forEach(function(t) {
            t.pos = Math.min(s, t.pos <= 0 ? 0 : u[t.pos - 1] >= 0 ? u[t.pos - 1] + 1 : k(t.pos - 1) + 1)
        }), c.text = t, h("sb.text", t), c.marks = y, h("sb.marks", y), p && (c.times = p), c.extrasDone = !1, R(), G(), it(), f("عُدّل النص: " + o + " ← " + s + " كلمة" + (p ? " (بقيت أوقات الكلمات غير المعدّلة)" : "") + ". التعليم بقي على الكلمات الباقية.", "ok")
    }

    function Wt(t) {
        for (var e = 0; e < l.length; e++)
            if ("caption" !== l[e].kind && t.test(l[e].name || "")) return l[e];
        return null
    }

    function Xt() {
        var t = c.text || "",
            e = Wt(/question|سؤال/i);
        if (!e || !t.trim()) return 0;
        for (var n, r = 0, a = /[^.!؟?\n]*[؟?]/g; n = a.exec(t);) {
            var i = n[0],
                o = i.length - i.replace(/^\s+/, "").length,
                s = n.index + o,
                l = n.index + i.length;
            i.trim().split(/\s+/).length < 2 || (c.marks.some(function(t) {
                return t.end > s && t.start < l
            }) || (c.marks.push({
                start: s,
                end: l,
                mg: e.id
            }), r++))
        }
        if (r) {
            h("sb.marks", c.marks);
            try {
                R(), G()
            } catch (t) {}
            f("موقرت السؤال: أضفته تلقائياً لـ " + r + " جملة تنتهي بعلامة استفهام.", "ok")
        }
        return r
    }

    function Yt() {
        var t = c.text || "";
        if (!t.trim()) return 0;
        var e = null;
        l.forEach(function(t) {
            e || !C(t) || /word by word/i.test(t.name) || (e = t)
        });
        var n = Wt(/text\s*strap/i),
            r = Wt(/text\s*line/i),
            h2 = Wt(/highlight\s*0?2\b/i),
            a = h2 || Wt(/highlight\s*0?1\s*up/i) || e,
            i = h2 || Wt(/highlight\s*0?6/i) || a,
            num = Wt(/aj[_\s-]*number\s*0?2\b/i) || Wt(/aj[_\s-]*number/i) || a,
            o = n || r || a,
            s = r || n || a;
        if (!o) return f("لا توجد موقرتات في المكتبة؛ أضف أو امسح مجلد القوالب أولاً.", "w"), 0;
        for (var u = g(t), m = u.length, d = [], p = u.map(function(e, n) {
                return 0 === n || "\n" === t.charAt(e.s - 1) || /\n\s*$/.test(t.slice(Math.max(0, e.s - 3), e.s))
            }), v = function(t) {
                return t + 1 >= m || p[t + 1]
            }, w = function(t, e, n) {
                return !(!n || e < t || t < 0 || e >= m || ! function(t, e) {
                    var n = u[t].s,
                        r = u[e].e;
                    return !c.marks.some(function(t) {
                        return t.end > n && t.start < r
                    }) && !d.some(function(n) {
                        return !(n.w1 + 0 < t - 5 || n.w0 > e + 5)
                    })
                }(t, e)) && (d.push({
                    w0: t,
                    w1: e,
                    m: n
                }), !0)
            }, b = 0, x = 0; b < m && x < 6;) {
            for (x++, b++; b < m && !p[b];) x++, b++;
            if (x >= 12) break
        }
        w(0, Math.min(b - 1, 11), o);
        for (var k, y = /["«“]([^"»”]{6,90})["»”]/g; k = y.exec(t);) {
            var E = k.index + 1,
                S = k.index + k[0].length - 1,
                M = -1,
                N = -1;
            u.forEach(function(t, e) {
                t.e > E && t.s < S && (M < 0 && (M = e), N = e)
            }), M >= 0 && N - M <= 8 && w(M, N, i)
        }
        for (var _ = 0; _ < m; _++)
            if (p[_]) {
                for (var A = _; A < m - 1 && !v(A);) A++;
                var L = u.slice(_, A + 1),
                    j = L.filter(function(t, e) {
                        return e > 0 && /^و[\u0600-\u06FF]{3,}$/.test(t.t)
                    }).length;
                L.length <= 6 && j >= 2 && w(_, A, s)
            } for (var T = 0; T < m; T++) {
            var I = u[T].t.replace(/^[^\d٠-٩]+|[^\d٠-٩%]+$/g, "");
            if (/^[\d٠-٩][\d٠-٩,.]*%?$/.test(I)) {
                for (var O = T; O < m - 1 && O - T < 2 && !v(O);) O++;
                var yrStart = T,
                    asciiNum = I.replace(/[٠-٩]/g, function(ch) {
                        return "٠١٢٣٤٥٦٧٨٩".indexOf(ch)
                    });
                !/%$/.test(I) && /^(1[5-9]\d{2}|20\d{2}|21\d{2})$/.test(asciiNum) && T > 0 && !p[T] && /^(عام|سنة|سنه|لعام|لسنة)$/.test(u[T - 1].t.replace(/[ً-ْـ]/g, "")) && (yrStart = T - 1);
                w(yrStart, O, num)
            }
        }
        d.sort(function(t, e) {
            return t.w0 - e.w0
        });
        var P = d.length ? d[0].w1 : -1;
        for (T = 0; T < m; T++) {
            if (d.some(function(t) {
                    return T >= t.w0 && T <= t.w1
                })) P = Math.max(P, T);
            else if (T - P >= 22 && p[T]) {
                for (var D = T; D < m - 1 && !v(D);) D++;
                if (D - T + 1 < 5 && D + 1 < m)
                    for (D++; D < m - 1 && !v(D);) D++;
                D - T + 1 > 10 && (D = T + 9), w(T, D, D - T + 1 > 5 ? o : s) && (P = D, T = D)
            }
        }
        return d.sort(function(t, e) {
            return t.w0 - e.w0
        }), d.forEach(function(t) {
            c.marks.push({
                start: u[t.w0].s,
                end: u[t.w1].e,
                mg: t.m.id
            })
        }), h("sb.marks", c.marks), R(), G(), it(), d.length
    }
    i("org-loc") && (i("org-loc").value = p("sb.orgloc", "seq")), i("org-scan").addEventListener("click", function() {
        yt(Rt)
    }), i("org-go").addEventListener("click", function() {
        yt(Gt)
    }), i("gdoc-go") && i("gdoc-go").addEventListener("click", function() {
        !async function() {
            var t = (i("gdoc-url").value || "").trim(),
                e = SubGDoc.docId(t);
            if (e) {
                var n = i("gdoc-state");
                n.textContent = "جاري الجلب…";
                try {
                    var r = await Ut("https://docs.google.com/document/d/" + e + "/export?format=html", 0);
                    if (200 !== r.status || /accounts\.google\.com|ServiceLogin|signin/i.test(r.url + r.body.slice(0, 3e3))) throw new Error("المستند خاص. افتح المشاركة واجعله «أي شخص لديه الرابط يمكنه العرض» ثم أعد المحاولة.");
                    var a = SubGDoc.toText(r.body);
                    if (!a) throw new Error("ما وجدت جدولاً في المستند. الصق النص يدوياً.");
                    i("text").value = a, Jt(a), n.textContent = "تم الجلب ✓";
                    try {
                        var o = SubGDoc.anchors(r.body),
                            s = SubScript.links(a);
                        if (f("روابط المستند: " + o.length + " رابط موجود في المستند · " + s.length + " ظهرت في قائمة الخامات.", s.length ? "ok" : "w"), !s.length && o.length) {
                            var c = /(^|\.)(facebook\.com|fb\.watch|fb\.com|instagram\.com|twitter\.com|x\.com|t\.co|tiktok\.com|vm\.tiktok\.com)$/i,
                                l = {};
                            Nt(o.map(function(t) {
                                var e = t.replace(/^https?:\/\//i, "").split(/[\/?#]/)[0].replace(/^www\./, ""),
                                    n = !!l[t];
                                return l[t] = 1, {
                                    url: t,
                                    host: e,
                                    ctx: "",
                                    tcs: [],
                                    dup: n,
                                    social: c.test(e),
                                    interview: !1
                                }
                            }))
                        }
                    } catch (t) {
                        f("روابط المستند: " + t.message, "w")
                    }
                    f("جلبت السكربت من الرابط وفرزته حسب أعمدة الجدول.", "ok")
                } catch (t) {
                    n.textContent = "", f("تعذّر جلب السكربت: " + String(t.message || t).slice(0, 200), "w")
                }
            } else f("الصق رابط مستند Google Docs (فيه /document/d/…).", "w")
        }()
    }), i("text").addEventListener("input", function() {
        Jt(i("text").value)
    }), i("align").onclick = rt, i("engine-install").onclick = function() {
        yt(tt)
    }, i("split").onclick = function() {
        it()
    }, ["o-chars", "o-lines", "o-maxw", "o-pause", "o-capall"].forEach(function(t) {
        i(t).addEventListener("change", it)
    }), i("o-sync").addEventListener("change", function() {
        var t = d("o-sync", 0) / 1e3 - (c.syncApplied || 0);
        c.times && c.times.length && t && (c.times = c.times.map(function(e) {
            return {
                s: e.s + t,
                e: e.e + t
            }
        }), c.syncApplied = d("o-sync", 0) / 1e3, it(), wt())
    }), i("o-gran").addEventListener("change", function() {
        i("o-maxw").value = i("o-gran").value, it(), wt()
    }), i("read").onclick = async function() {
            if (c.text.trim()) {
                var t = SubSplit.toBlocks(c.text, {
                        maxChars: Math.max(10, Math.round(d("o-chars", 34))),
                        maxLines: 1,
                        minChars: 12
                    }).map(function(t) {
                        return {
                            wc: t.split(/\s+/).filter(Boolean).length,
                            start: null
                        }
                    }),
                    e = await m("sb_markers");
                if (e.ok) {
                    var n = t.length,
                        r = e.times.length;
                    if (r) {
                        t.forEach(function(t, n) {
                            t.start = n < r ? e.times[n] : null
                        });
                        var a = [];
                        t.forEach(function(e, r) {
                            for (var i = e.start, o = r + 1 < n && null != t[r + 1].start ? t[r + 1].start : null == i ? null : i + 3, s = 0; s < e.wc; s++) a.push(null == i ? null : {
                                s: i + (o - i) * s / e.wc,
                                e: i + (o - i) * (s + 1) / e.wc
                            })
                        }), a.every(Boolean) ? (c.times = a, f(r === n ? "طابقت " + r + " ماركر مع " + n + " سبتايتل." : r + " ماركر لـ " + n + " سبتايتل؛ استُخدمت الأولى.", r === n ? "ok" : "w"), it()) : f("عدد الماركرات (" + r + ") أقل من عدد السبتايتلات (" + n + ").", "w")
                    } else f("ما في ماركرات على السيكونس. ضع ماركر (M) عند بداية كل سبتايتل (يوجد " + n + " سبتايتل).", "w")
                } else f(e.error, "e")
            } else f("الصق النص أولاً.", "e")
        }, i("build").onclick = function() {
            yt(function() {
                return dt(!1)
            })
        },
        function() {
            var t = i("edit-text"),
                e = i("edit-box"),
                n = i("edit-ok"),
                r = i("edit-cancel");
            if (t && e) {
                var a = i("edit-wrap"),
                    o = i("view").parentNode,
                    s = i("edit-undo"),
                    l = i("edit-orig");
                s && s.addEventListener("click", function() {
                    var t, e = c.editHist || [];
                    e.length ? (t = e.pop(), c.text = t.text, h("sb.text", t.text), c.times = t.times, c.marks = t.marks, h("sb.marks", t.marks), c.sources = t.sources, c.inserts = t.inserts, c.extrasDone = !1, c.blocks = [], R(), G(), it(), ct(), ut(), e.length || (s.hidden = !0), f("تراجعت عن آخر تعديل في النص.", "ok")) : s.hidden = !0
                }), l && l.addEventListener("click", function() {
                    var t = SubScript.parse(c.raw || ""),
                        e = t.isScript ? t.text : String(c.raw || "");
                    e.trim() ? (Vt(e), t.isScript && (c.sources = t.sources, c.inserts = t.inserts), c.extrasDone = !1, it(), ut(), f("رجّعت النص الأصلي من السكربت (التعليمات بقيت على الكلمات المطابقة).", "ok")) : f("لا يوجد نص أصلي محفوظ.", "w")
                }), t.addEventListener("click", function() {
                    e.value = c.text, a.hidden = !1, o.hidden = !0, t.hidden = !0, e.focus(), e.setSelectionRange(0, 0), e.scrollTop = 0
                }), r.addEventListener("click", function() {
                    a.hidden = !0, o.hidden = !1, t.hidden = !1
                }), n.addEventListener("click", function() {
                    var n = e.value.replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").trim();
                    if (n && n !== c.text) try {
                        Vt(n)
                    } catch (t) {
                        f("تعذّر تطبيق التعديل: " + t.message, "e")
                    }
                    a.hidden = !0, o.hidden = !1, t.hidden = !1
                })
            }
        }(), i("auto-marks").onclick = function() {
            if (c.text.trim()) {
                var t = Yt();
                f(t ? "أضفت " + t + " تعليماً تلقائياً (يمكنك تعديلها أو حذفها من القائمة)." : "لم أجد ما أضيفه (التعليمات الحالية تغطي النص).", t ? "ok" : "w")
            } else f("الصق النص أولاً.", "w")
        }, i("magic").onclick = async function() {
            if (!c.busy && ((!c.times || i("o-novo") && i("o-novo").checked) && await rt(), c.times)) {
                if (!lt().length) {
                    var t = Yt();
                    f("تحليل النص: " + t + " موقرت أضيفت تلقائياً.", t ? "ok" : "w")
                }
                c.extrasDone = !1, yt(async function() {
                    await dt(!1) && (lt().length || c.sources.length || c.guests.length) && await ht()
                })
            }
        }, i("full").onclick = async function() {
            c.busy || ((!c.times || i("o-novo") && i("o-novo").checked) && await rt(), c.extrasDone = !1, c.times && yt(async function() {
                if (await dt(!0)) {
                    var t = await m("sb_info");
                    t.ok && (c.sources.length || c.guests.length) && await kt(t, c.capTrack || 0)
                }
            }))
        }, i("place").onclick = function() {
            yt(async function() {
                try {
                    Xt()
                } catch (t) {}
                await ht() && c.fullBuilt && lt().length && (f("جاري إنشاء كابشن جديد بدون كلمات الموقرتات…"), await dt(!1, "main") && f("احذف تراك الكابشن القديم «التعليق» (الكامل) من التايم لاين، وأبقِ «التعليق بدون الموقرت» وتراك المقابلات. بريمير لا يسمح للإضافات بحذف تراكات الكابشن.", "w"))
            })
        }, i("all").onclick = function() {
            yt(async function() {
                await dt(!1) && (lt().length || c.sources.length || c.guests.length) && await ht()
            })
        }, function() {
            // تحكّم بطول موقرت محدد على التايم لاين (بديل عن سحب الحافة لما بريمير يرفضها لموقرت معيّن)
            var rb = i("rsz-read"),
                ri = i("rsz-info"),
                rd = i("rsz-dur"),
                rfs = i("rsz-fromstart"),
                rmi = i("rsz-minus"),
                rpl = i("rsz-plus"),
                rap = i("rsz-apply");
            if (rb && rap) {
                rb.onclick = async function() {
                    var t = await m("sb_selectedClipInfo");
                    t.ok ? t.found ? (ri.textContent = t.name + " — المدة الحالية: " + t.dur.toFixed(2) + "ث", rd.value = t.dur.toFixed(2), rap.disabled = !1) : (ri.textContent = "ما في كليب محدد بالتايم لاين. اضغط عليه مرة بالماوس.", rap.disabled = !0) : (ri.textContent = t.error, rap.disabled = !0)
                }, rmi.onclick = function() {
                    rd.value = Math.max(.1, (parseFloat(rd.value) || 0) - .5).toFixed(2)
                }, rpl.onclick = function() {
                    rd.value = ((parseFloat(rd.value) || 0) + .5).toFixed(2)
                }, rap.onclick = async function() {
                    var t = parseFloat(rd.value);
                    if (t && t > 0) {
                        var e = await m("sb_resizeSelected", t, rfs.checked ? "start" : "end");
                        e.ok ? (ri.textContent = e.name + " — المدة الآن: " + e.dur.toFixed(2) + "ث", f("عدّلت مدة «" + e.name + "» إلى " + e.dur.toFixed(2) + " ثانية.", "ok")) : f(e.error, "e")
                    } else f("أدخل مدة صحيحة بالثواني.", "w")
                }
            }
        }(), i("setup-copy").onclick = function() {
            var t = i("setup-cmd").textContent;
            try {
                navigator.clipboard.writeText(t), f("تم نسخ الأوامر.", "ok")
            } catch (t) {
                f("انسخ الأوامر يدوياً.", "w")
            }
        };
    try {
        l = JSON.parse(p("sb.lib", "[]"))
    } catch (t) {
        l = []
    }
    var Kt = !1;
    l.forEach(function(t, n) {
        t.id || (t.id = "m" + Date.now() + "_" + n, Kt = !0), t.color || (t.color = o[n % o.length], Kt = !0), t.maxChars || (t.maxChars = 25, Kt = !0), null == t.colorIdx && (t.colorIdx = 0, Kt = !0), t.menus = (t.menus || []).map(function(t) {
            return null == t.numeric && (t.numeric = t.options.length > 0 && t.options.every(function(t) {
                return /^\d+$/.test(t)
            }), Kt = !0), t
        }), !t.thumb && t.file && e.existsSync(t.file) && k(t.file, "thumb.png", !0).then(function(e) {
            t.thumb = "data:image/png;base64," + e.toString("base64"), E(), S()
        }, function() {})
    }), Kt && E();
    var Zt = p("sb.raw", "");
    /^\s*[\[\{]/.test(Zt) && (Zt = "", h("sb.raw", ""));
    Zt = Zt || p("sb.text", "");
    if (Zt.trim()) try {
        var Qt_hist = JSON.parse(p("sb.history", "[]")) || [];
        Qt_hist.unshift({
            ts: Date.now(),
            mode: p("sb.mode", "vg"),
            label: Zt,
            raw: Zt,
            text: Zt,
            marks: JSON.parse(p("sb.marks", "[]") || "[]"),
            audio: "",
            settings: {}
        }), h("sb.history", JSON.stringify(Qt_hist.slice(0, 20)))
    } catch (t) {}
    h("sb.raw", ""), h("sb.text", "");
    try {
        c.marks = JSON.parse(p("sb.marks", "[]"))
    } catch (t) {
        c.marks = []
    }
    $();
    try {
        i("o-capcolor").value = p("sb.capcolor", "split") || "split"
    } catch (t) {}
    i("o-capcolor").onchange = function() {
            h("sb.capcolor", i("o-capcolor").value)
        },
        function() {
            // يحفظ خيار "موقرت/كابشن عادي" بدل ما يرجع يتصفّر كل ما يُعاد فتح اللوحة
            var cb = i("o-capasmg");
            if (cb) {
                cb.checked = "1" === p("sb.capasmg", "0"), cb.addEventListener("change", function() {
                    h("sb.capasmg", cb.checked ? "1" : "0")
                })
            }
            var cz = i("o-place-zero");
            if (cz) {
                cz.checked = "0" !== p("sb.placezero", "1"), cz.addEventListener("change", function() {
                    h("sb.placezero", cz.checked ? "1" : "0")
                })
            }
            // زرار لون الإضافة (برتقالي/أزرق/أخضر) — يبدّل متغيّرات الـCSS مباشرة ويحفظ الاختيار
            var THEMES = {
                orange: {
                    a: "#e56024",
                    o: "#140a04"
                },
                blue: {
                    a: "#4f8ef7",
                    o: "#06142b"
                },
                green: {
                    a: "#2fbf7a",
                    o: "#06160d"
                }
            };
            var applyTheme = function(name) {
                var th = THEMES[name] || THEMES.orange,
                    rs = document.documentElement.style;
                rs.setProperty("--accent", th.a), rs.setProperty("--accent2", th.a), rs.setProperty("--on-accent", th.o);
                var btns = document.querySelectorAll("#theme-row .swatch");
                btns.forEach(function(b) {
                    b.classList.toggle("on", b.getAttribute("data-theme") === name)
                })
            };
            applyTheme(p("sb.theme", "orange"));
            var themeRow = document.getElementById("theme-row");
            themeRow && themeRow.addEventListener("click", function(e) {
                var b = e.target.closest ? e.target.closest(".swatch") : null;
                if (b) {
                    var name = b.getAttribute("data-theme");
                    applyTheme(name), h("sb.theme", name)
                }
            })
        }(), B(i("o-capcolor")), S(), R(), G(), ct(),
        function() {
            var t = i("o-hasguest"),
                g = i("guest-fields");
            if (t && g) {
                var u = function() {
                    g.hidden = !t.checked
                };
                u(), t.addEventListener("change", u)
            }
        }(),
        function() {
            var t = i("safe-on");
            t && (t.onchange = O);
            var e = i("safe-frame");
            e && (["sf-t", "sf-b", "sf-r", "sf-l"].forEach(function(t) {
                i(t).value = p("sb." + t, i(t).value), i(t).addEventListener("change", function() {
                    h("sb." + t, i(t).value), j(), i("safe-on") && i("safe-on").checked && O()
                })
            }), e.addEventListener("click", function(t) {
                var n = w(i("safe-mg").value);
                if (n) {
                    var r = e.getBoundingClientRect();
                    n.ref = {
                        x: Math.min(1, Math.max(0, (t.clientX - r.left) / r.width)),
                        y: Math.min(1, Math.max(0, (t.clientY - r.top) / r.height))
                    }, E(), j()
                } else f("أضف موقرت هايلايت أولاً (اسمه يحتوي Highlight).", "w")
            }), T(), j())
        }(), et(), q(!0);
    var te = ["vg", "reel", "raw", "quote"];

    function ee(t) {
        te.indexOf(t) < 0 && (t = "vg");
        var prevMode = p("sb.mode", "vg");
        prevMode !== t && i("log") && (i("log").innerHTML = "");
        te.forEach(function(e) {
            var n = i("view-" + e);
            n && (n.hidden = e !== t)
        });
        var e = i("modes");
        if (e && e.querySelectorAll && Array.prototype.forEach.call(e.querySelectorAll("button"), function(e) {
                e.classList.toggle("on", e.getAttribute("data-mode") === t)
            }), h("sb.mode", t), "raw" === t) try {
            Ne()
        } catch (t) {}
        if ("quote" === t) try {
            sbQuoteTplPopulate()
        } catch (t) {}
    }
    i("modes") || setTimeout(function() {
        try {
            Ne()
        } catch (t) {}
    }, 300), i("modes") && i("modes").querySelectorAll && (Array.prototype.forEach.call(i("modes").querySelectorAll("button"), function(t) {
        t.onclick = function() {
            ee(t.getAttribute("data-mode"))
        }
    }), ee(p("sb.mode", "vg")), i("raw-tpl-r") && (i("raw-tpl-r").onclick = function() {
        Ne()
    }));
    var ne = {
        clips: []
    };
    try {
        ne.clips = (JSON.parse(p("sb.rawclips", "[]")) || []).slice(0, 1)
    } catch (t) {
        ne.clips = []
    }

    function re() {
        h("sb.rawclips", JSON.stringify(ne.clips.map(function(t) {
            return {
                title: t.title,
                subtitle: t.subtitle,
                url: t.url,
                from: t.from,
                to: t.to,
                file: t.file || "",
                source: t.source || "",
                location: t.location || ""
            }
        })))
    }

    function ae(t) {
        return String(t || "").replace(/[.,،؛;:]/g, "").replace(/\s+/g, " ").trim()
    }
    // for title/subtitle text only: collapse whitespace and trim stray punctuation from the EDGES only —
    // unlike ae(), this keeps punctuation written on purpose inside the sentence (e.g. "لم تنفجر.. مسيرة")
    // instead of stripping every "." "," "،" "؛" ";" ":" wherever it appears.
    function teClean(t) {
        return String(t || "").replace(/\s+/g, " ").replace(/^[.,،؛;:\s]+|[.,،؛;:\s]+$/g, "").trim()
    }

    function ie(t) {
        return null == t || "" === t ? "" : window.SubRaw ? SubRaw.fmt(t) : String(t)
    }

    function oe(t) {
        return null == t ? null : (t = String(t).trim()) ? window.SubRaw ? SubRaw.toSec(t) : parseFloat(t) : null
    }
    var se = [
        ["raw-mg", "sb.rawmg", /raw\s*title\s*1/i],
        ["raw-mg2", "sb.rawmg2", /title\s*2\s*raw/i],
        ["raw-msrc", "sb.rawmsrc", /(^|[\s_-])source$|مصدر/i],
        ["raw-mloc", "sb.rawmloc", /location\s*date/i],
        ["raw-mdate", "sb.rawmdate", /info\s*date/i]
    ];

    function ce() {
        se.forEach(function(t) {
            var e = i(t[0]);
            if (e) {
                var n = l.map(function(t) {
                        return t.id + t.name
                    }).join("|"),
                    r = p(t[1], "");
                if (e.getAttribute("data-sig") !== n) {
                    e.setAttribute("data-sig", n), e.innerHTML = "";
                    var a = document.createElement("option");
                    a.value = "", a.textContent = "— بدون —", e.appendChild(a), l.forEach(function(t) {
                        var n = document.createElement("option");
                        n.value = t.id, n.textContent = t.name, e.appendChild(n)
                    }), e.onchange = function() {
                        h(t[1], e.value)
                    }
                }
                if (e.value = r, e.value !== r && (e.value = ""), !e.value) {
                    var o = l.filter(function(e) {
                        return t[2].test(String(e.name).trim())
                    })[0];
                    o && (e.value = o.id)
                }
                try {
                    B(e)
                } catch (t) {}
            }
        })
    }

    function le(t) {
        var e = /t\.me\/(?:s\/)?([A-Za-z0-9_]+)/i.exec(String(t || ""));
        return e ? e[1] : ""
    }

    function ue() {
        var t = new Date;
        return t.getDate() + " " + ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"][t.getMonth()] + " " + t.getFullYear()
    }
    var fe = /^(في|من|إلى|الى|على|عن|مع|بين|حتى|لدى|عند|ب|ل|ك|و|أن|ان|أنه|لـ)$/;

    function me(t, e) {
        if (t = String(t || ""), /\n/.test(t)) {
            var n = t.split(/\n/).map(teClean).filter(Boolean);
            return n.length > 3 && (n = [n[0], n[1], n.slice(2).join(" ")]), n
        }
        return function(t) {
            if (!t || t.length < 2) return t;
            if (i("raw-kash") && !i("raw-kash").checked) return t;
            var e = function(t) {
                    return String(t).replace(/ـ/g, "").length + .7 * (String(t).split("ـ").length - 1)
                },
                n = Math.max.apply(null, t.map(e));
            return t.map(function(t) {
                var r = n - e(t);
                if (r < 3) return t;
                var a = Math.min(3, Math.round(r / 1.6));
                if (a < 1) return t;
                for (var i = t.split(" "), o = i.map(function(t, e) {
                        return e
                    }).sort(function(t, e) {
                        return i[e].length - i[t].length
                    }), s = 0, c = 0; c < o.length && s < a; c++) {
                    var l = i[o[c]];
                    if (!(l.length < 4 || /ـ/.test(l)))
                        for (var u = 1; u < l.length - 2; u++) {
                            var f = l.charAt(u),
                                m = l.charAt(u + 1);
                            if (!("بتثجحخسشصضطظعغفقكلمنهيئ".indexOf(f) < 0) && /[ء-ي]/.test(m) && ("ل" !== f || "ا" !== m)) {
                                i[o[c]] = l.slice(0, u + 1) + "ـ" + l.slice(u + 1), s++;
                                break
                            }
                        }
                }
                return i.join(" ")
            })
        }(function(t, e, n) {
            var r = teClean(t);
            if (!r) return [];
            var a = r.split(" "),
                i = Math.min(e, Math.max(1, Math.ceil(r.length / n)));
            if (i <= 1 || a.length < 2) return [r];
            i = Math.min(i, a.length);
            var o = null,
                s = 1 / 0;
            if (function t(e, n, r) {
                    if (1 === n) {
                        var i = (r = r.concat([a.slice(e)])).map(function(t) {
                                return t.join(" ").length
                            }),
                            c = Math.max.apply(null, i),
                            l = Math.min.apply(null, i);
                        fe.test(r[r.length - 1][r[r.length - 1].length - 1]);
                        var u = 100 * c + (c - l);
                        u < s && (s = u, o = r)
                    } else
                        for (var f = e + 1; f <= a.length - (n - 1); f++) fe.test(a[f - 1]) || t(f, n - 1, r.concat([a.slice(e, f)]))
                }(0, i, []), !o) {
                var c = Math.ceil(a.length / i);
                o = [];
                for (var l = 0; l < a.length; l += c) o.push(a.slice(l, l + c))
            }
            return o.map(function(t) {
                return t.join(" ")
            })
        }(t, 3, e))
    }

    function de(t, e, n) {
        return t.texts.map(function(t) {
            var r = String(t.label || ""),
                a = /(\d)\s*$/.exec(r);
            return /سطر|line/i.test(r) && a ? e[parseInt(a[1], 10) - 1] || "" : null == n ? "" : n
        })
    }
    var he = [
        ["facebook", /facebook\.com|fb\.watch|fb\.com/i, /face|فيس/i],
        ["x", /(^|\/\/|\.)(x|twitter)\.com|t\.co\//i, /^x$|twitter|تويتر|[اإ]كس/i],
        ["telegram", /t\.me|telegram\.me/i, /telegram|تيليغرام|تلغرام|تليجرام/i],
        ["instagram", /instagram\.com/i, /insta|[اإ]نستغرام|[اإ]نستجرام/i],
        ["youtube", /youtube\.com|youtu\.be/i, /youtube|يوتيوب/i],
        ["tiktok", /tiktok\.com/i, /tik|تيك/i]
    ];

    function pe(t) {
        for (var e = 0; e < he.length; e++)
            if (he[e][1].test(String(t || ""))) return he[e];
        return null
    }

    function ve(t) {
        var e = pe(t);
        if (!e) return -1;
        var n = l.filter(function(t) {
            return /(^|[\s_-])source$|مصدر/i.test(String(t.name).trim())
        })[0];
        if (!n) return ve._warnedName || (ve._warnedName = 1, f("ما لقيت موقرت المصدر ضمن «قوالب السكربت» (اسمه المتوقع ينتهي بـ source أو يحتوي «مصدر») لأغيّر أيقونته تلقائياً حسب الرابط.", "w")), -1;
        var r = (n.menus || []).filter(function(t) {
            return /ايقون|أيقون|icon/i.test(String(t.label || ""))
        })[0] || (n.menus || [])[0];
        if (!r) return -1;
        for (var a = 0; a < r.options.length; a++)
            if (e[2].test(String(r.options[a]))) return a;
        return ve._warned || (ve._warned = 1, f("أيقونات المصدر في الموقرت: " + r.options.map(function(t, e) {
            return e + "=" + t
        }).join(" ، ") + " — لم أجد اسم المنصة بينها.", "w")), -1
    }

    function ge() {
        var t = l.filter(function(t) {
            return /title\s*2\s*raw/i.test(String(t.name))
        })[0];
        if (!t) return -1;
        var e = (t.menus || []).filter(function(t) {
            return /^\s*اللون|colou?r/i.test(String(t.label || ""))
        })[0];
        if (!e) return -1;
        for (var n = 0; n < e.options.length; n++)
            if (/[اأآ]زرق|blue/i.test(e.options[n])) return n;
        return -1
    }

    function we(t, a) {
        var i = String(t).trim().toLowerCase() + ".mogrt",
            o = [],
            s = {};
        if (/\.mogrt$/i.test(a || "") && e.existsSync(a)) return a;
        for (var c = a ? r.dirname(a) : "", l = 0; l < 4 && c && "/" !== c; l++) o.push(c), c = r.dirname(c);
        var u = n.homedir();
        o.push(r.join(u, "Library/Application Support/Adobe/Common/Motion Graphics Templates"), r.join(u, "Library/Application Support/Adobe/Common/Essential Graphics"));
        var f = "";
        return o.forEach(function(t) {
            f || function t(n, a) {
                if (!(f || a > 3 || s["w" + n])) {
                    s["w" + n] = 1;
                    var o = [];
                    try {
                        o = e.readdirSync(n)
                    } catch (t) {
                        return
                    }
                    for (var c = 0; c < o.length && !f; c++)
                        if (String(o[c]).toLowerCase() === i) return void(f = r.join(n, o[c]));
                    for (c = 0; c < o.length && !f; c++) {
                        var l = r.join(n, o[c]),
                            u = null;
                        try {
                            u = e.statSync(l)
                        } catch (t) {}
                        u && u.isDirectory() && !/^\./.test(o[c]) && t(l, a + 1)
                    }
                }
            }(t, 0)
        }), f
    }
    var be = {};
    async function xe(t) {
        var e = {
                blue: -1,
                icon: -1
            },
            n = null;
        try {
            n = await m("sb_rawTemplatePaths")
        } catch (t) {}
        if (!n || !n.ok) return e;
        for (var r = 0; r < n.items.length; r++) {
            var a = n.items[r];
            if ("title2" === a.key || "src" === a.key) try {
                var i = we(a.name, a.path);
                if (!i) {
                    be["warn" + a.key] || (be["warn" + a.key] = 1, f("لم أجد ملف " + a.name + ".mogrt قرب " + (a.path || "المسار") + " — أضفه لمكتبة الإضافة (زر + في الموقرتات) أو اكتب رقم اللون في الإعدادات.", "w"));
                    continue
                }
                var o = be[i] || (be[i] = await F(i, !1));
                if ("title2" === a.key) {
                    var s = (o.menus || []).filter(function(t) {
                        return /^\s*اللون|colou?r/i.test(String(t.label || ""))
                    })[0];
                    if (s) {
                        for (var c = 0; c < s.options.length; c++)
                            if (/[اأآ]زرق|blue/i.test(s.options[c])) {
                                e.blue = c;
                                break
                            } e.blue < 0 && !be.cw && (be.cw = 1, f("خيارات لون العنوان الفرعي: " + s.options.map(function(t, e) {
                            return e + "=" + t
                        }).join(" ، "), "w"))
                    }
                } else {
                    var l = pe(t),
                        u = (o.menus || []).filter(function(t) {
                            return /ايقون|أيقون|icon/i.test(String(t.label || ""))
                        })[0] || (o.menus || [])[0];
                    if (l && u) {
                        for (var d = 0; d < u.options.length; d++)
                            if (l[2].test(String(u.options[d]))) {
                                e.icon = d;
                                break
                            } e.icon < 0 && !be.iw && (be.iw = 1, f("خيارات أيقونة المصدر: " + u.options.map(function(t, e) {
                            return e + "=" + t
                        }).join(" ، "), "w"))
                    }
                }
            } catch (t) {
                f("قراءة قالب " + a.name + ": " + String(t.message || t).slice(0, 120), "w")
            }
        }
        return e
    }

    function ke() {
        var list = i("raw-list");
        if (!list || !list.querySelector) return;
        list.innerHTML = "";
        // group CONSECUTIVE clips that share the exact same video (title/subtitle/url/file/source/location) —
        // this is how one "فيديو" block with several "mm:ss - mm:ss" ranges comes back from the parser (same
        // clip, several cuts). Render them as ONE card with ONE set of shared fields and a list of times
        // underneath, instead of repeating the whole card once per time range.
        var gkey = function(c) {
            return [c.title || "", c.subtitle || "", c.url || "", c.file || "", c.source || "", c.location || ""].join("\u0001")
        };
        var groups = [];
        ne.clips.forEach(function(c, n) {
            var last = groups[groups.length - 1];
            last && gkey(last.rep) === gkey(c) ? last.idx.push(n) : groups.push({
                rep: c,
                idx: [n]
            })
        });
        groups.forEach(function(grp) {
            var idx = grp.idx,
                e = ne.clips[idx[0]],
                a = document.createElement("div");
            a.className = "rawcard", a.innerHTML = '<div class="rc-h"><b>الفيديو</b><span class="sp"></span><button class="link rc-pick">ملف من الجهاز</button><button class="link rc-del">مسح</button></div><textarea class="rc-t" dir="auto" rows="2" placeholder="العنوان الرئيسي (Enter = سطر جديد بيدك، وإلا يُقسّم تلقائياً)"></textarea><div class="rc-pv pt"></div><textarea class="rc-s" dir="auto" rows="2" placeholder="العنوان الفرعي (Enter = سطر جديد بيدك، وإلا يُقسّم تلقائياً)"></textarea><div class="rc-pv ps"></div><input type="text" class="rc-url" placeholder="رابط الفيديو (فيسبوك، تيليغرام، إنستغرام، X ...)"><div class="rc-r"><input type="text" class="rc-src" dir="auto" placeholder="المصدر (اسم القناة)"><input type="text" class="rc-loc" dir="auto" placeholder="الموقع"></div><div class="rc-times"></div><button class="link rc-rangeadd" type="button">+ إضافة توقيت من نفس الفيديو</button><div class="rc-st"></div>';
            var q = function(t) {
                return a.querySelector(t)
            };
            q(".rc-t").value = e.title || "", q(".rc-s").value = e.subtitle || "", q(".rc-url").value = e.url || "", q(".rc-src").value = e.source || "", q(".rc-loc").value = e.location || "", e.file && (q(".rc-st").textContent = "ملف محلي: " + r.basename(e.file));
            var pv = function() {
                q(".pt").textContent = me(e.title, d("raw-mxt", 22)).join("  ⏎  "), q(".ps").textContent = me(e.subtitle, d("raw-mxs", 20)).join("  ⏎  ")
            };
            // shared fields: edits apply to every range that belongs to this same video
            var setAll = function(field, val) {
                idx.forEach(function(n) {
                    ne.clips[n][field] = val
                }), re()
            };
            q(".rc-t").oninput = function() {
                setAll("title", this.value), pv()
            }, q(".rc-s").oninput = function() {
                setAll("subtitle", this.value), pv()
            }, e._pv = pv, pv(), q(".rc-src").oninput = function() {
                setAll("source", this.value)
            }, q(".rc-loc").oninput = function() {
                setAll("location", this.value)
            }, q(".rc-url").oninput = function() {
                setAll("url", this.value.trim())
            }, q(".rc-del").onclick = function() {
                for (var k = idx.length - 1; k >= 0; k--) ne.clips.splice(idx[k], 1);
                re(), ke()
            }, q(".rc-pick").onclick = function() {
                var t = b(!1, "اختر الفيديو", ["mp4", "mov", "m4v", "mkv", "webm"]);
                t && t[0] && (setAll("file", t[0]), ke())
            }, e._st = q(".rc-st");
            // one row per time range sharing this video
            var timesEl = q(".rc-times");
            idx.forEach(function(n, ri) {
                var c = ne.clips[n],
                    row = document.createElement("div");
                row.className = "rc-r rc-range", row.innerHTML = '<label>من <input type="text" class="rc-f" placeholder="0:00"></label><label>إلى <input type="text" class="rc-to" placeholder="النهاية"></label>' + (idx.length > 1 ? '<button class="link rc-rangedel" type="button">حذف هذا التوقيت</button>' : "");
                var rf = row.querySelector(".rc-f"),
                    rt = row.querySelector(".rc-to");
                rf.value = ie(c.from), rt.value = ie(c.to), rf.onchange = function() {
                    c.from = oe(this.value), this.value = ie(c.from), re()
                }, rt.onchange = function() {
                    c.to = oe(this.value), this.value = ie(c.to), re()
                };
                var delBtn = row.querySelector(".rc-rangedel");
                delBtn && (delBtn.onclick = function() {
                    ne.clips.splice(n, 1), re(), ke()
                }), timesEl.appendChild(row)
            }), q(".rc-rangeadd").onclick = function() {
                var last = idx[idx.length - 1],
                    clone = {};
                for (var k2 in e) "_pv" !== k2 && "_st" !== k2 && (clone[k2] = e[k2]);
                clone.from = null, clone.to = null, ne.clips.splice(last + 1, 0, clone), re(), ke()
            }, list.appendChild(a)
        }), i("raw-n") && (i("raw-n").textContent = ne.clips.length ? "(" + ne.clips.length + ")" : "")
    }

    function ye() {
        var t, e = i("raw-text").value;
        window.SubRaw ? (t = SubRaw.parse(e), ne.clips = t.map(function(t) {
            return {
                title: t.title || "",
                subtitle: t.subtitle || "",
                url: t.url || "",
                from: t.from,
                to: t.to,
                file: "",
                source: t.source || le(t.url) || "",
                location: t.location || ""
            }
        }), re(), ke(), i("raw-state") && (i("raw-state").textContent = ne.clips.length ? "وجدت " + ne.clips.length + " فيديو. راجع البطاقات وعدّلها." : "لم أجد فيديو. أضف بطاقة يدوياً.")) : f("وحدة الخام غير محمّلة.", "e")
    }
    async function Ee() {
        var t = i("raw-state"),
            e = (i("raw-url").value || "").trim(),
            n = window.SubGDoc && SubGDoc.docId ? SubGDoc.docId(e) : "";
        if (!n) return t.textContent = "الرابط غير صالح (يجب أن يحوي /document/d/…).", void f("رابط المستند غير صالح.", "w");
        t.textContent = "أجلب المستند…";
        try {
            var r = await Ut("https://docs.google.com/document/d/" + n + "/export?format=html", 0);
            if (200 !== r.status || /accounts\.google\.com|ServiceLogin|signin/i.test(r.url + r.body.slice(0, 3e3))) throw new Error("المستند خاص. اجعله «أي شخص لديه الرابط يمكنه العرض» ثم أعد المحاولة. (HTTP " + r.status + ")");
            var a = SubGDoc.plain(r.body);
            if (!a || !a.trim()) throw new Error("المستند فارغ أو لم أستطع قراءته.");
            i("raw-text").value = a, ye()
        } catch (e) {
            var o = String(e.message || e).slice(0, 200);
            t.textContent = "تعذّر الجلب: " + o, f("تعذّر جلب سكربت الخام: " + o, "e")
        }
    }

    function Se(t) {
        return c.dlChain = (c.dlChain || Promise.resolve()).then(async function() {
            var a = function(e, n) {
                    t._st && (t._st.textContent = e, t._st.className = "rc-st" + (n ? " " + n : ""))
                },
                o = {};
            try {
                o = JSON.parse(p("sb.dlmap", "{}")) || {}
            } catch (t) {}
            var s = t.from,
                c = t.to,
                l = !(!i("raw-trim") || !i("raw-trim").checked) && null != s && null != c && c > s,
                u = t.url + "#v" + Math.max(1, t.pi || 1) + (l ? "#" + s + "-" + c : "");
            if (o[u] && e.existsSync(o[u])) return a("✓ موجود مسبقاً", "ok"), {
                file: o[u],
                trimmed: l
            };
            var d = Date.now();
            a("أجهّز أداة التنزيل…");
            var v = await Lt(!1),
                g = null;
            try {
                g = await m("sb_info")
            } catch (t) {}
            var w = g && g.ok && g.projectPath ? r.dirname(g.projectPath) : "",
                b = w ? r.join(w, "01_Video") : r.join(n.homedir(), "Downloads", "SubtitleBuilder_Materials");
            t.sub && (b = r.join(b, t.sub));
            try {
                e.mkdirSync(b, {
                    recursive: !0
                })
            } catch (t) {}
            var x = Q(["/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg"]);
            l && !x && (l = !1);
            var k = l ? "-" + Math.round(s) + "s-" + Math.round(c) + "s" : "",
                y = Math.max(1, t.pi || 1),
                E = ["--playlist-items", String(y), "--no-warnings", "-o", r.join(b, "%(title).50B-%(id)s" + (y > 1 ? "-" + y : "") + k + ".%(ext)s"), "--print", "after_move:filepath"];
            E = Bt(x).concat(E), l && (E = ["--download-sections", "*" + s + "-" + c, "--force-keyframes-at-cuts"].concat(E));
            var S = It(t.url),
                C = null,
                M = [],
                N = !1;
            S = Dt(S);
            for (var _ = 0; _ < S.length && null == C; _++) {
                a("جاري التنزيل… (" + S[_][0] + ")");
                try {
                    C = await jt(v, S[_][1].concat(E, [Ot(t.url)]))
                } catch (e) {
                    if (M.push(S[_][0] + ": " + String(e.message).slice(0, 260)), !N && /unsupported url|unable to extract|nsig|HTTP Error 4(0[0-3]|29)|sign in/i.test(String(e.message)) && v === _t) {
                        N = !0, a("تحديث الأداة…");
                        try {
                            await jt(v, ["-U"]), C = await jt(v, S[_][1].concat(E, [Ot(t.url)]))
                        } catch (t) {
                            M.push("بعد التحديث: " + String(t.message).slice(0, 120))
                        }
                    }
                }
            }
            if (null == C) {
                var A = "";
                try {
                    A = await Pt(t.url, b, y, a)
                } catch (t) {
                    M.push("بديل: " + String(t.message || t).slice(0, 160))
                }
                if (!A) {
                    var joined = M.join(" | "),
                        hasCookieFile2 = !!(i("raw-cookies") && i("raw-cookies").value || p("sb.cookies", "")).trim();
                    if (/instagram\.com|facebook\.com|fb\.watch/i.test(t.url) && !hasCookieFile2 && /sign in|login|rate-limit|429|403|private|restricted/i.test(joined)) joined += " — إنستغرام/فيسبوك غالباً بيحتاج تسجيل دخول لتنزيل هذا الفيديو. جرّب إضافة متصفح مثل «Get cookies.txt LOCALLY» لتصدير ملف cookies.txt وحدّده من حقل «ملف كوكيز».";
                    throw new Error(joined)
                }
                C = A, l = !1
            }
            var L = C.split("\n").map(function(t) {
                return t.trim()
            }).filter(Boolean).pop();
            if (!L || !e.existsSync(L)) {
                var j = "",
                    T = 0;
                try {
                    e.readdirSync(b).forEach(function(t) {
                        var n = r.join(b, t),
                            a = e.statSync(n);
                        /\.(mp4|mkv|webm|mov|m4v)$/i.test(t) && a.mtimeMs >= d - 2e3 && a.mtimeMs > T && (T = a.mtimeMs, j = n)
                    })
                } catch (t) {}
                L = j
            }
            if (!L || !e.existsSync(L)) throw new Error("لم يظهر الملف بعد التنزيل. " + String(C).replace(/\s+/g, " ").slice(-160));
            var I = C.split("\n").filter(function(t) {
                return t.trim()
            }).length;
            return I > 1 && f("الرابط أنزل " + I + " ملفات؛ اخترت الأخير. حدّد «رقم الفيديو داخل الرابط» إن أردت غيره.", "w"), L = await Ft(L, x, a), o[u] = L, h("sb.dlmap", JSON.stringify(o)), a("✓ نُزّل", "ok"), {
                file: L,
                trimmed: l,
                bin: w ? "01_Video" : ""
            }
        })
    }
    async function Ce() {
        !ne.clips.length && i("raw-url") && i("raw-url").value.trim() && !i("raw-text").value.trim() ? await Ee() : !ne.clips.length && i("raw-text").value.trim() && ye();
        var t = ne.clips.filter(function(t) {
            return t.url || t.file
        });
        if (t.length) {
            var e = "",
                n = !1,
                r = "";
            if (i("raw-clone") && i("raw-clone").checked && i("raw-tpl") && i("raw-tpl").value) {
                var a = t[0],
                    o = ae(a.title) || le(a.url) || "خام";
                r = o.replace(/[\\\/:*?"<>|]/g, " ").replace(/\s+/g, " ").trim().slice(0, 70);
                var s = await m("sb_cloneSequence", i("raw-tpl").value, o, r);
                if (!s || !s.ok) return void f("تعذّر نسخ سيكونس القالب، لم أغيّر شيئاً: " + (s && s.error || ""), "e");
                r && f(s.bin ? "المجلد في المشروع: " + s.bin : "تعذّر إنشاء/نقل المجلد (" + (s.binErr || "") + "). السيكونس موجود في جذر المشروع.", s.bin ? "ok" : "w"), f("أنشأت سيكونساً جديداً باسم: " + s.name + (s.active ? "" : " (افتحه من لوحة المشروع إن لم يفتح تلقائياً)"), "ok");
                for (var c = !1, u = 0; u < 20 && !c; u++) {
                    var h = await m("sb_activeSeq");
                    if (h && h.ok && h.id === s.id) {
                        c = !0;
                        break
                    }
                    if (3 === u || 10 === u) try {
                        await m("sb_openSequence", s.id)
                    } catch (t) {}
                    await new Promise(function(t) {
                        setTimeout(t, 500)
                    })
                }
                if (!c) return void f("النسخة الجديدة «" + s.name + "» لم تصبح السيكونس النشط. افتحها (نقر مزدوج في لوحة المشروع) ثم اضغط ابنِ مرة ثانية مع إطفاء «انسخ القالب».", "e");
                e = s.id, n = !0
            }
            var p = Math.max(1, Math.round(d("raw-vtrack", 1))),
                v = Math.max(1, Math.round(d("raw-mtrack", 16))),
                g = d("raw-gap", 0),
                w = [],
                b = String(i("raw-pi") && i("raw-pi").value || "1").split(/[,،\s]+/).map(function(t) {
                    return parseInt(t, 10)
                }).filter(function(t) {
                    return t > 0
                });
            b.length || (b = [1]);
            var x = [];
            t.forEach(function(t) {
                t.file ? x.push({
                    c: t,
                    pi: 1
                }) : b.forEach(function(e) {
                    x.push({
                        c: t,
                        pi: e
                    })
                })
            });
            for (var k = 0; k < x.length; k++) {
                var y = x[k].c,
                    E = {
                        url: y.url,
                        from: y.from,
                        to: y.to,
                        _st: y._st,
                        pi: x[k].pi,
                        sub: r
                    };
                try {
                    var S, C = null,
                        M = null,
                        N = "";
                    if (y.file) S = y.file, C = y.from, M = y.to;
                    else {
                        var L = await Se(E);
                        S = L.file, N = r || L.bin || "", L.trimmed || (C = y.from, M = y.to)
                    }
                    r && (N = r), null != M && null != C && M <= C && (M = null), w.push({
                        path: S,
                        bin: N,
                        inSec: C,
                        outSec: M,
                        gap: g,
                        c: y
                    }), y._st && (y._st.textContent = "✓ جاهز", y._st.className = "rc-st ok")
                } catch (t) {
                    var j = String(t.message || t).slice(0, 400);
                    /login required|rate-limit|cookies/i.test(j) && (j = "الموقع يطلب تسجيل دخول: اختر ملف كوكيز (cookies.txt) في الإعدادات أو سجّل الدخول في كروم. — " + j.slice(0, 200)), y._st && (y._st.textContent = j, y._st.className = "rc-st e"), f("تعذّر تنزيل الفيديو " + (k + 1) + ": " + j, "e")
                }
            }
            var T = !w.length;
            T && f("تعذّر تنزيل كل الفيديوهات، سأكمل النصوص والموقع والمصدر على القالب بدون فيديو.", "w"), i("raw-bstate") && (i("raw-bstate").textContent = "أضع الفيديوهات…");
            var I = T ? {
                ok: !0,
                results: []
            } : await m("sb_placeRaw", w.map(function(t) {
                return {
                    path: t.path,
                    bin: t.bin,
                    inSec: t.inSec,
                    outSec: t.outSec,
                    gap: t.gap,
                    fit: !0,
                    scale: d("raw-scale", 0) || 0
                }
            }), p, 0, {
                seqId: e,
                clear: n
            });
            if (I && I.ok) {
                var O = I.results.filter(function(t) {
                    return t.ok
                });
                I.results.forEach(function(t, e) {
                    t.ok || f("الفيديو " + (e + 1) + ": " + (t.error || "لم يوضع") + " — سأكمل النصوص.", "w")
                });
                var P = O.length ? w[I.results.indexOf(O[0])].c : t[0],
                    D = O.length ? O[O.length - 1] : null,
                    B = D ? D.start + D.dur : 0,
                    F = ae(i("raw-date") && i("raw-date").value || "") || ue(),
                    H = me(P.title, d("raw-mxt", 22)),
                    $ = me(P.subtitle, d("raw-mxs", 20)),
                    q = await xe(P.url),
                    R = d("raw-blue", NaN),
                    G = await m("sb_fillRaw", {
                        seqId: e,
                        sw: O.length ? Math.min(Math.max(1, d("raw-sw", 5)), O[0].dur) : Math.max(1, d("raw-sw", 5)),
                        end: B,
                        icon: ve(P.url) >= 0 ? ve(P.url) : q.icon,
                        color2: isFinite(R) ? R : ge() >= 0 ? ge() : q.blue,
                        disableLow: !i("raw-dis-low") || i("raw-dis-low").checked,
                        disableSrc: !(!i("raw-dis-src") || !i("raw-dis-src").checked),
                        title: H,
                        sub: $,
                        loc: ae(P.location),
                        src: ae(P.source) || le(P.url),
                        date: F
                    });
                if (G && G.ok && G.found > 0) return I.results.forEach(function(t, e) {
                    (t.log || []).forEach(function(t) {
                        t && f("فيديو " + (e + 1) + ": " + t, "w")
                    })
                }), (G.results || []).forEach(function(t) {
                    f("الخام · " + t.name + ": " + (t.note || (t.log || []).join(" | ") || "تم"), t.ok ? "ok" : "e")
                }), O.length > 1 && f("ملاحظة: القالب الجاهز يُملأ بنصوص أول فيديو فقط؛ الفيديوهات الإضافية وُضعت بعده على V" + p + ".", "w"), i("raw-bstate") && (i("raw-bstate").textContent = ""), void f("الخام: ملأت القالب الموجود على التايم لاين (" + G.found + " عنصر) وقصصت الطبقات الطويلة على طول الفيديو.", "ok");
                G && !1 === G.ok ? f("تعذّر ملء القالب الموجود: " + G.error, "e") : G && G.ok && !G.found && f("لم أجد قوالب الخام بأسمائها على هذا السيكونس. الكليبات الموجودة: " + ((G.seen || []).join(" ، ") || "لا شيء"), "w");
                var z = function(t) {
                        var e = i(t) && i(t).value;
                        return l.filter(function(t) {
                            return t.id === e
                        })[0]
                    },
                    U = z("raw-mg"),
                    J = z("raw-mg2"),
                    V = z("raw-msrc"),
                    W = z("raw-mloc"),
                    X = z("raw-mdate"),
                    Y = Math.max(1, d("raw-sw", 5)),
                    K = Math.max(1, Math.round(d("raw-xtrack", 18))),
                    Z = Math.max(1, Math.round(d("raw-dtrack", 17))),
                    Q = ae(i("raw-date") && i("raw-date").value || "") || ue(),
                    tt = {},
                    et = 0,
                    nt = 0,
                    rt = function(t, e, n, r, a) {
                        !e || r - n < .1 || ((tt[t] = tt[t] || []).push({
                            path: e.file,
                            label: _(e),
                            mname: e.name,
                            name: e.name,
                            start: n,
                            end: r,
                            lines: a,
                            menus: A(e, Math.max(1, a.filter(function(t) {
                                return t
                            }).length)),
                            menuNames: e.menus.map(function(t) {
                                return t.label
                            }),
                            textNames: e.texts.map(function(t) {
                                return t.label
                            })
                        }), et++)
                    };
                for (var at in I.results.forEach(function(t, e) {
                        if (t.ok) {
                            (t.log || []).forEach(function(t) {
                                t && f("فيديو " + (e + 1) + ": " + t, "w")
                            }), nt++;
                            var n = w[e].c,
                                r = t.start,
                                a = t.start + t.dur,
                                i = Math.min(r + Y, a),
                                o = me(n.title, d("raw-mxt", 22)),
                                s = me(n.subtitle, d("raw-mxs", 20)),
                                c = ae(n.location),
                                l = ae(n.source) || le(n.url);
                            U && o.length && rt(v, U, r, i, de(U, o, "")), J && (s.length || c) && rt(v, J, i, a, de(J, s, c)), V && l && rt(K, V, r, i, de(V, [], l)), W && rt(K, W, i, a, de(W, [], Q)), X && l && rt(Z, X, i, a, de(X, [], l))
                        } else f("فيديو " + (e + 1) + ": " + (t.error || "فشل"), "e")
                    }), tt)
                    if (tt.hasOwnProperty(at)) {
                        var it = await m("sb_placeAll", tt[at], parseInt(at, 10));
                        it && !1 !== it.ok ? (it.results || []).forEach(function(t) {
                            t.ok || f("V" + at + " " + (t.name || "") + ": " + (t.error || "تحقق من النص داخل القالب"), "e")
                        }) : f("V" + at + ": " + (it && it.error || "تعذّر وضع العناوين"), "e")
                    } et || f("لم أجد قوالب الخام في المكتبة (أضفها أولاً)، وُضعت الفيديوهات فقط.", "w"), i("raw-bstate") && (i("raw-bstate").textContent = ""), f("الخام: وُضع " + nt + " فيديو" + (et ? " مع " + et + " عنصر نصي." : "."), "ok")
            } else f(I && I.error || "تعذّر وضع الفيديوهات.", "e")
        } else f("أضف فيديو واحداً على الأقل (رابط أو ملف).", "w")
    }
    var Me = [];
    async function Ne() {
        var t = i("raw-tpl");
        if (t) {
            var e = null;
            try {
                e = await m("sb_listSequences")
            } catch (t) {}
            if (e && e.ok) {
                Me = e.list || [], t.innerHTML = "", Me.forEach(function(e) {
                    var n = document.createElement("option");
                    n.value = e.id, n.textContent = e.name, t.appendChild(n)
                });
                var n = p("sb.rawtpl", ""),
                    r = Me.filter(function(t) {
                        return t.name === n
                    })[0] || Me.filter(function(t) {
                        return /بدون\s*ترجمة/.test(t.name) && !/[اإ]طار/.test(t.name)
                    })[0];
                r && (t.value = r.id), t.onchange = function() {
                    var e = Me.filter(function(e) {
                        return e.id === t.value
                    })[0];
                    e && h("sb.rawtpl", e.name)
                }
            }
        }
    }
    async function _e() {
        var t = ne.clips[0];
        if (t && t.url) {
            var n = parseInt(String(i("raw-pi") && i("raw-pi").value || "1").split(/[,،\s]+/)[0], 10) || 1;
            try {
                var r = await Se({
                        url: t.url,
                        from: null,
                        to: null,
                        _st: t._st,
                        pi: n,
                        sub: ""
                    }),
                    a = 0;
                try {
                    a = e.statSync(r.file).size
                } catch (t) {}
                f("✓ نجح التنزيل: " + r.file + " (" + Math.round(a / 1048576 * 10) / 10 + " MB)", "ok")
            } catch (e) {
                var o = String(e.message || e).slice(0, 500);
                t._st && (t._st.textContent = o, t._st.className = "rc-st e"), f("فشل اختبار التنزيل: " + o, "e")
            }
        } else f("ضع رابط الفيديو أولاً.", "w")
    }
    async function Ae() {
        var t = ne.clips[0];
        if (t) {
            var e = await xe(t.url),
                n = d("raw-blue", NaN),
                r = {
                    color2: isFinite(n) ? n : ge() >= 0 ? ge() : e.blue,
                    disableLow: !i("raw-dis-low") || i("raw-dis-low").checked,
                    disableSrc: !(!i("raw-dis-src") || !i("raw-dis-src").checked),
                    icon: ve(t.url) >= 0 ? ve(t.url) : e.icon,
                    sw: Math.max(1, d("raw-sw", 5)),
                    end: 0,
                    title: me(t.title, d("raw-mxt", 22)),
                    sub: me(t.subtitle, d("raw-mxs", 20)),
                    loc: ae(t.location),
                    src: ae(t.source) || le(t.url),
                    date: ae(i("raw-date") && i("raw-date").value || "") || ue()
                },
                a = await m("sb_fillRaw", r);
            a && a.ok ? a.found ? (a.results || []).forEach(function(t) {
                f("تحديث · " + t.name + ": " + (t.note || (t.log || []).join(" | ") || "تم"), t.ok ? "ok" : "e")
            }) : f("لم أجد قوالب الخام على السيكونس الحالي.", "w") : f("تعذّر التحديث: " + (a && a.error || ""), "e")
        } else f("لا توجد بيانات.", "w")
    }
    i("raw-parse") && (i("raw-parse").onclick = function() {
        try {
            ye()
        } catch (t) {
            f(t.message, "e")
        }
    }, i("raw-load").onclick = function() {
        Ee()
    }, ne.clips.length || ne.clips.push({
        title: "",
        subtitle: "",
        url: "",
        from: null,
        to: null,
        file: "",
        source: "",
        location: ""
    }), i("raw-add").onclick = function() {
        ne.clips.push({
            title: "",
            subtitle: "",
            url: "",
            from: null,
            to: null,
            file: "",
            source: "",
            location: ""
        }), re(), ke()
    }, i("raw-build").onclick = function() {
        yt(Ce)
    }, i("raw-dltest") && (i("raw-dltest").onclick = function() {
        yt(_e)
    }), i("raw-apply") && (i("raw-apply").onclick = function() {
        yt(Ae)
    }), i("raw-now") && (i("raw-now").onclick = async function() {
        var btn = i("raw-now");
        btn.disabled = !0;
        try {
            var cur = await m("sb_activeSeq");
            if (!cur || !cur.ok || !cur.id) return void f("افتح السيكونس المطلوب تحويله لنسخة أحمر «الآن» أولاً، ثم اضغط الزر.", "w");
            var newName = String(cur.name || "نسخة") + " الآن";
            f("أنسخ السيكونس الحالي «" + cur.name + "» باسم «" + newName + "» (بكل ما عليه بالتايم لاين)…", "ok");
            var cl = await m("sb_cloneSequence", cur.id, newName, null);
            if (!cl || !cl.ok) return void f("تعذّر نسخ السيكونس: " + (cl && cl.error || ""), "e");
            var activated = !1;
            for (var ci = 0; ci < 20 && !activated; ci++) {
                var hAct = await m("sb_activeSeq");
                if (hAct && hAct.ok && hAct.id === cl.id) {
                    activated = !0;
                    break
                }
                if (3 === ci || 10 === ci) try {
                    await m("sb_openSequence", cl.id)
                } catch (t) {}
                await new Promise(function(res) {
                    setTimeout(res, 500)
                })
            }
            if (!activated) return void f("النسخة الجديدة «" + cl.name + "» لم تصبح نشطة بعد. افتحها (نقر مزدوج بلوحة المشروع) ثم اضغط الزر مرة ثانية.", "e");
            f("أنشأت النسخة: " + cl.name + " — كل الفيديو والنصوص والتوقيت بقيت كما هي، رح أغيّر فقط الألوان والشعار عليها.", "ok");
            f(cl.bin ? "المجلد في المشروع: " + cl.bin : "تعذّر وضعها بنفس مجلد السيكونس الأصلي (" + (cl.binErr || "") + "). رح تكون بجذر المشروع — انقلها يدوياً إذا حبيت.", cl.bin ? "ok" : "w");
            // اللون "اللون العام"/"اللون" بالموقرتين هو قائمة منسدلة (مش لون مباشر)، وأنت أكدت إنه الخيار الأول
            // بالقائمة أحمر. قراءة أسماء الخيارات من ملف الموقرت مش موثوقة دايماً لموقرت موجود فعلاً على
            // السيكونس (نفس القيد الموجود أصلاً بخيار "رقم خيار اللون الأزرق" اليدوي بوضع الخام العادي)، فبجرّب
            // أقرأها تلقائياً أولاً، وإذا فشلت بستخدم رقم الخيار مباشرة (افتراضياً ٠ كما أكدت، وقابل للتغيير).
            var titleNames = ["AJ - RAW Title 1", "AJ - Title 2 RAW"],
                redIdxDefault = d("raw-red", 0),
                fr1 = await m("sb_findClipsByName", titleNames);
            if (fr1 && fr1.ok)
                for (var nm in fr1.found) {
                    var info = fr1.found[nm],
                        done = !1,
                        idx = -1;
                    if (info.path) try {
                        var defn = await F(info.path, !1),
                            colorMenu = (defn.menus || []).filter(function(mm) {
                                return /^\s*اللون|colou?r/i.test(String(mm.label || ""))
                            })[0];
                        if (colorMenu)
                            for (var ii = 0; ii < colorMenu.options.length; ii++)
                                if (/[اأآ]حمر|red/i.test(colorMenu.options[ii])) {
                                    idx = ii;
                                    break
                                }
                    } catch (te) {}
                    var useIdx = idx >= 0 ? idx : redIdxDefault,
                        mr = await m("sb_setMogrtMenu", info.track, info.name, "^\\s*اللون|colou?r", useIdx);
                    mr && mr.ok ? f("غيّرت لون «" + nm + "» إلى أحمر (خيار رقم " + useIdx + (idx >= 0 ? " — من قراءة خيارات الموقرت" : " — الافتراضي") + ").", "ok") : f("تعذّر تغيير لون «" + nm + "» تلقائياً: " + (mr && mr.error || "غير معروف") + ". إذا رقم ٠ مش الصحيح، غيّره بحقل «رقم خيار اللون الأحمر» بإعدادات الخام.", "w")
                } else f("ما لقيت على السيكونس موقرتات عنوان بأسماء: " + titleNames.join("، ") + ".", "w");
            // "Logo AJA" مش كليب مختلف لازم يتبدّل — هو نفسه موقرت فيه قائمة منسدلة اسمها "Menu Control" بخيارين
            // "AJA" و"AJA Now"، فبس بنبدّل خيار القائمة زي ما عملنا باللون، بدون أي حذف/استيراد لملف جديد.
            var fr2 = await m("sb_findClipsByName", ["Logo AJA"]),
                logoIdxDefault = d("raw-logoidx", 1);
            if (!fr2 || !fr2.ok || !fr2.found["Logo AJA"]) f('ما لقيت كليب باسم "Logo AJA" على السيكونس لأبدّله.', "w");
            else {
                var logoInfo = fr2.found["Logo AJA"],
                    logoIdx = -1;
                if (logoInfo.path) try {
                    var ldefn = await F(logoInfo.path, !1),
                        logoMenu = (ldefn.menus || [])[0];
                    if (logoMenu)
                        for (var li = 0; li < logoMenu.options.length; li++)
                            if (/now|الآن/i.test(logoMenu.options[li])) {
                                logoIdx = li;
                                break
                            }
                } catch (tel) {}
                var useLogoIdx = logoIdx >= 0 ? logoIdx : logoIdxDefault,
                    rr = await m("sb_setMogrtMenu", logoInfo.track, logoInfo.name, "menu\\s*control|قائمة|شعار", useLogoIdx);
                rr && rr.ok ? f('بدّلت الشعار إلى "AJA Now" (خيار رقم ' + useLogoIdx + (logoIdx >= 0 ? " — من قراءة خيارات الموقرت" : " — الافتراضي") + ").", "ok") : f("تعذّر تبديل الشعار: " + (rr && rr.error || "غير معروف") + ". إذا رقم ١ مش الصحيح، غيّره بحقل «رقم خيار شعار AJA Now» بإعدادات الخام.", "w")
            }
            f('انتهت نسخة «' + newName + '» — تحقّق منها على التايم لاين.', "ok")
        } finally {
            btn.disabled = !1
        }
    }), ["raw-blue", "raw-red", "raw-logoidx", "raw-pi", "raw-mxt", "raw-mxs", "raw-sw", "raw-vtrack", "raw-mtrack", "raw-xtrack", "raw-dtrack", "raw-scale", "raw-gap"].forEach(function(t) {
        var e = i(t);
        if (e) {
            var n = p("sb." + t, "");
            ("raw-mxt" === t || "raw-mxs" === t) && parseInt(n, 10) > 26 && (n = ""), "" !== n && (e.value = n), e.onchange = function() {
                h("sb." + t, e.value), ne.clips.forEach(function(t) {
                    t._pv && t._pv()
                })
            }
        }
    }), i("raw-cookies") && (i("raw-cookies").value = p("sb.cookies", ""), i("raw-cookies").onchange = function() {
        h("sb.cookies", this.value.trim())
    }, i("raw-cookies-pick") && (i("raw-cookies-pick").onclick = function() {
        var t = b(!1, "ملف الكوكيز (cookies.txt)", ["txt"]);
        t && t[0] && (i("raw-cookies").value = t[0], h("sb.cookies", t[0]))
    })), ["raw-dis-low", "raw-dis-src", "raw-kash"].forEach(function(t) {
        var e = i(t);
        if (e) {
            var n = p("sb." + t, "");
            "" !== n && (e.checked = "1" === n), e.onchange = function() {
                h("sb." + t, e.checked ? "1" : "0")
            }
        }
    }), i("raw-trim") && (i("raw-trim").checked = "1" === p("sb.rawtrim", "0"), i("raw-trim").onchange = function() {
        h("sb.rawtrim", this.checked ? "1" : "0")
    }), ke(), ce());

    var sbQuoteTpls = [];

    async function sbQuoteTplPopulate() {
        var sel = i("q-tpl");
        if (!sel) return;
        var e = null;
        try {
            e = await m("sb_listSequences")
        } catch (t) {}
        if (e && e.ok) {
            sbQuoteTpls = e.list || [], sel.innerHTML = "", sbQuoteTpls.forEach(function(e) {
                var n = document.createElement("option");
                n.value = e.id, n.textContent = e.name, sel.appendChild(n)
            });
            var saved = p("sb.qtpl", ""),
                match = sbQuoteTpls.filter(function(t) {
                    return t.name === saved
                })[0] || sbQuoteTpls.filter(function(t) {
                    return /اقتباس|quote/i.test(t.name)
                })[0];
            match && (sel.value = match.id), sel.onchange = function() {
                var e = sbQuoteTpls.filter(function(e) {
                    return e.id === sel.value
                })[0];
                e && h("sb.qtpl", e.name)
            }
        }
    }
    i("q-tpl-r") && (i("q-tpl-r").onclick = function() {
        sbQuoteTplPopulate()
    });

    function sbQuoteRender(q) {
        i("q-title").value = q.title || "", i("q-source").value = q.source || "", i("q-location").value = q.location || "", i("q-gname").value = q.guestName || "", i("q-gtitle").value = q.guestTitle || "";
        i("q-n").textContent = q.lines.length;
        var fmt = function(s) {
            if (s == null) return "";
            var h = Math.floor(s / 3600), m2 = Math.floor(s % 3600 / 60), sec = Math.floor(s % 60);
            return (h ? h + ":" : "") + (h && m2 < 10 ? "0" : "") + m2 + ":" + (sec < 10 ? "0" : "") + sec
        };
        i("q-lines").innerHTML = q.lines.map(function(ln, idx) {
            return '<div class="rc-row" style="display:flex;gap:8px;align-items:center;margin:4px 0"><span class="muted" dir="ltr" style="min-width:48px">' + fmt(ln.start) + "</span><input data-qi=\"" + idx + '" type="text" dir="auto" style="flex:1" value="' + String(ln.text || "").replace(/"/g, "&quot;") + '"></div>'
        }).join(""), i("q-lines").querySelectorAll("input[data-qi]").forEach(function(inp) {
            inp.addEventListener("change", function() {
                var idx = parseInt(inp.getAttribute("data-qi"), 10);
                c.quote && c.quote.lines[idx] && (c.quote.lines[idx].text = inp.value)
            })
        }), i("q-st2").hidden = !1, i("q-st3").hidden = !1
    }
    i("q-parse") && (i("q-parse").onclick = function() {
        try {
            var txt = i("q-text").value || "";
            if (!txt.trim()) return void f("الصق سكربت الاقتباس أولاً.", "w");
            var q = SubQuote.parse(txt);
            c.quote = q, sbQuoteRender(q), i("q-state").textContent = "تم: " + q.lines.length + " سطر ترجمة.", f("حلّلت سكربت الاقتباس: العنوان، " + (q.guestName ? "الضيف (" + q.guestName + ")، " : "") + q.lines.length + " سطر ترجمة بتوقيت.", "ok")
        } catch (t) {
            f(t.message, "e")
        }
    }), i("q-load") && (i("q-load").onclick = async function() {
        var st = i("q-state"),
            url = (i("q-url").value || "").trim(),
            docid = window.SubGDoc && SubGDoc.docId ? SubGDoc.docId(url) : "";
        if (!docid) return st.textContent = "الرابط غير صالح (يجب أن يحوي /document/d/…).", void f("رابط المستند غير صالح.", "w");
        st.textContent = "أجلب المستند…";
        try {
            var r = await Ut("https://docs.google.com/document/d/" + docid + "/export?format=html", 0);
            if (200 !== r.status || /accounts\.google\.com|ServiceLogin|signin/i.test(r.url + r.body.slice(0, 3e3))) throw new Error("المستند خاص. اجعله «أي شخص لديه الرابط يمكنه العرض» ثم أعد المحاولة. (HTTP " + r.status + ")");
            var a = SubGDoc.plain(r.body);
            if (!a || !a.trim()) throw new Error("المستند فارغ أو لم أستطع قراءته.");
            i("q-text").value = a, st.textContent = "تم الجلب ✓"
        } catch (e) {
            var msg = String(e.message || e).slice(0, 200);
            st.textContent = "تعذّر الجلب: " + msg, f("تعذّر جلب سكربت الاقتباس: " + msg, "e")
        }
    });

    async function sbQuoteBuild() {
        var bst = i("q-bstate"),
            q = c.quote;
        if (!q || !q.lines || !q.lines.length) return bst.textContent = "حلّل السكربت أولاً.", void f("حلّل سكربت الاقتباس أولاً (الخطوة ١).", "w");
        var vfile = (i("q-vfile").value || "").trim();
        if (!vfile) return bst.textContent = "اكتب اسم ملف الفيديو.", void f("اكتب اسم ملف الفيديو كما أضفته للمشروع.", "w");
        function cleanPunct(s) {
            return String(s || "").replace(/(^|[^\d])[.,،؛;]+|[.,،؛;]+(?=[^\d]|$)/g, "$1").replace(/[ \t]{2,}/g, " ").trim()
        }
        // نثبّت معرّف السيكونس المقصود بهذا البناء ونعيد التحقّق منه قبل كل خطوة تلمس التايم لاين (وضع
        // الفيديو، تعديل الموقرتات، بناء تراك الترجمة). البناء بياخد وقت (تفريغ/محاذاة/تحميل)، فإذا المستخدم
        // بدّل السيكونس النشط ببريمير وقت ما الأداة شغالة، ما منكمل على سيكونس غلط — منوقف ونخبره بوضوح.
        var targetSeqId = null;

        async function ensureSeq(label) {
            if (!targetSeqId) return !0;
            var a = await m("sb_activeSeq");
            if (a && a.ok && a.id === targetSeqId) return !0;
            try {
                await m("sb_openSequence", targetSeqId)
            } catch (t) {}
            await new Promise(function(res) {
                setTimeout(res, 300)
            });
            a = await m("sb_activeSeq");
            if (a && a.ok && a.id === targetSeqId) return !0;
            return bst.textContent = "توقّف — السيكونس النشط تغيّر.", f("توقّفت قبل " + label + ": السيكونس النشط ببريمير تغيّر عن السيكونس المقصود لهذا البناء (يمكن فتحت أو ضغطت سيكونس تانية وقت ما كانت الأداة شغّالة). افتح السيكونس الصحيح من جديد وأعد تشغيل البناء عشان ما يتوزّع شي على سيكونس غلط.", "e"), !1
        }
        if (i("q-clone") && i("q-clone").checked && i("q-tpl") && i("q-tpl").value) {
            var baseName = (cleanPunct(q.title) || q.guestName || "اقتباس").replace(/[\\\/:*?"<>|]/g, " ").replace(/\s+/g, " ").trim().slice(0, 70);
            bst.textContent = "أنسخ سيكونس القالب…";
            var cl = await m("sb_cloneSequence", i("q-tpl").value, baseName, baseName);
            if (!cl || !cl.ok) return bst.textContent = "تعذّر نسخ القالب.", void f("تعذّر نسخ سيكونس القالب، لم أغيّر شيئاً: " + (cl && cl.error || ""), "e");
            f("أنشأت سيكونساً جديداً باسم: " + cl.name + (cl.active ? "" : " (افتحه من لوحة المشروع إن لم يفتح تلقائياً)"), "ok");
            var activated = false;
            for (var ci = 0; ci < 20 && !activated; ci++) {
                var hAct = await m("sb_activeSeq");
                if (hAct && hAct.ok && hAct.id === cl.id) {
                    activated = true;
                    break
                }
                if (3 === ci || 10 === ci) try {
                    await m("sb_openSequence", cl.id)
                } catch (t) {}
                await new Promise(function(res) {
                    setTimeout(res, 500)
                })
            }
            if (!activated) return bst.textContent = "السيكونس الجديد لم يصبح نشطاً.", void f("النسخة الجديدة «" + cl.name + "» لم تصبح السيكونس النشط. افتحها (نقر مزدوج بلوحة المشروع) ثم اضغط ابنِ مرة ثانية.", "e");
            targetSeqId = cl.id
        } else {
            var curAct = await m("sb_activeSeq");
            curAct && curAct.ok && curAct.id && (targetSeqId = curAct.id)
        }
        var vtrack = d("q-vtrack", 1),
            ttrack = d("q-ttrack", 10);
        if (!await ensureSeq("وضع الفيديو")) return;
        bst.textContent = "أضع الفيديو…";
        // the clip's usable range: an explicit "mm:ss - mm:ss" field if the script has one, otherwise fall
        // back to the span the سابتيتل lines themselves cover (min start → max end) — a hook-variant script
        // often has no top-level range field at all.
        var tFrom = q.timeRange ? q.timeRange.from : null,
            tTo = q.timeRange ? q.timeRange.to : null;
        if (tFrom == null && tTo == null && q.lines.length) {
            var starts = q.lines.map(function(l) {
                    return l.start
                }).filter(function(v) {
                    return v != null
                }),
                ends = q.lines.map(function(l) {
                    return l.end
                }).filter(function(v) {
                    return v != null
                });
            starts.length && ends.length && (tFrom = Math.min.apply(null, starts), tTo = Math.max.apply(null, ends))
        }
        var vr, dur, hookDur = 0;
        if (q.hook && q.hook.start != null && q.hook.text) {
            bst.textContent = "أضع الهوك ثم الفيديو الرئيسي…";
            vr = await m("sb_placeQuoteVideoHook", vfile, vtrack, q.hook.start, q.hook.end, tFrom, tTo, null);
            if (!vr || !vr.ok) return bst.textContent = "تعذّر وضع الهوك والفيديو.", void f("تعذّر وضع مقطعي الهوك والفيديو: " + (vr && vr.error || "غير معروف") + ". تأكد أن اسم الملف مطابق لملف مستورد بالمشروع.", "e");
            hookDur = vr.hookDur || 0, dur = vr.totalDur || hookDur + (vr.mainDur || 0);
            f("وضعت الهوك (" + Math.round(hookDur * 10) / 10 + " ث) ثم الفيديو الرئيسي (" + Math.round((vr.mainDur || 0) * 10) / 10 + " ث) على V" + vtrack + " — إجمالي " + Math.round(dur * 10) / 10 + " ث. " + (vr.log || []).join(" | "), "ok");
            if (hookDur > 0) {
                bst.textContent = "أزيح باقي العناصر على التايم لاين بعد الهوك…";
                var shr = await m("sb_shiftTracksForHook", vr.clipName || "", hookDur);
                shr && shr.ok ? f("أُزيحت باقي العناصر (العنوان/الاسم/المصدر/المكان والجرافيكس) بمقدار " + Math.round(hookDur * 10) / 10 + " ث عشان تبلش بعد الهوك تماماً." + (shr.log && shr.log.length ? " (" + shr.log.join(" | ") + ")" : ""), "ok") : f("تعذّر إزاحة باقي العناصر على التايم لاين بعد الهوك: " + (shr && shr.error || "غير معروف"), "e")
            }
        } else {
            vr = await m("sb_placeQuoteVideo", vfile, vtrack, 0, null, tFrom, tTo);
            if (!vr || !vr.ok) return bst.textContent = "تعذّر وضع الفيديو.", void f("تعذّر وضع الفيديو: " + (vr && vr.error || "غير معروف") + ". تأكد أن اسم الملف مطابق لملف مستورد بالمشروع.", "e");
            f("وضعت الفيديو على V" + vtrack + (tFrom != null || tTo != null ? " (مقصوص " + (tFrom || 0) + "–" + (tTo != null ? tTo : "…") + " ث)" : "") + " — المدة على التايم لاين: " + Math.round((vr.dur || 0) * 10) / 10 + " ث. " + (vr.log || []).join(" | "), "ok"), dur = vr.dur || (q.lines.length ? q.lines[q.lines.length - 1].end : 10)
        }
        c.quoteVideo = {
            path: vr.path || "",
            tFrom: tFrom || 0,
            tTo: tTo != null ? tTo : (tFrom || 0) + dur
        };
        var fillRules = [{
                key: "title",
                re: "title\\s*1|raw\\s*title|^عنوان$"
            }, {
                key: "src",
                re: "(^|[\\s-])source$|مصدر"
            }, {
                key: "loc",
                re: "location\\s*date|موقع|مكان"
            }, {
                key: "name",
                re: "title\\s*2\\s*raw|\\bname\\b|guest|strap|ضيف|اسم"
            }, {
                key: "date",
                re: "info\\s*date"
            }],
            fillTexts = {
                title: q.title ? [cleanPunct(q.title)] : [],
                src: q.source ? [cleanPunct(q.source)] : [],
                loc: q.location ? [cleanPunct(q.location)] : [],
                name: q.guestName ? [cleanPunct(q.guestName), cleanPunct(q.guestTitle || "")] : [],
                date: []
            };
        if (!await ensureSeq("تعديل الموقرتات")) return;
        bst.textContent = "أعدّل الموقرتات الموجودة على السيكونس…";
        var fr = await m("sb_fillQuote", {
            rules: fillRules,
            texts: fillTexts
        });
        if (fr && fr.ok) {
            Object.keys(fr.filled || {}).forEach(function(k) {
                var r = fr.filled[k];
                f("   [" + k + "] V" + r.track + " “" + r.name + "”: " + (r.ok ? r.note || "تم التعديل" : r.error || "فشل"), r.ok ? "ok" : "e")
            }), (fr.missing || []).length && f("ما لقيت على السيكونس كليب يطابق: " + fr.missing.join("، ") + ". الكليبات الموجودة فعلياً: " + (fr.clips || []).join(" | "), "w");
            // غيّر أيقونة المصدر لتطابق منصة اللينك (يوتيوب/فيسبوك/تيليغرام/...) — موقرت المصدر بوضع الاقتباس
            // كليب جاهز على السيكونس (ما بينزل من المكتبة من جديد)، فبقرا تعريفه مباشرة من مساره لمعرفة خيارات
            // قائمة الأيقونة، وبعدين غيّرها بالكود عبر sb_setMogrtMenu.
            var srcRes = fr.filled && fr.filled.src;
            if (srcRes && srcRes.ok && srcRes.path && q.link) try {
                var srcInfo = await F(srcRes.path, !1),
                    iconMenu = (srcInfo.menus || []).filter(function(mm) {
                        return /ايقون|أيقون|icon/i.test(String(mm.label || ""))
                    })[0] || (srcInfo.menus || [])[0],
                    plat = pe(q.link);
                if (iconMenu && plat) {
                    var idx = -1;
                    for (var ii = 0; ii < iconMenu.options.length; ii++)
                        if (plat[2].test(String(iconMenu.options[ii]))) {
                            idx = ii;
                            break
                        }
                    if (idx >= 0) {
                        var mr = await m("sb_setMogrtMenu", srcRes.track, srcRes.name, "ايقون|أيقون|icon", idx);
                        mr && mr.ok ? f("غيّرت أيقونة المصدر لتطابق منصة الرابط.", "ok") : f("تعذّر تغيير أيقونة المصدر: " + (mr && mr.error || "غير معروف"), "w")
                    } else f("ما لقيت أيقونة تطابق منصة الرابط ضمن خيارات موقرت المصدر: " + iconMenu.options.join(" ، "), "w")
                } else plat || f("ما تعرّفت على منصة اللينك (" + q.link + ") لتغيير أيقونة المصدر.", "w")
            } catch (te) {
                f("تعذّر قراءة خيارات أيقونة المصدر: " + String(te.message || te), "w")
            }
        } else f("تعذّر تعديل موقرتات العنوان/المصدر/المكان/الاسم: " + (fr && fr.error || "غير معروف"), "e");
        // نص الهوك الكامل بينحط على موقرت "AJ_Highlight 02" من المكتبة — مش نسخة وحدة فيها كل النص، إنما عدة
        // نسخ متتالية بنفس الموقرت، كل وحدة فيها كلمتين بالكتير، تتوالى على طول مدة الهوك (زي ترتيب كلمات
        // الهايلايت بوضع الراو بالضبط). التوقيت لكل نسخة متناسب مع عدد كلماتها من إجمالي كلمات الهوك.
        if (q.hook && q.hook.text) {
            var hlMogrt = Wt(/AJ[_\s]*Highlight\s*0?2|هايلايت\s*0?2/i);
            if (!hlMogrt) f('ما لقيت موقرت "AJ_Highlight 02" بمكتبتك — تأكد إنه مسجّل فيها بنفس الاسم تقريباً، أو خبرني الاسم الصحيح.', "w");
            else {
                bst.textContent = "أنزّل موقرتات الهايلايت للهوك…";
                var hlWords = cleanPunct(q.hook.text).split(/\s+/).filter(Boolean),
                    hlChunks = [];
                for (var hwi = 0; hwi < hlWords.length; hwi += 2) hlChunks.push(hlWords.slice(hwi, hwi + 2));
                var hlTotalW = hlWords.length,
                    hlTotalDur = hookDur || dur,
                    hlCur = 0,
                    hlItems = hlChunks.map(function(chunk, idx) {
                        var share = chunk.length / hlTotalW,
                            cStart = hlCur,
                            isLast = idx === hlChunks.length - 1,
                            cEnd = isLast ? hlTotalDur : Math.min(hlTotalDur, hlCur + hlTotalDur * share);
                        cEnd <= cStart && (cEnd = Math.min(hlTotalDur, cStart + .3)), hlCur = cEnd;
                        var shaped = SubShape.shapeLines(chunk, {
                            fields: Math.max(1, (hlMogrt.texts || []).length),
                            minLines: 1,
                            maxWords: 2,
                            maxChars: hlMogrt.maxChars,
                            shape: !1,
                            kashida: !1
                        });
                        return {
                            path: hlMogrt.file,
                            label: _(hlMogrt),
                            mname: hlMogrt.name,
                            name: hlMogrt.name,
                            start: cStart,
                            end: cEnd,
                            lines: shaped.lines,
                            menus: A(hlMogrt, shaped.lines.length, !0),
                            menuNames: hlMogrt.menus.map(function(t) {
                                return t.label
                            }),
                            textNames: hlMogrt.texts.map(function(t) {
                                return t.label
                            }),
                            scaleAbs: i("o-hlscale") && d("o-hlscale", 50) > 0 ? d("o-hlscale", 50) : 50
                        }
                    }),
                    hlR = await m("sb_placeAll", hlItems, d("q-ttrack", 10)),
                    hlOk = hlR && hlR.ok && hlR.results ? hlR.results.filter(function(t) {
                        return t.ok
                    }).length : 0;
                hlOk === hlItems.length ? f("نزّلت " + hlOk + " موقرت هايلايت للهوك (" + hlChunks.map(function(c) {
                    return c.join(" ")
                }).join(" | ") + ") على V" + hlR.track + ".", "ok") : f("نزّل " + hlOk + " من " + hlItems.length + " موقرت هايلايت للهوك." + (hlR && hlR.error ? " خطأ: " + hlR.error : ""), hlOk ? "w" : "e")
            }
        }
        async function setIO() {
            var io = await m("sb_setSeqIO", dur);
            io && io.ok ? f("ضبطت إن/آوت السيكونس للتصدير (٠ – " + Math.round(dur * 10) / 10 + " ث).", "ok") : f("تعذّر ضبط إن/آوت السيكونس: " + (io && io.error || ""), "w")
        }
        // الترجمة بتنزل كتراك كابشن أصلي (CC) مش موقرت — الستايل بتحدده إنت بعدين من بريمير مباشرة.
        // إذا محرك المطابقة المحلي مثبّت، نستخرج توقيت سكتات الضيف الفعلية من نفس مقطع الصوت المقصوص،
        // ونستخدمها لقصّ الكابشن عند سكتات حقيقية بدل القسمة الحسابية البحتة.
        var pauses = null,
            ptPath = (i("q-ptranscript") && i("q-ptranscript").value || "").trim();
        if (ptPath && e.existsSync(ptPath)) {
            bst.textContent = "أقرأ ترانسكربت بريمير…";
            try {
                var ptWords = sbParsePremiereTranscriptWords(ptPath);
                if (!ptWords.length) f("ما لقيت كلمات بتوقيت بملف ترانسكربت بريمير — تأكد إنه مصدّر من Export transcript (json)… بعد ما خلص التفريغ. رح أكمل بدونه.", "w");
                else {
                    // نفس افتراض توقيت السابتيتل بالسكربت: الترانسكربت مصدّر من الكليب المصدر الكامل (Source Monitor)،
                    // فبنرجّعه لنفس توقيت الكليب المقصوص على التايم لاين (نطرح tFrom).
                    var pOff = tFrom || 0;
                    pauses = [];
                    for (var pwi2 = 1; pwi2 < ptWords.length; pwi2++) {
                        var pGap2 = ptWords[pwi2].s - ptWords[pwi2 - 1].e;
                        pGap2 >= .08 && pauses.push(ptWords[pwi2 - 1].e - pOff + pGap2 / 2)
                    }
                    f("قريت ترانسكربت بريمير (" + ptWords.length + " كلمة، " + pauses.length + " سكتة) — الكابشن رح يتقص عندها. (افتراض: صدّرته من الكليب المصدر الكامل بالـ Source Monitor — إذا طلع التوقيت مزاح، قولّي عشان أعدّل الافتراض)", "ok")
                }
            } catch (errPt) {
                f("تعذّر قراءة ملف ترانسكربت بريمير (رح أكمل من غيره): " + String(errPt.message || errPt), "w"), pauses = null
            }
        }
        if (!pauses && i("q-pause-align") && i("q-pause-align").checked && vr.path && e.existsSync(vr.path)) {
            var pauseWav = r.join(n.tmpdir(), "SubtitleBuilder_QuotePause_" + Date.now() + ".wav"),
                pWords = null,
                usedMMS = !1;
            try {
                await new Promise(function(resolve, reject) {
                    var ff = Q(["/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg"]) || "ffmpeg";
                    a.execFile(ff, ["-v", "error", "-y", "-i", vr.path, "-ss", String(c.quoteVideo.tFrom), "-to", String(c.quoteVideo.tTo), "-ac", "1", "-ar", "16000", "-f", "wav", pauseWav], function(err) {
                        err ? reject(err) : resolve()
                    })
                });
                // MMS forced alignment (against our own known-correct script text) is far more precise than Whisper's own word
                // timestamps, since Whisper is built to guess the transcript, not to time one we already trust — use it when installed and enabled.
                if (mmsWanted()) {
                    var transcriptText = q.lines.map(function(l) { return l.text }).filter(Boolean).join(" ");
                    if (transcriptText.trim()) {
                        bst.textContent = "أحلّل سكتات الضيف بدقّة (MMS)…";
                        try {
                            pWords = await runMMSAlign(pauseWav, transcriptText, function(m) { bst.textContent = "MMS… " + m });
                            pWords && pWords.length && (usedMMS = !0)
                        } catch (eMms) {
                            f("تعذّر استخدام نموذج المحاذاة (رح أكمل بالمحرك العادي): " + _sbFlat(eMms.message || eMms), "w"), pWords = null
                        }
                    }
                }
                if (!pWords || !pWords.length) {
                    var engineBin = K();
                    if (engineBin) {
                        bst.textContent = "أحلّل سكتات الضيف…";
                        var pauseJson = r.join(n.tmpdir(), "SubtitleBuilder_QuotePause_" + Date.now() + ".json"),
                            // اقتباس بيحتاج دقة أعلى من فيديوغراف (مطابقة سكتات على مستوى الكلمة بلغات مختلفة)،
                            // فبنستخدم دايماً large-v3 هون بدل ما ناخد موديل تبويب فيديوغراف (o-model) اللي ممكن
                            // يكون small لأجل السرعة بذاك الوضع — ما منأثر على اختيار موديل فيديوغراف نفسه.
                            pModel = "large-v3",
                            pMlx = "mlx" === (i("o-engine") ? i("o-engine").value : "") && "darwin" === process.platform;
                        try {
                            try {
                                await nt(engineBin, pauseWav, null, pauseJson, pModel, null, pMlx, null, 12e4)
                            } catch (eAlign) {
                                if (!pMlx) throw eAlign;
                                await nt(engineBin, pauseWav, null, pauseJson, pModel, null, !1, null, 12e4)
                            }
                            pWords = SubAlign.flatten(JSON.parse(e.readFileSync(pauseJson, "utf8")))
                        } finally {
                            try {
                                e.unlinkSync(pauseJson)
                            } catch (t) {}
                        }
                    } else if (!usedMMS) f("محرك المطابقة المحلي غير مثبّت — رح أبني الكابشن بالقسمة الحسابية العادية. ثبّت المحرك من إعدادات المطابقة لتفعيل ضبط السكتات.", "w")
                }
                if (pWords && pWords.length) {
                    pauses = [];
                    for (var pwi = 1; pwi < pWords.length; pwi++) {
                        var pGap = pWords[pwi].s - pWords[pwi - 1].e;
                        pGap >= .12 && pauses.push(pWords[pwi - 1].e + pGap / 2)
                    }
                    f("حلّلت سكتات الضيف بـ" + (usedMMS ? "MMS" : "المحرك المحلي") + " (" + pauses.length + " سكتة) — الكابشن رح يتقص عندها بدل القسمة الحسابية.", "ok")
                }
            } catch (errPause) {
                f("تعذّر تحليل سكتات الضيف (رح أكمل بالقسمة الحسابية العادية): " + String(errPause.message || errPause), "w"), pauses = null
            } finally {
                try {
                    e.unlinkSync(pauseWav)
                } catch (t) {}
            }
        }

        function snapToPause(target, isHardEnd) {
            if (!pauses || !pauses.length) return target;
            var tol = isHardEnd ? 1.4 : .9,
                best = null,
                bestD = tol;
            for (var k = 0; k < pauses.length; k++) {
                var dd = Math.abs(pauses[k] - target);
                dd <= bestD && (bestD = dd, best = pauses[k])
            }
            return null != best ? best : target
        }
        // كلمات/عبارات مركّبة (أسماء دول، منظمات، أشخاص) ما بنفع تنقص بنص وبنص بين كابشنين — لازم تضل سوا بنفس القطعة.
        function normAr(s) {
            return String(s || "").normalize("NFKC").replace(/[ً-ْٰ]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ة$/, "ه").trim()
        }
        var defaultUnsplit = ["الولايات المتحدة الأمريكية", "الولايات المتحدة", "المملكة المتحدة", "المملكة العربية السعودية", "الإمارات العربية المتحدة", "الاتحاد الأوروبي", "الأمم المتحدة", "مجلس الأمن", "مجلس الأمن الدولي", "الشرق الأوسط", "الضفة الغربية", "قطاع غزة", "كوريا الشمالية", "كوريا الجنوبية", "جنوب أفريقيا", "جنوب السودان", "جمهورية الكونغو الديمقراطية"],
            customUnsplitRaw = (p("sb.quoteUnsplit", "") || "").split(/\r?\n|,/).map(function(s) {
                return s.trim()
            }).filter(Boolean),
            unsplitPhrases = defaultUnsplit.concat(customUnsplitRaw);
        q.guestName && q.guestName.trim().split(/\s+/).length > 1 && unsplitPhrases.push(q.guestName.trim());
        var phraseWordLists = unsplitPhrases.map(function(ph) {
            return ph.trim().split(/\s+/).filter(Boolean).map(normAr)
        }).filter(function(a) {
            return a.length > 1
        }).sort(function(a, b) {
            return b.length - a.length
        });

        function atomizeWords(words) {
            var atoms = [],
                wi = 0;
            outer: while (wi < words.length) {
                for (var pj = 0; pj < phraseWordLists.length; pj++) {
                    var ph = phraseWordLists[pj];
                    if (wi + ph.length <= words.length) {
                        var ok = !0;
                        for (var k = 0; k < ph.length; k++)
                            if (normAr(words[wi + k]) !== ph[k]) {
                                ok = !1;
                                break
                            }
                        if (ok) {
                            atoms.push(words.slice(wi, wi + ph.length)), wi += ph.length;
                            continue outer
                        }
                    }
                }
                atoms.push([words[wi]]), wi++
            }
            return atoms
        }
        // when a hook segment sits before the main clip on the timeline, the main content's sequence-time
        // zero is shifted forward by the hook's own duration.
        var cues = [],
            capOff = (tFrom || 0) - hookDur;

        function pushLineCues(ln) {
            if (ln.end <= 0) return;
            if (ln.start < 0) ln.start = 0;
            var end = ln.end;
            if (!(end > ln.start)) return;
            var words = cleanPunct(ln.text).split(/\s+/).filter(Boolean);
            if (!words.length) return;
            // one full translated sentence per script line reads better broken into a few short, timed phrases
            // rather than one long caption cue sitting on screen for the whole span. Cap by word count AND
            // character count (whichever hits first) so a chunk is less likely to wrap to a second line —
            // but never split a known multi-word phrase (country/org/person names) across two chunks.
            var atoms = atomizeWords(words),
                wordTarget = 5,
                charTarget = 30,
                chunks = [],
                cur = [],
                curWords = 0,
                curChars = 0;
            atoms.forEach(function(atom) {
                var atomChars = atom.join(" ").length,
                    nextWords = curWords + atom.length,
                    nextChars = curChars + (cur.length ? 1 : 0) + atomChars;
                cur.length && (nextWords > wordTarget || nextChars > charTarget) ? (chunks.push(cur), cur = [atom], curWords = atom.length, curChars = atomChars) : (cur.push(atom), curWords = nextWords, curChars = nextChars)
            }), cur.length && chunks.push(cur);
            chunks.length || (chunks = [
                [words]
            ]);
            var totalWords = words.length,
                tcur = ln.start;
            chunks.forEach(function(chunkAtoms, idx) {
                var chunkWords = chunkAtoms.reduce(function(n, a) {
                        return n + a.length
                    }, 0),
                    share = chunkWords / totalWords,
                    cStart = tcur,
                    isLast = idx === chunks.length - 1,
                    cEnd = isLast ? end : Math.min(end, tcur + (end - ln.start) * share);
                isLast || (cEnd = Math.min(end - .15, Math.max(cStart + .3, snapToPause(cEnd, !1)))), cEnd <= cStart && (cEnd = cStart + .4), tcur = cEnd, cues.push({
                    start: cStart,
                    end: cEnd,
                    text: chunkAtoms.map(function(a) {
                        return a.join(" ")
                    }).join(" ")
                })
            })
        }
        // the hook's own line (if any) sits at sequence time [0, hookDur) — it's not part of q.lines and needs
        // no capOff rebase, since that's exactly where sb_placeQuoteVideoHook put the hook clip itself.
        q.hook && q.hook.start != null && q.hook.text && hookDur > 0 && pushLineCues({
            start: 0,
            end: Math.max(.4, hookDur),
            text: q.hook.text
        });
        q.lines.forEach(function(ln0) {
            if (ln0.start == null || !ln0.text) return;
            var rawEnd = ln0.end != null ? ln0.end : ln0.start + 3;
            if (!(rawEnd > ln0.start)) return;
            // سابتيتل script timestamps are absolute (relative to the full downloaded source), but the clip on the
            // sequence starts at 0 and only covers [tFrom, tTo] of that source — rebase onto the trimmed clip's time.
            var ln = {
                start: ln0.start - capOff,
                end: rawEnd - capOff,
                text: ln0.text
            };
            if (ln.end <= 0) return;
            if (ln.start < 0) ln.start = 0;
            if (tTo != null && ln.start >= tTo - capOff) return;
            pushLineCues(ln)
        });
        if (!cues.length) return await setIO(), bst.textContent = "تم وضع الفيديو. ما في أسطر ترجمة صالحة للتراك.", void f("ما في أسطر ترجمة بحدود الفيديو المقصوص لأبنيها كتراك كابشن.", "w");
        if (!await ensureSeq("بناء تراك الترجمة")) return;
        bst.textContent = "أبني تراك كابشن للترجمة…";
        var info = await m("sb_info");
        if (!info || !info.ok) return bst.textContent = "تعذّر قراءة معلومات السيكونس.", void f("تعذّر قراءة الفريم ريت: " + (info && info.error || ""), "e");
        var fps = info.fps,
            srtCues = cues.map(function(cq, idx) {
                return {
                    startF: Math.round(cq.start * fps),
                    endF: Math.max(Math.round(cq.start * fps) + 1, Math.round(cq.end * fps)),
                    text: cq.text
                }
            }),
            srtPath = r.join(n.tmpdir(), "SubtitleBuilder_QuoteSub_" + Date.now() + ".srt");
        e.writeFileSync(srtPath, "﻿" + SubSplit.toSrt(srtCues, fps), "utf8");
        var br = await m("sb_build", [{
            name: "ترجمة الاقتباس",
            path: srtPath
        }]);
        if (!br || !br.ok) return bst.textContent = "تعذّر بناء تراك الكابشن.", void f("تعذّر بناء تراك الكابشن: " + (br && br.error || "غير معروف"), "e");
        (br.results || []).forEach(function(t) {
            t.ok ? f("تم إنشاء تراك كابشن الترجمة (" + cues.length + " سطر). حدّد الستايل من لوحة Captions بالبريمير.", "ok") : f("تعذّر إنشاء تراك الكابشن: " + (t.error || "ملف SRT موجود في فولدر Subtitles بالمشروع، اسحبه للتايم لاين يدوياً إن لزم.") + " — المسار: " + srtPath, "e")
        }), bst.textContent = "تم ✓ (فيديو + تراك كابشن ترجمة)", await setIO()
    }
    i("q-build") && (i("q-build").onclick = function() {
        yt(sbQuoteBuild)
    });
    i("q-geminikey") && (i("q-geminikey").value = p("sb.geminikey", ""), i("q-geminikey").onchange = function() {
        h("sb.geminikey", this.value.trim())
    });
    i("q-geminimodel") && (i("q-geminimodel").value = p("sb.geminimodel", "gemini-3.8-flash"), i("q-geminimodel").querySelectorAll("option").length && !i("q-geminimodel").value && (i("q-geminimodel").selectedIndex = 0), i("q-geminimodel").onchange = function() {
        h("sb.geminimodel", this.value)
    });
    i("q-unsplit") && (i("q-unsplit").value = p("sb.quoteUnsplit", ""), i("q-unsplit").onchange = function() {
        h("sb.quoteUnsplit", this.value)
    });
    i("q-ptranscript") && (i("q-ptranscript").value = p("sb.qptranscript", ""), i("q-ptranscript").onchange = function() {
        h("sb.qptranscript", this.value.trim())
    }), i("q-ptranscript-pick") && (i("q-ptranscript-pick").onclick = function() {
        var t = b(!1, "ترانسكربت بريمير (JSON)", ["json"]);
        t && t[0] && (i("q-ptranscript").value = t[0], h("sb.qptranscript", t[0]))
    });

    // يقرأ ملف ترانسكربت مصدّر من بريمير (Text panel → Export transcript (json)…) ويطلع منه توقيت كل كلمة.
    // الشكل الدقيق لملف أدوبي مو موثّق رسمياً بالكامل، فبندوّر بمرونة جوا أي بنية JSON عن مصفوفة كائنات
    // فيها نص الكلمة + وقت بداية رقمي (+ إما نهاية أو مدة)، بدل ما نفترض شكل واحد بس.
    function sbParsePremiereTranscriptWords(jsonPath) {
        var raw = e.readFileSync(jsonPath, "utf8").replace(/^﻿/, ""),
            data = JSON.parse(raw),
            out = [];

        function textOf(o) {
            return o.text != null ? o.text : o.word != null ? o.word : o.value != null ? o.value : null
        }

        function startOf(o) {
            var s = o.start != null ? o.start : o.startTime != null ? o.startTime : o.s != null ? o.s : o.startSeconds;
            return null == s ? null : Number(s)
        }

        function endOf(o, s) {
            if (o.end != null) return Number(o.end);
            if (o.endTime != null) return Number(o.endTime);
            if (o.e != null) return Number(o.e);
            var dur = o.duration != null ? o.duration : o.dur;
            return null != dur && null != s ? s + Number(dur) : null
        }

        function walk(node) {
            if (Array.isArray(node)) {
                var looksLikeWords = node.length > 0 && node.every(function(it) {
                    return it && "object" == typeof it && null != textOf(it) && null != startOf(it)
                });
                if (looksLikeWords) return void node.forEach(function(it) {
                    var s = startOf(it),
                        en = endOf(it, s);
                    null != s && null != en && en > s && out.push({
                        t: String(textOf(it)),
                        s: s,
                        e: en
                    })
                });
                node.forEach(walk)
            } else if (node && "object" == typeof node) Object.keys(node).forEach(function(k) {
                walk(node[k])
            })
        }
        return walk(data), out.sort(function(a, c2) {
            return a.s - c2.s
        })
    }

    function sbHttpsPostJson(url, bodyObj, timeoutMs) {
        return new Promise(function(resolve, reject) {
            var done = !1;
            function finish(fn, arg) {
                done || (done = !0, fn(arg))
            }
            var body = JSON.stringify(bodyObj),
                u = new URL(url),
                req = require("https").request({
                    hostname: u.hostname,
                    path: u.pathname + u.search,
                    method: "POST",
                    timeout: timeoutMs || 90000,
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": Buffer.byteLength(body)
                    }
                }, function(res) {
                    var chunks = [];
                    res.on("data", function(c) {
                        chunks.push(c)
                    }), res.on("end", function() {
                        finish(resolve, {
                            status: res.statusCode,
                            body: Buffer.concat(chunks).toString("utf8")
                        })
                    }), res.on("error", function(e) {
                        finish(reject, e)
                    })
                });
            req.on("error", function(e) {
                finish(reject, e)
            }), req.on("timeout", function() {
                req.destroy();
                finish(reject, new Error("انتهت مهلة الاتصال بـ Gemini (" + Math.round((timeoutMs || 90000) / 1e3) + " ث) من غير رد. تأكد من اتصال الإنترنت أو جرب موديل أسرع."))
            }), req.write(body), req.end()
        })
    }
    async function sbQuoteAiCheck() {
        var st = i("q-aistate"),
            out = i("q-aiout"),
            q = c.quote,
            vid = c.quoteVideo,
            key = (i("q-geminikey").value || "").trim(),
            model = (i("q-geminimodel") && i("q-geminimodel").value || "").trim() || "gemini-3.8-flash";
        if (!key) return st.textContent = "اكتب مفتاح Gemini API أولاً.", void f("اكتب مفتاح Gemini API بخانة التحقق بالذكاء الاصطناعي.", "w");
        if (!q || !q.lines || !q.lines.length) return st.textContent = "حلّل السكربت أولاً.", void f("حلّل سكربت الاقتباس أولاً (الخطوة ١).", "w");
        if (!vid || !vid.path) return st.textContent = "ابنِ الاقتباس أولاً.", void f("اضغط «ابنِ الاقتباس على التايم لاين» أولاً عشان أعرف مسار الفيديو ومدى القص.", "w");
        if (!e.existsSync(vid.path)) return st.textContent = "ملف الفيديو غير موجود.", void f("ملف الفيديو غير موجود على القرص: " + vid.path, "e");
        out.textContent = "", st.textContent = "أستخرج الصوت…";
        var ff = Q(["/opt/homebrew/bin/ffmpeg", "/usr/local/bin/ffmpeg"]) || "ffmpeg",
            wav = r.join(n.tmpdir(), "SubtitleBuilder_QuoteAI_" + Date.now() + ".wav");
        try {
            await new Promise(function(resolve, reject) {
                a.execFile(ff, ["-v", "error", "-y", "-i", vid.path, "-ss", String(vid.tFrom), "-to", String(vid.tTo), "-ac", "1", "-ar", "16000", "-f", "wav", wav], function(err) {
                    err ? reject(err) : resolve()
                })
            })
        } catch (err) {
            return st.textContent = "تعذّر استخراج الصوت.", void f("تعذّر استخراج الصوت عبر ffmpeg: " + String(err.message || err), "e")
        }
        st.textContent = "أرسل الصوت لـ Gemini… (ممكن تاخذ لحظات)";
        var b64;
        try {
            b64 = e.readFileSync(wav).toString("base64")
        } catch (err) {
            return st.textContent = "تعذّر قراءة ملف الصوت.", void f("تعذّر قراءة ملف الصوت: " + String(err.message || err), "e")
        }
        var prompt = "فرّغ كلام المتحدث بالفيديو المرفق بلغته الأصلية، ثم ترجمه للعربية الفصحى. أعطني فقط تفريغ باللغة الأصلية، سطر فاضي، ثم الترجمة العربية. بدون أي مقدمات أو تعليقات إضافية.";
        try {
            var apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent?key=" + encodeURIComponent(key),
                apiBody = {
                    contents: [{
                        parts: [{
                            text: prompt
                        }, {
                            inline_data: {
                                mime_type: "audio/wav",
                                data: b64
                            }
                        }]
                    }]
                },
                resp = null,
                attempts = 3,
                delays = [3000, 8000];
            for (var attempt = 0; attempt < attempts; attempt++) {
                resp = await sbHttpsPostJson(apiUrl, apiBody);
                if (resp.status !== 503 && resp.status !== 429) break;
                if (attempt < attempts - 1) {
                    st.textContent = "Gemini مزدحم حالياً، بعيد المحاولة… (" + (attempt + 2) + "/" + attempts + ")";
                    await new Promise(function(res) { setTimeout(res, delays[attempt]) })
                }
            }
            try {
                e.unlinkSync(wav)
            } catch (t) {}
            if (resp.status < 200 || resp.status >= 300) return st.textContent = "خطأ من Gemini.", void f((503 === resp.status || 429 === resp.status ? "Gemini مزدحم حالياً حتى بعد عدة محاولات. جرّب موديل ثاني من القائمة أو حاول بعد شوي. " : "خطأ من Gemini ") + "(HTTP " + resp.status + "): " + resp.body.slice(0, 300), "e");
            var data = JSON.parse(resp.body),
                text = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.map(function(p) {
                    return p.text || ""
                }).join("") || "";
            if (!text.trim()) return st.textContent = "رد فاضي.", void f("Gemini ما رجّع نص. الرد الخام: " + resp.body.slice(0, 300), "w");
            var scriptSide = "ترجمة السكربت (المعتمدة):\n" + q.lines.map(function(ln) {
                return ln.text
            }).join(" ");
            out.textContent = "ما سمعه Gemini من الفيديو:\n" + text.trim() + "\n\n" + scriptSide, st.textContent = "تم ✓ — قارن يدوياً، ترجمة السكربت هي المعتمدة.", f("تحقّق Gemini: راجع المقارنة بأسفل زر التحقق. ترجمة السكربت تبقى المعتمدة دائماً.", "ok")
        } catch (err) {
            try {
                e.unlinkSync(wav)
            } catch (t) {}
            st.textContent = "تعذّر الاتصال بـ Gemini.", f("تعذّر الاتصال بـ Gemini: " + String(err.message || err), "e")
        }
    }
    i("q-aicheck") && (i("q-aicheck").onclick = function() {
        yt(sbQuoteAiCheck)
    });
    window.__sb = {
        autoMarks: Yt,
        splitAudio: at,
        ingest: zt,
        layout: ot,
        state: c,
        lib: l,
        recomputeBlocks: it,
        placeTemplates: ht,
        buildCaptions: dt,
        coverage: ft
    };
    (function() {
        var HKEY = "sb.history";

        function histList() {
            try {
                return JSON.parse(p(HKEY, "[]")) || []
            } catch (t) {
                return []
            }
        }

        function histSave(list) {
            h(HKEY, JSON.stringify(list.slice(0, 20)))
        }

        function snapSettings() {
            var out = {};
            Array.prototype.forEach.call(document.querySelectorAll('[id^="o-"]'), function(el) {
                if (!el.id) return;
                if ("checkbox" === el.type) out[el.id] = el.checked;
                else if ("INPUT" === el.tagName || "SELECT" === el.tagName || "TEXTAREA" === el.tagName) out[el.id] = el.value
            });
            return out
        }

        function applySettings(snap) {
            snap && Object.keys(snap).forEach(function(id) {
                var el = document.getElementById(id);
                if (el) {
                    "checkbox" === el.type ? el.checked = !!snap[id] : el.value = snap[id];
                    try {
                        el.dispatchEvent(new Event("change"))
                    } catch (t) {}
                }
            })
        }

        function histLabel(text) {
            var t = String(text || "").replace(/\s+/g, " ").trim();
            return (t.slice(0, 40) || "(بدون نص)") + (t.length > 40 ? "…" : "")
        }

        function modeLabel(m) {
            return {
                vg: "فيديوغراف",
                reel: "ريل",
                raw: "الخام",
                quote: "اقتباس"
            } [m] || "فيديوغراف"
        }

        function renderHistSel() {
            var sel = i("history-sel");
            if (sel) {
                var list = histList();
                sel.innerHTML = '<option value="">↶ سجلّ الأعمال السابقة…</option>' + list.map(function(hh, idx) {
                    var d = new Date(hh.ts),
                        ds = d.getMonth() + 1 + "/" + d.getDate() + " " + (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
                    return '<option value="' + idx + '">' + ds + " [" + modeLabel(hh.mode) + "] — " + histLabel(hh.label).replace(/</g, "&lt;") + "</option>"
                }).join("")
            }
        }

        function saveCurrentToHistory() {
            var mode = p("sb.mode", "vg");
            if ("quote" === mode) {
                var qtext = i("q-text") && i("q-text").value || "";
                if (qtext.trim()) {
                    var qlist = histList();
                    qlist.unshift({
                        ts: Date.now(),
                        mode: "quote",
                        label: c.quote && c.quote.title || qtext,
                        qtext: qtext,
                        quote: c.quote || null,
                        settings: snapSettings()
                    }), histSave(qlist), renderHistSel()
                }
                return
            }
            var text = i("text") && i("text").value || c.text || "";
            if (text.trim() || (c.raw || "").trim()) {
                var list = histList();
                list.unshift({
                    ts: Date.now(),
                    mode: mode,
                    label: text || c.raw || "",
                    raw: c.raw || "",
                    text: c.text || "",
                    marks: c.marks || [],
                    audio: c.audio || "",
                    settings: snapSettings()
                }), histSave(list), renderHistSel()
            }
        }

        function clearProject() {
            var mode = p("sb.mode", "vg");
            if ("quote" === mode) {
                i("q-text") && (i("q-text").value = ""), i("q-url") && (i("q-url").value = ""), i("q-title") && (i("q-title").value = ""), i("q-source") && (i("q-source").value = ""), i("q-location") && (i("q-location").value = ""), i("q-gname") && (i("q-gname").value = ""), i("q-gtitle") && (i("q-gtitle").value = ""), i("q-vfile") && (i("q-vfile").value = ""), i("q-lines") && (i("q-lines").innerHTML = ""), i("q-n") && (i("q-n").textContent = "0"), i("q-state") && (i("q-state").textContent = ""), i("q-bstate") && (i("q-bstate").textContent = ""), i("q-st2") && (i("q-st2").hidden = !0), i("q-st3") && (i("q-st3").hidden = !0), c.quote = null, c.quoteVideo = null;
                return
            }
            i("text") && (i("text").value = ""), i("gdoc-url") && (i("gdoc-url").value = ""), Jt(""), Y(""), c.guests = [], c.placed = {}, c.capTrack = 0, c.fullBuilt = !1, c.fullCaps = !1, c.exAudio = null, c.extrasDone = !1, c.editHist = [], R(), G(), it(), ct(), ut()
        }
        Array.prototype.forEach.call(document.querySelectorAll("section.step"), function(sec, idx) {
            var body = sec.querySelector(".body");
            if (body) {
                var hd = body.querySelector("h2");
                if (hd && !hd.classList.contains("step-toggle")) {
                    var headEl = hd;
                    while (headEl.parentElement && headEl.parentElement !== body) headEl = headEl.parentElement;
                    var wrap = document.createElement("div");
                    for (wrap.className = "step-content"; headEl.nextSibling;) wrap.appendChild(headEl.nextSibling);
                    body.appendChild(wrap), hd.classList.add("step-toggle");
                    var key = "sb.collapse." + (sec.id || "s" + idx),
                        defClosed = "st3" === sec.id || "st5" === sec.id ? "1" : "0",
                        closed = "1" === p(key, defClosed);
                    closed && (wrap.classList.add("collapsed"), hd.classList.add("collapsed")), hd.addEventListener("click", function() {
                        var nowClosed = !wrap.classList.contains("collapsed");
                        wrap.classList.toggle("collapsed", nowClosed), hd.classList.toggle("collapsed", nowClosed), h(key, nowClosed ? "1" : "0")
                    })
                }
            }
        }), i("new-proj") && (i("new-proj").onclick = function() {
            var mode = p("sb.mode", "vg");
            saveCurrentToHistory(), clearProject(), ee(mode), f("بدأت مشروعاً جديداً. شغلك السابق محفوظ بالسجلّ فوق.", "ok")
        }), i("history-sel") && (renderHistSel(), i("history-sel").onchange = function() {
            var idx = parseInt(this.value, 10);
            if (this.value = "", !isNaN(idx)) {
                var list = histList(),
                    picked = list[idx];
                if (picked) {
                    saveCurrentToHistory();
                    if ("quote" === picked.mode) {
                        i("q-text") && (i("q-text").value = picked.qtext || ""), picked.quote ? (c.quote = picked.quote, sbQuoteRender(picked.quote), i("q-state") && (i("q-state").textContent = "تم: " + (picked.quote.lines ? picked.quote.lines.length : 0) + " سطر ترجمة.")) : c.quote = null, applySettings(picked.settings), ee("quote"), f("استرجعت مشروع اقتباس سابق من السجلّ.", "ok");
                        return
                    }
                    var txt = picked.raw || picked.text || "";
                    i("text") && (i("text").value = txt), Jt(txt), c.marks = (picked.marks || []).slice(), h("sb.marks", c.marks), picked.audio && e.existsSync(picked.audio) ? Y(picked.audio) : Y(""), applySettings(picked.settings), picked.mode && ee(picked.mode), R(), G(), it(), ct(), ut(), f("استرجعت مشروعاً سابقاً من السجلّ.", "ok")
                }
            }
        })
    })()
}();