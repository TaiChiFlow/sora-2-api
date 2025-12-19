const EVOLINK_SORA2 = 'https://evolink.ai/sora-2';

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="text-sm font-semibold text-white">Sora Two API</div>
          <p className="mt-2 text-sm text-white/65">
            A tiny SDK + playground UI, intentionally shaped like an open-source repo — with clear
            external links.
          </p>
        </div>

        <div className="text-sm text-white/70">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/55">Links</div>
          <ul className="mt-3 space-y-2">
            <li>
              <a className="hover:text-white" href={EVOLINK_SORA2} target="_blank" rel="noreferrer">
                evolink.ai/sora-2
              </a>
            </li>
            <li>
              <a
                className="hover:text-white"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub (update this link)
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white/6 rounded-2xl p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
            Call-to-action
          </div>
          <p className="mt-3 text-sm text-white/70">
            For access / pricing / docs, jump to the official Sora 2 page:
          </p>
          <a
            href={EVOLINK_SORA2}
            target="_blank"
            rel="noreferrer"
            className="text-ink-950 mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold transition hover:bg-white/90"
          >
            Open evolink.ai/sora-2
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        MIT License · 2025
      </div>
    </footer>
  );
}
