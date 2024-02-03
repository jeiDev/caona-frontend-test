import { FormEvent, useCallback } from "react"
import { ICreateClientProsp } from "./CreateClient.interface"
import { inputFormToJSON } from "@utils/form.util"
import { useCreateMutation, useUpdateMutation } from "@redux/rtk/client"
import Swal from 'sweetalert2'

const CreateClient = ({ client, mode, onClose }: ICreateClientProsp) => {

    const [createClient, { isLoading: isCreating }] = useCreateMutation()
    const [updateClient, { isLoading: isUpdating }] = useUpdateMutation()

    const handleClose = useCallback(() => {
        const closeButton = document.getElementById('buttonCreateClientClose')

        if(closeButton){
            closeButton.click()
        }

        onClose()
    }, [])

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const { data, clear } = inputFormToJSON(e.currentTarget)

        if (mode == "create") {
            createClient(data).unwrap().then((result) => {
                if(result.errors){
                    return Swal.fire({
                        title: "Error Client",
                        text: `${Array.from(result.errors?.message || [])[0]}` || "Could not create client",
                        icon: "error"
                    });
                }

                return Swal.fire({
                    title: "Created Client",
                    text: "Client created successfully",
                    icon: "success",
                    willClose() {
                        handleClose()
                        clear()
                    },
                })
            }).catch(() => {
                Swal.fire({
                    title: "Error Client",
                    text: "Could not create client",
                    icon: "error"
                });
            })
        } else if (mode == "update") {
            updateClient({
                ...data,
                id: client?.id
            } as any).unwrap().then((result) => {
                if(result.errors && !result.updated){
                    return Swal.fire({
                        title: "Error Client",
                        text: `${Array.from(result.errors?.message || [])[0]}` || "Could not update client",
                        icon: "error"
                    });
                }

                return Swal.fire({
                    title: "Updated Client",
                    text: "Client updated successfully",
                    icon: "success",
                    willClose() {
                        handleClose()
                        clear()
                    },
                });
            }).catch(() => {
                Swal.fire({
                    title: "Error Client",
                    text: "Could not update client",
                    icon: "error"
                });
            })
        }
    }, [mode])

    return (
        <>
            <div
                className="modal fade"
                id="ClientModal"
                tabIndex={-1}
                aria-labelledby="ClientModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    {mode && (
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="ClientModalLabel">
                                    {mode == "create" ? "Create" : "Edit"} client
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <form method="POST" onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">
                                            Email:
                                        </label>
                                        <input type="email" name="email" className="form-control" defaultValue={client?.email} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        id="buttonCreateClientClose"
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className={`btn btn-${mode == "create" ? "primary" : "success"}`} disabled={isCreating || isUpdating}>
                                        {mode == "create" ? isCreating ? "Creating..." :"Create" : isUpdating ? "Updating..." :"Update"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>

    )
}

export default CreateClient