import { gql, useQuery } from "@apollo/client"
import { client } from "./lib/apollo"

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
      teacher {
        name
      }
    }
  }
`

function App() {

  const { data } = useQuery<{lessons: Lesson[]}>(GET_LESSONS_QUERY);

  interface Lesson {
    id: string;
    title: string
  }

  return (
    <div className="text-5xl font-bold text-violet-500">
      <ul>
        {data?.lessons.map(lesson => {
          return <li key={lesson.id}>{lesson.title}</li>
        })}
      </ul>
    </div>
  )
}

export default App
