
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { UpgradeSuccessView } from "./upgrade-sections/UpgradeSuccessView";
import { UpgradeFormContent } from "./upgrade-sections/UpgradeFormContent";
import { useProfessionalUpgrade } from "@/hooks/use-professional-upgrade";
import { ModalFooterActions } from "./upgrade-sections/ModalFooterActions";
import { ModalHeader } from "./upgrade-sections/ModalHeader";

interface ProfessionalUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfessionalUpgradeModal({ open, onOpenChange }: ProfessionalUpgradeModalProps) {
  const methods = useForm();
  const {
    specialization,
    setSpecialization,
    instruments,
    setInstruments,
    newInstrument,
    setNewInstrument,
    genres,
    setGenres,
    newGenre,
    setNewGenre,
    education,
    setEducation,
    experience,
    setExperience,
    certificates,
    setCertificates,
    businessFile,
    setBusinessFile,
    verifying,
    verified,
    handleVerification,
    resetAndCloseModal
  } = useProfessionalUpgrade();
  
  const closeModal = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
        <ModalHeader />
        
        <FormProvider {...methods}>
          <div className="space-y-6 py-4">
            {verified ? (
              <UpgradeSuccessView />
            ) : (
              <UpgradeFormContent 
                specialization={specialization}
                setSpecialization={setSpecialization}
                instruments={instruments}
                setInstruments={setInstruments}
                newInstrument={newInstrument}
                setNewInstrument={setNewInstrument}
                genres={genres}
                setGenres={setGenres}
                newGenre={newGenre}
                setNewGenre={setNewGenre}
                education={education}
                setEducation={setEducation}
                experience={experience}
                setExperience={setExperience}
                certificates={certificates}
                setCertificates={setCertificates}
                businessFile={businessFile}
                setBusinessFile={setBusinessFile}
              />
            )}
          </div>
          
          <DialogFooter>
            {!verified && (
              <ModalFooterActions 
                verifying={verifying}
                handleVerification={() => handleVerification(closeModal)}
                onCancel={() => resetAndCloseModal(closeModal)}
              />
            )}
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
