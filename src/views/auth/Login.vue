<template>
    <div class="body">
        <div class="form-signin">
            <div v-if="loginFailed" class="alert alert-danger alert-dismissible fade show" role="alert">
                Username atau Password anda salah
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <form @submit.prevent="login">
                <center><img class="mb-4" src="./img/poltek.png" alt="" width="72" height="72"></center>
                <h1 class="h3 mb-3 fw-normal text-center">Sign In</h1>

                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" v-model="user.username" placeholder="Username">
                    <label for="floatingInput">Username</label>
                    <div v-if="validation.username" class="text-danger">
                        {{ validation.username[0] }}
                    </div><br/>

                </div>
                <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" v-model="user.password" placeholder="Password">
                <label for="floatingPassword">Password</label>
                <div v-if="validation.password" class="text-danger">
                        {{ validation.password[0] }}
                    </div>
                </div>

                <div class="checkbox mb-3">
                <label>
                    <!-- <input type="checkbox" value="remember-me"> Remember me -->
                </label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <center>
                    <p class="mt-5 mb-3 text-muted">Belum punya akun?<router-link :to="{ name:'register' }"> Daftar disini</router-link></p>
                </center>
            </form>
        </div>
    </div>
</template>

<script>
import './css/signin.css'
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
    setup() {
        const router = useRouter()
        const validation = ref([])
        const user = reactive({
            username: '',
            password: ''
        })

        const loginFailed = ref(null)

        function login() {
            let username = user.username
            let password = user.password

            axios.post('http://localhost:8000/api/login', {
                username,
                password
            }).then(response => {
                if (response.data.success) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('data', JSON.stringify(response.data.data))
                    // localStorage.setItem('kategori', response.data.data.kategori)
                    console.log(response.data)

                    if (response.data.data.kategori == 'UPPM') {
                        return router.push({
                            name: 'admin.index'
                        })
                    } else if (response.data.data.kategori == 'Dosen') {
                        return router.push({
                            name: 'dashboard'
                        })
                    } else if (response.data.data.kategori == 'Wadir') {
                        return router.push({
                            name: 'wadir.index'
                        })
                    } else if (response.data.data.kategori == 'Reviewer') {
                        return router.push({
                            name: 'rev.index'
                        })
                    }
                    // return router.push({
                    //     name: 'dashboard'
                    // })
                } else {
                    loginFailed.value = true
                }

            }).catch(error => {
                validation.value = error.response.data
                console.log(error.response.data);
            })
        }

        return {
            user,
            validation,
            loginFailed,
            login
        }
    }
}
</script>

<style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
</style>