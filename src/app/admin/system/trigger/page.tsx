import React from "react";
import { Status } from "@/components/shared/Status";
import { Input } from "@/components/shared/Input";

const title = "Time Leap Trigger";

export default function TimeLeapTriggerPage() {
  return (
    <section className="flex flex-col items-start gap-4">
      <div className="flex items-end gap-4">
        <div>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">{title}</h2>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 mt-6">
        <div className="flex gap-4">
          <div className="space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Set Flash Sale Time</h1>
                <p className="text-sm text-slate-400">Force system transformations for demonstration runs.</p>
              </div>
              <div className="flex">
                <div className="p-6 bg-border-subtle border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
                  <Input className="max-w-18 h-14 text-4xl"></Input>
                </div>
                <div className="p-6 bg-border-subtle border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
                  <Input className="max-w-18 h-14 text-4xl"></Input>
                </div>
                <div className="p-6 bg-border-subtle border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
                  <Input className="max-w-18 h-14 text-4xl"></Input>
                </div>
                <div className="p-6 bg-border-subtle border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
                  <Input className="max-w-18 h-14 text-4xl"></Input>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <div className="w-full space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">Inventory Status</h1>
                </div>
              </div>
            </div>  
            <div className="w-full space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">Inventory Status</h1>
                </div>
              </div>
            </div>  
          </div>
        </div>
        <div className="w-full space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Terminal Log</h1>
              <p className="text-sm text-slate-400">Force system transformations for demonstration runs.</p>
            </div>
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
              [Waiting for Track B Component Drop: TerminalConsole.tsx]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}