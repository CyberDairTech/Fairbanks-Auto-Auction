export default function PageIntro({ eyebrow, answer, detail }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h1 className="mb-2.5 font-display text-2xl font-semibold text-ink md:text-[28px]">
        {eyebrow}
      </h1>
      <p className="text-sm leading-relaxed md:text-[15px]">
        <span className="font-semibold text-ink">{answer} </span>
        <span className="text-steel">{detail}</span>
      </p>
    </div>
  );
}
