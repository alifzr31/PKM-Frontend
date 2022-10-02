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
                    <h1 class="h2">Detail Data Proposal</h1>
                    <div>
                        <!-- <router-link :to="{ name: 'admin.edit_proposal' }" class="btn btn-sm btn-success"><i class="bi bi-pencil"></i> Edit Data</router-link> -->
                    </div>
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
                        <h5 class="my-0 fw-normal">File Proposal</h5>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title pricing-card-title"><small class="text-muted fw-light">{{ proposals.fl_proposal }}</small></h4>
                        <a :href="`http://localhost:8000/storage/proposals/${proposals.fl_proposal}`" class="btn btn-md btn-danger"><i class="bi bi-file-pdf"></i> Download File</a>
                    </div>
                    </div>
                </div>

                <!-- <div class="col-12">
                    <div class="card mb-4 rounded-3 shadow-sm border-danger">
                    <div class="card-header py-3 text-white bg-danger border-danger">
                        <h5 class="my-0 fw-normal">File Proposal External</h5>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title pricing-card-title"><small class="text-muted fw-light">{{ proposals.fl_proposal_external }}</small></h4>
                        <a :href="`http://localhost:8000/storage/proposals/external/${proposals.fl_proposal_external}`" class="btn btn-md btn-danger"><i class="bi bi-file-pdf"></i> Download File</a>
                    </div>
                    </div>
                </div> -->
                
                <div class="table-responsive">
                    <table class="table table-striped table-sm" v-if="proposals.status == 'Revisi'">
                        <thead>
                            <tr>
                            <th scope="col">Judul</th>
                            <th scope="col">Dana</th>
                            <th scope="col">Catatan</th>
                            <th scope="col">Status</th>
                            <th scope="col">NIP</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ proposals.judul }}</td>
                                <td>Rp {{ formatdana(proposals.dana) }}</td>
                                <td>{{ proposals.catatan_revisi }}</td>
                                <td>{{ proposals.status }}</td>
                                <td>{{ proposals.nip }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="table table-striped table-sm" v-else>
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
                            <tr>
                                <td>{{ proposals.judul }}</td>
                                <td>Rp {{ formatdana(proposals.dana) }}</td>
                                <td>{{ proposals.status }}</td>
                                <td>{{ proposals.nip }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="proposals.status !== 'Sedang diproses'">

                </div>

                <div v-else>
                    <hr/>
                    <h4>Kirim ke Reviewer</h4>
                    <form @submit.prevent="store">
                        <div class="row g-3">
                            <div class="col-12">
                                <label for="email" class="form-label">File Proposal</label>
                                <input type="file" class="form-control" @change="selectProposal">
                                <div v-if="validation.fl_proposal" class="mt-2 text-danger">
                                    {{ validation.fl_proposal[0] }}
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="email" class="form-label">Catatan</label>
                                <textarea class="form-control" v-model="review.catatan_uppm" style="height: 150px; resize: none;" placeholder="Catatan"></textarea>
                                <div v-if="validation.catatan_uppm" class="mt-2 text-danger">
                                    {{ validation.catatan_uppm[0] }}
                                </div>
                            </div>
                        <input type="text" v-model="review.judul" readonly hidden>
                        <input type="text" v-model="review.dana" readonly hidden>
                        <input type="text" v-model="review.nip" readonly hidden>
                        <button class="btn btn-warning btn-md" type="submit">Kirim Data</button>
                        </div><br/>
                    </form>
                </div>
                
                </main>
            </div>
        </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import formatdana from '@/function/formatdana.js'

export default {
    setup() {
        const token = localStorage.getItem('token')
        const user = ref('')
        const proposals = ref([])
        const router = useRouter()
        const route = useRoute()
        const validation = ref([])
        const review = reactive({
            judul: '',
            dana: '',
            fl_proposal: '',
            catatan_uppm: '',
            status: '',
            nip: ''
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
                // console.log(response.data)
                user.value = response.data
            }).catch(error => {
                console.log(error.response.data)
            })
            
            axios.get(`http://localhost:8000/api/proposals/${route.params.id}`)
            .then(response => {
                proposals.value = response.data.data
                // console.log(response.data.data)
                review.judul = response.data.data.judul
                review.dana = response.data.data.dana
                review.fl_proposal = response.data.data.fl_proposal
                review.catatan_uppm = response.data.data.catatan_uppm
                review.nip = response.data.data.nip
            })
        })

        function selectProposal(event) {
            let selectedFile = event.target.files[0]

            review.fl_proposal = selectedFile;
            // review.fl_proposal.push(selectedFile)
            console.log(review.fl_proposal)
        }

        function store() {
            const st = 'Belum'
            review.status = st
            
            let formData = new FormData()
            formData.append('judul', review.judul)
            formData.append('dana', review.dana)
            formData.append('fl_proposal', review.fl_proposal)
            formData.append('catatan_uppm', review.catatan_uppm)
            formData.append('status', review.status)
            formData.append('nip', review.nip)

            axios.post('http://localhost:8000/api/reviews', formData)
            .then(response => {
                console.log(response.data.data);
                router.push({
                    name: 'admin.index'
                })

                const s = "Proses Review"
                let stt = s

                axios.put(`http://localhost:8000/api/statusproposal/${route.params.id}`, {
                    status: stt
                }).then(response => {
                    console.log(response.data);
                })
            }).catch(error => {
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
            proposals,
            validation,
            router,
            review,
            formatdana,
            store,
            selectProposal,
            logout
        }
    }
}
</script>