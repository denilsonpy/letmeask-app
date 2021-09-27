import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/roomCode';
import { Question } from '../components/Question';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss'
import { useRoom } from '../hooks/useRoom';


type roomParams = {
  id: string,
}

export function AdminRoom() {
  const params = useParams<roomParams>();
  const roomId = params.id; 

  const { title, questions  } = useRoom(roomId);


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask"/>
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined>Encerrar sala</Button> 
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
              key={question.id}
              content={question.content}
              author={question.author}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}