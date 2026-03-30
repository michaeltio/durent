const partners = [
  "Netflix", "Amazon Studios", "Warner Bros", "Sony Pictures",
  "Universal", "Paramount", "Lionsgate", "A24",
];

export const Marquee = () => {
  return (
    <section id="partners" className="py-20 border-t border-b border-border overflow-hidden">
      <div className="container mb-10">
        <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
          Dipercaya oleh tim di
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex marquee whitespace-nowrap">
          {[...partners, ...partners].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center justify-center mx-12 text-2xl font-heading font-semibold text-muted-foreground/40 select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
