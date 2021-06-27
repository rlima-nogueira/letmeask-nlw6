import { Link } from 'react-router-dom';

import './styles.scss'
export function PageNotFound() {
    return (
        <div className="page-not-found">
            <h1>Página não encontrada </h1>

            <Link to="/">
                Voltar para HOME
            </Link>
        </div>

    );
}