!function (e) {
    "use strict";
    var t = /https?:\/\/[^\s<>"'،)\]]+/gi,
        i = "\\d{1,3}(?::\\d{2}){0,2}(?:[.,]\\d+)?",
        r = "(?:\\s*(?:ثانية|ثواني|ثانيه|ث|sec|s)\\b)?",
        l = new RegExp("(?:من\\s*(?:الثانية|الثانيه|الدقيقة|الدقيقه|الوقت|الزمن)?\\s*)?(" + i + ")" + r + "\\s*(?:إلى|الى|حتى|لغاية|لـ|[-–—~]|to)\\s*(?:الثانية\\s*)?(" + i + ")" + r, "i"),
        n = new RegExp("(?:^|\\s)من\\s*(?:الثانية|الثانيه|الدقيقة|الدقيقه)?\\s*(" + i + ")" + r + "(?=\\s|$)", "i"),
        // قائمة الحقول المعروفة بالسكربت. كل حقل له اسم مفتاح (key) ونمط للعنوان (regex) يتعرف عليه.
        // القاعدة الثابتة: كل حقل ياخذ قيمته فقط من تحت عنوانه هو، وبس — بدون أي تخمين أو دمج من حقول تانية.
        o = [
            ["title", /^(?:(?:الثامبنيل|الثمبنيل|ثامبنيل|الصورة\s*المصغرة|Thumbnail)(?:\s*(?:و|and|&)?\s*(?:العنوان\s*الرئيسي|Main\s*title|Headline|Title)?)?|العنوان\s*الرئيسي|العنوان\s*الرئيسى|عنوان\s*رئيسي|الرئيسي|العنوان|عنوان|Main\s*title|Headline|Title|H1)/i],
            ["sub", /^(?:سابتيتل|سب\s*تايتل|ساب\s*تايتل|سبتايتل|العنوان\s*الفرعي|العنوان\s*الفرعى|عنوان\s*فرعي|عنوان\s*ثانوي|الفرعي|Sub\s*-?\s*title|Sub\s*-?\s*heading|Subhead(?:ing)?|H2)/i],
            ["loc", /^(?:الموقع|المكان|مكان|اللوكيشن|لوكيشن|المدينة|Location|Place)/i],
            ["src", /^(?:المصدر|Source)/i],
            ["link", /^(?:رابط\s*الفيديو|الرابط|رابط|اللينك|اللينكات|لينك|الخامة|Video\s*link|Video|Link|URL)/i],
            ["time", /^(?:التوقيت|الوقت|الزمن|المقطع|المدة|Timecode|Time|TC|Range|In\s*\/?\s*Out)/i],
            ["caption", /^(?:الكابشن|كابشن|Caption)/i],
            ["note", /^(?:ملاحظات?|Notes?|Description)/i]
        ],
        s = /(?:^|\.)(?:facebook\.com|fb\.watch|fb\.com|instagram\.com|twitter\.com|x\.com|t\.co|tiktok\.com|youtube\.com|youtu\.be|t\.me|telegram\.me|vimeo\.com)$/i,
        // بعض المحررين بيكتبوا اسم المنصة نفسها جنب "المصدر" بدل اسم القناة/الحساب الحقيقي (مثلاً "المصدر: تليجرام").
        // المنصة أصلاً ظاهرة من أيقونة موقرت المصدر، فقيمة مصدر هي بس اسم منصة (بدون أي شي تاني) زائدة ومحذوفة.
        platformWord = "facebook|فيسبوك|فيس بوك|فيس|instagram|انستغرام|إنستغرام|انستجرام|إنستجرام|ستوري\\s*انستغرام|twitter|تويتر|[اإ]كس|x|telegram|تيليغرام|تلغرام|تليجرام|youtube|يوتيوب|tiktok|تيك\\s*توك|تيكتوك|whatsapp|واتساب|واتس\\s*اب",
        platformOnly = new RegExp("^\\s*(?:" + platformWord + ")\\s*$", "i"),
        platformPrefix = new RegExp("^\\s*(?:" + platformWord + ")\\s+(?=\\S)", "i"),
        mdLinkRe = /\[([^\]]+)\]\(https?:\/\/[^\s)]+\)/g,
        // سطر عنوان فرعي داخل خانة اللينك نفسها بيقول "صور للثامبنيل" (أو شبيه) — أي رابط بعده مش رابط
        // الفيديو الأساسي، هو رابط صور مخصص بس لسحب الثامبنيل منه. لازم ننحفظ لحاله، مش نلخبط فيه رابط الفيديو
        // ولا نضيفه لأي حقل تاني (هاد بالضبط كان سبب ضياع/خربطة روابط فيديوهات تليجرام).
        thumbLabelRe = /^(?:صُو?ر(?:ة)?\s*(?:لل?)?\s*(?:ال)?ث[اأ]مب[ـ]?نيل|thumbnail\s*(?:images?|photos?|pics?)?)\s*[:：]?\s*$/i;

    function u(e) {
        return String(e).replace(/^https?:\/\//i, "").split(/[\/?#]/)[0].replace(/^www\./, "").toLowerCase()
    }

    // يتعرف إذا سطر هو "عنوان حقل" معروف، ويرجع {key, val} — val فاضي لو العنوان لحاله بسطره
    // (والقيمة جايّة بالسطر/السطور يلي بعده)، أو فيها نص لو كانت القيمة بنفس السطر بعد : أو - .
    function c(e) {
        for (var t = 0; t < o.length; t++) {
            var i = o[t][1].exec(e);
            if (i) {
                var r = e.slice(i[0].length),
                    l = /^\s*[:：=\-–—]\s*/.exec(r);
                if (l) return { key: o[t][0], val: r.slice(l[0].length).trim() };
                if (!r.trim()) return { key: o[t][0], val: "" };
                if (/^[A-Za-z]/.test(i[0]) && /^\s/.test(r) && !/^[A-Za-z]/.test(r.trim())) return { key: o[t][0], val: r.trim() }
            }
        }
        return null
    }

    function a(e) {
        if (!(e = String(e).trim())) return null;
        // "01.35" من غير ":" وبرقمين بعد الفاصلة هو أسلوب الفريق بكتابة دقيقة:ثانية بنقطة بدل نقطتين
        // (مثلاً "00.00 - 01.35" يعني من 0:00 لـ 1:35) — نعتبرها دقيقة:ثانية مش كسر عشري من الثانية،
        // وإلا قصة لـ 1:35 بتصير غلط 1.35 ثانية بس.
        var mmss = /^(\d{1,3})[.,](\d{2})$/.exec(e);
        if (mmss && Number(mmss[2]) < 60) return 60 * Number(mmss[1]) + Number(mmss[2]);
        e = e.replace(",", ".");
        var t = e.split(":").map(Number);
        return t.some(isNaN) ? null : 3 === t.length ? 3600 * t[0] + 60 * t[1] + t[2] : 2 === t.length ? 60 * t[0] + t[1] : t[0]
    }

    function f(e) {
        return String(e).replace(/[​-‏‪-‮⁦-⁩﻿]/g, "").replace(/ /g, " ").replace(/^[\s•▪◦●\-–*]+(?=\S)/, "").replace(/^\d{1,2}[.)]\s+(?=\D)/, "").trim()
    }

    function m(e) {
        return e.url || e.title || e.subtitle
    }

    function blank() {
        return { title: "", subtitle: "", url: "", thumbUrl: "", from: null, to: null, source: "", location: "", notes: "", caption: "", ranges: [] }
    }

    function p(e) {
        var lines = String(e || "").split(/\r?\n/).map(f),
            records = [],
            cur = blank(),
            field = null,
            buf = [];

        function pushRange(fr, to) {
            cur.ranges.push([fr, to]);
            if (null == cur.from) cur.from = fr, cur.to = to
        }

        // يحاول يلقط مدى وقت (من-لـ) بسطر؛ إذا لقى يرجع true. نفس منطق القديم، منستخدمه داخل خانة
        // اللينك (لو حطّ المحرر مدة القص تحت الرابط مباشرة) وداخل خانة "التوقيت/المدة" الصريحة لو موجودة.
        function b(e) {
            var t2, i2 = l.exec(e);
            if (i2) return pushRange(a(i2[1]), a(i2[2])), !0;
            if (t2 = n.exec(e)) return pushRange(a(t2[1]), null), !0;
            var r2 = /^(\d{1,3}(?::\d{2}){0,2}(?:[.,]\d+)?)$/.exec(e.trim());
            return !!r2 && (pushRange(a(r2[1]), null), !0)
        }

        function flushRecord() {
            if (m(cur)) {
                var full = cur.ranges.filter(function (rr) { return null != rr[0] && null != rr[1] });
                if (full.length > 1) full.forEach(function (rr) {
                    var clone = {};
                    for (var k in cur) if ("ranges" !== k) clone[k] = cur[k];
                    clone.from = rr[0], clone.to = rr[1], records.push(clone)
                });
                else {
                    var single = {};
                    for (var k2 in cur) if ("ranges" !== k2) single[k2] = cur[k2];
                    records.push(single)
                }
            }
            cur = blank(), field = null, buf = []
        }

        function parseLinkBlock(ls) {
            var mode = "video";
            ls.forEach(function (ln) {
                if (!ln) return;
                if (thumbLabelRe.test(ln.trim())) { mode = "thumb"; return }
                var urls = ln.match(t);
                if (urls && urls.length) {
                    urls.forEach(function (u2) {
                        u2 = u2.replace(/[.,;:!؟?)\]]+$/, "");
                        if ("thumb" === mode) { if (!cur.thumbUrl) cur.thumbUrl = u2 }
                        else if (!cur.url) cur.url = u2; else if (!cur.thumbUrl) cur.thumbUrl = u2
                    });
                    return
                }
                b(ln) // سطر وقت صريح (مدى قص) تحت خانة اللينك — أي شي تاني مش رابط ولا وقت، نتجاهله
            })
        }

        function commitField() {
            if (!field || !buf.length) { buf = []; return }
            var key = field, v;
            if ("title" === key) {
                v = buf.join(" ").trim();
                if (v) { cur.title && (cur.url || cur.subtitle || cur.location) && flushRecord(); cur.title = v }
            } else if ("sub" === key) {
                v = buf.join(" ").trim();
                if (v) { cur.subtitle && (cur.url || cur.title || cur.location) && flushRecord(); cur.subtitle = v }
            } else if ("loc" === key) {
                v = buf.join(" ").trim();
                if (v) cur.location = v
            } else if ("src" === key) {
                var parts = buf.map(function (ln) {
                    return ln.replace(mdLinkRe, "$1").replace(platformPrefix, "").replace(/\s+/g, " ").trim()
                }).filter(function (ln) { return ln && !platformOnly.test(ln) });
                v = parts.join(" ").trim();
                if (v) cur.source = v
            } else if ("link" === key) {
                parseLinkBlock(buf)
            } else if ("time" === key) {
                buf.forEach(function (ln) { b(ln) })
            } else if ("caption" === key) {
                v = buf.join("\n").trim();
                if (v) cur.caption = (cur.caption ? cur.caption + "\n" : "") + v
            } else if ("note" === key) {
                v = buf.join("\n").trim();
                if (v) cur.notes = (cur.notes ? cur.notes + "\n" : "") + v
            }
            buf = []
        }

        function setField(key, val) {
            commitField();
            field = key, buf = val ? [val] : []
        }

        var blankRun = 0;
        lines.forEach(function (raw) {
            if (!raw) {
                // سطر فاضي: ما بينهي حقل عم يتجمّع فيه محتوى (نحافظ على فقرات متعددة الأسطر
                // بالملاحظات/الكابشن). بس إذا حقل متفتح وفاضي (مثلاً "سابتيتل" أو "ملاحظات" جايين
                // لحالهم بدون قيمة) ومرقت عليه ٢+ سطر فاضي والسجل خلص أصلاً (عنوان/رابط موجودين)،
                // نسكر الحقل — غير هيك أي فقرة حرة متروكة بآخر السكربت (نص المنشور الأصلي للمرجع
                // مثلاً) بتنكب بالغلط جوا هاد الحقل الفاضي وتصير "فيديو" تاني وهمي فاضي.
                return void(++blankRun >= 2 && field && !buf.length && m(cur) && (field = null));
            }
            blankRun = 0;
            if (/^(?:-{3,}|_{3,}|={3,}|\*{3,})$/.test(raw)) return commitField(), void flushRecord();
            if (/^(?:فيديو|مقطع|خام|Video|Clip|Raw)\s*\d+\s*[:：\-–]?\s*$/i.test(raw)) return commitField(), void flushRecord();

            var hdr = c(raw);
            if (hdr) return void setField(hdr.key, hdr.val);

            if (field) return void buf.push(raw);

            // ما في عنوان حقل وما في حقل نشط: نسمح بس بالسطر الأول (أو أول أسطر) قبل أي حقل كعنوان رئيسي
            // (أسلوب قديم: عنوان بدون تسمية بأول السكربت). أي شي غير هيك بدون عنوان حقل، نتجاهله —
            // ما منخمّن ولا منضيف أي شي عشوائي من السكربت لحقل تاني.
            if (!cur.title && !cur.subtitle && !cur.url && !cur.source && !cur.location) {
                field = "title", buf = [raw]
            }
        }), commitField(), flushRecord();

        return records.forEach(function (e) {
            null != e.from && null != e.to && e.to <= e.from && (e.to = null)
        }), records
    }

    var d = {
        parse: p,
        parseOne: function (e) {
            var t = p(e),
                i = { title: "", subtitle: "", url: "", thumbUrl: "", from: null, to: null, source: "", location: "", notes: "", caption: "" };
            return t.forEach(function (e) {
                ["title", "subtitle", "url", "thumbUrl", "source", "location", "notes", "caption"].forEach(function (t) {
                    !i[t] && e[t] && (i[t] = e[t])
                }), null == i.from && null != e.from && (i.from = e.from, i.to = e.to)
            }), m(i) ? [i] : []
        },
        toSec: a,
        fmt: function (e) {
            if (null == e) return "";
            var t = Math.floor(e / 60),
                i = e - 60 * t;
            return t + ":" + ((i = Math.round(100 * i) / 100) < 10 ? "0" : "") + i
        }
    };
    e.SubRaw = d, "undefined" != typeof module && module.exports && (module.exports = d)
}("undefined" != typeof window ? window : this);
