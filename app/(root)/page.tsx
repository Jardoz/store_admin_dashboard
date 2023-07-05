"use client"

import { Modal } from "@/components/ui/modal";

const SetupPage = () => {
    return (
        <>
            <div className="px-6 py-4">
                <Modal title="Test" description="Test Description" isOpen onClose={()=> {}}>
                    Children
                </Modal>
            </div>
        </>
     
    )
  }

  export default SetupPage;
  