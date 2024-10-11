declare global {
  interface MusicKit {
    configure(config: { developerToken: string; app: { name: string; build: string } }): void;
    getInstance(): any;
    authorize(): Promise<string>;
  }

  interface Window {
    MusicKit: MusicKit;
  }
}

export {};
