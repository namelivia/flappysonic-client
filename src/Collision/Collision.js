import { Bitmap, Sprite, SpriteSheetUtils, Container } from 'createjs'
export default class Collision {
    constructor() {
        this.collisionCanvas = document.createElement('canvas')
        this.collisionCtx = this.collisionCanvas.getContext('2d')
        this.collisionCtx.save()

        this.collisionCanvas2 = document.createElement('canvas')
        this.collisionCtx2 = this.collisionCanvas2.getContext('2d')
        this.collisionCtx2.save()

        this.cachedBAFrames = []
    }

    checkRectCollision(bitmap1, bitmap2) {
        var b1, b2
        b1 = this.getBounds(bitmap1)
        b2 = this.getBounds(bitmap2)
        return this.calculateIntersection(b1, b2)
    }

    checkPixelCollision(bitmap1, bitmap2) {
        var imageData1, imageData2, pixelIntersection

        var intersection = this.checkRectCollision(bitmap1, bitmap2)
        if (!intersection) {
            return false
        }

        //setting the canvas size
        this.collisionCanvas.width = intersection.width
        this.collisionCanvas.height = intersection.height
        this.collisionCanvas2.width = intersection.width
        this.collisionCanvas2.height = intersection.height

        imageData1 = this._intersectingImagePart(
            intersection,
            bitmap1,
            this.collisionCtx,
            1
        )
        imageData2 = this._intersectingImagePart(
            intersection,
            bitmap2,
            this.collisionCtx2,
            2
        )

        //compare the alpha values to the threshold and return the result
        // = true if pixels are both > 0 at one coordinate
        pixelIntersection = this._compareAlphaValues(
            imageData1,
            imageData2,
            intersection.width,
            intersection.height
        )

        if (pixelIntersection) {
            pixelIntersection.x += intersection.x
            pixelIntersection.x2 += intersection.x
            pixelIntersection.y += intersection.y
            pixelIntersection.y2 += intersection.y
        } else {
            return false
        }

        return pixelIntersection
    }

    _intersectingImagePart(intersetion, bitmap, ctx, i) {
        var bl, image, frameName, sr

        if (bitmap instanceof Bitmap) {
            image = bitmap.image
        } else if (bitmap instanceof Sprite) {
            var frame = bitmap.spriteSheet.getFrame(bitmap.currentFrame)
            frameName =
                frame.image.src +
                ':' +
                frame.rect.x +
                ':' +
                frame.rect.y +
                ':' +
                frame.rect.width +
                ':' +
                frame.rect.height
            if (this.cachedBAFrames[frameName]) {
                image = this.cachedBAFrames[frameName]
            } else {
                this.cachedBAFrames[
                    frameName
                ] = image = SpriteSheetUtils.extractFrame(
                    bitmap.spriteSheet,
                    bitmap.currentFrame
                )
            }
        }

        bl = bitmap.globalToLocal(intersetion.x, intersetion.y)
        ctx.restore()
        ctx.save()
        ctx.rotate(
            this._getParentalCumulatedProperty(bitmap, 'rotation') *
                (Math.PI / 180)
        )
        ctx.scale(
            this._getParentalCumulatedProperty(bitmap, 'scaleX', '*'),
            this._getParentalCumulatedProperty(bitmap, 'scaleY', '*')
        )
        ctx.translate(
            -bl.x - intersetion['rect' + i].regX,
            -bl.y - intersetion['rect' + i].regY
        )
        if ((sr = bitmap.sourceRect) != undefined) {
            ctx.drawImage(
                image,
                sr.x,
                sr.y,
                sr.width,
                sr.height,
                0,
                0,
                sr.width,
                sr.height
            )
        } else {
            ctx.drawImage(image, 0, 0, image.width, image.height)
        }
        return ctx.getImageData(0, 0, intersetion.width, intersetion.height)
            .data
    }

