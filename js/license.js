// نسخة "الخام" الخاصة — كيمو
// يخلي وضع الخام هو الوحيد الظاهر (يخبي تبويبات الفيديوغراف/الاقتباس/الريل).
// ملاحظة: نظام قفل الجهاز/رمز التفعيل انشال بالكامل بناءً على طلب المطوّر —
// صار بيسبب مشاكل متكررة (طلب كود جديد كل شوي)، فهاد الملف هلق بس بيفرض وضع الخام.
(function () {
    "use strict";

    // يخبي باقي التبويبات ويفرض وضع الخام دايماً
    try {
        localStorage.setItem("sb.mode", "raw");
        var st = document.createElement("style");
        st.textContent = '#modes button[data-mode="vg"], #modes button[data-mode="quote"], #modes button[data-mode="reel"] { display:none !important; }';
        document.head.appendChild(st)
    } catch (e) {}
})();
