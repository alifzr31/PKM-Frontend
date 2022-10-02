<template>
    <div class="body">
        <div class="form-signin">
            <form @submit.prevent="register">
                <center><img class="mb-4" src="./img/poltek.png" alt="" width="72" height="72"></center>
                <h1 class="h3 mb-3 fw-normal text-center">Sign Up</h1>

                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" v-model="user.nip" placeholder="NIP">
                    <label for="floatingInput">NIP</label>

                    <div v-if="validation.nip" class="text-danger">
                        {{ validation.nip[0] }}
                    </div>
                </div>

                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" v-model="user.name" placeholder="Nama Lengkap">
                    <label for="floatingInput">Nama Lengkap</label>

                    <div v-if="validation.name" class="text-danger">
                        {{ validation.name[0] }}
                    </div>
                </div>
                    
                <input type="text" class="form-control" id="floatingInput" v-model="user.kategori" placeholder="Kategori" readonly hidden>

                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" v-model="user.no_telp" placeholder="No. Telp">
                    <label for="floatingInput">No. Telpon</label>

                    <div v-if="validation.no_telp" class="text-danger">
                        {{ validation.no_telp[0] }}
                    </div>
                </div>

                <hr/>

                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" v-model="user.username" placeholder="Username">
                    <label for="floatingInput">Username</label>

                    <div v-if="validation.username" class="text-danger">
                        {{ validation.username[0] }}
                    </div>
                </div>

                <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" v-model="user.email" placeholder="Email">
                    <label for="floatingInput">Email</label>

                    <div v-if="validation.email" class="text-danger">
                        {{ validation.email[0] }}
                    </div>
                </div>

                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" v-model="user.password" placeholder="Password">
                    <label for="floatingPassword">Password</label>

                    <div v-if="validation.password" class="text-danger">
                        {{ validation.password[0] }}
                    </div>
                </div>

                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingInput" v-model="user.password_confirmation" placeholder="Password Confirmation">
                    <label for="floatingPassword">Konfirmasi Password</label>

                    <div v-if="validation.password_confirmation" class="text-danger">
                        {{ validation.password_confirmation[0] }}
                    </div>
                </div>

                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                <center>
                    <p class="mt-5 mb-3 text-muted"><router-link :to="{ name:'login' }">Sign in</router-link></p>
                </center>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup() {
        const router = useRouter()
        const validation = ref([])
        const user = reactive({
            nip: '',
            name: '',
            kategori: '',
            alamat: '',
            jns_kelamin: '',
            no_telp: '',
            username: '',
            email: '',
            password: '',
            password_confirmation: ''
        })
        
        onMounted(() => {
            const ktgr = 'Dosen'
            user.kategori = ktgr
        })

        function register() {
            let nip = user.nip
            let name = user.name
            let kategori = user.kategori
            let alamat = user.alamat
            let jns_kelamin = user.jns_kelamin
            let no_telp = user.no_telp
            let username = user.username
            let email = user.email
            let password = user.password
            let password_confirmation = user.password_confirmation

            axios.post('http://localhost:8000/api/register', {
                nip,
                name,
                kategori,
                alamat,
                jns_kelamin,
                no_telp,
                username,
                email,
                password,
                password_confirmation
            }).then(() => {
                return router.push({
                    name: 'login'
                })
            }).catch(error => {
                validation.value = error.response.data
            })
        }

        return {
            user,
            validation,
            register
        }
    }
}
</script>