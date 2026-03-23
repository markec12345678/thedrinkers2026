'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { tourDates } from '@/lib/constants';
import { formatDate, isSoldOut, hasTicketUrl } from '@/lib/utils';

export function TourCalendar() {
  const upcomingShows = tourDates.filter((date) => !isSoldOut(date));
  const pastShows = tourDates.filter((date) => new Date(date.date) < new Date());

  return (
    <Section id="tour" background="dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          KONCERTI
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Shows */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-crimson mb-6">PRIHAJAJOČI KONCERTI</h3>
            <div className="space-y-4">
              {upcomingShows.map((show, index) => (
                <motion.div
                  key={show.id}
                  className="card p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 hover:bg-crimson/10 hover:translate-x-2 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Date */}
                  <div className="text-center md:text-left min-w-[100px]">
                    <div className="text-3xl font-bold text-crimson">
                      {new Date(show.date).getDate()}.
                    </div>
                    <div className="text-text-gray uppercase text-sm">
                      {new Date(show.date).toLocaleString('sl-SI', { month: 'short' }).toUpperCase()}
                    </div>
                    <div className="text-text-gray text-xs">{show.date}</div>
                  </div>

                  {/* Venue Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-bold text-white mb-1">{show.venue}</h4>
                    <p className="text-text-gray">{show.city}, {show.country}</p>
                  </div>

                  {/* Ticket Info */}
                  <div className="text-center md:text-right">
                    {isSoldOut(show) ? (
                      <span className="inline-block px-4 py-2 bg-gray-600 text-white font-bold rounded">
                        RAZPRODANO
                      </span>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-crimson mb-2">{show.price}</div>
                        {hasTicketUrl(show) && (
                          <Button size="sm" asChild>
                            <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer">
                              VSTOPNICE
                            </a>
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Past Shows Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-crimson mb-6">PRETEKLI KONCERTI</h3>
            <div className="space-y-4">
              {pastShows.slice(0, 3).map((show, index) => (
                <motion.div
                  key={show.id}
                  className="relative h-48 rounded-lg overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={`/images/gallery/concert-${index + 1}.jpg`}
                    alt={show.venue}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col justify-end">
                    <h4 className="text-lg font-bold text-crimson">{show.venue}</h4>
                    <p className="text-text-gray text-sm">
                      {show.city} • {formatDate(show.date)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
