import GlobalPositions from './GlobalPositions'
test('should calculate global positions', () => {
    const imgr = {
        height: 5,
        regX: 12,
        regY: 23,
        width: 10,
    }
    const localToGlobal = jest.fn().mockImplementation(() => {
        return {
            x: 10,
            y: 20,
        }
    })
    const obj = {
        localToGlobal: localToGlobal,
    }
    const result = new GlobalPositions(obj, imgr)
    expect(result.maxX).toBe(10)
    expect(result.maxY).toBe(20)
    expect(result.minX).toBe(10)
    expect(result.minY).toBe(20)
})
