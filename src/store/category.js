import firebase from 'firebase/app'

export default {
    state: {
        category: []
    },
    mutations: {
    },
    actions: {
        async fetchCategories({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
                // const cat = []
                // Object.keys(categories).forEach(key => {
                //     cat.push({
                //         title: categories[key].title,
                //         title: categories[key].limit,
                //         id:key
                //     })
                // })
                // console.log(cat);
                // return cat
                return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
            } catch (er) {
                commit('setError', er)
                throw er
            }
        },
        async fetchCategoryById({ commit, dispatch },id) {
            try {
                const uid = await dispatch('getUid')
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
                console.log(category);
                return { ...category , id }
            } catch (er) {
                commit('setError', er)
                throw er
            }
        },
        async createCategory({ commit, dispatch }, { title, limit }) {
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
                return { title, limit, id: category.key }
            } catch (er) {
                commit('setError', er)
                throw er
            }
        },
        async updateCategory({ commit, dispatch }, { title, limit, id }) {
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
            } catch (er) {
                commit('setError', er)
                throw er
            }
        }
    }
}