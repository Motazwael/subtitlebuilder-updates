! function(e) {
    "use strict";
    var r = ["", "واحد", "اثنين", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة", "أحد عشر", "اثني عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"],
        n = ["", "", "عشرين", "ثلاثين", "أربعين", "خمسين", "ستين", "سبعين", "ثمانين", "تسعين"],
        t = ["", "مئة", "مئتين", "ثلاثمئة", "أربعمئة", "خمسمئة", "ستمئة", "سبعمئة", "ثمانمئة", "تسعمئة"];

    function o(e) {
        var o = [],
            u = Math.floor(e / 100),
            i = e % 100;
        if (u && o.push(t[u]), i)
            if (i < 20) o.push(r[i]);
            else {
                var s = i % 10,
                    f = Math.floor(i / 10);
                s ? (o.push(r[s]), o.push(n[f])) : o.push(n[f])
            } return o.join(" و")
    }

    function u(e, r, n, t, u) {
        return 1 === e ? r : 2 === e ? n : e >= 3 && e <= 10 ? o(e) + " " + t : o(e) + " " + u
    }

    function i(e) {
        if (0 === e) return "صفر";
        var r = [],
            n = Math.floor(e / 1e9),
            t = Math.floor(e % 1e9 / 1e6),
            i = Math.floor(e % 1e6 / 1e3),
            s = e % 1e3;
        return n && r.push(u(n, "مليار", "ملياران", "مليارات", "مليار")), t && r.push(u(t, "مليون", "مليونين", "ملايين", "مليون")), i && r.push(u(i, "ألف", "ألفين", "آلاف", "ألف")), s && r.push(o(s)), r.join(" و")
    }
    var s = {
        toWords: i,
        spoken: function(e) {
            var n = /^[^\d٠-٩]*([\d٠-٩][\d٠-٩,٬]*(?:[.٫][\d٠-٩]+)?)[^\d٠-٩]*$/.exec(e);
            if (!n) return null;
            var t, o = (t = n[1], t.replace(/[٠-٩]/g, function(e) {
                return String(e.charCodeAt(0) - 1632)
            })).replace(/[,٬]/g, "").replace("٫", ".").split(".");
            if (o[0].length > 12) return null;
            var u = i(parseInt(o[0], 10));
            return o[1] && (u += " فاصل " + o[1].split("").map(function(e) {
                return "0" === e ? "صفر" : r[+e]
            }).join(" ")), /%|٪/.test(e) && (u += " في المئة"), u.split(/\s+/).filter(Boolean)
        }
    };
    e.SubNum = s, "undefined" != typeof module && module.exports && (module.exports = s)
}("undefined" != typeof window ? window : this);