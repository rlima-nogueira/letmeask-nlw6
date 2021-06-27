import { useHistory } from 'react-router-dom';

import { FormEvent, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button';

import '../../styles/auth.scss';
import { database } from '../../services/firebase';

export function Home() {
    const history = useHistory();
    const [roomCode, setRoomCode] = useState('');
    const { signInWithGoogle, user } = useAuth();

    async function handleCreateRoom() {
       if (!user) {
           await signInWithGoogle();
       }

       history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode === '') {
            alert('Insert code for being redirect to the room.');
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exist.');
            return;
        }

        history.push(`/rooms/${roomCode}`);

    }   

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask"/>

                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">
                        ou entre em uma sala
                    </div>

                    <form onSubmit={handleJoinRoom}>
                        <input 
                            onChange={ event => setRoomCode(event.target.value)}
                            type="text"
                            placeholder="Digite o código da sala"
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}