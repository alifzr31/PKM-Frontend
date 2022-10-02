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
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Data User</h1>
                    <router-link :to="{ name: 'admin.tambah_user' }" class="btn btn-sm btn-primary">Tambah Data User</router-link>
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
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(usr, index) in users" :key="index">
                                <td>{{ usr.nip }}</td>
                                <td>{{ usr.name }}</td>
                                <td>{{ usr.username }}</td>
                                <td>{{ usr.email }}</td>
                                <td>{{ usr.kategori }}</td>
                                <td>
                                    <router-link :to="{ name: 'admin.detail_user', params: {id: usr.id} }" class="btn btn-sm btn-warning">Lihat Data</router-link>
                                    <button style="margin-left: 10px;" @click.prevent="deleteuser(usr.id)" class="btn btn-sm btn-danger">Hapus</button>
                                </td>
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
        const users = ref([])
        let hapus = ref([])

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

            axios.get('http://localhost:8000/api/users')
            .then(response => {
                users.value = response.data.data

                const res = response.data
                const tmp = {}
                if (res.success == true) {
                    const data = res.data
                    data.forEach((item) => {
                        tmp[item.id] = item
                    });
                }
                hapus.value = tmp
            }).catch(error => {
                console.log(error.response.data);
            })
        })
        
        function deleteuser(id) {
            if (window.confirm('tes') == true) {
                axios.delete(`http://localhost:8000/api/users/${id}`)
                .then((response) => {
                    console.log(response.data.data);
                    router.go(0)
                }).catch((error) => {
                    console.log(error.response.data);
                })
            } else {
                console.log('cancel');
            }
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
            hapus,
            deleteuser,
            logout
        }
    }
}
</script>