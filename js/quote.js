! function (g) {
    "use strict";

    var LABELS = [
        ["title", /^(?:الثامبنيل|الثمبنيل|ثامبنيل|ثمبنيل|الصورة\s*المصغرة|Thumbnail)(?:\s*(?:و|and|&)?\s*(?:العنوان\s*الرئيسي|Main\s*title|Headline|Title)?)?$|^(?:العنوان\s*الرئيسي|العنوان\s*الرئيسى|عنوان\s*رئيسي|الرئيسي|العنوان|عنوان|Main\s*title|Headline|Title|H1)$/i],
        ["sub", /^(?:العنوان\s*الفرعي|العنوان\s*الفرعى|عنوان\s*فرعي|عنوان\s*ثانوي|الفرعي|Sub\s*-?\s*title|Sub\s*-?\s*heading|Subhead(?:ing)?|H2)$/i],
        ["src", /^(?:المصدر|Source)$/i],
        ["loc", /^(?:الموقع|المكان|مكان|اللوكيشن|لوكيشن|المدينة|Location|Place)$/i],
        ["link", /^(?:رابط\s*الفيديو|الرابط|رابط|اللينك|الخامة|Video\s*link|Video|Link|URL)$/i],
        ["speaker", /^(?:المتحدثة|المتحدث|المتكلمة|المتكلم|الضيفة|الضيف|اسم\s*الضيف(?:ة)?|Speaker|Guest)$/i],
        ["desc", /^(?:التوصيف|توصيف|ملاحظات|ملاحظة|Description|Notes?)$/i],
        ["caption", /^(?:الكابشن|كابشن|Caption)$/i],
        ["sabtitle", /^(?:ال)?(?:سابتيتل|ساب\s*تايتل|سب\s*تايتل|سبتايتل)$|^Subtitle$/i]
    ];
    var HOOK_RE = /^هوك\s*:?\s*$|^Hook\s*:?\s*$/i;
    var BULLET_RE = /^[-–—]\s*$/;
    var SKIP = /^#?\s*(?:فيديو|Video)\s*#?$/i;
    // a "mm:ss – mm:ss" range header is sometimes followed, on the same line, by "— SpeakerName"
    // (e.g. "11:55 – 12:02 — المحاور") — that trailing bit is just who's talking, not part of the range.
    // The last cue of a clip sometimes has no real end timestamp and writes "نهاية المقطع"/"end" instead —
    // toSec() already returns null for that non-numeric text, so the normal "no explicit end, estimate
    // from word count" fallback below picks it up automatically.
    var RANGE_RE = /^(\d{1,2}(?::\d{2}){0,2})\s*(?:[-–—~]|الى|إلى|حتى)\s*(\d{1,2}(?::\d{2}){0,2}|نهاية(?:\s*(?:المقطع|الفيديو|السؤال))?|end(?:\s*of\s*(?:clip|video))?)(?:\s*[-–—]\s*\S.*)?$/i;
    var TS_RE = /^(\d{1,2}(?::\d{2}){1,2})(?:[.,]\d+)?$/;
    // some editors write "mm:ss <text>" on one line instead of the timestamp alone on its own line.
    var TS_TEXT_RE = /^(\d{1,2}(?::\d{2}){1,2})(?:[.,]\d+)?\s+(\S.*)$/;
    // "mm:ss - mm:ss: text" — a range and its already-translated Arabic text combined on one line (no
    // separate original-language line at all, since the editor typed the exact times by hand).
    var RANGE_TEXT_RE = /^(\d{1,2}(?::\d{2}){0,2})\s*(?:[-–—~]|الى|إلى|حتى)\s*(\d{1,2}(?::\d{2}){0,2})\s*[:：]\s*(\S.*)$/;
    // letters unique to Farsi/Urdu/Pashto (پ چ ژ گ) that never appear in standard Arabic — a line that
    // has them is the original spoken language, not the Arabic translation, even though it's written
    // in Arabic script too. Combined with a Latin-letter check this tells "original language line(s)
    // to discard" apart from "Arabic translation line(s) to keep" regardless of which language the
    // guest actually spoke (English, Farsi, or anything else).
    var FARSI_MARK_RE = /[پچژگ]/;

    function isForeignLine(s) {
        var str = String(s);
        if (FARSI_MARK_RE.test(str)) return true;
        var lat = (str.match(/[A-Za-z]/g) || []).length;
        var ar = (str.match(/[؀-ۿ]/g) || []).length;
        return lat > 0 && lat >= ar;
    }

    function toSec(s) {
        var p = String(s).trim().replace(",", ".").split(":").map(Number);
        if (p.some(isNaN)) return null;
        return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p.length === 2 ? p[0] * 60 + p[1] : p[0];
    }

    function matchLabel(line) {
        var t = line.trim().replace(/[:：]\s*$/, "");
        for (var i = 0; i < LABELS.length; i++) if (LABELS[i][1].test(t)) return LABELS[i][0];
        return null;
    }

    // Parses one quote-video script block. Returns:
    // { title, source, location, link, timeRange:{from,to}|null, guestName, guestTitle, caption, lines:[{start,end,text}] }
    function parse(raw) {
        var rawLines = String(raw || "").replace(/\r\n?/g, "\n").split("\n");
        var lines = rawLines.map(function (l) { return l.trim(); });
        var n = lines.length;
        var out = { title: "", source: "", location: "", link: "", timeRange: null, guestName: "", guestTitle: "", caption: "", hook: null, lines: [] };
        var i = 0;

        function nextNonEmpty(from) {
            var j = from;
            while (j < n && !lines[j]) j++;
            return j;
        }

        // a pasted-from-doc line can keep its markdown link form "[label](url)" (e.g. an Instagram handle
        // that was a hyperlink in the source doc) instead of plain text. For most fields we want the
        // readable label ("ahmad_darawshe"); for the link field itself we want the url instead.
        var MD_LINK_RE = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/;

        function unwrapMdLink(s, wantUrl) {
            var mm = MD_LINK_RE.exec(String(s).trim());
            return mm ? mm[wantUrl ? 2 : 1].trim() : s;
        }

        // some fields (title especially) are written across several consecutive lines on purpose (each
        // line its own display line) rather than one single line — collect every non-empty line right
        // after the label, stopping at the first blank line, the next recognized label, or a time range.
        function collectValue(from, wantUrl) {
            var v1 = nextNonEmpty(from);
            if (v1 >= n || matchLabel(lines[v1]) || SKIP.test(lines[v1])) return { val: "", next: v1 };
            var vals = [unwrapMdLink(lines[v1], wantUrl)], k = v1 + 1;
            while (k < n && lines[k] && !matchLabel(lines[k]) && !SKIP.test(lines[k]) && !RANGE_RE.test(lines[k])) { vals.push(unwrapMdLink(lines[k], wantUrl)), k++; }
            return { val: vals.join("\n"), next: k };
        }

        while (i < n) {
            var line = lines[i];
            if (!line) { i++; continue; }
            if (SKIP.test(line)) { i++; continue; }
            if (RANGE_RE.test(line)) {
                var m = RANGE_RE.exec(line);
                out.timeRange = { from: toSec(m[1]), to: toSec(m[2]) };
                i++; continue;
            }
            var lab = matchLabel(line);
            if (lab === "sabtitle") {
                i++;
                // three supported block shapes inside سابتيتل:
                //  1) single timestamp, then one text line (original shape)
                //  2) a "mm:ss – mm:ss" range, then an original-language line (discarded),
                //     then one or more already-split Arabic lines until the next timestamp/range
                //  3) "mm:ss <text>" combined on one line — the timestamp and its text together
                while (i < n) {
                    var j = nextNonEmpty(i);
                    if (j >= n) break;
                    var rm = RANGE_RE.exec(lines[j]);
                    if (rm) {
                        var bStart = toSec(rm[1]), bEnd = toSec(rm[2]);
                        var p = nextNonEmpty(j + 1);
                        // the original (non-Arabic) line right after the range header — discard it. It can wrap
                        // across several lines (English, Farsi, or anything else), so keep skipping while the
                        // line still looks foreign, not just the first one.
                        while (p < n && lines[p] && !RANGE_RE.test(lines[p]) && !TS_RE.test(lines[p]) && isForeignLine(lines[p])) p = nextNonEmpty(p + 1);
                        var collected = [];
                        while (p < n && lines[p] && !RANGE_RE.test(lines[p]) && !TS_RE.test(lines[p])) { collected.push(lines[p]); p = p + 1; }
                        if (collected.length) out.lines.push({ start: bStart, end: bEnd, text: collected.join(" ") });
                        i = p;
                        continue;
                    }
                    var rtm = RANGE_TEXT_RE.exec(lines[j]);
                    if (rtm) {
                        out.lines.push({ start: toSec(rtm[1]), end: toSec(rtm[2]), text: rtm[3].trim() });
                        i = nextNonEmpty(j + 1);
                        continue;
                    }
                    var tm = TS_TEXT_RE.exec(lines[j]);
                    if (tm) {
                        var tStart = toSec(tm[1]), tText = [tm[2]];
                        var tp = nextNonEmpty(j + 1);
                        while (tp < n && lines[tp] && !TS_TEXT_RE.test(lines[tp]) && !TS_RE.test(lines[tp]) && !RANGE_RE.test(lines[tp]) && !matchLabel(lines[tp])) { tText.push(lines[tp]); tp = tp + 1; }
                        out.lines.push({ start: tStart, text: tText.join(" ") });
                        i = tp;
                        continue;
                    }
                    if (!TS_RE.test(lines[j])) {
                        // a recognized label ends the سابتيتل block (e.g. "الكابشن" right after it) — anything
                        // else that isn't a timestamp/range/label is just noise between cues, skip it one line at a time.
                        if (matchLabel(lines[j])) { i = j; break; }
                        i = j + 1; continue;
                    }
                    var start = toSec(lines[j]);
                    // collect every following line (one phrase per line is common) until the next timestamp/range/label
                    var kk = nextNonEmpty(j + 1), collected2 = [];
                    while (kk < n && lines[kk] && !TS_RE.test(lines[kk]) && !RANGE_RE.test(lines[kk]) && !matchLabel(lines[kk])) { collected2.push(lines[kk]); kk = kk + 1; }
                    out.lines.push({ start: start, text: collected2.join(" ") });
                    i = kk;
                }
                continue;
            }
            if (lab) {
                var v1 = nextNonEmpty(i + 1);
                var val = v1 < n && !matchLabel(lines[v1]) && !SKIP.test(lines[v1]) ? lines[v1] : "";
                if (lab === "title") { var cvT = collectValue(i + 1); out.title = cvT.val; i = cvT.next; }
                // "العنوان الفرعي" is intentionally ignored for quote mode (no subtitle) — but when it has no
                // content under it, v1 is really the NEXT label (e.g. "المصدر" right after it with no blank
                // line in between); don't swallow that label's line, just move on to it.
                else if (lab === "sub") i = (v1 < n && !matchLabel(lines[v1]) && !SKIP.test(lines[v1])) ? v1 + 1 : v1;
                else if (lab === "src") { var cvS = collectValue(i + 1); out.source = cvS.val; i = cvS.next; }
                else if (lab === "loc") { var cvL = collectValue(i + 1); out.location = cvL.val; i = cvL.next; }
                else if (lab === "link") { var cvK = collectValue(i + 1, !0); out.link = cvK.val; i = cvK.next; }
                else if (lab === "caption") { var cvC = collectValue(i + 1); out.caption = cvC.val; i = cvC.next; }
                else if (lab === "speaker") {
                    // a dedicated "المتحدثة/المتحدث" label — guest name then, on the next line, their title.
                    // Same care: don't step past the next label if either line has no real content under it.
                    out.guestName = val;
                    if (v1 >= n || matchLabel(lines[v1]) || SKIP.test(lines[v1])) { i = v1; } else {
                        var sv2 = nextNonEmpty(v1 + 1);
                        if (sv2 < n && !matchLabel(lines[sv2]) && !SKIP.test(lines[sv2])) { out.guestTitle = lines[sv2]; i = sv2 + 1; } else { out.guestTitle = ""; i = sv2; }
                    }
                } else if (lab === "desc") {
                    // "ملاحظات"/"التوصيف" means different things per editor: sometimes it's empty (just a
                    // separator some editors leave in, with a dedicated "المتحدثة" label doing the actual
                    // name+title job right after it), sometimes it's guest name+title itself (two short
                    // lines), sometimes a hook block ("هوك:" + its own timestamp + quote lines, then
                    // free-form "-" bulleted production notes to ignore). Detect which shape this is by
                    // what follows.
                    if (v1 >= n || matchLabel(lines[v1])) {
                        // nothing under it — another label starts right away; don't swallow its content
                        i = v1;
                    } else if (HOOK_RE.test(lines[v1])) {
                        var hp = nextNonEmpty(v1 + 1);
                        if (hp < n && TS_RE.test(lines[hp])) {
                            var hStart = toSec(lines[hp]);
                            var hq = nextNonEmpty(hp + 1), hCollected = [];
                            while (hq < n && lines[hq] && !TS_RE.test(lines[hq]) && !RANGE_RE.test(lines[hq]) && !BULLET_RE.test(lines[hq]) && !matchLabel(lines[hq])) { hCollected.push(lines[hq]); hq = hq + 1; }
                            out.hook = { start: hStart, text: hCollected.join(" ") };
                            i = hq;
                        } else i = hp; // "هوك:" with no timestamp after it — bail out, skip past it
                        // skip any remaining free-form "-" bulleted production notes until the next label
                        while (i < n) {
                            var skipLn = nextNonEmpty(i);
                            if (skipLn >= n) { i = n; break; }
                            if (matchLabel(lines[skipLn]) || RANGE_RE.test(lines[skipLn])) { i = skipLn; break; }
                            i = skipLn + 1;
                        }
                    } else {
                        out.guestName = val;
                        var v2 = v1 < n ? nextNonEmpty(v1 + 1) : n;
                        out.guestTitle = v2 < n && !matchLabel(lines[v2]) && !SKIP.test(lines[v2]) ? lines[v2] : "";
                        i = v2 < n ? v2 + 1 : n;
                        // skip any remaining free-form "-" bulleted production notes until the next label
                        while (i < n) {
                            var skipLn2 = nextNonEmpty(i);
                            if (skipLn2 >= n) { i = n; break; }
                            if (matchLabel(lines[skipLn2]) || RANGE_RE.test(lines[skipLn2])) { i = skipLn2; break; }
                            i = skipLn2 + 1;
                        }
                    }
                } else i++;
                continue;
            }
            i++;
        }
        // end time for each line = next line's start, last line gets +3s default
        // (range-block lines already carry their own explicit end — leave those as-is)
        out.lines.forEach(function (ln, idx) {
            if (ln.end != null) return;
            var nxt = out.lines[idx + 1];
            if (nxt) { ln.end = nxt.start; return; }
            if (ln.start == null) { ln.end = null; return; }
            // no next line to borrow a boundary from (last/only entry) — estimate from word count
            // instead of a flat +3s, since a multi-line block can run well past that.
            var wc = String(ln.text || "").trim().split(/\s+/).filter(Boolean).length;
            ln.end = ln.start + Math.max(3, wc / 2.6);
        });
        if (out.hook && out.hook.start != null && out.hook.text) {
            var hwc = out.hook.text.trim().split(/\s+/).filter(Boolean).length;
            out.hook.end = out.hook.start + Math.max(2, hwc / 2.6);
        }
        return out;
    }

    g.SubQuote = { parse: parse, toSec: toSec };
    "undefined" != typeof module && module.exports && (module.exports = g.SubQuote);
}("undefined" != typeof window ? window : this);
