<template>
    <!-- Toast Message  -->
    <div class="toast" :class="toast ? `d-block text-bg-${status}  position-fixed bottom-0 end-0 p-2 mb-2`: 'd-none'"
        role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body w-100 text-center  text-capitalize">
                {{toastMessage}}
            </div>
            <button @click="closeToast()" type="button" class="btn-close btn-close-white me-2  m-auto"
                data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
</template>

<script  lang="ts" >
import { defineComponent, ref, onMounted, watch } from 'vue'

export default defineComponent({
    props: ['toast', 'status', 'toastMessage'],

    setup(props, { emit }) {
        const closeToast = () => {
            emit("close", 'close')
        }
        const closeTime = () => {
            setTimeout(() => {
                emit("close", 'close')
            }, 500);
        }

        return {
            closeToast,
        }
    }
})
</script>

<style>

</style>