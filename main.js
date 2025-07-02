// const endpoint = "http://10.1.5.127" // ubah ip berdasarkan esp8266

const endpoint = "http://172.20.10.4"



//GET
function getTaman1() {
    fetch(endpoint + "/taman1", {
        method: "GET"
    }).then(response => response.text()).then(result => {
        console.log(result)
        if (result == "ON") {
            watertaman1.style.background = "blue"
            waterTamanImage1.src = "./assets/watering-on.png"
        } else {
            watertaman1.style.background = "#579fff"
            waterTamanImage1.src = "./assets/watering-off.png"
        }
    })
}

// function getTaman2() {
//     fetch(endpoint + "/taman2", {
//         method: "GET"
//     }).then(response => response.text()).then(result => {
//         if (result == "ON") {
//             watertaman2.style.background = "blue"
//             waterTamanImage2.src = "./assets/watering-on.png"
//         } else {
//             watertaman2.style.background = "#579fff"
//             waterTamanImage2.src = "./assets/watering-off.png"
//         }
//     })
// }

// function getTaman3() {
//     fetch(endpoint + "/taman3", {
//         method: "GET"
//     }).then(response => response.text()).then(result => {
//         if (result == "ON") {
//             watertaman3.style.background = "blue"
//             waterTamanImage3.src = "./assets/watering-on.png"
//         } else {
//             watertaman3.style.background = "#579fff"
//             waterTamanImage3.src = "./assets/watering-off.png"
//         }
//     })
// }

// function getTaman4() {
//     fetch(endpoint + "/taman4", {
//         method: "GET"
//     }).then(response => response.text()).then(result => {
//         if (result == "ON") {
//             watertaman4.style.background = "#blue"
//             waterTamanImage4.src = "./assets/watering-on.png"
//         } else {
//             watertaman4.style.background = "#579fff"
//             waterTamanImage4.src = "./assets/watering-off.png"
//         }
//     })
// }

//SET
function setTaman1() {
    //pake tanda - idnya
    // const ledD = document.getElementById("led-dapur")
    // ledD.style.backgroundColor = "red"
    //cara cepat, idnya tidak menggunakan tna -
    // ledDapur.style.background = "red"
    // dapurLedImage.src = "./assets/led-on.png"

    //ketika tombol ditekan maka akan mengirimkan data ke esp8266
    fetch(endpoint + "/taman1", {
        method: "POST"
    }).then(response => response.text()).then(() => location.reload())


}

// function setTaman2() {
//     //ketika tombol ditekan maka akan mengirimkan data ke esp8266
//     fetch(endpoint + "/taman2", {
//         method: "POST"
//     }).then(response => response.text()).then(() => location.reload())

// }

// function setTaman3() {
//     //ketika tombol ditekan maka akan mengirimkan data ke esp8266
//     fetch(endpoint + "/taman3", {
//         method: "POST"
//     }).then(response => response.text()).then(() => location.reload())

// }

// function setTaman4() {
//     //ketika tombol ditekan maka akan mengirimkan data ke esp8266
//     fetch(endpoint + "/taman4", {
//         method: "POST"
//     }).then(response => response.text()).then(() => location.reload())

// }

getTaman1();
// getTaman2();
// getTaman3();
// getTaman4();
