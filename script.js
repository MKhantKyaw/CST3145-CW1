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
            if(cartItem) {
                this.carts = this.carts.filter((cart) => cart.id !== id)
            }
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
        lessons: [{
            id: 0,
            subject: "Math",
            location: "London",
            price: 100,
            spaces: 5,
            image: "images/math.png",
        },
        {
            id: 1,
            subject: "English",
            location: "Birmingham",
            price: 1000,
            spaces: 15,
            image: "images/math.png",
        },
        {
            id: 2,
            subject: "Science",
            location: "Birmingham",
            price: 10,
            spaces: 22,
            image: "images/math.png",
        },
        {
            id: 3,
            subject: "Biology",
            location: "Manchester",
            price: 20,
            spaces: 3,
            image: "images/math.png",
        },
        {
            id: 4,
            subject: "Sports",
            location: "Liverpool",
            price: 110,
            image: "images/math.png",
            spaces: 9,
        },
        ],
        carts: [],
        searchQuery: "",
        selectedSortCategory: "subject",
        sortOrder: "ascending",
        currentPage: "activities",
    }
});


