import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
	ICreateAddressRequest,
	ICreateAddressResponse,
	IGetManyAddressResponse,
	IGetOneAddressResponse,
	IUpdateAddressRequest,
	IUpdateAddressResponse
} from './address.interfaces'

export const addressRTKProvider = createApi({
	reducerPath: 'address',
	baseQuery: fetchBaseQuery({
		baseUrl: config.apiServer,
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	endpoints: (builder) => ({
		createAddress: builder.mutation<ICreateAddressResponse, ICreateAddressRequest>({
			query: (data) => ({
				url: '/addresses',
				method: 'POST',
				body: data
			}),
			transformResponse: (res: ICreateAddressResponse) => {
				return res
			}
		}),
		updateAddress: builder.mutation<IUpdateAddressResponse, IUpdateAddressRequest>({
			query: (data) => ({
				url: '/addresses',
				method: 'PUT',
				body: data
			}),
			transformResponse: (res: IUpdateAddressResponse) => {
				return res
			}
		}),
		deleteAddress: builder.mutation<{ deleted: boolean }, number>({
			query: (id) => ({
				url: '/addresses',
				method: 'DELETE',
				body: { id }
			}),
			transformResponse: (res: { deleted: boolean }) => {
				return res
			}
		}),
		getManyAddress: builder.query<IGetManyAddressResponse, { page: number, ['per-page']: number }>({
			query: (data) => ({
				url: '/addresses',
				method: 'GET',
				params: data
			})
		}),
		getOneAddress: builder.query<IGetOneAddressResponse, { id: number }>({
			query: (data) => ({
				url: '/addresses',
				method: 'GET',
				params: data
			})
		})
	})
})

export const {
	useCreateAddressMutation,
	useDeleteAddressMutation,
	useGetManyAddressQuery,
	useGetOneAddressQuery,
	useLazyGetManyAddressQuery,
	useLazyGetOneAddressQuery,
	useUpdateAddressMutation
} = addressRTKProvider
