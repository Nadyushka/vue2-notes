import authStore from '@/store/authStore'

export const authGuard = (to) => {
    const isAuthed = authStore.getters['isUserAuth']
    if (!isAuthed && to.name !== 'auth') {
        return { name: 'auth' }
    } else if (isAuthed && to.name === 'auth') {
        return { name: 'employees' }
    }
    return true
}
