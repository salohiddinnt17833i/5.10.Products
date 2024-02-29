import { createRow, valedate } from "./function.js";
const tbody = document.querySelector("#tbody");
const form = document.getElementById('form');
const name = document.getElementById('name');
const status = document.getElementById('status');
const description = document.getElementById('description');
const price = document.getElementById('price');
const btn = document.getElementById('btn');
const title__btn = document.getElementById('title__btn');
const close_form = document.getElementById('close');
let u = true;


title__btn && title__btn.addEventListener('click', function () {
    if (u) {
        form.style.display = 'block';
        u = false
    } else {
        form.style.display = 'none';
        u = true;
    }
    close_form && close_form.addEventListener('click', function (e) {
        e.preventDefault();
        form.style.display = 'none'
    })
})

btn && btn.addEventListener('click', function (e) {
    e.preventDefault();

    const isValid = valedate(name, price, description, status);
    if (isValid) {
        btn.setAttribute('disabled', true);
        btn.innerHTML = "Yuborilmoqda..."
        const phone = {
            name: name.value,
            status: status.value,
            description: description.value,
            price: price.value,
            categoriy_id: 2,
        }

        fetch("https://auth-rg69.onrender.com/api/products", {
            method: "POST",
            headers: {
                "Content-type": 'aplication/json'
            },
            body: JSON.stringify(phone)
        })
            .then(res => res.json())
            .then(data => {
                btn.removeAttribute('disabled')
                btn.innerHTML = "Saqlash"

                if (data.id) {
                    let row = createRow(data, tbody.childElementCount);
                    tbody.innerHTML += row
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

})



document.addEventListener('DOMContentLoaded', function () {
    fetch("https://auth-rg69.onrender.com/api/products/all", {
        method: "GET"
    })
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
        })
        .then(data => {
            if (data.length) {
                data.forEach((phone, index) => {
                    let row = createRow(phone, index);
                    tbody.innerHTML += row;
                });
                const deleteButton = document.querySelectorAll('i.fa-trash-can');
                if (deleteButton.length){
                    deleteButton.forEach(del => {
                        del.addEventListener('click', function () {
                            let isDelete = confirm('Shu malumotni ochirmoqchimisiz')
                            if (isDelete) {
                                let id = this.parentNode.getAttribute('data-id')
                                if (id) {
                                    fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
                                        method: "DELETE",
                                    })
                                        .then(res => {
                                            return res.json()
                                        })
                                        .then(data => {
                                            if (data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
                                                window.location.reload();
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                }
                            }
                        })
                    })
                }
            }
        })
        .catch(err => {
            console.log(err);
        })
})


export { createRow, valedate }