<script>
export default {
    name: 'VueDatatable',
    props: {
        id: {
            type: String,
            required: false,
            default: 'vue--table'
        },
        perPageItems: {
            type: Array,
            required: false,
            default: () => (
                [
                    10,
                    20,
                    50, 
                    'all'
                ]
            )
        },
        pagination: {
            type: Object,
            required: false,
            default: () => ({})
        },
        fields: {
            type: Array,
            required: true
        },
        dataTable: {
            type: Array,
            required: true
        },
        pagesCaption: {
            type: Object,
            required: false,
            default: () => ({
                'first': '<<',
                'prev': '<',
                'next': '>',
                'last': '>>'
            })
        },
    },
    data() {
        return {
            perPage: this.pagination.hasOwnProperty('per_page') ? this.pagination.per_page : this.perPageItems[0],
            currentPage: this.pagination.hasOwnProperty('current_page') ? this.pagination.per_page : 1,
        }
    },
    methods: {
        changePerPage(value) {
            if (this.externalPagination) {
                let url = `${this.pagination.path}/?per_page=${value}`;
                this.$emit('fetchData', url);
            } else {
                this.perPage = value === "all" ? value :  parseInt(value);
                this.currentPage = 1;
            }
            
        },
        nextPage() {      
            if (this.externalPagination) {
                let url = `${this.pagination.next}&per_page=${this.pagination.per_page}`;
                this.$emit('fetchData', url);
            } else {
                this.currentPage++;
            }            
        },
        prevPage() {
            if (this.externalPagination) {
                let url = `${this.pagination.prev}&per_page=${this.pagination.per_page}`;
                this.$emit('fetchData', url);
            } else {
                this.currentPage--;
            }            
        },
        changePage(page) {           
            if (this.externalPagination) {
                let url = `${this.pagination.path}/?per_page=${this.pagination.per_page}&page=${page}`;             
                this.$emit('fetchData', url);
            } else {
                this.currentPage = page;
            }            
        }
    },
    computed: {
        externalPagination() {
            return Object.keys(this.pagination).length > 0 ? true : false;
        },
        dataTableLenght() {
            return this.pagination.hasOwnProperty('total') ?  this.pagination.total : this.dataTable.length;
        },
        paginateFrom() {
            if (this.pagination.hasOwnProperty('from')) {
                return this.pagination.from-1;
            } else {
                return this.perPage === "all" ? 0 : (this.currentPage-1) * this.perPage;
            }            
        },
        paginateTo() {
            if (this.pagination.hasOwnProperty('to')) {
                return this.pagination.to;
            } else {
                let end = 0;
                if (this.perPage === "all") {
                    end = this.dataTableLenght;
                } else {
                    end   = this.paginateFrom  + this.perPage;
                }
                return  end > this.dataTableLenght ? this.dataTableLenght : end;
            }            
        },
        paginatedData() {
            if (this.externalPagination) {
                return this.dataTable;
            } else {
                return  this.dataTable.slice(this.paginateFrom, this.paginateTo);
            }
        },
        pagesCount() {
            if (this.externalPagination) {
                return this.pagination.last_page;
            } else {
                return this.perPage === "all" ? 1 : Math.ceil(this.dataTableLenght / this.perPage);
            }
        },
        isFirstPage() {
            if (this.externalPagination) {
                return !this.pagination.prev;
            } else {
                return this.currentPage == 1 ? true : false;
            }
        },
        isLastPage() {
            if (this.externalPagination) {
                return !this.pagination.next;
            } else {
                return this.currentPage == this.pagesCount ? true : false;
            }            
        }
    },
    watch: {
        pagesCount() {
            if (this.pagesCount < this.currentPage) {
                this.currentPage = this.pagesCount;
            }
        },
        'pagination.current_page'(newValue) {
            if (newValue) {
                this.currentPage = newValue;
            }
        },
        'pagination.per_page'(newValue) {
            if (newValue) {
                this.perPage = newValue;
            }
        }
    }
}
</script>

