import Link from 'next/link';
import { siteConfig, FOOTER_LINKS, STATS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rock-black border-t border-crimson/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gradient mb-4">THE DRINKERS</h3>
            <p className="text-text-gray mb-4">Rock band from Slovenia</p>
            
            {/* Stats */}
            <div className="flex space-x-6 mb-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-crimson">{stat.value}</div>
                  <div className="text-xs text-text-gray uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {siteConfig.social.spotify && (
                <a
                  href={siteConfig.social.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-crimson transition-colors"
                  aria-label="Spotify"
                >
                  <i className="fab fa-spotify text-2xl" />
                </a>
              )}
              {siteConfig.social.youtube && (
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-crimson transition-colors"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube text-2xl" />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-crimson transition-colors"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-2xl" />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-crimson transition-colors"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook text-2xl" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">NAVIGACIJA</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-gray hover:text-crimson transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">VEČ</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.more.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-gray hover:text-crimson transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">PRAVNI PODATKI</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-gray hover:text-crimson transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-crimson/20 text-center text-text-gray text-sm">
          <p>&copy; {currentYear} The Drinkers. Vse pravice pridržane.</p>
        </div>
      </div>
    </footer>
  );
}
