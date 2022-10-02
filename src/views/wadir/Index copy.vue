<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check" viewBox="0 0 16 16">
            <title>Check</title>
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </symbol>
        </svg>
        
        <div class="container py-3">
            <header>
                <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
                        <img src="@/views/auth/img/poltek.png" alt="" style="width: 10%;" class="me-2" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path>
                        <span class="fs-4">Politeknik TEDC Bandung</span>
                    </a>

                    <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <!-- <router-link :to="{ name: 'wadir.index'}" class="me-3 py-2 text-dark text-decoration-none"><b style="color: #0d6efd;">Proposal</b></router-link>
                        <router-link :to="{ name: 'dashboard'}" class="me-3 py-2 text-dark text-decoration-none">Laporan</router-link> -->

                        <!-- <a class="nav-link dropdown-toggle me-3 py-2 text-dark text-decoration-none" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Laporan
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link :to="{ name: 'lapkem.index'}" class="dropdown-item">Laporan Kemajuan</router-link></li>
                            <li><router-link :to="{ name: 'lapakhir.index'}" class="dropdown-item">Laporan Akhir</router-link></li>
                        </ul> -->
                        <!-- <router-link :to="{ name: 'review.index'}" class="me-3 py-2 text-dark text-decoration-none">Review</router-link> -->
                    </nav>

                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                    </form>

                    <div class="dropdown text-end">
                        <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="@/views/dashboard/img/user.svg" alt="mdo" width="32" height="32" class="rounded-circle">
                        </a>
                        <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item">{{ user.name }}</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item">Profil Saya</a></li>
                            <li><a class="dropdown-item" @click.prevent="logout" style="cursor: pointer;">Sign out</a></li>
                        </ul>
                    </div>
                </div>

                <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h4 class="display-4 fw-normal">Data Pengajuan Proposal</h4><br/>
                <h6>Menunggu Keputusan</h6>
                <p class="fs-5 text-muted">
                    <!-- <router-link :to="{ name: 'proposal.create' }" class="btn btn-lg btn-primary">Ajukan Proposal <i class="bi bi-arrow-right-circle"></i></router-link> -->
                </p>
                </div>
            </header>

            <main>
                <div class="table-responsive">
                    <table class="table table-striped bg-light">
                        <thead>
                            <tr>
                                <th scope="col">Judul</th>
                                <th scope="col">Dana</th>
                                <th scope="col">File Proposal</th>
                                <th scope="col">NIP</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(prop, index) in proposals" :key="index">
                                <td>{{ prop.judul }}</td>
                                <td>{{ prop.dana }}</td>
                                <td>{{ prop.fl_proposal }}</td>
                                <td>{{ prop.nip }}</td>
                                <!-- <td><router-link :to="{ name: 'rev.createhasil', params: {id: prop.id} }" class="btn btn-sm btn-primary"> Input Hasil Review <i class="bi bi-clipboard"></i></router-link></td> -->
                                <td><a @click.prevent="acc" class="btn btn-sm btn-success">Terima <i class="bi bi-check-lg"></i></a></td>
                                <td><a class="btn btn-sm btn-danger">Tolak <i class="bi bi-x-lg"></i></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </main>

            <footer class="pt-4 my-md-5 pt-md-5 border-top">
                <div class="row">
                <div class="col-12 col-md">
                    <p class="d-block mb-3 text-muted">&copy; {{ tahun }} Politeknik TEDC Bandung</p>
                </div>
                <div class="col-6 col-md">
                </div>
                <div class="col-6 col-md">
                </div>
                <div class="col-6 col-md">
                    <ul class="list-unstyled text-small">
                    <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Pengelola : UPPM</a></li>
                    </ul>
                </div>
                </div>
            </footer>
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
        const router = useRouter()
        const route = useRoute()
        const user = ref('')
        const proposals = ref([])
        const terima = ref([])

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

            axios.get('http://localhost:8000/api/hasilpengajuanbystatus')
            .then(response => {
                proposals.value = response.data.data

                
            }).catch(error => {
                console.log(error.response.data);
            })

        })

        function acc(id) {
            axios.put(`http://localhost:8000/api/statusproposal/${route.params.id}`, {
                status: 'Diterima'
            })
            .then(response => {
                alert('Anda menerima pengajuan yang berjudul', response.data.data.judul)
                console.log(response.data.data);
            }).catch(error => {
                console.log(error.response.data);
            })

            // axios.put(`http://localhost:8000/api//editstatushasilpengajuan/${route.params.id}`, {
            //     status: 'Diterima'
            // })
            // .then(response => {
            //     console.log(response.data.data);
            // }).catch(error => {
            //     console.log(error.response.data);
            // })
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

        const d = new Date()
        let tahun = d.getFullYear()

        return {
            token,
            user,
            tahun,
            proposals,
            acc,
            logout
        }
    }
}
</script>