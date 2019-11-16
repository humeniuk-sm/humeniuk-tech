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