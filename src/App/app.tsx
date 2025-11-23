import { Button } from '../components';
import './app.scss'
import { UseThemeSwitcher } from '../hooks';

function App() {
    const { theme, setTheme, nextTheme } = UseThemeSwitcher();
    const newTheme = nextTheme(theme);
    return (
        <div className="app-container">
            <h1>Hello, World!</h1>
            <div>
                <p>This is a paragraph with some text.</p>
                <Button onClick={() => {
                    console.log("Click");
                }} >Click Me!</Button>
                <a href="#">Link</a>
                <p>This is another paragraph with more text.</p>
            </div>
            <Button onClick={() => {
                console.log('Switching to:', newTheme);
                setTheme(newTheme);
            }}>
                Przełącz motyw (aktualny: {theme} na {newTheme})
            </Button>
        </div>
    );
}


export default App;