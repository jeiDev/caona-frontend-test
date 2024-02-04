import config from '@config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import paramsSerializerUtils from '@utils/paramsSerializer.utils'
import {
	ICreateProfileRequest,
	ICreateProfileResponse,
	IGetManyProfileResponse,
	IGetOneProfileResponse,
	IUpdateProfileRequest,
	IUpdateProfileResponse
} from './profile.interfaces'

export const profileRTKProvider = createApi({
	reducerPath: 'profile',
	baseQuery: fetchBaseQuery({
		baseUrl: config.apiServer,
		paramsSerializer(params) {
			return paramsSerializerUtils(params)
		}
	}),
	endpoints: (builder) => ({
		createProfile: builder.mutation<ICreateProfileResponse, ICreateProfileRequest>({
			query: (data) => ({
				url: '/profiles',
				method: 'POST',
				body: data
			}),
			transformResponse: (res: ICreateProfileResponse) => {
				return res
			}
		}),
		updateProfile: builder.mutation<IUpdateProfileResponse, IUpdateProfileRequest>({
			query: (data) => ({
				url: '/profiles',
				method: 'PUT',
				body: data
			}),
			transformResponse: (res: IUpdateProfileResponse) => {
				return res
			}
		}),
		deleteProfile: builder.mutation<{ deleted: boolean }, number>({
			query: (id) => ({
				url: '/profiles',
				method: 'DELETE',
				body: { id }
			}),
			transformResponse: (res: { deleted: boolean }) => {
				return res
			}
		}),
		getManyProfile: builder.query<IGetManyProfileResponse, { page: number, ['per-page']: number }>({
			query: (data) => ({
				url: '/profiles',
				method: 'GET',
				params: data
			})
		}),
		getOneProfile: builder.query<IGetOneProfileResponse, { id: number }>({
			query: (data) => ({
				url: '/profiles',
				method: 'GET',
				params: data
			})
		})
	})
})

export const {
	useCreateProfileMutation, 
	useDeleteProfileMutation,
	useGetManyProfileQuery,
	useGetOneProfileQuery,
	useLazyGetManyProfileQuery,
	useLazyGetOneProfileQuery,
	useUpdateProfileMutation
} = profileRTKProvider
