import React, { useState, useEffect, RefObject } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

// Sample companies for examples
export const EXAMPLE_COMPANIES = [
  {
    name: "Stripe",
    url: "stripe.com",
    hq: "San Francisco, CA",
    industry: "Financial Technology"
  },
  {
    name: "Shopify",
    url: "shopify.com",
    hq: "Ottawa, Canada",
    industry: "E-commerce"
  },
  {
    name: "Notion",
    url: "notion.so",
    hq: "San Francisco, CA",
    industry: "Productivity Software"
  },
  {
    name: "Tesla",
    url: "tesla.com",
    hq: "Austin, TX",
    industry: "Automotive & Energy"
  },
  {
    name: "Airbnb",
    url: "airbnb.com",
    hq: "San Francisco, CA",
    industry: "Travel & Hospitality"
  },
  {
    name: "Slack",
    url: "slack.com",
    hq: "San Francisco, CA",
    industry: "Business Communication"
  },
  {
    name: "Spotify",
    url: "spotify.com",
    hq: "Stockholm, Sweden",
    industry: "Music Streaming"
  }
];

export type ExampleCompany = typeof EXAMPLE_COMPANIES[0];

export interface ExamplePopupProps {
  visible: boolean;
  onExampleSelect: (example: ExampleCompany) => void;
  glassStyle: {
    card: string;
    input: string;
  };
  exampleRef: RefObject<HTMLDivElement>;
}

// Example Popup Component
const ExamplePopup: React.FC<ExamplePopupProps> = ({
  visible,
  onExampleSelect,
  glassStyle,
  exampleRef
}) => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [isNameAnimating, setIsNameAnimating] = useState(false);
  
  // Cycle through examples periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger name animation
      setIsNameAnimating(true);
      setTimeout(() => {
        setSelectedExample((prev) => (prev + 1) % EXAMPLE_COMPANIES.length);
        setTimeout(() => {
          setIsNameAnimating(false);
        }, 150);
      }, 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div 
      ref={exampleRef}
      className={`absolute -top-14 left-8 ${glassStyle.card} bg-white/90 shadow-lg border-blue-200 cursor-pointer z-10 
                 flex items-center px-3 py-2 space-x-2 transform transition-all duration-300 
                 hover:shadow-xl hover:bg-white/95 hover:-translate-y-1 hover:border-blue-300 group`}
      onClick={() => onExampleSelect(EXAMPLE_COMPANIES[selectedExample])}
      style={{
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px',
        borderBottomLeftRadius: '4px',
      }}
    >
      <Sparkles className="h-4 w-4 text-blue-500 group-hover:text-blue-600 animate-pulse group-hover:animate-none group-hover:scale-110 transition-all" />
      <div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors">Try an example: </span>
        <span 
          className={`text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-all inline-block
            ${isNameAnimating ? 'opacity-0 transform -translate-y-3 scale-95' : 'opacity-100 transform translate-y-0 scale-100'}`}
          style={{ 
            transitionDuration: '150ms',
            transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.4, 1)'
          }}
        >
          {EXAMPLE_COMPANIES[selectedExample].name}
        </span>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-blue-500 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
    </div>
  );
};

export default ExamplePopup; 