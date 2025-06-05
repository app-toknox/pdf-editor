## `<PdfEditor />` Component

The `PdfEditor` component is a React UI module used to load, display, and edit PDF files within an application.

### Props

- **`pdfFile`**: A `File` object or binary representing the input PDF to be edited.
- **`handleExport`**: A callback function triggered when the user exports the edited PDF. It returns the modified file in PDF format.

### Description

`PdfEditor` is designed to provide an interactive environment where users can view and annotate or modify a PDF file. It receives a PDF as input via the `pdfFile` prop, allows editing through a visual interface, and outputs a newly generated PDF file when the `handleExport` function is called. This component is ideal for applications that require client-side PDF editing and export functionality.
