function main() {
    var images = [
        ["image\\Room\\n001.png", "image\\Room\\n002.jpg"],
        ["image\\Room\\t001.jpg", "image\\Room\\t002.jpg", "image\\Room\\t003.jpg", "image\\Room\\t004.jpg"],
        ["image\\Room\\vip001.jpg", "image\\Room\\vip002.jpg", "image\\Room\\vip003.jpg"]
    ];
    var nol = document.getElementById('normalUnit');
    var twn = document.getElementById("twinUnit");
    var vip = document.getElementById("vipUnit");
    var imageIndex = 0;
    var timer = setInterval(changeImage, 2000);

    document.getElementById("normalUnit").addEventListener("click", () => { changeImage(0) });
    document.getElementById("twinUnit").addEventListener("click", () => { changeImage(1) });
    document.getElementById("vipUnit").addEventListener("click", () => { changeImage(2) });

    document.getElementById("normalUnitButton").addEventListener("click", () => { setCookie(normalUnit, interested) });
    document.getElementById("normalUnitButton").addEventListener("click", () => { setCookie(twinUnit, interested) });
    document.getElementById("normalUnitButton").addEventListener("click", () => { setCookie(vipUnit, interested) });
}
function changeImage(group) {
    if (imageIndex >= images[group].length - 1) {
        imageIndex = 0;
    }
    else {
        imageIndex++;
    }
    if (group == 0)
        nol.src = images[group][imageIndex];
    else if (group == 1)
        twn.src = images[group][imageIndex];
    else if (group == 2)
        vip.src = images[group][imageIndex];
}

function setCookie(type, value) {
    document.cookie = value + " on " + type;
}