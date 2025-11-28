const AboutSection = () => {
  return (
    <section id="despre" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Despre <span className="text-cinema-orange">OWH Studio</span>
            </h2>
          </div>

          <div className="space-y-8 text-lg text-foreground/90 leading-relaxed">
            <p className="animate-fade-up">
              <strong>OWH Studio</strong> a fost înfiinţat în <strong>1995</strong>. Iniţial, studioul a fost conceput ca un atelier de creaţie pentru tineri. În timp, s-a constituit un mediu profesional în care imperativul de bază era realizarea producţiilor de calitate.
            </p>

            <p className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              La <strong>27 ianuarie 1999</strong>, OWH Studio a fost înregistrată ca <strong>instituţie independentă</strong>.
            </p>

            <p className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Membrii echipei OWH şi-au propus să ofere publicului din Republica Moldova o alternativă la producţia video existentă, iar continuarea efortului a servit ca bază pentru constituirea echipei permanente.
            </p>

            <div className="bg-card rounded-lg p-8 mt-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-2xl font-heading font-bold mb-6 text-cinema-orange">
                Obiectivele OWH Studio:
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-cinema-orange mt-1">•</span>
                  <span>Realizarea producţiei cinematografice şi de televiziune şi promovarea acesteia pe piaţa internă şi internaţională</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cinema-orange mt-1">•</span>
                  <span>Atragerea şi instruirea tinerilor în domeniul audiovizual prin organizarea diverselor ateliere de film</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cinema-orange mt-1">•</span>
                  <span>Promovarea culturii cinematografice în Republica Moldova</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-2xl font-heading font-bold mb-6 text-cinema-orange">
                Strategia OWH Studio - 4 segmente prioritare:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Creație", "Producție", "Distribuție", "Instruire"].map((segment, index) => (
                  <div key={segment} className="flex items-center gap-4 bg-background/50 rounded-lg p-4">
                    <div className="w-12 h-12 rounded-full bg-cinema-orange/20 flex items-center justify-center text-cinema-orange font-heading font-bold text-xl">
                      {index + 1}
                    </div>
                    <span className="text-xl font-medium">{segment}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-xl font-medium animate-fade-up pt-8" style={{ animationDelay: "0.5s" }}>
              Începând cu <strong className="text-cinema-orange">2001</strong>, OWH Studio organizează la Chişinău{" "}
              <a 
                href="https://cronograf.md" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cinema-orange hover:underline font-bold"
              >
                Festivalul Internaţional de Film Documentar CRONOGRAF
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
