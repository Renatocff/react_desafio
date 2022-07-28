import { ISimplePost } from "interfaces/SimplePost";

export interface ITable {
    simplePosts: ISimplePost[];
    setOpetarion: (number: number) => void;
    setSimplePost: (simplepost: ISimplePost) => void;
    setOpenModal: (open: boolean) => void;
    setOpenModalRemove: (open: boolean) => void;
}