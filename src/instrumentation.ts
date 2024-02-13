import { registerOTel } from '@vercel/otel';

export function register(): void {
  registerOTel(process.env.SERVICE_NAME || 'Example');
}
