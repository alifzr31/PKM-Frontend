import { createRouter, createWebHistory } from 'vue-router'
// import Beranda from '@/views/Index.vue'

// Auth
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

// Dosen
//Proposal
import Dashboard from '@/views/dashboard/Index.vue'
import CreateProposal from '@/views/dashboard/CreateProposal.vue'
import EditProposal from '@/views/dashboard/EditProposal.vue'
import DetailProposal from '@/views/dashboard/DetailProposal.vue'

//Laporan Kemajuan
import DataLapkem from '@/views/dashboard/IndexLapkem.vue'
import CreateLapkem from '@/views/dashboard/CreateLapkem.vue'
import DetailLapkem from '@/views/dashboard/DetailLapkem.vue'
import EditLapkem from '@/views/dashboard/EditLapkem.vue'

//Laporan Akhir
import IndexLapakhir from '@/views/dashboard/IndexLapakhir.vue'
import CreateLapakhir from '@/views/dashboard/CreateLapakhir.vue'
import DetailLapakhir from '@/views/dashboard/DetailLapakhir.vue'
import EditLapakhir from '@/views/dashboard/EditLapakhir.vue'

// Luaran
import IndexLuaran from '@/views/dashboard/IndexLuaran.vue'
import CreateLuaran from '@/views/dashboard/CreateLuaran.vue'
import DetailLuaran from '@/views/dashboard/DetailLuaran.vue'
import EditLuaran from '@/views/dashboard/EditLuaran.vue'

// Review
import IndexReview from '@/views/dashboard/IndexReview.vue'
import DetailReview from '@/views/dashboard/DetailReview.vue'

// Admin
import AdminIndex from '@/views/admin/Index.vue'
import AdminDetailProposal from '@/views/admin/proposal/DetailProposal.vue'
import AdminEditProposal from '@/views/admin/proposal/EditProposal.vue'

import AdminReview from '@/views/admin/review/Index.vue'
import AdminDetailReview from '@/views/admin/review/DetailReview.vue'
import AdminHasilReview from '@/views/admin/review/HasilReview.vue'
import AdminEditReview from '@/views/admin/review/EditReview.vue'

import AdminLaporan from '@/views/admin/laporan/Index.vue'
import AdminDetailLapkem from '@/views/admin/laporan/DetailLapkem.vue'
import AdminDetailLapakhir from '@/views/admin/laporan/DetailLapakhir.vue'

import AdminUser from '@/views/admin/user/Index.vue'
import AdminDetailUser from '@/views/admin/user/DetailUser.vue'
import AdminEditUser from '@/views/admin/user/EditUser.vue'
import AdminCreateUser from '@/views/admin/user/CreateUser.vue'

import AdminUsers from '@/views/admin/Users.vue'
import AdminTambahUsers from '@/views/admin/TambahUsers.vue'
import AdminProfil from '@/views/admin/Profil.vue'

import AdminLuaran from '@/views/admin/luaran/Index.vue'
import AdminDetailLuaran from '@/views/admin/luaran/DetailLuaran.vue'

// Wadir
import WadirIndex from '@/views/wadir/Index.vue'

// Reviewer
import ReviewerIndex from '@/views/reviewer/Index.vue'
import CreateHasil from '@/views/reviewer/CreateHasil.vue'

// All User ex. Admin
import ProfilUser from '@/views/profil_user/Profil.vue'
import ProfilEdit from '@/views/profil_user/EditProfil.vue'

