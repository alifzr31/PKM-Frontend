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
                    <div class="row g-5">
                    <div class="col-md-7 col-lg-12">
                        <br/>
                        <h3>Edit Proposal</h3>
                        <article class="my-3" id="breadcrumb">
                        <div>
                            <div class="bd-example">
                            <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link :to="{ name: 'admin.index' }" class="text-decoration-none">Proposal</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page"><router-link :to="{ name: 'admin.proposal_detail' }" class="text-decoration-none">{{ jdl.judul }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Edit Data</li>
                            </ol>
                            </nav>
                            </div>
                        </div>
                        </article>
                        
                        <form class="needs-validation" @submit.prevent="update">
                        <div class="row g-3">
                            
                            <div class="col-6">
                                <label for="email" class="form-label">Judul</label>
                                <input type="text" class="form-control" v-model="proposals.judul" placeholder="Judul">
                                <div v-if="validation.judul" class="mt-2 alert alert-danger">
                                    {{ validation.judul[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="email" class="form-label">Dana</label>
                                <input type="text" class="form-control" v-model="proposals.dana" placeholder="Dana">
                                <div v-if="validation.dana" class="mt-2 alert alert-danger">
                                    {{ validation.dana[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="address2" class="form-label">File Proposal <i><span style="color: red;"> *.pdf | Max 10 Mb</span></i></label>
                                <input type="file" class="form-control" @change="selectProposal">
                                <div v-if="validation.fl_proposal" class="mt-2 alert alert-danger">
                                    {{ validation.fl_proposal[0] }}
                                </div>
                            </div>

                            <div class="col-6">
                                <label for="address2" class="form-label">File Proposal External <i><span style="color: red;"> *.pdf | Max 10 Mb</span></i></label>
                                <input type="file" class="form-control" @change="selectProposalExternal">
                                <div v-if="validation.fl_proposal_external" class="mt-2 alert alert-danger">
                                    {{ validation.fl_proposal_external[0] }}
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="email" class="form-label">Status</label>
                                <select class="form-control" v-model="proposals.status">
                                    <option selected hidden disabled>Pilih Status Pengajuan</option>
                                    <option value="Sedang diproses">Sedang diproses</option>
                                    <option value="Proses Review">Proses Review</option>
                                    <option value="Revisi">Revisi</option>
                                    <option value="Diterima">Diterima</option>
                                    <option value="Ditolak">Ditolak</option>
                                    <option value="Selesai">Selesai</option>
                                </select>
                                <div v-if="validation.dana" class="mt-2 alert alert-danger">
                                    {{ validation.dana[0] }}
                                </div>
                            </div>

                        </div>

                        <hr class="my-4">

                        <button class="w-100 btn btn-success btn-lg" type="submit">Edit Data</button>
                        </form>
                    </div>
                    </div>
                </main>
            </div>
        </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const token = localStorage.getItem('token')
        const user = ref('')
        const validation = ref([])
        const router = useRouter()
        const route = useRoute()
        
        const proposals = reactive({
            judul: '',
            dana: '',
            fl_proposal: '',
            fl_proposal_external: '',
            status: '',
            nip: ''
        })

        const jdl = ref([])


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
            
            axios.get(`http://localhost:8000/api/proposals/${route.params.id}`)
            .then(response => {
                jdl.value = response.data.data
                proposals.judul = response.data.data.judul
                proposals.dana = response.data.data.dana
                proposals.fl_proposal = response.data.data.fl_proposal
                proposals.fl_proposal_external = response.data.data.fl_proposal_external
                proposals.status = response.data.data.status
                proposals.nip = response.data.data.nip
            }).catch(error => {
                console.log(error.response.data)
            })
        })


        // onMounted(() => {

        // })
        
        function selectProposal(event) {
            let selectedFile = event.target.files[0]
    
            proposals.fl_proposal = selectedFile;
            // proposals.fl_proposal.push(selectedFile)
            console.log(proposals.fl_proposal)
        }

        function selectProposalExternal(event) {
            let selectedFile = event.target.files[0]

            proposals.fl_proposal_external = selectedFile;
            // proposals.fl_proposal_external.push(selectedFile)
            console.log(proposals.fl_proposal_external)
        }

        function update() {
            let formData = new FormData()
            formData.append('judul', proposals.judul)
            formData.append('dana', proposals.dana)
            formData.append('fl_proposal', proposals.fl_proposal)
            formData.append('fl_proposal_external', proposals.fl_proposal_external)
            formData.append('status', proposals.status)
            formData.append('nip', proposals.nip)
            
            axios.post(`http://localhost:8000/api/proposals/${route.params.id}`, formData)
            .then(response => {
                console.log(response.data.data)
                router.push({
                    name: 'admin.index'
                })
            }).catch(error => {
                console.log(error.response.data)
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
            jdl,
            validation,
            router,
            selectProposal,
            selectProposalExternal,
            update,
            logout
        }
    }
}
</script>