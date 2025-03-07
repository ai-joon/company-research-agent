import React from 'react';
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Check, Copy, Download, Loader2 } from 'lucide-react';
import { GlassStyle, AnimationStyle } from '../types';

interface ResearchReportProps {
  output: {
    summary: string;
    details: {
      report: string;
    };
  } | null;
  isResetting: boolean;
  glassStyle: GlassStyle;
  fadeInAnimation: AnimationStyle;
  loaderColor: string;
  isGeneratingPdf: boolean;
  isCopied: boolean;
  onCopyToClipboard: () => void;
  onGeneratePdf: () => void;
}

const ResearchReport: React.FC<ResearchReportProps> = ({
  output,
  isResetting,
  glassStyle,
  fadeInAnimation,
  loaderColor,
  isGeneratingPdf,
  isCopied,
  onCopyToClipboard,
  onGeneratePdf
}) => {
  if (!output || !output.details) return null;

  return (
    <div 
      className={`${glassStyle.card} ${fadeInAnimation.fadeIn} ${isResetting ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'} font-['DM_Sans']`}
    >
      <div className="flex justify-end gap-2 mb-4">
        {output?.details?.report && (
          <>
            <button
              onClick={onCopyToClipboard}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#468BFF] text-white hover:bg-[#8FBCFA] transition-all duration-200"
            >
              {isCopied ? (
                <Check className="h-5 w-5" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={onGeneratePdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#FFB800] text-white hover:bg-[#FFA800] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" style={{ stroke: loaderColor }} />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  <span className="ml-2">PDF</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
      <div className="prose prose-invert prose-lg max-w-none">
        <div className="mt-4">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              div: ({node, ...props}) => (
                <div className="space-y-4 text-gray-800" {...props} />
              ),
              h1: ({node, children, ...props}) => {
                const text = String(children);
                const isFirstH1 = text.includes("Research Report");
                const isReferences = text.includes("References");
                return (
                  <div>
                    <h1 
                      className={`font-bold text-gray-900 break-words whitespace-pre-wrap ${isFirstH1 ? 'text-5xl mb-10 mt-4 max-w-[calc(100%-8rem)]' : 'text-3xl mb-6'}`} 
                      {...props} 
                    >
                      {children}
                    </h1>
                    {isReferences && (
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"></div>
                    )}
                  </div>
                );
              },
              h2: ({node, ...props}) => (
                <h2 className="text-3xl font-bold text-gray-900 first:mt-2 mt-8 mb-4" {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props} />
              ),
              p: ({node, children, ...props}) => {
                const text = String(children);
                const isSubsectionHeader = (
                  text.includes('\n') === false && 
                  text.length < 50 && 
                  (text.endsWith(':') || /^[A-Z][A-Za-z\s\/]+$/.test(text))
                );
                
                if (isSubsectionHeader) {
                  return (
                    <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                      {text.endsWith(':') ? text.slice(0, -1) : text}
                    </h3>
                  );
                }
                
                const isBulletLabel = text.startsWith('•') && text.includes(':');
                if (isBulletLabel) {
                  const [label, content] = text.split(':');
                  return (
                    <div className="text-gray-800 my-2">
                      <span className="font-semibold text-gray-900">
                        {label.replace('•', '').trim()}:
                      </span>
                      {content}
                    </div>
                  );
                }
                
                const urlRegex = /(https?:\/\/[^\s<>"]+)/g;
                if (urlRegex.test(text)) {
                  const parts = text.split(urlRegex);
                  return (
                    <p className="text-gray-800 my-2" {...props}>
                      {parts.map((part, i) => 
                        urlRegex.test(part) ? (
                          <a 
                            key={i}
                            href={part}
                            className="text-[#468BFF] hover:text-[#8FBCFA] underline decoration-[#468BFF] hover:decoration-[#8FBCFA] cursor-pointer transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {part}
                          </a>
                        ) : part
                      )}
                    </p>
                  );
                }
                
                return <p className="text-gray-800 my-2" {...props}>{children}</p>;
              },
              ul: ({node, ...props}) => (
                <ul className="text-gray-800 space-y-1 list-disc pl-6" {...props} />
              ),
              li: ({node, ...props}) => (
                <li className="text-gray-800" {...props} />
              ),
              a: ({node, href, ...props}) => (
                <a 
                  href={href}
                  className="text-[#468BFF] hover:text-[#8FBCFA] underline decoration-[#468BFF] hover:decoration-[#8FBCFA] cursor-pointer transition-colors" 
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props} 
                />
              ),
            }}
          >
            {output.details.report || "No report available"}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ResearchReport; 