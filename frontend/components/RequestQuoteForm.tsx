import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Mail, Phone, MapPin, Calendar, DollarSign, Send } from 'lucide-react';
import { quotesAPI } from "../src/lib/api";
import { toast } from "react-toastify";
import Success from './Success';



const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  location: z.string().min(1, 'Please select your location'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select your budget range'),
  timeline: z.string().min(1, 'Please select your preferred timeline'),
  description: z.string().min(20, 'Please provide at least 20 characters describing your project'),
  hasPlans: z.boolean().default(false),
  newsletter: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export default function RequestQuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Only one form instance
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      projectType: '',
      budget: '',
      timeline: '',
      description: '',
      hasPlans: false,
      newsletter: false,
    },
  });

  const { reset } = form;

  const onSubmit = async (data: FormData) => {
    console.log("Quote Request Data:", data);

    try {
      const response = await quotesAPI.submit(data);
      console.log("✅ Quote submitted:", response);

      toast.success("Your quote request was submitted successfully!");
      setIsSubmitted(true);

      reset(); // ✅ works now
    } catch (error: any) {
      console.error("❌ Error submitting quote:", error);
      toast.error("Failed to submit quote. Please try again.");
    }
  };

  if (isSubmitted) {
    return <Success />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="container mx-auto ">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Request a Quote
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tell us about your project and we'll provide you with a detailed quote within 24 hours. 
              All consultations are completely free.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your first name" 
                            className="h-12 border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your last name" 
                            className="h-12 border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your.email@example.com" 
                            className="h-12 border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+234 xxx xxx xxxx" 
                            className="h-12 border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Location and Project Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Location
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20">
                              <SelectValue placeholder="Select your location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="lagos">Lagos, Nigeria</SelectItem>
                            <SelectItem value="abuja">Abuja, Nigeria</SelectItem>
                            <SelectItem value="port-harcourt">Port Harcourt, Nigeria</SelectItem>
                            <SelectItem value="kano">Kano, Nigeria</SelectItem>
                            <SelectItem value="london">London, UK</SelectItem>
                            <SelectItem value="manchester">Manchester, UK</SelectItem>
                            <SelectItem value="birmingham">Birmingham, UK</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="residential-design">Residential Interior Design</SelectItem>
                            <SelectItem value="commercial-design">Commercial Interior Design</SelectItem>
                            <SelectItem value="renovation">Home Renovation</SelectItem>
                            <SelectItem value="kitchen-remodel">Kitchen Remodeling</SelectItem>
                            <SelectItem value="bathroom-remodel">Bathroom Remodeling</SelectItem>
                            <SelectItem value="office-design">Office Design</SelectItem>
                            <SelectItem value="consultation">Design Consultation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Budget and Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Budget Range
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20">
                              <SelectValue placeholder="Select your budget range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="under-50k">Under ₦50,000 / £500</SelectItem>
                            <SelectItem value="50k-200k">₦50,000 - ₦200,000 / £500 - £2,000</SelectItem>
                            <SelectItem value="200k-500k">₦200,000 - ₦500,000 / £2,000 - £5,000</SelectItem>
                            <SelectItem value="500k-1m">₦500,000 - ₦1,000,000 / £5,000 - £10,000</SelectItem>
                            <SelectItem value="1m-5m">₦1,000,000 - ₦5,000,000 / £10,000 - £50,000</SelectItem>
                            <SelectItem value="over-5m">Over ₦5,000,000 / £50,000</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Preferred Timeline
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20">
                              <SelectValue placeholder="When would you like to start?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="asap">As soon as possible</SelectItem>
                            <SelectItem value="1-month">Within 1 month</SelectItem>
                            <SelectItem value="2-3-months">2-3 months</SelectItem>
                            <SelectItem value="3-6-months">3-6 months</SelectItem>
                            <SelectItem value="6-months-plus">6+ months</SelectItem>
                            <SelectItem value="flexible">I'm flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Project Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your project in detail. Include room dimensions, style preferences, specific requirements, and any other relevant information..."
                          className="min-h-32 border-slate-200 focus:border-brand-blue focus:ring-brand-blue/20 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Checkboxes */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="hasPlans"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-slate-700 font-medium cursor-pointer">
                            I have existing floor plans or architectural drawings
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-slate-700 font-medium cursor-pointer">
                            Subscribe to our newsletter for design tips and updates
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white h-14 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/25"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        Request Quote
                      </div>
                    )}
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="text-center pt-4 text-sm text-slate-500">
                  <p>
                    By submitting this form, you agree to our terms of service. 
                    We'll contact you within 24 hours to discuss your project.
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}