// تحديث عن بعد: يتحقق من نسخة أحدث على GitHub ويستبدل ملفات الكود المشتركة
// (js/*.js الأساسية + jsx/host.jsx + css/style.css) وملفات أصول اختيارية (مثل الشعار) —
// ما يلمس index.html ولا manifest.xml ولا js/license.js ولا js/update.config.js،
// عشان ما يكسر أي نسخة مخصصة (مثل نسخة كيمو).
(function () {
    "use strict";
    var fs;
    try { fs = require("fs"); } catch (e) { return; }

    var BASE = String(window.SB_UPDATE_BASE || "").trim();
    if (!BASE) return; // ما انضبط رابط التحديث بعد (js/update.config.js)
    if (BASE.charAt(BASE.length - 1) !== "/") BASE += "/";

    var FILES = [
        "js/cs.js", "js/split.js", "js/script.js", "js/align.js", "js/gdoc.js",
        "js/numwords.js", "js/onset.js", "js/verify.js", "js/shape.js",
        "js/raw.js", "js/quote.js", "js/main.js", "js/updater.js", "jsx/host.jsx", "css/style.css"
    ];

    // ملفات نصّية اختيارية خاصة ببناء معيّن (مثلاً css/kimo.css خاص بنسخة كيمو بس) —
    // لو فشل تنزيل أي واحد منها (مش موجود بالريبو بعد، أو مش لازم لهذا البناء) نتجاهله
    // بصمت وما نوقف باقي التحديث، عكس FILES يلي فشلها يوقف كل العملية.
    var OPTIONAL_FILES = ["css/kimo.css", "js/license.js"];

    // ملفات ثنائية (صور وغيرها) تُنزّل وتُكتب كـ bytes بدل نص — مثل الشعار.
    // لو ملف مش موجود أصلاً بهذا البناء (مثلاً النسخة الرسمية ما فيها شعار) بنتجاهله بصمت.
    var ASSETS = ["assets/logo.png"];

    var csi, extRoot = null, stateFile = null, localVer = "0.0.0", busy = false;
    try { csi = new CSInterface(); } catch (e) { return; }

    function el(id) { return document.getElementById(id); }

    function say(msg, cls) {
        var s = el("upd-msg");
        if (s) { s.textContent = msg; s.className = cls || "muted"; }
    }

    // نقطة حمراء نابضة جنب زر "تحقق من تحديث" تظهر تلقائياً لما يكون في إصدار جديد،
    // حتى لو المستخدم ما ضغط الزر — عشان يلاحظ فوراً إنه في تحديث بانتظاره.
    function ensureDot() {
        var dot = el("upd-dot");
        if (dot) return dot;
        var css = document.createElement("style");
        css.textContent = "#upd-dot{display:inline-block;width:8px;height:8px;border-radius:50%;" +
            "background:#ff6b6b;margin-inline-start:6px;vertical-align:middle;" +
            "animation:upd-pulse 1.3s ease-in-out infinite}" +
            "@keyframes upd-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(1.5)}}";
        document.head.appendChild(css);
        dot = document.createElement("span");
        dot.id = "upd-dot";
        dot.title = "في تحديث جديد متوفر";
        dot.hidden = true;
        var btn = el("upd-check");
        if (btn && btn.parentNode) btn.parentNode.insertBefore(dot, btn.nextSibling);
        return dot;
    }

    function cmpVer(a, b) {
        var pa = String(a).split(".").map(Number), pb = String(b).split(".").map(Number), n = Math.max(pa.length, pb.length);
        for (var i = 0; i < n; i++) {
            var x = pa[i] || 0, y = pb[i] || 0;
            if (x !== y) return x - y;
        }
        return 0;
    }

    function readState() {
        try {
            var j = JSON.parse(fs.readFileSync(stateFile, "utf8"));
            if (j && j.version) return String(j.version);
        } catch (e) {}
        return "0.0.0";
    }

    function writeState(v) {
        try { fs.writeFileSync(stateFile, JSON.stringify({ version: v }), "utf8"); } catch (e) {}
    }

    var lastErr = ""; // آخر سبب فشل لتحديد مجلد الإضافة، لعرضه بالرسالة لو فشل كل شي

    function getExtRoot(cb) {
        // الطريقة الأساسية: واجهة CEP الرسمية مباشرة (getSystemPath) — ما تعتمد على
        // محرّك الإكستند سكريبت (jsx) إطلاقاً، فما تتأثر بتخزينه المؤقت.
        try {
            if (csi.getSystemPath) {
                var p = csi.getSystemPath(SystemPath.EXTENSION);
                if (p && typeof p === "string") return cb(p.replace(/\\/g, "/"));
            }
        } catch (e0) { lastErr = "getSystemPath: " + (e0.message || e0); }
        // احتياطي: دالة jsx القديمة (sb_extRoot) لو الطريقة الأولى مش متوفرة لأي سبب.
        csi.evalScript("sb_extRoot()", function (res) {
            var bad = !res || typeof res !== "string" || res === "undefined" ||
                res.indexOf("ERR") === 0 || /error/i.test(res);
            if (bad) { lastErr = "sb_extRoot: " + String(res).slice(0, 80); cb(null); }
            else cb(res.replace(/\\/g, "/"));
        });
    }

    // raw.githubusercontent.com بيرجع cache-control: max-age=300 ويتجاهل أي
    // query string (زي ?t=...) بتحديد الكاش — يعني ممكن يرجع نسخة الملف القديمة
    // لعدة دقائق بعد كل push، وبشكل مستقل لكل ملف (ملف ممكن يتحدث قبل غيره).
    // هيك صار update-state.json يسجل نجاح التحديث بإصدار جديد بينما بعض الملفات
    // (زي main.js) انكتبت فعلياً بمحتوى قديم. الحل: نحل أحدث commit SHA على GitHub
    // ونجيب كل الملفات من رابط مثبّت على هاد الـ SHA (رابط جديد كل مرة تماماً،
    // ما انكاش قبل هيك، فمستحيل يرجع محتوى قديم) بدل رابط الفرع "main" المتغيّر.
    // GitHub بيسمح بـ ٦٠ طلب/ساعة بس من غير تسجيل دخول لواجهة الـ API (لكل جهاز/IP) —
    // لو المستخدم ضغط "تحقق من تحديث" كتير متتالي (بالتست مثلاً)، منقدر نستهلك الحد
    // هاد بسرعة، وبعدها resolveBase() بترجع للرابط العادي (البديل) يلي فيه بالضبط نفس
    // مشكلة الكاش يلي كنا عم نتجنبها (راجع الملاحظة فوق). لهيك منكاش الـ SHA المحلول
    // لمدة قصيرة (90 ثانية) حتى الضغطات المتكررة بفترة قصيرة ما تستهلك الحد من غير داعي.
    var resolvedCache = null, resolvedAt = 0;
    function resolveBase(cb) {
        var m = BASE.match(/^https:\/\/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/[^\/]+\/$/);
        if (!m) return cb(BASE); // شكل رابط غير متوقع — نكمل بالطريقة العادية
        if (resolvedCache && Date.now() - resolvedAt < 90000) return cb(resolvedCache);
        var apiUrl = "https://api.github.com/repos/" + m[1] + "/" + m[2] + "/commits/main";
        fetch(apiUrl, { cache: "no-store", headers: { Accept: "application/vnd.github.v3+json" } })
            .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
            .then(function (j) {
                if (j && j.sha) {
                    resolvedCache = "https://raw.githubusercontent.com/" + m[1] + "/" + m[2] + "/" + j.sha + "/";
                    resolvedAt = Date.now();
                    cb(resolvedCache);
                } else cb(BASE);
            })
            // أي فشل (تقييد معدل الطلبات، مشكلة شبكة..) نرجع لرابط الفرع العادي
            // بدل ما نوقف التحديث بالكامل — احتياطي، مش يفترض يصير غالباً.
            .catch(function () { cb(BASE); });
    }

    function fetchText(url, cb) {
        fetch(url, { cache: "no-store" }).then(function (r) {
            if (!r.ok) throw new Error("HTTP " + r.status);
            return r.text();
        }).then(function (t) { cb(null, t); }).catch(function (e) { cb(e); });
    }

    function fetchBinary(url, cb) {
        fetch(url, { cache: "no-store" }).then(function (r) {
            if (!r.ok) throw new Error("HTTP " + r.status);
            return r.arrayBuffer();
        }).then(function (buf) { cb(null, buf); }).catch(function (e) { cb(e); });
    }

    function writeFileAt(rel, data, isBinary) {
        var full = extRoot + "/" + rel, dir = full.substring(0, full.lastIndexOf("/"));
        try { fs.mkdirSync(dir, { recursive: true }); } catch (e2) {}
        if (isBinary) fs.writeFileSync(full, Buffer.from(data));
        else fs.writeFileSync(full, data, "utf8");
    }

    function applyUpdate(remoteVer, fetchBase, done) {
        var base = fetchBase || BASE;
        var i = 0, k = 0, j = 0;
        (function nextFile() {
            if (i >= FILES.length) return nextOptional();
            var rel = FILES[i++];
            fetchText(base + rel + "?t=" + Date.now(), function (err, text) {
                if (err) return done(new Error(rel + ": " + (err.message || err)));
                try { writeFileAt(rel, text, false); } catch (e3) { return done(e3); }
                nextFile();
            });
        })();
        function nextOptional() {
            if (k >= OPTIONAL_FILES.length) return nextAsset();
            var rel = OPTIONAL_FILES[k++];
            fetchText(base + rel + "?t=" + Date.now(), function (err, text) {
                // اختياري: نتجاهل أي فشل (404 أو غيره) بصمت وما نوقف باقي التحديث.
                if (err) return nextOptional();
                try { writeFileAt(rel, text, false); } catch (e5) {}
                nextOptional();
            });
        }
        function nextAsset() {
            if (j >= ASSETS.length) { writeState(remoteVer); return done(null); }
            var rel = ASSETS[j++];
            fetchBinary(base + rel + "?t=" + Date.now(), function (err, buf) {
                // ملف الأصول ممكن ما يكون موجود بكل البناءات (مثلاً الشعار بس بنسخة كيمو)
                // فنتجاهل خطأ 404/الشبكة له بصمت وما نوقف باقي التحديث.
                if (err) return nextAsset();
                try { writeFileAt(rel, buf, true); } catch (e4) {}
                nextAsset();
            });
        }
    }

    function check(showUpToDate) {
        if (busy) return;
        if (!extRoot) {
            say("جارِ التحقق…", "muted");
            busy = true;
            getExtRoot(function (root) {
                busy = false;
                if (!root) {
                    say("تعذّر تحديد مجلد الإضافة" + (lastErr ? " (" + lastErr + ")" : "") + ".", "w");
                    return;
                }
                extRoot = root;
                stateFile = extRoot + "/update-state.json";
                localVer = readState();
                check(showUpToDate);
            });
            return;
        }
        say("جارِ التحقق…", "muted");
        resolveBase(function (fetchBase) {
            fetchText(fetchBase + "version.json?t=" + Date.now(), function (err, text) {
                if (err) { say("تعذّر الاتصال بخادم التحديثات.", "w"); return; }
                var data;
                try { data = JSON.parse(text); } catch (e) { say("ملف إصدار غير صالح على الخادم.", "w"); return; }
                if (!data || !data.version) { say("ملف إصدار ناقص على الخادم.", "w"); return; }
                var goBtn = el("upd-go"), dot = ensureDot();
                if (cmpVer(data.version, localVer) > 0) {
                    dot.hidden = false;
                    say("يوجد إصدار جديد: " + data.version + (data.notes ? " — " + data.notes : ""), "ok");
                    if (goBtn) {
                        goBtn.hidden = false;
                        goBtn.onclick = function () {
                            if (busy) return;
                            busy = true; goBtn.disabled = true;
                            say("جارِ تنزيل التحديث…", "muted");
                            // نفس الـ fetchBase (مثبّت على الـ commit SHA) المستخدم بقراءة
                            // version.json، حتى نضمن إن الملفات المنزّلة من نفس اللحظة
                            // بالضبط ومتوافقة مع الإصدار المعلن، مش نسخة أقدم أو أحدث.
                            applyUpdate(data.version, fetchBase, function (err2) {
                                busy = false; goBtn.disabled = false;
                                if (err2) { say("فشل التحديث: " + (err2.message || err2), "w"); return; }
                                localVer = data.version;
                                say("تم التحديث لإصدار " + data.version + " — جارِ إعادة التحميل…", "ok");
                                setTimeout(function () { location.reload(); }, 700);
                            });
                        };
                    }
                } else {
                    dot.hidden = true;
                    if (goBtn) goBtn.hidden = true;
                    if (showUpToDate) say("عندك آخر إصدار (" + localVer + ").", "ok");
                    else say("");
                }
            });
        });
    }

    // نربط زر "تحقق من تحديث" فوراً بغض النظر عن نجاح تحديد مجلد الإضافة، عشان الضغطة
    // دايماً تعطي رد فعل مرئي (رسالة) بدل ما تضل بدون أي استجابة لو فشل التحديد بصمت.
    var checkBtn = el("upd-check");
    if (checkBtn) checkBtn.onclick = function () { check(true); };

    getExtRoot(function (root) {
        if (!root) return; // فحص صامت فشل عند فتح اللوحة — رح نعيد المحاولة لما يضغط الزر يدوياً
        extRoot = root;
        stateFile = extRoot + "/update-state.json";
        localVer = readState();
        check(false); // فحص صامت عند فتح اللوحة
        // وفحص دوري كل 10 دقايق طول ما اللوحة مفتوحة، عشان لو نزّلنا تحديث وهو شغّال
        // عندك، تظهره النقطة الحمراء بدون ما يحتاج يسكر/يفتح اللوحة من جديد.
        setInterval(function () { check(false); }, 10 * 60 * 1000);
    });
})();
