import { useMemo, useState } from "react";

const year = new Date().getFullYear();

const services = [
  {
    title: "AI Workshops for Schools",
    description:
      "60–90 minute session plus Q&A designed for educators and staff.",
    bullets: [
      "Teacher-focused, classroom-safe usage",
      "Guidance on policies and responsible adoption",
      "Deliverables: slides + resource sheet",
    ],
  },
  {
    title: "AI Enablement for Small Businesses",
    description:
      "Practical adoption plans that prioritize time savings and clarity.",
    bullets: [
      "Identify workflows and pick the right tools",
      "Implement automation and quick wins",
      "Deliverables: plan + optional buildout",
    ],
  },
  {
    title: "Custom AI Tools / Apps",
    description:
      "Lightweight internal apps and integrations built to last.",
    bullets: [
      "Prototypes to production-ready tools",
      "Maintainable, security-minded engineering",
      "Built for your team’s real workflows",
    ],
  },
];

const talks = [
  "AI in 2026: What’s real, what’s noise",
  "Practical classroom uses of AI (and what to avoid)",
  "AI productivity for small teams",
  "From prompt to process: safe AI adoption",
  "Building AI tools without the hype",
];

const workItems = [
  {
    title: "Internal knowledge assistant",
    outcome:
      "Prototype that helps staff search policies and resources quickly.",
    tags: ["AI", "automation", "web app"],
  },
  {
    title: "Operations workflow automation",
    outcome:
      "Streamlined intake and follow-up steps to reduce manual busywork.",
    tags: ["automation", "integrations", "productivity"],
  },
  {
    title: "Custom reporting dashboard",
    outcome:
      "Unified data for leadership decisions without spreadsheet chaos.",
    tags: ["web app", "analytics", "AI"],
  },
];

const credibility = [
  "Presented AI workshops for educators",
  "Built AI-enabled apps and automations",
  "Engineering background focused on real-world delivery",
];

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Speaking", href: "#speaking" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const EMAIL = "hello@colevity.com";