    _compareAlphaValues(imageData1, imageData2, width, height) {
        var alpha1,
            alpha2,
            x,
            y,
            offset = 3,
            pixelRect = {
                x: Infinity,
                y: Infinity,
                x2: -Infinity,
                y2: -Infinity,
            }

        // parsing through the pixels checking for an alpha match
        // TODO: intelligent parsing, not just from 0 to end!
        for (y = 0; y < height; ++y) {
            for (x = 0; x < width; ++x) {
                alpha1 =
                    imageData1.length > offset + 1
                        ? imageData1[offset] / 255
                        : 0
                alpha2 =
                    imageData2.length > offset + 1
                        ? imageData2[offset] / 255
                        : 0

                if (alpha1 > 0 && alpha2 > 0) {
                    return { x: x, y: y, width: 1, height: 1 }
                }
                offset += 4
            }
        }

        if (pixelRect.x != Infinity) {
            pixelRect.width = pixelRect.x2 - pixelRect.x + 1
            pixelRect.height = pixelRect.y2 - pixelRect.y + 1
            return pixelRect
        }

        return null
    }

    // this is needed to paint the intersection part correctly,
    // if the tested bitmap is a child to a rotated/scaled parent
    // this was not painted correctly before
    _getParentalCumulatedProperty(child, propName, operation) {
        operation = operation || '+'
        if (child.parent && child.parent[propName]) {
            var cp = child[propName]
            var pp = this._getParentalCumulatedProperty(
                child.parent,
                propName,
                operation
            )
            if (operation == '*') {
                return cp * pp
            } else {
                return cp + pp
            }
        }

        return child[propName]
    }

    calculateIntersection(rect1, rect2) {
        // first we have to calculate the
        // center of each rectangle and half of
        // width and height
        var dx,
            dy,
            r1 = {},
            r2 = {}
        r1.cx = rect1.x + (r1.hw = rect1.width / 2)
        r1.cy = rect1.y + (r1.hh = rect1.height / 2)
        r2.cx = rect2.x + (r2.hw = rect2.width / 2)
        r2.cy = rect2.y + (r2.hh = rect2.height / 2)

        dx = Math.abs(r1.cx - r2.cx) - (r1.hw + r2.hw)
        dy = Math.abs(r1.cy - r2.cy) - (r1.hh + r2.hh)

        if (dx < 0 && dy < 0) {
            dx = Math.min(Math.min(rect1.width, rect2.width), -dx)
            dy = Math.min(Math.min(rect1.height, rect2.height), -dy)
            return {
                x: Math.max(rect1.x, rect2.x),
                y: Math.max(rect1.y, rect2.y),
                width: dx,
                height: dy,
                rect1: rect1,
                rect2: rect2,
            }
        }
    }

    _getBoundsForChild(bounds, child) {
        var cbounds = this.getBounds(child)
        if (cbounds.x < bounds.x) {
            bounds.x = cbounds.x
        }
        if (cbounds.y < bounds.y) {
            bounds.y = cbounds.y
        }
        if (cbounds.x + cbounds.width > bounds.x2) {
            bounds.x2 = cbounds.x + cbounds.width
        }
        if (cbounds.y + cbounds.height > bounds.y2) {
            bounds.y2 = cbounds.y + cbounds.height
        }
        return bounds
    }

    _replaceInfinityWithZero(bound) {
        if (bound == Infinity) {
            return 0
        }
        return bound
    }

    _replaceInfinitiesWithZeroes(bounds) {
        bounds.x = this._replaceInfinityWithZero(bounds.x)
        bounds.y = this._replaceInfinityWithZero(bounds.y)
        bounds.x2 = this._replaceInfinityWithZero(bounds.x2)
        bounds.y2 = this._replaceInfinityWithZero(bounds.y2)
        return bounds
    }

    _getBoundsForContainer(bounds, obj) {
        bounds.x2 = -Infinity
        bounds.y2 = -Infinity
        var children = obj.children,
            childrenCount = children.length,
            index
        for (index = 0; index < childrenCount; index++) {
            bounds = this._getBoundsForChild(bounds, children[index])
        }
            
        bounds = this._replaceInfinitiesWithZeroes(bounds)

        bounds.width = bounds.x2 - bounds.x
        bounds.height = bounds.y2 - bounds.y
        delete bounds.x2
        delete bounds.y2
        return bounds
    }

