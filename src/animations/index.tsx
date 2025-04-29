import { FC, ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const MoveUpIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}> = ({ delay, duration, children, className, y }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 0.5,
        delay: delay || 0,
        ease: 'easeInOut',
      },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y || 100 }}
      exit={{ opacity: 0, y: y || 100, transition: { duration: 0.1 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const MoveRightIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: duration || 0.5, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      exit={{ opacity: 0, x: -50, transition: { duration: 0.1 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: duration || 0.5, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const SwingIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scaleX: [1, -1, 1],
      transition: { duration: duration || 0.5, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ scaleX: 1 }}
      exit={{ scaleX: 0, transition: { duration: 0.3 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const Scale: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: duration || 0.3, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0, transition: { duration: 0.1 } }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
