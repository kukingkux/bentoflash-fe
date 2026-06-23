"use client";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { useFlashDiscount } from "@/hooks/useAdminLogic";
import React, { useRef, useState } from "react";

export default function TimeLeapTriggerPage() {
  const title = "Time Leap Trigger";
  const { executeLeap, resetTime } = useFlashDiscount();

  const [time, setTime] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[SYSTEM] Terminal ready. Awaiting command.",
  ]);

  const appendLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setTerminalLogs((current) => [...current, `[${timestamp}] ${message}`]);
  };

  const handleChange = (index: number, val: string) => {
    // Prevent non-numeric characters
    if (!/^\d*$/.test(val)) return;

    const digit = val.slice(-1); // Take only the last typed character
    const newTime = [...time];
    newTime[index] = digit;
    setTime(newTime);

    // Auto-advance focus to the next input
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Auto-rewind focus to previous input on Backspace if current box is empty
    if (e.key === "Backspace" && !time[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleTrigger = async () => {
    // Convert array to unified string: "14:00"
    const unifiedTimeString = `${time[0]}${time[1]}:${time[2]}${time[3]}`;

    // Optional: Add logic here to check if unifiedTimeString === "14:00" before firing

    setLoading(true);
    appendLog(`[COMMAND] Trigger discount at ${unifiedTimeString}`);
    try {
      await executeLeap();
      appendLog(
        `[SUCCESS] Triggered at ${unifiedTimeString}. Objects discounted!`,
      );
    } catch (error) {
      appendLog(
        `[ERROR] ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
    setLoading(false);
  };

  const handleTriggerReset = async () => {
    setLoading(true);
    appendLog("[COMMAND] Reset discount prices");
    try {
      await resetTime();
      appendLog("[SUCCESS] Objects price has been reset!");
    } catch (error) {
      appendLog(
        `[ERROR] ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
    setLoading(false);
  };

  return (
    <section className="flex flex-col items-start gap-4">
      <div className="flex items-end gap-4">
        <div>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            {title}
          </h2>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 mt-6">
        <div className="flex gap-4">
          <div className="space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  Set Flash Sale Time
                </h1>
                <p className="text-sm text-slate-400">
                  Force system transformations for demonstration runs.
                </p>
              </div>
              <div className="flex gap-8">
                <div className="flex gap-4 items-center">
                  <div className="flex items-center p-2 bg-border-subtle border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
                    <Input
                      ref={(el) => {
                        inputRefs.current[0] = el;
                      }}
                      value={time[0]}
                      onChange={(e) => handleChange(0, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(0, e)}
                      className="max-w-14 h-18 text-6xl text-center"
                      maxLength={1}
                    />{" "}
                  </div>
                  <div className="flex items-center p-2 bg-border-subtle border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
                    <Input
                      ref={(el) => {
                        inputRefs.current[1] = el;
                      }}
                      value={time[1]}
                      onChange={(e) => handleChange(1, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(1, e)}
                      className="max-w-14 h-18 text-6xl text-center"
                      maxLength={1}
                    />{" "}
                  </div>
                  <div className="text-6xl">:</div>
                  <div className="flex items-center p-2 bg-border-subtle border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
                    <Input
                      ref={(el) => {
                        inputRefs.current[2] = el;
                      }}
                      value={time[2]}
                      onChange={(e) => handleChange(2, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(2, e)}
                      className="max-w-14 h-18 text-6xl text-center"
                      maxLength={1}
                    />{" "}
                  </div>
                  <div className="flex items-center p-2 bg-border-subtle border border-slate-800 rounded-xl font-mono text-xs text-slate-500">
                    <Input
                      ref={(el) => {
                        inputRefs.current[3] = el;
                      }}
                      value={time[3]}
                      onChange={(e) => handleChange(3, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(3, e)}
                      className="max-w-14 h-18 text-6xl text-center"
                      maxLength={1}
                    />{" "}
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-20">
                  <Button
                    className="w-full"
                    loading={loading}
                    loadingText="..."
                    size="sm"
                    onClick={handleTrigger}
                  >
                    Set
                  </Button>
                  <Button
                    className="w-full"
                    disabled={loading}
                    size="sm"
                    variant="secondary"
                    onClick={handleTriggerReset}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <div className="w-full space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight">
                    Inventory Status
                  </h1>
                </div>
              </div>
            </div>
            <div className="w-full space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight">
                    Perishable Items Count
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
          <div className="space-y-4 w-full">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Terminal Log
              </h1>
              <p className="text-sm text-slate-400">
                Live command output for demonstration runs.
              </p>
            </div>
            <div className="max-h-64 w-full max-h-48 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 p-6 font-mono text-xs text-slate-300">
              <div className="flex flex-col gap-2 text-xs">
                {terminalLogs.map((log, index) => (
                  <p key={`${log}-${index}`}>{log}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
