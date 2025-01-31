import PDF1099DIV from "../documents/1099DIV.pdf";
import PDF1099G from "../documents/1099G.pdf";
import PDF1099R from "../documents/1099R.pdf";
import PDF1099INT from "../documents/1099INT.pdf";
import PDF1099SA from "../documents/1099SA.pdf";
import PDF1099S from "../documents/1099S.pdf";
import PDFf1065sk1 from "../documents/f1065sk1.pdf";
import PDF1099 from "../documents/1099.pdf";
import PDFW2 from "../documents/w2.pdf";

export const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

export const getBase64 = (img: Blob, callback: (base64: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const PDF = [
  { fileName: "assets/pdf/1099DIV.pdf" },
  { fileName: "assets/pdf/1099G.pdf" },
  { fileName: "assets/pdf/1099INT.pdf" },
  { fileName: "assets/pdf/1099R.pdf" },
  { fileName: "assets/pdf/1099S.pdf" },
  { fileName: "assets/pdf/1099SA.pdf" },
  { fileName: "assets/pdf/f1065sk1.pdf" },
  { fileName: "assets/pdf/1099.pdf" },
  { fileName: "assets/pdf/w2.pdf" },
];

export const getPdfUrl = (path: any) => {
  switch (path) {
    case PDF[0].fileName:
      return PDF1099DIV;
    case PDF[1].fileName:
      return PDF1099G;
    case PDF[2].fileName:
      return PDF1099INT;
    case PDF[3].fileName:
      return PDF1099R;
    case PDF[4].fileName:
      return PDF1099S;
    case PDF[5].fileName:
      return PDF1099SA;
    case PDF[6].fileName:
      return PDFf1065sk1;
    case PDF[7].fileName:
      return PDF1099;
    case PDF[8].fileName:
      return PDFW2;
    default:
      return PDFW2;
  }
};
