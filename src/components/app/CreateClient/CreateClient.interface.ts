import { IClient } from "@redux/rtk/client/client.interfaces";
import { ModeType } from "../ModalForm/ModalForm.interface";

export interface ICreateClientProsp{
    client: IClient | null
    mode: ModeType
    show: boolean
    onClose: () => void
    onRefresh: () => void
}