import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { MedicalDisclaimerBanner } from "@/components/MedicalDisclaimerBanner";
import { SymptomChecker } from "@/components/symptom/checker";
import {
  DOG_SHAKING_NOT_EATING_UPDATED,
  EDITORIAL_ATTRIBUTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

const pagePath = "/dog-shaking-not-eating";
const pageUrl = absoluteUrl(pagePath);
const pageTitle = "Dog Shaking and Not Eating? 7 Causes + When It's an Emergency";
const pageDescription =
  "Dog shaking and not eating can signal nausea, pain, stress, or something more serious. Review 7 possible causes, urgency signs, and when to call a vet.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "dog shaking",
    "dog not eating",
    "dog trembling",
    "when to call vet",
    "dog triage education",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: pagePath,
    type: "article",
  },
  twitter: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
  },
};

function formatDisplayDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const faqItems = [
  {
    question: "Why is my dog shaking and not eating?",
    answer:
      "Shaking (trembling) together with loss of appetite often points to discomfort: nausea, pain, fear, fever, or feeling unwell for another reason. Many issues can look similar from the outside, so this page cannot tell you which applies to your dog—only a veterinarian who examines your dog can narrow it down.",
  },
  {
    question: "When should I worry if my dog is shaking and won't eat?",
    answer:
      "Worry sooner if symptoms are severe, getting worse quickly, or paired with vomiting (especially repeated), breathing difficulty, collapse, extreme lethargy, obvious pain, bloated or painful abdomen, seizures, or if your dog is very young, very old, or has chronic illness. When in doubt, same-day veterinary advice is reasonable.",
  },
  {
    question: "Can stress cause a dog to shake and stop eating?",
    answer:
      "Yes, stress or fear can cause trembling and a reduced appetite, especially after a move, loud events, boarding, or routine changes. Stress should be a diagnosis of exclusion: if signs are strong, last more than a short time, or include other red flags, contact your veterinarian rather than assuming it is only stress.",
  },
  {
    question: "Should I wait or call a vet now?",
    answer:
      "Call now or seek emergency care for breathing problems, collapse, repeated vomiting, severe pain, a distended or painful belly, seizures, or rapid worsening. Call the same day if shaking and not eating have lasted about 24 hours or more, energy is very low, or you are unsure what is safe. If your dog is otherwise stable and your veterinarian has told you what to watch for, follow that plan.",
  },
] as const;

