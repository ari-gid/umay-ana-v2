"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";

export function AuthForm() {
  const t = useTranslations("auth");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit() {
    setStatus(null);
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload =
      mode === "login"
        ? { email, password }
        : { email, password, name, city: city || null };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const data = await response.json();
      setStatus(data.error ?? "Unable to sign in.");
      return;
    }
    router.push("/profile");
  }

  return (
    <Card className="max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900">
        {mode === "login" ? t("welcome") : t("create")}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        {mode === "login" ? t("loginSubtitle") : t("registerSubtitle")}
      </p>
      <div className="mt-6 space-y-3">
        {mode === "register" ? (
          <>
            <Input label={t("name")} value={name} onChange={(e) => setName(e.target.value)} />
            <Input label={t("city")} value={city} onChange={(e) => setCity(e.target.value)} />
          </>
        ) : null}
        <Input
          label={t("email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label={t("password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <Button onClick={handleSubmit}>
          {mode === "login" ? t("signIn") : t("signUp")}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? t("needAccount") : t("haveAccount")}
        </Button>
        {status ? <span className="text-xs text-rose-500">{status}</span> : null}
      </div>
    </Card>
  );
}
