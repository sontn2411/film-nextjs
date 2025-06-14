import { Link } from 'react-router-dom'

const data = [
  {
    id: 1,
    name: 'Phim Bộ Trung Quốc',
    slug: '/danh-sach/phim-bo?country=trung-quoc',
    color: 'rgb(50,79,209)',
  },
  {
    id: 2,
    name: 'Phim Bộ Hàn Quốc',
    slug: '/danh-sach/phim-bo?country=han-quoc',
    color: 'rgb(102,102,153)',
  },
  {
    id: 3,
    name: 'Lồng tiếng',
    slug: '/danh-sach/phim-bo?sort_lang=long-tieng',
    color: 'rgb(119,97,180)',
  },
]

const Interested = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-semibold'>Bạn đang quan tâm gì?</h2>
      <ul className='flex flex-wrap gap-4'>
        {data.map((item) => (
          <li key={item.id} className='max-w-[250px] w-full'>
            <Link
              to={item.slug}
              className='text-white px-4 py-4  h-[110px] flex items-center justify-center rounded-lg cursor-pointer transition '
              style={{ backgroundColor: item.color }}
            >
              <span className=' text-xl font-bold'>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Interested
