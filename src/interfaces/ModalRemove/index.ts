import { ISimplePost } from "interfaces/SimplePost";

export interface IModalRemove {
    simplepost: ISimplePost;
    open: boolean;
    setOpen: (open: boolean) => void;
}