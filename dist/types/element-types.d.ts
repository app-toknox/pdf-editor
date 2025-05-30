import { FaFileSignature, FaStamp } from 'react-icons/fa6';
import { BsChatSquareTextFill } from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
export namespace ELEMENT_TYPES {
    namespace Signature {
        export { SignatureComponent as component };
        export { SignatureForm as form };
        export { FaFileSignature as icon };
    }
    namespace Stamp {
        export { StampComponent as component };
        export { StampForm as form };
        export { FaStamp as icon };
    }
    namespace Text {
        export { TextComponent as component };
        export { TextForm as form };
        export { BsChatSquareTextFill as icon };
    }
    namespace Data {
        export { DataComponent as component };
        export { DataForm as form };
        export { FaCalendarAlt as icon };
    }
}
