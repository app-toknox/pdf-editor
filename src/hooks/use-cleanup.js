import { useEffect } from "react";

import { usePDFStore } from "@/hooks/usePdf";
import { useToolManager } from "@/hooks/useToolManager";

export const useCleanup = () => {
  const { resetState } = useToolManager();
  const { resetPDFState } = usePDFStore();

  useEffect(() => {
    return () => {
      resetState();
      resetPDFState();
    };
  }, [resetState, resetPDFState]);
};
