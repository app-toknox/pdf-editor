import { BsChatSquareTextFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa6";
import { FaStamp } from "react-icons/fa6";

import { DataComponent } from "../components/items-layout/data/data-component";
import { SignatureComponent } from "../components/items-layout/signature/signature-component";
import { SignatureForm } from "../components/items-layout/signature/signature-form";
import { StampComponent } from "../components/items-layout/stamp/stamp-component";
import { TextComponent } from "../components/items-layout/text/text-component";

export const ELEMENT_TYPES = {
  Signature: {
    component: SignatureComponent,
    form: SignatureForm,
    icon: FaFileSignature,
  },
  Stamp: {
    component: StampComponent,
    icon: FaStamp,
  },
  Text: {
    component: TextComponent,
    icon: BsChatSquareTextFill,
  },
  Data: {
    component: DataComponent,
    icon: FaCalendarAlt,
  },
};
