// components/artilheiros/stat-cards.tsx

interface StatCardsArtilheirosProps {
  artilheiro: { nome: string; gols: number; time: string };
  melhorMedia: { nome: string; media: number };
  hatTricks: number;
  timeMaisArtilheiro: { nome: string; gols: number };
}

export function StatCardsArtilheiros({
  artilheiro,
  melhorMedia,
  hatTricks,
  timeMaisArtilheiro,
}: StatCardsArtilheirosProps) {
  const cards = [
    {
      emoji: "⚽",
      iconBg: "bg-[#FEF3C7]",
      label: "Artilheiro",
      value: artilheiro.nome,
      sub: `${artilheiro.gols} gols · ${artilheiro.time}`,
    },
    {
      emoji: "📈",
      iconBg: "bg-[#DCFCE7]",
      label: "Melhor média",
      value: `${melhorMedia.media.toFixed(1)} gols/jogo`,
      sub: melhorMedia.nome,
    },
    {
      emoji: "🎩",
      iconBg: "bg-[#FFE9E3]",
      label: "Hat-tricks na liga",
      value: `${hatTricks}`,
      sub: "esta temporada",
    },
    {
      emoji: "🛡️",
      iconBg: "bg-[#DBEAFE]",
      label: "Time mais artilheiro",
      value: timeMaisArtilheiro.nome,
      sub: `${timeMaisArtilheiro.gols} gols no total`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-[#E5E7EB] rounded-[12px] p-3.5 flex items-center gap-3"
        >
          <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 text-[18px] ${card.iconBg}`}>
            {card.emoji}
          </div>
          <div className="min-w-0">
            <p className="text-[11.5px] font-semibold text-[#94A3B8]">{card.label}</p>
            <p className="text-[15px] font-extrabold text-[#1E293B] truncate">{card.value}</p>
            <p className="text-[11px] text-[#94A3B8]">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}