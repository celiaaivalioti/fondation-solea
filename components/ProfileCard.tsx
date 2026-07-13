type ProfileCardProps = {
  name: string;
  role: string;
  text: string;
};

export default function ProfileCard({ name, role, text }: ProfileCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.25rem] bg-paper/95 p-9 shadow-soft transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-glow">
      <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-moss/85">
        {role}
      </p>
      <h3 className="mt-4 font-display text-[1.85rem] font-light leading-[1.1] text-bark">
        {name}
      </h3>
      <p className="mt-5 text-[1.05rem] leading-[1.85] text-bark/70 text-pretty">{text}</p>
    </article>
  );
}
