import { useMemo, useState } from 'react';
import { ChevronRight, Link2 } from 'lucide-react';

const EVOLINK_SORA2 = 'https://evolink.ai/sora-2';

type Mode = 'text-to-video' | 'image-to-video';

type MockTask = {
  id: string;
  status: 'queued' | 'running' | 'succeeded';
  outputUrl?: string;
};

const makeId = () => `s2_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;

export default function Playground() {
  const [mode, setMode] = useState<Mode>('text-to-video');
  const [prompt, setPrompt] = useState(
    'A glossy catalog photo of a mint-green robot, hard shadows, 85mm, subtle grain'
  );
  const [task, setTask] = useState<MockTask | null>(null);

  const canRun = useMemo(() => prompt.trim().length >= 8, [prompt]);

  const run = () => {
    if (!canRun) return;
    const id = makeId();
    setTask({ id, status: 'queued' });
    window.setTimeout(() => setTask(t => (t ? { ...t, status: 'running' } : t)), 650);
    window.setTimeout(
      () =>
        setTask(t =>
          t
            ? {
                ...t,
                status: 'succeeded',
                outputUrl: `${EVOLINK_SORA2}?task=${encodeURIComponent(id)}`,
              }
            : t
        ),
      2200
    );
  };

  return (
    <div className="rounded-2xl bg-white/5 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">Mini Playground (mock)</div>
          <p className="mt-2 text-sm text-white/70">
            This is a local mock run to make the UI feel real. For real access / pricing / docs, use
            the external link.
          </p>
        </div>
        <a
          href={EVOLINK_SORA2}
          target="_blank"
          rel="noreferrer"
          className="bg-white/8 hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)] transition hover:bg-white/10 hover:text-white md:inline-flex"
        >
          <Link2 className="h-3.5 w-3.5" />
          evolink.ai/sora-2
        </a>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
            Mode
          </div>
          <select
            value={mode}
            onChange={e => setMode(e.target.value as Mode)}
            className="bg-ink-900/40 focus:border-mint-500/60 mt-2 w-full rounded-xl border border-white/10 px-3 py-2 text-sm text-white outline-none ring-0 transition"
          >
            <option value="text-to-video">Text to video</option>
            <option value="image-to-video">Image to video</option>
          </select>
        </label>

        <label className="block">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
            Prompt
          </div>
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Describe the scene, camera, style…"
            className="bg-ink-900/40 focus:border-mint-500/60 mt-2 w-full rounded-xl border border-white/10 px-3 py-2 text-sm text-white outline-none ring-0 transition placeholder:text-white/35"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-white/55">
          Output is mocked. We link the “result” back to the official page for the external-link
          flow.
        </div>
        <button
          type="button"
          onClick={run}
          disabled={!canRun}
          className={[
            'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition',
            canRun
              ? 'bg-mint-500 text-ink-950 shadow-glow hover:brightness-105'
              : 'bg-white/8 cursor-not-allowed text-white/40 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]',
          ].join(' ')}
        >
          Run mock generation <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {task ? (
        <div className="bg-ink-900/55 mt-5 rounded-2xl p-4 text-sm text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Task
              </div>
              <div className="mt-1 font-mono text-[12px] text-white/75">{task.id}</div>
            </div>
            <div className="bg-white/8 rounded-full px-3 py-1 text-xs font-semibold text-white/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,.10)]">
              {task.status}
            </div>
          </div>
          <div className="mt-3 grid gap-2 text-xs text-white/60">
            <div>mode: {mode}</div>
            <div>prompt: {prompt}</div>
          </div>
          {task.outputUrl ? (
            <a
              href={task.outputUrl}
              target="_blank"
              rel="noreferrer"
              className="text-ink-950 mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold transition hover:bg-white/90"
            >
              Open “result” (external) <ChevronRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
