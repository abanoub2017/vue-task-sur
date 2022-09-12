import apiClient from '@/services/global-axios'


class UserServices {

    // List Users
    static GetUserList( page: any,) {
        return apiClient.get(`users?page=${page}`)
    }

    // Get User Details
    static GetUserDetails( id: any,) {
        return apiClient.get(`users/${id}`)
    }

    // Add
    static AddUserServices(payload: any) {
        return apiClient.post(`users`, payload)
    }

    // Update
    static UpdateUserServices(id: any,payload: any) {
        return apiClient.post(`users/${id}`, payload)
    }

    

    // Delete
    static DeletUserServices(id: any) {
        return apiClient.delete(`users/${id}`)
    }
}
export default UserServices