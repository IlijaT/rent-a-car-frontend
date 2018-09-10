<template>
<div> 
    <v-alert  v-if="text.name" dismissible type="error" @input="onClose" :value="true">
        {{ text.name[0] }}
    </v-alert>
    <v-alert  v-if="text.email" dismissible type="error" @input="onClose" :value="true">
        {{ text.email[0] }}
    </v-alert>
    <v-alert  v-if="text.password" dismissible type="error" @input="onClose" :value="true">
        {{ text.password[0] }}
    </v-alert>
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

