/**
 * A LETTER FOR ANANYA — STORY CONFIGURATION
 * The Story of Ibrahim
 */

export const storyConfig = {
  // Primary names
  recipientName: "Ananya",
  senderName: "Ibrahim",
  
  // Website metadata
  websiteTitle: "A Letter for Ananya",
  mainTagline: "Some things are too important to leave unsaid.",
  envelopeSubtitle: "Someone has written you a little something...",
  envelopeButtonText: "OPEN THIS LETTER",
  envelopeNextButtonText: "TAP TO NEXT",
  envelopeNextSubtext: "There's something I want to tell you...",

  // Audio assets and volume balance
  audio: {
    backgroundMusic: "/audio/background-music.mp3",
    envelopeOpen: "/audio/envelope-open.mp3",
    waxSeal: "/audio/wax-seal.mp3",
    paperUnfold: "/audio/paper-unfold.mp3",
    flowerBurst: "/audio/flower-burst.mp3",
    characterPop: "/audio/character-pop.mp3",
    softTransition: "/audio/soft-transition.mp3",
    dummyVoiceNote: "/audio/dummy-voice-message.mp3",
    personalVoiceNote: "/audio/personal-message.mp3",
  },

  audioSettings: {
    backgroundVolume: 0.20,
    envelopeVolume: 0.14,
    flowerVolume: 0.18,
    characterVolume: 0.16,
    voiceVolume: 0.85,
  },

  // Section 02 — Hero content
  hero: {
    topLabel: "A PERSONAL CINEMATIC STORY",
    greeting: "Ananya...",
    title: "A Letter for Ananya",
    subtitle: "Some things are too important to leave unsaid.",
    supportingLine: "Ten memories, one story, and a few words I never found the courage to say.",
    primaryCta: "BEGIN THE STORY",
    reassurance: "Take your time reading. There is no rush.",
  },

  // Section 03 — Beginning
  beginning: {
    note: "Before I tell you everything, I want to take you back to where it began.\n\nNot because every moment was extraordinary.\n\nBut because some ordinary moments stay with us longer than we expect."
  },

  // Section 08 — The Unanswered Feelings
  unansweredFeelings: {
    title: "Some Feelings Remain Unanswered",
    paragraphs: [
      "Eventually, I told you what I had carried for so long.",
      "I hoped that sharing it would bring me closer to you. But your feelings were different, and I understand that.",
      "I won't pretend that it didn't hurt. It did.",
      "Sometimes, it felt like I was the only person carrying this little boat of memories.",
      "But I also understand that a feeling cannot be demanded, and a memory cannot become an obligation.",
      "I am grateful that I finally found the courage to say what I had kept inside.",
      "And I respect your answer."
    ]
  },

  // Section 09 — The Apology / What I Wanted to Say
  apology: {
    heading: "What I Wanted to Say",
    salutation: "Ananya,",
    paragraphs: [
      "There were things I wanted to tell you back then, but I never found the courage.",
      "Years passed, and those memories stayed with me.",
      "I eventually decided to reach out and tell you how I felt. I know that your feelings are different, and I respect that.",
      "If anything I said or did made you uncomfortable, I am genuinely sorry.",
      "I never wanted my feelings to become a burden for you.",
      "I simply wanted to be honest about a chapter of my life that meant a lot to me.",
      "Thank you for the moments we shared at Bosch, even if they were ordinary moments for you.",
      "They became memories I will always remember."
    ],
    closing: "— Ibrahim"
  },

  // Optional Reflection / Response
  reflection: {
    heading: "A Quiet Space",
    subtitle: "If you feel comfortable, you can choose how you feel below. You can also simply continue without responding.",
    options: [
      "I remember those days too.",
      "Thank you for sharing your feelings.",
      "I appreciate your honesty, but I don't feel the same way.",
      "I would prefer not to respond.",
      "I have something else to say."
    ],
    submitText: "SUBMIT RESPONSE",
    skipText: "Skip without responding",
    successMessage: "Thank you for taking a moment to respond. I appreciate it.",
    errorMessage: "Your response could not be submitted right now. Please feel free to try again."
  },

  // Section 10 — Voice Message
  voiceMessage: {
    enabled: true,
    src: "/audio/dummy-voice-message.mp3",
    realSrc: "/audio/personal-message.mp3",
    heading: "A few words, in my own voice — Ibrahim",
    supportingText: "Some thoughts are meant to be heard softly.",
    caption: "A personal audio note.",
    isDemo: true,
    demoNotice: "Optional personal audio — place recording at public/audio/personal-message.mp3 anytime."
  },

  // Section 11 — Final Letter
  finalLetter: {
    heading: "Before You Close This Letter",
    salutation: "Dear Ananya,",
    paragraphs: [
      "I don't know what this story means from your side, and I won't assume.",
      "I only know what it meant to me.",
      "I wanted to preserve these memories somewhere beautiful, instead of keeping every word inside my head.",
      "This website is not a request for an answer or another chance.",
      "It is simply a letter about a chapter of my life."
    ],
    climaxLine: "Thank you for being you, Ananya.",
    signature: "— Ibrahim"
  },

  // Section 12 — Final Surprise
  finalSurprise: {
    heading: "The Closing of a Keepsake",
    supportingText: "Thank you for taking the time to read through these memories.",
    thankYou: "Thank you for being you, Ananya.",
    signature: "Ibrahim",
    replayButtonText: "REVISIT THE STORY"
  },

  // Companion character settings
  companion: {
    enabled: true,
    dismissible: true,
    name: "Rosie"
  }
};
