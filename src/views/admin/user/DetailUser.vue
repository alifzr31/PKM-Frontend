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
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Detail Data User</h1>
                    <div>
                        <router-link :to="{ name: 'admin.edit_user' }" class="btn btn-sm btn-success"><i class="bi bi-pencil"></i> Edit Data</router-link>
                    </div>
                    <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2">
                        <!-- <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button> -->
                    </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                            <th scope="col">NIP</th>
                            <th scope="col">Nama Lengkap</th>
                            <th scope="col">Alamat</th>
                            <th scope="col">Jenis Kelamin</th>
                            <th scope="col">No. Telp</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ users.nip }}</td>
                                <td>{{ users.name }}</td>
                                <td>{{ users.alamat }}</td>
                                <td>{{ users.jns_kelamin }}</td>
                                <td>{{ users.no_telp }}</td>
                                <td>{{ users.username }}</td>
                                <td>{{ users.email }}</td>
                                <td>{{ users.kategori }}</td>
                                <!-- <td><router-link :to="{ name: 'admin.proposal_detail', params: {id: prop.id} }" class="btn btn-sm btn-warning">Lihat Data</router-link></td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>

                </main>
            </div>
        </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from 'axios';

export default {
    setup() {
        const token = localStorage.getItem('token')
        const user = ref('')
        const users = ref([])
        const router = useRouter()
        const route = useRoute()

        onMounted(() => {
            if (!token) {
                return router.push({
                    name: 'login'
                })
            }

            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.get('http://localhost:8000/api/user')
            .then(response => {
                // console.log(response.data)
                user.value = response.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get(`http://localhost:8000/api/users/${route.params.id}`)
            .then(response => {
                users.value = response.data.data
                // console.log(response.data.data)
            })
        })

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
            router,
            logout
        }
    }
}
</script>