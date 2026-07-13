import { Check } from "lucide-react";

export default function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-4">
          <Check
            aria-hidden="true"
            strokeWidth={2}
            className="mt-1.5 h-5 w-5 flex-none text-moss"
          />
          <span className="text-[1.15rem] leading-[1.7] text-bark/80 text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}
