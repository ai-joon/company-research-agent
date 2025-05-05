import { API_URL } from './constants';
import { ResearchOutput, ResearchState, ResearchStatusType } from '../types';

export const handleGeneratePdf = async (
  output: ResearchOutput | null,
  originalCompanyName: string,
  setIsGeneratingPdf: (value: boolean) => void,
  setError: (error: string | null) => void,
  isGeneratingPdf: boolean
) => {
  if (!output || isGeneratingPdf) return;
  
  setIsGeneratingPdf(true);
  try {
    console.log("Generating PDF with company name:", originalCompanyName);
    const response = await fetch(`${API_URL}/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        report_content: output.details.report,
        company_name: originalCompanyName || 'research_report'
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }
    
    // Get the blob from the response
    const blob = await response.blob();
    
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `${originalCompanyName || 'research_report'}.pdf`;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    setError(error instanceof Error ? error.message : 'Failed to generate PDF');
  } finally {
    setIsGeneratingPdf(false);
  }
};

export const handleCopyToClipboard = async (
  output: ResearchOutput | null,
  setIsCopied: (value: boolean) => void,
  setError: (error: string | null) => void
) => {
  if (!output?.details?.report) return;
  
  try {
    await navigator.clipboard.writeText(output.details.report);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  } catch (err) {
    console.error('Failed to copy text: ', err);
    setError('Failed to copy to clipboard');
  }
};

export const checkForFinalReport = async (
  jobId: string,
  setOutput: (output: ResearchOutput | null) => void,
  setStatus: (status: ResearchStatusType | null) => void,
  setIsComplete: (value: boolean) => void,
  setIsResearching: (value: boolean) => void,
  setCurrentPhase: (phase: 'search' | 'enrichment' | 'briefing' | 'complete' | null) => void,
  setHasFinalReport: (value: boolean) => void,
  pollingIntervalRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  try {
    const response = await fetch(`${API_URL}/research/status/${jobId}`);
    if (!response.ok) throw new Error('Failed to fetch status');
    
    const data = await response.json();
    
    if (data.status === "completed" && data.result?.report) {
      setOutput({
        summary: "",
        details: {
          report: data.result.report,
        },
      });
      setStatus({
        step: "Complete",
        message: "Research completed successfully"
      });
      setIsComplete(true);
      setIsResearching(false);
      setCurrentPhase('complete');
      setHasFinalReport(true);
      
      // Clear polling interval
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    }
  } catch (error) {
    console.error('Error checking final report:', error);
  }
};

export const resetResearch = (
  setStatus: (status: ResearchStatusType | null) => void,
  setOutput: (output: ResearchOutput | null) => void,
  setError: (error: string | null) => void,
  setIsComplete: (value: boolean) => void,
  setResearchState: (state: ResearchState) => void,
  setPdfUrl: (url: string | null) => void,
  setCurrentPhase: (phase: 'search' | 'enrichment' | 'briefing' | 'complete' | null) => void,
  setIsSearchPhase: (value: boolean) => void,
  setShouldShowQueries: (value: boolean) => void,
  setIsQueriesExpanded: (value: boolean) => void,
  setIsBriefingExpanded: (value: boolean) => void,
  setIsEnrichmentExpanded: (value: boolean) => void,
  setIsResetting: (value: boolean) => void,
  setHasScrolledToStatus: (value: boolean) => void
) => {
  setIsResetting(true);
  
  // Use setTimeout to create a smooth transition
  setTimeout(() => {
    setStatus(null);
    setOutput(null);
    setError(null);
    setIsComplete(false);
    setResearchState({
      status: "idle",
      message: "",
      queries: [],
      streamingQueries: {},
      briefingStatus: {
        company: false,
        industry: false,
        financial: false,
        news: false
      }
    });
    setPdfUrl(null);
    setCurrentPhase(null);
    setIsSearchPhase(false);
    setShouldShowQueries(false);
    setIsQueriesExpanded(true);
    setIsBriefingExpanded(true);
    setIsEnrichmentExpanded(true);
    setIsResetting(false);
    setHasScrolledToStatus(false); // Reset scroll flag when resetting research
  }, 300); // Match this with CSS transition duration
}; 