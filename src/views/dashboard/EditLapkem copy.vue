<template>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Data Laporan Kemajuan</h4><router-link :to="{name: 'lapkem.detail'}">Kembali</router-link>
                        <hr>
                        <form @submit.prevent="update" enctype="multipart/form-data">
                        
                        <div>
                            <label for="model">Judul</label>
                            <input type="text" v-model="lapkems.judul" class="form-control" required placeholder="Judul">

                            <div v-if="validation.judul" class="mt-2 alert alert-danger">
                                {{ validation.judul[0] }}
                            </div>
                        </div>

                        <div>
                            <label>Catatan</label>
                            <input type="text" v-model="lapkems.catatan" class="form-control" required>

                            <div v-if="validation.catatan" class="mt-2 alert alert-danger">
                                {{ validation.catatan[0] }}
                            </div>
                        </div>

                        <div>
                            <!-- <label for="model">NIP</label> -->
                            <input type="text" v-model="lapkems.nip" class="form-control" required readonly hidden>

                            <div v-if="validation.nip" class="mt-2 alert alert-danger">
                                {{ validation.nip[0] }}
                            </div>
                        </div>

                        <hr>
                        <i style="color: red;">*Ekstensi .pdf, .docx, .doc | max 2 mb (2048 kilobyte)</i>
                        <div>
                            <label for="model">File Proposal</label>
                            <br/><i style="color: darkgreen;">File Sebelumnya : {{ lapkems.fl_lapkem }}</i>
                            <input type="file" @change="selectLapkem" class="form-control"  placeholder="File Proposal">

                            <div v-if="validation.fl_lapkem" class="mt-2 alert alert-danger">
                                {{ validation.fl_lapkem[0] }}
                            </div>
                        </div>


                        <div>
                            <button type="submit" class="btn btn-primary">Edit</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const lapkems = reactive({
            judul: '',
            fl_lapkem: '',
            catatan: '',
            nip: ''
        })

        const validation = ref([])
        const router = useRouter()
        const route = useRoute()

        onMounted(() => {
            axios.get(`http://localhost:8000/api/lapkems/${route.params.id}`)
            .then(response => {
                console.log(response.data.data)
                lapkems.judul = response.data.data.judul
                lapkems.fl_lapkem = response.data.data.fl_lapkem
                lapkems.catatan = response.data.data.catatan
                lapkems.nip = response.data.data.nip
            }).catch(error => {
                console.log(error.response.data);
            })
        })

        function selectLapkem(event) {
            let selectedFile = event.target.files[0]

            lapkems.fl_lapkem = selectedFile
            console.log(lapkems.fl_lapkem)
        }

        function update() {
            let formData = new FormData()
            formData.append('judul', lapkems.judul)
            formData.append('fl_lapkem', lapkems.fl_lapkem)
            formData.append('catatan', lapkems.catatan)
            formData.append('nip', lapkems.nip)

            axios.post(`http://localhost:8000/api/lapkems/${route.params.id}`, formData)
            .then(response => {
                console.log(response.data.data);
                router.push({
                    name: 'lapkem.index'
                })
            }).catch(error => {
                console.log(error.response.data);
            })
        }

        return {
            lapkems,
            validation,
            router,
            selectLapkem,
            update
        }
    }
}
</script>