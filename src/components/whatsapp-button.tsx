import { WHATSAPP_CHAT_URL } from '@/lib/site';

/** Always-visible WhatsApp shortcut so visitors can message or call the consultant in one tap. */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat or call on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-[#15803D] pl-3.5 pr-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#15803D]/40 sm:bottom-6 sm:right-6"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 shrink-0" fill="currentColor">
        <path d="M16.04 3C8.84 3 3 8.8 3 15.95c0 2.3.62 4.54 1.79 6.5L3 29l6.7-1.75a13.1 13.1 0 0 0 6.34 1.62h.01c7.2 0 13.04-5.8 13.04-12.95C29.09 8.8 23.24 3 16.04 3Zm0 23.7h-.01a10.9 10.9 0 0 1-5.55-1.52l-.4-.24-3.98 1.04 1.06-3.85-.26-.4a10.7 10.7 0 0 1-1.65-5.78c0-5.95 4.9-10.8 10.92-10.8 2.91 0 5.65 1.12 7.7 3.16a10.6 10.6 0 0 1 3.2 7.64c0 5.95-4.9 10.79-10.99 10.79Zm6-8.08c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.17-1.39-.51-2.65-1.63-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.5.15-.67.15-.15.33-.38.5-.58.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.58-.08-.17-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.58.08-.88.41-.3.33-1.16 1.13-1.16 2.76s1.19 3.2 1.36 3.42c.17.22 2.34 3.57 5.67 5.01.79.34 1.41.55 1.89.7.8.25 1.52.22 2.09.13.64-.1 1.95-.8 2.23-1.57.28-.77.28-1.43.19-1.57-.08-.14-.3-.22-.63-.38Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="sr-only sm:hidden">WhatsApp</span>
    </a>
  );
}
