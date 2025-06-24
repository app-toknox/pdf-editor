import { FaFileSignature, FaStamp } from 'react-icons/fa6';
import { BsChatSquareTextFill } from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
export namespace ELEMENT_TYPES {
    namespace Signature {
        export let labelKey: string;
        export { SignatureComponent as component };
        export { SignatureForm as form };
        export { FaFileSignature as icon };
    }
    namespace Stamp {
        let labelKey_1: string;
        export { labelKey_1 as labelKey };
        export { StampComponent as component };
        export { StampForm as form };
        export { FaStamp as icon };
    }
    namespace Text {
        let labelKey_2: string;
        export { labelKey_2 as labelKey };
        export { TextComponent as component };
        export { TextForm as form };
        export { BsChatSquareTextFill as icon };
    }
    namespace Data {
        let labelKey_3: string;
        export { labelKey_3 as labelKey };
        export { DataComponent as component };
        export { DataForm as form };
        export { FaCalendarAlt as icon };
    }
}
