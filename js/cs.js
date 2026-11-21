function CSInterface() {}
CSInterface.prototype.evalScript = function(e, n) {
    window.__adobe_cep__.evalScript(e, n || function() {})
};
// SystemPath.EXTENSION + getSystemPath: طريقة أدوبي الرسمية لمعرفة مسار مجلد الإضافة
// مباشرة من CEP نفسه، بدون المرور بمحرّك الإكستند سكريبت (jsx) إطلاقاً — أوثق وأسرع
// من استدعاء دالة jsx عبر evalScript، ومش عرضة لمشاكل تحميل/تخزين مؤقت لملفات الـ jsx.
var SystemPath = { EXTENSION: "extension" };
CSInterface.prototype.getSystemPath = function(pathType) {
    // بعض إصدارات CEP بترجع مسار نصي مباشر، وبعضها بيرجع JSON فيها path — نتعامل
    // مع الحالتين، ونرمي الخطأ الحقيقي (بدل ما نبلعه) عشان يظهر بالتشخيص لو فشل.
    if (!window.__adobe_cep__ || !window.__adobe_cep__.getSystemPath) {
        throw new Error("__adobe_cep__.getSystemPath غير متوفر");
    }
    var raw = window.__adobe_cep__.getSystemPath(pathType);
    if (raw == null) throw new Error("getSystemPath رجّع قيمة فاضية");
    var path = raw;
    try {
        var obj = JSON.parse(raw);
        if (obj && obj.path) path = obj.path;
    } catch (e) { /* raw أصلاً مسار نصي عادي مش JSON — نستخدمه زي ما هو */ }
    try { path = decodeURI(path); } catch (e2) {}
    // المسار بيجي أحياناً كـ file:// URI (مثلاً file:///Library/Application Support/...)
    // ولازم نشيل الـ scheme عشان fs.readFileSync/writeFileSync تقدر تفتحه كمسار عادي.
    if (/^file:\/\//i.test(path)) {
        path = path.replace(/^file:\/\//i, "");
        if (/^\/[a-zA-Z]:/.test(path)) path = path.slice(1); // ويندوز: /C:/... -> C:/...
    }
    if (!path || typeof path !== "string") throw new Error("مسار غير صالح: " + raw);
    return path;
};