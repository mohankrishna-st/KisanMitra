import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function VoiceReaderButton({ textToRead, label = 'Listen to Advisory', language = 'en' }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSupported) return null;

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel(); // Stop any pending utterances
      const utterance = new SpeechSynthesisUtterance(textToRead);

      // Match voice language if available
      const langMap = {
        en: 'en-US',
        te: 'te-IN',
        hi: 'hi-IN'
      };
      utterance.lang = langMap[language] || 'en-US';
      utterance.rate = 0.95; // Slightly slower, clearer for rural farmers
      utterance.pitch = 1.0;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <button
      type="button"
      className={`voice-reader-btn ${isSpeaking ? 'speaking' : ''}`}
      onClick={handleToggleSpeech}
      aria-label={isSpeaking ? 'Stop voice reading' : label}
      title={isSpeaking ? 'Stop voice reading' : label}
    >
      {isSpeaking ? (
        <>
          <VolumeX size={18} className="voice-icon-pulse" />
          <span>Stop Audio</span>
        </>
      ) : (
        <>
          <Volume2 size={18} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
