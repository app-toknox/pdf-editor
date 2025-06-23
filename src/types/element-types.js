import { BsChatSquareTextFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa6";
import { FaStamp } from "react-icons/fa6";

import { DataComponent } from "@/components/items-layout/data/data-component";
import { DataForm } from "@/components/items-layout/data/data-form";
import { SignatureComponent } from "@/components/items-layout/signature/signature-component";
import { SignatureForm } from "@/components/items-layout/signature/signature-form";
import { StampComponent } from "@/components/items-layout/stamp/stamp-component";
import { StampForm } from "@/components/items-layout/stamp/stamp-form";
import { TextComponent } from "@/components/items-layout/text/text-component";
import { TextForm } from "@/components/items-layout/text/text-form";

export const ELEMENT_TYPES = {
  Signature: {
    labelKey: "Signature",
    component: SignatureComponent,
    form: SignatureForm,
    icon: FaFileSignature,
  },
  Stamp: {
    labelKey: "Stamp",
    component: StampComponent,
    form: StampForm,
    icon: FaStamp,
  },
  Text: {
    labelKey: "Text",
    component: TextComponent,
    form: TextForm,
    icon: BsChatSquareTextFill,
  },
  Data: {
    labelKey: "Data",
    component: DataComponent,
    form: DataForm,
    icon: FaCalendarAlt,
  },
};
