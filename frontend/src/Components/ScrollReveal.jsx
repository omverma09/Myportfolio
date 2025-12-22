import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollReveal = ({ children }) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    return (
        <motion.div
  ref={ref}
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
  transition={{
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier
  }}
>
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
