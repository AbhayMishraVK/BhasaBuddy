import React, { useEffect, useRef } from 'react';

const VantaBirdsBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Load Vanta.js library from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Add event listener for script load
    script.onload = () => {
      // Initialize Vanta effect when library is loaded
      const vantaEffect = window.VANTA.BIRDS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x0,
        color1: 0xefff00,
        colorMode: "lerp",
        birdSize: 0.50
      });

      // Cleanup function to remove Vanta effect when component unmounts
      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    };
  }, []); // Empty dependency array to ensure effect runs only once

  return <div ref={vantaRef} id="your-element-selector" style={{ width: '100%', height: '100vh' }} />;
};

export default VantaBirdsBackground;
