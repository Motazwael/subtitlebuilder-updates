function CSInterface() {}
CSInterface.prototype.evalScript = function(e, n) {
    window.__adobe_cep__.evalScript(e, n || function() {})
};
// SystemPath.EXTENSION + getSystemPath: طريقة أدوبي الرسمية لمعرفة مسار مجلد الإضافة
// مباشرة من CEP نفسه، بدون المرور بمحرّك الإكستند سكريبت (jsx) إطلاقاً — أوثق وأسرع
// من استدعاء دالة jsx عبر evalScript، ومش عرضة لمشاكل تحميل/تخزين مؤقت لملفات الـ jsx.
var SystemPath = { EXTENSION: "extension" };
CSInterface.prototype.getSystemPath = function(pathType) {
    try {
        var raw = window.__adobe_cep__.getSystemPath(pathType);
        var obj = JSON.parse(raw);
        return obj && obj.path ? decodeURI(obj.path) : null;
    } catch (e) { return null; }
};