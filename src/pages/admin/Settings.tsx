
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Shield, Bell, Globe, Moon, Sun, Smartphone, Laptop } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the settings type for localStorage
interface WebsiteSettings {
  appearance: {
    theme: string;
    reducedMotion: boolean;
    highContrast: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    marketingEmails: boolean;
    activitySummary: boolean;
  };
  seo: {
    siteTitle: string;
    siteDescription: string;
    siteKeywords: string;
  };
  privacy: {
    showPortfolioStats: boolean;
    showContactInfo: boolean;
    showTestimonialAuthors: boolean;
  };
}

// Function to load settings from localStorage
const loadSettings = (): WebsiteSettings => {
  const savedSettings = localStorage.getItem('websiteSettings');
  
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (e) {
      console.error('Error parsing settings from localStorage:', e);
    }
  }
  
  // Default settings if nothing is saved or there's an error
  return {
    appearance: {
      theme: 'system',
      reducedMotion: false,
      highContrast: false
    },
    notifications: {
      emailNotifications: true,
      marketingEmails: false,
      activitySummary: true
    },
    seo: {
      siteTitle: 'Nabil William - Influencer Marketing Specialist',
      siteDescription: 'Expert influencer marketing manager helping brands connect with their audience through strategic partnerships.',
      siteKeywords: 'influencer marketing, social media, brand partnerships, digital marketing'
    },
    privacy: {
      showPortfolioStats: true,
      showContactInfo: true,
      showTestimonialAuthors: true
    }
  };
};

// Function to save settings to localStorage
const saveSettings = (settings: WebsiteSettings) => {
  localStorage.setItem('websiteSettings', JSON.stringify(settings));
};

