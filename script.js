const app = new Vue({
    el: '#app',
    methods: {
        addClub: function (id) {
            const selectedLesson = this.lessons.find((lesson) => lesson.id === id)
            selectedLesson.spaces--

            const cartItem = this.carts.find((cart) => cart.id === id)
            if (cartItem) {
                cartItem.count++
                cartItem.spaces--
            }
            else {
                const addedLesson = this.lessons.find((lesson) => lesson.id === id)
                this.carts.push({ ...addedLesson, count: 1 })
            }
        },
        canAddToCart: function (id) {
            const selectedLesson = this.lessons.find((lesson) => lesson.id === id)
            if (selectedLesson) {
                return selectedLesson.spaces > 0
            } else return false
        },
        changePage: function () {
            this.currentPage = this.currentPage === "activities" ? "cart" : "activities"
        },
        removeFromCart: function (id) {
            const cartItem = this.carts.find((cart) => cart.id === id)
            if (cartItem.count > 1) {
                cartItem.count--
            }
            else {
                this.carts = this.carts.filter((cart) => cart.id !== id)
            }
            const removedLesson = this.lessons.find((lesson) => lesson.id === id)
            removedLesson.spaces++
            if (this.carts.length === 0) {
                this.currentPage = "activities"
            }
        },
        search: async function () {
            try {
                if (this.searchQuery === "") {
                    const res = await fetch(`${this.baseUrl}/api/lessons?sortCategory=${this.selectedSortCategory}&sortOrder=${this.sortOrder}`)
                    this.lessons = await res.json()
                }
                else {
                    const res = await fetch(this.baseUrl + "/api/lessons/search/" + this.searchQuery + "?sortCategory=subject&sortOrder=ascending")
                    this.lessons = await res.json()
                }
            } catch (err) {
                console.log(err)
            }
        },

        sortItems: async function () {
            try {
                if (this.searchQuery === "") {
                    const res = await fetch(`${this.baseUrl}/api/lessons?sortCategory=${this.selectedSortCategory}&sortOrder=${this.sortOrder}`)
                    this.lessons = await res.json()
                } else {
                    const res = await fetch(`${this.baseUrl}/api/lessons/search/${this.searchQuery}?sortCategory=${this.selectedSortCategory}&sortOrder=${this.sortOrder}`)
                    this.lessons = await res.json()
                }
            } catch (err) {
                console.log(err)
            }
        },

        editLesson: function () {
            try {
                this.carts.forEach(async (lesson) => {
                    await fetch(this.baseUrl + "/api/lessons/" + lesson._id, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(lesson)
                    })
                })
            }
            catch (err) {
                console.log(err)
            }
        },

        handleSubmit: async function (e) {
            data = { name: this.name, phone: this.phone, lessons: this.carts }
            e.preventDefault()
            this.editLesson()
            try {
                const res = await fetch(this.baseUrl + "/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                this.editLesson()
                if (res.status === 201) {
                    this.name = null
                    this.phone = null
                    this.carts = []
                    this.currentPage = "activities"
                }
            } catch (err) {
                console.log(err)
            }
        },

    },
    computed: {
        cartItemCount: function () {
            if (!this.carts) return 0
            let count = 0
            this.carts.forEach(cart => {
                count += cart.count
            })
            return count
        },


        nameValidate: function () {
            this.errorMessage.name = ""
            if (this.name) {
                const regex = new RegExp("^[a-zA-Z ]*$")
                if (regex.test(this.name)) {
                    this.errorMessage.name = ""
                    return true
                }
                else {
                    this.errorMessage.name = "Please enter valid name"
                    return false
                }
            }

            return 0
        },

        phoneValidate: function () {
            this.errorMessage.phone = ""
            if (this.phone) {
                const regex = new RegExp("^[0-9]*$")
                if (regex.test(this.phone)) {
                    this.errorMessage.phone = ""
                    return true
                }
                else {
                    this.errorMessage.phone = "Please enter valid phone number"
                    return false
                }
            }
            return 0
        },


    },
    data: {
        baseUrl: "https://after-school-app-env.eba-z8iud9j4.eu-west-2.elasticbeanstalk.com",
        sitename: "After School Club",
        lessons: [],
        carts: [],
        searchQuery: "",
        sortItem: [],
        selectedSortCategory: "subject",
        sortOrder: "ascending",
        currentPage: "activities",
        name: null,
        phone: null,
        canSubmit: false,
        errorMessage: { name: "", phone: "" }
    },
    created: async function () {
        const res = await fetch(`${this.baseUrl}/api/lessons?sortCategory=${this.selectedSortCategory}&sortOrder=${this.sortOrder}`)
        const data = await res.json()
        this.lessons = data
    }
});