const routes = [
    // {
    //     path: '/',
    //     name: 'beranda',
    //     component: Beranda
    // },

    // Auth
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },

    // All User ex. Admin
    {
        path: '/profil/:id',
        name: 'profil.user',
        component: ProfilUser
    },
    {
        path: '/edit_profil/:id',
        name: 'profil.useredit',
        component: ProfilEdit
    },

    // Dosen
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/dashboard/pengajuan_proposal',
        name: 'proposal.create',
        component: CreateProposal
    },
    {
        path: '/dashboard/edit_proposal/:id',
        name: 'proposal.edit',
        component: EditProposal
    },
    {
        path: '/dashboard/detail_proposal/:id',
        name: 'proposal.detail',
        component: DetailProposal
    },
    {
        path: '/dashboard/laporan_kemajuan',
        name: 'lapkem.index',
        component: DataLapkem
    },
    {
        path: '/dashboard/input_laporan_kemajuan',
        name: 'lapkem.create',
        component: CreateLapkem
    },
    {
        path: '/dashboard/detail_laporan_kemajuan/:id',
        name: 'lapkem.detail',
        component: DetailLapkem
    },
    {
        path: '/dashboard/edit_laporan_kemajuan/:id',
        name: 'lapkem.edit',
        component: EditLapkem
    },
    {
        path: '/dashboard/laporan_akhir',
        name:'lapakhir.index',
        component: IndexLapakhir
    },
    {
        path: '/dashboard/input_laporan_akhir',
        name: 'lapakhir.create',
        component: CreateLapakhir
    },
    {
        path: '/dashboard/detail_laporan_akhir/:id',
        name: 'lapakhir.detail',
        component: DetailLapakhir
    },
    {
        path: '/dashboard/edit_laporan_akhir/:id',
        name: 'lapakhir.edit',
        component: EditLapakhir
    },
    {
        path: '/dashboard/luaran',
        name: 'luaran.index',
        component: IndexLuaran
    },
    {
        path: '/dashboard/input_luaran',
        name: 'luaran.create',
        component: CreateLuaran
    },
    {
        path: '/dashboard/detail_luaran/:id',
        name: 'luaran.detail',
        component: DetailLuaran
    },
    {
        path: '/dashboard/edit_luaran/:id',
        name: 'luaran.edit',
        component: EditLuaran
    },
    {
        path: '/dashboard/review',
        name: 'review.index',
        component: IndexReview
    },
    {
        path: '/dashboard/detail_review/:id',
        name: 'review.detail',
        component: DetailReview
    },
    
    // Admin
    {
        path: '/admin',
        name: 'admin.index',
        component: AdminIndex
    },
    {
        path: '/admin/detail_proposal/:id',
        name: 'admin.proposal_detail',
        component: AdminDetailProposal
    },
    {
        path: '/admin/edit_proposal/:id',
        name: 'admin.edit_proposal',
        component: AdminEditProposal
    },
    {
        path: '/admin/review',
        name: 'admin.review',
        component: AdminReview
    },
    {
        path: '/admin/detail_review/:id',
        name: 'admin.detail_review',
        component: AdminDetailReview
    },
    {
        path: '/admin/detail_hasil_review/:id',
        name: 'admin.hasil_review',
        component: AdminHasilReview
    },
    {
        path: '/admin/edit_review/:id',
        name: 'admin.edit_review',
        component: AdminEditReview
    },
    {
        path: '/admin/laporan',
        name: 'admin.laporan',
        component: AdminLaporan
    },
    {
        path: '/admin/detail_lapkem/:id',
        name: 'admin.detail_lapkem',
        component: AdminDetailLapkem

    },
    {
        path: '/admin/detail_lapakhir/:id',
        name: 'admin.detail_lapakhir',
        component: AdminDetailLapakhir
    },
    {
        path: '/admin/user',
        name: 'admin.user',
        component: AdminUser
    },
    {
        path: '/admin/detail_user/:id',
        name: 'admin.detail_user',
        component: AdminDetailUser
    },
    {
        path: '/admin/edit_user/:id',
        name: 'admin.edit_user',
        component: AdminEditUser
    },
    {
        path: '/admin/user/tambah_user',
        name: 'admin.tambah_user',
        component: AdminCreateUser
    },
    {
        path: '/admin/luaran',
        name: 'admin.luaran',
        component: AdminLuaran
    },
    {
        path: '/admin/detail_luaran/:id',
        name: 'admin.detail_luaran',
        component: AdminDetailLuaran
    },
    {
        path: '/admin/users',
        name: 'admin.users',
        component: AdminUsers
    },
    {
        path: '/admin/users/tambah',
        name: 'admin.tambahusers',
        component: AdminTambahUsers
    },
    {
        path: '/profil/:id',
        name: 'profil',
        component: AdminProfil
    },

    // Wadir
    {
        path: '/wadir/proposal',
        name: 'wadir.index',
        component: WadirIndex
    },

    // Reviewer
    {
        path: '/reviewer/review',
        name: 'rev.index',
        component: ReviewerIndex
    },
    {
        path: '/reviewer/input_hasil_review/:id',
        name: 'rev.createhasil',
        component: CreateHasil
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router