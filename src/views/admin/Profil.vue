<template>
    <div>
        <h1>profil</h1>
        <form @submit.prevent="update">
            <input type="text" v-model="users.nip">
            <input type="text" v-model="users.name">
            <input type="text" v-model="users.kategori">
            <input type="text" v-model="users.alamat">
            <input type="text" v-model="users.jns_kelamin">
            <input type="text" v-model="users.username">
            <div v-if="validation.username" class="alert alert-danger">
                {{ validation.username[0] }}
            </div>

            <input type="submit" value="">
        </form>
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
        const validation = ref([])
        const users = reactive({
            nip: '',
            name: '',
            kategori: '',
            alamat: '',
            jns_kelamin: '',
            username: '',
            // email: '',
            // password: '',
            // password_confirmation: ''
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

                users.nip = response.data.nip
                users.name = response.data.name
                users.kategori = response.data.kategori
                users.alamat = response.data.alamat
                users.jns_kelamin = response.data.jns_kelamin
                users.username = response.data.username
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function update() {
            let nip = users.nip
            let name = users.name
            let kategori = users.kategori
            let alamat = users.alamat
            let jns_kelamin = users.jns_kelamin
            let username = users.username
            // let password = users.password
            // let password_confirmation = users.password

            axios.put(`http://localhost:8000/api/users/${route.params.id}`, {
                nip: nip,
                name: name,
                kategori: kategori,
                alamat: alamat,
                jns_kelamin: jns_kelamin,
                username: username
                // email: email,
                // password: password,
                // password_confirmation: password_confirmation
            })
            .then(response => {
                console.log(response.data.data);

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
            users,
            validation,
            update,
            logout
        }
    }
}
</script>