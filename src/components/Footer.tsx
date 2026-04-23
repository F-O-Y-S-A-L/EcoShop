import Link from "next/link";
import { Instagram, Twitter, ArrowUpRight, GithubIcon } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLink = [
    { id: 1, icon: Instagram, link: "https://www.instagram.com/gm4482/" },
    { id: 2, icon: Twitter, link: "https://x.com/GMFoysal811738" },
    { id: 3, icon: GithubIcon, link: "https://github.com/F-O-Y-S-A-L" },
  ];

  return (
    <footer className="bg-white border-t border-eco-gray pt-20 pb-10  md:mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-4xl font-display font-black italic tracking-tighter text-eco-dark">
              CRAVE<span className="text-eco-primary">.</span>
            </h2>
            <p className="text-sm font-medium text-gray-500 max-w-xs leading-relaxed uppercase tracking-tight">
              Sourcing the world&apos;s most addictive snacks and designer
              beverages. Indulge with zero compromise.
            </p>
            <div className="flex gap-4">
              {socialLink.map((Icon, i) => (
                <Link
                  target="_blank"
                  key={i}
                  href={`${Icon.link}`}
                  className="w-10 h-10 bg-eco-gray rounded-full flex items-center justify-center text-eco-dark hover:bg-eco-primary hover:text-white transition-all shadow-sm"
                >
                  <Icon.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-eco-primary">
              Ecosystem
            </h3>
            <ul className="space-y-4">
              {["Shop", "About", "Contact", "FAQ"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm font-bold uppercase tracking-tight text-eco-dark hover:text-eco-primary transition-colors flex items-center gap-1 group"
                  >
                    {link}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-eco-primary">
              Legal Drop
            </h3>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm font-bold uppercase tracking-tight text-eco-dark hover:text-eco-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-eco-gray flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            © {currentYear} CRAVE. STORES INTERNATIONAL.
          </p>
          <div className="flex items-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest text-eco-dark">
              Secure Terminal:
            </span>
            <div className="flex gap-4 items-center">
              <span className="font-display italic text-xs font-bold text-eco-dark">
                VISA
              </span>
              <span className="font-display italic text-xs font-bold text-eco-dark">
                BKASH
              </span>
              <span className="font-display italic text-xs font-bold text-eco-dark">
                NAGAD
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
