"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { DoctorCard } from "@/components/DoctorCard";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  city: string;
  rating: number | null;
  priceFrom: number | null;
  about: string;
  contacts: string | null;
};

export function DoctorsCatalog() {
  const t = useTranslations("doctors");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (city) params.set("city", city);
      if (specialization) params.set("specialization", specialization);
      const response = await fetch(`/api/doctors?${params.toString()}`);
      const data = await response.json();
      setDoctors(data.items ?? []);
    };
    load();
  }, [search, city, specialization]);

  async function requestAppointment() {
    setStatus(null);
    const response = await fetch("/api/doctors/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: selectedDoctor || null,
        name,
        email,
        message,
      }),
    });
    if (!response.ok) {
      setStatus(t("requestError"));
      return;
    }
    setName("");
    setEmail("");
    setMessage("");
    setSelectedDoctor("");
    setStatus(t("requestSent"));
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Input label={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} />
        <Input label={t("city")} value={city} onChange={(e) => setCity(e.target.value)} />
        <Input
          label={t("specialization")}
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      <div className="rounded-3xl border border-pink-100 bg-white p-6">
        <h3 className="text-xl font-semibold text-slate-900">{t("requestTitle")}</h3>
        <p className="text-sm text-slate-600">{t("requestSubtitle")}</p>
        <div className="mt-4 grid gap-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>{t("doctor")}</span>
            <select
              className="rounded-2xl border border-pink-200 bg-white px-4 py-2 text-sm text-slate-800 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">{t("noPreference")}</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} · {doctor.city}
                </option>
              ))}
            </select>
          </label>
          <Input label={t("name")} value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            label={t("email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>{t("message")}</span>
            <textarea
              className="min-h-[120px] rounded-2xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <div className="flex items-center gap-3">
            <Button onClick={requestAppointment}>{t("send")}</Button>
            {status ? <span className="text-xs text-slate-500">{status}</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
