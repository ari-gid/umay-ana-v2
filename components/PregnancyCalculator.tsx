"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";

function calculateFromLmp(lmpDate: string) {
  const lmp = new Date(lmpDate);
  const diffMs = Date.now() - lmp.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
  return { weeks, days, dueDate };
}

function calculateFromGestation(weeks: number, days: number) {
  const totalDays = weeks * 7 + days;
  const remainingDays = Math.max(0, 280 - totalDays);
  const dueDate = new Date(Date.now() + remainingDays * 24 * 60 * 60 * 1000);
  return { weeks, days, dueDate };
}

function trimesterForWeeks(weeks: number) {
  if (weeks >= 28) {
    return 3;
  }
  if (weeks >= 14) {
    return 2;
  }
  return 1;
}

function recommendation(weeks: number, t: ReturnType<typeof useTranslations>) {
  if (weeks < 14) {
    return t("recommendationFirst");
  }
  if (weeks < 28) {
    return t("recommendationSecond");
  }
  return t("recommendationThird");
}

export function PregnancyCalculator() {
  const t = useTranslations("calculator");
  const [lmpDate, setLmpDate] = useState("");
  const [gestationWeeks, setGestationWeeks] = useState("");
  const [gestationDays, setGestationDays] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const result = useMemo(() => {
    if (lmpDate) {
      const calculated = calculateFromLmp(lmpDate);
      return {
        ...calculated,
        trimester: trimesterForWeeks(calculated.weeks),
      };
    }
    if (gestationWeeks || gestationDays) {
      const weeks = Number(gestationWeeks || 0);
      const days = Number(gestationDays || 0);
      const calculated = calculateFromGestation(weeks, days);
      return {
        ...calculated,
        trimester: trimesterForWeeks(weeks),
      };
    }
    return null;
  }, [lmpDate, gestationWeeks, gestationDays]);

  async function handleSave() {
    if (!result) {
      setStatus(t("missing"));
      return;
    }
    const response = await fetch("/api/profile/pregnancy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lmpDate: lmpDate || null,
        gestationWeeks: result.weeks,
        gestationDays: result.days,
      }),
    });
    if (response.ok) {
      setStatus(t("saved"));
    } else {
      setStatus(t("signin"));
    }
  }

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{t("title")}</h3>
        <p className="text-sm text-slate-600">{t("subtitle")}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Input
          label={t("lmp")}
          type="date"
          value={lmpDate}
          onChange={(event) => {
            setLmpDate(event.target.value);
            setGestationWeeks("");
            setGestationDays("");
          }}
        />
        <Input
          label={t("weeks")}
          type="number"
          min="0"
          value={gestationWeeks}
          onChange={(event) => {
            setGestationWeeks(event.target.value);
            setLmpDate("");
          }}
        />
        <Input
          label={t("days")}
          type="number"
          min="0"
          max="6"
          value={gestationDays}
          onChange={(event) => {
            setGestationDays(event.target.value);
            setLmpDate("");
          }}
        />
      </div>
      {result ? (
        <div className="rounded-2xl bg-pink-50 p-4 text-sm text-slate-700">
          <p>
            {t("current", {
              weeks: result.weeks,
              days: result.days,
              trimester: result.trimester,
            })}
          </p>
          <p>{t("due", { date: result.dueDate.toLocaleDateString() })}</p>
          <p className="mt-2 text-slate-600">{recommendation(result.weeks, t)}</p>
        </div>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button onClick={handleSave}>{t("save")}</Button>
        {status ? <span className="text-xs text-slate-500">{status}</span> : null}
      </div>
    </Card>
  );
}
