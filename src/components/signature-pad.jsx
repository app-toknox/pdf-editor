import { useState } from "react";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

import { cn, trimCanvas } from "../utils/index";

export const SignaturePad = ({ onSaveSignatureCallback }) => {
  const sigCanvasRef = useRef(null);
  const [enableSave, setEnableSalve] = useState(true);

  const handleClear = () => {
    sigCanvasRef.current.clear();
    onSaveSignatureCallback();
    if (!enableSave) setEnableSalve(true);
  };

  const handleSave = () => {
    const canvas = sigCanvasRef.current.getCanvas();
    const trimmedCanvas = trimCanvas(canvas); // usa il nostro compatibile
    const signatureCanvas = trimmedCanvas.toDataURL();
    onSaveSignatureCallback(signatureCanvas);
    setEnableSalve(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-y-2">
      <span className="text-sm font-semibold self-start">
        Aggiungi una firma
      </span>
      <div
        className={cn(
          "flex items-center  justify-center flex-col w-full bg-gray-300 px-4 h-[220px]",
        )}
      >
        <SignatureCanvas
          ref={sigCanvasRef}
          penColor="blue"
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
          }}
        />
      </div>
      <div className="flex w-full flex-row justify-end gap-x-6">
        <button
          className="btn btn-primary w-20"
          onClick={handleSave}
          disabled={!enableSave}
        >
          Salva
        </button>
        <button className="btn btn-error w-20" onClick={handleClear}>
          Pulisci
        </button>
      </div>
    </div>
  );
};
