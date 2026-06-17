import React, { useCallback } from 'react';
import './LandingPage.css';
import { landingConfig } from './landingConfig';
import * as Icons from 'lucide-react';
import { Reveal, StaggerGrid, StaggerItem, PressableButton, FAQItem } from './landing/LandingMotion';

const LandingPage = ({ onEnterApp }) => {
    const config = landingConfig;

    const renderIcon = (iconName, props = {}) => {
        const IconComponent = Icons[iconName];
        if (!IconComponent) {
            console.warn(`Icon "${iconName}" not found in lucide-react`);
            return null;
        }
        return <IconComponent {...props} />;
    };

    const scrollToSection = useCallback((href) => {
        if (!href.startsWith('#')) return;
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleNavClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            scrollToSection(href);
        }
    };

    return (
        <div className="landing-container" dir="ltr">
            {config.header.enabled && (
                <header className={`landing-header ${config.header.sticky ? 'sticky' : ''}`}>
                    <div className="header-content">
                        <a href={import.meta.env.BASE_URL} className="header-logo">
                            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="CalcuLab logo" />
                            <span>{config.header.logo}</span>
                        </a>
                        <nav className="header-nav" aria-label="Primary">
                            {config.header.navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="nav-link"
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="header-actions">
                            <PressableButton
                                type="button"
                                className="header-explore"
                                onClick={() => scrollToSection('#features')}
                            >
                                Explore
                            </PressableButton>
                            <PressableButton type="button" className="header-cta" onClick={onEnterApp}>
                                Get Started
                            </PressableButton>
                        </div>
                    </div>
                </header>
            )}

            <main className="landing-main">
                {config.hero.enabled && (
                    <section className="hero-section" aria-labelledby="hero-heading">
                        <div className="hero-grid">
                            <Reveal className="hero-copy">
                                <h1
                                    id="hero-heading"
                                    className="hero-headline"
                                    dangerouslySetInnerHTML={{ __html: config.hero.headline }}
                                />
                                <p className="hero-subheadline">{config.hero.subheadline}</p>
                                <div className="hero-ctas">
                                    <PressableButton type="button" className="cta-primary" onClick={onEnterApp}>
                                        {config.hero.primaryCTA}
                                    </PressableButton>
                                    <PressableButton
                                        type="button"
                                        className="cta-secondary"
                                        onClick={() => scrollToSection('#features')}
                                    >
                                        {config.hero.secondaryCTA}
                                    </PressableButton>
                                </div>
                            </Reveal>

                            <Reveal className="hero-visual" delay={0.08}>
                                <div className="specimen-frame">
                                    <div className="specimen-chrome" aria-hidden="true">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <div className="specimen-viewport">
                                        <img
                                            src={`${import.meta.env.BASE_URL}hero-mockup.png`}
                                            alt="CalcuLab calculator dashboard on desktop"
                                            width={800}
                                            height={500}
                                        />
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {config.betaDisclaimer.enabled && (
                            <Reveal className="beta-disclaimer-section">
                                <div className="beta-disclaimer-content">
                                    <div className="beta-disclaimer-icon">
                                        {renderIcon(config.betaDisclaimer.icon, { size: 28, strokeWidth: 2 })}
                                    </div>
                                    <div className="beta-disclaimer-text">
                                        <h2 className="beta-disclaimer-title">{config.betaDisclaimer.title}</h2>
                                        <p className="beta-disclaimer-message">{config.betaDisclaimer.message}</p>
                                    </div>
                                </div>
                            </Reveal>
                        )}
                    </section>
                )}

                {config.hero.enabled && config.hero.trustRow && (
                    <section className="trust-strip" aria-label="Product highlights">
                        <div className="trust-strip-inner">
                            {config.hero.trustRow.items.map((item) => (
                                <div key={item.label} className="trust-cell">
                                    <span className="trust-icon" aria-hidden="true">
                                        {renderIcon(item.icon, { size: 22, strokeWidth: 1.75 })}
                                    </span>
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
                    </section>
                )}

                {config.features.enabled && (
                    <section id="features" className="features-section">
                        <Reveal>
                            <h2 className="section-title">{config.features.title}</h2>
                        </Reveal>
                        <StaggerGrid className="features-grid">
                            {config.features.items.map((feature) => (
                                <StaggerItem key={feature.title} className="feature-row">
                                    <div className="feature-icon" aria-hidden="true">
                                        {renderIcon(feature.icon, { size: 28, strokeWidth: 1.75 })}
                                    </div>
                                    <div className="feature-body">
                                        <h3 className="feature-title">{feature.title}</h3>
                                        <p className="feature-description">{feature.description}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerGrid>
                    </section>
                )}

                {config.howItWorks.enabled && (
                    <section id="how-it-works" className="how-it-works-section">
                        <Reveal>
                            <h2 className="section-title">{config.howItWorks.title}</h2>
                        </Reveal>
                        <StaggerGrid className="steps-track">
                            {config.howItWorks.steps.map((step) => (
                                <StaggerItem key={step.title} className="step-card">
                                    <div className="step-meta">
                                        <span className="step-icon" aria-hidden="true">
                                            {renderIcon(step.icon, { size: 22, strokeWidth: 2 })}
                                        </span>
                                        <span className="step-index">{String(step.number).padStart(2, '0')}</span>
                                    </div>
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-description">{step.description}</p>
                                </StaggerItem>
                            ))}
                        </StaggerGrid>
                    </section>
                )}

                {config.testimonials.enabled && (
                    <section className="testimonials-section">
                        <Reveal>
                            <h2 className="section-title">{config.testimonials.title}</h2>
                        </Reveal>
                        <StaggerGrid className="testimonials-grid">
                            {config.testimonials.quotes.map((quote) => (
                                <StaggerItem key={quote.name} className="testimonial-card">
                                    <p className="testimonial-text">&ldquo;{quote.text}&rdquo;</p>
                                    <div className="testimonial-author">{quote.name}</div>
                                    <div className="testimonial-role">{quote.role}</div>
                                    <div className="testimonial-role">{quote.institution}</div>
                                </StaggerItem>
                            ))}
                        </StaggerGrid>
                    </section>
                )}

                {config.calculators.enabled && (
                    <section id="calculators" className="calculators-section">
                        <Reveal>
                            <h2 className="section-title">{config.calculators.title}</h2>
                        </Reveal>
                        <StaggerGrid className="calculators-catalog">
                            {config.calculators.categories.map((category) => (
                                <StaggerItem key={category.name} className="catalog-row">
                                    <div className="catalog-head">
                                        <span className="catalog-icon" aria-hidden="true">
                                            {renderIcon(category.icon, { size: 24, strokeWidth: 1.75 })}
                                        </span>
                                        <div>
                                            <h3 className="catalog-name">{category.name}</h3>
                                            <span className="catalog-count">{category.count} tools</span>
                                        </div>
                                    </div>
                                    <ul className="catalog-tools">
                                        {category.tools.map((tool) => (
                                            <li key={tool}>{tool}</li>
                                        ))}
                                    </ul>
                                </StaggerItem>
                            ))}
                        </StaggerGrid>
                        <Reveal className="catalog-cta-wrap">
                            <PressableButton type="button" className="cta-primary" onClick={onEnterApp}>
                                Open all calculators
                            </PressableButton>
                        </Reveal>
                    </section>
                )}

                {config.faq?.enabled && (
                    <section id="faq" className="faq-section">
                        <div className="faq-inner">
                            <Reveal>
                                <h2 className="section-title faq-title">{config.faq.title}</h2>
                            </Reveal>
                            <Reveal delay={0.05}>
                                <div className="faq-list">
                                    {config.faq.items.map((item, i) => (
                                        <FAQItem
                                            key={item.question}
                                            question={item.question}
                                            answer={item.answer}
                                            references={item.references}
                                            defaultOpen={i === 0}
                                        />
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </section>
                )}

                {config.contact.enabled && (
                    <section id="contact" className="contact-section">
                        <Reveal className="contact-panel">
                            <h2 className="contact-title">{config.contact.title}</h2>
                            <p className="contact-description">{config.contact.description}</p>
                            <div className="contact-actions">
                                <a
                                    href={config.contact.feedbackLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-button"
                                >
                                    Share feedback
                                </a>
                            </div>
                            <p className="contact-email">
                                Or email{' '}
                                <a href={`mailto:${config.contact.email}`}>{config.contact.email}</a>
                            </p>
                        </Reveal>
                    </section>
                )}
            </main>

            {config.footer.enabled && (
                <footer className="landing-footer">
                    <div className="footer-content">
                        <div className="footer-branding">
                            <div className="footer-logo">
                                <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" />
                                <span>{config.footer.logo}</span>
                            </div>
                            {config.footer.credits && (
                                <div className="footer-credits">{config.footer.credits}</div>
                            )}
                            {config.footer.lastUpdated && (
                                <div className="footer-last-updated">{config.footer.lastUpdated}</div>
                            )}
                        </div>
                        <nav className="footer-nav" aria-label="Footer">
                            {config.footer.links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="footer-actions">
                            <PressableButton
                                type="button"
                                className="footer-btn footer-cta"
                                onClick={onEnterApp}
                            >
                                Get Started
                            </PressableButton>
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
