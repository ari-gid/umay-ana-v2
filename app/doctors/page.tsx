'use client';

import { useState } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  availability: string;
  availabilityType: 'available' | 'limited' | 'unavailable';
  bio: string;
  emoji: string;
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Ayşe Kaya',
    specialty: 'OB-GYN',
    rating: 4.9,
    reviewCount: 312,
    availability: 'Available today',
    availabilityType: 'available',
    bio: 'Board-certified obstetrician with 15 years of experience in high-risk pregnancy management and minimally invasive gynecological procedures. Fluent in English and Turkish.',
    emoji: '👩‍⚕️',
  },
  {
    id: 2,
    name: 'Dr. Murat Öztürk',
    specialty: 'OB-GYN',
    rating: 4.8,
    reviewCount: 278,
    availability: 'Next available: Tomorrow',
    availabilityType: 'limited',
    bio: 'Specialising in maternal-fetal medicine and prenatal diagnostics. Expert in advanced ultrasound imaging including detailed anatomy scans and fetal echocardiography.',
    emoji: '👨‍⚕️',
  },
  {
    id: 3,
    name: 'Zeynep Arslan',
    specialty: 'Midwife',
    rating: 5.0,
    reviewCount: 194,
    availability: 'Available today',
    availabilityType: 'available',
    bio: 'Certified nurse-midwife with a passion for physiological birth and family-centred care. Experienced in supporting water births, VBAC, and hypnobirthing techniques.',
    emoji: '🌸',
  },
  {
    id: 4,
    name: 'Dr. Selin Demir',
    specialty: 'Mental Health',
    rating: 4.9,
    reviewCount: 156,
    availability: 'Next available: Jun 18',
    availabilityType: 'limited',
    bio: 'Perinatal psychologist specialising in prenatal and postpartum mental health. Offers evidence-based CBT and mindfulness-based therapies for anxiety, depression, and birth trauma.',
    emoji: '🧠',
  },
  {
    id: 5,
    name: 'Elif Şahin',
    specialty: 'Physiotherapy',
    rating: 4.7,
    reviewCount: 98,
    availability: 'Available today',
    availabilityType: 'available',
    bio: "Specialist women's health physiotherapist focusing on pelvic floor rehabilitation, back pain management during pregnancy, and postnatal recovery. Certified pre/postnatal exercise trainer.",
    emoji: '💪',
  },
  {
    id: 6,
    name: 'Dr. Hüseyin Çelik',
    specialty: 'Nutrition',
    rating: 4.8,
    reviewCount: 143,
    availability: 'Currently unavailable',
    availabilityType: 'unavailable',
    bio: 'Registered dietitian specialising in pregnancy and postnatal nutrition. Expert in managing gestational diabetes, hyperemesis gravidarum, and plant-based pregnancy diets.',
    emoji: '🥗',
  },
];

const specialties = ['All', 'OB-GYN', 'Midwife', 'Mental Health', 'Physiotherapy', 'Nutrition'];

const availabilityStyles: Record<string, { backgroundColor: string; color: string }> = {
  available: { backgroundColor: '#dcfce7', color: '#16a34a' },
  limited: { backgroundColor: '#fef9c3', color: '#ca8a04' },
  unavailable: { backgroundColor: '#fee2e2', color: '#dc2626' },
};

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push('★');
    } else if (i === full && hasHalf) {
      stars.push('½');
    } else {
      stars.push('☆');
    }
  }
  return (
    <span style={{ color: '#f59e0b', fontSize: '1rem', letterSpacing: 1 }}>
      {stars.join('')}
    </span>
  );
}

