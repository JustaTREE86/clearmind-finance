import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { firstName, lastName, name, email, phone, financeType, loanAmount, employment, notes, source, amount, rate, term, monthly } = req.body
  const displayName = firstName ? `${firstName} ${lastName}` : name

  try {
    // Notify Josh
    await resend.emails.send({
      from: 'leads@clearmindfinance.com.au',
      to: 'joshmarien@outlook.com',
      reply_to: email,
      subject: `New lead — ${displayName} | ${financeType || source}`,
      html: `
        <h2>New ClearMind Finance Lead</h2>
        <p><strong>Name:</strong> ${displayName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Finance Type:</strong> ${financeType || 'N/A'}</p>
        <p><strong>Loan Amount:</strong> ${loanAmount || 'N/A'}</p>
        <p><strong>Employment:</strong> ${employment || 'N/A'}</p>
        <p><strong>Notes:</strong> ${notes || 'None'}</p>
        <p><strong>Source:</strong> ${source}</p>
        ${monthly ? `<p><strong>Calculator:</strong> $${amount} @ ${rate}% over ${term}mo = $${monthly}/mo</p>` : ''}
      `,
    })

    // Auto-reply to lead
    await resend.emails.send({
      from: 'josh@clearmindfinance.com.au',
      to: email,
      reply_to: 'josh@clearmindfinance.com.au',
      subject: "Got your enquiry — I'll be in touch shortly",
      html: `
        <p>Hi ${displayName?.split(' ')[0] || 'there'},</p>
        <p>Thanks for reaching out to ClearMind Finance.</p>
        <p>I've received your details and will be in touch within 1 business day — usually much faster.</p>
        <p>In the meantime, if anything changes or you have a question, just reply to this email.</p>
        <br/>
        <p><strong>Josh</strong><br/>ClearMind Finance</p>
        <p style="font-size:12px;color:#888;">Educate. Navigate. Elevate.</p>
      `,
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send' })
  }
}
