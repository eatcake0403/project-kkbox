import Parser from 'rss-parser'

export async function getData () {
  const parser = new Parser()
  const url = '/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml'
  return await parser.parseURL(url)
}
