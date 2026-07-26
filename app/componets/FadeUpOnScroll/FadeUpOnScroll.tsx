'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FadeUpOnScroll({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: false, // animasi cuma sekali
    threshold: 0.1, // mulai animasi kalau 10% elemennya kelihatan
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
