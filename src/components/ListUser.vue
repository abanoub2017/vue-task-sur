<template>
    <toast :toast="toast" :status="status" :toastMessage="toastMessage" v-on:close="close($event)" />
    <div class="container">
        <div>
            <table class="table w-75 m-auto my-5">
                <thead>
                    <tr>
                        <th scope="col">Avatar</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="userList">
                        <tr v-for="user in userList" :key="user.id">
                            <td><img :src="user.avatar" height="50" width="50" alt="avatar"
                                    class="rounded-circle shadow"></td>
                            <td>{{user.first_name + ' ' + user.last_name }}</td>
                            <td>{{user.email}}</td>
                            <td>
                                <router-link :to="'/dashboard/'+user.id" class="btn btn-primary rounded-pill shadow mx-3">Edit</router-link>
                                <button @click="deleteUser(user.id)"
                                    class="btn btn-danger rounded-pill shadow">Delete</button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script  lang="ts" >
import { defineComponent, ref, onMounted } from 'vue'
import UserServices from '@/services/user/user'
import Toast from '@/components/ToastSur.vue'
import { useStore } from 'vuex';
export default defineComponent({
    props: ['userList'],
    setup(props) {
        const store = useStore();
        const isLoading = ref<boolean>(false);
        const toast = ref<boolean>(false);
        const toastMessage = ref<string>("");
        const status = ref<string>("");

        const deleteUser = async (id: any) => {
            isLoading.value = true;
            await UserServices.DeletUserServices(id).then((response) => {
                status.value = "success";
                toast.value = true;
                toastMessage.value = "User Deleted";

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
            isLoading,
            toast,
            toastMessage,
            status,
            close,
            deleteUser
        };
    },
    components: { Toast }
})
</script>
    
  