const buildMailto = (payload: {
  name: string;
  email: string;
  message: string;
  interests: string[];
}) => {
  const subject = `Colevity inquiry from ${payload.name || "Website visitor"}`;
  const bodyLines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Interested in: ${payload.interests.join(", ") || "Not specified"}`,
    "",
    payload.message,
  ];

  const body = encodeURIComponent(bodyLines.join("\n"));
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
};

export default function App() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    interests: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isValid = useMemo(() => {
    if (!formState.name.trim()) return false;
    if (!formState.email.includes("@")) return false;
    if (!formState.message.trim()) return false;
    return true;
  }, [formState]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid) {
      setError("Please fill out name, email, and message.");
      return;
    }
    setError(null);
    setSubmitted(true);
    window.location.href = buildMailto(formState);
  };

  const toggleInterest = (value: string) => {
    setFormState((prev) => {
      const exists = prev.interests.includes(value);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((item) => item !== value)
          : [...prev.interests, value],
      };
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold tracking-tight text-ink">
            Colevity
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark"
          >
            Book a Call
          </a>
        </nav>
      </header>

      <main>
        <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-20 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate">
              Practical AI for real teams
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">
              Practical AI training and tools—built by a software engineer.
            </h1>
            <p className="text-lg text-slate">
              Colevity helps schools and small businesses adopt AI safely, save time,
              and build useful internal tools—without the hype.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark"
              >
                Book a Call
              </a>
              <a
                href="#services"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
              >
                See Services
              </a>
            </div>
            <ul className="grid gap-2 text-sm text-slate sm:grid-cols-3">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Workshops for educators
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Automation & internal tools
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Security-minded engineering
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <div className="rounded-3xl border border-slate-200 bg-soft p-8 shadow-soft">
              <h2 className="text-lg font-semibold text-ink">Trusted, practical guidance</h2>
              <p className="mt-3 text-sm text-slate">
                I help teams cut through the noise, set sensible AI policies, and
                ship tools that actually get used.
              </p>
              <div className="mt-6 grid gap-4">
                {credibility.map((item) => (
                  <div key={item} className="rounded-2xl bg-white p-4 text-sm text-ink">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
            {credibility.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 p-5 text-sm text-slate">
                {item}
              </div>
            ))}
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-12 md:grid-cols-2">
            {[1, 2].map((index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-soft p-6">
                <p className="text-sm text-slate">
                  “Placeholder testimonial about clear, practical AI guidance.”
                </p>
                <p className="mt-4 text-sm font-semibold text-ink">
                  Name Placeholder · Title/Organization
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-ink">Services</h2>
            <p className="text-slate">
              Clear options for schools, small teams, and leaders who need AI
              to be practical and safe.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
                <p className="mt-2 text-sm text-slate">{service.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-6 inline-flex text-sm font-semibold text-accent hover:text-accentDark">
                  Contact →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="speaking" className="border-y border-slate-200 bg-soft">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-ink">Speaking & Training</h2>
                <p className="text-slate">
                  I explain AI without jargon, helping leaders and educators feel
                  confident about what’s safe, useful, and worth the effort.
                </p>
                <a
                  href="#contact"
                  className="inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark"
                >
                  Request a talk
                </a>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold text-ink">Sample talk titles</p>
                <ul className="mt-4 space-y-2 text-sm text-slate">
                  {talks.map((talk) => (
                    <li key={talk} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                      <span>{talk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-ink">Work & Examples</h2>
            <p className="text-slate">
              Representative project outcomes (placeholders — no client names).
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {workItems.map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-slate">{item.outcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-slate">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate">More examples available on request.</p>
        </section>

        <section id="about" className="border-y border-slate-200 bg-soft">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-ink">About</h2>
              <p className="text-slate">
                I’m Chris, a software engineer who builds practical, secure tools and
                teaches teams how to apply AI responsibly. I focus on real-world
                delivery, clear communication, and making sure what we build actually
                helps people.
              </p>
              <p className="text-slate">
                Colevity exists to make AI feel approachable and trustworthy—especially
                for educators, small teams, and leaders who need clarity more than hype.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate">
              Friendly headshot placeholder
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-ink">Contact</h2>
              <p className="text-slate">
                Tell me what you’re working on. I’ll respond with next steps and
                an honest recommendation.
              </p>
              <div className="rounded-3xl border border-slate-200 bg-soft p-6">
                <p className="text-sm text-slate">Email: <span className="font-semibold text-ink">{EMAIL}</span></p>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-ink transition hover:border-ink"
                >
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>
            </div>
            <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="grid gap-4">
                <label className="text-sm font-semibold text-ink">
                  Name
                  <input
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-2 text-sm"
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, name: event.target.value }))
                    }
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-ink">
                  Email
                  <input
                    type="email"
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-2 text-sm"
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-ink">
                  Message
                  <textarea
                    className="mt-2 min-h-[120px] w-full rounded-2xl border border-slate-300 px-4 py-2 text-sm"
                    value={formState.message}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, message: event.target.value }))
                    }
                    placeholder="What do you need help with?"
                    required
                  />
                </label>
                <fieldset className="space-y-2">
                  <legend className="text-sm font-semibold text-ink">
                    I’m interested in:
                  </legend>
                  {[
                    "Workshop",
                    "Consulting",
                    "Custom tool",
                  ].map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm text-slate">
                      <input
                        type="checkbox"
                        checked={formState.interests.includes(option)}
                        onChange={() => toggleInterest(option)}
                        className="h-4 w-4 rounded border-slate-300"
                      />
                      {option}
                    </label>
                  ))}
                </fieldset>
                {error && <p className="text-sm text-red-600">{error}</p>}
                {submitted && !error && (
                  <p className="text-sm text-emerald-600">
                    Thanks! Your email client should open with the draft ready.
                  </p>
                )}
                <button
                  type="submit"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark disabled:opacity-50"
                  disabled={!isValid}
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </section>

        <section id="privacy" className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-slate">
            Privacy note: Form submissions open your email client and are not stored by
            Colevity. No spam—just the information you choose to send.
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-soft">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-slate md:flex-row md:items-center">
          <p>© {year} Colevity LLC</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://linkedin.com" className="hover:text-ink">
              LinkedIn
            </a>
            <a href={`mailto:${EMAIL}`} className="hover:text-ink">
              Email
            </a>
            <a href="#privacy" className="hover:text-ink">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