export default function DoctorsPage() {
  const [activeSpecialty, setActiveSpecialty] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

  const filtered =
    activeSpecialty === 'All'
      ? mockDoctors
      : mockDoctors.filter((d) => d.specialty === activeSpecialty);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fdf2f8',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)',
          padding: '48px 24px 40px',
          textAlign: 'center',
          borderBottom: '1px solid #fbcfe8',
        }}
      >
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: '#9d174d',
            margin: '0 0 12px',
            letterSpacing: '-0.5px',
          }}
        >
          Our Healthcare Team 🩺
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#be185d',
            margin: 0,
            maxWidth: 520,
            marginInline: 'auto',
          }}
        >
          Connect with experienced professionals who specialise in pregnancy and maternal health.
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
        {/* Specialty filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {specialties.map((spec) => {
            const isActive = activeSpecialty === spec;
            const isHov = hoveredSpec === spec;
            return (
              <button
                key={spec}
                onClick={() => setActiveSpecialty(spec)}
                onMouseEnter={() => setHoveredSpec(spec)}
                onMouseLeave={() => setHoveredSpec(null)}
                style={{
                  padding: '7px 20px',
                  borderRadius: 9999,
                  border: isActive ? '2px solid #ec4899' : '2px solid #fbcfe8',
                  backgroundColor: isActive ? '#ec4899' : isHov ? '#fce7f3' : '#fff',
                  color: isActive ? '#fff' : '#be185d',
                  fontSize: '0.87rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                }}
              >
                {spec}
              </button>
            );
          })}
        </div>

        <p style={{ color: '#be185d', fontSize: '0.9rem', marginBottom: 24, fontWeight: 500 }}>
          {filtered.length} provider{filtered.length !== 1 ? 's' : ''} available
        </p>

        {/* Doctor cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 22,
          }}
        >
          {filtered.map((doctor) => {
            const isHov = hoveredCard === doctor.id;
            const isBtnHov = hoveredBtn === doctor.id;
            const avStyle = availabilityStyles[doctor.availabilityType];

            return (
              <div
                key={doctor.id}
                onMouseEnter={() => setHoveredCard(doctor.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 18,
                  border: isHov ? '1.5px solid #f9a8d4' : '1.5px solid #fce7f3',
                  padding: '28px 24px',
                  boxShadow: isHov
                    ? '0 10px 28px rgba(236,72,153,0.13)'
                    : '0 2px 8px rgba(236,72,153,0.06)',
                  transition: 'all 0.2s ease',
                  transform: isHov ? 'translateY(-3px)' : 'translateY(0)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                }}
              >
                {/* Avatar + name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      flexShrink: 0,
                      border: '2px solid #f9a8d4',
                    }}
                  >
                    {doctor.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: '#9d174d',
                        fontSize: '1rem',
                        marginBottom: 4,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {doctor.name}
                    </div>
                    <span
                      style={{
                        backgroundColor: '#fce7f3',
                        color: '#be185d',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '2px 10px',
                        borderRadius: 9999,
                        border: '1px solid #fbcfe8',
                      }}
                    >
                      {doctor.specialty}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <StarRating rating={doctor.rating} />
                  <span
                    style={{ fontWeight: 700, color: '#9d174d', fontSize: '0.9rem' }}
                  >
                    {doctor.rating.toFixed(1)}
                  </span>
                  <span style={{ color: '#be185d', fontSize: '0.8rem' }}>
                    ({doctor.reviewCount} reviews)
                  </span>
                </div>

                {/* Availability */}
                <div style={{ marginBottom: 14 }}>
                  <span
                    style={{
                      ...avStyle,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: 9999,
                    }}
                  >
                    🟢 {doctor.availability}
                  </span>
                </div>

                {/* Bio */}
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '0.855rem',
                    lineHeight: 1.65,
                    margin: '0 0 20px',
                    flex: 1,
                  }}
                >
                  {doctor.bio}
                </p>

                {/* Book button */}
                <button
                  onMouseEnter={() => setHoveredBtn(doctor.id)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  disabled={doctor.availabilityType === 'unavailable'}
                  style={{
                    width: '100%',
                    padding: '11px 0',
                    borderRadius: 10,
                    border: 'none',
                    backgroundColor:
                      doctor.availabilityType === 'unavailable'
                        ? '#e5e7eb'
                        : isBtnHov
                        ? '#be185d'
                        : '#ec4899',
                    color:
                      doctor.availabilityType === 'unavailable' ? '#9ca3af' : '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor:
                      doctor.availabilityType === 'unavailable' ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.15s ease',
                    fontFamily: 'inherit',
                    boxShadow:
                      doctor.availabilityType === 'unavailable'
                        ? 'none'
                        : '0 2px 8px rgba(236,72,153,0.25)',
                  }}
                >
                  {doctor.availabilityType === 'unavailable'
                    ? 'Currently Unavailable'
                    : 'Book Appointment'}
                </button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              color: '#be185d',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: '1rem' }}>No providers found for this specialty.</p>
          </div>
        )}
      </div>
    </div>
  );
}
