import React, { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window === 'undefined') return;
            setVisible(window.scrollY > 300);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        }

        return () => {
            if (typeof window !== 'undefined') window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        if (typeof window === 'undefined') return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
            style={{
                position: 'fixed',
                right: 20,
                bottom: 24,
                zIndex: 9999,
                background: '#db0101',
                color: '#fff',
                border: 'none',
                borderRadius: '9999px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                cursor: 'pointer',
            }}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTop;