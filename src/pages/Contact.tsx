
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SectionHeading from '@/components/common/SectionHeading';
import { sendEmail, ContactFormData } from '@/utils/emailService';
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }).max(100),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Ensure that values matches the ContactFormData interface explicitly
      const contactData: ContactFormData = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      };
      
      await sendEmail(contactData);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <SectionHeading 
        title="Get in Touch" 
        subtitle="I'd love to hear about your project or opportunity."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg p-8 shadow-gold-sm">
            <h3 className="text-xl font-bold font-playfair mb-6 text-brand-gold">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="text-brand-gold h-5 w-5 mt-1 mr-3" />
                <div>
                  <h4 className="text-base font-semibold mb-1">Email</h4>
                  <a href="mailto:nabilwphilip@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-brand-gold transition-colors">
                    nabilwphilip@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-brand-gold h-5 w-5 mt-1 mr-3" />
                <div>
                  <h4 className="text-base font-semibold mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-300 hover:text-brand-gold transition-colors">
                    +20 1156782182
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="text-brand-gold h-5 w-5 mt-1 mr-3" />
                <div>
                  <h4 className="text-base font-semibold mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Mansoura, Egypt
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-base font-semibold mb-3">Follow Me</h4>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/in/nabilwilliam" target='_blank' className="h-10 w-10 rounded-full border border-brand-gold/30 flex items-center justify-center hover:bg-brand-gold/10 transition-colors">
                  <Linkedin className="h-5 w-5 text-brand-gold" />
                </a>
                <a href="https://instagram.com/nabilwphilip" target='_blank' className="h-10 w-10 rounded-full border border-brand-gold/30 flex items-center justify-center hover:bg-brand-gold/10 transition-colors">
                  <Instagram className="h-5 w-5 text-brand-gold" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg p-8 shadow-gold-sm">
            <h3 className="text-xl font-bold font-playfair mb-4 text-brand-gold">Availability</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I'm currently available for new influencer marketing projects and consulting opportunities.
            </p>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="mb-2"><span className="font-semibold">Sunday - Friday:</span> 9:00 AM - 6:00 PM EST</p>
              <p><span className="font-semibold">Response Time:</span> Within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg p-8 shadow-gold-sm">
            <h3 className="text-xl font-bold font-playfair mb-6 text-brand-gold">Send Me a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project inquiry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project or opportunity..." 
                          rows={6} 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Please provide details about what you're looking for.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
