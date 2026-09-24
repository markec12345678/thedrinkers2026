"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (response.ok && data.success) {
        setSubmitMessage(
          "Uspešno ste se prijavili na naše novice! Preverite svoj email.",
        );
        setEmail("");
      } else {
        setSubmitMessage(data.error || "Prišlo je do napake. Poskusite znova.");
      }
    } catch (error) {
      console.error("Newsletter request failed:", error);
      setSubmitMessage("Prišlo je do napake. Poskusite znova.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  return (
    <Section background="gradient">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            OBVESTILA O NOVOSTIH
          </h2>
          <p className="text-lg text-text-gray mb-8 max-w-2xl mx-auto">
            Prijavite se na naš newsletter in bodite prvi, ki boste izvedeli za
            nove koncerte, albume in ekskluzivne vsebine.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            aria-label="Newsletter signup form"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email naslov
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vaš email"
              required
              aria-required="true"
              className="flex-1 px-6 py-4 bg-white/10 border border-white/30 rounded text-white placeholder-text-gray focus:outline-none focus:border-crimson focus:bg-crimson/10 transition-all duration-300"
            />
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "PREVERJANJE..." : "PRIJAVI SE"}
            </Button>
          </form>

          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded max-w-xl mx-auto bg-red-600/20 border border-red-600 text-red-400"
              role="alert"
              aria-live="polite"
            >
              {submitMessage}
            </motion.div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
