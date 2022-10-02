<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#"><img src="@/views/auth/img/poltek.png" style="width: 20%;"> PKM Politeknik TEDC Bandung</div>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        </header>

        <div class="container-fluid">
            <div class="row">
                <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div class="position-sticky pt-3 sidebar-sticky">
                        <ul class="nav flex-column">
                        <li class="nav-item">
                            <router-link :to="{ name: 'admin.index' }" class="nav-link" style="font-size: 14pt;">
                            <i class="bi bi-file-earmark-text"></i>
                            Data Proposal
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'admin.review' }" class="nav-link" style="font-size: 14pt;">
                            <i class="bi bi-clipboard"></i>
                            Data Review
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'admin.laporan' }" class="nav-link" style="font-size: 14pt;">
                            <i class="bi bi-file-text"></i>
                            Data Laporan
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'admin.luaran' }" class="nav-link" style="font-size: 14pt;">
                            <i class="bi bi-link-45deg"></i>
                            Data Luaran
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'admin.user' }" class="nav-link active" style="font-size: 14pt;">
                            <i class="bi bi-people"></i>
                            Data User
                            </router-link>
                        </li>
                        </ul>

                        <div class="dropdown" style="padding:0px; padding-left: 15px; padding-right: 15px;">
                            <hr>
                        <div class="d-flex align-items-center text-decoration-none">
                            <strong style="color: black;">{{ user.name }}<div @click.prevent="logout" style="cursor: pointer;">Sign Out <i class="bi bi-box-arrow-right"></i></div></strong>
                        </div>
                        </div>
                    </div>
                </nav>

                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="row g-5">
                    <div class="col-md-7 col-lg-12">
                        <br/>
                        <h3>Tambah Data User</h3>
                        
                        <form class="needs-validation" @submit.prevent="store">
                        <div class="row g-3">
                        
                            <div class="col-6">
                                <label for="email" class="form-label">NIP</label>
                                <input type="text" class="form-control" v-model="users.nip" placeholder="NIP">

                                <div v-if="validation.nip" class="mt-2 alert alert-danger">
                                    {{ validation.nip[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="address" class="form-label">Nama Lengkap</label>
                                <input type="text" class="form-control" v-model="users.name" placeholder="Nama Lengkap">
                                <input type="text" v-model="users.kategori" readonly hidden>
                                
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{ validation.name[0] }}
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="address" class="form-label">Alamat</label>
                                <textarea class="form-control" v-model="users.alamat" style="height: 150px; resize: none;" placeholder="Alamat"></textarea>
                                
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="address" class="form-label">Jenis Kelamin</label>
                                <select class="form-control" v-model="users.jns_kelamin">
                                    <option value="" selected hidden disabled>Pilih Jenis Kelamin</option>
                                    <option value="Pria">Pria</option>
                                    <option value="Wanita">Wanita</option>
                                </select>
                                
                                <div v-if="validation.jns_kelamin" class="mt-2 alert alert-danger">
                                    {{ validation.jns_kelamin[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="address" class="form-label">No. Telpon</label>
                                <input type="text" class="form-control" v-model="users.no_telp" placeholder="No. Telpon">
                                
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="address" class="form-label">Role</label>
                                <select class="form-control" v-model="users.kategori">
                                    <option value="" selected hidden disabled>Pilih Role User</option>
                                    <option value="UPPM">UPPM</option>
                                    <option value="Dosen">Dosen</option>
                                    <option value="Wadir">Wakil Direktur</option>
                                    <option value="Reviewer">Reviewer</option>
                                </select>
                                
                                <div v-if="validation.kategori" class="mt-2 alert alert-danger">
                                    {{ validation.kategori[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="address" class="form-label">Username</label>
                                <input type="text" class="form-control" v-model="users.username" placeholder="Username">
                                
                                <div v-if="validation.username" class="mt-2 alert alert-danger">
                                    {{ validation.username[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="address" class="form-label">Email</label>
                                <input type="email" class="form-control" v-model="users.email" placeholder="Email">
                                
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="address" class="form-label">Password</label>
                                <input type="password" class="form-control" v-model="users.password" placeholder="Password">
                                
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="address" class="form-label">Konfirmasi Password</label>
                                <input type="password" class="form-control" v-model="users.password_confirmation" placeholder="Konfirmasi Password">
                                
                                <div v-if="validation.password_confirmation" class="mt-2 alert alert-danger">
                                    {{ validation.password_confirmation[0] }}
                                </div>
                            </div>

                        </div>

                        <hr class="my-4">

                        <button class="w-100 btn btn-success btn-lg" type="submit">Tambah Data User</button>
                        <br/>
                        </form>
                    </div>
                    </div>
                
                </main>
            </div>
        </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
    setup() {
        const token = localStorage.getItem('token')
        const router = useRouter()
        const user = ref('')
        const validation = ref([])
        const users = reactive({
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
            if (!token) {
                return router.push({
                    name: 'login'
                })
            }

            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.get('http://localhost:8000/api/user')
            .then(response => {
                user.value = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function store() {
            let nip = users.nip
            let name = users.name
            let kategori = users.kategori
            let alamat = users.alamat
            let jns_kelamin = users.jns_kelamin
            let no_telp = users.no_telp
            let username = users.username
            let email = users.email
            let password = users.password
            let password_confirmation = users.password_confirmation

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
            }).then(response => {
                console.log(response.data.data);
                router.push({
                    name: 'admin.user'
                })
            }).catch(error => {
                console.log(error.response.data);
                validation.value = error.response.data
            })
        }

        function logout() {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.post('http://localhost:8000/api/logout')
            .then(response => {
                if (response.data.success) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('data')

                    return router.push({
                        name: 'login'
                    })
                }
            }).catch(error => {
                console.log(error.response.data)
            })
        }

        return {
            token,
            user,
            users,
            validation,
            store,
            logout
        }
    }
}
</script>