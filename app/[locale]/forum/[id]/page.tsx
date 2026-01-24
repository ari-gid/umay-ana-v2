import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ForumDetail } from "@/components/ForumDetail";

type Params = { params: { id: string } };

export default async function ForumDetailPage({ params }: Params) {
  const t = await getTranslations("forum");

  return (
    <div className="space-y-6">
      <Link href="/forum" className="text-sm font-semibold text-pink-600">
        {t("back")}
      </Link>
      <ForumDetail postId={params.id} />
    </div>
  );
}
