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
