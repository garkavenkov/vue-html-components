<script>
export default {
    name: 'VueCheckbox', // vue component name
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean,
        id: {
            type: String,
            required: false,
            default: 'vue-checkbox'
        }
    }    
}
</script>

<template>
    <div class="vue-checkbox">
        <input  type="checkbox"                 
                v-bind:checked="checked"
                v-bind:id="id"
                @change="$emit('change', $event.target.checked)">
        <label v-bind:for="id">
            <slot></slot>
        </label>
    </div>
</template>

<style scoped>

.vue-checkbox >>> input[type="checkbox"] {
    position: relative;
    width: 40px;
    height: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    background: #c6c6c6;
    border-radius: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    vertical-align: middle;
    margin-right: 5px;
}

.vue-checkbox >>> input[type="checkbox"] ~label {
    margin-bottom: 0;
    vertical-align: middle;
}

.vue-checkbox  >>> input:checked[type="checkbox"] {
    background: #03a9f4;
}

.vue-checkbox >>>  input[type="checkbox"]:before {
    content: ' ';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 0;
    left: 0;
    background: #fff;
    transform: scale(1.2);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: .3s;
}

.vue-checkbox >>> input:checked[type="checkbox"]:before {
    left: 20px;
}

</style>