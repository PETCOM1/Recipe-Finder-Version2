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
  Utensils 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme, colors } = useTheme();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com', color: theme === 'dark' ? '#f0f0f0' : '#333' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: '#1DA1F2' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com', color: '#E1306C' },
    { icon: Mail, label: 'Email', href: 'mailto:contact@recipefinder.com', color: '#EA4335' },
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Browse Recipes', path: '/recipes' },
    { label: 'Categories', path: '/categories' },
    { label: 'Favorites', path: '/favorites' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const featureLinks = [
    { label: 'Meal Planner', icon: Utensils },
    { label: 'Shopping List', icon: ChefHat },
    { label: 'Nutrition Info', icon: Coffee },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="mt-16"
      style={{
        backgroundColor: colors.surface,
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      {/* Wave Divider */}
      <div className="relative overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12"
          style={{ 
            fill: colors.surface,
            stroke: colors.border,
            strokeWidth: '1px'
          }}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 no-underline group">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 5, duration: 3 }}
                className="relative"
              >
                <div 
                  className="w-12 h-12 rounded-full p-1"
                  style={{ 
                    background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`,
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
                    <ChefHat 
                      size={24} 
                      style={{ color: colors.primary }}
                    />
                  </div>
                </div>
              </motion.div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: colors.primary }}>
                  RecipeFinder
                </h3>
                <p className="text-sm opacity-80" style={{ color: colors.text }}>
                  Cook. Share. Enjoy.
                </p>
              </div>
            </Link>
            <p className="text-sm" style={{ color: colors.text, opacity: 0.8 }}>
              Discover amazing recipes from around the world. Join our community of food lovers and share your culinary creations.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: colors.muted,
                    color: social.color || colors.text,
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm hover:gap-3 transition-all duration-300 no-underline group"
                    style={{ color: colors.text }}
                  >
                    <motion.div
                      className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: colors.accent }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
              Features
            </h4>
            <ul className="space-y-3">
              {featureLinks.map((feature, index) => (
                <motion.li
                  key={feature.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div 
                    className="p-2 rounded-lg"
                    style={{ 
                      backgroundColor: colors.muted,
                      color: colors.accent,
                    }}
                  >
                    <feature.icon size={16} />
                  </div>
                  <span className="text-sm" style={{ color: colors.text }}>
                    {feature.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
              Stay Updated
            </h4>
            <p className="text-sm mb-4" style={{ color: colors.text, opacity: 0.8 }}>
              Get weekly recipes, cooking tips, and exclusive content.
            </p>
            <form className="space-y-3">
              <motion.div whileHover={{ scale: 1.02 }}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: colors.muted,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                    '--tw-ring-color': colors.accent,
                  }}
                />
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 rounded-xl font-medium text-sm transition-all"
                style={{
                  backgroundColor: colors.primary,
                  color: '#FFFFFF',
                }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="my-8 h-px" 
          style={{ 
            background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
          }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm flex items-center gap-1" style={{ color: colors.text, opacity: 0.7 }}>
            © {new Date().getFullYear()} RecipeFinder. Made with
            <Heart 
              size={14} 
              className="inline-block mx-1 animate-pulse"
              style={{ color: colors.accent }}
            />
            for food lovers everywhere.
          </p>
          
          <div className="flex gap-6 text-sm">
            <Link 
              to="/privacy" 
              className="hover:underline transition-all"
              style={{ color: colors.text, opacity: 0.7 }}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="hover:underline transition-all"
              style={{ color: colors.text, opacity: 0.7 }}
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookies" 
              className="hover:underline transition-all"
              style={{ color: colors.text, opacity: 0.7 }}
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-6 mt-8 opacity-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: colors.accent }}
              animate={{
                y: [0, -4, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;