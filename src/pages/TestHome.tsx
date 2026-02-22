import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import TestHomeHero from "@/components/test-home/TestHomeHero";
import NewsHighlightsSection from "@/components/test-home/NewsHighlightsSection";
import HighlightedStoriesSection from "@/components/test-home/HighlightedStoriesSection";
import TestHomePortalSection from "@/components/test-home/TestHomePortalSection";
import TestHomeProductsSection from "@/components/test-home/TestHomeProductsSection";
import Footer from "@/components/transformation/Footer";
import { usePathToFundingQuiz } from "@/hooks/usePathToFundingQuiz";
import EligibilityModal from "@/components/path-to-funding/EligibilityModal";
import DocumentCheckModal from "@/components/path-to-funding/DocumentCheckModal";
import { SuccessModal, RejectModal, DocSuccessModal, DocRejectModal } from "@/components/path-to-funding/ResultModals";

const TestHome = () => {
  const quiz = usePathToFundingQuiz();

  return (
    <div className="min-h-screen pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <TestHomeHero onCheckEligibility={quiz.openEligibilityModal} />
      <TestHomeProductsSection />
      <TestHomePortalSection />
      <NewsHighlightsSection />
      <HighlightedStoriesSection />
      <Footer />

      <EligibilityModal
        open={quiz.eligibilityModalOpen}
        onOpenChange={quiz.setEligibilityModalOpen}
        step={quiz.eligibilityStep}
        setStep={quiz.setEligibilityStep}
        answers={quiz.eligibilityAnswers}
        updateAnswer={quiz.updateEligibilityAnswer}
        onComplete={quiz.completeEligibilityQuiz}
      />
      <SuccessModal
        open={quiz.successModalOpen}
        onOpenChange={quiz.setSuccessModalOpen}
        onContinue={() => {
          quiz.setSuccessModalOpen(false);
          quiz.openDocumentModal();
        }}
      />
      <RejectModal
        open={quiz.rejectModalOpen}
        onOpenChange={quiz.setRejectModalOpen}
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
      <DocSuccessModal
        open={quiz.docSuccessModalOpen}
        onOpenChange={quiz.setDocSuccessModalOpen}
        onContinue={() => {
          quiz.setDocSuccessModalOpen(false);
          window.open('https://dev-online.sa-transformationfund.co.za/', '_blank');
        }}
      />
      <DocRejectModal
        open={quiz.docRejectModalOpen}
        onOpenChange={quiz.setDocRejectModalOpen}
      />
    </div>
  );
};

export default TestHome;
