import { motion as Motion, useReducedMotion } from 'motion/react';

const EASE = [0.32, 0.72, 0, 1];

export function Reveal({ children, className = '', delay = 0, y = 20 }) {
    const reduce = useReducedMotion();

    return (
        <Motion.div
            className={className}
            initial={reduce ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduce ? 0 : 0.55, delay, ease: EASE }}
        >
            {children}
        </Motion.div>
    );
}

export function StaggerGrid({ children, className = '' }) {
    const reduce = useReducedMotion();

    return (
        <Motion.div
            className={className}
            initial={reduce ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
            }}
        >
            {children}
        </Motion.div>
    );
}

export function StaggerItem({ children, className = '' }) {
    const reduce = useReducedMotion();

    return (
        <Motion.div
            className={className}
            variants={{
                hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: EASE },
                },
            }}
        >
            {children}
        </Motion.div>
    );
}

export function PressableButton({ className = '', children, ...props }) {
    const reduce = useReducedMotion();

    return (
        <Motion.button
            className={className}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15, ease: EASE }}
            {...props}
        >
            {children}
        </Motion.button>
    );
}

export function FAQItem({ question, answer, references, defaultOpen = false }) {
    return (
        <details className="faq-item" open={defaultOpen}>
            <summary className="faq-summary">
                <span className="faq-question">{question}</span>
                <span className="faq-chevron" aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer-wrap">
                <p className="faq-answer">{answer}</p>
                {references && (
                    <p className="faq-references">
                        Sources:{' '}
                        {references.map((ref, r) => (
                            <span key={ref.url}>
                                {r > 0 && ', '}
                                <a href={ref.url} target="_blank" rel="noopener noreferrer">
                                    {ref.label}
                                </a>
                            </span>
                        ))}
                    </p>
                )}
            </div>
        </details>
    );
}
