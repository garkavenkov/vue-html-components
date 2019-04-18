<script>
import { VueCheckbox } from './entry';
export default {
    name:  'VueHtmlComponentsLibDev', // vue library dev component
    data() {
        return {
            suppliers: {
                active: true
            }
        }
    },
    methods: {},
    components: {
        VueCheckbox,
    },
}
</script>

<template>
    <div class="vue-html-components-lib-dev">
        <vue-checkbox v-model="suppliers.active"
                        id="supplier-status"
                        @change="change()">
            <template v-if="suppliers.active">
                Status: work    
            </template>
            <template v-else>
                Status: doesn't work
            </template>            
        </vue-checkbox>
    </div>
</template>

<style scoped>
    .vue-html-components-lib-dev {
        display: block;
        width: 400px;
        margin: 25px auto;
    }
</style>
