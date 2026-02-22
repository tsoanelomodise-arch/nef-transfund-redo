import { useState, useCallback } from 'react';

export interface AppState {
  elig: boolean;
  docs: boolean;
}

export interface EligibilityAnswers {
  blackOwnership: number;
  activeInvolvement: string;
  designatedGroups: string;
  cipcRegistered: string;
  taxCompliant: string;
}

export interface DocumentAnswers {
  cipcDocs: string;
  bbbee: string;
  taxClearance: string;
}

const initialEligibilityAnswers: EligibilityAnswers = {
  blackOwnership: 51,
  activeInvolvement: '',
  designatedGroups: '',
  cipcRegistered: '',
  taxCompliant: '',
};

const initialDocumentAnswers: DocumentAnswers = {
  cipcDocs: '',
  bbbee: '',
  taxClearance: '',
};

export function usePathToFundingQuiz() {
  // App state for gating apply button
  const [appState, setAppState] = useState<AppState>({ elig: false, docs: false });
  
  // Eligibility quiz state
  const [eligibilityStep, setEligibilityStep] = useState(0);
  const [eligibilityAnswers, setEligibilityAnswers] = useState<EligibilityAnswers>(initialEligibilityAnswers);
  
  // Document quiz state
  const [documentStep, setDocumentStep] = useState(0);
  const [documentAnswers, setDocumentAnswers] = useState<DocumentAnswers>(initialDocumentAnswers);
  
  // Modal visibility states
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [docSuccessModalOpen, setDocSuccessModalOpen] = useState(false);
  const [docRejectModalOpen, setDocRejectModalOpen] = useState(false);
  const [incompleteModalOpen, setIncompleteModalOpen] = useState(false);

  // Eligibility validation
  const validateEligibility = useCallback((): boolean => {
    const { blackOwnership, cipcRegistered, taxCompliant } = eligibilityAnswers;
    return blackOwnership >= 51 && cipcRegistered === 'yes' && taxCompliant === 'yes';
  }, [eligibilityAnswers]);

  // Document validation
  const validateDocuments = useCallback((): boolean => {
    const { cipcDocs, bbbee, taxClearance } = documentAnswers;
    return cipcDocs === 'yes' && bbbee === 'yes' && taxClearance === 'yes';
  }, [documentAnswers]);

  // Update eligibility answer
  const updateEligibilityAnswer = useCallback(<K extends keyof EligibilityAnswers>(
    field: K,
    value: EligibilityAnswers[K]
  ) => {
    setEligibilityAnswers(prev => ({ ...prev, [field]: value }));
  }, []);

  // Update document answer
  const updateDocumentAnswer = useCallback(<K extends keyof DocumentAnswers>(
    field: K,
    value: DocumentAnswers[K]
  ) => {
    setDocumentAnswers(prev => ({ ...prev, [field]: value }));
  }, []);

  // Complete eligibility quiz
  const completeEligibilityQuiz = useCallback(() => {
    setEligibilityModalOpen(false);
    if (validateEligibility()) {
      setAppState(prev => ({ ...prev, elig: true }));
      setSuccessModalOpen(true);
    } else {
      setRejectModalOpen(true);
    }
  }, [validateEligibility]);

  // Complete document quiz
  const completeDocumentQuiz = useCallback(() => {
    setDocumentModalOpen(false);
    if (validateDocuments()) {
      setAppState(prev => ({ ...prev, docs: true }));
      setDocSuccessModalOpen(true);
    } else {
      setDocRejectModalOpen(true);
    }
  }, [validateDocuments]);

  // Reset eligibility quiz
  const resetEligibilityQuiz = useCallback(() => {
    setEligibilityStep(0);
    setEligibilityAnswers(initialEligibilityAnswers);
  }, []);

  // Reset document quiz
  const resetDocumentQuiz = useCallback(() => {
    setDocumentStep(0);
    setDocumentAnswers(initialDocumentAnswers);
  }, []);

  // Handle apply button click
  const handleApply = useCallback(() => {
    if (appState.elig && appState.docs) {
      window.open('https://dev-online.sa-transformationfund.co.za/', '_blank');
    } else {
      setIncompleteModalOpen(true);
    }
  }, [appState]);

  // Open eligibility modal
  const openEligibilityModal = useCallback(() => {
    resetEligibilityQuiz();
    setEligibilityModalOpen(true);
  }, [resetEligibilityQuiz]);

  // Open document modal
  const openDocumentModal = useCallback(() => {
    resetDocumentQuiz();
    setDocumentModalOpen(true);
  }, [resetDocumentQuiz]);

  return {
    // App state
    appState,
    
    // Eligibility quiz
    eligibilityStep,
    setEligibilityStep,
    eligibilityAnswers,
    updateEligibilityAnswer,
    completeEligibilityQuiz,
    resetEligibilityQuiz,
    
    // Document quiz
    documentStep,
    setDocumentStep,
    documentAnswers,
    updateDocumentAnswer,
    completeDocumentQuiz,
    resetDocumentQuiz,
    
    // Modal states
    eligibilityModalOpen,
    setEligibilityModalOpen,
    documentModalOpen,
    setDocumentModalOpen,
    successModalOpen,
    setSuccessModalOpen,
    rejectModalOpen,
    setRejectModalOpen,
    docSuccessModalOpen,
    setDocSuccessModalOpen,
    docRejectModalOpen,
    setDocRejectModalOpen,
    incompleteModalOpen,
    setIncompleteModalOpen,
    
    // Actions
    handleApply,
    openEligibilityModal,
    openDocumentModal,
  };
}
