<template>
   <main class="form-signin mt-5 w-100 m-auto">
     <LoginForm/>
   </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import LoginForm from '@/components/loginForm.vue';

export default defineComponent({
    components: { LoginForm }
})
</script>

<style>

</style>