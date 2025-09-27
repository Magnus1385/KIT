/// <reference types="vite/client" />

interface Window {
  fbq(type: string, event: string, data?: any): void;
}