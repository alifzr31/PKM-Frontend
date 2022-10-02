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
                    <router-link :to="{name: 'admin.users'}" class="nav-link" href="/admin/users">Data User</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Tambah Data User</h4>
                        <hr>
                        <form @submit.prevent="register">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>NIP</label>
                                        <input type="text" v-model="user.nip" class="form-control"
                                            placeholder="NIP">
                                    </div>
                                    <div v-if="validation.nip" class="mt-2 alert alert-danger">
                                        {{ validation.nip[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Nama Lengkap</label>
                                        <input type="text" v-model="user.name" class="form-control"
                                            placeholder="Nama Lengkap">
                                    </div>
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        {{ validation.name[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Kategori</label>
                                        <select v-model="user.kategori" class="form-control">
                                            <option value="Kategori" selected disabled hidden>Kategori</option>
                                            <option value="UPPM">UPPM</option>
                                            <option value="Dosen">Dosen</option>
                                            <option value="WD1">Wakil Direktur 1</option>
                                            <option value="WD2">Wakil Direktur 2</option>
                                            <option value="Reviewer">Reviewer</option>
                                        </select>
                                    </div>
                                    <div v-if="validation.kategori" class="mt-2 alert alert-danger">
                                        {{ validation.kategori[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Alamat</label>
                                        <textarea v-model="user.alamat" class="form-control" placeholder="Alamat" style="height:100px; resize:none;"></textarea>
                                    </div>
                                    <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                        {{ validation.alamat[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Jenis Kelamin</label>
                                        <div class="form-check">
                                            <input type="radio" v-model="user.jns_kelamin" class="form-check-input" value="Wanita">
                                            <label class="form-check-label">Wanita</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="radio" v-model="user.jns_kelamin" class="form-check-input" value="Pria">
                                            <label class="form-check-label">Pria</label>
                                            <input type="radio" checked disabled hidden>
                                        </div>
                                    </div>
                                    <div v-if="validation.jns_kelamin" class="mt-2 alert alert-danger">
                                        {{ validation.jns_kelamin[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email address</label>
                                        <input type="email" v-model="user.email" class="form-control"
                                            placeholder="Email Address">
                                    </div>
                                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                                        {{ validation.email[0] }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" v-model="user.password" class="form-control"
                                            placeholder="Password">
                                    </div>
                                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                                        {{ validation.password[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Konfirmasi Password</label>
                                        <input type="password" v-model="user.password_confirmation" class="form-control"
                                            placeholder="Konfirmasi Password">
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Tambah User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup() {
        const router = useRouter()
        const validation = ref([])
        const user = reactive({
            nip: '',
            name: '',
            kategori: '',
            alamat: '',
            jns_kelamin: '',
            email: '',
            password: '',
            password_confirmation: ''
        })

        function register() {
            let nip = user.nip
            let name = user.name
            let kategori = user.kategori
            let alamat = user.alamat
            let jns_kelamin = user.jns_kelamin
            let email = user.email
            let password = user.password
            let password_confirmation = user.password_confirmation

            axios.post('http://localhost:8000/api/register', {
                nip,
                name,
                kategori,
                alamat,
                jns_kelamin,
                email,
                password,
                password_confirmation
            }).then(() => {
                return router.push({
                    name: 'admin.users'
                })
            }).catch(error => {
                validation.value = error.response.data
            })
        }

        return {
            user,
            validation,
            register
        }
    }
}
</script>