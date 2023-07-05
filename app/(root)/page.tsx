"use client"
import { useEffect } from "react";

import { useStoreModal } from "@/hooks/useStoreModal";


const SetupPage = () => {
    const onOpen = useStoreModal(({ onOpen }) => onOpen)
    const isOpen = useStoreModal(({ isOpen }) => isOpen)

    useEffect(() => {
        if(!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen])

    return (
        <>
            <div className="px-6 py-4">
                Root Page                              
            </div>
        </>
     
    )
  }

  export default SetupPage;
  