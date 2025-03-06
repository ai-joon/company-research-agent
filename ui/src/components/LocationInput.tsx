import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin } from 'lucide-react';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

declare global {
  interface Window {
    google: any;
    initGoogleMapsCallback: () => void;
  }
}

// Create a global script loader to ensure we only load the script once
let scriptPromise: Promise<void> | null = null;

const loadGoogleMapsScript = (): Promise<void> => {
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise<void>((resolve) => {
    // If already loaded, resolve immediately
    if (window.google?.maps?.places) {
      resolve();
      return;
    }

    // Define the callback function
    window.initGoogleMapsCallback = () => {
      resolve();
    };

    // Create script element
    const script = document.createElement('script');
    // Use loading=async parameter as recommended by Google
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=initGoogleMapsCallback`;
    script.async = true;
    script.defer = true;
    
    // Handle errors
    script.onerror = (error) => {
      console.error('Error loading Google Maps script:', error);
      scriptPromise = null;
    };

    // Append to document
    document.head.appendChild(script);
  });

  return scriptPromise;
};

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const onChangeRef = useRef(onChange);
  const isInitializedRef = useRef(false);

  // Update the ref when onChange changes
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Load the Google Maps API
  useEffect(() => {
    // Check if script is already in the document
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingScript) {
      console.warn('Google Maps script is already loaded elsewhere in the application');
      // If script exists but API not available yet, wait for it
      if (!window.google?.maps?.places) {
        const checkInterval = setInterval(() => {
          if (window.google?.maps?.places) {
            setIsApiLoaded(true);
            clearInterval(checkInterval);
          }
        }, 100);
        
        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(checkInterval), 10000);
      } else {
        setIsApiLoaded(true);
      }
      return;
    }

    const loadApi = async () => {
      try {
        await loadGoogleMapsScript();
        setIsApiLoaded(true);
      } catch (error) {
        console.error('Failed to load Google Maps API:', error);
      }
    };

    loadApi();
  }, []);

  // Initialize autocomplete when API is loaded and input is available
  useEffect(() => {
    if (!isApiLoaded || !inputRef.current || !window.google?.maps?.places || isInitializedRef.current) {
      return;
    }

    try {
      // Initialize autocomplete
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'],
      });

      // Style the autocomplete dropdown
      const style = document.createElement('style');
      style.textContent = `
        .pac-container {
          background-color: white !important;
          border: 1px solid rgba(70, 139, 255, 0.1) !important;
          border-radius: 0.75rem !important;
          margin-top: 0.5rem !important;
          font-family: "Noto Sans", sans-serif !important;
          overflow: hidden !important;
          box-shadow: none !important;
        }
        .pac-item {
          padding: 0.875rem 1.25rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease-in-out !important;
          border-bottom: 1px solid rgba(70, 139, 255, 0.05) !important;
        }
        .pac-item:last-child {
          border-bottom: none !important;
        }
        .pac-item:hover {
          background-color: rgba(70, 139, 255, 0.03) !important;
        }
        .pac-item-selected {
          background-color: rgba(70, 139, 255, 0.05) !important;
        }
        .pac-item-query {
          color: #1a365d !important;
          font-size: 0.9375rem !important;
          font-weight: 500 !important;
        }
        .pac-matched {
          font-weight: 600 !important;
        }
        .pac-item span:not(.pac-item-query) {
          color: #64748b !important;
          font-size: 0.8125rem !important;
          margin-left: 0.5rem !important;
        }
        /* Hide the location icon */
        .pac-icon {
          display: none !important;
        }
      `;
      document.head.appendChild(style);

      // Add place_changed listener
      const autocomplete = autocompleteRef.current;
      if (autocomplete) {
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place?.formatted_address) {
            onChangeRef.current(place.formatted_address);
          }
        });
      }

      isInitializedRef.current = true;
    } catch (error) {
      console.error('Error initializing Google Maps Autocomplete:', error);
    }

    // Cleanup
    return () => {
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, [isApiLoaded]); // Removed onChange from dependencies

  // Handle manual input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-100/50 to-gray-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 stroke-[#468BFF] transition-all duration-200 group-hover:stroke-[#8FBCFA] z-10" strokeWidth={1.5} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className={`${className} !font-['DM_Sans']`}
        placeholder="City, Country"
      />
    </div>
  );
};

export default LocationInput; 