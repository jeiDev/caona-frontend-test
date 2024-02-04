import { useLazyGetOneQuery } from "@redux/rtk/client"
import { useCreateProfileMutation, useUpdateProfileMutation } from "@redux/rtk/profile"
import { IProfile } from "@redux/rtk/profile/profile.interfaces"
import { useCallback, useEffect, useState } from "react"
import Swal from 'sweetalert2'
import ModalForm from "../ModalForm"
import { ModeType } from "../ModalForm/ModalForm.interface"
import { ICreateProfileProsp } from "./CreateProfile.interface"

const CreateProfile = ({ clientId, onClose, show }: ICreateProfileProsp) => {
    const [mode, setMode] = useState<ModeType>("create")

    const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation()
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

    const [getClient, { currentData: client }] = useLazyGetOneQuery()

    const handleUpdate = useCallback((data: IProfile, clear: () => void) => {
        updateProfile(data).unwrap().then((result) => {
            const isError = !Array.isArray(result.errors) && result.errors ? true : false

            Swal.fire({
                title: `${isError ? "Error" : "Updated"} Client`,
                text: isError ? `${Array.from(result.errors?.message || [])[0]}` || "Could not update client" : "Client updated successfully",
                icon: isError ? "error" : "success"
            });

            clear()
        }).catch(() => {
            Swal.fire({
                title: "Error Profile",
                text: "Could not update profile",
                icon: "error"
            });
        })
    }, [client])

    const handleCreate = useCallback((data: IProfile, clear: () => void) => {
        createProfile(data).unwrap().then((result) => {
            const isError = !Array.isArray(result.errors) && result.errors ? true : false

            Swal.fire({
                title: `${isError ? "Error" : "Created"} Profile`,
                text: isError ? `${Array.from(result.errors?.message || [])[0]}` || "Could not create client" : "Client created successfully",
                icon: isError ? "error" : "success"
            });

            clear()
        }).catch(() => {
            Swal.fire({
                title: "Error Profile",
                text: "Could not create profile",
                icon: "error"
            });
        })
    }, [clientId, client])

    useEffect(() => {
        if(clientId){
            getClient({ id: clientId })
        }
    }, [clientId])

    useEffect(() => {
        setMode(client?.data?.profile ? "update" : "create")
    }, [client])

    return (
        <ModalForm<IProfile>
            show={show}
            mode={mode}
            subTitle="profile"
            reference={`profile-${clientId}`}
            onlyShowLabelUpdate
            loading={isCreating || isUpdating}
            entity={client?.data?.profile ? {
                ...client.data.profile,
                client_id: clientId
            } : { client_id: clientId } as IProfile}
            handleSave={(data, clear) => handleCreate(data, clear)}
            handleUpdate={(data, clear) => handleUpdate(data, clear)}
            handleClose={onClose}
            fields={[
                {
                    label: "First Name",
                    name: "first_name",
                    type: "text"
                },
                {
                    label: "Last Name",
                    name: "last_name",
                    type: "text"
                },
                {
                    label: "Phone",
                    name: "phone",
                    type: "tel"
                },
                {
                    label: "Gender",
                    name: "sexo",
                    type: "select",
                    options: [
                        { value: "", label: "Select gender" },
                        { value: "M", label: "Male" },
                        { value: "F", label: "Female" }
                    ]
                },
                {
                    label: "",
                    name: "client_id",
                    type: "hidden"
                },
                {
                    label: "",
                    name: "id",
                    type: "hidden"
                },
            ]}
        />
    )
}

export default CreateProfile