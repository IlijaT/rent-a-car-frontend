<template>
<div> 
    <div  v-if="text.name" dismissible type="error" @input="onClose" :value="true">
        {{ text.name[0] }}
    </div>
    <div  v-if="text.email" dismissible type="error" @input="onClose" :value="true">
        {{ text.email[0] }}
    </div>
    <div  v-if="text.password" dismissible type="error" @input="onClose" :value="true">
        {{ text.password[0] }}
    </div>
 </div>   
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose () {
            this.$emit('dismissed');
        }
    }
}
</script>

