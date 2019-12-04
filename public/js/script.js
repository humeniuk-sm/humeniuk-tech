$(document).ready(()=>{
    $(".dropdown-trigger").dropdown();
});

function changeTheme(){
    let body = document.getElementsByTagName('body')[0]
    let bodyStyle = body.getAttribute('class')
    if(bodyStyle=='bw')
    {
        body.setAttribute('class','color')
        document.getElementsByClassName('c_soon_bw')[0].setAttribute('class','logo c_soon_color')
        document.getElementsByClassName('logo_bw')[0].setAttribute('class','logo_color')
    }
    else{
        body.setAttribute('class','bw')
        document.getElementsByClassName('c_soon_color')[0].setAttribute('class','logo c_soon_bw')
        document.getElementsByClassName('logo_color')[0].setAttribute('class','logo_bw')
    }
}

const $card = document.querySelector('#card')
if($card){
    $card.addEventListener('click',event=>{
        if(event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id
            fetch('/shop/card/remove/'+id,{
                method:'delete'
            }).then(res=>res.json()).then(card=>{
                console.log(card)
                if(card.cart.items.length){
                    const html = card.cart.items.map(c=>{
                        return `<tr>
                        <td>${c.title}</td>
                        <td>${c.price}</td>
                        <td>${c.count}</td>
                        <td>
                            <button class="btn btn-small js-remove" data-id=${c.id}>Видалити</button>
                        </td>
                    </tr>`
                    }).join()
                    $card.querySelector('tbody').innerHTML = html
                    $card.querySelector('.price').textContent = card.price
                }
                else{
                    $card.innerHTML('<p>Кошик порожній</p>')
                }
            })
        }
    })
}