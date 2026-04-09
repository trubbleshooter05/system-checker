export function immediateSaveEmailHtml(params: { dogName: string; summary: string; appUrl: string }) {
  return `
  <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
    <h2>Your symptom check has been saved</h2>
    <p>Here is a quick summary for <strong>${params.dogName}</strong>:</p>
    <blockquote style="border-left:4px solid #0ea5e9;padding-left:12px;margin:16px 0;color:#334155">
      ${params.summary}
    </blockquote>
    <p>We will send a 48-hour follow-up reminder to re-check progress.</p>
    <p><a href="${params.appUrl}/dog-shaking-not-eating">Run another check</a></p>
    <p style="font-size:12px;color:#64748b">This tool is informational and not a diagnosis. Contact your vet for urgent concerns.</p>
  </div>`;
}

export function followUpEmailHtml(params: { dogName: string; appUrl: string }) {
  return `
  <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
    <h2>48-hour follow-up for ${params.dogName}</h2>
    <p>How is your dog doing now?</p>
    <p>Use the same structured check to compare symptoms and urgency.</p>
    <p><a href="${params.appUrl}/dog-shaking-not-eating">Re-check symptoms now</a></p>
    <p style="font-size:12px;color:#64748b">If your dog has severe symptoms (trouble breathing, collapse, persistent vomiting), call your vet immediately.</p>
  </div>`;
}
