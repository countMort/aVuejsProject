<template>
<v-container fluid>
    <v-card max-width="700px" class="mx-auto">
        <v-card-title
        class="headline grey lighten-2"
        primary-title
        align='center'
        >
        <v-main>
            ورود
        </v-main>
        </v-card-title>

        <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        v-model="email"
                        label="ایمیل خود را وارد کنید"
                        class="mt-2 px-md-10"
                        prepend-icon="mdi-email"
                        :loading=loading
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        class="px-md-10"
                        v-model="password"
                        label="رمز خود را وارد کنید"
                        prepend-icon="mdi-lock"
                        :loading=loading
                        color="indigo"
                        :counter="17"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show = !show"
                    ></v-text-field>
                    <v-row>
                        <v-col cols=12 class="text-center my-0 py-0">
                            <v-card outlined class="success--text">حساب کاربری ندارید؟
                                <v-btn nuxt to="/Signup" text class="blue--text">
                                ثبت نام کنید
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col cols="6" class="text-center">
                            <v-btn @click="submit">
                                ورود
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="text-center">
                            <v-btn @click="clear">
                                پاک کردن
                            </v-btn>
                        </v-col>
                    </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</v-container>
</template>

<script>
    export default {
        // layout : "none" ,
        middleware : 'auth' ,
        auth : 'guest' ,
        data () {
            return {
                email: '' ,
                password: '',
                loading : false ,
                show : false ,
                passRules : [
                    input => input ? input.length >= 9 || 'رمز حداقل 9 حرف باشد' : '',
                    input => (input || '').length <= 17 ||
                    `بیشترین تعداد کاراکتر های رمز 17 عدد میباشد`
                ] ,
                emailRules : [
                    v => !!v || '',
                    v => /.+@.+\..+/.test(v) || 'ایمیل صحیح نیست'
                ] 
            }
        } ,
        methods: {
            async submit () {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    try {
                        let data = {
                            email : this.email ,
                            password : this.password
                        }
                        await this.$auth.loginWith("local" , {
                            data: {
                                email : this.email ,
                                password : this.password
                            }
                        })
                        .then((result) => {
                            this.$store.dispatch('notif' , {msg : result.data.message , type : "success"})
                            setTimeout(()=> {
                                location.reload()
                            } , 1500)
                        }).catch((error) => {
                            this.loading = false
                            // console.log(error.response);
                            this.$store.dispatch('notif' , {msg: error.response.data.message , type : "error"})
                        });
                        // this.$nuxt.$router.push('/')
                    } catch (error) {
                        this.loading = false
                        // console.log(error);
                        // this.$store.dispatch('notif' , {msg: "ایمیل یا رمز اشتباه است" , type : "error"})
                    }
                }
            },
            clear () {
                this.$refs.form.reset()
                this.loading = false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>