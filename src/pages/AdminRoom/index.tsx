
import { Link, useParams } from 'react-router-dom';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import { useRoom } from '../../hooks/useRoom';


import logoImg from '../../assets/images/logo.svg';
import './styles.scss'

type RoomParams = {
    id: string;
}


export function AdminRoom() {

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { title, questions } = useRoom(roomId);
  
    return (
       <div id="page-room">
           <header>
                <Link to="/" className="content">
                        <img src={logoImg} alt="Letmeask" />
                </Link>
               <div>
                    <RoomCode code={roomId}/>
                    <Button isOutlined>Encerrar sala</Button>
               </div>
           </header>

           <main>
               <div className="room-title">
                   <h1> Sala {title} </h1>
                   {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
               </div>
            
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        );
                    })}
                </div>
           </main>
       </div>
    );
}