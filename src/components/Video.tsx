import { Player, Youtube, DefaultUi } from '@vime/react';
import { gql, useQuery } from '@apollo/client';
import { Button } from "./Button";
import { Card } from "./Card";

import '@vime/core/themes/default.css';

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
      title
      videoId
      description
      teacher {
        bio
        name
        avatarURL
      }
  }
}
`

interface getLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    }
  }
}

interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  const {data} = useQuery<getLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug
    }
  });

  if (!data) {
    return (
      <div className="flex-1">
        {/* TODO: CRIAR TELA DE LOADING */}
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
            {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL}
                alt="Lucas Vieira"
              />

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl text-block">
                  {data.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>

          </div>
          
          <div className="flex flex-col gap-4">
            <Button
              variant="primary"
              text="Comunidade no discord"
            />
            <Button
              variant="secondary"
              text="Acesse o desafio"
            />
          </div>

        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <Card 
            title="Material complementar"
            description="Acesse o material complementar para acelerar o seu desenvolvimento"
            icon="image"
          />

          <Card 
            title="Wallpapers exclusivos"
            description="Baixe wallpapers exclusivos do Ignite Lab e personalize a sua m??quina"
          />
        </div>
      </div>
    </div>
  )
}