    _getBoundsX(globalPositions) {
        var { gp, gp2, gp3, gp4 } = globalPositions
        return Math.min(Math.min(Math.min(gp.x, gp2.x), gp3.x), gp4.x)
    }

    _getBoundsY(globalPositions) {
        var { gp, gp2, gp3, gp4 } = globalPositions
        return Math.min(Math.min(Math.min(gp.y, gp2.y), gp3.y), gp4.y)
    }

    _getBoundsWidth(globalPositions, boundsX) {
        var { gp, gp2, gp3, gp4 } = globalPositions
        return Math.max(Math.max(Math.max(gp.x, gp2.x), gp3.x), gp4.x) - boundsX
    }

    _getBoundsHeight(globalPositions, boundsY) {
        var { gp, gp2, gp3, gp4 } = globalPositions
        return Math.max(Math.max(Math.max(gp.y, gp2.y), gp3.y), gp4.y) - boundsY
    }

    _getImgrForBitmap(obj) {
        var imgr = {}
        var sr = obj.sourceRect || obj.image
        imgr.width = sr.width
        imgr.height = sr.height
        return imgr
    }

    _getImgrForSprite(obj) {
        var imgr = {}
        var cframe = obj.spriteSheet.getFrame(obj.currentFrame)
        imgr.width = cframe.rect.width
        imgr.height = cframe.rect.height
        imgr.regX = cframe.regX
        imgr.regY = cframe.regY
        return imgr
    }

    _setBoundsToObj(obj, bounds) {
        bounds.x = obj.x || 0
        bounds.y = obj.y || 0
        return bounds
    }

    _defaultImgrToZero(imgr) {
        imgr.regX = imgr.regX || 0
        imgr.width = imgr.width || 0
        imgr.regY = imgr.regY || 0
        imgr.height = imgr.height || 0
        return imgr
    }

    _getGlobalPositions(obj, imgr) {
        return {
            gp: obj.localToGlobal(0 - imgr.regX, 0 - imgr.regY),
            gp2: obj.localToGlobal(
                imgr.width - imgr.regX,
                imgr.height - imgr.regY
            ),
            gp3: obj.localToGlobal(imgr.width - imgr.regX, 0 - imgr.regY),
            gp4: obj.localToGlobal(0 - imgr.regX, imgr.height - imgr.regY),
        }
    }

    _spriteFrameHasImage(obj) {
        return (
            obj.spriteSheet._frames &&
            obj.spriteSheet._frames[obj.currentFrame] &&
            obj.spriteSheet._frames[obj.currentFrame].image
        )
    }

    _getImgr(bounds, obj) {
        if (obj instanceof Bitmap) {
            return this._getBoundsForBitmap(obj)
        }
        if (obj instanceof Sprite && this._spriteFrameHasImage(obj)) {
            return this._getImgrForSprite(obj)
        }
        return this._setBoundsToObj(obj, bounds)
    }

    _getBoundsForNonContainer(bounds, obj) {
        var imgr = this._defaultImgrToZero(this._getImgr(bounds, obj))

        bounds.regX = imgr.regX
        bounds.regY = imgr.regY

        var globalPositions = this._getGlobalPositions(obj, imgr)

        bounds.x = this._getBoundsX(globalPositions)
        bounds.y = this._getBoundsY(globalPositions)
        bounds.width = this._getBoundsWidth(globalPositions, bounds.x)
        bounds.height = this._getBoundsHeight(globalPositions, bounds.y)
        return bounds
    }

    getBounds(obj) {
        var bounds = { x: Infinity, y: Infinity, width: 0, height: 0 }
        if (obj instanceof Container) {
            return this._getBoundsForContainer(bounds, obj)
        }
        return this._getBoundsForNonContainer(bounds, obj)
    }
}
