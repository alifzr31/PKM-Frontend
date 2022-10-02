<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link :to="{name: 'login'}" class="navbar-brand">PKM Politeknik TEDC Bandung</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link :to="{name: 'dashboard'}" class="nav-link">Proposal</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'lapkem.index'}" class="nav-link active">Laporan Kemajuan</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'lapakhir.index'}" class="nav-link">Laporan Akhir</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'login'}" class="nav-link">Review</router-link>
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
                            <li class="list-group-item text-dark text-decoration-none capitalize">profil saya</li>
                            <li @click.prevent="logout" class="list-group-item text-dark text-decoration-none capitalize" style="cursor:pointer">logout</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        Data Laporan Kemajuan Anda
                        <hr>
                        <router-link :to="{name: 'lapkem.create'}" class="btn btn-primary">Input Laporan Kemajuan</router-link>
                        <table class="table table-striped" id="data_proposal">
                            <thead>
                                <tr>
                                    <th scope="col">Judul</th>
                                    <th scope="col">Catatan</th>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(lapkem, index) in lapkems" :key="index">
                                    <th scope="row">{{ lapkem.judul }}</th>
                                    <td>{{ lapkem.catatan }}</td>
                                    <td>{{ lapkem.created_at }}</td>
                                    <td><router-link :to="{name: 'lapkem.detail', params: {id: lapkem.id} }" class="btn btn-success">Lihat</router-link></td>
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
        const lapkems = ref([])

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

            lapkembynip()
        })

        // function proposalbynip() {
        //     const user = JSON.parse(localStorage.getItem('data'))
            
        //     axios.defaults.headers.common.Authorization = `Bearer ${token}`
        //     axios.get(`http://localhost:8000/api/proposalsbynip/${user.nip}`)
        //     .then(response => {
        //         proposals.value = response.data.data
        //         console.log(proposals.value)
        //     })
        // }

        function lapkembynip() {
            const user = JSON.parse(localStorage.getItem('data'))

            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.get(`http://localhost:8000/api/lapkemsbynip/${user.nip}`)
            .then(response => {
                lapkems.value = response.data.data
                console.log(lapkems.value)
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
            lapkems,
            lapkembynip,
            logout
        }
    }
}
</script>

<style>
    .capitalize {
        text-transform: capitalize;
    }
</style>