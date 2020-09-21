<template>
    <div>
        <v-container fluid class="mt-2 mb-10">
            <v-card :loading="loading">
                <v-card-title
                class="headline grey lighten-2 justify-center"
                primary-title
                >
                    ویرایش اطلاعات
                </v-card-title>

                <v-card-text class=" mt-5 px-md-10">
                        <v-form ref="form" class="px-md-10 mx-10">
                            <v-row justify="center">
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="نام"
                                    textarea
                                    v-model="name"
                                    :placeholder="$store.state.auth.user.name"
                                    outlined
                                    :prepend-icon="!nameChange ? 'mdi-pen' : 'mdi-circle'"
                                    @click:prepend="nameChange = !nameChange"
                                    :readonly="!nameChange"
                                    :rules="nameChange ? nameRules : []"
                                    :hint="!nameChange ? 'در صورت تمایل برای تغییر ، لطفا روی خودکار کلیک کنید.' : 'در صورت تمایل به بازگشت از تغییرات بر روی دایره کلیک کنید'"
                                ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="ایمیل"
                                    textarea
                                    v-model="email"
                                    :placeholder="$store.state.auth.user.email"
                                    outlined
                                    :prepend-icon="!emailChange ? 'mdi-pen' : 'mdi-circle'"
                                    @click:prepend="emailChange = !emailChange"
                                    :readonly="!emailChange"
                                    :rules="emailChange ? emailRules : []"
                                    :hint="!emailChange ? 'در صورت تمایل برای تغییر ، لطفا روی خودکار کلیک کنید.' : 'در صورت تمایل به بازگشت از تغییرات بر روی دایره کلیک کنید'"
                                ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="رمز"
                                    textarea
                                    v-model="password"
                                    outlined
                                    :prepend-icon="!passChange ? 'mdi-pen' : 'mdi-circle'"
                                    @click:prepend="passChange = !passChange"
                                    :readonly="!passChange"
                                    :rules="passChange ? passRules : []"
                                    :hint="!passChange ? 'در صورت تمایل برای تغییر ، لطفا روی خودکار کلیک کنید.' : 'در صورت تمایل به بازگشت از تغییرات بر روی دایره کلیک کنید'"
                                ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-row>
                            <v-col cols="12" class="text-center">
                                <v-btn @click="submit">
                                    ویرایش اطلاعات
                                </v-btn>
                            </v-col>
                        </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        middleware : 'auth' ,
        auth : 'user' ,
        data() {
            return {
                name: this.$store.state.auth.user.name ,
                email : this.$store.state.auth.user.email ,
                password : "" ,
                loading : false ,
                nameChange : false ,
                passChange : false ,
                emailChange : false ,
                passRules : [
                    input => input ? input.length >= 9 || 'رمز حداقل 9 حرف باشد' : '',
                    input => (input || '').length <= 17 ||
                    `بیشترین تعداد کاراکتر های رمز 17 عدد میباشد`
                ] ,
                emailRules : [
                    v => !!v || '',
                    v => /.+@.+\..+/.test(v) || 'ایمیل صحیح نیست'
                ] ,
                nameRules : [
                    v => !!v || ''
                ] ,
            }
        } ,
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    try {
                        let data = {
                            name : this.name ,
                            email : this.email ,
                            password : this.password
                        }
                    let response = await this.$axios.$put('/api/auth/user' , data)
                    if(response.success) {
                        this.name = "" ;
                        this.email = "" ;
                        this.password = "" ;
                    }
                    await this.$auth.fetchUser() ;
                    this.loading = false
                    this.$store.dispatch('notif' , {msg : response.message , type : 'success'})
                    } catch (error) {
                        console.log(error);
                        this.loading = false
                        this.$store.dispatch('notif' , {msg : error.response.data.message , type : 'error'})
                    }
                }
            } ,
        },
        watch: {
                nameChange(nv , ov) {
                    if(!nv) {
                        this.name = this.$store.state.auth.user.name
                    }
                } ,
                emailChange(nv , ov) {
                    if(!nv) {
                        this.email = this.$store.state.auth.user.email
                    }
                } ,
                passChange (newValue , ov) {
                    if(!newValue) {
                        this.password = ''
                    }
                }
            },
    }
</script>

<style scoped>
.select {
    width: 100%;
    border: black 1px solid;
    border-radius: 30%;
}
</style>