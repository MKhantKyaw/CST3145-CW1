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
            if (cartItem) {
                this.carts = this.carts.filter((cart) => cart.id !== id)
            }
            const removedLesson = this.lessons.find((lesson) => lesson.id === id)
            removedLesson.spaces += cartItem.count
        },
        handleSubmit: function (e) {
            this.errorMessage.name = ""
            this.errorMessage.phone = ""
            if (this.name && this.phone) {
                const regex = new RegExp("^[0-9]*$")
                if (regex.test(this.phone)) {
                    alert("Dear " + this.name + "\nYour order has been submitted.")
                    window.location('/')
                    return true
                }
                else {
                    e.preventDefault();
                    this.errorMessage.phone = "Please enter valid phone number"
                }
            }
            else if (!this.name) {
                e.preventDefault()
                this.errorMessage.name = "Please enter your name"
            }
            else if (!this.phone) {
                e.preventDefault()
                this.errorMessage.phone = "Please enter your phone number"
            }
            return false
        }

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
        errorMessage: { name: "", phone: "" }
    }
});


