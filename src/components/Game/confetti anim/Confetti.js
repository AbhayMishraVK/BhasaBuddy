import React, { useEffect } from 'react';
import './Confetti.css'; // Import CSS for confetti styling

const Confetti = () => {
  useEffect(() => {
    // Create confetti elements and add them to the DOM
    const container = document.querySelector('.confetti-container');
    const colors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D']; // Array of confetti colors

    const createConfetti = () => {
      const confettiEl = document.createElement('div');
      confettiEl.classList.add('confetti');

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      confettiEl.style.backgroundColor = randomColor;

      confettiEl.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
      confettiEl.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random animation duration
      confettiEl.style.opacity = Math.random() * 0.5 + 0.5; // Random opacity

      container.appendChild(confettiEl);

      setTimeout(() => {
        // Remove confetti after animation duration
        confettiEl.remove();
      }, 5000); // Adjust duration as needed
    };

    // Create multiple confetti elements
    const interval = setInterval(createConfetti, 100); // Adjust interval as needed

    // Clean up function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return <div className="confetti-container"></div>;
};

export default Confetti;
