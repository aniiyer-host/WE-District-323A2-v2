import express from 'express';
import { Resend } from 'resend';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;       // your gmail - receives all submissions
const FROM_EMAIL  = process.env.RESEND_FROM_EMAIL; // must be verified in Resend dashboard

// ── POST /api/email/contact ───────────────────────────────────────────────────
router.post('/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, subject and message are required.' });
    }

    try {
        // 1. Notify admin
        await resend.emails.send({
            from: FROM_EMAIL,
            to:   ADMIN_EMAIL,
            replyTo: email,
            subject: `[Contact Form] ${subject}`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
                    <h2 style="color:#7c3aed;margin-bottom:4px">New Contact Message</h2>
                    <p style="color:#6b7280;font-size:14px;margin-top:0">WE District 323 A2 — Contact Form</p>
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
                    <table style="width:100%;font-size:15px;border-collapse:collapse">
                        <tr><td style="padding:6px 0;color:#6b7280;width:100px">Name</td><td style="padding:6px 0;font-weight:600">${name}</td></tr>
                        <tr><td style="padding:6px 0;color:#6b7280">Email</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#7c3aed">${email}</a></td></tr>
                        <tr><td style="padding:6px 0;color:#6b7280">Phone</td><td style="padding:6px 0">${phone || '—'}</td></tr>
                        <tr><td style="padding:6px 0;color:#6b7280">Subject</td><td style="padding:6px 0">${subject}</td></tr>
                    </table>
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
                    <p style="color:#6b7280;font-size:13px;margin-bottom:6px">Message</p>
                    <p style="background:#f9fafb;padding:16px;border-radius:8px;line-height:1.6;white-space:pre-wrap">${message}</p>
                </div>
            `,
        });

        // 2. Auto-reply to sender
        await resend.emails.send({
            from: FROM_EMAIL,
            to:   email,
            subject: `We received your message — WE District 323 A2`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
                    <h2 style="color:#7c3aed">Thank you, ${name}!</h2>
                    <p style="color:#374151;line-height:1.6">
                        We've received your message and will get back to you as soon as possible, usually within 1–2 business days.
                    </p>
                    <div style="background:#f5f3ff;border-left:4px solid #7c3aed;padding:16px;border-radius:6px;margin:20px 0">
                        <p style="margin:0;color:#6b7280;font-size:13px">Your message</p>
                        <p style="margin:8px 0 0;font-weight:600">${subject}</p>
                    </div>
                    <p style="color:#6b7280;font-size:13px;margin-top:24px">
                        WE District 323 A2 — Women Epitome of Service<br/>
                        <a href="mailto:${ADMIN_EMAIL}" style="color:#7c3aed">${ADMIN_EMAIL}</a>
                    </p>
                </div>
            `,
        });

        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        console.error('Contact email error:', err);
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
    }
});

// ── POST /api/email/membership ────────────────────────────────────────────────
router.post('/membership', async (req, res) => {
    const { name, email, phone, clubName, message } = req.body;

    if (!name || !email || !clubName) {
        return res.status(400).json({ success: false, message: 'Name, email and club are required.' });
    }

    try {
        // 1. Notify admin
        await resend.emails.send({
            from: FROM_EMAIL,
            to:   ADMIN_EMAIL,
            replyTo: email,
            subject: `[Membership Enquiry] ${name} — ${clubName}`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
                    <h2 style="color:#db2777;margin-bottom:4px">New Membership Enquiry</h2>
                    <p style="color:#6b7280;font-size:14px;margin-top:0">WE District 323 A2 — Membership Form</p>
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
                    <table style="width:100%;font-size:15px;border-collapse:collapse">
                        <tr><td style="padding:6px 0;color:#6b7280;width:100px">Name</td><td style="padding:6px 0;font-weight:600">${name}</td></tr>
                        <tr><td style="padding:6px 0;color:#6b7280">Email</td><td style="padding:6px 0"><a href="mailto:${email}" style="color:#db2777">${email}</a></td></tr>
                        <tr><td style="padding:6px 0;color:#6b7280">Phone</td><td style="padding:6px 0">${phone || '—'}</td></tr>
                        <tr><td style="padding:6px 0;color:#6b7280">Club</td><td style="padding:6px 0;font-weight:600">${clubName}</td></tr>
                    </table>
                    ${message ? `
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
                    <p style="color:#6b7280;font-size:13px;margin-bottom:6px">Message</p>
                    <p style="background:#f9fafb;padding:16px;border-radius:8px;line-height:1.6;white-space:pre-wrap">${message}</p>
                    ` : ''}
                </div>
            `,
        });

        // 2. Auto-reply to enquirer
        await resend.emails.send({
            from: FROM_EMAIL,
            to:   email,
            subject: `Your membership enquiry — WE District 323 A2`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
                    <h2 style="color:#db2777">Thank you for your interest, ${name}!</h2>
                    <p style="color:#374151;line-height:1.6">
                        We've received your membership enquiry for <strong>${clubName}</strong>.
                        Our team will review it and reach out to you shortly.
                    </p>
                    <div style="background:#fdf2f8;border-left:4px solid #db2777;padding:16px;border-radius:6px;margin:20px 0">
                        <p style="margin:0;color:#374151;line-height:1.6">
                            In the meantime, feel free to explore our website to learn more about the work our clubs do across Mumbai, Navi Mumbai and Thane.
                        </p>
                    </div>
                    <p style="color:#6b7280;font-size:13px;margin-top:24px">
                        WE District 323 A2 — Women Epitome of Service<br/>
                        <a href="mailto:${ADMIN_EMAIL}" style="color:#db2777">${ADMIN_EMAIL}</a>
                    </p>
                </div>
            `,
        });

        res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });
    } catch (err) {
        console.error('Membership email error:', err);
        res.status(500).json({ success: false, message: 'Failed to send enquiry. Please try again.' });
    }
});

export default router;