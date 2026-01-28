import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Github, 
  Twitter, 
  Instagram, 
  Mail, 
  ChefHat,
  Coffee,
  Utensils,
  ArrowUpRight,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme, colors } = useTheme();

  const softCurve = [0.23, 1, 0.32, 1];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Mail, label: 'Email', href: '#' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative mt-32 pb-24 md:pb-12 px-6"
      style={{
        backgroundColor: colors.surface,
        borderTop: `1px solid ${colors.border}40`,
      }}
    >
      {/* Decorative Brand Element - Large Background Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] overflow-hidden w-full text-center">
        <span className="text-[15vw] font-black italic lowercase tracking-tighter">
          velish.
        </span>
      </div>

      <div className="max-w-6xl mx-auto pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand & Mission: Taking up 5 columns */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="flex items-center gap-3 no-underline group w-fit">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
              >
                <Leaf size={24} color="white" fill="white" />
              </motion.div>
              <span className="text-3xl font-black tracking-tighter lowercase italic" style={{ color: colors.text }}>
                velish<span style={{ color: colors.primary }}>.</span>
              </span>
            </Link>
            
            <h2 className="text-2xl md:text-3xl font-medium leading-tight max-w-md" style={{ color: colors.text }}>
              Elevating your daily <span className="italic font-serif" style={{ color: colors.primary }}>culinary</span> ritual.
            </h2>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -5, backgroundColor: colors.primary, color: '#fff' }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300"
                  style={{ borderColor: `${colors.border}80`, color: colors.text }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation: Taking up 7 columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterColumn 
              title="Explore" 
              links={['Recipes', 'Categories', 'Collections', 'Meal Plans']} 
              colors={colors} 
            />
            <FooterColumn 
              title="Company" 
              links={['Our Story', 'Careers', 'Contact', 'Journal']} 
              colors={colors} 
            />
            {/* Newsletter Mini-Widget */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-40" style={{ color: colors.text }}>
                Stay Inspired
              </h4>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Email address"
                  className="w-full bg-transparent border-b py-2 focus:outline-none transition-colors text-sm"
                  style={{ borderColor: `${colors.border}80`, color: colors.text }}
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2">
                  <ArrowUpRight size={18} style={{ color: colors.primary }} />
                </button>
              </div>
              <p className="text-[10px] opacity-50 uppercase tracking-widest leading-relaxed">
                Join 10k+ food lovers for our weekly digest.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div 
          className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t"
          style={{ borderColor: `${colors.border}20` }}
        >
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.15em] opacity-40">
            <Link to="/privacy" className="no-underline hover:opacity-100 transition-opacity" style={{ color: colors.text }}>Privacy</Link>
            <Link to="/terms" className="no-underline hover:opacity-100 transition-opacity" style={{ color: colors.text }}>Terms</Link>
            <Link to="/cookies" className="no-underline hover:opacity-100 transition-opacity" style={{ color: colors.text }}>Cookies</Link>
          </div>

          <p className="text-[11px] font-medium tracking-wide opacity-50 flex items-center gap-2" style={{ color: colors.text }}>
            © {new Date().getFullYear()} VELISH STUDIO. BORN IN PARIS.
            <Heart size={10} fill={colors.accent} color={colors.accent} />
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

// Sub-component for clean mapping
const FooterColumn = ({ title, links, colors }) => (
  <div className="space-y-5">
    <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-40" style={{ color: colors.text }}>
      {title}
    </h4>
    <ul className="space-y-3 p-0 list-none">
      {links.map(link => (
        <li key={link}>
          <Link 
            to="#" 
            className="text-sm font-medium no-underline hover:italic transition-all duration-300 block w-fit"
            style={{ color: colors.text }}
          >
            <motion.span whileHover={{ x: 5 }} className="inline-block">
              {link}
            </motion.span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;