import Image from "next/image";
import RichText from "./RichText";

type TherapyCardProps = {
  title: string;
  text?: string;
  image?: string;
};

export default function TherapyCard({ title, text, image }: TherapyCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.25rem] bg-paper/85 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-glow">
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-linen">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition duration-700 ease-out-soft group-hover:scale-[1.03]"
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-bark/10 via-transparent to-transparent"
          />
        </div>
      )}
      <div className="p-7">
        <h3 className="font-display text-[1.45rem] font-light leading-tight text-bark">
          {title}
        </h3>
        <RichText
          text={text}
          className="mt-5"
          paragraphClassName="text-[1rem] leading-[1.75] text-bark/70 text-pretty"
        />
      </div>
    </article>
  );
}
