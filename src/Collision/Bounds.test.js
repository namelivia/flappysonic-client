import Bounds from './Bounds'

test('should calculate bounds', () => {
    const result = new Bounds()
    expect(result.x).toBe(Infinity)
    expect(result.y).toBe(Infinity)
    expect(result.x2).toBe(-Infinity)
    expect(result.y2).toBe(-Infinity)
    expect(result.width).toBe(0)
    expect(result.height).toBe(0)
})

test('should replaceInfinitiesWithZeroes', () => {
    const result = new Bounds()
    result.replaceInfinitiesWithZeroes()
    expect(result.x).toBe(0)
    expect(result.y).toBe(0)
    expect(result.x2).toBe(-Infinity)
    expect(result.y2).toBe(-Infinity)
    expect(result.width).toBe(0)
    expect(result.height).toBe(0)
})
