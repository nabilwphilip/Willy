
import { toast } from "@/hooks/use-toast";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    // In a real application, you would send this data to a backend service
    // For this demo, we'll simulate sending an email using EmailJS or a similar service
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Email will be sent to: nabilwphilip@gmail.com");
    console.log("Form data:", data);
    
    // Show success message
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Show error message
    toast({
      title: "Error Sending Message",
      description: "There was a problem sending your message. Please try again later.",
      variant: "destructive",
    });
    
    return false;
  }
}
