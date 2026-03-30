import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { bandMembers, STATS } from "@/lib/constants";
import { AIGallery } from "@/components/sections/AIGallery";

export const metadata: Metadata = {
  title: "O Nas",
  description:
    "Spoznaj zgodbo rock skupine The Drinkers - člani, zgodovina in dosežki.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center bg-rock-dark">
        <div className="absolute inset-0">
          <img
            src="/images/band/band-live-performance.jpg"
            alt="About"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rock-black/50 to-rock-dark" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            O NAS
          </h1>
          <p className="text-xl text-text-gray">Naša zgodba</p>
        </div>
      </section>

      {/* Bio Section */}
      <Section background="darker">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/band-photo.jpg"
                alt="The Drinkers"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-crimson">ZGODBA</h2>
              <p className="text-lg text-text-gray leading-relaxed">
                The Drinkers so rock skupina, ki je nastala nekega soparnega
                julijskega večera leta 1993 v Litiji. Pet prijateljev, vseh
                nekdanjih glasbenikov v različnih zasedbah, je ob hladnem pivu
                dobilo idejo, da bi ustanovili skupino, sposobno nastopiti na
                lokalnem rock festivalu &quot;Rusty Trumpets&quot;.
                Presenetljivo so zmagali in se odločili ostati skupaj.
              </p>
              <p className="text-lg text-text-gray leading-relaxed">
                Skozi leta smo nastopili na številnih festivalih in v klubih po
                vsej Sloveniji, kjer smo si pridobili zvesto občinstvo. Naša
                energija na odru in iskrenost v glasbi nas ločuje od drugih.
              </p>
              <p className="text-lg text-text-gray leading-relaxed">
                Z našim prvim albumom &quot;Lepi in trezni&quot; (1995) smo
                takoj osvojili srca poslušalcev. Sledili so &quot;Žeja&quot;
                (1997), &quot;Pivolucija&quot; (1999), &quot;De Best Od&quot;
                (2001), &quot;Prohibicija&quot; (2003), &quot;Hajdi&quot; (2007)
                in &quot;Recidiv&quot; (2014). Danes, po 33 letih, še vedno
                rockamo!
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-8 bg-crimson/10 rounded-lg border border-crimson/30"
              >
                <div className="text-5xl font-bold text-crimson mb-2">
                  {stat.value}
                </div>
                <div className="text-text-gray font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Band Members */}
      <Section background="gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-crimson text-center mb-12">
            ČLANI SKUPINE
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bandMembers.map((member) => (
              <div
                key={member.id}
                className="card p-6 text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-crimson group-hover:border-crimson-light transition-colors">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-crimson font-bold text-lg mb-4">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-text-gray text-sm">{member.bio}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Press Kit */}
      <Section background="darker">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-crimson mb-6">PRESS KIT</h2>
          <p className="text-lg text-text-gray mb-8 max-w-2xl mx-auto">
            Prenesite uradni press kit z visoko ločljivostjo slikami, biografijo
            in logotipi za medijske namene.
          </p>
          <Button size="lg">
            <i className="fas fa-download mr-2" />
            PRENESI PRESS KIT
          </Button>
        </div>
      </Section>

      {/* AI Generated Gallery */}
      <AIGallery />
    </>
  );
}
