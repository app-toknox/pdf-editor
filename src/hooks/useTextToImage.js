import { useCallback } from "react";

export const useTextToImage = () => {
  const textToImage = useCallback((text, fontSize, fontFamily, color) => {
    const scale = 3;
    const padding = 10;

    // canvas temporaneo per calcolare le dimensioni del testo
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.font = `${fontSize}px ${fontFamily}`;

    const textMetrics = tempCtx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;

    // canvas principale per disegnare il testo
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = (textWidth + padding * 2) * scale;
    canvas.height = (textHeight + padding * 2) * scale;

    ctx.scale(scale, scale);

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    ctx.fillText(text, padding, padding);

    return {
      dataUrl: canvas.toDataURL("image/png"),
      width: textWidth + padding * 2,
      height: textHeight + padding * 2,
    };
  }, []);

  return { textToImage };
};
