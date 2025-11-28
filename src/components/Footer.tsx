import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import owhLogo from "@/assets/owh-logo.png";

const Footer = () => {
  const navLinks = [
    { label: "Acasă", href: "/" },
    { label: "Filme", href: "/filme" },
    { label: "Producție", href: "/productie" },
    { label: "Emisiuni", href: "/emisiuni" },
    { label: "Rental", href: "/rental" },
    { label: "Bilete", href: "/bilete" },
    { label: "Despre Noi", href: "/despre-noi" },
    { label: "Contact", href: "/contacte" },
    { label: "CRONOGRAF", href: "/cronograf" },
  ];

  return (
    <footer className="bg-cinema-darker border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/">
              <img src={owhLogo} alt="OWH Studio" className="h-16 w-auto hover:opacity-80 transition-opacity cursor-pointer" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Studio de film și producție video profesională în Moldova. Înființat în 1995.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Navigare</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-cinema-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-cinema-orange mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+37322232771" className="hover:text-cinema-orange transition-colors block">
                    +373 22 232771
                  </a>
                  <span className="text-xs">Fax: +373 22 225409</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-cinema-orange mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:owh@owh.md" className="hover:text-cinema-orange transition-colors block">
                    owh@owh.md
                  </a>
                  <a href="mailto:idff.cronograf@gmail.com" className="hover:text-cinema-orange transition-colors block text-xs">
                    idff.cronograf@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-cinema-orange mt-1 flex-shrink-0" />
                <span className="text-sm">
                  MD-2012, Chișinău<br />
                  Str. 31 August 1989, 93
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-heading font-bold mb-4">Social Media</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/owhstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-cinema-orange transition-colors"
                aria-label="Facebook OWH Studio"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/owhstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-cinema-orange transition-colors"
                aria-label="Instagram OWH Studio"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@owhstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-cinema-orange transition-colors"
                aria-label="YouTube OWH Studio"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OWH Studio. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
