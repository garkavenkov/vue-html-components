<script>
import { VueCheckbox, VueDatatable} from './entry';
import axios from 'axios';
export default {
    name:  'VueHtmlComponentsLibDev', // vue library dev component
    data() {
        return {
            suppliers: {
                active: true
            },
            orientation: "right",
            fields: [
                {
                    name: 'id',
                    caption: '#'
                },
                {
                    name: 'full_name',
                    caption: 'Full name',
                    link: {
                        type: 'native',
                        url: '/suppliers/',
                        id: 'id'
                    }
                },
                {
                    name: 'name',
                    caption: 'Name',                  
                },                

            ],
            pagesCaption: {
                'first' : '<<',
                'prev'  : '<',
                'next'  : '>',
                'last'  : '>>'
            },
            pagination: {},
            dataTable: [
                // {
                //     'id'            :   1,
                //     'name'          :   'Supplier 1',
                //     'description'   :   'Lorem  ipsum'                    
                // },
                // {
                //     'id'            :   2,
                //     'name'          :   'Supplier 2',
                //     'description'   :   'Lorem  ipsum'                    
                // },
                // {
                //     'id'            :   3,
                //     'name'          :   'Supplier 3',
                //     'description'   :   'Lorem  ipsum'                    
                // },
                // {
                //     'id'            :   4,
                //     'name'          :   'Supplier 4',
                //     'description'   :   'Lorem  ipsum'                    
                // },
                // {
                //     'id'            :   5,
                //     'name'          :   'Supplier 5',
                //     'description'   :   'Lorem  ipsum'                    
                // },
                // {
                //     'id'            :   6,
                //     'name'          :   'Supplier 6',
                //     'description'   :   'Lorem  ipsum'                    
                // },
                // {
                //     'id'            :   7,
                //     'name'          :   'Supplier 7',
                //     'description'   :   'Lorem  ipsum'                    
                // },
                // {
                //     'id'            :   8,
                //     'name'          :   'Supplier 8',
                //     'description'   :   'Lorem  ipsum'                    
                // },
                // {
                //     'id'            :   9,
                //     'name'          :   'Supplier 9',
                //     'description'   :   'Lorem  ipsum'                    
                // },
            ]
        }
    },
    methods: {
        fetchData(url) {
            let page_url = url || 'http://127.0.0.1:8000/api/suppliers';
            axios.get(page_url)
                .then(res => {
                    this.dataTable = res.data.data;
                    this.makePagination(res.data.links, res.data.meta);
                })
        },
        makePagination(links, meta) {
            this.pagination = {...links, ...meta}
        },
        change() {

        }

    },
    components: {
        VueCheckbox,
        VueDatatable        
    },
    created() {
        this.fetchData('http://127.0.0.1:8000/api/suppliers');
    }
}
</script>

<template>
    <div class="vue-html-components-lib-dev">
         <vue-checkbox v-model="suppliers.active"
                        :orientation="orientation"
                        id="supplier-status"
                        @change="change()">
                Status
            <template v-if="suppliers.active" v-slot:info>
                work    
            </template>
            <template v-else v-slot:info>
                doesn't work
            </template>            
        </vue-checkbox>

        <button @click="fetchData">Fetch</button>
       
        <vue-datatable  :fields="fields"
                        :dataTable="dataTable"
                        :pagination="pagination"
                        @fetchData="fetchData">
        </vue-datatable>       
    </div>
</template>

<style scoped>
    .vue-html-components-lib-dev {
        display: block;
        width: 80%;
        margin: 0 auto;
    }
</style>
