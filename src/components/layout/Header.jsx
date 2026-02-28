import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Castle, Clapperboard, Gamepad2, Ticket } from 'lucide-react';
import './Header.css';

const NAV_LINKS = [
    { label: 'Realms', href: '#realms', icon: Castle },
    { label: 'Stories', href: '#stories', icon: Clapperboard },
    { label: 'Experience', href: '#experience', icon: Gamepad2 },
    { label: 'Parks', href: '#parks', icon: Ticket },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <motion.header
            className={`header ${scrolled ? 'header--scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
            <div className="header__inner">
                {/* Logo */}
                <a href="#" className="header__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Sparkles className="header__logo-icon" size={22} />
                    <span className="header__logo-text">
                        <span className="header__logo-disney">Disney</span>
                        <span className="header__logo-story">StoryWorld</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="header__nav">
                    {NAV_LINKS.map((link) => {
                        const Icon = link.icon;
                        return (
                            <a key={link.label} href={link.href} className="header__nav-link">
                                <Icon size={16} className="header__nav-icon" />
                                <span>{link.label}</span>
                            </a>
                        );
                    })}
                </nav>

                {/* CTA */}
                <a href="#" className="header__cta">
                    Disney+
                </a>

                {/* Mobile toggle */}
                <button
                    className="header__mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="header__mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {NAV_LINKS.map((link, i) => {
                            const Icon = link.icon;
                            return (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    className="header__mobile-link"
                                    onClick={() => setMobileOpen(false)}
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <Icon size={18} />
                                    <span>{link.label}</span>
                                </motion.a>
                            );
                        })}
                        <a href="#" className="header__mobile-cta">
                            Disney+
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
