import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, Upload, FileText, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import VideoHero from '@/components/VideoHero';
import ConversionButton from '@/components/ConversionButton';
import ShareYourStoryStructuredData from '@/components/ShareYourStoryStructuredData';
import PageSEO from '@/components/seo/PageSEO';

const ShareYourStory = () => {
  const heroProps = {
    title: "Share Your Transformation Story",
    subtitle: "Help future patients by sharing your experience at Exquisite Dentistry. Your story could inspire someone to transform their smile too!",
    primaryCta: {
      text: "Get Started",
      href: "#choose-path"
    },
    height: "medium" as const,
    badge: "PATIENT STORIES"
  };

  const faqs = [
    {
      question: "Who is eligible to submit a story?",
      answer: "Any patient who has received treatment at Exquisite Dentistry is eligible to share their story and receive rewards for their participation."
    },
    {
      question: "How long should my testimonial be?",
      answer: "Written testimonials should be 2-3 sentences minimum. Video testimonials should be at least 30 seconds long to qualify for the Apple Watch raffle."
    },
    {
      question: "When will I receive my reward?",
      answer: "Digital gift cards are typically sent within 5-7 business days after your story is approved. Apple Watch raffle winners will be contacted within 30 days of submission."
    },
    {
      question: "Will my story be shared publicly?",
      answer: "Yes, your story may be featured on our website, social media, and marketing materials to help other patients learn about our services. Your privacy and comfort are our priority."
    },
    {
      question: "What should I include in my story?",
      answer: "Share what brought you to our practice, your experience during treatment, how Dr. Aguil and our team made you feel, and how your new smile has impacted your life."
    },
    {
      question: "Can I submit multiple stories?",
      answer: "You can submit one story per treatment experience. If you've had multiple treatments, you're welcome to share separate stories for each."
    }
  ];

  return (
    <>
      <PageSEO 
        title="Share Your Transformation Story | Exquisite Dentistry"
        description="Share your dental transformation story with Exquisite Dentistry and receive rewards. Help future patients by sharing your experience with Dr. Alexie Aguil."
        path="/share-your-story"
        keywords="dental testimonials, patient stories, smile transformation, dental reviews, Los Angeles dentist"
      />
      <ShareYourStoryStructuredData />
      
      {/* Hero Section */}
      <VideoHero {...heroProps} />

      {/* How It Works Section */}
      <motion.section 
        className="py-16 md:py-24 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6">
            Patient Stories Program
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Help Future Patients with Your Story
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Your transformation story can inspire others to take the first step toward their dream smile. 
            Share what brought you to our practice, your experience with Dr. Aguil and our team, and how 
            your new smile has changed your life. As a thank you, we're offering exciting rewards for your participation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inspire Others</h3>
              <p className="text-gray-600">Help future patients understand what to expect from their journey</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Your Joy</h3>
              <p className="text-gray-600">Celebrate your transformation and the confidence it's brought you</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Rewarded</h3>
              <p className="text-gray-600">Receive thank-you gifts for sharing your experience</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Choose Your Path Section */}
      <motion.section 
        id="choose-path"
        className="py-16 md:py-24 bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-6">
              Choose Your Path
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Two Ways to Share Your Story
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select the option that works best for you. Both paths help future patients and come with exciting rewards!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Written Testimonial Path */}
            <Card className="p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Quick & Easy
                </Badge>
              </div>
              
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Written Testimonial
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Share your experience in a quick written format. Perfect for those who prefer typing over recording.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  Takes 3-5 minutes
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Gift className="w-4 h-4 mr-2 text-primary" />
                  $20 Starbucks Gift Card
                </div>
              </div>
              
              <ConversionButton
                variant="default"
                size="lg"
                className="w-full"
                href="https://form.typeform.com/written-testimonial"
                target="_blank"
                rel="noopener noreferrer"
                trackConversion={true}
              >
                Start Written Testimonial
              </ConversionButton>
            </Card>

            {/* Video Testimonial Path */}
            <Card className="p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary/20">
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-white">
                  Big Reward
                </Badge>
              </div>
              
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Video Testimonial
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Record a 30+ second video sharing your transformation story. More personal and impactful for future patients.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  30+ seconds minimum
                </div>
                <div className="flex items-center text-sm text-primary font-semibold">
                  <Gift className="w-4 h-4 mr-2" />
                  Apple Watch Raffle Entry
                </div>
              </div>
              
              <ConversionButton
                variant="default"
                size="lg"
                className="w-full"
                href="https://form.typeform.com/video-testimonial"
                target="_blank"
                rel="noopener noreferrer"
                trackConversion={true}
              >
                Submit Video Testimonial
              </ConversionButton>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* 3-Step Process Section */}
      <motion.section 
        className="py-16 md:py-24 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-6">
              Simple Process
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            
            <p className="text-lg text-gray-600">
              Follow these simple steps to share your story and receive your reward
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Choose Your Path",
                description: "Select either the written testimonial for a $20 Starbucks card or video testimonial for Apple Watch raffle entry.",
                icon: FileText
              },
              {
                step: "2", 
                title: "Submit Your Story",
                description: "Follow the prompts in the form to share your experience with our practice and your transformation journey.",
                icon: Upload
              },
              {
                step: "3",
                title: "Receive Your Reward",
                description: "Our team will review your submission and contact you via email within 5-7 days to arrange your thank-you gift.",
                icon: Gift
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <item.icon className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-16 md:py-24 bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-6">
              Frequently Asked Questions
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Questions About Sharing Your Story
            </h2>
            
            <p className="text-lg text-gray-600">
              Everything you need to know about our patient story program
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 bg-white"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help!
            </p>
            <ConversionButton
              variant="outline"
              size="lg"
              href="/contact"
              className="mr-4"
            >
              Contact Us
            </ConversionButton>
            <ConversionButton
              variant="default"
              size="lg"
              href="#choose-path"
            >
              Get Started
            </ConversionButton>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default ShareYourStory;