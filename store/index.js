export const state = () => ({
  notes: []
})

export const getters = {
  notes: state => state.notes,
  favs: state => state.notes.filter(el => el.liked),
}

export const mutations = {
  setNotes(state, notes) {
    state.notes = notes
  }
}

export const actions = {
  async fetchNotes({ commit }) {
    const notes = await this.$axios.$get('http://localhost:4000/notes')
    commit('setNotes', notes)
  }
}
