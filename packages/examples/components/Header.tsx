import Link from 'next/link';
import { useRouter } from 'next/router';
import { ExternalLink, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const EVOLINK_SORA2 = 'https://evolink.ai/sora-2';

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navigation: Array<{ name: string; href: string; internal: boolean }> = [
    { name: 'Home', href: '/', internal: true },
    { name: 'Playground', href: '/#playground', internal: true },
    { name: 'Docs', href: '/#docs', internal: true },
    { name: 'Evolink · Sora 2', href: EVOLINK_SORA2, internal: false },
  ];

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.asPath === href;
  };

  useEffect(() => {
    const onRoute = () => setOpen(false);
    router.events.on('routeChangeStart', onRoute);
    return () => router.events.off('routeChangeStart', onRoute);
  }, [router.events]);

  return (
    <header className="bg-ink-950/60 sticky top-0 z-40 border-b border-white/10 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <div className="bg-white/8 relative grid h-9 w-9 place-items-center rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]">
            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(41,246,201,.35),transparent_55%)]" />
            <span className="relative font-semibold tracking-tight text-white">S2</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-white">
              Sora Two API
              <span className="ml-2 text-xs font-medium text-white/60">(Sora 2)</span>
            </div>
            <div className="text-[11px] text-white/60">SDK · Playground · External links</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navigation.map(item => (
            <div key={item.name}>
              {item.internal ? (
                <Link
                  href={item.href}
                  className={[
                    'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition',
                    isActive(item.href)
                      ? 'bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]'
                      : 'hover:bg-white/8 text-white/70 hover:text-white',
                  ].join(' ')}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-white/8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white"
                >
                  <span>{item.name}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={EVOLINK_SORA2}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-mint-500 text-ink-950 shadow-glow relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-sm font-semibold transition hover:brightness-105"
          >
            <span className="relative z-10">Get Sora 2 Access</span>
            <span className="animate-shimmer absolute inset-0 -translate-x-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)] opacity-80 blur-[1px]" />
          </a>

          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="bg-white/8 inline-flex items-center justify-center rounded-full p-2 text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)] transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="bg-ink-950/80 border-t border-white/10 backdrop-blur md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="grid gap-2">
              {navigation.map(item => (
                <div key={item.name}>
                  {item.internal ? (
                    <Link
                      href={item.href}
                      className={[
                        'block rounded-2xl px-4 py-3 text-sm font-semibold transition',
                        isActive(item.href)
                          ? 'bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]'
                          : 'hover:bg-white/8 bg-white/5 text-white/75 hover:text-white',
                      ].join(' ')}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-white/8 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white/75 transition hover:text-white"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
