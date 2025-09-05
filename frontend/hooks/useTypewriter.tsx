import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  words: string[];
  delay?: number;
  deleteDelay?: number;
  typeSpeed?: number;
}

export function useTypewriter({ 
  words, 
  delay = 2000, 
  deleteDelay = 1000, 
  typeSpeed = 100 
}: UseTypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          setIsPaused(true);
        }
      }
    }, isDeleting ? typeSpeed / 2 : isPaused ? delay : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, delay, deleteDelay, typeSpeed]);

  return currentText;
}