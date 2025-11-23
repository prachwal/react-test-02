import { Button } from '../components';
import './app.scss';
import { UseThemeSwitcher } from '../hooks';
import { useNotification } from '../providers/NotificationProvider';


function App() {
  const { theme, setTheme, nextTheme, effectiveTheme } = UseThemeSwitcher();
  const newTheme = nextTheme(theme);
  const { addNotification } = useNotification();

  const handleThemeSwitch = () => {
    addNotification({
      level: 'info',
      message: `Switching theme to: ${newTheme}`,
    });
    setTheme(newTheme);
  };

  const handleCustomNotification = () => {
    addNotification({
      level: 'log',
      message: '🎉 Custom Notification!',
      description: 'This is a custom styled notification with special formatting',
      duration: 8000,
      icon: '🚀'
    });
  };

  return (
    <div className="app-container">
      <h1>Hello, World!</h1>

      <div>
        <p>This is a paragraph with some text.</p>

        <Button onClick={() => addNotification({ level: 'log', message: 'Button clicked!' })}>
          Click Me!
        </Button>

        <Button onClick={handleCustomNotification}>
          Custom Notification
        </Button>

        <a href="#demo">Link</a>

        <p>This is another paragraph with more text.</p>
      </div>

      <div className="theme-info">
        <p>
          Aktualny motyw: <strong>{theme}</strong>
          {theme === 'auto' && ` (efektywnie: ${effectiveTheme})`}
        </p>

        <Button onClick={handleThemeSwitch}>
          Przełącz na: {newTheme}
        </Button>
      </div>
    </div>
  );
}

export default App;
