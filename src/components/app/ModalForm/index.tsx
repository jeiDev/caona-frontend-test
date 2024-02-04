'use client'

import { ObjectKeyDynamicI } from "@interfaces/common/common.interface"
import { inputFormToJSON } from "@utils/form.util"
import { capitalize } from "@utils/string.util"
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import { Button, Form, Modal } from 'react-bootstrap'
import { IModalFormProps } from "./ModalForm.interface"

const loadingLabel: ObjectKeyDynamicI = {
    create: "Creating",
    update: "Updating"
}

const ModalForm = <T extends object>({ show, mode, fields, entity, reference, loading, subTitle, onlyShowLabelUpdate, handleSave, handleUpdate, handleClose }: IModalFormProps<T>) => {
    const [data, setData] = useState({} as ObjectKeyDynamicI)

    const _mode = useMemo(() => (onlyShowLabelUpdate ? "update" : mode), [onlyShowLabelUpdate, mode])
    const { labelTitle, labelButton } = useMemo(() => ({
        labelTitle: `${capitalize(_mode)} ${subTitle}`,
        labelButton: loading ? `${loadingLabel[_mode]}...` : capitalize(_mode)
    }), [loading, _mode, subTitle, onlyShowLabelUpdate])

    const handleChange = useCallback((name: string, value: string) => {
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }, [])

    const handleReset = useCallback(() => {
        setData({} as T)
        handleClose()
    }, [])

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const data = inputFormToJSON(e.currentTarget)

        if (mode == "create" && typeof handleSave == "function") {
            handleSave(data, handleReset)
        } else if (mode == "update" && typeof handleUpdate == "function") {
            handleUpdate(data, handleReset)
        } else {
            handleReset()
        }

    }, [mode])

    useEffect(() => {
        setData(_mode == "update" ? entity || {} : {})
    }, [JSON.stringify(entity), _mode])

    return (
        <Modal show={show} onHide={handleReset} onExited={handleReset}>
            <Modal.Header closeButton>
                <Modal.Title>{labelTitle}</Modal.Title>
            </Modal.Header>

            <form method="POST" onSubmit={handleSubmit}>
                <Modal.Body>
                    {fields.map((field, i) => (
                        <React.Fragment key={`${reference}-${i}`}>
                            {field.type == "select" ? (
                                <Form.Group className="mb-3">
                                    <Form.Label>{field.label}</Form.Label>
                                    <Form.Select name={field.name as string} value={data[field.name as string]} required={field.required} onChange={(e) => {
                                        handleChange(field.name as string, e.currentTarget.value)
                                    }}>
                                        {Array.from(field.options || []).map((item, e) => (
                                            <option value={item.value} key={`${reference}-${i}-${e}`}>{item.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            ) : (
                                <Form.Group className="mb-3" style={{  display: field.type != "hidden" ? "block" : "none" }}>
                                    <Form.Label>{field.label}</Form.Label>
                                    <Form.Control
                                        type={field.type}
                                        name={field.name as string}
                                        value={data[field.name as string]}
                                        required={field.required}
                                        onChange={(e) => {
                                            handleChange(field.name as string, e.currentTarget.value)
                                        }}
                                        placeholder={field.placeholder}
                                    />
                                </Form.Group>
                            )}
                        </React.Fragment>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReset}>
                        Close
                    </Button>

                    <Button type="submit" variant={mode == "create" ? "primary" : "success"} disabled={loading}>
                        {labelButton}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalForm