export function getFormattedDate(): string;
export function dataItem(type: any, x: any, y: any, page: any): {
    id: string;
    type: any;
    x: any;
    y: any;
    page: any;
    width: number;
    height: number;
    payload: {
        text: string;
    };
};
export function generalItem(type: any, x: any, y: any, page: any): {
    id: string;
    type: any;
    x: any;
    y: any;
    page: any;
    width: number;
    height: number;
    payload: {
        text: string;
    };
};
export function textItem(type: any, x: any, y: any, page: any): {
    id: string;
    type: any;
    x: any;
    y: any;
    page: any;
    width: number;
    height: number;
    payload: {
        textEditable: string;
    };
};
export function getItemByType(type: any, x: any, y: any, page: any): {
    id: string;
    type: any;
    x: any;
    y: any;
    page: any;
    width: number;
    height: number;
    payload: {
        text: string;
    };
} | {
    id: string;
    type: any;
    x: any;
    y: any;
    page: any;
    width: number;
    height: number;
    payload: {
        textEditable: string;
    };
};
