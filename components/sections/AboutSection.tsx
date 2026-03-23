'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { bandMembers, STATS } from '@/lib/constants';

export function AboutSection() {
  return (
    <Section id="about" background="darker">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          O NAS
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Band Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/band-photo.jpg"
              alt="The Drinkers Band"
              className="w-full rounded-lg shadow-2xl glow-red"
            />
          </motion.div>

          {/* Bio */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-text-gray leading-relaxed">
              The Drinkers so rock skupina, ki je nastala nekega soparnega julijskega večera leta 1993 
              v Litiji. Pet prijateljev, vseh nekdanjih glasbenikov, je ob hladnem pivu dobilo idejo za 
              skupino. Nastopili so na festivalu &quot;Rusty Trumpets&quot;, presenetljivo zmagali in odločili so 
              se ostati skupaj.
            </p>
            <p className="text-lg text-text-gray leading-relaxed">
              Danes, po 33 letih, še vedno rockamo po odrih Slovenije in tujine. Z našim prvim albumom 
              &quot;Lepi in trezni&quot; (1995) smo osvojili srca poslušalcev. Sledili so &quot;Žeja&quot; (1997), &quot;Pivolucija&quot; 
              (1999), &quot;Prohibicija&quot; (2003), &quot;Hajdi&quot; (2007) in &quot;Recidiv&quot; (2014).
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-crimson/10 rounded-lg border border-crimson/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl font-bold text-crimson mb-2">{stat.value}</div>
                  <div className="text-text-gray font-bold uppercase tracking-wider text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Band Members */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-crimson text-center mb-8">ČLANI SKUPINE</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bandMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="card p-6 text-center group hover:-translate-y-2 transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-crimson group-hover:border-crimson-light transition-colors">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                <p className="text-crimson font-bold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
