// Dedicated, robust Speech and Voice Service for KisanAI / Krishi Intelligence
// Enforces strict locale handling with zero silent English fallback for Hindi.

export const HINDI_LOCALE = 'hi-IN';
export const ENGLISH_LOCALE = 'en-IN';

let cachedVoices: SpeechSynthesisVoice[] = [];

/**
 * Loads available browser voices, handling asynchronous onvoiceschanged events
 */
export function getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const currentVoices = window.speechSynthesis.getVoices();
    if (currentVoices && currentVoices.length > 0) {
      cachedVoices = currentVoices;
      resolve(currentVoices);
      return;
    }

    // Wait for voices to load asynchronously
    const onVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      cachedVoices = voices;
      window.speechSynthesis.onvoiceschanged = null;
      resolve(voices);
    };

    window.speechSynthesis.onvoiceschanged = onVoicesChanged;

    // Fallback timeout in case onvoiceschanged does not fire
    setTimeout(() => {
      const fallbackVoices = window.speechSynthesis.getVoices();
      cachedVoices = fallbackVoices;
      resolve(fallbackVoices);
    }, 500);
  });
}

/**
 * Finds a genuine Hindi-supporting voice.
 * Never returns an English voice as a fallback.
 */
export async function findHindiVoice(): Promise<SpeechSynthesisVoice | null> {
  const voices = await getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  // Search priority:
  // 1. Exact hi-IN locale match
  // 2. Starts with 'hi' (e.g., hi_IN, hi)
  // 3. Name or language includes 'hindi', 'kalpana', 'hemant', 'geeta', 'swara'
  const hindiVoice = voices.find((v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();
    return (
      lang === 'hi-in' ||
      lang.startsWith('hi-') ||
      lang === 'hi' ||
      name.includes('hindi') ||
      name.includes('kalpana') ||
      name.includes('hemant') ||
      name.includes('swara') ||
      name.includes('madhur')
    );
  });

  return hindiVoice || null;
}

/**
 * Speaks Hindi text strictly using hi-IN and a Hindi voice.
 * If no Hindi voice exists on device/browser, it explicitly reports failure
 * and NEVER falls back to an English voice.
 */
export async function speakHindi(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (reason: string) => void;
  }
): Promise<{ success: boolean; error?: string }> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    callbacks?.onError?.('SPEECH_SYNTHESIS_NOT_SUPPORTED');
    return { success: false, error: 'SPEECH_SYNTHESIS_NOT_SUPPORTED' };
  }

  // 1. Cancel previous speech
  window.speechSynthesis.cancel();

  // 2. Clean text from markdown formatting, bullets, asterisks
  const cleanText = text
    .replace(/[#*•_`~[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    return { success: false, error: 'EMPTY_TEXT' };
  }

  // 3. Find available Hindi voice
  const hindiVoice = await findHindiVoice();

  // 4. If no Hindi voice exists, DO NOT silently use English!
  if (!hindiVoice) {
    callbacks?.onError?.('HINDI_VOICE_NOT_AVAILABLE');
    return {
      success: false,
      error: 'HINDI_VOICE_NOT_AVAILABLE',
    };
  }

  // 5. Configure Utterance
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.voice = hindiVoice;
  utterance.lang = HINDI_LOCALE;
  utterance.rate = 0.92; // Slightly measured rate for clear agricultural instruction
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    callbacks?.onStart?.();
  };

  utterance.onend = () => {
    callbacks?.onEnd?.();
  };

  utterance.onerror = (event) => {
    console.warn('Hindi SpeechSynthesis error:', event);
    callbacks?.onError?.(event.error || 'TTS_PLAYBACK_ERROR');
  };

  // 6. Speak
  window.speechSynthesis.speak(utterance);
  return { success: true };
}

/**
 * Universal speech player respecting target language without forced English
 */
export async function speakLocalizedText(
  text: string,
  languageCode: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (reason: string) => void;
  }
): Promise<{ success: boolean; error?: string }> {
  if (languageCode === 'hi' || languageCode === 'hi-IN') {
    return speakHindi(text, callbacks);
  }

  // For English
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    callbacks?.onError?.('SPEECH_SYNTHESIS_NOT_SUPPORTED');
    return { success: false, error: 'SPEECH_SYNTHESIS_NOT_SUPPORTED' };
  }

  window.speechSynthesis.cancel();
  const cleanText = text.replace(/[#*•_`~[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = ENGLISH_LOCALE;
  utterance.rate = 0.95;

  const voices = await getAvailableVoices();
  const enVoice = voices.find((v) => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('en'));
  if (enVoice) {
    utterance.voice = enVoice;
  }

  utterance.onstart = () => callbacks?.onStart?.();
  utterance.onend = () => callbacks?.onEnd?.();
  utterance.onerror = (e) => callbacks?.onError?.(e.error || 'TTS_ERROR');

  window.speechSynthesis.speak(utterance);
  return { success: true };
}

/**
 * Immediately stops any ongoing speech synthesis
 */
export function stopAllSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
