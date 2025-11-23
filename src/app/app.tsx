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
    <div className="app">
      <header className="app__header">
        <h1>React-Test-02 UI Library Demo</h1>
        <p>A comprehensive Preact-based UI component library with responsive design</p>
      </header>

      <main className="app__main">
        <section className="demo-section">
          <h2>Button Variants</h2>
          <div className="demo-grid">
            <div className="demo-card">
              <h3>Primary</h3>
              <Button onClick={() => addNotification({ level: 'log', message: 'Primary button clicked!' })}>
                Primary Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Secondary</h3>
              <Button variant="secondary" onClick={() => addNotification({ level: 'log', message: 'Secondary button clicked!' })}>
                Secondary Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Ghost</h3>
              <Button variant="ghost" onClick={handleCustomNotification}>
                Ghost Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Danger</h3>
              <Button variant="danger" onClick={() => addNotification({ level: 'error', message: 'Danger action!' })}>
                Danger Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Success</h3>
              <Button variant="success" onClick={() => addNotification({ level: 'success', message: 'Success!' })}>
                Success Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Warning</h3>
              <Button variant="warning" onClick={() => addNotification({ level: 'warn', message: 'Warning!' })}>
                Warning Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Outline</h3>
              <Button variant="outline" onClick={() => addNotification({ level: 'info', message: 'Outline clicked!' })}>
                Outline Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Link</h3>
              <Button variant="link" onClick={() => addNotification({ level: 'log', message: 'Link clicked!' })}>
                Link Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Minimal</h3>
              <Button variant="minimal" onClick={() => addNotification({ level: 'log', message: 'Minimal clicked!' })}>
                Minimal Button
              </Button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Button Sizes</h2>
          <div className="demo-flex">
            <div className="demo-card">
              <h3>Small</h3>
              <Button size="small" onClick={() => addNotification({ level: 'log', message: 'Small button!' })}>
                Small Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Medium (Default)</h3>
              <Button size="medium" onClick={() => addNotification({ level: 'log', message: 'Medium button!' })}>
                Medium Button
              </Button>
            </div>
            <div className="demo-card">
              <h3>Large</h3>
              <Button size="large" onClick={() => addNotification({ level: 'log', message: 'Large button!' })}>
                Large Button
              </Button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Corner Radius</h2>
          <div className="demo-flex">
            <div className="demo-card">
              <h3>None</h3>
              <Button cornerRadius="none" onClick={() => addNotification({ level: 'log', message: 'No radius!' })}>
                Sharp Corners
              </Button>
            </div>
            <div className="demo-card">
              <h3>Small</h3>
              <Button cornerRadius="small" onClick={() => addNotification({ level: 'log', message: 'Small radius!' })}>
                Small Radius
              </Button>
            </div>
            <div className="demo-card">
              <h3>Medium (Default)</h3>
              <Button cornerRadius="medium" onClick={() => addNotification({ level: 'log', message: 'Medium radius!' })}>
                Medium Radius
              </Button>
            </div>
            <div className="demo-card">
              <h3>Large</h3>
              <Button cornerRadius="large" onClick={() => addNotification({ level: 'log', message: 'Large radius!' })}>
                Large Radius
              </Button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Loading State</h2>
          <div className="demo-flex">
            <div className="demo-card">
              <h3>Loading Button</h3>
              <Button loading onClick={() => {}}>
                Loading...
              </Button>
            </div>
            <div className="demo-card">
              <h3>Disabled</h3>
              <Button disabled onClick={() => {}}>
                Disabled Button
              </Button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Icons & Full Width</h2>
          <div className="demo-grid">
            <div className="demo-card">
              <h3>Icon Left</h3>
              <Button icon="←" iconPosition="left" onClick={() => addNotification({ level: 'log', message: 'Icon left!' })}>
                With Icon Left
              </Button>
            </div>
            <div className="demo-card">
              <h3>Icon Right</h3>
              <Button icon="→" iconPosition="right" onClick={() => addNotification({ level: 'log', message: 'Icon right!' })}>
                With Icon Right
              </Button>
            </div>
            <div className="demo-card demo-card--full">
              <h3>Full Width</h3>
              <Button fullWidth onClick={() => addNotification({ level: 'log', message: 'Full width!' })}>
                Full Width Button
              </Button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Theme Switcher</h2>
          <div className="demo-card">
            <h3>Current Theme: {theme} {theme === 'auto' && `(effective: ${effectiveTheme})`}</h3>
            <Button onClick={handleThemeSwitch}>
              Switch to: {newTheme}
            </Button>
          </div>
        </section>
      </main>

      <footer className="app__footer">
        <p>&copy; 2025 React-Test-02 UI Library. Built with Preact and SCSS.</p>
      </footer>
    </div>
  );
}

export default App;
