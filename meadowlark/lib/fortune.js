const fortunes = [
  'Conquer your fears or they wil conquer you.',
  'Rivers need springs.',
  "Do not fear what you don't know.",
  'You wil have a pleasant surprise',
  'Whenever possible, keep it simple.'
]

exports.getFortune = () => {
    const idx =
        Math.floor(Math.random() * fortunes.length)
    return fortunes[idx]
}