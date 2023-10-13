const app = new Vue({
    el: '#app',
    methods: {
        addClub: function (id) {
            const cartItem = this.carts.find((cart) => cart.id === id)
            if (cartItem) {
                cartItem.count++
            }
            else {
                this.carts.push({ id: id, count: 1 })
            }
            const selectedLesson = this.lessons.find((lesson) => lesson.id === id)
            selectedLesson.spaces--
        },
        canAddToCart: function (id) {
            const selectedLesson = this.lessons.find((lesson) => lesson.id === id)
            if (selectedLesson) {
                return selectedLesson.spaces > 0
            } else return false
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
            subject: "Math",
            location: "London",
            price: 100,
            spaces: 5,
            image: "images/math.png",
        },
        {
            id: 2,
            subject: "Math",
            location: "Yangon",
            price: 100,
            spaces: 5,
            image: "images/math.png",        },
        {
            id: 3,
            subject: "Math",
            location: "London",
            price: 100,
            spaces: 5,
            image: "images/math.png",
        },
        {
            id: 4,
            subject: "Math",
            location: "London",
            price: 100,
            image: "images/math.png",
            spaces: 5,
        },
        ],
        carts: []
    }
});