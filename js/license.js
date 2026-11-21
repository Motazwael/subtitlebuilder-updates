// نسخة "الخام" الخاصة — كيمو
// 1) يخلي وضع الخام هو الوحيد الظاهر (يخبي تبويبات الفيديوغراف/الاقتباس/الريل).
// 2) يقفل الإضافة على هذا الجهاز بالذات: ما تشتغل إلا برمز تفعيل مبني على بصمة هذا الجهاز.
//    البصمة = اسم الجهاز + أول MAC address + نظام التشغيل، مُلخّصة بـ SHA-256.
//    الرمز الصحيح = HMAC-SHA256(SECRET, البصمة) — بدون معرفة SECRET ما حدا غير اللي معه السكربت
//    generate_serial.js (خارج الإضافة) يقدر يحسب رمز صحيح لأي جهاز.
(function () {
    "use strict";

    // لو ما قدرنا نتحقق من الجهاز (مثلاً انفتحت بمتصفح عادي بدل ما تنفتح من جوا بريمير)
    // نقفل الإضافة بالكامل بدل ما نسيبها تشتغل بدون تفعيل.
    function showBlocked(msg) {
        function render() {
            var ov = document.createElement("div");
            ov.id = "lic-block";
            ov.style.cssText = "position:fixed;inset:0;background:#0b0b0d;color:#eee;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;direction:rtl;text-align:center;font-family:inherit";
            ov.innerHTML = '<h2 style="margin:0 0 6px">نسخة خاصة — KEMOO</h2><p style="max-width:320px">' + msg + "</p>";
            document.body.appendChild(ov)
        }
        document.body ? render() : document.addEventListener("DOMContentLoaded", render)
    }

    var os, crypto;
    try {
        os = require("os"), crypto = require("crypto");
    } catch (e) {
        showBlocked("تعذّر التحقق من هذا الجهاز. تأكد إنك فاتح الإضافة من جوا بريمير برو (Window ← Extensions ← Subtitle Builder RAW (Kimo))، مش بفتح ملف index.html مباشرة بمتصفح عادي.");
        return;
    }

    // غيّر هاد النص لأي شيء تحبه — بس خليه نفسه بالضبط بملف generate_serial.js المرفق
    var SECRET = "Kimo-SubtitleBuilder-2026";

    function machineId() {
        var nets = {};
        try { nets = os.networkInterfaces() || {}; } catch (e) {}
        var mac = "";
        Object.keys(nets).sort().some(function (name) {
            return (nets[name] || []).some(function (ni) {
                if (ni && ni.mac && ni.mac !== "00:00:00:00:00:00" && !ni.internal) {
                    return mac = ni.mac, !0
                }
                return !1
            })
        });
        var raw = [os.hostname(), mac, os.platform(), os.arch()].join("|");
        return crypto.createHash("sha256").update(raw).digest("hex").slice(0, 16).toUpperCase()
    }

    function expectedSerial(id) {
        return crypto.createHmac("sha256", SECRET).update(id).digest("hex").slice(0, 16).toUpperCase()
    }

    function fmtGroups(s) {
        return (s.match(/.{1,4}/g) || [s]).join("-")
    }

    function clean(s) {
        return String(s || "").replace(/[\s-]/g, "").toUpperCase()
    }

    // يخبي باقي التبويبات ويفرض وضع الخام دايماً، بغض النظر عن التفعيل
    try {
        localStorage.setItem("sb.mode", "raw");
        var st = document.createElement("style");
        st.textContent = '#modes button[data-mode="vg"], #modes button[data-mode="quote"], #modes button[data-mode="reel"] { display:none !important; }';
        document.head.appendChild(st)
    } catch (e) {}

    // نحفظ رمز التفعيل بملف على القرص (بمجلد المستخدم) بدل localStorage — لأن
    // localStorage داخل لوحات CEP (ملفات file://) ما بتنضمن إنها تضل محفوظة بعد
    // إغلاق بريمير بالكامل وفتحه من جديد، وهاد سبب ظهور طلب الكود كل مرة.
    var LS_KEY = "sb.rawkimo.serial", id = machineId(), licFile = "";
    try { licFile = (os.homedir() + "/.subtitlebuilder/kimo-license.json").replace(/\\/g, "/"); } catch (e) {}

    function readStoredSerial() {
        var fs;
        try { fs = require("fs"); } catch (e) { return ""; }
        try {
            var obj = JSON.parse(fs.readFileSync(licFile, "utf8"));
            if (obj && obj.serial) return obj.serial;
        } catch (e) {}
        // احتياط: لو كان محفوظ سابقاً بـ localStorage فقط (نسخة أقدم)، نقراه ونرحّله للملف.
        try {
            var old = localStorage.getItem(LS_KEY) || "";
            if (old) return old;
        } catch (e) {}
        return "";
    }

    function writeStoredSerial(v) {
        try { localStorage.setItem(LS_KEY, v); } catch (e) {}
        var fs;
        try { fs = require("fs"); } catch (e) { return; }
        try {
            var dir = licFile.substring(0, licFile.lastIndexOf("/"));
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(licFile, JSON.stringify({ serial: v }), "utf8");
        } catch (e) {}
    }

    var stored = readStoredSerial();
    if (stored && clean(stored) === expectedSerial(id)) return; // مفعّلة أصلاً على هذا الجهاز

    function showGate() {
        var ov = document.createElement("div");
        ov.id = "lic-gate";
        ov.style.cssText = "position:fixed;inset:0;background:#0b0b0d;color:#eee;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;direction:rtl;text-align:center;font-family:inherit";
        ov.innerHTML =
            '<h2 style="margin:0 0 6px">نسخة خاصة — KEMOO</h2>' +
            '<p class="muted" style="max-width:300px;margin:0 0 10px">هالجهاز محتاج رمز تفعيل. ابعت الكود التالي للمطوّر:</p>' +
            '<div id="lic-id" style="font-family:monospace;font-size:18px;letter-spacing:1px;background:#1a1a1d;padding:10px 16px;border-radius:8px;margin-bottom:14px;direction:ltr">' + fmtGroups(id) + "</div>" +
            '<input id="lic-input" type="text" placeholder="رمز التفعيل" dir="ltr" style="text-align:center;font-family:monospace;font-size:16px;padding:8px;border-radius:6px;border:1px solid #444;background:#111;color:#eee;width:220px;margin-bottom:10px;box-sizing:border-box">' +
            '<button id="lic-go" class="pill primary" style="padding:8px 22px;cursor:pointer">تفعيل</button>' +
            '<div id="lic-err" style="color:#ff8a80;margin-top:10px;min-height:18px"></div>';
        document.body.appendChild(ov);
        document.getElementById("lic-go").onclick = function () {
            var v = clean(document.getElementById("lic-input").value);
            if (v && v === expectedSerial(id)) {
                writeStoredSerial(v);
                ov.remove()
            } else {
                document.getElementById("lic-err").textContent = "الرمز غير صحيح لهذا الجهاز."
            }
        };
        document.getElementById("lic-input").addEventListener("keydown", function (e) {
            "Enter" === e.key && document.getElementById("lic-go").click()
        })
    }
    document.body ? showGate() : document.addEventListener("DOMContentLoaded", showGate)
})();