export function Settings() {
  // Load settings from localStorage on initial render
  const [settings, setSettings] = useState<WebsiteSettings>(loadSettings());
  
  // Destructure settings for easier access
  const { appearance, notifications, seo, privacy } = settings;
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Update the document theme when theme setting changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (appearance.theme === 'dark') {
      htmlElement.classList.add('dark');
    } else if (appearance.theme === 'light') {
      htmlElement.classList.remove('dark');
    } else if (appearance.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
    
    // Apply reduced motion if enabled
    if (appearance.reducedMotion) {
      htmlElement.classList.add('motion-reduce');
    } else {
      htmlElement.classList.remove('motion-reduce');
    }
    
    // Apply high contrast if enabled
    if (appearance.highContrast) {
      htmlElement.classList.add('high-contrast');
    } else {
      htmlElement.classList.remove('high-contrast');
    }
    
  }, [appearance.theme, appearance.reducedMotion, appearance.highContrast]);
  
  // Helper function to update settings
  const updateSettings = <K extends keyof WebsiteSettings, SK extends keyof WebsiteSettings[K]>(
    category: K, 
    key: SK, 
    value: any
  ) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    
    setSettings(newSettings);
    saveSettings(newSettings);
  };
  
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Save settings to localStorage
      saveSettings(settings);
      
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error('Settings save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Sun className="h-4 w-4" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> SEO
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Privacy
          </TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSaveSettings}>
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the website looks and feels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <Button
                          type="button"
                          variant={appearance.theme === 'light' ? 'default' : 'outline'}
                          className="w-full h-16 flex flex-col items-center justify-center gap-2"
                          onClick={() => updateSettings('appearance', 'theme', 'light')}
                        >
                          <Sun className="h-5 w-5" />
                          <span>Light</span>
                        </Button>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <Button
                          type="button"
                          variant={appearance.theme === 'dark' ? 'default' : 'outline'}
                          className="w-full h-16 flex flex-col items-center justify-center gap-2"
                          onClick={() => updateSettings('appearance', 'theme', 'dark')}
                        >
                          <Moon className="h-5 w-5" />
                          <span>Dark</span>
                        </Button>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <Button
                          type="button"
                          variant={appearance.theme === 'system' ? 'default' : 'outline'}
                          className="w-full h-16 flex flex-col items-center justify-center gap-2"
                          onClick={() => updateSettings('appearance', 'theme', 'system')}
                        >
                          <Laptop className="h-5 w-5" />
                          <span>System</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reduced-motion" className="text-base font-medium">Reduced Motion</Label>
                        <p className="text-sm text-gray-500">Minimize animations throughout the website</p>
                      </div>
                      <Switch 
                        id="reduced-motion" 
                        checked={appearance.reducedMotion}
                        onCheckedChange={(value) => updateSettings('appearance', 'reducedMotion', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="high-contrast" className="text-base font-medium">High Contrast</Label>
                        <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                      </div>
                      <Switch 
                        id="high-contrast" 
                        checked={appearance.highContrast}
                        onCheckedChange={(value) => updateSettings('appearance', 'highContrast', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure how you receive notifications and updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="text-base font-medium">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={notifications.emailNotifications}
                        onCheckedChange={(value) => updateSettings('notifications', 'emailNotifications', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing-emails" className="text-base font-medium">Marketing Emails</Label>
                        <p className="text-sm text-gray-500">Receive updates about new features and products</p>
                      </div>
                      <Switch 
                        id="marketing-emails" 
                        checked={notifications.marketingEmails}
                        onCheckedChange={(value) => updateSettings('notifications', 'marketingEmails', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="activity-summary" className="text-base font-medium">Activity Summary</Label>
                        <p className="text-sm text-gray-500">Receive weekly summaries of website activity</p>
                      </div>
                      <Switch 
                        id="activity-summary" 
                        checked={notifications.activitySummary}
                        onCheckedChange={(value) => updateSettings('notifications', 'activitySummary', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* SEO Settings */}
          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Optimize your website for search engines.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="site-title">Site Title</Label>
                    <Input
                      id="site-title"
                      value={seo.siteTitle}
                      onChange={(e) => updateSettings('seo', 'siteTitle', e.target.value)}
                      placeholder="Your Website Title"
                    />
                    <p className="text-sm text-gray-500">
                      This appears in search engine results and browser tabs.
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Textarea
                      id="site-description"
                      value={seo.siteDescription}
                      onChange={(e) => updateSettings('seo', 'siteDescription', e.target.value)}
                      placeholder="Brief description of your website"
                      className="resize-none"
                      rows={3}
                    />
                    <p className="text-sm text-gray-500">
                      This appears in search engine results. Keep it under 160 characters.
                    </p>
                    <div className="text-xs text-right">
                      {seo.siteDescription.length}/160 characters
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="site-keywords">Keywords (comma separated)</Label>
                    <Input
                      id="site-keywords"
                      value={seo.siteKeywords}
                      onChange={(e) => updateSettings('seo', 'siteKeywords', e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control what information is visible to visitors.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-portfolio-stats" className="text-base font-medium">Show Portfolio Statistics</Label>
                        <p className="text-sm text-gray-500">Display statistics for your portfolio projects</p>
                      </div>
                      <Switch 
                        id="show-portfolio-stats" 
                        checked={privacy.showPortfolioStats}
                        onCheckedChange={(value) => updateSettings('privacy', 'showPortfolioStats', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-contact-info" className="text-base font-medium">Show Contact Information</Label>
                        <p className="text-sm text-gray-500">Display your contact details on the website</p>
                      </div>
                      <Switch 
                        id="show-contact-info" 
                        checked={privacy.showContactInfo}
                        onCheckedChange={(value) => updateSettings('privacy', 'showContactInfo', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-testimonial-authors" className="text-base font-medium">Show Testimonial Authors</Label>
                        <p className="text-sm text-gray-500">Display names and companies of people who provided testimonials</p>
                      </div>
                      <Switch 
                        id="show-testimonial-authors" 
                        checked={privacy.showTestimonialAuthors}
                        onCheckedChange={(value) => updateSettings('privacy', 'showTestimonialAuthors', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}

export default Settings;
