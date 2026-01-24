"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Tag } from "@/components/Tag";

type FavoriteItem =
  | {
      itemType: "ARTICLE";
      item: {
        id: string;
        slug: string;
        title: string;
        excerpt: string;
        trimesterTags: string[];
        topicTags: string[];
      } | null;
    }
  | {
      itemType: "POST";
      item: {
        id: string;
        title: string;
        content: string;
        topicTags: string[];
      } | null;
    };

type ProfileData = {
  user: {
    name: string | null;
    email: string;
    city: string | null;
  };
  pregnancy: {
    gestationWeeks: number | null;
    gestationDays: number | null;
    dueDate: string | null;
    trimester: number;
    privacyHideOnForum: boolean;
  } | null;
  favorites: FavoriteItem[];
};

export function ProfilePanel() {
  const t = useTranslations("profile");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/profile");
      if (!response.ok) {
        setProfile(null);
        return;
      }
      const data = await response.json();
      setProfile(data);
    };
    load();
  }, []);

  async function togglePrivacy() {
    if (!profile) return;
    const response = await fetch("/api/profile/privacy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        privacyHideOnForum: !profile.pregnancy?.privacyHideOnForum,
      }),
    });
    if (!response.ok) {
      setStatus(t("privacyError"));
      return;
    }
    const data = await response.json();
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            pregnancy: {
              gestationWeeks: prev.pregnancy?.gestationWeeks ?? null,
              gestationDays: prev.pregnancy?.gestationDays ?? null,
              dueDate: prev.pregnancy?.dueDate ?? null,
              trimester: prev.pregnancy?.trimester ?? 1,
              privacyHideOnForum: data.privacyHideOnForum,
            },
          }
        : prev,
    );
    setStatus(t("privacyUpdated"));
  }

  if (!profile) {
    return <p className="text-sm text-slate-600">Loading your profile...</p>;
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">
          {t("welcome", { name: profile.user.name ?? t("friend") })}
        </h1>
        <p className="text-sm text-slate-600">{profile.user.email}</p>
        <p className="text-sm text-slate-600">{profile.user.city ?? t("addCity")}</p>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">{t("pregnancyTitle")}</h2>
        {profile.pregnancy ? (
          <div className="text-sm text-slate-600">
            <p>
              {profile.pregnancy.gestationWeeks ?? 0} weeks{" "}
              {profile.pregnancy.gestationDays ?? 0} days · Trimester{" "}
              {profile.pregnancy.trimester}
            </p>
            {profile.pregnancy.dueDate ? (
              <p>
                {t("dueDate", {
                  date: new Date(profile.pregnancy.dueDate).toLocaleDateString(),
                })}
              </p>
            ) : null}
            <p className="mt-2 text-xs text-slate-500">
              {t("privacy", {
                status: profile.pregnancy.privacyHideOnForum
                  ? t("privacyHidden")
                  : t("privacyVisible"),
              })}
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-600">{t("pregnancyEmpty")}</p>
        )}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={togglePrivacy}>
            {t("togglePrivacy")}
          </Button>
          {status ? <span className="text-xs text-slate-500">{status}</span> : null}
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">{t("favoritesTitle")}</h2>
        <div className="space-y-3">
          {profile.favorites.length === 0 ? (
            <p className="text-sm text-slate-600">{t("favoritesEmpty")}</p>
          ) : (
            profile.favorites.map((favorite, index) => {
              if (!favorite.item) {
                return null;
              }
              return (
                <div
                  key={`${favorite.itemType}-${index}`}
                  className="rounded-2xl border border-pink-100 bg-white p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {favorite.itemType === "ARTICLE"
                      ? favorite.item.title
                      : favorite.item.title}
                  </p>
                  {favorite.itemType === "ARTICLE" ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {favorite.item.trimesterTags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                      {favorite.item.topicTags.map((tag) => (
                        <Tag key={tag} className="bg-pink-100 text-pink-700">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-slate-600">
                      {favorite.item.content.slice(0, 120)}...
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