<template>
<div>
    <div class="row">  
        <div class="vue--data-per-page">
            <label class="vue--data-per-page_label">
                Отображать
                <select name="vue--data-per-page_select" 
                        class="vue--data-per-page_select"
                        @change="changePerPage($event.target.value)">
                    <option v-for="(value) in perPageItems"
                            :key="value"                            
                            :value="value">{{value}}
                    </option>                        
                </select>
                записей
            </label>
        </div>
    </div>
    <table class="vue--table">
        <thead class="vue--table_header">
            <th v-for="(field, index) in fields" :key="index">
                {{field.caption}}
            </th>
        </thead>
        <tbody class="vue--table_body">
            <tr v-if="dataTable.length===0">
                <td class="lead text-center" :colspan="fields.length+1">
                    No data found
                </td>
            </tr>l
            <tr v-else 
                v-for="(data,index) in paginatedData"
                v-bind:class="[index % 2 === 0 ? 'odd' : 'even']"
                :key="data.id">
                <td v-for="(field, index) in fields" :key="index">
                    <template v-if="field.link">
                        <template v-if="field.link.type==='vue-router'">
                            <router-link :to="field.link.url+data[field.link.id]">{{data[field.name]}}</router-link>    
                        </template>
                        <template v-else>
                            <a v-bind:href="field.link.url+data[field.link.id]">{{data[field.name]}}</a>
                        </template>
                    </template>                    
                    <template v-else>
                        {{data[field.name]}}    
                    </template>                            
                </td>
            </tr>
        </tbody>
        <tfoot class="vue--table_footer">

        </tfoot>

    </table>
    
    <div class="vue--pagination_wrapper">
        
        <div class="vue--pagination_info">
            <span>Отображение с {{paginateFrom+1}} по {{paginateTo}} из {{dataTableLenght}} записей</span>
        </div>
        
        <div class="vue--pagination_buttons" v-if="pagesCount>1">    
            <nav aria-label="Page navigation">
                <ul class="">
                    <li class="vue--pagination_button"
                        v-bind:class="{'disabled': isFirstPage}">
                        <a  aria-label="First"
                            class="vue--pagination_page-link"
                            @click="changePage(1)">
                            <span aria-hidden="true">{{pagesCaption.first}}</span>
                        </a>
                    </li>
                    <li class="vue--pagination_button" v-bind:class="{'disabled': isFirstPage}">
                        <a  aria-label="Previous"
                            class="vue--pagination_page-link"
                            @click="prevPage()">
                                <span aria-hidden="true">{{pagesCaption.prev}}</span>
                        </a>        
                    </li>
                    <li class="vue--pagination_button"             
                        v-bind:class="[(currentPage == page) ? 'active' : '']"
                        v-for="page in pagesCount" :key="page">
                            <a class="vue--pagination_page-link" @click="changePage(page)">{{page}}</a>
                    </li>
                    <li class="vue--pagination_button" v-bind:class="{'disabled': isLastPage}"> 
                        <a  aria-label="Next"
                            class="vue--pagination_page-link"
                            @click="nextPage()">
                            <span aria-hidden="true">{{pagesCaption.next}}</span>
                        </a>
                    </li>        
                    <li class="vue--pagination_button"
                        v-bind:class="{'disabled': isLastPage}">
                        <a  aria-label="Last"
                            class="vue--pagination_page-link"
                            @click="changePage(pagesCount)">
                                <span aria-hidden="true">{{pagesCaption.last}}</span>
                        </a>
                    </li>
                </ul>
            </nav>    
        </div>
    </div>
</div>
</template>

<style scoped>

.row {
    display: flex;
}

.vue--table {
    width: 100%;
    border-collapse: separate !important;
    clear: both;
    border-spacing: 0;
    margin-top: 6px;
    margin-bottom: 6px;

}

.vue--table_header {
    background-color: #f8f9fa;
}

.vue--table_header th {
    text-align: left;
    border-top: 1px solid rgba(120, 130, 140, 0.2);
    border-bottom: 1px solid rgba(120, 130, 140, 0.2);
    padding: 10px 0;
}

.vue--table_body tr td {
    border-bottom: 1px solid rgba(120, 130, 140, 0.13);
    padding: 10px 0;
}

.vue--pagination_wrapper {
    display: flex;
    flex-wrap: wrap;
}

.vue--pagination_info {
    flex: 0 0 50%;
}

.vue--pagination_buttons {
    flex: 0 0 50%;
}

.vue--pagination_buttons ul {
    list-style: none;
    padding-left: 0;
    text-align: right;
}

.vue--pagination_button {
    cursor: pointer;
    box-sizing: border-box;
    display: inline-block;
    margin-left: 2px;
    text-align: center;
    text-decoration: none !important;
    border-radius: 2px;
}

.vue--pagination_button.disabled {
    cursor: default;
    background: transparent;
    box-shadow: none;
    color: #666 !important;
}

.vue--pagination_button .vue--pagination_page-link {
    position: relative;
    display: block;
    padding: .5rem .75rem;
    margin-left: -1px;
    line-height: 1;
    border: 1px solid #dee2e6;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 12px;    
}

.vue--pagination_button .vue--pagination_page-link:hover {
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
}

.vue--pagination_button .vue--pagination_page-link:focus {    
    outline: 0;
    box-shadow: 0 0 0 .2rem rgba(0, 123, 255, .25);
}

.vue--pagination_button.disabled .vue--pagination_page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
}

.vue--pagination_button.active .vue--pagination_page-link {
    color: #fff;
    z-index: 1;
    background-color: #007bff;
    border-color: #007bff;
    transform: scale(1.1);
}

.vue--data-per-page {
    float: left;
    font-size: 1em;
    padding-bottom: 5px;
}

.vue--data-per-page_label {
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    color: #666;
}

.vue--data-per-page_select {
    width: 76px;
    margin: 0 10px;
    display: inline-block;
    border: 1px solid rgba(170, 170, 170, 0.3);
    font-size: 14px;
    outline: none;
    box-shadow: none;
    color: #495057;
    vertical-align: middle;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: #fff url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .75rem center;
    background-size: 8px 10px;
    padding: 0.25rem 0.5rem;
}

.vue--data-per-page_select:focus {
    border-color: #80bdff;
}


</style>
