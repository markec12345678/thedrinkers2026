/**
 * Voice Commands Service for Virtual Bar
 * Supports Web Speech API and The Drinkers specific commands
 */

export interface VoiceCommand {
  id: string;
  command: string;
  intent: string;
  entities: Record<string, string>;
  confidence: number;
  timestamp: string;
}

export interface VoiceResponse {
  id: string;
  text: string;
  audio?: string;
  action?: string;
  personality: "mati" | "šef" | "gost";
  timestamp: string;
}

/**
 * The Drinkers Voice Commands
 */
const VOICE_COMMANDS = {
  // Bar commands
  "nariši mi pivo": {
    intent: "order_drink",
    entities: { drink: "pivo", quantity: "1" },
    response: "Takoj, eno super pivo za pravega rockerja! 🍺",
    action: "order_beer",
  },
  "daj mi dve pivi": {
    intent: "order_drink",
    entities: { drink: "pivo", quantity: "2" },
    response: "Dve pivi za dva prijatelja! Pijemo ga radi! 🍺🍺",
    action: "order_beer_x2",
  },
  "kakšno pivo imate": {
    intent: "ask_menu",
    entities: {},
    response:
      "Imamo Laško, Union, Križaj, in seveda najboljše - The Drinkers special! Katero bi rad?",
    action: "show_beer_menu",
  },

  // Music commands
  "vključi kakšno dobro muziko": {
    intent: "play_music",
    entities: {},
    response: 'Seveda! Takoj vključim "Pijemo ga radi" na full volume! 🎸',
    action: "play_music",
  },
  "predvajaj pijemo ga radi": {
    intent: "play_specific_song",
    entities: { song: "pijemo ga radi" },
    response: "Classic! Pijemo ga radi pride iz zvočnikov! 🎵",
    action: "play_pijemo_ga_radi",
  },
  "katera pesem se predvaja": {
    intent: "ask_current_song",
    entities: {},
    response:
      'Trenutno igrajo The Drinkers - "Pijemo ga radi", največja uspešnica!',
    action: "show_current_song",
  },

  // Band commands
  "kdo je Mati": {
    intent: "ask_band_member",
    entities: { member: "mati" },
    response:
      "Mati je naš frontman! Matjaž Živković, pevec z neustavljivo energijo! Pravi rocker!",
    action: "show_member_info",
  },
  "kakšna je zgodovina drinkersov": {
    intent: "ask_band_history",
    entities: {},
    response:
      "The Drinkers, ustanovljeni 1993 v Litiji! 30+ let rockanja, 7 albumov, stotine koncertov! Legenda!",
    action: "show_band_history",
  },

  // Concert commands
  "kdaj je naslednji koncert": {
    intent: "ask_next_concert",
    entities: {},
    response:
      "Naslednji koncert je 15. aprila v Orto Baru, Ljubljana! Vstopnice že na voljo, prideš?",
    action: "show_next_concert",
  },
  "kupi mi vstopnico": {
    intent: "buy_ticket",
    entities: {},
    response: "Takoj preusmerim na prodajo vstopnic! Vidimo se na koncertu! 🎫",
    action: "redirect_to_tickets",
  },

  // General commands
  pozdravljen: {
    intent: "greeting",
    entities: {},
    response: "Živjo! Dobrodošel v virtual baru The Drinkers! Kaj ti damo?",
    action: "greeting",
  },
  hvala: {
    intent: "thanks",
    entities: {},
    response: "Ni za kaj! Pijemo ga radi! Se vedno lahko prideš nazaj! 🤘",
    action: "thanks",
  },
  "dober večer": {
    intent: "goodbye",
    entities: {},
    response: "Dober večer in vidi se na koncertu! Rockanje naprej! 🍺🎸",
    action: "goodbye",
  },
};

/**
 * Process voice command using Web Speech API
 */
export class VoiceCommandProcessor {
  private recognition: any = null;
  private isListening = false;
  private onCommandCallback?: (command: VoiceCommand) => void;

  constructor() {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "sl-SI"; // Slovenian

    this.recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript.toLowerCase();

      if (event.results[last].isFinal) {
        this.processCommand(transcript);
      }
    };

    this.recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        console.log("Microphone access denied");
      }
    };
  }

  private processCommand(transcript: string) {
    const command = this.matchCommand(transcript);
    if (command && this.onCommandCallback) {
      this.onCommandCallback(command);
    }
  }

  private matchCommand(transcript: string): VoiceCommand | null {
    // Find exact match first
    for (const [phrase, config] of Object.entries(VOICE_COMMANDS)) {
      if (transcript.includes(phrase)) {
        return {
          id: `cmd-${Date.now()}`,
          command: transcript,
          intent: config.intent,
          entities: config.entities,
          confidence: 0.95,
          timestamp: new Date().toISOString(),
        };
      }
    }

    // Fuzzy matching for similar commands
    const fuzzyMatch = this.fuzzyMatch(transcript);
    if (fuzzyMatch) {
      return fuzzyMatch;
    }

    return null;
  }

  private fuzzyMatch(transcript: string): VoiceCommand | null {
    // Simple fuzzy matching using keyword detection
    const keywords = {
      pivo: { intent: "order_drink", response: "Želiš pivo? Takoj! Katero?" },
      glasba: { intent: "play_music", response: "Glasba pride! Katero pesem?" },
      koncert: { intent: "ask_concert", response: "Koncerti? Poglej urnar!" },
      drinkersi: {
        intent: "ask_band",
        response: "The Drinkers! Legenda slovenske rocka!",
      },
    };

    for (const [keyword, config] of Object.entries(keywords)) {
      if (transcript.includes(keyword)) {
        return {
          id: `fuzzy-${Date.now()}`,
          command: transcript,
          intent: config.intent,
          entities: { keyword },
          confidence: 0.7,
          timestamp: new Date().toISOString(),
        };
      }
    }

    return null;
  }

  public startListening(callback: (command: VoiceCommand) => void) {
    if (!this.recognition) {
      console.error("Speech recognition not supported");
      return;
    }

    this.onCommandCallback = callback;
    this.isListening = true;
    this.recognition.start();
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }
}

/**
 * Generate voice response using text-to-speech
 */
export function generateVoiceResponse(
  text: string,
  personality: "mati" | "šef" | "gost" = "šef",
): Promise<VoiceResponse> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      // Fallback for server-side or unsupported browsers
      resolve({
        id: `resp-${Date.now()}`,
        text,
        personality,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "sl-SI";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Set voice based on personality
    const voices = speechSynthesis.getVoices();
    const slovenianVoice = voices.find((voice) => voice.lang.includes("sl"));
    if (slovenianVoice) {
      utterance.voice = slovenianVoice;
    }

    utterance.onend = () => {
      resolve({
        id: `resp-${Date.now()}`,
        text,
        audio: "generated", // In real implementation, would store audio blob
        personality,
        timestamp: new Date().toISOString(),
      });
    };

    speechSynthesis.speak(utterance);
  });
}

/**
 * Get command response based on intent
 */
export function getCommandResponse(intent: string): string {
  const command = Object.values(VOICE_COMMANDS).find(
    (cmd) => cmd.intent === intent,
  );
  return command?.response || "Ne razumem ukaza. Poskusi znova!";
}

/**
 * Get command action based on intent
 */
export function getCommandAction(intent: string): string | undefined {
  const command = Object.values(VOICE_COMMANDS).find(
    (cmd) => cmd.intent === intent,
  );
  return command?.action;
}

/**
 * Check if voice commands are supported
 */
export function isVoiceSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) &&
    "speechSynthesis" in window
  );
}
