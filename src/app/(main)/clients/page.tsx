'use client';
import CreateClient from "@components/app/CreateClient";
import { ModeType } from "@components/app/CreateClient/CreateClient.interface";
import PaginationComponent from "@components/app/Pagination";
import { useDeleteMutation, useLazyGetManyQuery } from "@redux/rtk/client";
import { IClient } from "@redux/rtk/client/client.interfaces";
import React, { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Client() {
  const [deleteClient] = useDeleteMutation()
  const [getAllClients, { data: clients }] = useLazyGetManyQuery()
  const [client, setClient] = useState<IClient | null>(null)
  const [mode, setMode] = useState<ModeType>(null)
  const [filters, setFilters] = useState({ limit: 10, page: 1 })

  const handleSelect = useCallback((i: number) => {
    setClient(clients?.data[i] || null)
    setMode("update")
  }, [clients])

  const handleRefresh = useCallback(() => {
    setClient(null)
    setMode(null)
    getAllClients({
      "per-page": filters.limit,
      page: filters.page
    })
  }, [filters])

  const handleDelete = useCallback((id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        deleteClient(id).unwrap().then((result) => {
          if (!result.deleted) {
            return Swal.fire({
              title: "Error delete client",
              text: "Could not delete client",
              icon: "error"
            });
          }

          return Swal.fire({
            title: "Deleted!",
            text: "Your client has been deleted.",
            icon: "success",
            willClose: () => {
              getAllClients({
                "per-page": filters.limit,
                page: filters.page
              })
            }
          });
        }).catch(() => {
          Swal.fire({
            title: "Error delete client",
            text: "Could not delete client",
            icon: "error"
          });
        })

      }
    });
  }, [filters])

  useEffect(() => {
    getAllClients({
      "per-page": filters.limit,
      page: filters.page
    })
  }, [filters])

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: 10 }}>
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#ClientModal"
              data-bs-whatever="@getbootstrap"
              onClick={() => {
                setMode("create")
              }}
            >
              Create
            </button>
          </div>
        </div>
        <div className="col-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(clients?.data || []).map((item, i) => (
                <tr key={i}>
                  <th scope="row">{item.id}</th>
                  <td>{item.email}</td>
                  <td>{item.created_at}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#ClientModal"
                      data-bs-whatever="@getbootstrap"
                      onClick={() => {
                        handleSelect(i)
                      }}
                    >
                      <i className="fas fa-edit" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target="#ClientModal"
                      data-bs-whatever="@getbootstrap"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        handleSelect(i)
                      }}
                    >
                      <i className="fa fa-user" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#ClientModal"
                      data-bs-whatever="@getbootstrap"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        handleSelect(i)
                      }}
                    >
                      <i className="fa fa-location-arrow" />
                    </button>
                    <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }} onClick={() => handleDelete(item.id)}>
                      <i className="far fa-trash-alt" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <ul className="pagination justify-content-end">
            <PaginationComponent 
              itemsPage={filters.limit}
              totalItems={clients?.pagination.totalCount || 0}
              onPageChange={(page) => {
                setFilters((prev) => ({
                  ...prev,
                  page
                }))
              }}
            />    
          </ul>
        </div>
      </div>
      <CreateClient
        mode={mode}
        client={client}
        onClose={handleRefresh}
      />
    </React.Fragment>
  )
}
