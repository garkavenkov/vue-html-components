<script>
import { VueCheckbox, VueDatatable} from './entry';
import axios from 'axios';
import { delimiter } from 'path';
export default {
    name:  'VueHtmlComponentsLibDev', // vue library dev component
    data() {
        return {
            suppliers: {
                active: true
            },
            orientation: "right",
            // fields: [
            //     {
            //         name: 'id',
            //         caption: '#'
            //     },
            //     {
            //         name: 'full_name',
            //         caption: 'Full name',
            //         link: {
            //             type: 'native',
            //             url: '/suppliers/',
            //             id: 'id'
            //         }
            //     },
            //     {
            //         name: 'name',
            //         caption: 'Name',                  
            //     },
            // ],
            fields: {
                header: [
                    { text: '#' },
                    { text: 'Дата' },
                    { text: '№' },
                    { text: 'Поставщик' },
                    { text: 'Отдел' },
                    { text: 'Сумма закупки' },
                    { text: 'Сумма продажи' },
                    { text: 'Торговая наценка' },    
                    { text: '' }
                ],
                body: [
                    { type: 'link',  link: 'native', url: 'income-documents/', id: 'id', name: 'id'},
                    { type: 'field', name: 'date' },
                    { type: 'field', name: 'number' },
                    { type: 'field', name: 'supplier' },
                    { type: 'field', name: 'department' },
                    { type: 'field', name: 'sum1',         filter : 'formatNumber:2', class: 'number' },
                    { type: 'field', name: 'sum2',         filter : 'formatNumber:2', class: 'number' },
                    { type: 'field', name: 'trade_margin'},
                    { type: 'action', actions: [
                        {
                            type: 'callback',
                            function: 'editItem',
                            text: 'Edit',
                            class: 'edit-item',
                            id: 'id'
                        },
                        {
                            type: 'callback',
                            function: 'deleteItem',
                            text: 'delete',
                            class: 'btn btn-danger',
                            id: 'id'
                        }
                    ]}
                ]
            },
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
    filters: {
        formatNumber(value, precision=2, delimeter=' ') {
            var int_part = Math.trunc(value).toString();
            var float_part = (value - Math.trunc(value)).toFixed(precision)
            
            var int_part_length = int_part.length;
            
            let final = '';
            
            while(int_part_length > 2) {
                var part = int_part.substr(int_part_length-3, 3)
            
                int_part = int_part.slice(0, int_part_length-3 )
                int_part_length = int_part.length
                final = part + delimeter + final
            }
            
            final = int_part+ delimeter + final
            final = final.slice(0,-1)+'.'+ float_part.substring(2)
            return final;
        }     

    },
    methods: {
        fetchData(url) {
            let page_url = url || 'http://127.0.0.1:8000/api/income-documents?date_begin=2019-05-01&date_end=2019-05-31';
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
    computed: {
        totalPurchase() {
            let total = this.dataTable.reduce((sum, item) => sum +  (parseFloat(item.sum1) * 1), 0.00 );
            return total;
        },
        totalRetail() {
            let total =  this.dataTable.reduce((sum, item) =>  sum + (parseFloat(item.sum2) * 1), 0.00 ) 
            return total;
        }
    },
    components: {
        VueCheckbox,
        VueDatatable        
    },
    created() {
        this.fetchData('http://127.0.0.1:8000/api/income-documents?date_begin=2019-05-01&date_end=2019-05-31');
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
            <template>
                <tr>
                    <td colspan="5">Итого документов - {{dataTable.length}} на сумму </td>
                    <td>{{totalPurchase}}</td>
                    <td>{{totalRetail}}</td>
                </tr>
            </template>
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
