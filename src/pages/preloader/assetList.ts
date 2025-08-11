const isOpera = /Opera|OPR/.test(navigator.userAgent);

interface assetType {
    images: string[],
    videos: string[]
}

const assetList:assetType = {
    images: [
        // './images/about/concert-bg.png',
        './images/about/drums.png',
        './images/home/home-bg-overlay.png',
        './images/home/home-bg-overlay-mobile.png',
        './images/home/register-shape-fill.png',
        './images/home/register-shape-stroke.png',
        './images/register/bg-dust.png',
        // './images/register/lightening - Copy.png',
        './images/register/lightening.png',
        './images/register/red-angle.png',
        './images/rules/band-members.png',
        './images/rules/rules-bg.png',
        './images/timeline/smoke-bg.png',
        './images/winners/guitarist-2.png',
        './images/winners/guitarist.png',
        './images/winners/indian-ocean.png',
        './images/winners/parikrama.png',
        './images/winners/prestorika.png',
        './images/winners/them-clones.png',
        // './images/winners/visualizer.png',
    ],
    videos: [
        // "./videos/ROCTAVES_BG_VIDEO.mp4"
    ]
}

if (isOpera) assetList.images.push("./images/thumb.png")
else assetList.videos.push("./videos/ROCTAVES_BG_VIDEO.mp4");

export default assetList;