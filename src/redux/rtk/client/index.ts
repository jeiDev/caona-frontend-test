import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
	ICreateClientRequest,
	ICreateClientResponse,
	IGetManyClientResponse,
	IUpdateClientRequest,
	IUpdateClientResponse
} from './client.interfaces'

export const clientRTKProvider = createApi({
	reducerPath: 'client',
	baseQuery: fetchBaseQuery({
		baseUrl: config.apiServer,
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	endpoints: (builder) => ({
		create: builder.mutation<ICreateClientResponse, ICreateClientRequest>({
			query: (data) => ({
				url: '/clients',
				method: 'POST',
				body: data
			}),
			transformResponse: (res: ICreateClientResponse) => {
				return res
			}
		}),
		update: builder.mutation<IUpdateClientResponse, IUpdateClientRequest>({
			query: (data) => ({
				url: '/clients',
				method: 'PUT',
				body: data
			}),
			transformResponse: (res: IUpdateClientResponse) => {
				return res
			}
		}),
		delete: builder.mutation<{ deleted: boolean }, number>({
			query: (id) => ({
				url: '/clients',
				method: 'DELETE',
				body: { id }
			}),
			transformResponse: (res: { deleted: boolean }) => {
				return res
			}
		}),
		getMany: builder.query<IGetManyClientResponse, { page: number, ['per-page']: number }>({
			query: (data) => ({
				url: '/clients',
				method: 'GET',
				params: data
			})
		})
	})
})

export const {
	useCreateMutation,
	useUpdateMutation,
	useGetManyQuery,
	useLazyGetManyQuery,
	useDeleteMutation
} = clientRTKProvider
