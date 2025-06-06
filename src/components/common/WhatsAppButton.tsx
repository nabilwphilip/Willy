
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201156782182" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40"
    >
      <Button 
        size="icon" 
        className="h-14 w-14 rounded-full bg-brand-gold hover:bg-brand-gold-dark shadow-lg transition-all duration-300 glow-effect"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="h-6 w-6 fill-white text-white" />
      </Button>
    </a>
  );
}

export default WhatsAppButton;
