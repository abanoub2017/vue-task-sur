import apiClient from '@/services/global-axios'


class LoginServices {
    // Login Services
    static LoginServices(payload: any) {
        return apiClient.post(`login`, payload)
    }
}
export default LoginServices