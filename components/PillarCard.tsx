type PillarCardProps = {
  title: string;
  text: string;
  index: number;
};

export default function PillarCard({ title, text, index }: PillarCardProps) {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <article className="group relative grid gap-6 overflow-hidden rounded-[1.25rem] bg-paper/85 p-9 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-glow">
      <div>
        <span className="font-display text-[2.25rem] font-light leading-none text-moss/65">
          {formattedIndex}
        </span>
      </div>
      <div>
        <h3 className="font-display text-[1.85rem] font-light leading-[1.1] text-bark">
          {title}
        </h3>
        <p className="mt-4 text-[1.05rem] leading-[1.65] text-bark/70 text-pretty">{text}</p>
      </div>
    </article>
  );
}
