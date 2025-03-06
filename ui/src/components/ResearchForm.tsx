import React, { useState } from 'react';
import { Building2, Factory, Globe, Loader2, Search } from 'lucide-react';
import LocationInput from './LocationInput';

interface FormData {
  companyName: string;
  companyUrl: string;
  companyHq: string;
  companyIndustry: string;
}

interface ResearchFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isResearching: boolean;
  glassStyle: {
    card: string;
    input: string;
  };
  loaderColor: string;
}

const ResearchForm: React.FC<ResearchFormProps> = ({
  onSubmit,
  isResearching,
  glassStyle,
  loaderColor
}) => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyUrl: "",
    companyHq: "",
    companyIndustry: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className={`${glassStyle.card} backdrop-blur-2xl bg-white/90 border-gray-200/50 shadow-xl`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Name */}
          <div className="relative group">
            <label
              htmlFor="companyName"
              className="block text-base font-medium text-gray-700 mb-2.5 transition-all duration-200 group-hover:text-gray-900 font-['DM_Sans']"
            >
              Company Name <span className="text-gray-900/70">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-100/50 to-gray-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 stroke-[#468BFF] transition-all duration-200 group-hover:stroke-[#8FBCFA] z-10" strokeWidth={1.5} />
              <input
                required
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyName: e.target.value,
                  }))
                }
                className={`${glassStyle.input} transition-all duration-300 focus:border-[#468BFF]/50 focus:ring-1 focus:ring-[#468BFF]/50 group-hover:border-[#468BFF]/30 bg-white/80 backdrop-blur-sm text-lg py-4 pl-12 font-['DM_Sans']`}
                placeholder="Enter company name"
              />
            </div>
          </div>

          {/* Company URL */}
          <div className="relative group">
            <label
              htmlFor="companyUrl"
              className="block text-base font-medium text-gray-700 mb-2.5 transition-all duration-200 group-hover:text-gray-900 font-['DM_Sans']"
            >
              Company URL
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-100/50 to-gray-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 stroke-[#468BFF] transition-all duration-200 group-hover:stroke-[#8FBCFA] z-10" strokeWidth={1.5} />
              <input
                id="companyUrl"
                type="text"
                value={formData.companyUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyUrl: e.target.value,
                  }))
                }
                className={`${glassStyle.input} transition-all duration-300 focus:border-[#468BFF]/50 focus:ring-1 focus:ring-[#468BFF]/50 group-hover:border-[#468BFF]/30 bg-white/80 backdrop-blur-sm text-lg py-4 pl-12 font-['DM_Sans']`}
                placeholder="example.com"
              />
            </div>
          </div>

          {/* Company HQ */}
          <div className="relative group">
            <label
              htmlFor="companyHq"
              className="block text-base font-medium text-gray-700 mb-2.5 transition-all duration-200 group-hover:text-gray-900 font-['DM_Sans']"
            >
              Company HQ
            </label>
            <LocationInput
              value={formData.companyHq}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  companyHq: value,
                }))
              }
              className={`${glassStyle.input} transition-all duration-300 focus:border-[#468BFF]/50 focus:ring-1 focus:ring-[#468BFF]/50 group-hover:border-[#468BFF]/30 bg-white/80 backdrop-blur-sm text-lg py-4 pl-12 font-['DM_Sans']`}
            />
          </div>

          {/* Company Industry */}
          <div className="relative group">
            <label
              htmlFor="companyIndustry"
              className="block text-base font-medium text-gray-700 mb-2.5 transition-all duration-200 group-hover:text-gray-900 font-['DM_Sans']"
            >
              Company Industry
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-100/50 to-gray-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <Factory className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 stroke-[#468BFF] transition-all duration-200 group-hover:stroke-[#8FBCFA] z-10" strokeWidth={1.5} />
              <input
                id="companyIndustry"
                type="text"
                value={formData.companyIndustry}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyIndustry: e.target.value,
                  }))
                }
                className={`${glassStyle.input} transition-all duration-300 focus:border-[#468BFF]/50 focus:ring-1 focus:ring-[#468BFF]/50 group-hover:border-[#468BFF]/30 bg-white/80 backdrop-blur-sm text-lg py-4 pl-12 font-['DM_Sans']`}
                placeholder="e.g. Technology, Healthcare"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isResearching || !formData.companyName}
          className="relative group w-fit mx-auto block overflow-hidden rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 transition-all duration-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-12 font-['DM_Sans']"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-100/50 to-gray-50/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div className="relative flex items-center justify-center py-3.5">
            {isResearching ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 loader-icon" style={{ stroke: loaderColor }} />
                <span className="text-base font-medium text-gray-900/90">Researching...</span>
              </>
            ) : (
              <>
                <Search className="-ml-1 mr-2 h-5 w-5 text-gray-900/90" />
                <span className="text-base font-medium text-gray-900/90">Start Research</span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default ResearchForm; 