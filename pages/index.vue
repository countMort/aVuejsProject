<template>
    <v-container fluid id="main" class="d-flex text-center justify-center align-center">
        <v-card :loading=true min-height="100px" outlined rounded color=rgba(10,0,0,0.7) class="text-center align-center justify-center">
            <v-card-title class="justify-center">
                <v-avatar
                    id="avatar"
                    size="80"
                    color="transparent"
                >
                    <img rotate="40" src="~/static/icon.png" alt="alt">
                </v-avatar>
            </v-card-title>
            <v-card-subtitle class="white--text font-weight-bold title">
                <template>{{dot}}لطفا چند لحظه صبر کنید... در حال روشن کردن سرور ها
                </template>
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        layout : 'none' ,
        data() {
            return {
                dot: '.'
            }
        },
        mounted () {
            this.$axios.get('/api/products/5f131459a775582248527ec8')
            .then(() => location.replace('/home'))
                setTimeout(function () {
                    this.dot = '..'
                }.bind(this) , 1000)
                setTimeout(function () {
                    this.dot = '...'
                }.bind(this) , 2000)
                setTimeout(function () {
                    this.dot = '....'
                }.bind(this) , 3000)
                setInterval(function () {
                    this.dot = '.'
                    setTimeout(function () {
                        this.dot = '..'
                    }.bind(this) , 1000)
                    setTimeout(function () {
                        this.dot = '...'
                    }.bind(this) , 2000)
                    setTimeout(function () {
                        this.dot = '....'
                    }.bind(this) , 3000)
                }.bind(this), 4000)
        },
    }
</script>

<style lang="css" scoped>
#main {
    background-image: url('/index.jpg');
    width : 100% ;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
}

#avatar {
    /* animation: buzz 5s 5s 2s 10 0s none; */
    animation-name: buzz;
    animation-duration: 4s;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}

@keyframes buzz {
    0% {
    transform: scale(1);
    }
    15% {
    transform: scale(1.2);
    }
    25% {
    transform: rotate(15deg) scale(1.2)
    }
    28% {
    transform: rotate(-25deg) scale(1.2)
    }
    31% {
    transform: rotate(15deg) scale(1.2)
    }
    34% {
    transform: rotate(-8deg) scale(1.2)
    }
    37% {
    transform: rotate(3deg) scale(1.2)
    }
    60% {
    transform: scale(1);
    }
}
</style>