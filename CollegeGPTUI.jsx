
// CollegeGPT iOS 26-Inspired UI — Enhanced with Realistic Earth View (Fallback to NET if EARTH fails)
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min"; // Fallback effect

export default function CollegeGPTUI() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showTools, setShowTools] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (!vantaEffect.current && typeof NET.default === "function") {
      vantaEffect.current = NET.default({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.2,
        scaleMobile: 1.0,
        color: 0x00ffff,
        backgroundColor: 0x000000,
        points: 12.0,
        maxDistance: 25.0,
        spacing: 15.0
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  const handleVoiceStart = () => {
    setRecording(true);
    setTranscript("Listening...");
  };

  const handleVoiceStop = () => {
    setRecording(false);
    setTranscript("(Sample transcript)");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) alert(`Image uploaded: ${file.name}`);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) alert(`PDF uploaded: ${file.name}\n(Simulated summary)`);
  };

  return (
    <div
      ref={vantaRef}
      className="h-screen w-screen relative overflow-hidden text-white font-sans"
    >
      {/* Top Label */}
      <div className="absolute top-6 left-6 z-20">
        <span className="text-xs px-3 py-1 border border-white/30 rounded-full bg-white/10 backdrop-blur-md">
          College GPT
        </span>
      </div>

      {/* Center Message */}
      <div className="absolute top-1/3 w-full text-center z-20 transition-opacity duration-700 ease-in-out">
        <h1 className="text-3xl font-light drop-shadow-md">
          What can I<br />help with?
        </h1>
      </div>

      {/* Bottom Input Bar with Slide-in Animation */}
      <div className="absolute bottom-0 mb-10 w-full flex justify-center items-center gap-4 z-20 px-4 animate-slide-up">
        <div
          className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-transform duration-700 ease-out hover:scale-105"
          onClick={() => setShowTools(!showTools)}
        ></div>
        <div className="flex-1 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-6 flex items-center transition-transform duration-700 ease-out hover:scale-105">
          <input
            type="text"
            placeholder="TYPE MESSAGE"
            value={transcript}
            className="bg-transparent w-full text-white placeholder-white/70 outline-none"
          />
        </div>
        <div
          className={\`w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-transform duration-700 ease-out hover:scale-105 \${recording ? 'animate-ping' : ''}\`}
          onMouseDown={handleVoiceStart}
          onMouseUp={handleVoiceStop}
        ></div>
      </div>

      {/* Pop-up Upload Buttons */}
      {showTools && (
        <div className="absolute bottom-24 left-6 z-30 flex gap-4 animate-fade-in">
          <label className="cursor-pointer p-3 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs transition-transform duration-500 hover:scale-105">
            Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileUpload}
            />
          </label>
          <label className="cursor-pointer p-3 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs transition-transform duration-500 hover:scale-105">
            PDF
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={handlePdfUpload}
            />
          </label>
        </div>
      )}

      {/* Custom Slide/Fade Animations */}
      <style jsx>{\`
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in forwards;
        }
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      \`}</style>
    </div>
  );
}
