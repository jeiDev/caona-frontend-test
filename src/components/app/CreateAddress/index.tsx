import { useCreateAddressMutation, useUpdateAddressMutation } from "@redux/rtk/address"
import { IAddress } from "@redux/rtk/address/address.interfaces"
import { useLazyGetOneQuery } from "@redux/rtk/client"
import { useCallback, useEffect, useState } from "react"
import Swal from 'sweetalert2'
import ModalForm from "../ModalForm"
import { ModeType } from "../ModalForm/ModalForm.interface"
import { ICreateAddressProsp } from "./CreateAddress.interface"

const CreateAddress = ({ clientId, onClose, show }: ICreateAddressProsp) => {
    const [mode, setMode] = useState<ModeType>("create")

    const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation()
    const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation()

    const [getClient, { currentData: client }] = useLazyGetOneQuery()

    const handleUpdate = useCallback((data: IAddress, clear: () => void) => {
        updateAddress(data).unwrap().then((result) => {
            const isError = !Array.isArray(result.errors) && result.errors ? true : false

            Swal.fire({
                title: `${isError ? "Error" : "Updated"} Address`,
                text: isError ? `${Array.from(result.errors?.message || [])[0]}` || "Could not update address" : "Address updated successfully",
                icon: isError ? "error" : "success"
            });

            clear()
        }).catch(() => {
            Swal.fire({
                title: "Error Address",
                text: "Could not update address",
                icon: "error"
            });
        })
    }, [client])

    const handleCreate = useCallback((data: IAddress, clear: () => void) => {
        createAddress(data).unwrap().then((result) => {
            const isError = !Array.isArray(result.errors) && result.errors ? true : false

            Swal.fire({
                title: `${isError ? "Error" : "Created"} Address`,
                text: isError ? `${Array.from(result.errors?.message || [])[0]}` || "Could not create address" : "Address created successfully",
                icon: isError ? "error" : "success"
            });

            clear()
        }).catch(() => {
            Swal.fire({
                title: "Error Address",
                text: "Could not create address",
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
        setMode(client?.data?.address ? "update" : "create")
    }, [client])

    return (
        <ModalForm<IAddress>
            show={show}
            mode={mode}
            subTitle="address"
            reference={`address-${clientId}`}
            onlyShowLabelUpdate
            loading={isCreating || isUpdating}
            entity={client?.data?.address ? {
                ...client.data.address,
                client_id: clientId
            } : { client_id: clientId } as IAddress}
            handleSave={(data, clear) => handleCreate(data, clear)}
            handleUpdate={(data, clear) => handleUpdate(data, clear)}
            handleClose={onClose}
            fields={[
                {
                    label: "Address",
                    name: "address",
                    type: "text"
                },
                {
                    label: "City",
                    name: "city",
                    type: "text"
                },
                {
                    label: "State",
                    name: "state",
                    type: "text"
                },
                {
                    label: "Postal Code",
                    name: "postal_code",
                    type: "text"
                },{
                    label: "Country",
                    name: "country",
                    type: "text"
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

export default CreateAddress