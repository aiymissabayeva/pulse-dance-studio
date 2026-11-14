class DanceClass{
    constructor(id, name, image){
        this.id= id;
        this.name = name;
        this.image = image;
    }

    matchesCategory(category){
        return category === "All" || this.name === category;
    }

    getImageAlt(){
        return this.name + " class";
    }
}

const danceClasses = [
    new DanceClass("hip-hop", "Hip-Hop", "images/hiphop.png"),
    new DanceClass("contemporary", "Contemporary", "images/contemporary.png"),
    new DanceClass("heels", "Heels", "images/highheels.png"),
    new DanceClass("jazz-funk", "Jazz Funk", "images/jazzfunk.png"),
];