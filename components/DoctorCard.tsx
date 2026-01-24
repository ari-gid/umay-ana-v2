import { Card } from "@/components/Card";
import { Tag } from "@/components/Tag";

type DoctorCardProps = {
  doctor: {
    id: string;
    name: string;
    specialization: string;
    city: string;
    rating: number | null;
    priceFrom: number | null;
    about: string;
    contacts: string | null;
  };
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{doctor.name}</h3>
          <p className="text-sm text-slate-600">
            {doctor.specialization} · {doctor.city}
          </p>
        </div>
        {doctor.rating ? <Tag>⭐ {doctor.rating.toFixed(1)}</Tag> : null}
      </div>
      <p className="text-sm text-slate-600">{doctor.about}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{doctor.contacts ?? "Contact via clinic"}</span>
        {doctor.priceFrom ? <span>From ${doctor.priceFrom}</span> : null}
      </div>
    </Card>
  );
}
