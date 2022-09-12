<template>
    <toast :toast="toast" :status="status" :toastMessage="toastMessage" v-on:close="close($event)" />
    <form @submit.prevent="editUser()" class="row g-3 w-50 m-auto">
        <div class="col-md-12">
            <label for="inputEmail4" class="form-label">Email</label>
            <input type="email" v-model="payload.email" class="form-control" id="inputEmail4">
        </div>
        <div class="col-md-12">
            <label for="inputFirstName" class="form-label">First Name</label>
            <input type="text" v-model="payload.first_name" class="form-control" id="inputFirstName">
        </div>
        <div class="col-md-12">
            <label for="inputLastName" class="form-label">Last Name</label>
            <input type="text" v-model="payload.last_name" class="form-control" id="inputLastName">
        </div>
        <div class="col-12">
            <button type="submit" class="btn btn-primary">Update</button>
        </div>
    </form>
</template>
  
<script  lang="ts" >
import { defineComponent, ref, onMounted } from 'vue'
import UserServices from '@/services/user/user'
import Toast from '@/components/ToastSur.vue'
import {useRouter} from "vue-router";
export default defineComponent({
    props: ['userDetails'],
    setup(props) {
        const isLoading = ref<boolean>(false);
        const toast = ref<boolean>(false);
        const toastMessage = ref<string>("");
        const status = ref<string>("");
        const payload = ref<any>(props.userDetails);
        const router = useRouter()
        const editUser = async () => {
            isLoading.value = true;
            await UserServices.UpdateUserServices(payload.value.id, payload.value).then((response) => {
                status.value = "success";
                toastMessage.value = "User Updated";
                toast.value = true;
                // router.push('/dashboard')

            }).catch((error) => {
                status.value = "danger";
                toast.value = true;
                toastMessage.value = error.response.data.error;
            });
        };

        const close = (e: any) => {
            toast.value = false
        }
        return {
            editUser,
            payload,
            isLoading,
            toast,
            toastMessage,
            status,
            close,
        };
    },
    components: { Toast }
})
</script>
    
  