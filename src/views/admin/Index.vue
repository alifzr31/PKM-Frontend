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
                        <router-link :to="{ name: 'admin.index' }" class="nav-link active" style="font-size: 14pt;">
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
                <h1 class="h2">Data Proposal</h1>
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
                        <th scope="col">Dana</th>
                        <th scope="col">Status</th>
                        <th scope="col">NIP</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(prop, index) in proposals" :key="index">
                            <td>{{ prop.judul }}</td>
                            <td>Rp {{ formatdana(prop.dana) }}</td>
                            <td>{{ prop.status }}</td>
                            <td>{{ prop.nip }}</td>
                            <td><router-link :to="{ name: 'admin.proposal_detail', params: {id: prop.id} }" class="btn btn-sm btn-warning">Lihat Data</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            
            <h2>Ditolak</h2>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">Judul</th>
                        <th scope="col">Dana</th>
                        <th scope="col">Status</th>
                        <th scope="col">NIP</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(tolak, index) in dcc" :key="index">
                        <td>{{ tolak.judul }}</td>
                        <td>Rp {{ formatdana(tolak.dana) }}</td>
                        <td>{{ tolak.status }}</td>
                        <td>{{ tolak.nip }}</td>
                        <td><router-link :to="{ name: 'admin.proposal_detail', params: {id: tolak.id} }" class="btn btn-sm btn-warning">Lihat Data</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            
            <h2>Diterima</h2>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">Judul</th>
                        <th scope="col">Dana</th>
                        <th scope="col">Status</th>
                        <th scope="col">NIP</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(terima, index) in acc" :key="index">
                        <td>{{ terima.judul }}</td>
                        <td>Rp {{ formatdana(terima.dana) }}</td>
                        <td>{{ terima.status }}</td>
                        <td>{{ terima.nip }}</td>
                        <td><router-link :to="{ name: 'admin.proposal_detail', params: {id: terima.id} }" class="btn btn-sm btn-warning">Lihat Data</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr/>
            
            <h2>Selesai</h2>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">Judul</th>
                        <th scope="col">Dana</th>
                        <th scope="col">Status</th>
                        <th scope="col">NIP</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(beres, index) in selesai" :key="index">
                        <td>{{ beres.judul }}</td>
                        <td>Rp {{ formatdana(beres.dana) }}</td>
                        <td>{{ beres.status }}</td>
                        <td>{{ beres.nip }}</td>
                        <td><router-link :to="{ name: 'admin.proposal_detail', params: {id: beres.id} }" class="btn btn-sm btn-warning">Lihat Data</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </main>
        </div>
    </div>
</template>

<script>
import './css/dashboard.css'

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import formatdana from '@/function/formatdana.js';

export default {
    setup() {
        const token = localStorage.getItem('token')
        const router = useRouter()
        const user = ref('')
        const proposals = ref([])
        const acc = ref([])
        const dcc = ref([])
        const selesai = ref([])

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

            axios.get('http://localhost:8000/api/seluruh')
            .then(response => {
                proposals.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('http://localhost:8000/api/acc')
            .then(response => {
                acc.value = response.data.data
            }).catch(error => {
                console.log(error.response.data);
            })

            axios.get('http://localhost:8000/api/dcc')
            .then(response => {
                console.log(response.data.data);
                dcc.value = response.data.data
            }).catch(error => {
                console.log(error.response.data);
            })

            axios.get('http://localhost:8000/api/selesai')
            .then(response => {
                selesai.value = response.data.data
            }).catch(error => {
                console.log(error.response.data);
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
            proposals,
            acc,
            dcc,
            selesai,
            formatdana,
            logout
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

      .b-example-divider {
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
</style>