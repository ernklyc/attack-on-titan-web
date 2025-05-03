// This is a temporary mock to satisfy TypeScript until framer-motion can be properly installed
import React from 'react';

// Helper to filter out framer-motion specific props from regular DOM elements
const filterMotionProps = (props: any = {}) => {
  const {
    // Animation control props
    animate, initial, exit, transition,
    // Gesture props  
    whileHover, whileTap, whileFocus, whileDrag, whileInView,
    // Layout props
    layout, layoutId,
    // Variants
    variants, 
    // Other framer props
    drag, dragConstraints, dragElastic, 
    ...filteredProps
  } = props;

  // Return only the props that are valid for regular DOM elements
  return filteredProps;
};

// Enhanced motion components that filter out framer-motion specific props
export const motion = {
  div: (props: any) => React.createElement('div', filterMotionProps(props), props.children),
  button: (props: any) => React.createElement('button', filterMotionProps(props), props.children),
  span: (props: any) => React.createElement('span', filterMotionProps(props), props.children),
  a: (props: any) => React.createElement('a', filterMotionProps(props), props.children),
  section: (props: any) => React.createElement('section', filterMotionProps(props), props.children),
  p: (props: any) => React.createElement('p', filterMotionProps(props), props.children),
  main: (props: any) => React.createElement('main', filterMotionProps(props), props.children),
  header: (props: any) => React.createElement('header', filterMotionProps(props), props.children),
  footer: (props: any) => React.createElement('footer', filterMotionProps(props), props.children),
  aside: (props: any) => React.createElement('aside', filterMotionProps(props), props.children),
  ul: (props: any) => React.createElement('ul', filterMotionProps(props), props.children),
  li: (props: any) => React.createElement('li', filterMotionProps(props), props.children),
  // Add more elements as needed
};

// Animation helpers
export function AnimatePresence(props: { children: React.ReactNode }): JSX.Element {
  return React.createElement(React.Fragment, null, props.children);
}

// Animation utilities
export const useAnimation = () => ({
  start: () => Promise.resolve(),
  stop: () => {},
});

// Mock for useInView hook from framer-motion
export const useInView = (options: any) => {
  return { ref: React.useRef(), inView: true };
};

export default {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
};