import { Bitmap, Sprite, SpriteSheetUtils } from 'createjs'
import Bounds from './Bounds'
import { globalPositions as globalPositionsFactory } from '../Factory/Factory'
import Imgr from './Imgr'
import { canvas as canvasFactory } from '../Factory/Factory'

export default class Collision {
    constructor() {
        this.collisionCanvas = canvasFactory()
        this.collisionCtx = this.collisionCanvas.getContext('2d')
        this.collisionCtx.save()

        this.collisionCanvas2 = canvasFactory()
        this.collisionCtx2 = this.collisionCanvas2.getContext('2d')
        this.collisionCtx2.save()

        this.cachedBAFrames = []
    }

    _checkRectCollision(bitmap1, bitmap2) {
        var b1, b2
        b1 = this.getBounds(bitmap1)
        b2 = this.getBounds(bitmap2)
        return this.calculateIntersection(b1, b2)
    }

    checkPixelCollision(bitmap1, bitmap2) {
        var imageData1, imageData2, pixelIntersection
        var intersection = this._checkRectCollision(bitmap1, bitmap2)
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

    _getFrameName(frame) {
        return [
            frame.image.src,
            frame.rect.x,
            frame.rect.y,
            frame.rect.width,
            frame.rect.height,
        ].join(':')
    }

    _setImage(bitmap) {
        if (bitmap instanceof Bitmap) {
            return bitmap.image
        } else if (bitmap instanceof Sprite) {
            var frame = bitmap.spriteSheet.getFrame(bitmap.currentFrame)
            var frameName = this._getFrameName(frame)
            if (this.cachedBAFrames[frameName]) {
                return this.cachedBAFrames[frameName]
            } else {
                frame = SpriteSheetUtils.extractFrame(
                    bitmap.spriteSheet,
                    bitmap.currentFrame
                )
                this.cachedBAFrames[frameName] = frame
                return frame
            }
        }
    }

    _transformContext(ctx, bitmap, intersection, i) {
        var bl = bitmap.globalToLocal(intersection.x, intersection.y)
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
            -bl.x - intersection['rect' + i].regX,
            -bl.y - intersection['rect' + i].regY
        )
    }

    _drawImage(ctx, bitmap, image) {
        var sourceRect = bitmap.sourceRect
        if (sourceRect != undefined) {
            ctx.drawImage(
                image,
                sourceRect.x,
                sourceRect.y,
                sourceRect.width,
                sourceRect.height,
                0,
                0,
                sourceRect.width,
                sourceRect.height
            )
        } else {
            ctx.drawImage(image, 0, 0, image.width, image.height)
        }
    }

    _intersectingImagePart(intersection, bitmap, ctx, i) {
        var image = this._setImage(bitmap)
        this._transformContext(ctx, bitmap, intersection, i)
        this._drawImage(ctx, bitmap, image)
        return ctx.getImageData(0, 0, intersection.width, intersection.height)
            .data
    }

    _getAlpha(imageData, offset) {
        return imageData.length > offset + 1 ? imageData[offset] / 255 : 0
    }

    _isAlphaMatch(alpha1, alpha2) {
        return alpha1 > 0 && alpha2 > 0
    }

    _checkPixel(imageData1, imageData2, x, y, offset) {
        var alpha1 = this._getAlpha(imageData1, offset)
        var alpha2 = this._getAlpha(imageData2, offset)
        if (this._isAlphaMatch(alpha1, alpha2)) {
            return { x: x, y: y, width: 1, height: 1 }
        }
        return null
    }

    _compareAlphaValues(imageData1, imageData2, width, height) {
        var offset = 3

        // parsing through the pixels checking for an alpha match
        // TODO: intelligent parsing, not just from 0 to end!
        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
                var alphaMatch = this._checkPixel(
                    imageData1,
                    imageData2,
                    x,
                    y,
                    offset
                )
                if (alphaMatch) {
                    return alphaMatch
                }
                offset += 4
            }
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

    _defaultImgrToZero(imgr) {
        imgr.regX = imgr.regX || 0
        imgr.width = imgr.width || 0
        imgr.regY = imgr.regY || 0
        imgr.height = imgr.height || 0
        return imgr
    }

    getBounds(obj) {
        var bounds = new Bounds()
        var imgr = this._defaultImgrToZero(new Imgr(obj))

        bounds.regX = imgr.regX
        bounds.regY = imgr.regY

        var globalPositions = globalPositionsFactory(obj, imgr)
        bounds.x = globalPositions.minX
        bounds.y = globalPositions.minY
        bounds.width = globalPositions.maxX - bounds.x
        bounds.height = globalPositions.maxY - bounds.y
        return bounds
    }
}
