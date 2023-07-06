"use client"
import { useEffect } from "react";

// this is the page-trigger for modal create store

import { useStoreModal } from "@/hooks/useStoreModal";


const SetupPage = () => {
    const onOpen = useStoreModal(({ onOpen }) => onOpen)
    const isOpen = useStoreModal(({ isOpen }) => isOpen)

    useEffect(() => {
        if(!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen])

    return null
  }

  export default SetupPage;
  