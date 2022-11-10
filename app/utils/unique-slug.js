export const createUniqueSlug = () => {
    const TimeStamp = new Date().getTime()
    const RandomSlug = Math.random().toString(30).slice(2).substr(0,5)

    return `${TimeStamp}-${RandomSlug}`
}