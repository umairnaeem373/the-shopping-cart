let main = document.getElementById('main')
    let cart = document.querySelector('aside')
    let cart_total = document.querySelector('header p')
    let cart_p = document.querySelector('header h3')
    let items_total = 0
    let cart_count = 0
    let cart_arr = []
    let url = 'https://fakestoreapi.com/products'
    fetch(url).then((res) => res.json()).then((data) => {
        localStorage.setItem('items', JSON.stringify(data))
        let items = JSON.parse(localStorage.getItem('items'))
        items.map((ele, i) => {
            main.innerHTML += `<div class="card">
            <img src="${ele.image} ">
            <h4>${ele.title}</h4>
            <p><i class="fa-solid fa-star"></i> ${ele.rating.rate} | <i class="fa-solid fa-circle-check"></i> ${ele.rating.count}<p>
            <h3>$${ele.price}</h3>
            <button onclick="add(${i})">Add to cart</button>
            </div>`
        });
    })
    let disp = () => {
        cart.innerHTML = ''
        cart_arr.map((ele, i) => {
            cart.innerHTML +=
                `<div>
                <img src="${ele.img}">
                <h4>${ele.name}</h4>
                <button onclick="dec(${i})" > - </button>
                <p>${ele.count}<p>
                <button onclick="inc(${i})" > + </button>
                <h3>$${ele.price * ele.count}</h3>
                 </div>`
        })
        cart_total.innerHTML = `Items: ${cart_count}`
        cart_p.innerHTML = `Total:$ ${items_total}`
    }

    let add = (i) => {
        let items = JSON.parse(localStorage.getItem('items'))
        let cart_obj = {
            id: items[i].id,
            img: items[i].image,
            name: items[i].title,
            price: parseInt(items[i].price),
            count: 0
        }


        let target = cart_arr.find((e) => e.id == items[i].id)
        if (target) {
            target.count++
            cart_count++
            items_total += target.price
        }
        else {
            cart_arr.push(cart_obj)
            cart_obj.count++
            cart_count++
            items_total += cart_obj.price
        }
        disp()

    }
    let showcart = () => 
        cart.classList.toggle('showcart')

    let dec = (i) => {
        if (cart_arr[i].count == 1) {
            items_total -= cart_arr[i].price
            cart_count--
            cart_arr.splice(i, 1)
        }
        else {
            items_total -= cart_arr[i].price
            cart_count--
            cart_arr[i].count--
        }
        disp()
    }
    let inc = (i) => {
        cart_arr[i].count++
        cart_count++
        items_total += cart_arr[i].price
        disp()
    }