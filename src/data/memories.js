/**
 * MEMORY SCRAPBOOK DATA
 * 
 * Instructions:
 * - Place your personal photos into `public/images/memories/`
 * - Change type from "placeholder" / "editorial" to "personal" once you add your own photo
 * - Never present stock photos as shared memories: decorative items are marked clearly as "editorial"
 */

export const memories = [
  {
    id: 1,
    title: "A Quiet Coffee & Shared Laughter",
    image: "/images/memories/memory-01.webp",
    fallbackStock: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    caption: "[ADD A REAL MEMORY: e.g. That breezy afternoon when we couldn't stop laughing over cold coffee]",
    date: "[OPTIONAL DATE: e.g. An afternoon in March]",
    type: "placeholder", // Change to "personal" when you upload your photo!
    rotation: -2.5,
    tapeColor: "champagne",
    stamp: "Cherished",
    note: "One of those moments that stay warm forever."
  },
  {
    id: 2,
    title: "Golden Hour Glow",
    image: "/images/memories/memory-02.webp",
    fallbackStock: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80",
    caption: "[ADD A REAL MEMORY: e.g. When the sky turned shades of peach and gold while we walked]",
    date: "[OPTIONAL DATE: e.g. Summer Sunset]",
    type: "placeholder",
    rotation: 3.2,
    tapeColor: "rose",
    stamp: "Sunset",
    note: "Light was soft, just like your smile."
  },
  {
    id: 3,
    title: "Pressed Petals & Conversations",
    image: "/images/memories/memory-03.webp",
    fallbackStock: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    caption: "[ADD A REAL MEMORY: e.g. The little wildflower we saved in the book]",
    date: "[OPTIONAL DATE]",
    type: "placeholder",
    rotation: -1.8,
    tapeColor: "paper",
    stamp: "Flora",
    note: "Simple things held with gratitude."
  },
  {
    id: 4,
    title: "Shared Smiles & Little Things",
    image: "/images/memories/memory-04.webp",
    fallbackStock: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    caption: "[ADD A REAL MEMORY: e.g. The spontaneous roadside stop because the view was too pretty]",
    date: "[OPTIONAL DATE]",
    type: "placeholder",
    rotation: 2.8,
    tapeColor: "champagne",
    stamp: "Journey",
    note: "Moments etched in gentle ink."
  },
  {
    id: 5,
    title: "Old Streets & Quiet Steps",
    image: "/images/memories/memory-05.webp",
    fallbackStock: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    caption: "[ADD A REAL MEMORY: e.g. Walking along the quiet pathway, talking about everything and nothing]",
    date: "[OPTIONAL DATE]",
    type: "placeholder",
    rotation: -3.5,
    tapeColor: "rose",
    stamp: "Memory",
    note: "Quiet footsteps, deep calm."
  },
  {
    id: 6,
    title: "The Bookmarks of Time",
    image: "/images/memories/memory-06.webp",
    fallbackStock: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    caption: "[ADD A REAL MEMORY: e.g. The playlist we listened to on the way back]",
    date: "[OPTIONAL DATE]",
    type: "placeholder",
    rotation: 1.5,
    tapeColor: "paper",
    stamp: "Always",
    note: "Reminding me why you matter so deeply."
  }
];

// Decorative editorial vignettes to enrich scrapbook atmosphere
export const editorialAccents = [
  {
    type: "dried-flower",
    label: "A pressed blush peony",
    symbol: "flower"
  },
  {
    type: "postage-stamp",
    label: "Air Mail · Special Delivery",
    symbol: "stamp"
  },
  {
    type: "handwritten-scrap",
    text: "“In the book of memories, every honest page matters.”"
  }
];
