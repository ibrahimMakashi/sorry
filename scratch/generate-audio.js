import fs from 'fs';
import path from 'path';

function createWavBuffer(sampleRate, durationSeconds, generateSample) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const totalSamples = Math.floor(sampleRate * durationSeconds);
  const dataSize = totalSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF chunk descriptor
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write PCM samples
  let offset = 44;
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let sample = generateSample(t, i, totalSamples);
    sample = Math.max(-1, Math.min(1, sample));
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, offset);
    offset += 2;
  }

  return buffer;
}

const outDir = path.resolve('public/audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sampleRate = 44100;

// 1. Wax Seal: VERY GENTLE, soft crack (reduced volume by ~65%)
const waxSealWav = createWavBuffer(sampleRate, 0.35, (t) => {
  const env = Math.exp(-t * 26);
  const noise = (Math.random() * 2 - 1) * Math.exp(-t * 45);
  const snap = Math.sin(2 * Math.PI * 720 * t) * 0.15;
  const thud = Math.sin(2 * Math.PI * 120 * t) * 0.2 * Math.exp(-t * 16);
  return (noise * 0.18 + snap + thud) * env * 0.35; // Soft and quiet
});

// 2. Envelope Open: subtle, gentle paper rustle (reduced volume)
const envelopeOpenWav = createWavBuffer(sampleRate, 0.7, (t) => {
  const env = Math.sin((t / 0.7) * Math.PI) * Math.exp(-t * 3.0);
  const paper = (Math.random() * 2 - 1) * 0.15;
  const tone = Math.sin(2 * Math.PI * (280 + t * 140) * t) * 0.08;
  return (paper + tone) * env * 0.35; // Soft and quiet
});

// 3. Paper Unfold: whisper-soft parchment slide
const paperUnfoldWav = createWavBuffer(sampleRate, 0.55, (t) => {
  const env = Math.sin((t / 0.55) * Math.PI);
  const friction = (Math.random() * 2 - 1) * 0.12;
  const warmth = Math.sin(2 * Math.PI * 200 * t) * 0.08;
  return (friction + warmth) * env * 0.3; // Soft whisper
});

// 4. Flower Burst: delicate magical sparkling chime
const flowerBurstWav = createWavBuffer(sampleRate, 0.85, (t) => {
  const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  let val = 0;
  freqs.forEach((f, idx) => {
    const delay = idx * 0.08;
    if (t >= delay) {
      const dt = t - delay;
      val += Math.sin(2 * Math.PI * f * dt) * Math.exp(-dt * 6) * 0.14;
    }
  });
  return val;
});

// 5. Character Pop: cute bouncy soft marimba note
const characterPopWav = createWavBuffer(sampleRate, 0.3, (t) => {
  const env = Math.exp(-t * 16);
  const freq = 580 + Math.sin(t * 25) * 60;
  return Math.sin(2 * Math.PI * freq * t) * env * 0.25;
});

// 6. Soft Transition: gentle warm breeze
const softTransitionWav = createWavBuffer(sampleRate, 0.8, (t) => {
  const env = Math.sin((t / 0.8) * Math.PI);
  const noise = (Math.random() * 2 - 1) * 0.12;
  const tone = Math.sin(2 * Math.PI * (220 + Math.sin(t * 4) * 80) * t) * 0.1;
  return (noise + tone) * env * 0.4;
});

// 7. Dummy Voice Message: spoken melodic cadence
const dummyVoiceWav = createWavBuffer(sampleRate, 5.5, (t) => {
  const notes = [
    { start: 0.2, end: 1.0, freq: 175 },
    { start: 1.2, end: 2.2, freq: 196 },
    { start: 2.5, end: 3.5, freq: 165 },
    { start: 3.8, end: 5.0, freq: 147 },
  ];
  let val = 0;
  notes.forEach((n) => {
    if (t >= n.start && t < n.end) {
      const dt = t - n.start;
      const dur = n.end - n.start;
      const env = Math.sin((dt / dur) * Math.PI);
      const f1 = Math.sin(2 * Math.PI * n.freq * dt);
      const f2 = Math.sin(2 * Math.PI * (n.freq * 2) * dt) * 0.5;
      val += (f1 + f2) * env * 0.28;
    }
  });
  return val;
});

// 8. Background Music: seamless acoustic loop
const bgMusicWav = createWavBuffer(sampleRate, 12.0, (t) => {
  const chords = [
    { start: 0, notes: [261.63, 329.63, 392.00, 523.25] },
    { start: 3, notes: [246.94, 293.66, 392.00, 493.88] },
    { start: 6, notes: [220.00, 261.63, 329.63, 440.00] },
    { start: 9, notes: [174.61, 261.63, 349.23, 440.00] },
  ];
  let val = 0;
  chords.forEach((c) => {
    c.notes.forEach((freq, nIdx) => {
      const noteStart = c.start + nIdx * 0.65;
      if (t >= noteStart && t < c.start + 3.0) {
        const dt = t - noteStart;
        const env = Math.exp(-dt * 2.2);
        const f1 = Math.sin(2 * Math.PI * freq * dt);
        const f2 = Math.sin(2 * Math.PI * (freq * 2) * dt) * 0.35;
        val += (f1 + f2) * env * 0.16;
      }
    });
  });
  let boundaryFade = 1;
  if (t < 0.2) boundaryFade = t / 0.2;
  if (t > 11.8) boundaryFade = (12.0 - t) / 0.2;
  return val * boundaryFade;
});

const files = [
  { name: 'wax-seal', buffer: waxSealWav },
  { name: 'envelope-open', buffer: envelopeOpenWav },
  { name: 'paper-unfold', buffer: paperUnfoldWav },
  { name: 'flower-burst', buffer: flowerBurstWav },
  { name: 'character-pop', buffer: characterPopWav },
  { name: 'soft-transition', buffer: softTransitionWav },
  { name: 'dummy-voice-message', buffer: dummyVoiceWav },
  { name: 'personal-message', buffer: dummyVoiceWav },
  { name: 'background-music', buffer: bgMusicWav },
];

files.forEach(({ name, buffer }) => {
  fs.writeFileSync(path.join(outDir, `${name}.wav`), buffer);
  fs.writeFileSync(path.join(outDir, `${name}.mp3`), buffer);
});

console.log('Regenerated softer, gentler audio files in public/audio/');
