import { ISimplePost } from "interfaces/SimplePost";

export interface IModalForm {
    operation: number;
    open: boolean;
    setOpen: (open: boolean) => void;
    setOperation: (number: number) => void;
    simplepost?: ISimplePost;
    setSimplePost: (data: ISimplePost) => void;
}