import { Button } from "@/components/shared/Button";

export default function LoginPage() {
  return (
    <main className="min-h-full bg-slate-950 px-6 py-16 text-slate-50">
      <section className="mx-auto max-w-md rounded-3xl border border-white/8 bg-white/5 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.42)] backdrop-blur-xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Welcome back</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Sign in</h1>
        </div>
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
            <label className="text-xs uppercase tracking-[0.28em] text-slate-400">Email</label>
            <div className="mt-2 h-12 rounded-xl bg-slate-950/80" />
          </div>
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
            <label className="text-xs uppercase tracking-[0.28em] text-slate-400">Password</label>
            <div className="mt-2 h-12 rounded-xl bg-slate-950/80" />
          </div>
          <Button variant="primary" size="lg" className="w-full">Continue</Button>
        </div>
      </section>
    </main>
  );
}
