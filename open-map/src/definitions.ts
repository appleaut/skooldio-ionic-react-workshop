declare module '@capacitor/core' {
  interface PluginRegistry {
    OpenMap: OpenMapPlugin;
  }
}

export interface OpenMapPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  open(options: { longitude: number; latitude: number }): Promise<void>;
}
