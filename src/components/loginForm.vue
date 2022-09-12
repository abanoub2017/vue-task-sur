<template>
    <form @submit.prevent="login()">
        <h1 class="h3  mb-3 fw-normal">Please Login in</h1>
        <Toast :toast="toast" :status="status" :toastMessage="toastMessage" v-on:close="close($event)" />

        <!-- Login Form -->
        <div class="form-floating">
            <input v-model="payload.email" type="email" class="form-control" id="floatingInput"
                placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
            <input v-model="payload.password" type="password" class="form-control" id="floatingPassword"
                placeholder="Password">
            <label for="floatingPassword">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
            <div v-if="isLoading" class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
    </form>
</template>

<script  lang="ts" >
import { defineComponent, ref, onMounted } from 'vue'
import LoginServices from '@/services/auth/login'
import Toast from '@/components/ToastSur.vue'
import { useStore } from 'vuex';
import {useRouter} from "vue-router";
export default defineComponent({
    setup() {
        const store = useStore();
        const isLoading = ref<boolean>(false);
        const toast = ref<boolean>(false);
        const toastMessage = ref<string>("");
        const status = ref<string>("");
        const payload = ref<any>({
            email: "",
            password: ""
        });
        const router = useRouter()

        const login = async () => {
            isLoading.value = true;
            await LoginServices.LoginServices(payload.value).then((response) => {
                status.value = "success";
                toast.value = true;
                toastMessage.value = "Login Successed";
                isLoading.value = false;
                store.state.token = response.data.token
                router.push('/dashboard')
                
            }).catch((error) => {
                isLoading.value = false;
                status.value = "danger";
                toast.value = true;
                toastMessage.value = error.response.data.error;
            });
        };
        const close = (e: any) => {
            toast.value = false
        }
        return {
            login,
            payload,
            isLoading,
            toast,
            toastMessage,
            status,
            close
        };
    },
    components: { Toast }
})
</script>

<style>

</style>