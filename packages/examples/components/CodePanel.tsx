import { Copy } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

export default function CodePanel(props: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => props.code.trimEnd().split('\n'), [props.code]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(props.code.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // noop
    }
  }, [props.code]);

  return (
    <section className="overflow-hidden rounded-2xl bg-white/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="text-sm font-semibold text-white">{props.title}</div>
        <button
          type="button"
          onClick={onCopy}
          className="bg-white/8 hover:bg-white/12 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:text-white"
          aria-label="Copy code"
        >
          <Copy className="h-3.5 w-3.5" />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className="relative m-0 overflow-auto p-4 text-[12.5px] leading-6 text-white/85">
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="whitespace-pre">
              <span className="select-none pr-4 text-white/25">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </section>
  );
}