export default function DogShakingNotEatingPage() {
  const updatedDisplay = formatDisplayDate(DOG_SHAKING_NOT_EATING_UPDATED);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#medical-webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "en-US",
        dateModified: DOG_SHAKING_NOT_EATING_UPDATED,
        lastReviewed: DOG_SHAKING_NOT_EATING_UPDATED,
        audience: {
          "@type": "Audience",
          audienceType:
            "Dog owners and caregivers seeking educational triage information (not a substitute for veterinary care)",
        },
        isPartOf: { "@id": `${SITE_URL}#website` },
        publisher: { "@id": `${SITE_URL}#organization` },
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Dog shaking and not eating: 7 possible causes and when to worry",
        description: pageDescription,
        datePublished: DOG_SHAKING_NOT_EATING_UPDATED,
        dateModified: DOG_SHAKING_NOT_EATING_UPDATED,
        author: {
          "@type": "Organization",
          name: EDITORIAL_ATTRIBUTION,
        },
        publisher: {
          "@id": `${SITE_URL}#organization`,
        },
        isPartOf: { "@id": `${pageUrl}#medical-webpage` },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={structuredData} />

      <MedicalDisclaimerBanner />

      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-500">
        Updated {updatedDisplay} · {EDITORIAL_ATTRIBUTION}
      </p>

      <section className="mb-8 rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <h2 className="mb-1 text-xl font-semibold">Urgency triage first</h2>
        <p className="mb-4 text-sm text-slate-300">
          If you are worried right now, use this block first before reading anything else.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-red-400 bg-red-950 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-200">Red: seek emergency care</p>
            <p className="mt-2 text-sm text-red-100">
              Trouble breathing, collapse, repeated vomiting, severe pain, or rapidly worsening symptoms.
            </p>
          </div>
          <div className="rounded-lg border border-amber-400 bg-amber-950 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">Yellow: call vet same day</p>
            <p className="mt-2 text-sm text-amber-100">
              Shaking and not eating lasting 24+ hours, low energy, or no improvement.
            </p>
          </div>
          <div className="rounded-lg border border-emerald-400 bg-emerald-950 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">Green: monitor closely</p>
            <p className="mt-2 text-sm text-emerald-100">
              Mild, brief symptoms with normal behavior otherwise and clear improvement.
            </p>
          </div>
        </div>
      </section>

      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">
          Dog shaking and not eating: 7 possible causes and when to worry
        </h1>
        <p className="text-slate-300">
          Educational overview only—then use the structured checker to note what you are seeing and questions
          for your veterinarian.
        </p>
      </header>

      <article className="prose prose-invert prose-slate max-w-none">
        <p>
          <strong>What you are seeing:</strong> When a dog is shaking and not eating at the same time, owners are
          usually picking up that something feels wrong. Shaking can come from pain, nausea, fever, fear, or
          weakness; not eating often goes with feeling sick or stressed. Those signs overlap across many
          conditions, so this page does not identify which one your dog has—it only helps you sort urgency and
          prepare for a professional visit.
        </p>
        <p>
          Everything here is general education, not a diagnosis or treatment plan. If you are unsure, your
          veterinarian is the right next step.
        </p>

        <h2>Seven possible causes (common categories)</h2>
        <p>
          Veterinarians often consider categories like these when a dog presents with{" "}
          <strong>dog shaking and not eating</strong>—again, only an exam can tell what fits your pet.
        </p>
        <ol>
          <li>
            <strong>Nausea or stomach upset</strong> — vomiting, lip licking, or eating grass may appear; many
            causes exist.
          </li>
          <li>
            <strong>Pain</strong> — orthopedic injury, abdominal discomfort, dental disease, or other sources of
            pain can reduce appetite and increase trembling.
          </li>
          <li>
            <strong>Fever or infection</strong> — systemic illness can cause lethargy, shaking, and poor appetite.
          </li>
          <li>
            <strong>Stress, fear, or a big routine change</strong> — short-term; other causes should be ruled out
            if signs persist or are strong.
          </li>
          <li>
            <strong>Diet change or dietary indiscretion</strong> — new food, table scraps, or something
            inappropriate eaten; worth mentioning to your vet promptly if symptoms are more than mild.
          </li>
          <li>
            <strong>Medication or vaccine reaction</strong> — some dogs have transient effects; your vet should
            know what was given and when.
          </li>
          <li>
            <strong>Other medical conditions</strong> — metabolic, organ, or neurologic issues can present with
            nonspecific signs; testing may be needed.
          </li>
        </ol>

        <h2>When it may be an emergency</h2>
        <p>Treat as urgent or emergency if any of the following apply:</p>
        <ul>
          <li>Trouble breathing, blue or gray gums, or collapse</li>
          <li>Repeated vomiting, especially with lethargy or pain</li>
          <li>Swollen or painful belly, retching without bringing anything up, or extreme restlessness</li>
          <li>Severe pain, seizures, inability to stand, or symptoms escalating quickly</li>
          <li>Known toxin exposure or foreign body risk—call a veterinarian or emergency clinic immediately</li>
        </ul>
        <p>
          If you are on the fence, an emergency or urgent-care line can help you decide; when in doubt, err on the
          side of seeking care.
        </p>

        <h2>What to monitor before you call the vet</h2>
        <p>
          If you are gathering information for a same-day or next-day call, these details help your clinic advise
          you and prepare for the visit. This is not a substitute for professional judgment.
        </p>
        <ul>
          <li>
            <strong>Food and water</strong> — last normal meal; any water intake; vomiting or diarrhea (how often,
            what it looked like)
          </li>
          <li>
            <strong>Energy and behavior</strong> — hiding, restlessness, stiffness, or reluctance to move
          </li>
          <li>
            <strong>Shaking pattern</strong> — constant versus intermittent; at rest versus when moving
          </li>
          <li>
            <strong>Other signs</strong> — cough, limp, fever feel (hot ears/paws), recent injuries, new foods or
            medications
          </li>
        </ul>

        <h2>FAQ</h2>
        {faqItems.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </article>

      <div className="mt-10">
        <SymptomChecker />
      </div>
    </main>
  );
}
