<template>
  <div class="home container py-3 my-3">
    <h1 class="mb-3 border-bottom pb-2">Edit User</h1>
    <div class="user-edit" v-if="userDetails">
        <EditForm :userDetails="userDetails"/>
    </div>
  </div>
</template>
  
<script  lang="ts" >
import { defineComponent, ref, onMounted } from 'vue'
import UserServices from '@/services/user/user'
import { useRoute } from 'vue-router';
import EditForm from '@/components/editForm.vue';
export default defineComponent({
    setup() {
        const isLoading = ref<boolean>(false);
        const payload = ref<any>();
        const route = useRoute()
        const id = route.params.id
        const userDetails = ref()

        const getUserDetails = async (id:any) => {
            isLoading.value = true;
            await UserServices.GetUserDetails(id).then((response) => {
                userDetails.value = response.data.data
                isLoading.value = false;
                
            }).catch((error) => {
                console.log(error.response.data.error);
            });
        };
        onMounted(() => {
            getUserDetails(id)
        })

        return {
            payload,
            isLoading,
            route,
            userDetails
        };
    },
    components: {  EditForm }
})
</script>
    
  