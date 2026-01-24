"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

type FavoriteButtonProps = {
  itemId: string;
  itemType: "ARTICLE" | "POST";
  initial?: boolean;
};

export function FavoriteButton({ itemId, itemType, initial = false }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initial);
  const [loading, setLoading] = useState(false);

  async function toggleFavorite() {
    setLoading(true);
    const response = await fetch("/api/favorites/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, itemType }),
    });
    if (response.ok) {
      const data = await response.json();
      setFavorited(data.favorited);
    }
    setLoading(false);
  }

  return (
    <Button
      variant={favorited ? "primary" : "outline"}
      onClick={toggleFavorite}
      disabled={loading}
      aria-label={favorited ? "Remove favorite" : "Save favorite"}
    >
      {favorited ? "Saved" : "Save"}
    </Button>
  );
}
