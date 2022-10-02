<template>
    <h1>Edit HP</h1>
    <hr>
    <div>
        <nav>
            <div>
                <a href="/">Beranda</a>
            </div>
            <div>
                <a href="/hp">Data Handphone</a>
            </div>
            <div>
                <a href="/review">Review</a>
            </div>
        </nav>
    </div>

    <br/>
    <a href="/hp">Data HP</a>
    <form @submit.prevent="update">
        <div>
            <label for="merk">Merk</label>
            <!-- <select v-model="hp.merk">
                <option selected disabled>Merk HP</option>
                <option value="Samsung">Samsung</option>
                <option value="Oppo">Oppo</option>
                <option value="Realme">Realme</option>
            </select> -->
            <input type="text" v-model="hp.merk" placeholder="Merk HP">

            <div v-if="validation.merk" class="mt-2 alert alert-danger">
                {{ validation.merk[0] }}
            </div>
        </div>

        <div>
            <label for="model">Model</label>
            <input type="text" v-model="hp.model" placeholder="Model HP">

            <div v-if="validation.model" class="mt-2 alert alert-danger">
                {{ validation.model[0] }}
            </div>
        </div>

        <div>
            <button type="submit" class="btn btn-primary">Edit</button>
        </div>
    </form>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const hp = reactive({
            merk: '',
            model: ''
        })

        const validation = ref([])
        const router = useRouter()
        const route = useRoute()

        onMounted(() => {
            axios.get(`http://localhost:8000/api/hp/${route.params.id}`)
            .then(response => {
                hp.merk = response.data.data.merk
                hp.model = response.data.data.model
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function update() {
            let merk = hp.merk
            let model = hp.model

            axios.put(`http://localhost:8000/api/hp/${route.params.id}`, {
                merk: merk,
                model: model
            }).then(() => {
                router.push({
                    name: 'hp.index'
                })
            }).catch(error => {
                validation.value = error.response.data
            })
        }

        return {
            hp,
            validation,
            router,
            update
        }
    }
}
</script>