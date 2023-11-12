const app = new Vue({
    el: '#app',
    methods: {
        addClub: function (id) {
            const cartItem = this.carts.find((cart) => cart.id === id)
            if (cartItem) {
                cartItem.count++
            }
            else {
                const addedLesson = this.lessons.find((lesson) => lesson.id === id)
                this.carts.push({ ...addedLesson, count: 1 })
            }
            const selectedLesson = this.lessons.find((lesson) => lesson.id === id)
            selectedLesson.spaces--
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
            removedLesson.spaces += cartItem.count
            if (this.carts.length === 0) {
                this.currentPage = "activities"
            }
        },

        handleSubmit: function (e) {
            alert("Dear " + this.name + ",\n" + "Your order is received.")
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

        searchItem: function () {
            return this.lessons.filter((lesson) =>
                lesson.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                lesson.location.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        sortItem: function () {
            const sortedItem = [...this.searchItem]
            return sortedItem.sort((a, b) => {
                const sortingOrder = this.sortOrder === 'ascending' ? 1 : -1
                switch (this.selectedSortCategory) {
                    case "subject": return sortingOrder * a.subject.toLowerCase().localeCompare(b.subject.toLowerCase()); break;
                    case "location": return sortingOrder * a.location.toLowerCase().localeCompare(b.location.toLowerCase()); break;
                    case "price": return sortingOrder * (a.price > b.price ? 1 : -1)
                    case "spaces": return sortingOrder * (a.spaces > b.spaces ? 1 : -1)
                }
            })
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
        sitename: "After School Club",
        lessons: lessons,
        carts: [],
        searchQuery: "",
        selectedSortCategory: "subject",
        sortOrder: "ascending",
        currentPage: "activities",
        name: null,
        phone: null,
        canSubmit: false,
        errorMessage: { name: "", phone: "" }
    }
});


