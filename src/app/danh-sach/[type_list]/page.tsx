import ContentTypeList from './content'

interface Props {
  params: Promise<{ type_list: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const TypeListPage = async ({ params, searchParams }: Props) => {
  const [{ type_list }, sp] = await Promise.all([params, searchParams])

  const rawPage = sp.page
  const page = Array.isArray(rawPage)
    ? parseInt(rawPage[0] ?? '1', 10)
    : parseInt(rawPage ?? '1', 10)

  return <ContentTypeList type_list={type_list} page={page} />
}

export default TypeListPage
