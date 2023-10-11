const app = new Vue({
    el: '#app',
    methods: {
        addClub: function (id) {
            this.cart.push(id);
            this.count++;
            this.lessons.filter(function (lesson) {
                if (lesson['id'] == id)
                    return (lesson['stock']--);
            })[0];
            console.log(this.lessons)
        }
    },
    data: {
        sitename: "After School Club",
        count: 0,
        lessons: [{
            id: 1,
            subject: "Math",
            location: "London",
            price: 100,
            spaces: 5,
            image: "images/math.png",
            stock: 5,
        },
        {
            id: 2,
            subject: "Math",
            location: "London",
            price: 100,
            spaces: 5,
            image: "images/math.png",
            stock: 5,
        },
        {
            id: 3,
            subject: "Math",
            location: "Yangon",
            price: 100,
            spaces: 5,
            image: "images/math.png",
            stock: 5,
        },
        {
            id: 4,
            subject: "Math",
            location: "London",
            price: 100,
            spaces: 5,
            image: "images/math.png",
            stock: 5,
        },
        {
            id: 5,
            subject: "Math",
            location: "London",
            price: 100,
            image: "images/math.png",
            stock: 5,
        },
        ],
        cart: []
    }
});