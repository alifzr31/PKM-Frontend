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
                        <router-link :to="{ name: 'admin.luaran' }" class="nav-link active" style="font-size: 14pt;">
                        <i class="bi bi-link-45deg"></i>
                        Data Luaran
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'admin.user' }" class="nav-link" style="font-size: 14pt;">
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
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Data Luaran</h1>
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
                            <th scope="col">Judul</th>
                            <th scope="col">Link Publikasi</th>
                            <th scope="col">Link Artikel</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(luaran, index) in luarans" :key="index">
                            <th scope="row">{{ luaran.judul }}</th>
                            <td><a :href="luaran.publikasi">{{ luaran.publikasi }}</a></td>
                            <td><a :href="luaran.artikel">{{ luaran.artikel }}</a></td>
                            <td>{{ luaran.status }}</td>
                            <td><router-link :to="{ name: 'admin.detail_luaran', params: {id: luaran.id} }" class="btn btn-sm btn-warning">Lihat Data</router-link></td>
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
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
    setup() {
        const token = localStorage.getItem('token')
        const router = useRouter()
        const user = ref('')
        const luarans = ref([])

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

            axios.get('http://localhost:8000/api/luarans')
            .then(response => {
                luarans.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function logout() {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.post('http://localhost:8000/api/logout')
            .then(response => {
                if (response.data.success) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('kategori')

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
            luarans,
            logout
        }
    }
}
</script>