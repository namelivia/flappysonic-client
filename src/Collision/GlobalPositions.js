export default class GlobalPositions {
    constructor(obj, imgr) {
        var gp = obj.localToGlobal(0 - imgr.regX, 0 - imgr.regY)
        var gp2 = obj.localToGlobal(
            imgr.width - imgr.regX,
            imgr.height - imgr.regY
        )
        var gp3 = obj.localToGlobal(imgr.width - imgr.regX, 0 - imgr.regY)
        var gp4 = obj.localToGlobal(0 - imgr.regX, imgr.height - imgr.regY)
        var xCoordinates = [gp.x, gp2.x, gp3.x, gp4.x]
        var yCoordinates = [gp.y, gp2.y, gp3.y, gp4.y]

        this.minX = Math.min(...xCoordinates)
        this.minY = Math.min(...yCoordinates)
        this.maxX = Math.max(...xCoordinates)
        this.maxY = Math.max(...yCoordinates)
    }
}
