import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import ImageComponent from '@/components/Image';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        // In a production environment, you would fetch this from your backend
        // For now, we'll display sample reviews
        const sampleReviews: GoogleReview[] = [
          {
            author_name: "Maria Johnson",
            rating: 5,
            text: "Dr. Aguil and his team are exceptional! The office environment is so calming, and my smile transformation exceeded my expectations. Highly recommend for anyone looking for top-quality dental care.",
            time: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
            profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
          },
          {
            author_name: "James Wilson",
            rating: 5,
            text: "Best dental experience I've ever had. From the moment you walk in, you know you're in for a premium experience. Dr. Aguil takes the time to explain everything and makes sure you're comfortable throughout the procedure.",
            time: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
            profile_photo_url: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop"
          },
          {
            author_name: "Sofia Martinez",
            rating: 5,
            text: "I was extremely nervous about my dental work, but the team at Exquisite Dentistry made me feel at ease. The results are amazing, and I couldn't be happier with my new smile!",
            time: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
            profile_photo_url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1974&auto=format&fit=crop"
          },
          {
            author_name: "Daniel Kim",
            rating: 5,
            text: "Dr. Aguil is a true artist. My veneers look completely natural, and the whole process was much smoother than I expected. The office is beautiful, and the staff is professional and friendly.",
            time: Date.now() - 21 * 24 * 60 * 60 * 1000, // 21 days ago
            profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
          }
        ];
        
        setReviews(sampleReviews);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Google reviews:", err);
        setError("Unable to load Google Reviews at this time. Please try again later.");
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em]"></div>
        <p className="mt-6 text-black-light">Loading Google Reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <OptimizedImage
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google"
            className="h-8 object-contain"
            width={92}
            height={30}
            fallbackSrc="/placeholder.svg"
          />
          <span className="text-lg font-medium">Reviews</span>
        </div>
        <a 
          href="https://g.page/r/Ccg0Xrr-M_pIEAE/review" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-gold hover:text-gold-dark transition-colors"
        >
          <MessageSquare size={16} className="mr-2" />
          <span>Write a review</span>
          <ExternalLink size={14} className="ml-1.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review, index) => (
          <div 
            key={index} 
            className={cn(
              "bg-white rounded-sm shadow-md p-8 opacity-0",
              index % 2 === 0 ? "animate-fade-in-left" : "animate-fade-in-right"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center mb-5">
              {review.profile_photo_url ? (
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <OptimizedImage
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-full h-full object-cover"
                    width={48}
                    height={48}
                    fallbackSrc="/placeholder.svg"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="text-lg font-medium text-gray-500">
                    {review.author_name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-medium text-black">{review.author_name}</h3>
                <p className="text-xs text-black-light/70 mt-1">{formatDate(review.time)}</p>
              </div>
            </div>
            
            <div className="flex mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={cn(
                    i < review.rating ? "text-gold fill-gold" : "text-gray-300",
                    "mr-0.5"
                  )}
                />
              ))}
            </div>
            
            <p className="text-black-light/80 mb-4 leading-relaxed">{review.text}</p>
            
            <div className="flex items-center text-xs text-black-light/60">
              <OptimizedImage
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                className="h-4 object-contain mr-1.5"
                width={46}
                height={15}
                fallbackSrc="/placeholder.svg"
              />
              <span>Posted on Google</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a 
          href="https://g.page/r/Ccg0Xrr-M_pIEAE/review" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="group">
            View All Google Reviews
            <ExternalLink size={16} className="ml-2.5" />
          </Button>
        </a>
      </div>

      <div className="mt-16 bg-gray-50 rounded-sm p-8 border border-gray-100">
        <h3 className="heading-sm mb-5">Implementation Note</h3>
        <p className="paragraph mb-6">
          This component currently displays sample reviews. To fetch actual Google reviews, you'll need to:
        </p>
        <ol className="list-decimal list-inside space-y-3 text-black-light/80">
          <li className="pl-1">Set up a backend API to securely fetch reviews from the Google Places API</li>
          <li className="pl-1">Use your Google API key on the server-side to make requests to the Places API</li>
          <li className="pl-1">Implement caching to reduce API calls and improve performance</li>
          <li className="pl-1">Create an endpoint that your frontend can call to retrieve the reviews</li>
        </ol>
        <p className="paragraph mt-6">
          For security reasons, Google API keys should never be exposed in frontend code.
        </p>
      </div>
    </div>
  );
};

export default GoogleReviews;
