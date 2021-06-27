
import { useState ,FormEvent, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import logoImg from '../../assets/images/logo.svg'

import './styles.scss'
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string,
        avatar: string;
    },
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}
export function Room() {
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                }
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswered: false,
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
       <div id="page-room">
           <header>
                <Link to="/" className="content">
                        <img src={logoImg} alt="Letmeask" />
                </Link>
               <div >
                    <RoomCode code={roomId}/>
               </div>
           </header>

           <main>
               <div className="room-title">
                   <h1> Sala {title} </h1>
                   {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
               </div>
            
                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="Qual a sua pergunta?"
                        onChange={e => setNewQuestion(e.target.value)}
                        value={newQuestion}
                        />

                    <div className="form-footer">
                        { user ? 
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        : 
                        <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        }
                        
                        <Button disabled={!user} type="submit"> Enviar pergunta </Button>
                    </div>
                </form>
           </main>
       </div>
    );
}