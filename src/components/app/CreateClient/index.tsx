import { useCreateClientMutation, useUpdateClientMutation } from "@redux/rtk/client"
import { IClient } from "@redux/rtk/client/client.interfaces"
import { useCallback } from "react"
import Swal from 'sweetalert2'
import ModalForm from "../ModalForm"
import { ICreateClientProsp } from "./CreateClient.interface"

const CreateClient = ({ client, mode, show, onClose, onRefresh }: ICreateClientProsp) => {
    const [createClient, { isLoading: isCreating }] = useCreateClientMutation()
    const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation()

    const handleUpdate = useCallback((data: IClient, clear: () => void) => {
        updateClient(data).unwrap().then((result) => {
            const isError = !Array.isArray(result.errors) && result.errors ? true : false

            Swal.fire({
                title: `${isError ? "Error" : "Updated"} Client`,
                text: isError ? `${Array.from(result.errors?.message || [])[0]}` || "Could not update client" : "Client updated successfully",
                icon: isError ? "error" : "success"
            });

            clear()
            onRefresh()
        }).catch(() => {
            Swal.fire({
                title: "Error Client",
                text: "Could not update client",
                icon: "error"
            });
        })
    }, [client])

    const handleCreate = useCallback((data: IClient, clear: () => void) => {
        createClient(data).unwrap().then((result) => {
            const isError = !Array.isArray(result.errors) && result.errors ? true : false

            Swal.fire({
                title: `${isError ? "Error" : "Created"} Client`,
                text: isError ? `${Array.from(result.errors?.message || [])[0]}` || "Could not create client" : "Client created successfully",
                icon: isError ? "error" : "success"
            });

            clear()
            onRefresh()
        }).catch(() => {
            Swal.fire({
                title: "Error Client",
                text: "Could not create client",
                icon: "error"
            });
        })
    }, [])

    return (
        <ModalForm<IClient>
            show={show}
            mode={mode}
            subTitle="client"
            loading={isCreating || isUpdating}
            entity={client || {} as IClient}
            reference={`client-${client?.id}`}
            handleSave={handleCreate}
            handleUpdate={(data, clear) => handleUpdate(data, clear) }
            handleClose={onClose}
            fields={[
                {
                    label: "Email",
                    name: "email",
                    type: "email"
                },
                {
                    label: "",
                    name: "id",
                    type: "hidden"
                }
            ]}
        />
    )
}

export default CreateClient