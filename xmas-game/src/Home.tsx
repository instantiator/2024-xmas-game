import Game from './components/Game';
import './Home.css';

export default function Home() {
    return (<>
        <div className="main">
            <div className="main-view">
                <Game />
            </div>
        </div>
    </>);
};