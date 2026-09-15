export default function PageGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-fern/20 to-transparent blur-3xl" />
      <div className="absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-gradient-to-br from-cream/40 to-transparent blur-3xl" />
    </div>
  );
}
