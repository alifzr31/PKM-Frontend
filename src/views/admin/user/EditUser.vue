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
                            <a class="nav-link active" style="font-size: 14pt;">
                            <i class="bi bi-people"></i>
                            Data User
                            </a>
                        </li>
                        </ul>

                        <div class="dropdown" style="padding:0px; padding-left: 15px; padding-right: 15px;">
                            <hr>
                        <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="@/views/auth/img/poltek.png" alt="" width="32" height="32" class=" me-2">
                            <strong style="color: black;">{{ user.name }}</strong>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-light text-small shadow">
                            <li><a class="dropdown-item" @click.prevent="logout">Sign out</a></li>
                        </ul>
                        </div>
                    </div>
                </nav>

                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="row g-5">
                    <div class="col-md-7 col-lg-12">
                        <br/>
                        <h3>Edit User</h3>
                        {{ nama.name }}
                        <article class="my-3" id="breadcrumb">
                        <div>
                            <div class="bd-example">
                            <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link :to="{ name: 'admin.user' }" class="text-decoration-none">User</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page"><router-link :to="{ name: 'admin.detail_user' }" class="text-decoration-none">{{ nama.name }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Edit Data</li>
                            </ol>
                            </nav>
                            </div>
                        </div>
                        </article>
                        
                        <form class="needs-validation" @submit.prevent="update">
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
                                    <option selected hidden disabled>Pilih Jenis Kelamin</option>
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
                                <label for="address" class="form-label">Username</label>
                                <input type="text" class="form-control" v-model="users.username" placeholder="Username">
                                
                                <div v-if="validation.username" class="mt-2 alert alert-danger">
                                    {{ validation.username[0] }}
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="address" class="form-label">Role</label>
                                <select class="form-control" v-model="users.kategori">
                                    <option selected hidden disabled>Pilih Role User</option>
                                    <option value="UPPM">UPPM</option>
                                    <option value="Dosen">Dosen</option>
                                    <option value="Wadir">Wakil Direktur</option>
                                    <option value="Reviewer">Reviewer</option>
                                </select>
                                
                                <div v-if="validation.kategori" class="mt-2 alert alert-danger">
                                    {{ validation.kategori[0] }}
                                </div>
                            </div>

                        </div>

                        <hr class="my-4">

                        <button class="w-100 btn btn-success btn-lg" type="submit">Edit Data</button>
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
import { useRouter, useRoute } from "vue-router";
import axios from 'axios';

export default {
    setup() {
        const token = localStorage.getItem('token')
        const router = useRouter()
        const route = useRoute()
        const user = ref('')
        const validation = ref([])
        const nama= ref([])
        const users = reactive({
            nip: '',
            name: '',
            kategori: '',
            alamat: '',
            jns_kelamin: '',
            no_telp: '',
            username: '',
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
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get(`http://localhost:8000/api/users/${route.params.id}`)
            .then(response => {
                nama.value = response.data.data
                users.nip = response.data.data.nip
                users.name = response.data.data.name
                users.kategori = response.data.data.kategori
                users.alamat = response.data.data.alamat
                users.jns_kelamin = response.data.data.jns_kelamin
                users.no_telp = response.data.data.no_telp
                users.username = response.data.data.username
                // console.log(response.data.data)
            })
        })

        function update() {
            let nip = users.nip
            let name = users.name
            let kategori = users.kategori
            let alamat = users.alamat
            let jns_kelamin = users.jns_kelamin
            let no_telp = users.no_telp
            let username = users.username
            
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.put(`http://localhost:8000/api/users/${route.params.id}`, {
                nip: nip,
                name: name,
                kategori: kategori,
                alamat: alamat,
                jns_kelamin: jns_kelamin,
                no_telp: no_telp,
                username: username
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
            nama,
            validation,
            update,
            logout
        }
    }
}
</script>