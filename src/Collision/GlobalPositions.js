export default class GlobalPositions {
    constructor(obj, imgr) {
        this.gp = obj.localToGlobal(0 - imgr.regX, 0 - imgr.regY)
        this.gp2 = obj.localToGlobal(
            imgr.width - imgr.regX,
            imgr.height - imgr.regY
        )
        this.gp3 = obj.localToGlobal(imgr.width - imgr.regX, 0 - imgr.regY)
        this.gp4 = obj.localToGlobal(0 - imgr.regX, imgr.height - imgr.regY)
    }

    getMinX() {
        return Math.min(this.gp.x, this.gp2.x, this.gp3.x, this.gp4.x)
    }

    getMaxX() {
        return Math.max(this.gp.x, this.gp2.x, this.gp3.x, this.gp4.x)
    }

    getMinY() {
        return Math.min(this.gp.y, this.gp2.y, this.gp3.y, this.gp4.y)
    }

    getMaxY() {
        return Math.max(this.gp.y, this.gp2.y, this.gp3.y, this.gp4.y)
    }
}
