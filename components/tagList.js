import Tag from './tag'

export default function TagList({tags}) {
  return (
    <>
      {tags.map((t, i) => [i > 0 && ", ", <Tag key={i}>{t}</Tag>])}
    </>
  )
}