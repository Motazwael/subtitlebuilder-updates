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
            ["time", /^(?:تايم\s*كود|التوقيت|الوقت|الزمن|المقطع|المدة|Timecode|Time|TC|Range|In\s*\/?\s*Out)/i],
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
        // ملاحظة: كان فيها حرف تشكيل زايد (ُ) بعد "ص" بالنسخة القديمة من هالنمط، فكانت ما
        // بتنطبق أبداً على نص عادي متكتوب بدون تشكيل زي "صور للثامبنيل" — صلحناها.
        thumbLabelRe = /^(?:صور(?:ة)?\s*(?:لل?)?\s*(?:ال)?ث[اأ]مب[ـ]?نيل|thumbnail\s*(?:images?|photos?|pics?)?)\s*[:：]?\s*$/i,
        // سطر تاريخ الواقعة (مثلاً "كتابة تاريخ الواقعة .. 20 - 11 - 2026") فيه أرقام مفصولة بشرطة
        // زي 20 - 11 بالظبط متل صيغة مدى الوقت (من-لـ)، فكان عم ينلقط غلط كمدى قص وهمي (كليب رابع
        // زيادة من غير قصد). أي سطر فيه كلمة "تاريخ" أو سنة بصيغة ١٩xx/٢٠xx منستثنيه من فحص مدى الوقت.
        dateLikeRe = /تاريخ|\b(?:19|20)\d{2}\b/,
        // سطر "علامة الكاميرا" (أو شبيه) هو بس تسمية/label مش جزء من قيمة المصدر الفعلية —
        // زي platformOnly بالظبط، منتجاهله لحاله وما منضمّه لقيمة حقل "المصدر".
        creditLabelOnlyRe = /^\s*(?:علامة\s*ال?كاميرا|كاميرا\s*(?:المصدر)?|camera\s*(?:tag|mark|credit)?)\s*[:：]?\s*$/i,
        // تاريخ الواقعة بيتكتب عادةً بسطر واحد: "كتابة تاريخ الواقعة .. 20 - 11 - 2026" — العنوان
        // والقيمة سوا بنفس السطر، والفاصل عندهم نقطتين ".." مش ":" أو "-" (يلي الحقول التانية
        // بتستخدمها). بنلقطه كحالة خاصة قبل أي معالجة تانية — بدون ما نفتح/نسكر أي حقل عام — عشان
        // الأسطر يلي بعده (مواقيت القص مثلاً) تضل تنحسب عادي لنفس الحقل يلي كان شغال قبله (اللينك).
        dateInlineRe = /^(?:كتابة\s*)?تاريخ\s*(?:الواقعة|الحادث[ةه]|الحدث)?\s*(?:[:：=\-–—]|\.{2,}|…)\s*(\S.*)$/i,
        arMonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

    // "20 - 11 - 2026" أو "20/11/2026" (يوم-شهر-سنة، الأسلوب المعتاد بالتحرير العربي) → "20 نوفمبر 2026"
    // متل شكل نفس التاريخ الجاهز اللي الأداة أصلاً بتحطه تلقائياً (ue() بملف main.js). أي صيغة تانية
    // (تاريخ مكتوب نص عادي أصلاً) منسيبها متلما هي، ما منخمّن.
    function formatDateLike(v) {
        v = String(v || "").trim();
        var m = /^(\d{1,2})\s*[\/\-.]\s*(\d{1,2})\s*[\/\-.]\s*(\d{2,4})$/.exec(v);
        if (m) {
            var day = parseInt(m[1], 10), month = parseInt(m[2], 10), year = parseInt(m[3], 10);
            if (year < 100) year += 2000;
            if (month >= 1 && month <= 12 && day >= 1 && day <= 31) return day + " " + arMonths[month - 1] + " " + year
        }
        return v
    }

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
        return { title: "", subtitle: "", url: "", thumbUrl: "", from: null, to: null, source: "", location: "", notes: "", caption: "", date: "", ranges: [], urls: [] }
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
                var rangeList = full.length ? full : [[cur.from, cur.to]];
                // أكتر من رابط فيديو حقيقي (مش ثامبنيل) تحت نفس السجل (نفس العنوان/المصدر/المكان):
                // كل رابط بياخد كليب لحاله بنفس بقية الحقول، بدون أي فلسفة — تماماً متل ما لو
                // المحرر كتبهم كسجلين منفصلين بـ"فيديو 1:"/"فيديو 2:".
                var urlList = cur.urls.length > 1 ? cur.urls : [cur.url];
                rangeList.forEach(function (rr) {
                    urlList.forEach(function (u) {
                        var clone = {};
                        for (var k in cur) if ("ranges" !== k && "urls" !== k) clone[k] = cur[k];
                        clone.url = u, clone.from = rr[0], clone.to = rr[1], records.push(clone)
                    })
                })
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
                        // الرابط بيصير thumbUrl بس لو انحط صراحة بعد تسمية "صور للثامبنيل" (thumbLabelRe).
                        // أي رابط إضافي (زي رابط الوكالة/المرجع) غير مصرَّح عنه هيك، منتجاهله بدل ما
                        // نخمّن إنه صورة ثامبنيل وهو مش هيك — القاعدة الثابتة: ما منخمّن قيمة حقل.
                        if ("thumb" === mode) { if (!cur.thumbUrl) cur.thumbUrl = u2 }
                        else { cur.urls.push(u2); if (!cur.url) cur.url = u2 }
                    });
                    return
                }
                !dateLikeRe.test(ln) && b(ln) // سطر وقت صريح (مدى قص) تحت خانة اللينك — أي شي تاني مش رابط ولا وقت ولا تاريخ، نتجاهله
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
                }).filter(function (ln) { return ln && !platformOnly.test(ln) && !creditLabelOnlyRe.test(ln) });
                v = parts.join(" ").trim();
                if (v) cur.source = v
            } else if ("link" === key) {
                parseLinkBlock(buf)
            } else if ("time" === key) {
                buf.forEach(function (ln) { !dateLikeRe.test(ln) && b(ln) })
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
        for (var li = 0; li < lines.length; li++) {
            var raw = lines[li];
            if (!raw) {
                // سطر فاضي: ما بينهي حقل عم يتجمّع فيه محتوى (نحافظ على فقرات متعددة الأسطر
                // بالملاحظات/الكابشن). بس إذا حقل متفتح وفاضي (مثلاً "سابتيتل" أو "ملاحظات" جايين
                // لحالهم بدون قيمة) ومرقت عليه ٢+ سطر فاضي والسجل خلص أصلاً (عنوان/رابط موجودين)،
                // ممكن نسكر الحقل — غير هيك أي فقرة حرة متروكة بآخر السكربت (نص المنشور الأصلي
                // للمرجع مثلاً) بتنكب بالغلط جوا هاد الحقل الفاضي وتصير "فيديو" تاني وهمي فاضي.
                // بس قبل ما نسكره: لازم نتأكد إنه ما في عنوان حقل معروف جاي لاحقاً بباقي السكربت —
                // لأنه لو في، يعني قيمة الحقل هاد بس مكتوبة بعد أسطر فاضية (مثلاً "المصدر" وبعده
                // سطرين فاضيين وبعدين اسم المصدر)، وسكر الحقل هون بيضيّع القيمة هاي بالكامل.
                if (++blankRun >= 2 && field && !buf.length && m(cur)) {
                    var hasFutureHeader = false;
                    for (var lj = li + 1; lj < lines.length; lj++) if (lines[lj] && c(lines[lj])) { hasFutureHeader = true; break }
                    if (!hasFutureHeader) field = null
                }
                continue;
            }
            blankRun = 0;
            if (/^(?:-{3,}|_{3,}|={3,}|\*{3,})$/.test(raw)) { commitField(); flushRecord(); continue }
            if (/^(?:فيديو|مقطع|خام|Video|Clip|Raw)\s*\d+\s*[:：\-–]?\s*$/i.test(raw)) { commitField(); flushRecord(); continue }

            // تاريخ الواقعة: حالة خاصة تُقرأ وتُحفظ مباشرة من نفس السطر، بدون ما تفتح/تسكر
            // أي حقل عام — هيك أي سطر بعدها (مواقيت قص مثلاً) بضل يتحسب لنفس الحقل الشغال.
            var dm = dateInlineRe.exec(raw);
            if (dm) { if (!cur.date) cur.date = formatDateLike(dm[1].trim()); continue }

            var hdr = c(raw);
            if (hdr) { setField(hdr.key, hdr.val); continue }

            if (field) { buf.push(raw); continue }

            // ما في عنوان حقل وما في حقل نشط: نسمح بس بالسطر الأول (أو أول أسطر) قبل أي حقل كعنوان رئيسي
            // (أسلوب قديم: عنوان بدون تسمية بأول السكربت). أي شي غير هيك بدون عنوان حقل، نتجاهله —
            // ما منخمّن ولا منضيف أي شي عشوائي من السكربت لحقل تاني.
            if (!cur.title && !cur.subtitle && !cur.url && !cur.source && !cur.location) {
                field = "title", buf = [raw]
            }
        }
        commitField(), flushRecord();

        return records.forEach(function (e) {
            null != e.from && null != e.to && e.to <= e.from && (e.to = null)
        }), records
    }

    var d = {
        parse: p,
        parseOne: function (e) {
            var t = p(e),
                i = { title: "", subtitle: "", url: "", thumbUrl: "", from: null, to: null, source: "", location: "", notes: "", caption: "", date: "" };
            return t.forEach(function (e) {
                ["title", "subtitle", "url", "thumbUrl", "source", "location", "notes", "caption", "date"].forEach(function (t) {
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
