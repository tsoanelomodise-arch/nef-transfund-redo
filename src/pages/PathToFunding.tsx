import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PhakamaniNavbar from '@/components/phakamani/PhakamaniNavbar';
import Footer from '@/components/transformation/Footer';
import PathToFundingHero from '@/components/path-to-funding/PathToFundingHero';
import EligibilityCriteriaSection from '@/components/path-to-funding/EligibilityCriteriaSection';
import FundingConditionsSection from '@/components/path-to-funding/FundingConditionsSection';


import EligibilityModal from '@/components/path-to-funding/EligibilityModal';
import DocumentCheckModal from '@/components/path-to-funding/DocumentCheckModal';
import {
  SuccessModal,
  RejectModal,
  DocSuccessModal,
  DocRejectModal,
  IncompleteModal,
} from '@/components/path-to-funding/ResultModals';
import { usePathToFundingQuiz } from '@/hooks/usePathToFundingQuiz';

const PathToFunding: React.FC = () => {
  const quiz = usePathToFundingQuiz();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Eligibility & Criteria | Transformation Fund';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how to apply for the Transformation Fund. Check your eligibility, prepare your documents, and submit your application for business funding support.');
    }
  }, []);

  // Handle hash scroll on navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleSuccessContinue = () => {
    quiz.setSuccessModalOpen(false);
    quiz.openDocumentModal();
  };

  const handleDocSuccessContinue = () => {
    quiz.setDocSuccessModalOpen(false);
    quiz.handleApply();
  };

  return (
    <div className="path-to-funding-page min-h-screen pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />

      <main>
        <section id="how-to-apply-top">
          <PathToFundingHero
            onCheckEligibility={quiz.openEligibilityModal}
            onCheckDocuments={quiz.openDocumentModal}
          />
        </section>
        
        <EligibilityCriteriaSection />
        
        <FundingConditionsSection
          onCheckEligibility={quiz.openEligibilityModal}
          onCheckDocuments={quiz.openDocumentModal}
          onApply={quiz.handleApply}
          appState={quiz.appState}
        />
        
        
      </main>

      <Footer />

      {/* Modals */}
      <EligibilityModal
        open={quiz.eligibilityModalOpen}
        onOpenChange={quiz.setEligibilityModalOpen}
        step={quiz.eligibilityStep}
        setStep={quiz.setEligibilityStep}
        answers={quiz.eligibilityAnswers}
        updateAnswer={quiz.updateEligibilityAnswer}
        onComplete={quiz.completeEligibilityQuiz}
      />

      <DocumentCheckModal
        open={quiz.documentModalOpen}
        onOpenChange={quiz.setDocumentModalOpen}
        step={quiz.documentStep}
        setStep={quiz.setDocumentStep}
        answers={quiz.documentAnswers}
        updateAnswer={quiz.updateDocumentAnswer}
        onComplete={quiz.completeDocumentQuiz}
      />

      <SuccessModal
        open={quiz.successModalOpen}
        onOpenChange={quiz.setSuccessModalOpen}
        onContinue={handleSuccessContinue}
      />

      <RejectModal
        open={quiz.rejectModalOpen}
        onOpenChange={quiz.setRejectModalOpen}
      />

      <DocSuccessModal
        open={quiz.docSuccessModalOpen}
        onOpenChange={quiz.setDocSuccessModalOpen}
        onContinue={handleDocSuccessContinue}
      />

      <DocRejectModal
        open={quiz.docRejectModalOpen}
        onOpenChange={quiz.setDocRejectModalOpen}
      />

      <IncompleteModal
        open={quiz.incompleteModalOpen}
        onOpenChange={quiz.setIncompleteModalOpen}
        onCheckEligibility={quiz.openEligibilityModal}
        onCheckDocuments={quiz.openDocumentModal}
        appState={quiz.appState}
      />
    </div>
  );
};

export default PathToFunding;
