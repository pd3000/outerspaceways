import { ContactForm } from '../ContactForm';
import { ThemeProvider } from '../ThemeProvider';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function ContactFormExample() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <ContactForm />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}