import { Button } from "@/components/shared/Button";

export default function ProfilePage() {
  return (
    <main className="min-h-full bg-slate-950 px-6 py-16 text-slate-50">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/8 bg-white/5 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.42)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Profile</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Student Overview</h1>
          </div>
          <Button variant="secondary" size="md">Edit</Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Karma</p>
            <p className="mt-2 text-3xl font-semibold text-white">98</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Orders</p>
            <p className="mt-2 text-3xl font-semibold text-white">12</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</p>
            <p className="mt-2 text-3xl font-semibold text-white">Active</p>
          </div>
        </div>
      </section>
    </main>
  );
}
