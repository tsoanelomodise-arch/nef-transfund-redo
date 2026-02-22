import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import PhakamaniHero from "@/components/phakamani/PhakamaniHero";
import ProductsSection from "@/components/phakamani/ProductsSection";
import PortalSection from "@/components/phakamani/PortalSection";
import Footer from "@/components/transformation/Footer";
import { usePathToFundingQuiz } from "@/hooks/usePathToFundingQuiz";
import EligibilityModal from "@/components/path-to-funding/EligibilityModal";
import DocumentCheckModal from "@/components/path-to-funding/DocumentCheckModal";
import { SuccessModal, RejectModal, DocSuccessModal, DocRejectModal } from "@/components/path-to-funding/ResultModals";

const PhakamaniIndex = () => {
  const quiz = usePathToFundingQuiz();

  return (
    <div className="min-h-screen pt-[180px] lg:pt-[210px]">
      <PhakamaniNavbar />
      <PhakamaniHero onCheckEligibility={quiz.openEligibilityModal} />
      <ProductsSection />
      <PortalSection />
      <Footer />

      {/* Eligibility Modal */}
      <EligibilityModal
        open={quiz.eligibilityModalOpen}
        onOpenChange={quiz.setEligibilityModalOpen}
        step={quiz.eligibilityStep}
        setStep={quiz.setEligibilityStep}
        answers={quiz.eligibilityAnswers}
        updateAnswer={quiz.updateEligibilityAnswer}
        onComplete={quiz.completeEligibilityQuiz}
      />

      {/* Result Modals */}
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

      {/* Document Check Modal */}
      <DocumentCheckModal
        open={quiz.documentModalOpen}
        onOpenChange={quiz.setDocumentModalOpen}
        step={quiz.documentStep}
        setStep={quiz.setDocumentStep}
        answers={quiz.documentAnswers}
        updateAnswer={quiz.updateDocumentAnswer}
        onComplete={quiz.completeDocumentQuiz}
      />

      {/* Document Result Modals */}
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

export default PhakamaniIndex;
