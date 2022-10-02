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
                            <router-link :to="{ name: 'admin.review' }" class="nav-link active" style="font-size: 14pt;">
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
                    <h1 class="h2">Detail Data Hasil Review</h1>
                </div>
                
                <div class="col-12">
                    <div class="card mb-4 rounded-3 shadow-sm border-danger">
                    <div class="card-header py-3 text-white bg-danger border-danger">
                        <h5 class="my-0 fw-normal">File Hasil Review</h5>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title pricing-card-title"><small class="text-muted fw-light">{{ hasils.fl_hasilreview }}</small></h4>
                        <a :href="`http://localhost:8000/storage/reviews/hasil/${hasils.fl_hasilreview}`" class="btn btn-md btn-danger"><i class="bi bi-file-pdf"></i> Download File</a>
                    </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
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
                                <td>{{ hasils.judul }}</td>
                                <td>Rp {{ formatdana(hasils.dana) }}</td>
                                <td>{{ hasils.catatan }}</td>
                                <td>{{ hasils.status }}</td>
                                <td>{{ hasils.nip }}</td>
                                <!-- <td><router-link :to="{ name: 'admin.proposal_detail', params: {id: prop.id} }" class="btn btn-sm btn-warning">Lihat Data</router-link></td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="hasils.status == 'Terima'">
                    <hr/>
                    <h4>Kirim ke Wakil Direktur</h4>
                    <form @submit.prevent="store" enctype="multipart/form-data">
                        <div class="row g-3">
                            <div class="col-12">
                                <label for="email" class="form-label">File Proposal</label>
                                <input type="file" class="form-control" @change="selectProposal">
                                <!-- <div v-if="validation.fl_proposal" class="mt-2 alert alert-danger">
                                    {{ validation.fl_proposal[0] }}
                                </div> -->
                            </div>
                            <div class="col-12">
                                <label for="email" class="form-label">Catatan</label>
                                <textarea class="form-control" v-model="hsl.catatan" style="height: 150px; resize: none;" placeholder="Catatan"></textarea>
                                <!-- <div v-if="validation.catatan_uppm" class="mt-2 alert alert-danger">
                                    {{ validation.catatan_uppm[0] }}
                                </div> -->
                            </div>
                        <input type="text" v-model="hsl.judul"  hidden>
                        <input type="text" v-model="hsl.dana"  hidden>
                        <input type="text" v-model="hsl.nip"  hidden>
                        <input type="text" v-model="hsl.status" hidden>
                        <button class="btn btn-warning btn-md" type="submit">Kirim Data</button>
                        </div><br/>
                    </form>
                </div>

                <div v-else-if="hasils.status == 'Tolak'">
                    <hr/>
                    <div class="col-12">
                        <form @submit.prevent="kirimrevisi">
                            <div class="col">
                                <textarea class="form-control" style="height: 150px; resize: none;" v-model="catatan_rvs.catatan_revisi" placeholder="Catatan untuk dosen melakukan revisi"></textarea>
                                <br/>
                                <button class="btn btn-md btn-warning"><i class="bi bi-send"></i> Kirim Revisi Pengajuan Ke Dosen</button>
                                <a @click.prevent="tolak" class="btn btn-md btn-danger" style="margin-left: 15px;"><i class="bi bi-x-lg"></i> Tolak Pengajuan</a>
                            </div>
                        </form>
                    </div>
                    <br/>
                </div>

                <div v-else-if="hasils.status == 'Proses Revisi Pengajuan'">
                    <hr/>
                    <a @click.prevent="terimarevisi" class="btn btn-md btn-success"><i class="bi bi-check-lg"></i> Terima Revisi Pengajuan</a>
                    <a @click.prevent="tolak" class="btn btn-md btn-danger" style="margin-left: 15px;"><i class="bi bi-x-lg"></i> Tolak Pengajuan</a>
                </div>

                <div v-else>

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
        const hasils = ref([])
        const router = useRouter()
        const route = useRoute()
        const hsl = reactive ({
            judul: '',
            dana: '',
            fl_proposal: '',
            catatan: '',
            status: '',
            nip: ''
        })
        const catatan_rvs = reactive({
            catatan_revisi: ''
        })

        onMounted(() => {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.get('http://localhost:8000/api/user')
            .then(response => {
                // console.log(response.data)
                user.value = response.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get(`http://localhost:8000/api/hasils/${route.params.id}`)
            .then(response => {
                hasils.value = response.data.data
                hsl.judul = response.data.data.judul
                hsl.dana = response.data.data.dana
                hsl.nip = response.data.data.nip
            }).catch(error => {
                console.log(error.response.data);
            })
            const stts = 'Belum'
            hsl.status = stts
        })

        function selectProposal(event) {
            let selectedFile = event.target.files[0]

            hsl.fl_proposal = selectedFile;
            // review.fl_proposal.push(selectedFile)
            console.log(hsl.fl_proposal)
        }

        function store() {
            let formData = new FormData()
            formData.append('judul', hsl.judul)
            formData.append('dana', hsl.dana)
            formData.append('fl_proposal', hsl.fl_proposal)
            formData.append('catatan', hsl.catatan)
            formData.append('status', hsl.status)
            formData.append('nip', hsl.nip)

            axios.post('http://localhost:8000/api/hasilpengajuans', formData)
            .then(response => {
                console.log(response.data.data);
            }).catch(error => {
                console.log(error.response.data);
            })

            axios.put(`http://localhost:8000/api/editstatushasilreview/${route.params.id}`, {
                status: 'Menunggu Persetujuan Wakil Direktur'
            }).then(response => {
                console.log(response.data.data);
                router.push({
                    name: 'admin.review'
                })
            }).catch(error => {
                console.log(error.response.data);
            })
        }

        function kirimrevisi() {
            let catatan_rev = catatan_rvs.catatan_revisi
            
            axios.put(`http://localhost:8000/api/catatan_revisi/${route.params.id}`, {
                catatan_revisi: catatan_rev
            }).then(response => {
                console.log(response.data.data);
            }).catch(error => {
                console.log(error.response.data);
            })

            axios.put(`http://localhost:8000/api/statusproposal/${route.params.id}`, {
                status: 'Revisi'
            }).then(response => {
                console.log(response.data.data);
            }).catch(error => {
                console.log(error.response.data);
            })

            axios.put(`http://localhost:8000/api/editstatushasilreview/${route.params.id}`, {
                status: 'Proses Revisi Pengajuan'
            }).then(response => {
                console.log(response.data.data);
                alert('Perintah revisi sudah dikirim')
                router.go(0)
            }).catch(error => {
                console.log(error.response.data);
            })
        }

        function tolak() {
            axios.put(`http://localhost:8000/api/statusproposal/${route.params.id}`, {
                status: 'Ditolak'
            }).then(response => {
                console.log(response.data.data);
            }).catch(error => {
                console.log(error.response.data);
            })

            axios.put(`http://localhost:8000/api/editstatushasilreview/${route.params.id}`, {
                status: 'Selesai'
            }).then(response => {
                console.log(response.data.data);
                alert('Pengajuan ditolak')
                router.go(0)
            }).catch(error => {
                console.log(error.response.data);
            })
        }

        function terimarevisi() {
            axios.put(`http://localhost:8000/api/statusproposal/${route.params.id}`, {
                status: 'Proses Review'
            }).then(response => {
                console.log(response.data.data);
            }).catch(error => {
                console.log(error.response.data);
            })

            axios.put(`http://localhost:8000/api/editstatushasilreview/${route.params.id}`, {
                status: 'Terima'
            }).then(response => {
                router.go(0)
                alert('Revisi diterima')
                console.log(response.data.data);
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
            hasils,
            hsl,
            router,
            formatdana,
            catatan_rvs,
            kirimrevisi,
            tolak,
            terimarevisi,
            store,
            selectProposal,
            logout
        }
    }
}
</script>