'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { ContactFormData } from '@/lib/types';

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitMessage('Sporočilo uspešno poslano! Odgovorili vam bomo v najkrajšem možnem času.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage('Prišlo je do napake. Poskusite znova.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section id="contact" background="darker">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          KONTAKT
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold text-crimson mb-4">PIŠITE NAM</h3>
              <p className="text-text-gray mb-6">
                Za vse povpraševanja, booking ali sodelovanja.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-crimson text-xl" />
                </div>
                <div>
                  <div className="text-white font-bold">Email</div>
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-text-gray hover:text-crimson">
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              {SITE_CONFIG.contact.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-phone text-crimson text-xl" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Telefon</div>
                    <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-text-gray hover:text-crimson">
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-crimson text-xl" />
                </div>
                <div>
                  <div className="text-white font-bold">Lokacija</div>
                  <div className="text-text-gray">{SITE_CONFIG.contact.location}</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold text-crimson mb-4">SLEDITE NAM</h4>
              <div className="flex gap-4">
                {SITE_CONFIG.social.spotify && (
                  <a
                    href={SITE_CONFIG.social.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center text-white hover:bg-crimson transition-colors"
                    aria-label="Spotify"
                  >
                    <i className="fab fa-spotify text-xl" />
                  </a>
                )}
                {SITE_CONFIG.social.youtube && (
                  <a
                    href={SITE_CONFIG.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center text-white hover:bg-crimson transition-colors"
                    aria-label="YouTube"
                  >
                    <i className="fab fa-youtube text-xl" />
                  </a>
                )}
                {SITE_CONFIG.social.instagram && (
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center text-white hover:bg-crimson transition-colors"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram text-xl" />
                  </a>
                )}
                {SITE_CONFIG.social.facebook && (
                  <a
                    href={SITE_CONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center text-white hover:bg-crimson transition-colors"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook text-xl" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card p-8 space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Vaše ime"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Vaš email"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Zadeva"
                  className="input-field"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Sporočilo"
                  rows={5}
                  required
                  className="input-field resize-none"
                />
              </div>

              {submitMessage && (
                <div
                  className={`p-4 rounded ${
                    submitMessage.includes('uspešno')
                      ? 'bg-green-600/20 border border-green-600 text-green-400'
                      : 'bg-red-600/20 border border-red-600 text-red-400'
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'POŠILJANJE...' : 'POŠLJI'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
