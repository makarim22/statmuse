class SoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  constructor() {
    // Safely check localStorage for user preference
    try {
      const savedMute = localStorage.getItem('garuda_stats_muted');
      if (savedMute === 'true') {
        this.isMuted = true;
      }
    } catch (e) {
      // Ignore SSR or private mode errors
    }
  }

  // Must be called upon first user interaction
  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('garuda_stats_muted', this.isMuted.toString());
    } catch (e) {}
    
    // Play a click if we just unmuted
    if (!this.isMuted) {
      this.init();
      this.playClick();
    }
  }

  // A sharp click sound mimicking a heavy mechanical switch
  public playClick() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    // Noise burst for the "clack"
    const bufferSize = this.ctx.sampleRate * 0.05; // 50ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 800; // Crisp high frequency
    
    const noiseEnvelope = this.ctx.createGain();
    noiseEnvelope.gain.setValueAtTime(0.5, t);
    noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, t + 0.04);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(this.ctx.destination);
    
    noise.start(t);
  }

  // A heavy, low-pitch thud for modals and massive UI shifts
  public playThud() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    // Frequency drop for impact effect
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.15);
    
    gain.gain.setValueAtTime(1, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Upward arpeggio for Gamification correct answers
  public playSuccess() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    
    osc.frequency.setValueAtTime(440, t); // A4
    osc.frequency.setValueAtTime(554.37, t + 0.1); // C#5
    osc.frequency.setValueAtTime(659.25, t + 0.2); // E5
    osc.frequency.setValueAtTime(880, t + 0.3); // A5
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.05);
    gain.gain.setValueAtTime(0.15, t + 0.35);
    gain.gain.linearRampToValueAtTime(0, t + 0.45);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.45);
  }

  // Harsh low buzz for Gamification incorrect answers
  public playError() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.setValueAtTime(100, t + 0.15); 
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.35);
  }

  // Fast 2-tone jump for Coin-up
  public playCoinUp() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    
    osc.frequency.setValueAtTime(987.77, t); // B5
    osc.frequency.setValueAtTime(1318.51, t + 0.1); // E6
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.1, t + 0.05);
    gain.gain.setValueAtTime(0.1, t + 0.15);
    gain.gain.linearRampToValueAtTime(0, t + 0.25);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.25);
  }

  // Very short, snappy noise burst for Typewriter
  public playTypewriter() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    const bufferSize = this.ctx.sampleRate * 0.02; // 20ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    
    const noiseEnvelope = this.ctx.createGain();
    noiseEnvelope.gain.setValueAtTime(0.2, t);
    noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, t + 0.02);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseEnvelope);
    noiseEnvelope.connect(this.ctx.destination);
    
    noise.start(t);
  }

  // Triumphant Fanfare for High Score / Level Up
  public playLevelUp() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    
    // Fanfare: C5, E5, G5, C6 (Arpeggio up)
    osc.frequency.setValueAtTime(523.25, t); // C5
    osc.frequency.setValueAtTime(659.25, t + 0.15); // E5
    osc.frequency.setValueAtTime(783.99, t + 0.3); // G5
    osc.frequency.setValueAtTime(1046.50, t + 0.45); // C6
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.1);
    gain.gain.setValueAtTime(0.15, t + 0.6);
    gain.gain.linearRampToValueAtTime(0, t + 0.8);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.8);
  }

  // Soft, short tick for hovering elements
  public playHover() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.05);
  }
}

export const soundEngine = new SoundEngine();
