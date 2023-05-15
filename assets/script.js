let clicks = parseInt(localStorage.getItem('clicks')) || 0
var buttons = []
var costValues = []
let cost = 0
let canBeBought = false
let currentID
let multiClick = parseInt(localStorage.getItem('multiClick')) || 0
let oldClicks = 0
let perSec = parseInt(localStorage.getItem('perSec')) || 0
let realClicks = 0

let prices = {
    multiClick: 50,
    perSec: 20
}


$(document).ready(() => {
    console.log("script.js loaded")
    $("#multiClick").data('cost', prices.multiClick)
    $("#perSec").data('cost', prices.perSec)
    if (multiClick != 0) {
        cost = 0
        $('h3').text(`1 klik = +${multiClick+1}$`)
        for(let i=0; i <= multiClick; i++) {
            cost = 50*multiClick
            cost += prices.multiClick
            $(`#multiClick`).data('cost', cost)
        }
    }
    
    if (perSec != 0) {
        cost = 0
        for(let i=0; i <= perSec; i++) {
            cost = 70*perSec
            cost += prices.perSec
            $(`#perSec`).data('cost', cost)
        }
    }
    
    update()
})

$(function(){
    setInterval(newCheck2, 62);
    setInterval(perSecLoop, 1000);
});

function klik(){
    realClicks++
    clicks++
    clicks += multiClick
    update()
}

function buy(ele){

    canBeBought = $(`#${ele.id}`).data('can')
    if (canBeBought == true) {



        cost = $(`#${ele.id}`).data('cost')
        clicks -= cost
        if (ele.id == "multiClick") {
            cost += 50
            eval(`${ele.id}++`)
            $('h3').text(`1 klik = +${eval(ele.id)+1}$`)
        } else if (ele.id == "perSec") {
            eval(`${ele.id}++`)
            cost += 70
        }
        localStorage.setItem(`${ele.id}`, eval(`${ele.id}`))
        $(`#${ele.id}`).data('cost', cost)
        update()
    }
}

function update(){
    localStorage.setItem('clicks', clicks)
    $("#pocet").text(`${clicks}$`)
    buttons = document.getElementsByClassName("shopB");
    for (let i = 0; i < buttons.length; i++) {
        currentID = buttons[i].getAttribute("id")
        canBeBought = $(`#${currentID}`).data('can')
        cost = $(`#${currentID}`).data('cost')
        if (canBeBought == false) {
            if (cost <= clicks) {
                $(`#${currentID}`).data('can', true)
                $(`#${currentID}`).css("color", "green")
            }
        } else {
            if (cost > clicks) {
                $(`#${currentID}`).data('can', false)
                $(`#${currentID}`).css("color", "red")
            }
        }

        if ($(`#${currentID}`).data('cost') != $(`#${currentID}`).text()) {
            $(`#${currentID}`).text($(`#${currentID}`).data('cost'))
        }
      }
}
let differment

function perSecLoop(){
    if (perSec > 0) {
        clicks += perSec
        $("#pocet").text(`${clicks}$`)
        update()
    }
}

function newCheck2() {
    differment = realClicks-oldClicks
    if (differment > 2) {
        clicks-=differment
        alert("Stop using autoclicker")
        update()
    }
    oldClicks = realClicks
}