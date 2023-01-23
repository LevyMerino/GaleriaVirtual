const arrayImg1 = [
    { url: "images/1.jpg", width: 93, height: 125 },
    { url: "images/2.jpg", width: 120, height: 125 },
    { url: "images/3.jpg", width: 125, height: 93 },
    { url: "images/4.jpg", width: 103, height: 125 },
    { url: "images/5.jpg", width: 114, height: 125 }
];

const arrayImg2 = [
    { url: "images/6.jpg", width: 125, height: 93 },
    { url: "images/7.jpg", width: 69, height: 87 },
    { url: "images/8.jpg", width: 96, height: 70 },
    { url: "images/9.jpg", width: 92, height: 93 },
    { url: "images/5.jpg", width: 114, height: 125 }
];

const arrayImg3 = [
    { url: "images/2.jpg", width: 120, height: 125 },
    { url: "images/3.jpg", width: 125, height: 93 },
    { url: "images/4.jpg", width: 103, height: 125 },
    { url: "images/1.jpg", width: 93, height: 125 },
    { url: "images/5.jpg", width: 114, height: 125 }
]
const arrayImg4 = [
    { url: "images/9.jpg", width: 92, height: 93 },
    { url: "images/7.jpg", width: 69, height: 87 },
    { url: "images/6.jpg", width: 125, height: 93 },
    { url: "images/8.jpg", width: 96, height: 70 },
    { url: "images/3.jpg", width: 125, height: 93 }
];

function getImages() {

    if (getImagesbyDate()) {

        if (JSON.parse(localStorage.getItem('gallerySet'))) {
            return arrayImg1;

        } else {
            return arrayImg2;

        }
    } else {
        if (JSON.parse(localStorage.getItem('gallerySet'))) {
            return arrayImg3;

        } else {
            return arrayImg4;

        }
    }
}


function getImagesbyDate() {

    const d = new Date();
    let day = d.getDate();

    if (day < 16) {
        return false;

    } else {
        return true;

    }
}
