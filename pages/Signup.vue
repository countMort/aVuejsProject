<template>
<v-container fluid>
    <v-card max-width="700" class="mx-auto">
        <v-card-title
        class="headline grey lighten-2"
        primary-title
        style="text-align : center"
        >
        <v-main>
            فرم ثبت نام
        </v-main>
        </v-card-title>

        <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        v-model="name"
                        label="لطفا نام خود را وارد کنید"
                        class="mt-2 px-md-10"
                        prepend-icon="mdi-account"
                        :loading=loading
                        color="indigo"
                        :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                        v-model="email"
                        label="ایمیل خود را وارد کنید"
                        class="mt-2 px-md-10"
                        prepend-icon="mdi-email"
                        :rules="emailRules"
                        :loading=loading
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        class="px-md-10"
                        v-model="password"
                        label="رمز خود را انتخاب کنید"
                        prepend-icon="mdi-lock"
                        :rules="passRules"
                        :loading=loading
                        color="indigo"
                        :counter="17"
                        :type="show1 ? 'text' : 'password'"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-text-field
                        class="px-md-10"
                        v-model="rePassword"
                        label="رمز خود را مجددا تایپ کنید"
                        prepend-icon="mdi-lock"
                        color="indigo"
                        :loading=loading
                        :rules="rePassRules"
                        :type="show2 ? 'text' : 'password'"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show2 = !show2"
                    ></v-text-field>
                    <v-layout row wrap class="text-center justify-center align-center" align=center justify=center>
                        <!-- <v-checkbox :label="null" v-model="terms" :value="true">
                        </v-checkbox> -->
                        {{termsText}}
                    </v-layout>
                    <v-row>
                        <v-col cols=12 class="text-center my-0 py-0">
                            <v-card outlined class="success--text">حساب کاربری دارید؟
                                <v-btn nuxt to="/Login" text class="blue--text">
                                وارد شوید
                                </v-btn>
                            </v-card>
                        </v-col>
                        <v-col cols="6" class="text-center">
                            <v-btn @click="submit">
                                ثبت نام
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
        middleware : 'auth' ,
        auth : 'guest' ,
        data () {
            return {
                name : '' ,
                email: '' ,
                password: '',
                rePassword : '' ,
                loading : false ,
                show1 : false ,
                show2 : false ,
                passRules : [
                    input => input ? input.length >= 9 || 'رمز حداقل 9 حرف باشد' : '',
                    input => (input || '').length <= 17 ||
                    `بیشترین تعداد کاراکتر های رمز 17 عدد میباشد`
                ] ,
                emailRules : [
                    v => !!v || '',
                    v => /.+@.+\..+/.test(v) || 'ایمیل صحیح نیست'
                ] ,
                rePassRules : [
                    v => v===this.password || 'تکرار رمز صحیح نمی‌باشد'
                ] ,
                nameRules : [
                    v => !!v || ''
                ] ,
                terms : false ,
                termsText : "در حال حاضر هیچ قصدی برای استفاده از هرگونه اطلاعات(Big Data/Cookies) وجود ندارد و در صورت  تغییر این شرایط حتما این را به شما اطلاع خواهیم داد."
            }
        } ,
        methods: {
            async submit () {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    try {
                        let data = {
                            name : this.name ,
                            email : this.email ,
                            password : this.password
                        }
                        console.log(data);
                    let response = await this.$axios.$post('/api/auth/signup' , data)
                    console.log(response);
                    if(response.success) {
                        await this.$auth.loginWith("local" , {
                            data: {
                                email : this.email ,
                                password : this.password
                            }
                        })
                        this.$store.dispatch('notif' , {msg : "خوش آمدید" , type : "success"})
                        location.reload()
                    }
                    } catch (error) {
                        this.loading = false
                        console.log(error.response.data.message);
                        if(error.response.status === 500) {
                            this.$store.dispatch('notif' , {msg : "خطایی رخ داده است، لطفا ایمیل های دیگر را امتحان کنید!" , type : "error"})
                        } else {
                            this.$store.dispatch('notif' , {msg : error.response.data.message , type : "error"})
                        }
                    }
                }
            },
            clear () {
                this.$refs.form.reset()
                this.loading = false
                // this.select = null
                // this.checkbox = false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>