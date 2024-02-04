import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
	ICreateClientRequest,
	ICreateClientResponse,
	IGetManyClientResponse,
	IGetOneClientResponse,
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
		createClient: builder.mutation<ICreateClientResponse, ICreateClientRequest>({
			query: (data) => ({
				url: '/clients',
				method: 'POST',
				body: data
			}),
			transformResponse: (res: ICreateClientResponse) => {
				return res
			},
		}),
		updateClient: builder.mutation<IUpdateClientResponse, IUpdateClientRequest>({
			query: (data) => ({
				url: '/clients',
				method: 'PUT',
				body: data
			}),
			transformResponse: (res: IUpdateClientResponse) => {
				return res
			}
		}),
		deleteClient: builder.mutation<{ deleted: boolean }, number>({
			query: (id) => ({
				url: '/clients',
				method: 'DELETE',
				body: { id }
			}),
			transformResponse: (res: { deleted: boolean }) => {
				return res
			}
		}),
		getManyClient: builder.query<IGetManyClientResponse, { page: number, ['per-page']: number }>({
			query: (data) => ({
				url: '/clients',
				method: 'GET',
				params: data
			})
		}),
		getOne: builder.query<IGetOneClientResponse, { id: number }>({
			query: (data) => ({
				url: '/clients',
				method: 'GET',
				params: data
			})
		})
	})
})

export const {
	useCreateClientMutation,
	useDeleteClientMutation,
	useGetManyClientQuery,
	useLazyGetManyClientQuery,
	useUpdateClientMutation,
	useGetOneQuery,
	useLazyGetOneQuery
} = clientRTKProvider
