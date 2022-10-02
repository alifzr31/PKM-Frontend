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
                            <router-link :to="{ name: 'admin.laporan' }" class="nav-link active" style="font-size: 14pt;">
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
                    <h1 class="h2">Detail Data Laporan Kemajuan</h1>
                    <!-- <div>
                        <router-link :to="{ name: 'admin.edit_review' }" class="btn btn-sm btn-success"><i class="bi bi-pencil"></i> Edit Data</router-link>
                    </div> -->
                    <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2">
                        <!-- <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button> -->
                    </div>
                    </div>
                </div>
                
                <div class="col-12">
                    <div class="card mb-4 rounded-3 shadow-sm border-danger">
                    <div class="card-header py-3 text-white bg-danger border-danger">
                        <h5 class="my-0 fw-normal">File Lapoan Kemajuan</h5>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title pricing-card-title"><small class="text-muted fw-light">{{ lapkems.fl_lapkem }}</small></h4>
                        <a :href="`http://localhost:8000/storage/Lapkemajuans/${lapkems.fl_lapkem}`" class="btn btn-md btn-danger"><i class="bi bi-file-pdf"></i> Download File</a>
                    </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                            <th scope="col">Judul</th>
                            <th scope="col">Catatan</th>
                            <th scope="col">NIP</th>
                            <th scope="col">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ lapkems.judul }}</td>
                                <td>{{ lapkems.catatan }}</td>
                                <td>{{ lapkems.nip }}</td>
                                <td>{{ moment(String(lapkems.created_at)).format('dddd-MM-YYYY') }}</td>
                                <!-- <td><router-link :to="{ name: 'admin.proposal_detail', params: {id: prop.id} }" class="btn btn-sm btn-warning">Lihat Data</router-link></td> -->
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="lapkems.status == 'Sedang diproses'">
                        <a @click.prevent="terima" class="btn btn-md btn-success"><i class="bi bi-check-lg"></i> Terima Laporan</a>
                    </div>
                    <div v-else>

                    </div>
                </div><br/>

                </main>
            </div>
        </div>
</template>

<script>
import { ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import moment from 'moment'

export default {
    setup() {
        const token = localStorage.getItem('token')
        const user = ref('')
        const lapkems = ref([])
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

            axios.get(`http://localhost:8000/api/lapkems/${route.params.id}`)
            .then(response => {
                lapkems.value = response.data.data
                // console.log(response.data.data)
            })
        })

        function terima() {
            axios.put(`http://localhost:8000/api/editstatuslapkem/${route.params.id}`, {
                status: 'Diterima'
            }).then(response => {
                alert('Laporan diterima')
                console.log(response.data.data);
                router.push({
                    name: 'admin.laporan'
                })
            }).catch(error => {
                console.log(error.response.data);
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
            moment,
            router,
            terima,
            logout
        }
    }
}
</script>