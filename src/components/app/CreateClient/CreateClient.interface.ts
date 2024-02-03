import { IClient } from "@redux/rtk/client/client.interfaces";

export type ModeType = 'create' | 'update' | null

export interface ICreateClientProsp{
    client: IClient | null
    mode: ModeType
    onClose: () => void
}