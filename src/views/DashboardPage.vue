<template>
  <div class="home container py-3 my-3">
    <h1 class="mb-3 border-bottom pb-2">List Users</h1>
    <div class="list-user" v-if="!isLoading">
      <ListUser :userList="userList" />
    </div>
    <div v-else class="text-center py-5 my-5">
      Loading...
    </div>
    <div class="text-center d-flex w-100 justify-content-center">
      <pagination class="text-center" v-model="page" :records="records" :per-page="per_page" @paginate="myCallback" />
    </div>
  </div>
</template>

<script  lang="ts" >
import { defineComponent, ref, onMounted } from 'vue'
import UserServices from '@/services/user/user'
import ListUser from '@/components/ListUser.vue';
import Pagination from 'v-pagination-3';
export default defineComponent({
  components: { ListUser, Pagination },
  setup() {
    const isLoading = ref<boolean>(false);
    const page = ref(1);
    const userList = ref<any>();
    const per_page = ref(0)
    const records = ref(0)
    const total_pages = ref(0)


    const getUser = async (page) => {
      isLoading.value = true;
      await UserServices.GetUserList(page).then((response) => {
        isLoading.value = false;
        userList.value = response.data.data;
        per_page.value = response.data.per_page
        records.value = response.data.total
        total_pages.value = response.data.total_pages
      }).catch((error) => {
        isLoading.value = false;
      });
    };
    const myCallback = async () => {
      page.value + 1
      getUser(page.value)
    }
    onMounted(() => {
      getUser(page.value);
    });
    return {
      getUser,
      isLoading,
      userList,
      page,
      myCallback,
      per_page,
      records
    };
  },
})
</script>
  
