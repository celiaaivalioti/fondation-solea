type CardProps = {
  title: string;
  text: string;
  meta?: string;
};

export default function Card({ title, text, meta }: CardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.25rem] bg-paper/85 p-9 backdrop-blur-sm transition-all duration-500 ease-out-soft hover:-translate-y-1">
      {meta && (
        <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-moss/85">
          {meta}
        </p>
      )}
      <h3 className="font-display text-[1.55rem] font-light leading-tight text-bark">
        {title}
      </h3>
      <p className="mt-5 text-[1.05rem] leading-[1.85] text-bark/70 text-pretty">{text}</p>
    </article>
  );
}
