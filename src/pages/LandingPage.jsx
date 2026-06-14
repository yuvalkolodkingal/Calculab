import React, { useEffect } from 'react';
import './LandingPage.css';
import { landingConfig } from './landingConfig';
import * as Icons from 'lucide-react';

/**
 * LandingPage component displays the landing page (hero section, features, testimonials, FAQ).
 * Uses intersection observers to trigger fade-up scroll animations for section components.
 * 
 * @param {object} props - Component props
 * @param {function} props.onEnterApp - Callback that handles navigation into the calculator panel page (/app)
 * @returns {React.JSX.Element} The landing page view
 */
const LandingPage = ({ onEnterApp }) => {
    const config = landingConfig;
    
    /**
     * Helper function to dynamically render Lucide React icons by name.
     * Safely logs a warning if the requested icon name is missing or invalid.
     * 
     * @param {string} iconName - Name of the icon exported by lucide-react
     * @param {object} [props={}] - Element props for the icon (size, color, etc.)
     * @returns {React.JSX.Element|null} The icon component, or null if not found
     */
    const renderIcon = (iconName, props = {}) => {
        const IconComponent = Icons[iconName];
        if (!IconComponent) {
            console.warn(`Icon "${iconName}" not found in lucide-react`);
            return null;
        }
        return <IconComponent {...props} />;
    };
    
    // Intersection Observer for fade-up animations - optimized for smooth performance
    useEffect(() => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Skip animations if user prefers reduced motion
            animatedElements.forEach(el => el.classList.add('fade-up'));
            return;
        }
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add a small delay to prevent flickering on fast scrolls
                        requestAnimationFrame(() => {
                            entry.target.classList.add('fade-up');
                        });
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
            },
            { 
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is visible
            }
        );

        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    /**
     * Smoothly scrolls the window viewport to the target HTML element selector.
     * 
     * @param {string} href - Target anchor tag href value (e.g. "#features")
     * @returns {void}
     */
    const scrollToSection = (href) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="landing-container" dir="ltr">
            {/* Sticky Header */}
            {config.header.enabled && (
                <header className={`landing-header ${config.header.sticky ? 'sticky' : ''}`}>
                    <div className="header-content">
                        <a href={import.meta.env.BASE_URL} className="header-logo">
                            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Logo" />
                            <span>{config.header.logo}</span>
                        </a>
                        <nav className="header-nav">
                            {config.header.navLinks.map((link, i) => (
                                <a 
                                    key={i} 
                                    href={link.href} 
                                    className="nav-link"
                                    onClick={(e) => {
                                        if (link.href.startsWith('#')) {
                                            e.preventDefault();
                                            scrollToSection(link.href);
                                        }
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="header-actions">
                            <button className="header-explore" onClick={() => scrollToSection('#features')}>
                                Explore
                            </button>
                            <button className="header-cta" onClick={onEnterApp}>
                                Get Started
                            </button>
                        </div>
                    </div>
                </header>
            )}

            {/* Hero Section */}
            <main className="landing-main">
            {config.hero.enabled && (
                <section className="hero-section">
                    <div className="hero-content animate-on-scroll">
                        <h1 className="hero-headline" dangerouslySetInnerHTML={{__html: config.hero.headline}}></h1>
                        <p className="hero-subheadline">{config.hero.subheadline}</p>
                        
                        <div className="hero-ctas">
                            <button className="cta-primary" onClick={onEnterApp}>
                                {config.hero.primaryCTA}
                            </button>
                            <button 
                                className="cta-secondary" 
                                onClick={() => scrollToSection('#features')}
                            >
                                {config.hero.secondaryCTA}
                            </button>
                        </div>

                        <div className="trust-row">
                            {config.hero.trustRow.items.map((item, i) => (
                                <div key={i} className="trust-item">
                                    <span className="trust-icon">{renderIcon(item.icon, { size: 32 })}</span>
                                    {item.link ? (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="trust-label">
                                            {item.label}
                                        </a>
                                    ) : (
                                        <span className="trust-label">{item.label}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Beta Disclaimer Section */}
                    {config.betaDisclaimer.enabled && (
                        <div className="beta-disclaimer-section">
                            <div className="beta-disclaimer-content animate-on-scroll">
                                <div className="beta-disclaimer-icon">
                                    {renderIcon(config.betaDisclaimer.icon, { size: 32, strokeWidth: 2 })}
                                </div>
                                <div className="beta-disclaimer-text">
                                    <h3 className="beta-disclaimer-title">{config.betaDisclaimer.title}</h3>
                                    <p className="beta-disclaimer-message">{config.betaDisclaimer.message}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="hero-visual animate-on-scroll">
                        <div className="browser-mockup">
                            <div className="mockup-image">
                                <img src={`${import.meta.env.BASE_URL}hero-mockup.png`} alt="Lab Calculator Interface" />
                            </div>
                        </div>
                        <div className="floating-mobile">
                            <img src={`${import.meta.env.BASE_URL}mobile-mockup.png`} alt="Mobile Interface" />
                        </div>
                    </div>

                    {config.hero.decorations.map((iconName, i) => (
                        <span key={i} className="hero-decoration">
                            {renderIcon(iconName, { size: 48, strokeWidth: 1.5 })}
                        </span>
                    ))}
                </section>
            )}

            {/* Features Section */}
            {config.features.enabled && (
                <section id="features" className="features-section">
                    <h2 className="section-title animate-on-scroll">{config.features.title}</h2>
                    <div className="features-grid">
                        {config.features.items.map((feature, i) => (
                            <div key={i} className="feature-card animate-on-scroll">
                                <div className="feature-card-inner">
                                    <div className="feature-icon">{renderIcon(feature.icon, { size: 48, strokeWidth: 1.5 })}</div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* How It Works Section */}
            {config.howItWorks.enabled && (
                <section id="how-it-works" className="how-it-works-section">
                    <h2 className="section-title animate-on-scroll">{config.howItWorks.title}</h2>
                    <div className="steps-container">
                        {config.howItWorks.steps.map((step, i) => (
                            <div key={i} className="step animate-on-scroll">
                                <div className="step-number">{step.number}</div>
                                <div className="step-icon">{renderIcon(step.icon, { size: 32, strokeWidth: 2 })}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            {config.testimonials.enabled && (
                <section className="testimonials-section">
                    <h2 className="section-title animate-on-scroll">{config.testimonials.title}</h2>
                    <div className="testimonials-grid">
                        {config.testimonials.quotes.map((quote, i) => (
                            <div key={i} className="testimonial-card animate-on-scroll">
                                <p className="testimonial-text">"{quote.text}"</p>
                                <div className="testimonial-author">{quote.name}</div>
                                <div className="testimonial-role">{quote.role}</div>
                                <div className="testimonial-role">{quote.institution}</div>
                            </div>
                        ))}
                    </div>
                    <div className="institutions-row animate-on-scroll">
                        {config.testimonials.institutions.map((inst, i) => (
                            <div key={i} className="institution">
                                <span className="institution-logo">{renderIcon(inst.logo, { size: 40, strokeWidth: 1.5 })}</span>
                                <span className="institution-name">{inst.name}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Calculators Section */}
            {config.calculators.enabled && (
                <section id="calculators" className="calculators-section">
                    <h2 className="section-title animate-on-scroll">{config.calculators.title}</h2>
                    <div className="calculators-grid">
                        {config.calculators.categories.map((category, i) => (
                            <div key={i} className="calculator-card animate-on-scroll">
                                <div className="calculator-card-inner">
                                    <div className="calculator-header">
                                        <span className="calculator-icon">{renderIcon(category.icon, { size: 40, strokeWidth: 1.5 })}</span>
                                        <div className="calculator-info">
                                            <h3>{category.name}</h3>
                                            <span className="calculator-count">{category.count} tools</span>
                                        </div>
                                    </div>
                                    <ul className="calculator-tools">
                                        {category.tools.map((tool, j) => (
                                            <li key={j}>{tool}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {config.faq && config.faq.enabled && (
                <section id="faq" className="faq-section">
                    <h2 className="section-title animate-on-scroll">{config.faq.title}</h2>
                    <div className="faq-grid">
                        {config.faq.items.map((item, i) => (
                            <div key={i} className="faq-card animate-on-scroll">
                                <h3 className="faq-question">{item.question}</h3>
                                <p className="faq-answer">{item.answer}</p>
                                {item.references && (
                                    <p className="faq-references" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                        Sources:{' '}
                                        {item.references.map((ref, r) => (
                                            <React.Fragment key={r}>
                                                {r > 0 && ', '}
                                                <a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.label}</a>
                                            </React.Fragment>
                                        ))}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Contact Section */}
            {config.contact.enabled && (
                <section id="contact" className="contact-section">
                    <div className="contact-content animate-on-scroll">
                        <span className="contact-badge">{config.contact.badge}</span>
                        <h2 className="contact-title">{config.contact.title}</h2>
                        <p className="contact-description">{config.contact.description}</p>
                        <div className="contact-buttons">
                            <a 
                                href={config.contact.feedbackLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="contact-button"
                            >
                                Share Feedback
                            </a>
                        </div>
                        <p className="contact-email">
                            Or email us at <a href={`mailto:${config.contact.email}`}>{config.contact.email}</a>
                        </p>
                    </div>
                </section>
            )}
            </main>

            {/* Footer */}
            {config.footer.enabled && (
                <footer className="landing-footer">
                    <div className="footer-content">
                        <div className="footer-branding">
                            <div className="footer-logo">
                                <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Logo" />
                                <span>{config.footer.logo}</span>
                            </div>
                            {config.footer.credits && (
                                <div className="footer-credits">{config.footer.credits}</div>
                            )}
                            {config.footer.lastUpdated && (
                                <div className="footer-last-updated" style={{ fontSize: '0.75rem', opacity: 0.75, marginTop: '0.25rem' }}>{config.footer.lastUpdated}</div>
                            )}
                        </div>
                        {config.footer.links.map((link, index) => (
                            <a 
                                key={index}
                                href={link.href} 
                                onClick={(e) => { 
                                    if (link.href.startsWith('#')) {
                                        e.preventDefault(); 
                                        scrollToSection(link.href); 
                                    }
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="footer-actions">
                            <div>
                                <button className="footer-btn footer-explore" onClick={(e) => { e.preventDefault(); scrollToSection('#features'); }}>
                                    Explore
                                </button>
                                <button className="footer-btn footer-cta" onClick={onEnterApp}>
                                    Get Started
                                </button>
                            </div>
                            {config.footer.copyright && (
                                <div className="footer-copyright">{config.footer.copyright}</div>
                            )}
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default LandingPage;
