import { useLazyGetOneQuery } from "@redux/rtk/client"
import { useCreateProfileMutation, useUpdateProfileMutation } from "@redux/rtk/profile"
import { IProfile } from "@redux/rtk/profile/profile.interfaces"
import { inputFormToJSON } from "@utils/form.util"
import { FormEvent, useCallback, useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { ModeType } from "../CreateClient/CreateClient.interface"
import { ICreateAddressProsp } from "./CreateAddress.interface"

const CreateAddress = ({ clientId, onClear }: ICreateAddressProsp) => {
    const [mode, setMode] = useState<ModeType>()
    const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation()
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
    const [getClient, { currentData: client, isLoading: isLoadingGetClient }] = useLazyGetOneQuery()
    const [data, setData] = useState<IProfile>({} as IProfile)

    const handleClose = useCallback(() => {
        const closeButton = document.getElementById('buttonCreateAddressClose')

        if (closeButton) {
            closeButton.click()
        }

        onClear()
    }, [])

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const { data, clear } = inputFormToJSON(e.currentTarget)

        if (mode == "create") {
            createProfile({
                ...data,
                client_id: clientId
            }).unwrap().then((result) => {
                if(result.errors){
                    return Swal.fire({
                        title: "Error Profile",
                        text: `${Array.from(result.errors?.message || [])[0]}` || "Could not create profile",
                        icon: "error"
                    });
                }

                return Swal.fire({
                    title: "Created Profile",
                    text: "Profile created successfully",
                    icon: "success",
                    willClose() {
                        handleClose()
                        clear()
                    },
                })
            }).catch(() => {
                Swal.fire({
                    title: "Error Profile",
                    text: "Could not create profile",
                    icon: "error"
                });
            })
        } else if (mode == "update" && client?.data) {
            updateProfile({
                ...data,
                id: client?.data?.profile
            } as any).unwrap().then((result) => {
                if(result.errors && !result.updated){
                    return Swal.fire({
                        title: "Error Profile",
                        text: `${Array.from(result.errors?.message || [])[0]}` || "Could not update profile",
                        icon: "error"
                    });
                }

                return Swal.fire({
                    title: "Updated Profile",
                    text: "Profile updated successfully",
                    icon: "success",
                    willClose() {
                        handleClose()
                        clear()
                    },
                });
            }).catch(() => {
                Swal.fire({
                    title: "Error Profile",
                    text: "Could not update profile",
                    icon: "error"
                });
            })
        }
    }, [mode, clientId, client])

    const handleChange = useCallback((name: string, value: string) => {
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }, [])

    useEffect(() => {
        getClient({id: clientId})
    }, [clientId])

    useEffect(() => {
        setMode(client?.data ? "update" : "create")
    }, [client])

    useEffect(() => {
        setData(client?.data?.profile || {} as IProfile)
    }, [client?.data?.profile])

    return (
        <>
            <div
                className="modal fade"
                id="ClientAddressModal"
                tabIndex={-1}
                aria-labelledby="ClientAddressModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    {mode && (
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="ClientAddressModalLabel">
                                    Edit profile
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
                                            First Name:
                                        </label>
                                        <input type="text" name="first_name" className="form-control" value={data?.first_name || ""} required onChange={(e) => handleChange("first_name", e.currentTarget.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">
                                            Last Name:
                                        </label>
                                        <input type="text" name="last_name" className="form-control" value={data?.last_name || ""} required onChange={(e) => handleChange("last_name", e.currentTarget.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">
                                            Phone:
                                        </label>
                                        <input type="tel" name="phone" className="form-control" value={data?.phone || ""} required onChange={(e) => handleChange("phone", e.currentTarget.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">
                                            Gender:
                                        </label>
                                        <select className="form-select"  name="sexo" value={data?.sexo || ""} required onChange={(e) => handleChange("sexo", e.currentTarget.value)}>
                                            <option selected value="">Select gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        id="buttonCreateAddressClose"
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className={`btn btn-success`} disabled={isCreating || isUpdating}>
                                        {isCreating || isUpdating ? "Updating..." : "Update"}
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

export default CreateAddress