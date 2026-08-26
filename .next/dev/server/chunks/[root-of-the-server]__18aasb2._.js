module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/newsletter/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security.ts [app-route] (ecmascript)");
;
;
;
const runtime = 'nodejs';
const OWNER_EMAIL = 'ckpmado@gmail.com';
const FROM_EMAIL = 'Portfolio <onboarding@resend.dev>';
async function POST(request) {
    const ip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClientIp"])(request.headers);
    // OWASP: throttle abusive clients.
    const limit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimit"])(`newsletter:${ip}`, {
        limit: 5,
        windowMs: 60_000
    });
    if (!limit.ok) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'rate_limited'
        }, {
            status: 429,
            headers: {
                'Retry-After': String(limit.retryAfter)
            }
        });
    }
    // OWASP: only accept the content type we expect.
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'invalid_request'
        }, {
            status: 415
        });
    }
    let body;
    try {
        body = await request.json();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'invalid_request'
        }, {
            status: 400
        });
    }
    const data = body ?? {};
    // Honeypot: real users never fill this hidden field.
    if (typeof data.website === 'string' && data.website.trim() !== '') {
        // Pretend success so bots get no signal.
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    }
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidEmail"])(email)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'invalid_email'
        }, {
            status: 400
        });
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.log('[v0] RESEND_API_KEY is not set — cannot send newsletter email');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'server_error'
        }, {
            status: 500
        });
    }
    const safeEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeHtml"])(email);
    try {
        const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](apiKey);
        await resend.emails.send({
            from: FROM_EMAIL,
            to: OWNER_EMAIL,
            replyTo: email,
            subject: 'New newsletter subscription',
            html: `<h2>New newsletter subscriber</h2>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>IP:</strong> ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeHtml"])(ip)}</p>
             <p><strong>Date:</strong> ${new Date().toISOString()}</p>`
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    } catch (error) {
        console.log('[v0] Newsletter send failed:', error.message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'server_error'
        }, {
            status: 500
        });
    }
}
function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'method_not_allowed'
    }, {
        status: 405
    });
}
}),
"[project]/lib/security.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "escapeHtml",
    ()=>escapeHtml,
    "getClientIp",
    ()=>getClientIp,
    "isValidEmail",
    ()=>isValidEmail,
    "rateLimit",
    ()=>rateLimit,
    "sanitizeText",
    ()=>sanitizeText
]);
;
const buckets = new Map();
function rateLimit(key, { limit, windowMs }) {
    const now = Date.now();
    const bucket = buckets.get(key);
    if (!bucket || now > bucket.resetAt) {
        buckets.set(key, {
            count: 1,
            resetAt: now + windowMs
        });
        return {
            ok: true,
            retryAfter: 0
        };
    }
    if (bucket.count >= limit) {
        return {
            ok: false,
            retryAfter: Math.ceil((bucket.resetAt - now) / 1000)
        };
    }
    bucket.count += 1;
    return {
        ok: true,
        retryAfter: 0
    };
}
// Periodically drop stale buckets to avoid unbounded growth.
if (typeof globalThis !== 'undefined') {
    const g = globalThis;
    if (!g.__rlCleanup) {
        g.__rlCleanup = true;
        setInterval(()=>{
            const now = Date.now();
            for (const [key, bucket] of buckets){
                if (now > bucket.resetAt) buckets.delete(key);
            }
        }, 10 * 60 * 1000).unref?.();
    }
}
function getClientIp(headers) {
    const forwarded = headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return headers.get('x-real-ip')?.trim() || 'unknown';
}
// ---------------------------------------------------------------------------
// Validation & sanitization.
// ---------------------------------------------------------------------------
// RFC-5322-ish, intentionally conservative. Caps length to avoid ReDoS.
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
function isValidEmail(value) {
    return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value.trim());
}
function sanitizeText(value, maxLength) {
    if (typeof value !== 'string') return '';
    return value// eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
}
function escapeHtml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__18aasb2._.js.map