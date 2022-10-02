<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link :to="{name: 'login'}" class="navbar-brand">PKM Politeknik TEDC Bandung</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link :to="{name: 'register'}" class="nav-link" href="">Proposal</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'login'}" class="nav-link" href="#">Laporan Kemajuan</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'login'}" class="nav-link" href="#">Laporan Akhir</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'login'}" class="nav-link" href="#">Review</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'admin.users'}" class="nav-link" href="#">Data User</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <b class="capitalize">{{ user.name }} - {{ user.kategori }}</b>
                        <hr>
                        <ul class="list-group">
                            <!-- <router-link :to="{name: 'dashboard'}" class="list-group-item text-dark text-decoration-none">DASHBOARD</router-link> -->
                            <li class="list-group-item text-dark text-decoration-none capitalize">profil saya</li>
                            <li @click.prevent="logout" class="list-group-item text-dark text-decoration-none capitalize" style="cursor:pointer">logout</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        Data User
                        <router-link :to="{name: 'admin.tambahusers'}" class="btn btn-success">Tambah User</router-link>
                        <hr>
                        <table class="table table-stripped">
                            <thead>
                                <th scope="col">NIP</th>
                                <th scope="col">Nama Lengkap</th>
                                <th scope="col">Alamat</th>
                                <th scope="col">Jenis Kelamin</th>
                                <th scope="col">Kategori</th>
                                <th scope="col">Email</th>
                                <th scope="col">Opsi</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">123</th>
                                    <td>nama</td>
                                    <td>alamat</td>
                                    <td>jk</td>
                                    <td>role</td>
                                    <td>email@email.com</td>
                                    <td>edit hapus</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
            logout
        }
    }
}
</script>