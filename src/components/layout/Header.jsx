import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Castle, Clapperboard, Gamepad2, Ticket } from 'lucide-react';
import './Header.css';

const NAV_LINKS = [
    { label: 'Realms', to: '/#realms', icon: Castle },
    { label: 'Stories', to: '/stories', icon: Clapperboard },
    { label: 'Experience', to: '/#experience', icon: Gamepad2 },
    { label: 'Parks', to: '/#parks', icon: Ticket },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

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

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleNavClick = (link) => {
        setMobileOpen(false);
        // If it's a hash link on the home page, scroll to section
        if (link.to.startsWith('/#')) {
            if (location.pathname === '/') {
                const el = document.getElementById(link.to.replace('/#', ''));
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <motion.header
            className={`header ${scrolled ? 'header--scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
            <div className="header__inner">
                {/* Logo */}
                <Link to="/" className="header__logo">
                    <Sparkles className="header__logo-icon" size={22} />
                    <span className="header__logo-text">
                        <span className="header__logo-disney">Disney</span>
                        <span className="header__logo-story">StoryWorld</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="header__nav">
                    {NAV_LINKS.map((link) => {
                        const Icon = link.icon;
                        const isActive = link.to === location.pathname ||
                            (link.to.startsWith('/#') && location.pathname === '/');
                        return (
                            <Link
                                key={link.label}
                                to={link.to.startsWith('/#') ? '/' : link.to}
                                className={`header__nav-link ${link.to === location.pathname ? 'header__nav-link--active' : ''}`}
                                onClick={() => handleNavClick(link)}
                            >
                                <Icon size={16} className="header__nav-icon" />
                                <span>{link.label}</span>
                            </Link>
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
                                <Link
                                    key={link.label}
                                    to={link.to.startsWith('/#') ? '/' : link.to}
                                    className="header__mobile-link"
                                    onClick={() => handleNavClick(link)}
                                >
                                    <Icon size={18} />
                                    <span>{link.label}</span>
                                </Link>
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
