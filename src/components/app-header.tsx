import AppNav from './app-nav';
import Logo from './logo';

export default function AppHeader() {
  return (
    <header className="flex justify-between py-4">
      <Logo />
      <AppNav />
    </header>
  );
}
