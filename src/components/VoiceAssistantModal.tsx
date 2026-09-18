import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X, Send, Sparkles, AlertCircle, AlertTriangle } from 'lucide-react';
import { askKisanAI } from '../services/geminiService';
import { speakLocalizedText, stopAllSpeech, findHindiVoice } from '../services/speechService';
import { FarmerProfile } from '../types';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmerProfile: FarmerProfile;
  activeLanguage: string;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  farmerProfile,
  activeLanguage,
}) => {
  const isHindi = activeLanguage === 'hi' || activeLanguage === 'hi-IN';
  const languageCode = isHindi ? 'hi-IN' : 'en-IN';
  const languageName = isHindi ? 'Hindi' : 'English';

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [ttsWarning, setTtsWarning] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; language?: string }>>([]);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial welcome message based on language
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: isHindi
          ? 'नमस्ते! मैं किसानAI आवाज़ सहायक हूँ। आप बोलकर या लिखकर अपनी फसल, मौसम, रोग या खाद के बारे में पूछ सकते हैं।'
          : 'Namaste! I am your KisanAI Voice Assistant. Speak or type your questions regarding crops, weather, diseases, or fertilizer management.',
        language: languageCode,
      },
    ]);
  }, [isHindi]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // Configure SpeechRecognition strictly with hi-IN when Hindi is active
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = languageCode;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        // Keep transcript strictly in original language without translating
        setTranscript(text);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event error:', event.error);
        setIsListening(false);

        if (event.error === 'not-allowed') {
          setVoiceError(
            isHindi
              ? 'माइक्रोफोन की अनुमति आवश्यक है। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।'
              : 'Microphone permission denied. Please allow microphone access in your browser settings.'
          );
        } else if (event.error === 'no-speech') {
          setVoiceError(
            isHindi
              ? 'कोई आवाज़ सुनाई नहीं दी। कृपया दोबारा बोलें।'
              : 'No speech was detected. Please try speaking again.'
          );
        } else if (event.error === 'network') {
          setVoiceError(
            isHindi
              ? 'नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जांचें।'
              : 'Network error occurred during speech recognition.'
          );
        } else {
          setVoiceError(
            isHindi
              ? 'आवाज़ पहचानने में समस्या हुई। कृपया लिखकर प्रश्न पूछें।'
              : 'Speech recognition error. You can type your query below.'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [languageCode, isHindi]);

  const toggleListening = () => {
    setVoiceError(null);
    setTtsWarning(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError(
        isHindi
          ? 'इस ब्राउज़र में आवाज़ पहचान उपलब्ध नहीं है। कृपया टेक्स्ट में अपना सवाल लिखें।'
          : 'Speech recognition is not supported in this browser. Please type your query.'
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      if (transcript.trim()) {
        handleSendMessage(transcript, 'voice');
      }
    } else {
      setTranscript('');
      try {
        if (recognitionRef.current) {
          recognitionRef.current.lang = languageCode;
          recognitionRef.current.start();
        }
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string, inputMode: 'voice' | 'text' = 'text') => {
    const query = (textToSend || transcript).trim();
    if (!query) return;

    // Display user question in original language (never translated)
    setMessages((prev) => [...prev, { sender: 'user', text: query, language: languageCode }]);
    setTranscript('');
    setVoiceError(null);
    setTtsWarning(null);
    setIsProcessing(true);

    try {
      const result = await askKisanAI(query, farmerProfile, languageCode, inputMode);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: result.answer,
          language: result.language,
        },
      ]);

      // If voice input mode was used, speak the response aloud
      if (inputMode === 'voice') {
        playResponseAudio(result.answer, result.language);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: isHindi
            ? 'क्षमा करें, उत्तर प्राप्त करने में त्रुटि हुई। कृपया पुनः प्रयास करें।'
            : 'Sorry, I encountered an issue fetching the response. Please try again.',
          language: languageCode,
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const playResponseAudio = async (text: string, responseLang?: string) => {
    setTtsWarning(null);
    const targetLocale = responseLang || languageCode;

    const result = await speakLocalizedText(text, targetLocale, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: (err) => {
        setIsSpeaking(false);
        if (err === 'HINDI_VOICE_NOT_AVAILABLE') {
          setTtsWarning(
            'हिंदी आवाज़ इस डिवाइस पर उपलब्ध नहीं है। आप उत्तर ऊपर पढ़ सकते हैं।'
          );
        }
      },
    });

    if (!result.success && result.error === 'HINDI_VOICE_NOT_AVAILABLE') {
      setTtsWarning('हिंदी आवाज़ इस डिवाइस पर उपलब्ध नहीं है। आप उत्तर ऊपर पढ़ सकते हैं।');
    }
  };

  const handleStopSpeaking = () => {
    stopAllSpeech();
    setIsSpeaking(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#091D14] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2519] border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <span>{isHindi ? '🎤 किसानAI आवाज़ सहायक' : '🎤 Ask KisanAI Voice'}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {languageName} ({languageCode})
                </span>
              </h3>
              <p className="text-xs text-emerald-200/70">
                {farmerProfile.district}, {farmerProfile.state} • {isHindi ? 'फसल' : 'Crop'}: {farmerProfile.crop}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <button
                onClick={handleStopSpeaking}
                className="px-2.5 py-1 text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg flex items-center gap-1 hover:bg-amber-500/30 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span>{isHindi ? 'आवाज़ बंद करें' : 'Stop Voice'}</span>
              </button>
            )}
            <button
              onClick={() => {
                handleStopSpeaking();
                if (isListening && recognitionRef.current) recognitionRef.current.stop();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Warning / Error Banners */}
        {voiceError && (
          <div className="bg-red-500/15 border-b border-red-500/30 px-6 py-2.5 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{voiceError}</span>
          </div>
        )}

        {ttsWarning && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 px-6 py-2.5 text-xs text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{ttsWarning}</span>
          </div>
        )}

        {/* Chat Messages Container */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#06140D]/70 min-h-[300px]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                    : 'bg-[#0E2C1E] border border-emerald-500/25 text-emerald-50 rounded-bl-none shadow-sm'
                }`}
              >
                {/* Clear "आपने कहा:" header for user speech */}
                {m.sender === 'user' && (
                  <span className="text-[11px] font-bold text-emerald-200 block mb-1">
                    {isHindi ? 'आपने कहा:' : 'You said:'}
                  </span>
                )}

                <div className="whitespace-pre-line">{m.text}</div>

                {m.sender === 'ai' && (
                  <div className="mt-2.5 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300/80">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isHindi ? 'उत्तर तैयार है' : 'Response Ready'}</span>
                    </span>
                    <button
                      onClick={() => playResponseAudio(m.text, m.language)}
                      className="hover:text-emerald-100 flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/20 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'उत्तर सुनें' : 'Listen Aloud'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-[#0E2C1E] border border-emerald-500/25 rounded-2xl rounded-bl-none px-4 py-3 text-sm text-emerald-200 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                <span>
                  {isHindi
                    ? 'किसानAI आपकी समस्या का विश्लेषण कर रहा है...'
                    : 'KisanAI is synthesizing agricultural guidance...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-5 py-2.5 bg-[#081B13] border-t border-emerald-500/15 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
          <span className="text-emerald-400 font-semibold shrink-0">
            {isHindi ? 'पूछ कर देखें:' : 'Try asking:'}
          </span>
          {[
            isHindi
              ? 'मेरी गेहूं की फसल के पत्ते पीले हो रहे हैं, क्या करूं?'
              : 'What should I do if wheat leaves turn yellow?',
            isHindi ? 'क्या अगले 48 घंटों में बारिश होगी?' : 'Will it rain in the next 48 hours?',
            isHindi ? 'पीला रतुआ रोग की रोकथाम कैसे करें?' : 'How to prevent yellow rust disease?',
            isHindi ? 'जैविक खाद की सही मात्रा क्या है?' : 'Optimal organic fertilizer ratio',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt, 'text')}
              className="shrink-0 px-3 py-1 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/30 rounded-full text-emerald-200 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Voice Input & Action Footer */}
        <div className="p-4 bg-[#0B2519] border-t border-emerald-500/20">
          <div className="flex items-center gap-3">
            {/* Big Mic Button */}
            <button
              onClick={toggleListening}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isListening
                  ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              }`}
              title={
                isListening
                  ? isHindi ? 'सुनना बंद करें' : 'Stop listening'
                  : isHindi ? '🎙️ Hindi में बोलें' : 'Start voice input'
              }
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              {isListening && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </button>

            {/* Input field */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(undefined, 'text')}
                placeholder={
                  isListening
                    ? isHindi
                      ? 'सुन रहा हूँ...'
                      : 'Listening...'
                    : isHindi
                    ? 'हिंदी में प्रश्न लिखें या माइक दबाएं (जैसे: मेरी गेहूं की फसल...)'
                    : 'Type question in Hindi/English or click mic...'
                }
                className="w-full bg-[#06170F] border border-emerald-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage(undefined, 'text')}
              disabled={!transcript.trim() || isProcessing}
              className="p-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-emerald-300/70 mt-2 px-1">
            <span className="flex items-center gap-1.5">
              <span>{isHindi ? 'भाषा:' : 'Language:'}</span>
              <strong className="text-white">{isHindi ? 'हिन्दी (hi-IN)' : 'English (en-IN)'}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span>{isHindi ? 'माइक स्थिति:' : 'Microphone:'}</span>
              <strong className={isListening ? 'text-red-400 animate-pulse' : 'text-slate-400'}>
                {isListening ? (isHindi ? '🎙️ सुन रहा हूँ...' : 'Listening...') : (isHindi ? 'तैयार' : 'Idle')}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
