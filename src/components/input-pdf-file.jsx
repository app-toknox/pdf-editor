export const InputPdfFile = ({ setPdf }) => {
  const handleOnChange = async (files) => {
    const file = files[0];
    setPdf(file);
  };
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Seleziona un file pdf</legend>
      <input
        accept="application/pdf"
        onChange={(e) => handleOnChange(e.target.files)}
        type="file"
        className="file-input file-input-primary"
      />
    </fieldset>
  );
};
