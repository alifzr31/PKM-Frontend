<template>
    <div>
        <div class="container py-3">
            <header>
                <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                    <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
                        <img src="../auth/img/poltek.png" alt="" style="width: 10%;" class="me-2" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path>
                        <span class="fs-4">Politeknik TEDC Bandung</span>
                    </a>

                    <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                        <router-link :to="{ name: 'dashboard'}" class="me-3 py-2 text-dark text-decoration-none"><b style="color: #0d6efd;">Proposal</b></router-link>
                        <router-link :to="{ name: 'review.index'}" class="me-3 py-2 text-dark text-decoration-none">Review</router-link>
                    </nav>

                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                    </form>

                    <div class="dropdown text-end">
                        <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="../dashboard/img/user.svg" alt="mdo" width="32" height="32" class="rounded-circle">
                        </a>
                        <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item">{{ user.name }}</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><router-link :to="{ path: `/profil/${user.id}` }" class="dropdown-item">Profil Saya</router-link></li>
                            <li><a class="dropdown-item" @click.prevent="logout" style="cursor: pointer;">Sign out</a></li>
                        </ul>
                    </div>
                </div>

                <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h4 class="display-4 fw-normal">Input Hasil Review</h4>
                </div>
            </header>

            <main>
                <div class="row g-5">
                <div class="col-md-7 col-lg-12">
                    <form @submit.prevent="store" enctype="multipart/form-data">
                    <div class="row g-3">
                        <input type="text" v-model="hasil.judul" readonly hidden>
                        <input type="text" v-model="hasil.dana" readonly hidden>
                        <input type="text" v-model="hasil.nip" readonly hidden>

                        <div class="col-6">
                            <label for="email" class="form-label">File Hasil Review</label>
                            <input type="file" @change="selectHasil" class="form-control">
                            <div v-if="validation.fl_hasilreview" class="mt-2 text-danger">
                                {{ validation.fl_hasilreview[0] }}
                            </div>
                        </div>


                        <div class="col-6">
                            <label for="email" class="form-label">Hasil Review</label>
                            <select v-model="hasil.status" class="form-control">
                                <option value="" selected hidden disabled>Terima atau Tolak?</option>
                                <option value="Terima">Terima</option>
                                <option value="Tolak">Tolak</option>
                            </select>
                            <div v-if="validation.status" class="mt-2 text-danger">
                                {{ validation.status[0] }}
                            </div>
                        </div>
                        
                        <div class="col-12">
                            <label for="email" class="form-label">Catatan</label>
                            <textarea v-model="hasil.catatan" class="form-control" style="height: 150px; resize: none;" placeholder="Catatan"></textarea>
                            <div v-if="validation.catatan" class="mt-2 text-danger">
                                {{ validation.catatan[0] }}
                            </div>
                        </div>

                    </div>
                    <hr class="my-4">

                    <button class="w-100 btn btn-primary btn-lg" type="submit">Input Hasil Review</button>
                    </form>
                </div>
                </div>
            </main>

            <footer class="pt-4 my-md-5 pt-md-5 border-top">
                <div class="row">
                <div class="col-12 col-md">
                    <!-- <img class="mb-2" src="../auth/img/poltek.png" alt="" style="width: 50%"> -->
                    <p class="d-block mb-3 text-muted">Politeknik TEDC Bandung</p>
                    <!-- <small class="d-block mb-3 text-muted">Politeknik TEDC Bandung</small> -->
                </div>
                <div class="col-6 col-md">
                </div>
                <div class="col-6 col-md">
                </div>
                <div class="col-6 col-md">
                    <ul class="list-unstyled text-small">
                    <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Pengelola : UPPM</a></li>
                    <!-- <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Politeknik TEDC Bandung 2022</a></li> -->
                    </ul>
                </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from 'axios';

export default {
    setup() {
        const token = localStorage.getItem('token')
        const router = useRouter()
        const route = useRoute()
        const user = ref('')
        const review = ref([])
        const validation = ref([])
        const hasil = reactive({
            judul: '',
            dana: '',
            fl_hasilreview: '',
            catatan: '',
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
                user.value = response.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get(`http://localhost:8000/api/reviews/${route.params.id}`)
            .then(response => {
                console.log(response.data.data);
                review.value = response.data.data
                hasil.judul = response.data.data.judul
                hasil.dana = response.data.data.dana
                hasil.fl_hasilreview = response.data.data.fl_hasilreview
                hasil.nip = response.data.data.nip
            }).catch(error => {
                console.log(error.response.data);
            })
        })

        function selectHasil(event) {
            let selectedFile = event.target.files[0]

            hasil.fl_hasilreview = selectedFile
            console.log(hasil.fl_hasilreview)
        }

        function store() {
            let formData = new FormData()
            formData.append('judul', hasil.judul)
            formData.append('dana', hasil.dana)
            formData.append('fl_hasilreview', hasil.fl_hasilreview)
            formData.append('catatan', hasil.catatan)
            formData.append('status', hasil.status)
            formData.append('nip', hasil.nip)

            axios.post('http://localhost:8000/api/hasils', formData)
            .then(response => {
                console.log(response.data.data);

                const s = 'Sudah'
                let stt = s

                axios.put(`http://localhost:8000/api/editstatusreview/${route.params.id}`, {
                    status: stt
                }).then(response => {
                    console.log(response.data.data)
                    router.push({
                        name: 'rev.index'
                    })
                })
            }).catch(error => {
                console.log(error.response.data);
                validation.value = error.response.data
            })
        }

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
            review,
            hasil,
            validation,
            router,
            selectHasil,
            store,
            logout

        }
    }
}
</script>