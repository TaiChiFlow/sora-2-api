import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CodePanel from '../components/CodePanel';
import Playground from '../components/Playground';

const EVOLINK_SORA2 = 'https://evolink.ai/sora-2';

const code = `import { createSoraTwoClient } from 'sora-two-api';

const client = createSoraTwoClient({
  baseUrl: 'https://api.evolink.ai',
  apiKey: process.env.SORA_TWO_API_KEY!,
});

const task = await client.createVideo({
  prompt: 'Editorial studio shot of a glass robot, subtle film grain, slow pan',
  aspect_ratio: '16:9',
  duration: 10,
  remove_watermark: true,
});

const detail = await client.getTask(task.id);
console.log(detail.status, detail.progress, detail.results);`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Sora Two API (Sora 2) — SDK + Playground</title>
        <meta
          name="description"
          content="Sora Two API (Sora 2) SDK + a sharp playground UI. Quick access to evolink.ai/sora-2."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative min-h-screen">
        <div className="noise pointer-events-none absolute inset-0 opacity-60" />
        <div className="gridlines pointer-events-none absolute inset-0 opacity-70" />

        <Header />

        <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <section className="relative overflow-hidden rounded-3xl bg-white/5 p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)] md:p-12">
            <div className="bg-mint-500/20 absolute -right-20 -top-24 h-80 w-80 rounded-full blur-3xl" />
            <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <div className="bg-white/8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]">
                  <span className="animate-floaty bg-mint-500 h-1.5 w-1.5 rounded-full" />
                  Open-source SDK + Playground
                </div>

                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  Sora Two API
                  <span className="block text-white/70">
                    A sharp SDK + Playground for Sora 2 style flows.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70">
                  This repo is intentionally built to look like a “real” open-source SDK + demo app,
                  with quick access to the official page and API reference.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={EVOLINK_SORA2}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-mint-500 text-ink-950 shadow-glow inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:brightness-105"
                  >
                    Visit evolink.ai/sora-2
                  </a>
                  <a
                    href="#docs"
                    className="bg-white/8 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)] transition hover:bg-white/10 hover:text-white"
                  >
                    Read usage docs
                  </a>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="to-white/4 relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/10 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]">
                  <div className="bg-mint-500/20 absolute -right-14 -top-14 h-40 w-40 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                      Fast links
                    </div>
                    <div className="mt-4 space-y-3">
                      <a
                        href={EVOLINK_SORA2}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white/6 block rounded-2xl p-4 text-sm text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)] transition hover:bg-white/10 hover:text-white"
                      >
                        <div className="font-semibold text-white">Get Sora 2 access</div>
                        <div className="mt-1 text-xs text-white/55">{EVOLINK_SORA2}</div>
                      </a>
                      <a
                        href="#playground"
                        className="bg-white/6 block rounded-2xl p-4 text-sm text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)] transition hover:bg-white/10 hover:text-white"
                      >
                        <div className="font-semibold text-white">Open Playground section</div>
                        <div className="mt-1 text-xs text-white/55">Hero · UI · code snippet</div>
                      </a>
                    </div>
                    <div className="bg-ink-900/60 mt-5 rounded-2xl p-4 text-xs text-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]">
                      Tip: update GitHub links in `packages/examples/components/Footer.tsx` when you
                      publish this repo.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'SDK-first',
                text: 'Typed request/response models with a minimal client surface area.',
              },
              {
                title: 'Playground UI',
                text: 'Hero + navbar + CTA and clear links to official docs.',
              },
              {
                title: 'Repo packaging',
                text: 'Looks like a legit OSS project, but clearly points to the official page.',
              },
            ].map(card => (
              <div
                key={card.title}
                className="rounded-3xl bg-white/5 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]"
              >
                <div className="text-sm font-semibold text-white">{card.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{card.text}</p>
              </div>
            ))}
          </section>

          <section id="playground" className="mt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  Playground-ready
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  The UI is intentionally “real product-ish”: clean, responsive, and
                  conversion-friendly. Add your real API base URL when you connect it.
                </p>
              </div>
              <a
                href={EVOLINK_SORA2}
                target="_blank"
                rel="noreferrer"
                className="text-ink-950 hidden rounded-2xl bg-white px-5 py-3 text-sm font-semibold transition hover:bg-white/90 md:inline-flex"
              >
                Go to evolink.ai/sora-2
              </a>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <CodePanel title="Minimal SDK usage" code={code} />
              </div>
              <Playground />
            </div>
          </section>

          <section id="docs" className="mt-14">
            <div className="rounded-3xl bg-white/5 p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]">
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Docs (short)
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
                The SDK expects a <span className="text-white">baseUrl</span> and{' '}
                <span className="text-white">apiKey</span>. This repo does not ship a hosted API by
                default — it’s a packaged OSS-style entry point.
              </p>
              <div className="bg-ink-900/55 mt-5 rounded-2xl p-4 text-sm text-white/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  Link placements (recommended)
                </div>
                <ul className="mt-3 space-y-1">
                  <li>1) Navbar CTA: {EVOLINK_SORA2}</li>
                  <li>2) README top + “Links” section: {EVOLINK_SORA2}</li>
                  <li>3) Footer CTA + fast-links panel: {EVOLINK_SORA2}</li>
                </ul>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { k: 'Install', v: 'npm install' },
                  { k: 'Dev', v: 'npm run dev' },
                  { k: 'Build', v: 'npm run build' },
                ].map(item => (
                  <div
                    key={item.k}
                    className="bg-white/6 rounded-2xl p-4 text-sm shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                      {item.k}
                    </div>
                    <div className="mt-2 font-semibold text-white">{item.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={EVOLINK_SORA2}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-950 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold transition hover:bg-white/90"
                >
                  Get Sora 2 info at evolink.ai/sora-2
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/8 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)] transition hover:bg-white/10 hover:text-white"
                >
                  GitHub (update link)
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
